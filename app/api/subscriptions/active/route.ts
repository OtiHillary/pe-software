import { NextRequest, NextResponse } from "next/server";
import prisma from "../../prisma.dev"; // adjust import if needed

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const activeSub: any = await prisma.$queryRawUnsafe(`
    SELECT * FROM subscriptions_info
    WHERE pesuser_email = '${email}'
    AND status IN ('success', 'active')
    ORDER BY created_at DESC
    LIMIT 1
  `);

  if (activeSub.length === 0) {
    return NextResponse.json({ active: false });
  }

  return NextResponse.json({
    active: true,
    plan: activeSub[0].plan_name,
    data: activeSub[0],
  });
}
