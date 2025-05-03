"use client";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="w-full px-4 relative overflow-hidden flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#1EA39D] to-[#F8AD3C]">
      {/* Asset kiri */}
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
