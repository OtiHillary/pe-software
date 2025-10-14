// app/api/notifications/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma.dev";

export async function GET(request: NextRequest) {
  try {
    // Example: get the user's ID or name from query params (or JWT later)
    const { searchParams } = new URL(request.url);
    const org = searchParams.get("org");

    if (!org) {
      return NextResponse.json(
        { error: "Missing org" },
        { status: 400 }
      );
    }

    const query = `
      SELECT id, user_id, org, title, message, is_read, created_at
      FROM notifications
      WHERE org = $1
      ORDER BY created_at DESC;
    `;
    const notifications = await prisma.$queryRawUnsafe(query, org);

    return NextResponse.json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
