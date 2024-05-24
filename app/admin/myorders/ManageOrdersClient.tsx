"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdMoneyOff,
  MdOutlineCancel,
  MdOutlinePaid,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [shipperId, setShipperId] = useState<string>("");

  useEffect(() => {
    axios.get('/api/myorder')
      .then(response => {
        if (!response.data) {
          throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .then(data => {
        const updatedRows = orders.map(order => {
          const foundOrder = data.find((item: any) => item.orderId === order.id);
          if (foundOrder) {
            return {
              ddate: order.date,
              id: order.id,
              phone: order.number,
              address: order.address,
              amount: formatPrice(order.amount / 100),
              date: moment(order.createDate).fromNow(),
              deliveryStatus: order.deliveryStatus,
            };
          }
          return null;
        });
        setRows(updatedRows.filter(row => row !== null));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "ddate", headerName: "Огноо", width: 120 },
    { field: "phone", headerName: "Утас", width: 100 },
    { field: "address", headerName: "Хаяг", width: 200 },
    {
      field: "amount",
      headerName: "Үнэ",
      width: 130,
      renderCell: (params) => (
        <div className="font-bold text-slate-800">{params.row.amount}</div>
      ),
    },
    {
      field: "deliveryStatus",
      headerName: "Хүргэлтийн хэлбэр",
      width: 130,
      renderCell: (params) => (
        <div>
          {params.row.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : params.row.deliveryStatus === "dispatched" ? (
            <Status
              text="Хүргэлтэнд гарсан"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : params.row.deliveryStatus === "delivered" ? (
            <Status
              text="Хүргэгдсэн"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : params.row.deliveryStatus === "paidnotdel" ? (
            <Status
              text="Төлөгдсөн"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : params.row.deliveryStatus === "delnotpaid" ? (
            <Status
              text="Төлөгдөөгүй"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : params.row.deliveryStatus === "cancel" ? (
            <Status
              text="Цуцлагдсан"
              icon={MdOutlineCancel}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Үйлдэл",
      width: 300,
      renderCell: (params) => (
        <div className="flex justify-between gap-4 w-full">
          <ActionBtn
            icon={MdDeliveryDining}
            onClick={() => handleDispatch(params.row.id)}
          />
          <ActionBtn
            icon={MdDone}
            onClick={() => handleDeliver(params.row.id)}
          />
          <ActionBtn
            icon={MdOutlinePaid}
            onClick={() => handlePaid(params.row.id)}
          />
          <ActionBtn
            icon={MdMoneyOff}
            onClick={() => handleDel(params.row.id)}
          />
          <ActionBtn
            icon={MdOutlineCancel}
            onClick={() => handleCancel(params.row.id)}
          />
          <ActionBtn
            icon={MdRemoveRedEye}
            onClick={() => router.push(`/order/${params.row.id}`)}
          />
        </div>
      ),
    },
  ];

  const handleDispatch = useCallback((id: string) => {
    axios.put("/api/order", { id, deliveryStatus: "dispatched" })
      .then(() => {
        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch(err => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);

  const handleCancel = useCallback((id: string) => {
    axios.put("/api/order", { id, deliveryStatus: "cancel" })
      .then(() => {
        toast.success("Цуцалсан");
        router.refresh();
      })
      .catch(err => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);

  const handlePaid = useCallback((id: string) => {
    axios.put("/api/order", { id, deliveryStatus: "paidnotdel" })
      .then(() => {
        toast.success("Төрөл өөрчлөгдсөн");
        router.refresh();
      })
      .catch(err => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);

  const handleDel = useCallback((id: string) => {
    axios.put("/api/order", { id, deliveryStatus: "delnotpaid" })
      .then(() => {
        toast.success("Төрөл өөрчлөгдсөн");
        router.refresh();
      })
      .catch(err => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);

  const handleDeliver = useCallback((id: string) => {
    axios.put("/api/order", { id, deliveryStatus: "delivered" })
      .then(() => {
        toast.success("Order Delivered");
        router.refresh();
      })
      .catch(err => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);

  const handleDeleteOrdersByShipper = () => {
    axios.delete('/api/myorder', { data: { userId: shipperId } })
      .then(() => {
        toast.success("Orders deleted");
        router.refresh();
      })
      .catch(err => {
        toast.error("Error deleting orders");
        console.log(err);
      });
  };

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Захиалгууд" center />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={shipperId}
          onChange={(e) => setShipperId(e.target.value)}
          placeholder="Хүргэгчийн ID"
          className="mr-2 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleDeleteOrdersByShipper}
          className="p-2 bg-red-500 text-white rounded"
        >
          Цэвэрлэх
        </button>
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
