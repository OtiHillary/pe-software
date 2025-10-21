import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const event = body.event;

  if (event === "charge.success") {
    const subscription = body.data;
    console.log("Subscription Payment Successful:", subscription);
    // save to DB here if needed
  }

  return NextResponse.json({ received: true });
}
