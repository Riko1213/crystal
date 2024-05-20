import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
export async function GET(request: Request) {
  try {
    const { id } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true
      }
    });

    if (!user) {
      return new Response(null, { status: 404 });
    }

    return NextResponse.json({ name: user.name });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(null, { status: 500 });
  }
}
export async function PUT(request: Request) {

  

  const body = await request.json();
  const { email,password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const order = await prisma.user.update({
    where: { email: email },
    data: { hashedPassword:hashedPassword },
  });

  return NextResponse.json(order);
}
