import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getUser() {
  // const goodPerformance = await prisma.performance.findMany()
  const goodPerformance = await prisma.$queryRaw`SELECT * FROM performance;`

  return goodPerformance
}

export async function GET() {
  let data = await getUser()
    .then(async (data) => {
      await prisma.$disconnect()
      return data
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      return e
    })

  return NextResponse.json({ data })
}
