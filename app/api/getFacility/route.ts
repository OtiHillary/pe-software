import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'
import jwt from 'jsonwebtoken'

type Facility = {
  description_of_facility: string,
  identification_symbol: string,
  location: string,
  facility_register_id_no: string,
  type: string,
  priority_rating: number,
  remarks: string,
  org: string
}

async function getFacility( user: string | null ) {
  const users: Facility[] = await prisma.$queryRawUnsafe('SELECT * FROM facilities  where org = $1', user?.toString())
  await prisma.$disconnect()
  return users
}

export async function POST(request: NextRequest) {
  const { name } = await request.json();

  if (name) {
    try {
        let userInfo = await getFacility(name)
        console.log(userInfo);
        
        const classes = new Set();
        userInfo.forEach(item => classes.add(item.description_of_facility));
        const stringArray = Array.from(classes);

        console.log(stringArray); // Output: ["boy", "girl", "neutral"]
        return NextResponse.json(stringArray)

    } catch(err) {
        console.error(err)
        return NextResponse.json([])
    }    
  }
  NextResponse.redirect(new URL('/not-found', request.url))
  return NextResponse.json([])
}