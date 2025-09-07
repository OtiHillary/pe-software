import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pesuser_name, org, payload } = body;
  const value = body[payload];

  const allowedFields = [
    'competence',
    'integrity',
    'compatibility',
    'use_of_resources',
  ];

  if (!pesuser_name || !org || !payload || value === undefined) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  if (!allowedFields.includes(payload)) {
    return NextResponse.json({ message: 'Invalid payload field' }, { status: 400 });
  }

  try {
    // Fetch dept from pesuser
    const userResult = await prisma.$queryRawUnsafe<{ dept: string }[]>(
      `SELECT dept FROM "pesuser" WHERE name = $1 AND org = $2 LIMIT 1`,
      pesuser_name,
      org
    );

    if (userResult.length === 0 || !userResult[0].dept) {
      return NextResponse.json({ message: 'User not found or department missing' }, { status: 404 });
    }

    const dept = userResult[0].dept;

    // Insert or update into userperformance
    await prisma.$executeRawUnsafe(
      `
      INSERT INTO "userperformance" (pesuser_name, org, dept, "${payload}")
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (pesuser_name, org, dept)
      DO UPDATE SET "${payload}" = EXCLUDED."${payload}"
      `,
      pesuser_name,
      org,
      dept,
      value
    );

    return NextResponse.json({ message: 'userperformance saved/updated' }, { status: 200 });
  } catch (error) {
    console.error('Prisma query error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
