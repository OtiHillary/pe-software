import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pesuser_name, dept, payload } = body;
  const value = body[payload];

  const allowedFields = [
    'teaching_quality_evaluation',
    'research_quality_evaluation',
    'administrative_quality_evaluation',
    'community_quality_evaluation',
    'other_relevant_information'
  ];

  if (!pesuser_name || !payload || value === undefined) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  if (!allowedFields.includes(payload)) {
    return NextResponse.json({ message: 'Invalid payload field' }, { status: 400 });
  }

  try {
    // Use UPSERT (insert or update in one shot)
    await prisma.$executeRawUnsafe(
      `
      INSERT INTO "appraisal" (pesuser_name, dept, "${payload}")
      VALUES ($1, $2, $3)
      ON CONFLICT (pesuser_name, dept)
      DO UPDATE SET "${payload}" = EXCLUDED."${payload}"
      `,
      pesuser_name,
      dept,
      value
    );

    return NextResponse.json({ message: 'appraisal saved/updated' }, { status: 200 });
  } catch (error) {
    console.error('Prisma query error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
