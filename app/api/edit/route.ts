import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, inStock,quantity,name,description,brand,price } = body;

  const product = await prisma.product.update({
    where: { id: id },
    data: { inStock,quantity,name,description,brand,price },
  });

  return NextResponse.json(product);
}