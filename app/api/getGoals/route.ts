import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

type Goals = {
  id: number
  name: string
  status: string
  daysLeft: string
  user_id: string
}
interface payload{
  token: string
}

async function getData( user: string | null ) {
  console.log(user)
  const goals: Goals[] = await prisma.$queryRawUnsafe('SELECT * FROM goals WHERE user_id = $1', user?.toString())
  
  await prisma.$disconnect()
  return goals
}

export async function POST(request: NextRequest) {
  const {token} = await request.json();
  console.log( 'access token is', token)

  const user = jwt.verify( token, 'oti') as string;
  if (token) {
    try {
      let goals = await getData(user)
      console.log(user)
      return NextResponse.json(goals)
  
    } catch(err) {
      console.error(err)
      return NextResponse.json({ data: ['no data'] })
    }    
  }
  NextResponse.redirect(new URL('/not-found', request.url))
}