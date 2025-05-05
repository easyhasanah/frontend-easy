"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const FormAddress = () => {
  const router = useRouter()

  const handleToSuccessPage = () => {
    router.push('/form/address-success')
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h2 className="text-center text-xl font-semibold mb-6">
        Formulir Alamat Pengiriman Kartu
      </h2>

      <div className="flex items-center space-x-2 mb-4">
        <Checkbox id="same-as-ktp" defaultChecked className="border-[#1EA39D] text-teal-500 rounded-sm data-[state=checked]:bg-[#1EA39D]" />
        <label
          htmlFor="same-as-ktp"
          className="text-sm font-medium leading-none"
        >
          Alamat pengiriman sesuai dengan alamat di KTP
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input placeholder="Nama Depan" />
        <Input placeholder="Nama Belakang" />
      </div>

      <div className="mb-4">
        <Input placeholder="Alamat" />
      </div>

      <div className="mb-4">
        <Input placeholder="Kota" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input placeholder="Provinsi" />
        <Input placeholder="Kode Pos" />
      </div>

      <div className="mb-6">
        <Input placeholder="Nomor Telepon" />
      </div>

      <div className="text-center">
        <Button className="bg-[#1EA39D] hover:bg-teal-600 text-white px-8 py-2" onClick={handleToSuccessPage}>
          Selanjutnya
        </Button>
      </div>
    </div>
  );
};

export default FormAddress;
