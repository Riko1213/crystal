"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { useState } from "react";

interface ProductCardProps {
  data: any;
}
export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  qity:number;
  price: number;
};
export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const { handleAddProductToCart} = useCart();
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: data.id,
    name: data.name,
    description: data.description,
    category: data.category,
    brand: data.brand,
    selectedImg: { ...data.images[0] },
    qity: data.quantity,
    quantity: 1,
    price: data.price,
  });

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  console.log(productRating);

  return (
  <div className="col-span-1
  cursor-pointer
  border-[1.2px]
  border-slate-200
  bg-slate-50
  rounded-sm
  p-2
  transition
  hover:scale-105
  text-center
  text-sm
  ">
    <div
      onClick={() => router.push(`/product/${data.id}`)}
    >
      <div
        className="
      flex
      flex-col
      items-center
      w-full
      gap-1
      "
      >
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={data.images[0].image}
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} Сэтгэгдлүүд</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
    <div className="max-w-[300px]">
              <Button
                label="Сагсанд нэмэх"
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
    </div>
    
  );
};

export default ProductCard;
