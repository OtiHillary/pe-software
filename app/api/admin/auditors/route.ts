import { NextResponse } from "next/server";
import prisma from "../../prisma.dev";
import nodemailer from "nodemailer";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

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

      // Send success email to the auditor
      await transporter.sendMail({
        from: `"Audit System" <${process.env.EMAIL_USER}>`,
        to: auditor[0].email,
        subject: "Approval Notification",
        html: `
          <h2>Congratulations, ${auditor[0].name}!</h2>
          <p>Your application as an auditor has been approved.</p>
          <p>You can now log in to the system using the following credentials:</p>
          <ul>
            <li><strong>Email:</strong> ${auditor[0].email}</li>
            <li><strong>Password:</strong> default_password</li>
          </ul>
          <p>Please change your password after logging in for the first time.</p>
          <p>Thank you for joining our team!</p>
        `,
      });

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
