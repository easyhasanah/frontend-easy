"use client";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import { useSubmissionStore } from "@/store/submission-store";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Check, AlertCircle, Info } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [predictLoading, setPredictLoading] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  const submissionStore = useSubmissionStore();
  const userStore = useUserStore();

  // Custom toast styles
  const toastStyles = {
    info: {
      style: {
        background: "#1EA39D",
        color: "#ffffff",
        borderRadius: "4px",
      },
      progressStyle: {
        background: "#1EA39D",
      },
      icon: <Info color="#ffffff" size={20} />,
    },
    error: {
      style: {
        background: "#e74c3c",
        color: "#ffffff",
        borderRadius: "4px",
      },
      progressStyle: {
        background: "#e74c3c",
      },
      icon: <AlertCircle color="#ffffff" size={20} />,
    },
    warning: {
      style: {
        background: "#f1c40f",
        color: "#ffffff",
        borderRadius: "4px",
      },
      progressStyle: {
        background: "#f1c40f",
      },
      icon: <AlertCircle color="#ffffff" size={20} />,
    },
    success: {
      style: {
        background: "#2ecc71",
        color: "#ffffff",
        borderRadius: "4px",
      },
      progressStyle: {
        background: "#2ecc71",
      },
      icon: <Check color="#ffffff" size={20} />,
    },
  };

  const showToast = (
    message: string,
    type: "info" | "error" | "warning" | "success"
  ) => {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastStyles[type].style,
      icon: toastStyles[type].icon,
    });
  };

  const handleCheckboxClick = () => {
    if (!termsAccepted) {
      setIsTermsModalOpen(true);
    } else {
      setTermsAccepted(false);
    }
  };

  const handleAcceptTerms = (e: React.MouseEvent) => {
    setTermsAccepted(true);
    setIsTermsModalOpen(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Automatically process the file after selection
      if (selectedFile) {
        await processFile(selectedFile);
      }
    }
  };

  const processFile = async (fileToProcess: File) => {
    if (!fileToProcess) {
      showToast("Silahkan pilih file terlebih dahulu", "error");
      return;
    }

    if (fileToProcess.type !== "application/pdf") {
      showToast("Hanya file PDF yang diperbolehkan", "error");
      return;
    }

    if (fileToProcess.size > 10 * 1024 * 1024) {
      // 10MB in bytes
      showToast("Ukuran file melebihi 10MB", "error");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", fileToProcess);

    try {
      const response = await fetch(
        "http://192.168.23.50:8000/api/submissions/read_pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const income = await response.json();
      setTotalIncome(income);
      submissionStore.setTotalIncome(income); // Assuming you have this function in your store
      showToast(
        "Berhasil mengunggah file dan memperbarui penghasilan",
        "success"
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      showToast("Gagal mengunggah file. Silakan coba lagi.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePredictCategory = async () => {
    if (!file) {
      showToast("Silakan pilih file terlebih dahulu", "warning");
      return;
    }

    if (!termsAccepted) {
      showToast(
        "Silakan setujui syarat dan ketentuan terlebih dahulu",
        "warning"
      );
      return;
    }

    setPredictLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/submissions/predict", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      submissionStore.setCreditCardCategory(res.data.limit_category);
      submissionStore.setStatusPengajuan(res.data.rejection_reason);
      submissionStore.setTotalIncome(res.data.total_income);

      const reqCardJson = {
        limit_category: res.data.limit_category,
      };

      const resAddCard = await api.post("/card/", reqCardJson, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Scroll to the results section
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);

      showToast("Berhasil memproses pengajuan", "info");

      if (res.data.limit_category == 0) {
        router.push("/form/failed");
      } else {
        router.push("/form/success");
      }
    } catch (error) {
      console.error("Error predicting category:", error);
      showToast(
        "Gagal melakukan prediksi kategori. Silakan coba lagi.",
        "error"
      );
    } finally {
      setPredictLoading(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-center mb-8">
            Formulir Pengajuan Hasanah Card
          </h1>

          <div className="max-w-4xl mx-auto">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cif"
                      className="block text-sm font-medium mb-1"
                    >
                      CIF
                    </label>
                    <Input
                      disabled
                      id="cif"
                      placeholder="19702001513456"
                      value={userStore.cif}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nik"
                      className="block text-sm font-medium mb-1"
                    >
                      NIK
                    </label>
                    <Input
                      disabled
                      id="nik"
                      placeholder="19702001513456"
                      value={userStore.nik}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium mb-1"
                    >
                      Nama
                    </label>
                    <Input
                      disabled
                      id="nama"
                      placeholder="Lorem Ipsum"
                      value={userStore.name}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="umur"
                      className="block text-sm font-medium mb-1"
                    >
                      Umur
                    </label>
                    <Input
                      disabled
                      id="umur"
                      placeholder="Lorem Ipsum"
                      value={submissionStore.applicant_age}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jumlahAnak"
                      className="block text-sm font-medium mb-1"
                    >
                      Jumlah Anak
                    </label>
                    <Input
                      disabled
                      id="jumlahAnak"
                      placeholder="Lorem Ipsum"
                      value={submissionStore.total_children}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lamaBekerja"
                      className="block text-sm font-medium mb-1"
                    >
                      Lama Bekerja
                    </label>
                    <Input
                      disabled
                      id="lamaBekerja"
                      placeholder="Lorem Ipsum"
                      value={submissionStore.years_of_working}
                    />
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
                      disabled
                      id="totalHutangKonsumtif"
                      placeholder="Lorem Ipsum"
                      value={submissionStore.total_bad_debt}
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
                      disabled
                      id="totalHutangProduktif"
                      placeholder="Lorem Ipsum"
                      value={submissionStore.total_good_debt}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jenisPenghasilan"
                      className="block text-sm font-medium mb-1"
                    >
                      Jenis Penghasilan
                    </label>
                    <Input
                      disabled
                      id="jenisPenghasilan"
                      placeholder="Lorem Ipsum"
                      value={
                        submissionStore.income_type_commercial_associate
                          ? "Wiraswasta"
                          : submissionStore.income_type_pensioner
                          ? "Pensiunan"
                          : submissionStore.income_type_state_servant
                          ? "PNS"
                          : submissionStore.income_type_student
                          ? "Pelajar"
                          : "Pegawai"
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="statusPerkawinan"
                      className="block text-sm font-medium mb-1"
                    >
                      Status Perkawinan
                    </label>
                    <Input
                      disabled
                      id="statusPerkawinan"
                      placeholder="Lorem Ipsum"
                      value={
                        submissionStore.family_status_married
                          ? "Menikah"
                          : submissionStore.family_status_separated
                          ? "Cerai"
                          : submissionStore.family_status_single
                          ? "Belum Kawin"
                          : "Duda atau Janda"
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jenisTempat"
                      className="block text-sm font-medium mb-1"
                    >
                      Jenis Tempat Tinggal
                    </label>
                    <Input
                      disabled
                      id="jenisTempat"
                      placeholder="Lorem Ipsum"
                      value={
                        submissionStore.housing_type_co_op_apartment
                          ? "Apartemen Milik Bersama"
                          : submissionStore.housing_type_house_apartment
                          ? "Tempat Tinggal Pribadi"
                          : submissionStore.housing_type_municipal_apartment
                          ? "Rumah Susun"
                          : submissionStore.housing_type_office_apartment
                          ? "Mess"
                          : submissionStore.housing_type_rented_apartment
                          ? "Apartemen Sewa"
                          : "Tinggal Bersama Orang Tua"
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="totalIncome"
                      className="block text-sm font-medium mb-1"
                    >
                      Jumlah Penghasilan Pertahun
                    </label>
                    <Input
                      disabled
                      id="totalIncome"
                      placeholder="Lorem Ipsum"
                      value={
                        totalIncome
                          ? `Rp ${totalIncome.toLocaleString("id-ID")}`
                          : "Rp 0"
                      }
                    />
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
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="hidden"
                  />
                  <Input
                    id="fileUpload"
                    onClick={handleBrowseClick}
                    readOnly
                    value={file ? file.name : ""}
                    placeholder="Pilih file PDF"
                    className="rounded-r-none flex-grow cursor-pointer"
                  />
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-l-none"
                    onClick={handleBrowseClick}
                    disabled={loading}
                  >
                    {loading ? "MEMPROSES..." : "UNGGAH FILE"}
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
                  disabled={!termsAccepted || predictLoading}
                  onClick={handlePredictCategory}
                >
                  {predictLoading ? "Memproses..." : "Ajukan"}
                </Button>
              </div>
            </form>

            <div className="mt-4 text-center text-xs text-gray-500">
              © Hak cipta BSI
            </div>

            <Dialog open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen}>
              <DialogContent className="max-w-3xl">
                <div className="bg-teal-400 py-3 px-4 -mx-6 -mt-6 rounded-t-lg mb-4">
                  <h2 className="text-xl font-medium text-center text-white">
                    Persetujuan Pengajuan
                  </h2>
                </div>
                <div className="max-h-[60vh] overflow-y-auto px-2">
                  <h3 className="text-lg font-medium text-center mb-6">
                    Syarat dan Ketentuan Pengajuan Hasanah Card BSI
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">A. Daftar Istilah</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>
                          Bank: PT Bank Syariah Indonesia Tbk (BSI) selaku
                          penerbit Hasanah Card.
                        </li>
                        <li>
                          Hasanah Card: Kartu pembiayaan berbasis syariah yang
                          diterbitkan oleh BSI untuk memenuhi kebutuhan
                          konsumtif Nasabah.
                        </li>
                        <li>
                          Nasabah: Individu yang mengajukan permohonan
                          pembiayaan melalui Hasanah Card.
                        </li>
                        <li>
                          BYOND: Platform digital BSI yang digunakan untuk
                          pengajuan produk dan layanan BSI.
                        </li>
                        <li>
                          Akad: Perjanjian yang sesuai prinsip syariah antara
                          Bank dan Nasabah terkait penggunaan Hasanah Card.
                        </li>
                        <li>
                          IB Hasanah Card: Nama produk kartu pembiayaan berbasis
                          syariah yang ditawarkan oleh BSI.
                        </li>
                        <li>
                          Limit Pembiayaan: Batas maksimal pembiayaan yang dapat
                          digunakan Nasabah sesuai persetujuan Bank.
                        </li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">
                        B. Ketentuan Pengajuan
                      </h4>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>
                          Nasabah menyatakan bahwa seluruh data dan dokumen yang
                          diberikan dalam pengajuan Hasanah Card melalui BYOND
                          adalah benar, lengkap, dan dapat
                          dipertanggungjawabkan.
                        </li>
                        <li>
                          Nasabah memahami bahwa pengajuan Hasanah Card tidak
                          menjamin disetujuinya permohonan oleh Bank.
                        </li>
                        <li>
                          Nasabah menyetujui bahwa Bank berhak melakukan
                          verifikasi data dan informasi kepada pihak ketiga yang
                          relevan.
                        </li>
                        <li>
                          Nasabah telah membaca dan memahami akad serta prinsip
                          syariah yang berlaku pada produk IB Hasanah Card.
                        </li>
                        <li>
                          Nasabah memberikan persetujuan kepada Bank untuk
                          menggunakan data pribadi dalam rangka pemrosesan
                          pengajuan, analisis risiko, serta keperluan internal
                          Bank sesuai peraturan yang berlaku.
                        </li>
                        <li>
                          Nasabah menyatakan bersedia dihubungi oleh pihak Bank
                          untuk keperluan verifikasi, klarifikasi, atau
                          penawaran produk yang sesuai.
                        </li>
                        <li>
                          Dengan menyetujui syarat dan ketentuan ini, Nasabah
                          menyatakan setuju untuk melanjutkan proses pengajuan
                          Hasanah Card melalui platform BYOND.
                        </li>
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
