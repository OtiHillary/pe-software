import { NextResponse } from "next/server";
import prisma from "../prisma.dev";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    let whereClause = "";
    if (name) whereClause = `WHERE pesuser_name = '${name.replace(/'/g, "''")}'`;

    const results = await prisma.$queryRawUnsafe<any[]>(`
      SELECT pesuser_name, dept, teaching_quality_evaluation, research_quality_evaluation,
             administrative_quality_evaluation, community_quality_evaluation
      FROM counter_appraisal ${whereClause};
    `);

    console.log('counter Query results:', results);

    return NextResponse.json(results);
  } catch (err) {
    console.error("Error fetching counter appraisal:", err);
    return NextResponse.json({ error: "Failed to fetch counter appraisal" }, { status: 500 });
  }
}
