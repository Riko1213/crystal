"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
  MdEdit,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductsClientProps {
  products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
  products,
}) => {
  const router = useRouter();
  const storage = getStorage(firebaseApp);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    // Filter products based on search term
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        quantity:product.quantity,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "НЭР", width: 220 },
    {
      field: "price",
      headerName: "Үнэ",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Ангилал", width: 100 },
    { field: "quantity", headerName: "Тоо", width: 100 },
    {
      field: "inStock",
      headerName: "Байгаа",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <Status
                text="Байгаа"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="Дууссан"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
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
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.id, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`product/${params.row.id}`);
              }}
            />
            <ActionBtn
              icon={MdEdit}
              onClick={() => {
                handleEdit(params.row.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", {
        id,
        inStock: !inStock,
      })
      .then((res) => {
        toast.success("Өөрчлөгдсөн");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Устгаж байна");

    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("Зураг устгасан", item.image);
          }
        }
      } catch (error) {
        return console.log("Алдаа", error);
      }
    };

    await handleImageDelete();

    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Устгасан");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);
  const handleEdit = useCallback((id: string) => {
    // Navigate to edit page, passing the product ID
    router.push(`/edit/${id}`);
  }, []);

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Бараанууд" center />
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-3 py-1 mt-2 w-full"
        />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredProducts}
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

export default ManageProductsClient;
