import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '../prisma.dev'
import { randomUUID } from "crypto";

const reference = `PES_${randomUUID()}`;

type reqInfo = {
  name: string
  org: string
  email: string
  password: string
  type: string
  plan: string
  planCode: string
  category: string
  logo: string
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
type Org = {
  id: number
  name: string
  category: string
  plan: string
  evaluation: boolean
  created_at: string
  updated_at: string
}


type planCodes = keyof typeof amounts

const amounts = {
  PLN_w4hf2tk7k3mu66a: {code: 'basic', amount: 100},
  PLN_pl6nmfsedqvm0oa: {code:'standard', amount: 200},
  PLN_bquiv8u3t2otwuh: {code:'premium', amount: 300}
}

async function addToDb(info: reqInfo) {
  const { name, email, password, type, category, plan, planCode, org, logo } = info;
  const amount = amounts[planCode as planCodes].amount;

  // 1️⃣ Create org IF NOT EXISTS
  await prisma.$queryRaw`
    INSERT INTO org (name, category, plan)
    VALUES (${org}, ${category}, ${plan})
    ON CONFLICT (name) DO NOTHING;
  `;

  // 2️⃣ Create user
  await prisma.$queryRaw`
    INSERT INTO pesuser (
      name, email, password, gsm, role,
      faculty_college, dob, doa, poa, doc,
      post, dopp, level, image, org, category, plan
    )
    VALUES (
      ${name}, ${email}, ${password}, null, ${type},
      null, null, null, null, null,
      null, null, null, ${logo}, ${org}, ${category}, ${plan}
    );
  `;

  // 3️⃣ Create subscription
  await prisma.$queryRaw`
    INSERT INTO subscriptions_info (
      pesuser_email, pesuser_name, org,
      plan_code, plan_name, reference,
      status, amount, paid_at, created_at
    )
    VALUES (
      ${email}, ${name}, ${org},
      ${planCode}, ${plan}, ${reference},
      'success', ${amount}, null, NOW()
    );
  `;

  // 4️⃣ Fetch user
  const users = await prisma.$queryRaw<user[]>`
    SELECT * FROM pesuser
    WHERE email = ${email}
    LIMIT 1;
  `;

  return users;
}


export async function GET() {
  return NextResponse.json({ name: 'successful!', data: 'true' })
}

export async function POST(req: Request) {
  const { name, org, email, password, type, category, plan, planCode, logo } = await req.json()
  console.log(email, password)
  
  try {
    let data = await addToDb({ name, email, password, type, category, plan, planCode, org, logo })
    console.log(data);
    await prisma.$disconnect()
    
    if (data.length > 0) {
      const token = jwt.sign( { userID: data[0].id, 
        name: data[0].name, 
        role: data[0].role, 
        org: data[0].org, 
        email: data[0].email,
        logo: data[0].image,
        dept: data[0].dept,
        productCategory: data[0].category,
        productPlan: data[0].plan
      }, 'oti');
      
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
