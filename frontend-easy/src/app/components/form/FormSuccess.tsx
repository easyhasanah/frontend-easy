import { Button } from "@/components/ui/Button";
import Cardgold from "../card/Cardgold";

const FormSuccess = () =>  {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl mx-auto bg-[#ebf7f6] rounded-lg p-10">
        <h1 className="text-2xl font-bold text-center mb-4">Alhamdulillah</h1>
        
        <p className="text-center mb-8">
          Pengajuan Hasanah Card Anda telah disetujui. Silakan klik "Kirim Kartu" 
          untuk melakukan aktivasi.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="w-80 h-48 rounded-xl relative overflow-hidden shadow-md">
            <Cardgold></Cardgold>
          </div>
        </div>
        
        <p className="text-center mb-8">
            Anda mendapatkan <span className="font-bold">BSI Hasanah Card Gold</span> dengan limit sebesar <span className="font-bold">Rp 8.000.000,00</span>.
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