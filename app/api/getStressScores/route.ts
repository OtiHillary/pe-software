import { NextResponse } from "next/server";
import prisma from "../prisma.dev";

export async function GET() {
  try {
    const [row] = await prisma.$queryRawUnsafe<any[]>(`
      SELECT organizational, student, administrative, teacher, parents,
             occupational, personal, academic_program, negative_public_attitude, misc
      FROM stress_scores
      LIMIT 1
    `);

    if (!row) {
      return NextResponse.json({ error: "No stress scores found" }, { status: 404 });
    }

    return NextResponse.json({ data: row }, { status: 200 });
  } catch (error) {
    console.error("Error fetching stress scores:", error);
    return NextResponse.json({ error: "Failed to fetch stress scores" }, { status: 500 });
  }
}


