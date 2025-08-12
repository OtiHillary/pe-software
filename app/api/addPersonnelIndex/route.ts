import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, dept, payload } = body;
  const value = body[payload];
  console.log('i was hit')

  const allowedFields = [
    'productivity',
    'redundancy',
    'utility'
  ];

  if (!user_id || !payload || value === undefined) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  if (!allowedFields.includes(payload)) {
    return NextResponse.json({ message: 'Invalid payload field' }, { status: 400 });
  }

  try {
    // Check if user appraisal already exists
    const existing = await prisma.$queryRawUnsafe(
      `SELECT * FROM "index" WHERE user_id = $1 AND dept = $2`,
      user_id,
      dept
    ) as any[];

    if (existing.length === 0) {
      // Insert new row with only the given field
      await prisma.$executeRawUnsafe(
        `INSERT INTO "index" (user_id, dept, "${payload}") VALUES ($1, $2, $3)`,
        user_id,
        dept,
        value
      );

      return NextResponse.json({ message: 'saved successfully' }, { status: 201 });
    } else {
      // Update the field
      await prisma.$executeRawUnsafe(
        `UPDATE "index" SET "${payload}" = $1 WHERE user_id = $2 AND dept = $3`,
        value,
        user_id,
        dept
      );

      return NextResponse.json({ message: 'index updated' }, { status: 200 });
    }
  } catch (error) {
     console.error('Prisma query error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
