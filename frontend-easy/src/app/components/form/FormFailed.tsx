import { Button } from "@/components/ui/Button";

const FormFailed = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl mx-auto bg-[#ebf7f6] rounded-lg p-10">
        <h1 className="text-2xl font-bold text-center mb-3">Tidak Berhasil</h1>

        <div className="items-center p-3">
          <p className="mb-5">
            Mohon maaf, berdasarkan analisis terhadap profil Anda, permohonan
            Anda untuk mengajukan Hasanah Card belum dapat disetujui.
          </p>

          <p>
            Namun, Anda dapat mengajukan pembiayaan lain pada produk Mitraguna
            Online BSI.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-around mt-5 mx-4 md:mx-44 gap-4">
          <Button className="bg-[#1EA39D] hover:bg-teal-600 text-white px-8 py-2">
            Kirim Kartu
          </Button>
          <Button className="bg-[#F8AD3C] hover:bg-[#df9c36] text-white px-8 py-2">
            Ajukan Mitraguna Online
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormFailed;
