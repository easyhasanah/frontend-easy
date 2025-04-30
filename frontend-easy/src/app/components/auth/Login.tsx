"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { Label } from "@/components/ui/Label";

// Schema validasi

// Inisialisasi form dengan react-hook-form

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
      {/* Section Ilustrasi (Kiri) */}
      <div className="flex flex-col items-center justify-center bg-teal-50 p-6 md:w-1/2">
        <div className="max-w-md">
          <Image
            src="/image/ilustrasi_login.png"
            alt="Login Illustration"
            width={500}
            height={500}
            priority
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* Section Form Login (Kanan) */}
      <div className="flex flex-col items-center justify-center p-6 md:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/image/Logo_EH.svg"
              alt="Easy Hasanah"
              width={200}
              height={60}
              className="h-auto w-60"
            />
          </div>

          {/* Tagline */}
          <div className="text-center text-teal-600">
            <p>Lebih mudah, cepat, aman!</p>
          </div>

          {/* Form Login */}
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder=""
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
              <div className="flex justify-center">
                <Button className="w-[200px] bg-teal-500 hover:bg-teal-600 px-6">
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
