import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN"&&currentUser.role !== "OPERATOR") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, description, price, brand, category,quantity, inStock, images } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      brand,
      quantity,
      category,
      inStock,
      images,
      price: parseFloat(price),
    },
  });

  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, inStock,quantity } = body;

  const product = await prisma.product.update({
    where: { id: id },
    data: { inStock,quantity },
  });

  return NextResponse.json(product);
}