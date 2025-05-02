"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "./PasswordInput";
import { Label } from "@/components/ui/Label";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
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

          <form>
            <div className="grid w-full items-center gap-4">
              <div className="mb-6 flex flex-col space-y-1.5">
                <Label htmlFor="email" className="mb-1 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder=""
                  onChange={handleChange}
                  value={formData.email}
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
