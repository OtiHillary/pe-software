import { NextRequest, NextResponse } from "next/server";
import prisma from "../../prisma.dev"; // adjust to your setup

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = body.event;

    if (event === "charge.success") {
      const data = body.data;

      const email = data.customer.email;
      const reference = data.reference;
      const amount = data.amount / 100; // Paystack sends kobo
      const planCode = data.plan?.plan_code ;
      const planName = data.plan?.name;
      const paidAt = new Date(data.paid_at);
      const status = data.status;

      console.log(body.data);

      // 💾 Save subscription
      await prisma.$queryRawUnsafe(
        `INSERT INTO subscriptions_info (pesuser_email, plan_code, plan_name, reference, status, amount, paid_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (reference) DO NOTHING`,
        email,
        planCode,
        planName,
        reference,
        status,
        amount,
        paidAt
      );

      console.log("✅ Subscription saved for:", email);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Paystack webhook error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

