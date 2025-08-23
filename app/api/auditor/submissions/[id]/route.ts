// app/api/auditor/submissions/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../prisma.dev'; // adjust import based on your project structure



export async function GET(_: Request, { params }: { params: { id: string } }) {
  const sub = await prisma.$queryRaw`
    SELECT s.*, d.name as department_name, 
           json_agg(json_build_object(
             'id', a.id,
             'decision', a.decision,
             'remarks', a.remarks,
             'createdAt', a.created_at,
             'auditor', json_build_object('name', aud.name)
           ) ORDER BY a.created_at DESC) as audits
    FROM submission s
    LEFT JOIN department d ON s.department_id = d.id
    LEFT JOIN external_audit a ON s.id = a.submission_id
    LEFT JOIN auditor aud ON a.auditor_id = aud.id
    WHERE s.id = ${params.id}
    GROUP BY s.id, d.name
  `;
  
  if (!sub || !Array.isArray(sub) || sub.length === 0) {
    return new NextResponse('Not found', { status: 404 });
  }
  return NextResponse.json(sub[0]);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { decision, remarks, auditorId } = await req.json() as {
    decision: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES',
    remarks: string,
    auditorId?: string // you can read from middleware header instead
  };

  if (!decision) return new NextResponse('Missing decision', { status: 400 });

  const sub = await prisma.$queryRaw`
    SELECT * FROM submission WHERE id = ${params.id}
  `;
  
  if (!Array.isArray(sub) || sub.length === 0) {
    return new NextResponse('Not found', { status: 404 });
  }

  // create audit record
  await prisma.$executeRaw`
    INSERT INTO external_audit (submission_id, auditor_id, decision, remarks)
    VALUES (${sub[0].id}, ${auditorId || 'unknown'}, ${decision}, ${remarks})
  `;

  // update submission status if terminal
  const status =
    decision === 'APPROVE' ? 'APPROVED' :
    decision === 'REJECT' ? 'REJECTED' : 'NEEDS_CHANGES';

  await prisma.$executeRaw`
    UPDATE submission 
    SET status = ${status}
    WHERE id = ${sub[0].id}
  `;

  return NextResponse.json({ ok: true, status });
}