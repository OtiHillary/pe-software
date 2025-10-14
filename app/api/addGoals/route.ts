import { NextRequest, NextResponse } from 'next/server'
import prisma from '../prisma.dev'

type Goals = {
  name: string
  description: string
  due_date: string
  user_id: string
  id: string
}

async function updateData(entry: Goals) {
  const params = [entry.name, entry.description, new Date(entry.due_date), entry.user_id]
  const query = `
        INSERT INTO goals (name, description, status, day_started, due_date, user_id)
        VALUES ($1, $2, 70, '1990-01-01', $3, $4)
        RETURNING id;
   `
  const result = await prisma.$queryRawUnsafe(query, ...params) as Array<{ id: string }>
  const goalId = result[0]?.id

  // 🔔 Insert notification for all users in the same org as this user
  const notifQuery = `
        INSERT INTO notifications (user_id, org, title, message)
        SELECT id, org, $1, $2
        FROM pesuser
        WHERE org = (SELECT org FROM pesuser WHERE id = $3)
   `
  const title = `New Goal Created: ${entry.name}`
  const message = `${entry.description} (Due: ${entry.due_date})`

  await prisma.$queryRawUnsafe(notifQuery, title, message, entry.user_id)

  await prisma.$disconnect()
  return { message: 'success', status: 200, goalId }
}

export async function POST(request: NextRequest) {
  const data = await request.json()

  if (data) {
    try {
      let goals = await updateData(data)
      console.log(goals)
      return NextResponse.json(goals)
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 })
    }
  }

  return NextResponse.redirect(new URL('/not-found', request.url))
}
