"use client";

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/types";
import axios from "axios";

interface PasswordFormProps {
  currentUser: SafeUser | null;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/login");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.put("/api/register", data);
      setIsLoading(false);

      if (response.status === 200) {
        router.push("/login");
        router.refresh();
        toast.success("Шинэчилсэн");
      } else {
        toast.error(response.data.error || "An error occurred");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred");
    }
  };

  if (currentUser) {
    return <p className="text-center">Нэвтэрч байна</p>;
  }

  return (
    <>
      <Heading title="Нууц үг шинэчлэх" />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="Цахим хаяг"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Нууц үг"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Шинэчлэх"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default PasswordForm;
