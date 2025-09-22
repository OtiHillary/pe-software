// app/api/webhookPaypal/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Helper: verify webhook signature
async function verifyWebhook(request: NextRequest, webhookId: string): Promise<boolean> {
  const certUrl = request.headers.get("paypal-cert-url")!;
  const authAlgo = request.headers.get("paypal-auth-algo")!;
  const transmissionId = request.headers.get("paypal-transmission-id")!;
  const transmissionTime = request.headers.get("paypal-transmission-time")!;
  const webhookEventBody = await request.text(); // raw body needed
  const transmissionSig = request.headers.get("paypal-transmission-sig")!;
  
  const webhookIdHeader = webhookId;  // from PayPal dashboard, store in .env or DB
  
  // call PayPal API to verify signature
  // POST to https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature
  const accessToken = await (async () => {
    const resp = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });
    const j = await resp.json();
    if (!resp.ok) throw new Error("Could not fetch access token for webhook verification");
    return j.access_token;
  })();
  
  const verifyRes = await fetch("https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature", {
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
      webhook_id: webhookIdHeader,
      webhook_event: JSON.parse(webhookEventBody),
    }),
  });
  const verifyJson = await verifyRes.json();
  return verifyRes.ok && verifyJson.verification_status === "SUCCESS";
}

export async function POST(req: NextRequest) {
  try {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID!;  // from your PayPal app setup

    // Need raw body to verify
    const bodyText = await req.text();
    const webhookEvent = JSON.parse(bodyText);

    const isValid = await verifyWebhook(req, webhookId);
    if (!isValid) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Now handle needed event types
    const eventType = webhookEvent.event_type;
    const resource = webhookEvent.resource;

    console.log("Received PayPal webhook:", eventType);

    switch (eventType) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
      case "BILLING.SUBSCRIPTION.CREATED":
        // subscribe user, mark active in DB
        // resource.id is subscription id
        break;
      case "PAYMENT.SALE.COMPLETED":
      case "BILLING.SUBSCRIPTION.PAYMENT.SUCCEEDED":
        // handle regular billing succeeded
        break;
      case "BILLING.SUBSCRIPTION.CANCELLED":
        // mark subscription cancelled
        break;
      case "BILLING.SUBSCRIPTION.SUSPENDED":
      case "BILLING.SUBSCRIPTION.EXPIRED":
      case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
        // handle accordingly
        break;
      default:
        // maybe ignore or log
        console.log("Unhandled event type:", eventType);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
