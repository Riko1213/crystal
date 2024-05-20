"use client";

import {  User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
    MdPhoneEnabled,
  MdDeliveryDining,
  MdPersonOutline,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

interface ManageUsersClientProps {
  users: User[];
}



const ManageOrdersClient: React.FC<ManageUsersClientProps> = ({ users }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();
  let rows: any = [];

  if (users) {
    rows = users
    .filter(user => {
      if (!selectedDate) return true; // If no date is selected, show all orders
      return moment(user.createdAt).isSame(selectedDate, 'day'); // Filter orders by selected date
    })
    .map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        Role: user.role,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "нэр", width: 200 },
    { field:"email",headerName:"Утас,цахим хаяг",width:300},
    {
      field: "Role",
      headerName: "Хэрэглэгчийн төрөл",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            {params.row.Role === "DELIVER" ? (
              <Status
                text="DELIVER"
                icon={MdDeliveryDining}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.Role === "OPERATOR" ? (
              <Status
                text="OPERATOR"
                icon={ MdPhoneEnabled}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.Role === "USER" ? (
              <Status
                text="USER"
                icon={MdPersonOutline}
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
                changeD(params.row.id);
              }}
            />
            <ActionBtn
              icon={ MdPhoneEnabled}
              onClick={() => {
                changeO(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdPersonOutline}
              onClick={() => {
                changeU(params.row.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  const changeD = useCallback((id: string) => {
    axios.put("/api/user", {
        id,
        Role: "DELIVER",
      })
      .then((res) => {
        toast.success("Үүрэг сольсон");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);
  const changeO = useCallback((id: string) => {
    axios.put("/api/user", {
        id,
        Role: "OPERATOR",
      })
      .then((res) => {
        toast.success("Үүрэг сольсон");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);
  const changeU = useCallback((id: string) => {
    axios.put("/api/user", {
        id,
        Role: "USER",
      })
      .then((res) => {
        toast.success("Үүрэг сольсон");
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
        <Heading title="Хэрэглэгч нар" center />
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Сонгох өдөр"
        />
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
