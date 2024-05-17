import prisma from "@/libs/prismadb";

export default async function getOrdersByUserId(deliveryStatus: string) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        deliveryStatus: deliveryStatus,
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
