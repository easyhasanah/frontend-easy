"use client";
import Image from "next/image";
import { useEffect } from "react";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useCardStore } from "@/store/card-store";
import { useUserStore } from "@/store/user-store";
export default function Cardplatinum() {
  const [isVisible, setIsVisible] = useState(false);
  const cardStore = useCardStore();
  const userStore = useUserStore();
  const token = useAuthStore((auth) => auth.token);

  const getCardData = async () => {
    try {
      const res = await api.get("card", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        const { card_no, expired_date, card_category } = res.data;
        cardStore.setCard({
          card_no,
          expired_date: new Date(expired_date),
          card_category,
        });
      } else {
        cardStore.setCard({
          card_no: "",
          expired_date: new Date(),
          card_category: 0,
        });
      }
    } catch (error) {
      console.error("error: ", error);
      cardStore.setCard({
        card_no: "",
        expired_date: new Date(),
        card_category: 0,
      });
    }
  };
  const expiredDate =
    cardStore.expired_date instanceof Date
      ? cardStore.expired_date
      : new Date(cardStore.expired_date);

  const expString = expiredDate
    ? `${(expiredDate.getMonth() + 1).toString().padStart(2, "0")}/${expiredDate
        .getFullYear()
        .toString()
        .slice(-2)}`
    : "00/00";
  const formatCardNumber = (num: string) =>
    num
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  useEffect(() => {
    getCardData();
  }, []);
  return (
    <div className="w-full max-w-[350px] sm:max-w-[320px] md:max-w-[350px] mx-auto">
      <div className="bg-gradient-to-r from-[#000000] to-[#4D4D4D] rounded-2xl text-white px-4 py-5 sm:px-5 sm:py-6 w-full h-[180px] sm:h-[200px] md:h-[220px] shadow-lg relative font-sans text-[12px] sm:text-sm md:text-base">
        <div className="absolute top-3 right-5 sm:top-4 sm:right-6 text-xs sm:text-sm font-medium">
          PLATINUM
        </div>
        <div className="mb-3 sm:mb-4">
          <div className="text-lg sm:text-xl font-semibold flex items-center space-x-2">
            <Image
              src="/image/chip_platinum.svg"
              alt="chip"
              width={32}
              height={32}
              className="w-6 sm:w-8 h-auto"
            />
            <span>BSI Hasanah Card</span>
          </div>
        </div>
        <div className="text-white/90 font-medium mb-2">
          <span className=" py-1">{userStore.name}</span>
        </div>
        <div className="flex items-center space-x-2 tracking-widest mb-2">
          <span className="text-lg text-white">
            {isVisible && cardStore.card_no
              ? formatCardNumber(cardStore.card_no)
              : "•••• •••• •••• ••••"}
          </span>
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="text-white hover:text-gray-400 hover:cursor-pointer"
          >
            {isVisible ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="text-xs sm:text-sm mt-3 sm:mt-4">
          EXP{" "}
          {isVisible && cardStore.card_no && cardStore.expired_date
            ? expString
            : "••/••"}
        </div>
        <div className="absolute bottom-3 right-5 sm:bottom-4 sm:right-6 flex items-center">
          <Image
            src="/image/master_card.svg"
            alt="Mastercard"
            width={64} // kira-kira setara sm:w-16
            height={64} // bisa disesuaikan, karena h-auto akan menjaga rasio
            className="w-12 sm:w-16 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
