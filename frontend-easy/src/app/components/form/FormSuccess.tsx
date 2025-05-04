"use client"

import { Button } from "@/components/ui/Button";
import Cardgold from "../card/Cardgold";
import { useSubmissionStore } from "@/store/submission-store";
import { useAuthStore } from "@/store/auth-store";
import { useCardCategoriesStore } from "@/store/card-categories-store";
import api from "@/lib/axios";
import { useEffect } from "react";

const FormSuccess = () =>  {
  const submissionStore = useSubmissionStore();
  const token = useAuthStore((state) => (state.token))
  const cardCategoriesStore = useCardCategoriesStore();

  const getCardCategoriesData = async () => {
    try {
      const response = await api.get('/card-categories', {
        params: { 
          limit_category: submissionStore.limit_category 
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('RES CARD CATEGORIES: ', response.data)
      cardCategoriesStore.setCardCategories(response.data)

    } catch (error) {
      console.error('error: ', error)
    }
  }

  useEffect(() => {
    getCardCategoriesData();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl mx-auto bg-[#ebf7f6] rounded-lg p-10">
        <h1 className="text-2xl font-bold text-center mb-4">Alhamdulillah</h1>
        
        <p className="text-center mb-8">
          Pengajuan Hasanah Card Anda telah disetujui. Silakan klik "Kirim Kartu" 
          untuk melakukan aktivasi.
        </p>
        
        {/* <div className="flex justify-center mb-8">
          <div className="w-80 h-48 rounded-xl relative overflow-hidden shadow-md">
            <Cardgold></Cardgold>
          </div>
        </div> */}
        
        <p className="text-center mb-8">
            Anda mendapatkan <span className="font-bold">BSI Hasanah Card {cardCategoriesStore.type}</span> dengan limit sebesar <span className="font-bold">Rp {cardCategoriesStore.limit.toLocaleString('id-ID')},00</span>.
        </p>
        
        <div className="flex justify-center">
          <Button className="bg-[#1EA39D] hover:bg-teal-600 text-white px-8 py-2">
            Kirim Kartu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormSuccess;