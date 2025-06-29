import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'

export async function POST(req: NextRequest) {

  const body = await req.json();
  const { pesuser_name, payload } = body;
  const value = body[payload];

  const allowedFields = [
    'competence',
    'integrity',
    'compatibility',
    'use_of_resources',
  ];

  if (!pesuser_name || !payload || value === undefined) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  if (!allowedFields.includes(payload)) {
    return NextResponse.json({ message: 'Invalid payload field' }, { status: 400 });
  }

  try {
    // Check if user userperformance already exists
    const existing = await prisma.$queryRawUnsafe(
      `SELECT * FROM "userperformance" WHERE pesuser_name = $1`,
      pesuser_name
    ) as any[];

    if (existing.length === 0) {
      // Insert new row with only the given field
      await prisma.$executeRawUnsafe(
        `INSERT INTO "userperformance" (pesuser_name, "${payload}") VALUES ($1, $2)`,
        pesuser_name,
        value
      );
      return NextResponse.json({ message: 'userperformance created' }, { status: 201 });
    } else {
      // Update the field
      await prisma.$executeRawUnsafe(
        `UPDATE "userperformance" SET "${payload}" = $1 WHERE pesuser_name = $2`,
        value,
        pesuser_name
      );
      return NextResponse.json({ message: 'userperformance updated' }, { status: 200 });
    }
  } catch (error) {
    console.error('Prisma query error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
