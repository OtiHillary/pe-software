import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'

type Goals = {
  name: string
  description: string
  due_date: string
  user_id: string
  id: string
}

async function updateData( entry: Goals ) {
   const params = [ entry.name, entry.description, new Date(entry.due_date), entry.user_id  ]
   const query = `
        INSERT INTO goals (name, description, status, day_started, due_date, user_id)
        VALUES ( $1, $2, 70, '1990-01-01', $3, $4 );
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