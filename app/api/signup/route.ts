import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
import prisma from '../prisma.dev'

type reqInfo = {
  name: string
  email: string
  password: string
  type: string
}

type user = {
  id:number
  name: string
  email: string 
  password: string
  gsm: string
  role: string
  address: string
  faculty_college: string
  dob: string
  doa: string
  poa : string
  doc : string
  post : string
  dopp: string
  level: string
  image : string
  org : string
}

async function addToDb(info: reqInfo) {
  const {name, email, password, type} = info
  await prisma.$queryRaw`INSERT INTO users (name, email, password, gsm, role, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org) VALUES( ${name}, ${email}, ${password}, null, ${type}, null, null, null, null, null, null, null, null, null, null, ); `
  const users = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email} AND password = ${password};`

  return users as user[]
}

export async function GET() {
  return NextResponse.json({ name: 'successful!', data: 'true' })
}

export async function POST(req: Request) {
  const { name, email, password , type } = await req.json()
  console.log(email, password)
  
  let sID = Math.floor(Math.random())

  try {
    let data = await addToDb({ name, email, password, type })
    console.log(data);
    await prisma.$disconnect()
    
    if (data.length > 0) {
      const token = jwt.sign( { name: data[0].name, role: data[0].role }, 'oti');
      
      console.log(token, 'before send', data[0].name)
      return NextResponse.json({ message: 'Login successful!', token: token, status: 200 })      
    } else {
      return NextResponse.json({ message: 'Invalid credentials', status: 500})
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Invalid credentials'})
  }

}
