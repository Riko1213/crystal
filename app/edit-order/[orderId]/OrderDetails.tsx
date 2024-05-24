"use client"
import { useState } from "react";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";
import axios from "axios";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const [editableOrder, setEditableOrder] = useState({
    id: order.id,
    address: order.address,
    number: order.number,
    desc: order.desc,
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    axios.put("/api/edit-order",editableOrder);
    console.log("Updated Order Details:", editableOrder);

    // After saving, exit edit mode
    setEditMode(false);
  };

  const handleCancel = () => {
    // Reset editableOrder to original order details
    setEditableOrder({
      id:order.id,
      address: order.address,
      number: order.number,
      desc: order.desc,
    });
    // Exit edit mode
    setEditMode(false);
  };

  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Захиалгын өгөгдлүүд" />
      </div>
      <div>Захиалгын дугаар: {order.id}</div>
      {editMode ? (
        <>
          <div>
            Хаяг: 
            <input
              type="text"
              name="address"
              value={editableOrder.address}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div>
            Утасны дугаар: 
            <input
              type="text"
              name="number"
              value={editableOrder.number}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div>
            Тайлбар: 
            <textarea
              name="desc"
              value={editableOrder.desc}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
        </>
      ) : (
        <>
          <div>Хаяг: {editableOrder.address}</div>
          <div>Утасны дугаар: {editableOrder.number}</div>
          <div>Тайлбар: {editableOrder.desc}</div>
        </>
      )}
      <div>
        Нийт дүн:{" "}
        <span className="font-bold">{formatPrice(order.amount / 100)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div>Хүргэлт хяналт:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>Огноо: {moment(order.createDate).fromNow()}</div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Захиалсан бараа</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">БАРАА</div>
          <div className="justify-self-center">ҮНЭ</div>
          <div className="justify-self-center">ТОО ШИРХЭГ</div>
          <div className="justify-self-end">НИЙТ</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
      {editMode ? (
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Хадгалах
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Цуцлах
          </button>
        </div>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleEdit}
        >
          Засах
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
