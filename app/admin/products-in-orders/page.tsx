import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderByStatus from "@/actions/getOrderByStatus";
import NullData from "@/app/components/NullData";
import React from 'react'; // Add this line

const Orders: React.FC = async () => { // Add React.FC here
  const orders = await getOrderByStatus("pending");

  if (!orders) {
    return <NullData title="No orders yet..." />;
  }

  return (
    <div className="p-8">
      <Container>
        {orders.map(order => (
          <OrderDetails key={order.id} order={order} />
        ))}
      </Container>
    </div>
  );
};

export default Orders;
