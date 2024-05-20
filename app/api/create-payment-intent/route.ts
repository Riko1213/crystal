import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import getCurrentUser from "@/actions/getCurrentUser";

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  const price: any = Math.floor(totalPrice);

  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { items, address, number,desc,date } = body;
  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    userId: currentUser.id,
    amount: total,
    number: number,
    address: address,
    desc:desc,
    date:date,
    deliveryStatus: "pending",
    products: items,
  };

  try {
    await prisma.order.create({
      data: orderData,
    });

    return new Response("Order created successfully", { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.error();
  }
}
