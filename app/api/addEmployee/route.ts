import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
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
}

function generateUniquePassword(length = 8) {
   const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

   return new Promise((resolve, reject) => {
      const randomBytes = randombytes(length);
      let password = '';
      for (let i = 0; i < length; i++) {
         const randomIndex = Math.floor(randomBytes[i] % chars.length);
         password += chars.charAt(randomIndex);
      }
      resolve(password);
   });
 }
 
 const randPassword = generateUniquePassword()
   .then(password => console.log("Generated password:", password))
   .catch(error => console.error("Error generating password:", error));
 

async function addUser(info: reqInfo) {
  const { name, email, gsm, address, faculty_college, dob, doa, poa, doc, post, dopp, level, org } = info
  try{
      const user = await prisma.$queryRaw`
         INSERT INTO pesuser (name, email, password, gsm, role, address, faculty_college, dob, doa, poa, doc, post, dopp, level, image, org)
         VALUES (${name}, ${email}, ${ randPassword }, ${gsm}, ${post}, ${address}, ${faculty_college}, ${ new Date(dob) }, ${ new Date(doa) }, ${poa}, ${ new Date(doc) }, ${post}, ${ new Date(dopp) }, ${level}, NULL, ${org});
      `
      // const permissions;
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
      return NextResponse.json({ message: 'added employee successfully!', status: 200 })      
      } else {
      return NextResponse.json({ message: 'There was a problem', status: 500})
      }
   } catch (err) {
      console.error(err)
      return NextResponse.json({ message: 'Invalid credentials'})
   }
}
