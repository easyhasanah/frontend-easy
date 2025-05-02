"use client";

import { FC } from "react";
import Navbar from "@/app/components/Navbar";
import Dashboard from "@/app/components/dashboard/Dashboard";
import Cardgold from "@/app/components/card/Cardgold";
import Cardplatinum from "@/app/components/card/Cardplatinum";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/Dialog";

const Page: FC = () => {
  return (
    <>
      <Navbar />
      <Dashboard />
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-start justify-center gap-6 px-4 py-8 mt-4 md:mt-15">
        {/* GOLD */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <Cardgold />
          <div className="text-center py-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[#00A39D] font-bold no-underline hover:cursor-pointer">
                  Info Kartu
                </button>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-3xl rounded-xl overflow-hidden">
                <DialogTitle className="sr-only">
                  BSI Hasanah Card Gold
                </DialogTitle>
                <div className="flex flex-col md:flex-row w-full">
                  {/* Left Side */}
                  <div className="bg-[#00A39D] text-white px-6 md:w-1/2 flex flex-col justify-between">
                    <div className="mt-3">
                      <h2 className="text-lg font-semibold">Apa itu</h2>
                      <h1 className="text-2xl font-bold">
                        BSI Hasanah Card Gold?
                      </h1>
                    </div>
                    <div className="mt-6">
                      <img
                        src="/image/info_gold.svg"
                        alt="Kartu BSI Gold"
                        className="w-50 mx-auto"
                      />
                    </div>
                  </div>
                  {/* Right Side */}
                  <div className="bg-white text-black p-6 md:w-1/2">
                    <h2 className="text-xl font-bold mb-4">Gold</h2>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">●</span>
                        Limit mulai dari Rp 8 juta sampai dengan Rp 30 juta.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">●</span>
                        Biaya bulanan mulai dari Rp 240ribu.
                      </li>
                    </ul>
                    <hr className="my-4" />
                    <h3 className="text-gray-500 font-semibold mb-2">
                      Keuntungan:
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">●</span>
                        Gratis 2 tahun biaya tahunan tanpa syarat.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">●</span>
                        Bonus sambutan sebesar Rp50 ribu dengan transaksi hanya
                        Rp1,- maksimal dalam 3 bulan sejak kartu disetujui.
                      </li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* PLATINUM */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <Cardplatinum />
          <div className="text-center py-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[#00A39D] font-bold no-underline hover:cursor-pointer">
                  Info Kartu
                </button>
              </DialogTrigger>
              <DialogContent className="p-0 max-w-3xl rounded-xl overflow-hidden">
                <DialogTitle className="sr-only">
                  BSI Hasanah Card Platinum
                </DialogTitle>
                <div className="flex flex-col md:flex-row w-full">
                  {/* Left Side */}
                  <div className="bg-[#00A39D] text-white px-6 md:w-1/2 flex flex-col justify-between">
                    <div className="mt-3">
                      <h2 className="text-lg font-semibold">Apa itu</h2>
                      <h1 className="text-2xl font-bold">
                        BSI Hasanah Card Platinum?
                      </h1>
                    </div>
                    <div className="mt-6">
                      <img
                        src="/image/info_platinum.svg"
                        alt="Kartu BSI Platinum"
                        className="w-40 mx-auto"
                      />
                    </div>
                  </div>
                  {/* Right Side */}
                  <div className="bg-white text-black p-6 md:w-1/2">
                    <h2 className="text-xl font-bold mb-4">Platinum</h2>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-[#000000] mt-1">●</span>
                        Limit mulai dari Rp40 juta sampai dengan Rp900 juta.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#000000] mt-1">●</span>
                        Biaya bulanan mulai dari Rp600 ribu.
                      </li>
                    </ul>
                    <hr className="my-4" />
                    <h3 className="text-gray-500 font-semibold mb-2">
                      Keuntungan:
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-[#000000] mt-1">●</span>
                        Gratis executive lounge di bandara nasional
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#000000] mt-1">●</span>
                        Gratis 2 tahun biaya tahunan tanpa syarat.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#000000] mt-1">●</span>
                        Bonus sambutan sebesar Rp50 ribu dengan transaksi hanya
                        Rp1,- maksimal dalam 3 bulan sejak kartu disetujui.
                      </li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Button Ajukan */}
      <div className="text-center my-8">
        <a
          href="/ajukan"
          className="bg-[#00A39D] text-white font-bold py-3 px-8 rounded hover:bg-[#008880] transition-colors"
        >
          Ajukan Sekarang
        </a>
      </div>
    </>
  );
};

export default Page;
