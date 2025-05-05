"use client";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import { useSubmissionStore } from "@/store/submission-store";
import { useUserStore } from "@/store/user-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Dashboard() {
  const submissionStore = useSubmissionStore();
  const userStore = useUserStore();
  const token = useAuthStore((auth) => auth.token);

  const getSubmissionData = async () => {
    try {
      const res = await api.get("submissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      submissionStore.setSubmission(res.data);
      const resUser = await api.get("users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      submissionStore.setSubmission(res.data);
      userStore.setUsername(resUser.data.username);

      userStore.setName(resUser.data.name);
      userStore.setNik(res.data.nik);
      userStore.setCif(res.data.nik);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    getSubmissionData();
  }, []);

  return (
    <div className="w-full px-4 relative overflow-hidden flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#ACD0BE] to-[#FFF0DB]">
      <div className="mb-6 md:mb-0">
        <Image
          src="/image/asset_dashboard.svg"
          alt="Asset Illustration"
          width={300}
          height={2000}
          priority
          className="h-auto mx-auto md:mx-0"
        />
      </div>
      <div className="max-w-xl flex-grow md:px-6 z-10 text-center md:text-left mx-auto">
        <h1 className="text-xl md:text-4xl font-bold mb-2">
          Lebih Untung dengan Hasanah Card BSI
        </h1>
        <p className="text-sm md:text-base mb-4">
          Ajukan Hasanah Card dan dapatkan promo menarik setiap hari!
        </p>
        <Link
          href="#promo"
          className="inline-flex items-center bg-[#F8AD3C] text-white px-4 py-2 rounded-lg text-sm"
        >
          Lihat semua promo disini <span className="ml-1">→</span>
        </Link>
      </div>
      <div className="mb-6 md:mb-0">
        <Image
          src="/image/partner.svg"
          alt="Asset Illustration"
          width={150}
          height={300}
          priority
          className="h-auto mx-auto md:mx-0"
        />
      </div>
    </div>
  );
}
