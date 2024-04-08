import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

type Performance = {
  id: number
  dept: string
  type: string
  yield: string
  user_id: string
}
interface payload{
  token: string
}

async function getUser( user: string | null ) {
  console.log(user)
  const goodPerformance: Performance[] = await prisma.$queryRawUnsafe('SELECT * FROM performance where user_id = $1 and type = $2', user?.toString(), 'good')
  const badPerformance: Performance[] = await prisma.$queryRawUnsafe('SELECT * FROM performance where user_id = $1 and type = $2', user?.toString(), 'bad')
  
  await prisma.$disconnect()
  return { goodPerformance, badPerformance}
}

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  const user = jwt.verify( token, 'oti') as string;
  console.log( 'access token is', user)
  if (token) {
    try {
      let { goodPerformance, badPerformance} = await getUser(user)
      console.log(user)
      return NextResponse.json({ goodPerformance, badPerformance })
  
    } catch(err) {
      console.error(err)
      return NextResponse.json({ data: ['no data'] })
    }    
  }
  NextResponse.redirect(new URL('/not-found', request.url))
}