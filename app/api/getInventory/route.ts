import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'
import jwt from 'jsonwebtoken'


async function getInventory( user: string | null ) {
  const users = await prisma.$queryRawUnsafe('SELECT * FROM facility where org = $1', user?.toString())
  await prisma.$disconnect()
  return users
}

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  const user = jwt.decode( token, 'oti');

  if (token) {
    try {
      let userInfo = await getInventory(user.name)
      console.log(userInfo);
      
      return NextResponse.json(userInfo)

    } catch(err) {
      console.error(err)
      return NextResponse.json([])
    }    
  }
  return NextResponse.redirect(new URL('/not-found', request.url))
} 