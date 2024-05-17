import { useCart } from "@/hooks/useCart";
import { useCallback, useState } from "react";
import Button from "../components/Button";
import { formatPrice } from "@/utils/formatPrice";
import { toast } from "react-hot-toast";
import axios from "axios";



interface CheckoutFormProps {
  handleSetWrote: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  handleSetWrote,
}) => {
  const { cartTotalAmount, handleClearCart, cartProducts } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const formattedPrice = formatPrice(cartTotalAmount);

  const minusQuantity = useCallback(async (id: string,qity:number) => {
    if(!qity){
      qity=5
    }
    axios
      .put("/api/product", {
        id,
        quantity: qity-1,
      })
      .catch((err) => {
        toast.error("Алдаа");
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call to create payment intent
      const response = await fetch("./api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          address: address,
          number: phone,
          
        }),
      });
       
      cartProducts?.forEach(async (product) => {
        minusQuantity(product.id,product.qity);
      });
      handleClearCart();

      if (!response.ok) {
        throw new Error("Алдаа");
      }

      // Simulate delay
      setTimeout(() => {
        toast.success("Амжилттай");
        handleSetWrote(true);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong during checkout");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Хүргэж өгөх хаягийн мэдээлэл</h2>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Утасны дугаар
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Хаяг
          </label>
          <textarea
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={4}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full resize-none"
          ></textarea>
        </div>
        <div className="py-4 text-center text-slate-700 text-xl font-bold">
          Нийт: {formattedPrice}
        </div>
      </div>
      <Button
        label={isLoading ? "Processing" : "Захиалах"} // Assuming "Захиалах" means "Place Order"
        disabled={isLoading}
        onClick={handleSubmit}
      />
    </form>
  );
};

export default CheckoutForm;
