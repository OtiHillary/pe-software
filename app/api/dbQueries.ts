import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type reqInfo = {
   email: string
   password: string
}
 
 
async function getUser(info: reqInfo) {
   const {email, password} = info
   const user = await prisma.users.findMany({
      email: email,
      password: password
   })

   // const user = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email} AND password = ${password};`
   return user
}

async function getPerformance( user: string | null ) {
   const performance = await prisma.performance.findMany({
      name: user
   })
  return performance
}

async function getGoals( user: string | null ) {
   const performance = await prisma.goals.findMany({
      name: user
   })
  return performance
}

export {
   getUser,
   getGoals,
   getPerformance
}