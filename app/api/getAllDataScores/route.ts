import { NextRequest, NextResponse } from 'next/server';
import prisma from '../prisma.dev';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dept = searchParams.get('dept');
    let whereClause = '';
    if (dept) {
      whereClause = `WHERE dept = '${dept.replace(/'/g, "''")}'`;
    }

    // Fetch all appraisal data
    const appraisals = await prisma.$queryRawUnsafe<any[]>(
      `SELECT pesuser_name, dept, teaching_quality_evaluation, research_quality_evaluation, administrative_quality_evaluation, community_quality_evaluation FROM appraisal ${whereClause}`
    );

    // Fetch all userperformance data
    const performances = await prisma.$queryRawUnsafe<any[]>(
      `SELECT pesuser_name, dept, competence, integrity, compatibility, use_of_resources FROM userperformance ${whereClause}`
    );

    // Fetch all stress data
    const stresses = await prisma.$queryRawUnsafe<any[]>(
      `SELECT pesuser_name, dept, stress_theme, stress_feeling_frequency FROM stress ${whereClause}`
    );

    // Fetch all lead scores
    const leadScores = await prisma.$queryRawUnsafe<any[]>(
      `SELECT pesuser_name, dept, competence, integrity, compatibility, use_of_resources FROM lead_scores ${whereClause}`
    );
    const leadMap: Record<string, any> = {};
    for (const l of leadScores) {
      leadMap[l.pesuser_name] = {
        competence: l.competence,
        integrity: l.integrity,
        compatibility: l.compatibility,
        use_of_resources: l.use_of_resources,
      };
    }

    // Group by user
    const userMap: Record<string, any> = {};

    // Add appraisal data
    for (const a of appraisals) {
      if (!userMap[a.pesuser_name]) userMap[a.pesuser_name] = { pesuser_name: a.pesuser_name, dept: a.dept };
      userMap[a.pesuser_name].appraisal = {
        teaching_quality_evaluation: a.teaching_quality_evaluation,
        research_quality_evaluation: a.research_quality_evaluation,
        administrative_quality_evaluation: a.administrative_quality_evaluation,
        community_quality_evaluation: a.community_quality_evaluation,
      };
    }

    // Add performance data
    for (const p of performances) {
      if (!userMap[p.pesuser_name]) userMap[p.pesuser_name] = { pesuser_name: p.pesuser_name, dept: p.dept };
      userMap[p.pesuser_name].performance = {
        competence: p.competence,
        integrity: p.integrity,
        compatibility: p.compatibility,
        use_of_resources: p.use_of_resources,
      };
    }

    // Add stress data
    for (const s of stresses) {
      if (!userMap[s.pesuser_name]) userMap[s.pesuser_name] = { pesuser_name: s.pesuser_name, dept: s.dept };
      userMap[s.pesuser_name].stress = {
        // stress_category: s.stress_category,
        stress_theme: s.stress_theme,
        stress_feeling_frequency: s.stress_feeling_frequency,
      };
    }

    // Add lead scores to result
    const result = Object.values(userMap).map((u: any) => ({
      ...u,
      lead_scores: leadMap[u.pesuser_name] || null,
    }));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching all data scores:', error);
    return NextResponse.json({ error: 'Failed to fetch all data scores' }, { status: 500 });
  }
}
