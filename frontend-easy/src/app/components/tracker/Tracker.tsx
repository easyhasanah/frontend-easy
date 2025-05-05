"use client"

import { Button } from "@/components/ui/Button"
import Cardgold from "../card/Cardgold";
import Cardplatinum from "../card/Cardplatinum";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/axios";
import { useSubmissionStore } from "@/store/submission-store";

const Tracker = () => {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const token = useAuthStore((token) => (token.token))
  const cardCategory = useSubmissionStore((card) => (card.limit_category))

  const getPin = async () => {
    try {
      const res = await api.get("card", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      setPin(res?.data?.pin ?? '')
    } catch (error) {
      console.error('error: ', error)
    }
  }

  const handlePinPage = () => {
    router.push('/form/pin')
  };

  useEffect(() => {
    getPin();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-lg md:text-xl font-semibold mb-2">
        Assalamualaikum, Muhammad!
      </h2>
      <p className="text-sm md:text-base text-gray-700 mb-6">
        Berikut merupakan detail status pengajuan Hasanah Card Anda,
      </p>

      {cardCategory > 6
        ? <>
            <div className="w-full max-w-sm md:max-w-md mb-10">
              <Cardplatinum></Cardplatinum>
            </div>
          </> 
        : <>
            <div className="w-full max-w-sm md:max-w-md mb-10">
              <Cardgold></Cardgold>
            </div>
          </> 
        }

      <div className="w-full max-w-4xl mb-6">
        <div className="relative flex justify-between items-start text-sm">
          {[
            { title: "Pengajuan", date: "Rabu, 1 Januari", active: true },
            { title: "Disetujui/Ditolak", date: "Rabu, 1 Januari", active: true },
            { title: "Pengiriman", date: "Rabu, 1 Januari", active: true },
            { title: "Aktivasi", date: "Senin, 16 Januari", active: pin === "" ? false : true },
          ].map((step, i, arr) => (
            <div key={i} className="flex flex-col items-center w-full relative">
              {/* Horizontal Line */}
              {i < arr.length - 1 && (
                <div className="absolute top-2 left-1/2 w-full h-0.5 bg-gray-300 z-0">
                </div>
              )}

              {/* Circle */}
              <div className={`w-4 h-4 rounded-full z-10 ${step.active ? "bg-[#1EA39D]" : "bg-gray-300"}`}></div>

              {/* Text */}
              <span className={`mt-1 font-medium ${step.active ? "text-[#1EA39D]" : "text-gray-400"}`}>
                {step.title}
              </span>
              <span className="text-gray-500 text-xs">{step.date}</span>
            </div>
          ))}
        </div>
      </div>

      {pin === ""
      ? <>
          <Button className="bg-[#1EA39D] hover:bg-teal-600 text-white px-6 py-2" onClick={handlePinPage}>
            Aktivasi Kartu
          </Button>
        </>
      : <>
          <Button className="bg-[#1EA39D] hover:bg-[#1EA39D] text-white px-6 py-2">
            Selamat, Hasanah Card Anda sudah berhasil diaktivasi.
          </Button>
        </>
      }
    </div>
  );
};

export default Tracker;
