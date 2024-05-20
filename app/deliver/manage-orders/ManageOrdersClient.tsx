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
    let rows: any = [];
    if (orders) {
      rows = orders.map((order) => {
        return {
          ddate:order.date,
          desc:order.desc,
          id: order.id,
          phone: order.number,
          address:order.address,
          customer: order.user.name,
          amount: formatPrice(order.amount / 100),
          date: moment(order.createDate).fromNow(),
          deliveryStatus: order.deliveryStatus,
        };
      });
    }

    const columns: GridColDef[] = [
      { field: "ddate", headerName: "Огноо", width: 220 },
    { field: "desc", headerName: "Тайлбар", width: 220 },
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
                  color="text-green-70  0"
                />
              ): params.row.deliveryStatus === "paidnotdel" ? (
                <Status
                  text="Төлөгдсөн"
                  icon={MdOutlinePaid}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              ):params.row.deliveryStatus === "delnotpaid" ? (
                <Status
                  text="Төлөгдөөгүй"
                  icon={MdMoneyOff}
                  bg="bg-green-200"
                  color="text-green-700"
                />
              ):params.row.deliveryStatus === "cancel" ? (
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
          );
        },
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
      axios.post("/api/myorder", {
          orderId: id,
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
