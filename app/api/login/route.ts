import { NextResponse } from 'next/server'
import prisma from '../prisma.dev'
import jwt from 'jsonwebtoken'

type reqInfo = {
  email: string
  password: string
}

async function getUser(info: reqInfo) {
  const { email, password } = info
  const users = await prisma.$queryRaw`
    SELECT * 
    FROM pesuser 
    WHERE email = ${email} 
      AND password = ${password};
  `;

  return users as any[];
}

async function getAdminLogo(org: string) {
  const admin: any[] = await prisma.$queryRaw`
    SELECT image 
    FROM pesuser
    WHERE role = 'admin'
      AND org = ${org}
    LIMIT 1;
  `;

  return admin.length > 0 ? admin[0].image : "" as string;
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const data = await getUser({ email, password });

    if (data.length === 0) {
      return NextResponse.json({ message: "Invalid credentials", status: 500 });
    }

    const user = data[0];

    // 🔍 Fetch admin logo in same org
    const adminLogo = await getAdminLogo(user.org);

    // 🧠 If admin isn’t found, fallback to user’s own image or null
    const logo = adminLogo || user.image || null;

    const token = jwt.sign(
      {
        userID: user.id,
        name: user.name,
        role: user.role,
        org: user.org,
        email: user.email,
        logo,                      // <-- injected admin logo
        dept: user.dept,
        productCategory: user.category,
        productPlan: user.plan,
      },
      'oti'
    );

    return NextResponse.json({
      message: "Login successful!",
      token,
      role: user.role,
      status: 200,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ message: "Invalid credentials", status: 500 });
  } finally {
    // Close Prisma AFTER all queries
    await prisma.$disconnect();
  }
}
