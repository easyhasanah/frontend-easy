"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "./PasswordInput";
import { Label } from "@/components/ui/Label";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import { Check, AlertCircle, Info } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const authStore = useAuthStore();
  const toastStyles = {
    info: {
      style: {
        background: "#1EA39D",
        color: "#ffffff",
        borderRadius: "4px",
      },
      progressStyle: {
        background: "#1EA39D",
      },
      icon: <Info color="#ffffff" size={20} />,
    },
    error: {
      style: {
        background: "#e74c3c",
        color: "#ffffff",
        borderRadius: "4px",
      },
      progressStyle: {
        background: "#e74c3c",
      },
      icon: <AlertCircle color="#ffffff" size={20} />,
    },
    warning: {
      style: {
        background: "#f1c40f",
        color: "#ffffff",
        borderRadius: "4px",
      },
      progressStyle: {
        background: "#f1c40f",
      },
      icon: <AlertCircle color="#ffffff" size={20} />,
    },
    success: {
      style: {
        background: "#2ecc71",
        color: "#ffffff",
        borderRadius: "4px",
      },
      progressStyle: {
        background: "#2ecc71",
      },
      icon: <Check color="#ffffff" size={20} />,
    },
  };
  const showToast = (
    message: string,
    type: "info" | "error" | "warning" | "success"
  ) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastStyles[type].style,
      icon: toastStyles[type].icon,
    });
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", formData);

      authStore.setToken(res.data.token);
      showToast("Login berhasil!", "success");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Error: ", error);

      const errorMessage =
        error?.response?.data?.message ||
        "Login gagal. Periksa kembali username dan password.";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col items-center justify-center bg-teal-50 p-6 md:w-2/3">
        <div className="max-w-full">
          <Image
            src="/image/login_ilustration.svg"
            alt="Login Illustration"
            width={800}
            height={800}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6 md:w-1/3">
        <div className="w-full max-w-md space-y-8">
          <div className="mb-8 flex justify-center">
            <Image
              src="/image/Logo_EH.svg"
              alt="Easy Hasanah"
              width={200}
              height={60}
              className="h-auto w-60"
            />
          </div>

          <div className="mt-2 text-center text-teal-600 font-bold">
            <p>Lebih mudah, cepat, aman!</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="mb-6 flex flex-col space-y-1.5">
                <Label htmlFor="email" className="mb-1 font-medium">
                  Email
                </Label>
                <Input
                  id="username"
                  placeholder=""
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
              <div className="mb-6 flex flex-col space-y-1.5">
                <Label htmlFor="password" className="mb-1 font-medium">
                  Kata Sandi
                </Label>
                <PasswordInput
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Lupa kata sandi?{" "}
                  <a href="#" className="text-teal-600 hover:underline">
                    Klik disini
                  </a>
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <Button className="w-[200px] bg-[#1EA39D] hover:bg-teal-600 px-6 font-semibold">
                  Masuk
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
