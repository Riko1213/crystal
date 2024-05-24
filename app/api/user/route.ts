import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {

  

  const body = await request.json();
  const { id,Role } = body;

  const user = await prisma.user.update({
    where: { id: id },
    data: { role:Role },
  });

  return NextResponse.json(user);
}
export async function DELETE(request: Request) {

  

  const body = await request.json();
  const { id } = body;

  const user = await prisma.user.delete({
    where: { id: id },
  });

  return NextResponse.json(user);
}