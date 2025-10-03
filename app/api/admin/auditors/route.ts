import { NextResponse } from "next/server";
import prisma from "../../prisma.dev";

// Get all pending auditors
export async function GET() {
  try {
    const auditors = await prisma.$queryRawUnsafe(
      `SELECT * FROM auditor_responses ORDER BY created_at DESC`
    );
    return NextResponse.json(auditors);
  } catch (error: any) {
    console.error("Error fetching auditors:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Approve or Reject
export async function POST(req: Request) {
  try {
    const { id, action } = await req.json();

    if (!id || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Fetch auditor details
    const auditor: any = await prisma.$queryRawUnsafe(
      `SELECT * FROM auditor_responses WHERE id = $1`,
      id
    );

    if (!auditor || auditor.length === 0) {
      return NextResponse.json({ error: "Auditor not found" }, { status: 404 });
    }

    if (action === "approve") {
      // Insert into pesuser table
      await prisma.$queryRawUnsafe(
        `INSERT INTO pesuser (name, email, password, gsm, role, address, dob, image) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        auditor[0].name,
        auditor[0].email,
        "default_password", // TODO: hash or generate properly
        auditor[0].gsm,
        "auditor", // assign role
        auditor[0].address,
        auditor[0].dob,
        auditor[0].image
      );

      // Update status
      await prisma.$queryRawUnsafe(
        `UPDATE auditor_responses SET status = 'approved' WHERE id = $1`,
        id
      );

      return NextResponse.json({ success: true, message: "Auditor approved & added to system" });
    }

    if (action === "reject") {
      await prisma.$queryRawUnsafe(
        `UPDATE auditor_responses SET status = 'rejected' WHERE id = $1`,
        id
      );
      return NextResponse.json({ success: true, message: "Auditor rejected" });
    }
  } catch (error: any) {
    console.error("Error approving auditor:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
