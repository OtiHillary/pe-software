import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma.dev";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    const [first, second, hall, badges] = await Promise.all([
      prisma.$queryRaw`
        SELECT *, 'first_book' AS source FROM first_book_of_record WHERE name = ${name}
      `,
      prisma.$queryRaw`
        SELECT *, 'second_book' AS source FROM second_book_of_record WHERE name = ${name}
      `,
      prisma.$queryRaw`
        SELECT *, 'hall_of_fame' AS source FROM hall_of_fame WHERE name = ${name}
      `,
      prisma.$queryRaw`
        SELECT *, 'badges' AS source FROM badges WHERE name = ${name}
      `
    ]);

    const results = [...first, ...second, ...hall, ...badges];

    return NextResponse.json(results);
  } catch (err: any) {
    console.error("Error fetching achievements:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
