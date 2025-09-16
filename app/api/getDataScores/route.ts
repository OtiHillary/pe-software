// pages/api/dept-scores.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../prisma.dev'


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dept = searchParams.get("dept");

  if (!dept) {
    return NextResponse.json(
      { error: "Missing dept parameter" },
      { status: 400 }
    );
  }

  try {
    // appraisal values
    const appraisal = await prisma.$queryRaw<
      { teaching_quality_evaluation: number | null; research_quality_evaluation: number | null; administrative_quality_evaluation: number | null; community_quality_evaluation: number | null }[]
    >`
      SELECT teaching_quality_evaluation, research_quality_evaluation, administrative_quality_evaluation, community_quality_evaluation, pesuser_name
      FROM appraisal
      WHERE dept = ${dept};
    `;

    // userperformance values
    const userperformance = await prisma.$queryRaw<
      { competence: number | null; integrity: number | null; compatibility: number | null; use_of_resources: number | null }[]
    >`
      SELECT competence, integrity, compatibility, use_of_resources, pesuser_name
      FROM userperformance
      WHERE dept = ${dept};
    `;

    // stress values
    const stress = await prisma.$queryRaw<
      { staff_stress_category_form: string | null; stress_theme_form: string | null; stress_feeling_frequency_form: string | null }[]
    >`
      SELECT staff_stress_category_form, stress_theme_form, stress_feeling_frequency_form, pesuser_name
      FROM stress
      WHERE dept = ${dept};
    `;

    // flatten appraisal numeric fields
    const appraisalValues: number[] = appraisal.flatMap(a =>
      [a.teaching_quality_evaluation, a.research_quality_evaluation, a.administrative_quality_evaluation, a.community_quality_evaluation].filter((v): v is number => v !== null)
    );

    // flatten userperformance numeric fields
    const userPerformanceValues: number[] = userperformance.flatMap(u =>
      [u.competence, u.integrity, u.compatibility, u.use_of_resources].filter((v): v is number => v !== null)
    );

    // stress values (for now just assign mock numeric scores, unless you have numeric mapping)
    const stressValues: number[] = stress.map(() => Math.floor(Math.random() * 100));

    // console.log({
    //   appraisal: appraisal,
    //   userperformance: userperformance,
    //   stress: stress
    // });

    return NextResponse.json({
      appraisal: appraisal,
      userperformance: userperformance,
      stress: stress,
    });
  } catch (error) {
    console.error("Error fetching analysis dataset:", error);
    return NextResponse.json(
      { error: "Failed to fetch dataset" },
      { status: 500 }
    );
  }
}
