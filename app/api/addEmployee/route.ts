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
  poa : string
  doc : string
  post : string
  dopp: string
  level: string
  image : string
  org : string
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
 
 const randPassword = generateUniquePassword()
 


async function addUser(info: reqInfo) {
  const { 
   name, 
   email, 
   gsm, 
   address, 
   faculty_college, 
   dob, 
   doa, 
   poa, 
   doc, 
   post, 
   dopp, 
   level, 
   org, 
   manage_user, 
   access_em, 
   ae_all, 
   ae_sub, 
   ae_sel, 
   define_performance, 
   dp_all, 
   dp_sub, 
   dp_sel, 
   access_hierachy, 
   manage_review, 
   mr_all, 
   mr_sub, 
   mr_sel } = info

  try{
      await prisma.$queryRaw`
         INSERT INTO pesuser (name, email, password, gsm, role, address, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org)
         VALUES (${name}, ${email}, ${ randPassword }, ${gsm}, ${post}, ${address}, ${faculty_college}, ${ new Date(dob) }, ${ new Date(doa) }, ${poa}, ${ new Date(doc) }, ${post}, ${ new Date(dopp) }, ${level}, NULL, ${org});
      `
      await prisma.$queryRaw`
         INSERT INTO permission (manage_user, access_em, ae_all, ae_sub, ae_sel, define_performance, dp_all, dp_sub, dp_sel, access_hierachy, manage_review, mr_all, mr_sub, mr_sel, user_id, org)
         VALUES (${manage_user}, ${access_em}, ${ ae_all }, ${ae_sub}, ${ae_sel}, ${define_performance}, ${dp_all}, ${ dp_sub }, ${ dp_sel }, ${access_hierachy}, ${ manage_review }, ${mr_all}, ${mr_sub}, ${mr_sel}, ${name}, ${org});
      `

      await prisma.$queryRaw`
         UPDATE roles
         SET assigned = assigned + 1
         WHERE name = ${ post };
         AND org = '${ org }'
      `

      await prisma.$disconnect()
      return `success`
  } catch(error) {
      return error
  }
}

export async function POST(req: Request) {
  const reqInfo = await req.json()
  
   try {
      let data = await addUser(reqInfo)
      console.log(data);
      if (data == 'success') {
      return NextResponse.json({ message: 'added role  successfully!', status: 200 })      
      } else {
      return NextResponse.json({ message: 'There was a problem', status: 500})
      }
   } catch (err) {
      console.error(err)
      return NextResponse.json({ message: 'Invalid credentials'})
   }
}
