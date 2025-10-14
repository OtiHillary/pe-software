// app/api/counterTotals/route.ts
import { NextResponse } from 'next/server'
import prisma from '../prisma.dev'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const section = searchParams.get('section')

  if (!section) {
    return NextResponse.json({ error: 'Section is required' }, { status: 400 })
  }

  const counter = await prisma.counterTotals.findUnique({
    where: { section },
  })

  if (!counter) {
    return NextResponse.json(
      { total: 0, status: 'pending' }, // default if no record yet
      { status: 200 }
    )
  }

  return NextResponse.json(counter)
}
