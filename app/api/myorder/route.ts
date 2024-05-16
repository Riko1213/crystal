import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";



export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.error();
    }

    const orderData = {
      userId: currentUser.id,
      orderId: orderId,
    };

    await prisma.myorder.create({
      data: orderData,
    });

    return new Response("Order created successfully", { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
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
      const orders=await prisma.myorder.findMany()
      return new Response(JSON.stringify(orders), { status: 200, headers: { "Content-Type": "application/json" } });
    };
    const orders = await prisma.myorder.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return new Response(JSON.stringify(orders), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.error();
  }
}