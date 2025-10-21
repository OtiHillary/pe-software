import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, planCode } = await req.json();

    // Initialize Paystack subscription
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        plan: planCode, // Attach plan code directly
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription-success`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Subscription initialization failed");
    }

    return NextResponse.json(data.data); // contains authorization_url, reference
  } catch (error: any) {
    console.error("Paystack subscription error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
