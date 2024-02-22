import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
  return allUsers;
}

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ name: 'successful!', data: 'true' })
}

export async function POST(req: NextRequest, res: NextResponse) {
  // const { email, password } = req.body
  // console.log(email, password);
  
  // let sID = Math.floor(Math.random())
  let userInDb = true

  // let data = main()
  // .then(async () => {
  //   await prisma.$disconnect()
  // })
  // .catch(async (e) => {
  //   console.error(e)
  //   await prisma.$disconnect()
  //   process.exit(1)
  // })

  if ( userInDb ) {
    // req.session.sID = sID;
    res.status(200).json({ message: 'Login successful!', data: 'true' /*{ email, password, data, sID, logged: true }*/ })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
}
