import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN"&&currentUser.role !== "OPERATOR") {
    return NextResponse.error();
  }

  const product = await prisma?.product.delete({
    where: { id: params.id },
  });

  return NextResponse.json(product);
}
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN"&&currentUser.role !== "OPERATOR") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { quantity } = body;

  const product = await prisma?.product.findUnique({
    where: { id: params.id },
    select: { quantity },
  });

  if (!product) {
    return NextResponse.error();
  }

  return NextResponse.json(product);
}
