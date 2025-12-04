import { NextResponse } from 'next/server'
import prisma from '../prisma.dev'
import jwt from 'jsonwebtoken'

type reqInfo = {
  email: string
  password: string
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
  dept : string
  category : string
  plan : string
}

async function getUser(info: reqInfo) {
  const {email, password} = info
  const users = await prisma.$queryRaw`SELECT * FROM pesuser WHERE email = ${email} AND password = ${password};`
  await prisma.$disconnect()
  return users as user[];
}

export async function POST(req: Request) {
  const { email, password } = await req.json()
  
  try {
    let data = await getUser({ email, password })
    console.log(data);
    await prisma.$disconnect()
    
    if (data.length > 0) {
      const token = jwt.sign( { userID: data[0].id, 
        name: data[0].name, 
        role: data[0].role, 
        org: data[0].org, 
        email: data[0].email, 
        dept: data[0].dept,
        productCategory: data[0].category,
        productPlan: data[0].plan
      }, 'oti');
      return NextResponse.json({ message: 'Login successful!', token: token, role: data[0].role, status: 200 })

    } else {
      return NextResponse.json({ message: 'Invalid credentials', status: 500})
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Invalid credentials'})
  }
}
