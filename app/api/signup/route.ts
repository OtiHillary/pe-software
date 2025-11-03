import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '../prisma.dev'
import { AppPageRouteModuleOptions } from 'next/dist/server/future/route-modules/app-page/module.compiled'

type reqInfo = {
  name: string
  org: string
  email: string
  password: string
  type: string
  plan: string
  planCode: string
  category: string
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

type planCodes = keyof typeof amounts

const amounts = {
  PLN_w4hf2tk7k3mu66a: 'basic',
  PLN_pl6nmfsedqvm0oa: 'standard',
  PLN_bquiv8u3t2otwuh: 'premium'
}

async function addToDb(info: reqInfo) {
  const {name, email, password, type, category, plan, planCode, org} = info
  let amount = amounts[planCode as planCodes]

  await prisma.$queryRaw`INSERT INTO pesuser (name, email, password, gsm, role, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org, category, plan) VALUES( ${name}, ${email}, ${password}, null, ${type}, null, null, null, null, null, null, null, null, null, ${org}, ); `
  await prisma.$queryRaw`INSERT INTO subscriptions_info (pesuser_email, pesuser_name, org, plan_code, plan_name, reference, status, amount, paid_at, created_at) VALUES ( ${email}, ${name}, ${org}, ${planCode}, ${plan}, null, "success", ${amount}, null, null)`
//  insert into org;
//  id | name | category | plan | created_at | updated_at
// ----+------+----------+------+------------+------------

  await prisma.$queryRaw`INSERT INTO org (name, category, plan, created_at, updated_at) VALUES ( ${name}, ${category}, ${plan}, ${plan}, null, null)`

  const users = await prisma.$queryRaw`SELECT * FROM pesuser WHERE email = ${email} AND password = ${password};`
  return users as user[]
}

export async function GET() {
  return NextResponse.json({ name: 'successful!', data: 'true' })
}

export async function POST(req: Request) {
  const { name, org, email, password, type, category, plan, planCode } = await req.json()
  console.log(email, password)
  
  // let sID = Math.floor(Math.random())

  try {
    let data = await addToDb({ name, email, password, type, category, plan, planCode, org })
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
