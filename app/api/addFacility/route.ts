import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'

type Facility = {
   description: string,
   symbol: string,
   location: string,
   id: string,
   type: string,
   rating: number,
   remark: string,
}

async function updateData( entry: Facility ) {
   const params = [ entry.symbol, entry.description, entry.location, entry.id, entry.type, Number(entry.rating), entry.remark,]
   const query = `
        INSERT INTO facilities (identification_symbol, description_of_facility, location, facility_register_id_no, type, priority_rating, remarks, org)
        VALUES ( $1, $2, $3, $4, $5, $6, $7, 'DevSquad inc' );
   `
   await prisma.$queryRawUnsafe(query, ...params)
  
   await prisma.$disconnect()
   return { message: 'success', status: 200 }
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (data) {
    try {
      let goals = await updateData(data)
      console.log(goals)
      return NextResponse.json(goals)
  
   } catch(err) {
      console.error(err)
      return NextResponse.json([])
   }    
  }
  NextResponse.redirect(new URL('/not-found', request.url))
}