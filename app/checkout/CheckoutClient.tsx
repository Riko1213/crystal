"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const CheckoutClient = () => {
  const { cartProducts } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(true);
  const{handleSubmit,formState:{errors},}=useForm<FieldValues>({defaultValues:{
    phone:"",
    address:"",
  },})

  const router = useRouter();

  useEffect(() => {
    //create a paymentintent as soon as the page loads
    if (cartProducts) {
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          phone:data.phone,
          address:data.address,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .catch((error) => {
          setError(true);
          console.log("Error", error);
          toast.error("Something went wrong");
        });
        
    }
}}, [cartProducts]);

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {cartProducts && (
          <CheckoutForm
            handleSetWrote={handleSetPaymentSuccess}
          />
      )}
      {loading && <div className="text-center">Уншиж байна</div>}
      {error && (
        <div className="text-center text-rose-500">Алдаа гарлаа</div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center"></div>
          <div className="max-w-[220px] w-full">

            <Button
              label="Захиалгаа хянах"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
