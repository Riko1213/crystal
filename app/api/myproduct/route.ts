import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { name } = await request.json();

    if (!name) {
      return NextResponse.error();
    }

    const orderData = {
      userId: currentUser.id,
      name: name,
    };

    await prisma.myproduct.create({
      data: orderData,
    });

    return new Response("Бараа миний бараа хэсэгт нэмэгдсэн", { status: 201 });
  } catch (error) {
    console.error("Error бараа нэмэх:", error);
    return NextResponse.error();
  }
}
export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }
    if(currentUser.role === "ADMIN"){
      const products=await prisma.myproduct.findMany()
      return new Response(JSON.stringify(products), { status: 200, headers: { "Content-Type": "application/json" } });
    }

    const products = await prisma.myproduct.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return new Response(JSON.stringify(products), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.error();
  }
}