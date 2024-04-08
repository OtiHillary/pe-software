import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
const prisma = new PrismaClient()

type reqInfo = {
  email: string
  password: string
}

type user = {
  id:number
  name: string
  email: string
  password: string
  type:string
  created_on:Date
  last_log: Date
}

async function getUser(info: reqInfo) {
  const {email, password} = info
  const users = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email} AND password = ${password};`
  return users as user[];
}

export async function POST(req: Request) {
  const { email, password } = await req.json()
  
  try {
    let data = await getUser({ email, password })
    await prisma.$disconnect()
    
    if (data) {
      const token = jwt.sign( data[0].name , 'oti');
      return NextResponse.json({ message: 'Login successful!', token: token })      
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Invalid credentials'})
  }
}
