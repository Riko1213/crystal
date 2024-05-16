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
  const [rows, setRows] = useState<any[]>([]); // State for rows

  useEffect(() => {
    // Fetch data from the API
    axios.get('/api/myorder')
      .then(response => {
        if (!response.data) {
          throw new Error('Network response was not ok');
        }
        return response.data; // Use response.data directly
      })
      .then(data => {
        // Process the data and update the rows state
        const updatedRows = orders.map(order => {
          const foundOrder = data.find((item: any) => item.orderId === order.id);
          if (foundOrder) {
            return {
              id: order.id,
              name:foundOrder.userId,
              phone: order.number,
              address: order.address,
              customer: order.user.name,
              amount: formatPrice(order.amount / 100),
              date: moment(order.createDate).fromNow(),
              deliveryStatus: order.deliveryStatus,
            };
          }
          return null;
        });
        setRows(updatedRows.filter(row => row !== null)); // Filter out null rows
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  const columns: GridColDef[] = [
    {field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "нэр", width: 100 },
    { field: "customer", headerName: "нэр", width: 100 },
    { field:"phone",headerName:"Утас",width:100},
    {field:"address",headerName:"Хаяг",width:200},
    {
      field: "amount",
      headerName: "Үнэ",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Хүргэлтийн хэлбэр",
      width: 130,
      renderCell: (params) => {
        return (
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
                text="dispatched"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
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
        );
      },
    },
    {
      field: "date",
      headerName: "Огноо",
      width: 130,
    },
    {
      field: "action",
      headerName: "Үйлдэл",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "dispatched",
      })
      .then((res) => {
        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);

  const handleDeliver = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.success("Order Delivered");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Захиалгууд" center />
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
