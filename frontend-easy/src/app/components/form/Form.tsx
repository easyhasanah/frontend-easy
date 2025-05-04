"use client"

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

const Form = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const handleCheckboxClick = () => {
    if (!termsAccepted) {
      setIsTermsModalOpen(true);
    } else {
      setTermsAccepted(false);
    }
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setIsTermsModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-8">
            Formulir Pengajuan Hasanah Card
          </h1>

          <div className="max-w-4xl mx-auto">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cif"
                      className="block text-sm font-medium mb-1"
                    >
                      CIF
                    </label>
                    <Input id="cif" placeholder="19702001513456" />
                  </div>
                  <div>
                    <label
                      htmlFor="nik"
                      className="block text-sm font-medium mb-1"
                    >
                      NIK
                    </label>
                    <Input id="nik" placeholder="19702001513456" />
                  </div>
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium mb-1"
                    >
                      Nama
                    </label>
                    <Input id="nama" placeholder="Lorem Ipsum" />
                  </div>
                  <div>
                    <label
                      htmlFor="umur"
                      className="block text-sm font-medium mb-1"
                    >
                      Umur
                    </label>
                    <Input id="umur" placeholder="Lorem Ipsum" />
                  </div>
                  <div>
                    <label
                      htmlFor="jumlahAnak"
                      className="block text-sm font-medium mb-1"
                    >
                      Jumlah Anak
                    </label>
                    <Input id="jumlahAnak" placeholder="Lorem Ipsum" />
                  </div>
                  <div>
                    <label
                      htmlFor="lamaBekerja"
                      className="block text-sm font-medium mb-1"
                    >
                      Lama Bekerja
                    </label>
                    <Input id="lamaBekerja" placeholder="Lorem Ipsum" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="totalHutangKonsumtif"
                      className="block text-sm font-medium mb-1"
                    >
                      Total Hutang Konsumtif
                    </label>
                    <Input
                      id="totalHutangKonsumtif"
                      placeholder="Lorem Ipsum"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="totalHutangProduktif"
                      className="block text-sm font-medium mb-1"
                    >
                      Total Hutang Produktif
                    </label>
                    <Input
                      id="totalHutangProduktif"
                      placeholder="Lorem Ipsum"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jenisPenghasilan"
                      className="block text-sm font-medium mb-1"
                    >
                      Jenis Penghasilan
                    </label>
                    <Input id="jenisPenghasilan" placeholder="Lorem Ipsum" />
                  </div>
                  <div>
                    <label
                      htmlFor="statusPerkawinan"
                      className="block text-sm font-medium mb-1"
                    >
                      Status Perkawinan
                    </label>
                    <Input id="statusPerkawinan" placeholder="Lorem Ipsum" />
                  </div>
                  <div>
                    <label
                      htmlFor="jenisTempat"
                      className="block text-sm font-medium mb-1"
                    >
                      Jenis Tempat Tinggal
                    </label>
                    <Input id="jenisTempat" placeholder="Lorem Ipsum" />
                  </div>
                  <div>
                    <label
                      htmlFor="totalPemasukan"
                      className="block text-sm font-medium mb-1"
                    >
                      Total Pemasukan dalam 1 Tahun
                    </label>
                    <Input id="totalPemasukan" placeholder="Rp64.000.000,00" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="fileUpload"
                  className="block text-sm font-medium mb-1"
                >
                  Bukti Potong Pajak
                </label>
                <div className="flex">
                  <Input
                    id="fileUpload"
                    placeholder="Lorem Ipsum"
                    className="rounded-r-none flex-grow"
                  />
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-l-none">
                    UNGGAH FILE
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  File PDF maksimal 10 MB
                </p>
              </div>

              <div className="mt-8">
                <p className="font-medium mb-2">
                  Harap perhatikan pernyataan di bawah ini :
                </p>
                <div className="flex items-start">
                  <Checkbox
                    id="terms"
                    className="mt-1 border-[#1EA39D] text-teal-500 rounded-sm data-[state=checked]:bg-[#1EA39D]"
                    checked={termsAccepted}
                    onCheckedChange={handleCheckboxClick}
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    Pengguna telah mengerti dan menyetujui ketentuan dalam
                    proses registrasi Hasanah Card secara elektronik serta
                    melengkapi semua data yang dibutuhkan secara benar dan
                    lengkap.
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  className="bg-[#1EA39D] hover:bg-teal-600 text-white w-full md:w-1/3"
                  disabled={!termsAccepted}
                >
                  Ajukan
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center text-xs text-gray-500">
              © Hak cipta BNI Syariah
            </div>

            <Dialog open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen}>
              <DialogContent className="max-w-3xl">
                <div className="bg-teal-400 py-3 px-4 -mx-6 -mt-6 rounded-t-lg mb-4">
                  <h2 className="text-xl font-medium text-center text-white">Persetujuan Pengajuan</h2>
                </div>
                <div className="max-h-[60vh] overflow-y-auto px-2">
                  <h3 className="text-lg font-medium text-center mb-6">Syarat dan Ketentuan Pengajuan Hasanah Card BSI</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">A. Daftar Istilah</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Bank: PT Bank Syariah Indonesia Tbk (BSI) selaku penerbit Hasanah Card.</li>
                        <li>Hasanah Card: Kartu pembiayaan berbasis syariah yang diterbitkan oleh BSI untuk memenuhi kebutuhan konsumtif Nasabah.</li>
                        <li>Nasabah: Individu yang mengajukan permohonan pembiayaan melalui Hasanah Card.</li>
                        <li>BYOND: Platform digital BSI yang digunakan untuk pengajuan produk dan layanan BSI.</li>
                        <li>Akad: Perjanjian yang sesuai prinsip syariah antara Bank dan Nasabah terkait penggunaan Hasanah Card.</li>
                        <li>IB Hasanah Card: Nama produk kartu pembiayaan berbasis syariah yang ditawarkan oleh BSI.</li>
                        <li>Limit Pembiayaan: Batas maksimal pembiayaan yang dapat digunakan Nasabah sesuai persetujuan Bank.</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">B. Ketentuan Pengajuan</h4>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Nasabah menyatakan bahwa seluruh data dan dokumen yang diberikan dalam pengajuan Hasanah Card melalui BYOND adalah benar, lengkap, dan dapat dipertanggungjawabkan.</li>
                        <li>Nasabah memahami bahwa pengajuan Hasanah Card tidak menjamin disetujuinya permohonan oleh Bank.</li>
                        <li>Nasabah menyetujui bahwa Bank berhak melakukan verifikasi data dan informasi kepada pihak ketiga yang relevan.</li>
                        <li>Nasabah telah membaca dan memahami akad serta prinsip syariah yang berlaku pada produk IB Hasanah Card.</li>
                        <li>Nasabah memberikan persetujuan kepada Bank untuk menggunakan data pribadi dalam rangka pemrosesan pengajuan, analisis risiko, serta keperluan internal Bank sesuai peraturan yang berlaku.</li>
                        <li>Nasabah menyatakan bersedia dihubungi oleh pihak Bank untuk keperluan verifikasi, klarifikasi, atau penawaran produk yang sesuai.</li>
                        <li>Dengan menyetujui syarat dan ketentuan ini, Nasabah menyatakan setuju untuk melanjutkan proses pengajuan Hasanah Card melalui platform BYOND.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center items-center w-full">
                  <Button 
                    onClick={handleAcceptTerms} 
                    className="w-40 bg-[#1EA39D] hover:bg-teal-600 text-white"
                  >
                    Saya Mengerti
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </>
  );
};

export default Form;
