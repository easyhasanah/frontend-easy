"use client";

import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";

const FormAddressSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-2xl w-full p-6 bg-[#ebf7f6] shadow-md rounded-lg text-center">
        <h2 className="text-xl font-semibold text-black mb-4">Berhasil</h2>

        <p className="text-sm md:text-base text-gray-800 mb-1">
          Alhamdulillah, Hasanah Card Anda sedang dalam proses pengiriman.
        </p>
        <p className="text-sm md:text-base text-gray-800 mb-6">
          Lihat detail status pengajuan Hasanah Card Anda pada halaman beranda.
        </p>

        <Button className="bg-[#1EA39D] hover:bg-teal-600 text-white px-8 py-2 mb-3">
          OK
        </Button>

        <div className="flex gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>Call Center BSI 14040</span>
        </div>
      </div>
    </div>
  );
};

export default FormAddressSuccess;
