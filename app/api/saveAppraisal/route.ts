import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { pesuser_name, org, ...evaluations } = body;

  const allowedFields = [
    'teaching_quality_evaluation',
    'research_quality_evaluation',
    'administrative_quality_evaluation',
    'community_quality_evaluation',
    'other_relevant_information',
    'staff_development_evaluation'
  ];

  if (!pesuser_name || !org) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  // Filter the evaluations to only allowed fields
  const filteredEvaluations: Record<string, any> = {};
  for (const key of allowedFields) {
    if (evaluations[key] !== undefined) {
      filteredEvaluations[key] = evaluations[key];
    }
  }

  if (Object.keys(filteredEvaluations).length === 0) {
    return NextResponse.json({ message: 'No valid evaluation fields provided' }, { status: 400 });
  }

  try {
    // Fetch dept using raw query
    const userResult = await prisma.$queryRawUnsafe<{ dept: string }[]>(
      `SELECT dept FROM "pesuser" WHERE name = $1 AND org = $2 LIMIT 1`,
      pesuser_name,
      org
    );

    if (userResult.length === 0 || !userResult[0].dept) {
      return NextResponse.json({ message: 'User not found or department missing' }, { status: 404 });
    }

    const dept = userResult[0].dept;

    // Dynamically build the column list and values for insert
    const columns = Object.keys(filteredEvaluations).map((k) => `"${k}"`).join(', ');
    const placeholders = Object.keys(filteredEvaluations).map((_, i) => `$${i + 4}`).join(', ');
    const values = Object.values(filteredEvaluations);

    // Build ON CONFLICT update set
    const updateSet = Object.keys(filteredEvaluations)
      .map((k) => `"${k}" = EXCLUDED."${k}"`)
      .join(', ');

    await prisma.$executeRawUnsafe(
      `
      INSERT INTO "appraisal" (pesuser_name, org, dept, ${columns})
      VALUES ($1, $2, $3, ${placeholders})
      ON CONFLICT (pesuser_name, org, dept)
      DO UPDATE SET ${updateSet}
      `,
      pesuser_name,
      org,
      dept,
      ...values
    );

    return NextResponse.json({ message: 'Appraisal saved/updated' }, { status: 200 });
  } catch (error) {
    console.error('Query error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
