import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN"&&currentUser.role !== "OPERATOR") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, address,desc,number } = body;

  const order = await prisma.order.update({
    where: { id: id },
    data: { address,desc,number },
  });

  return NextResponse.json(order);
}
