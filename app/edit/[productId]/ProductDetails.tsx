"use client";

import React, { useState } from "react";
import Button from "@/app/components/Button";
import axios from "axios";

// Define CartProductType interface
interface CartProductType {
  id: string;
  name: string;
  description: string;
  brand: string;
  quantity: number;
  price: number;
}

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<{ product: CartProductType }> = ({ product }) => {
  const [editForm, setEditForm] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const toggleEditForm = () => {
    setEditForm(!editForm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const parsedValue = id === 'quantity' ? parseInt(value, 10) : value;
    setEditedProduct({ ...editedProduct, [id]: parsedValue });
  };

  const handleSaveChanges = () => {
    axios
      .put("/api/edit", editedProduct)
      .then(() => {
        toggleEditForm();
      })
      .catch((error) => {
        console.error("Error editing product:", error);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        {!editForm ? (
          <>
            <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
            <Horizontal />
            <div className="text-justify">Тайлбар: {product.description}</div>
            <div className="text-justify">Тоо ширхэг: {product.quantity}</div>
            <div className="text-justify">Үнэ: {product.price}</div>
            <div className="text-justify">Бренд: {product.brand}</div>
          </>
        ) : (
          <EditForm product={editedProduct} onInputChange={handleInputChange} onSave={handleSaveChanges} onCancel={toggleEditForm} />
        )}
        <Button label={editForm ? "Cancel" : "Edit"} onClick={toggleEditForm} />
      </div>
    </div>
  );
};

const EditForm: React.FC<{ product: CartProductType; onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onSave: () => void; onCancel: () => void }> = ({
  product,
  onInputChange,
  onSave,
  onCancel,
}) => {
  return (
    <div>
      <div><input className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition" type="text" id="name" value={product.name} onChange={onInputChange} /></div>
      <div><input className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition" type="text" id="description" value={product.description} onChange={onInputChange} /></div>
      <div><input className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition" type="text" id="quantity" value={product.quantity} onChange={onInputChange} /></div>
      <div><input className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition" type="text" id="price" value={product.price} onChange={onInputChange} /></div>
      <div><input className="peer w-full p-4 pt-6 outline-none bg-white font-light border-2 rounded-md transition" type="text" id="brand" value={product.brand} onChange={onInputChange} /></div>
      <Button label="Save Changes" onClick={onSave} />
      <Button label="Cancel" onClick={onCancel} />
    </div>
  );
};

export default ProductDetails;
