import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type reqInfo = {
   email: string
   password: string
}
 
 
async function getUser(info: reqInfo) {
   const {email, password} = info
   const user = await prisma.users.findMany({
      where: {
         email: email,
         password: password
      }
   })

   return user
}


export {
   getUser,
   // getGoals,
   // getPerformance
}