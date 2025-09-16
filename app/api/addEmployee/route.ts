import { NextResponse } from 'next/server'
import prisma from '../prisma.dev'
const randombytes = require('randombytes');

type reqInfo = {
  name: string
  email: string 
  password: string
  gsm: string
  role: string
  address: string
  faculty_college: string
  dob: string
  doa: string
  poa: string | null
  doc: string | null
  post: string | null
  dopp: string
  level: string | null
  image: string | null
  org: string
  manage_user: string
  access_em: string
  ae_all: string
  ae_sub: string
  ae_sel: string
  define_performance: string
  dp_all: string
  dp_sub: string
  dp_sel: string
  access_hierachy: string
  manage_review: string
  mr_all: string
  mr_sub: string
  mr_sel: string
}

function generateUniquePassword(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const randomBytes = randombytes(length);
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(randomBytes[i] % chars.length);
    password += chars.charAt(randomIndex);
  }
  return password;
}

function sanitizeString(val?: string | null) {
  if (!val) return null
  return val.replace(/\u0000/g, '') // remove all null characters
}


const randPassword = generateUniquePassword();

async function addAssigned(info: reqInfo){
  const { role , org } = info
  await prisma.$queryRaw`
    UPDATE roles
    SET assigned = assigned + 1
    WHERE name = ${role}
    AND org = ${org};
  `
}

async function addUser(info: reqInfo) {
  const { 
    name, email, gsm, role, address, faculty_college,
    dob, doa, poa, doc, post, dopp, level, org,
    manage_user, access_em, ae_all, ae_sub, ae_sel,
    define_performance, dp_all, dp_sub, dp_sel,
    access_hierachy, manage_review, mr_all, mr_sub, mr_sel
  } = info

  try {
    // Insert into pesuser and get back the id
    const user: any = await prisma.$queryRaw`
      INSERT INTO pesuser 
      (name, email, password, gsm, role, address, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org)
      VALUES (
        ${name}, ${email}, ${randPassword}, ${gsm}, ${role}, ${address}, ${faculty_college},
        ${dob ? new Date(dob) : null},
        ${doa ? new Date(doa) : null},
        ${sanitizeString(poa) || null},
        ${doc ? new Date(doc) : null},
        ${sanitizeString(post) || null},
        ${dopp ? new Date(dopp) : null},
        ${sanitizeString(level) || null},
        NULL,
        ${org}
      )
      RETURNING id;
    `

    const userId = user[0].id

    // Insert into permission with correct user_id
    await prisma.$queryRaw`
      INSERT INTO permission 
      (manage_user, access_em, ae_all, ae_sub, ae_sel, define_performance, dp_all, dp_sub, dp_sel, access_hierachy, manage_review, mr_all, mr_sub, mr_sel, user_id, org)
      VALUES (
        ${manage_user}, ${access_em}, ${ae_all}, ${ae_sub}, ${ae_sel}, 
        ${define_performance}, ${dp_all}, ${dp_sub}, ${dp_sel},
        ${access_hierachy}, ${manage_review}, ${mr_all}, ${mr_sub}, ${mr_sel},
        ${userId}, ${org}
      );
    `

    await addAssigned(info)

    return 'success'
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function POST(req: Request) {
  const reqInfo = await req.json()
  
  try {
    let data = await addUser(reqInfo)
    if (data === 'success') {
      return NextResponse.json({ message: 'added role successfully!', status: 200 })      
    } else {
      return NextResponse.json({ message: 'There was a problem', status: 500 })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Invalid credentials' })
  }
}
