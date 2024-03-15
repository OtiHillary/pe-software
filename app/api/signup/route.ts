import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type reqInfo = {
  email: string
  password: string
  fullname: string
}

async function addToDb(info: reqInfo) {
  const {email, password, fullname} = info
  await prisma.$queryRaw`INSERT INTO users(email, password, type, created_on, last_log) VALUES(${email}, ${password}, 'admin', null, null); `
  const users = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email} AND password = ${password};`

  return users
}

export async function GET() {
  return NextResponse.json({ name: 'successful!', data: 'true' })
}

export async function POST(req: Request) {
  const { email, password , fullname} = await req.json()
  console.log(email, password)
  
  let sID = Math.floor(Math.random())

  let data = await addToDb({ email, password, fullname })
  .then(async (data) => {
    await prisma.$disconnect()
    return data
  })
  .catch(async (error) => {
    console.error("your error is:",error)
    await prisma.$disconnect()
  })

  return NextResponse.json({ message: 'Login successful!', data: { email, password, users: data, sID, logged: true } })

}
