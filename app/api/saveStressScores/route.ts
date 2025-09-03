import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_name, dept, scores } = body;

    if (!user_name || !dept || !scores) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Define all score columns
    const cols = [
      'user_name',
      'dept',
      'organizational',
      'student',
      'administrative',
      'teacher',
      'parents',
      'occupational',
      'personal',
      'academic_program',
      'negative_public_attitude',
      'misc'
    ];

    // Build placeholders dynamically
    const placeholders = cols.map((_, i) => `$${i + 1}`);

    // Build values array
    const values = [
      user_name,
      dept,
      scores.organizational,
      scores.student,
      scores.administrative,
      scores.teacher,
      scores.parents,
      scores.occupational,
      scores.personal,
      scores.academic_program,
      scores.negative_public_attitude,
      scores.misc
    ];

    const updates = cols
      .filter(c => c !== 'user_name' && c !== 'dept') // don't update keys
      .map(c => `"${c}" = EXCLUDED."${c}"`);

    const sql = `
      INSERT INTO "stress_scores" (${cols.join(', ')})
      VALUES (${placeholders.join(', ')})
      ON CONFLICT (user_name, dept)
      DO UPDATE SET ${updates.join(', ')}
    `;

    await prisma.$executeRawUnsafe(sql, ...values);

    return NextResponse.json(
      { message: 'Stress scores saved/updated' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving stress scores:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
 