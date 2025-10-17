// app/api/auditor/submissions/route.ts
import { NextResponse } from 'next/server';
import prisma from '../prisma.dev';

export async function GET() {
const data = await prisma.$queryRawUnsafe(`
    SELECT 
        s.id,
        s.type,
        s.periodType,
        s.periodLabel,
        s.status,
        d.name as department,
        s.createdAt,
        s.submittedAt
    FROM submission s
    JOIN department d ON s.departmentId = d.id
    WHERE s.status = 'SUBMITTED'
    ORDER BY s.createdAt DESC
`);
  return NextResponse.json(data);
}