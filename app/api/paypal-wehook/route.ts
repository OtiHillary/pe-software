import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma.dev"; // assuming you have prisma client set up

async function verifyWebhook(request: NextRequest, webhookId: string): Promise<boolean> {
  const certUrl = request.headers.get("paypal-cert-url")!;
  const authAlgo = request.headers.get("paypal-auth-algo")!;
  const transmissionId = request.headers.get("paypal-transmission-id")!;
  const transmissionTime = request.headers.get("paypal-transmission-time")!;
  const webhookEventBody = await request.text();
  const transmissionSig = request.headers.get("paypal-transmission-sig")!;

  const accessToken = await (async () => {
    const resp = await fetch(
      `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );
    const j = await resp.json();
    if (!resp.ok) throw new Error("Could not fetch access token for webhook verification");
    return j.access_token;
  })();

  const verifyRes = await fetch(
    `https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        webhook_event: JSON.parse(webhookEventBody),
      }),
    }
  );
  const verifyJson = await verifyRes.json();
  return verifyRes.ok && verifyJson.verification_status === "SUCCESS";
}

export async function POST(req: NextRequest) {
  try {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID!;
    const bodyText = await req.text();
    const webhookEvent = JSON.parse(bodyText);

    const isValid = await verifyWebhook(req, webhookId);
    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const eventType = webhookEvent.event_type;
    const resource = webhookEvent.resource;
    console.log("Received PayPal webhook:", eventType);

    // For using raw SQL
    switch (eventType) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
      case "BILLING.SUBSCRIPTION.CREATED": {
        const subscriptionId = resource.id;
        const status = resource.status;  // e.g. "ACTIVE"
        const startTime = resource.start_time ? resource.start_time : null;

        await prisma.$executeRaw`
          UPDATE "subscriptions"
          SET status = ${status},
              start_time = ${startTime},
              updated_at = now()
          WHERE paypal_subscription_id = ${subscriptionId}
        `;
        break;
      }

      case "BILLING.SUBSCRIPTION.PAYMENT.SUCCEEDED":
      case "PAYMENT.SALE.COMPLETED": {
        const subscriptionId = resource.billing_subscription_id ?? resource.id;
        const lastBillingTime = resource.update_time ?? resource.create_time ?? null;

        await prisma.$executeRaw`
          UPDATE "subscriptions"
          SET status = 'ACTIVE',
              last_billing_time = ${lastBillingTime},
              failed_payment_count = 0,
              updated_at = now()
          WHERE paypal_subscription_id = ${subscriptionId}
        `;
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED": {
        const subscriptionId = resource.id;
        const cancelTime = resource.update_time ?? new Date().toISOString();

        await prisma.$executeRaw`
          UPDATE "subscriptions"
          SET status = 'CANCELLED',
              cancel_time = ${cancelTime},
              updated_at = now()
          WHERE paypal_subscription_id = ${subscriptionId}
        `;
        break;
      }

      case "BILLING.SUBSCRIPTION.SUSPENDED":
      case "BILLING.SUBSCRIPTION.EXPIRED": {
        const subscriptionId = resource.id;
        const statusFromResource = resource.status;  // like "SUSPENDED" or "EXPIRED"

        await prisma.$executeRaw`
          UPDATE "subscriptions"
          SET status = ${statusFromResource},
              updated_at = now()
          WHERE paypal_subscription_id = ${subscriptionId}
        `;
        break;
      }

      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED": {
        const subscriptionId = resource.id;

        await prisma.$executeRaw`
          UPDATE "subscriptions"
          SET failed_payment_count = failed_payment_count + 1,
              updated_at = now()
          WHERE paypal_subscription_id = ${subscriptionId}
        `;
        break;
      }

      default:
        console.log("Unhandled event type:", eventType);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

