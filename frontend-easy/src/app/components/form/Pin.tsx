"use client";

import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

const PinInput = () => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(6).fill(""));
  const [isPinMatch, setIsPinMatch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const token = useAuthStore((auth) => auth.token);

  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const confirmPinRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const isPinComplete = pin.every((digit) => digit !== "");
    const isConfirmComplete = confirmPin.every((digit) => digit !== "");

    if (isPinComplete && isConfirmComplete) {
      setIsPinMatch(pin.join("") === confirmPin.join(""));
    } else {
      setIsPinMatch(null);
    }
  }, [pin, confirmPin]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    isConfirm: boolean
  ) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newValue = value.slice(-1);

    if (isConfirm) {
      const newConfirmPin = [...confirmPin];
      newConfirmPin[index] = newValue;
      setConfirmPin(newConfirmPin);

      if (newValue && index < 5) {
        confirmPinRefs.current[index + 1]?.focus();
      }
    } else {
      const newPin = [...pin];
      newPin[index] = newValue;
      setPin(newPin);

      if (newValue && index < 5) {
        pinRefs.current[index + 1]?.focus();
      }

      if (newValue && index === 5) {
        confirmPinRefs.current[0]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
    isConfirm: boolean
  ) => {
    const inputRefs = isConfirm ? confirmPinRefs : pinRefs;
    const inputValues = isConfirm ? confirmPin : pin;

    if (e.key === "Backspace") {
      if (inputValues[index]) {
        const newInput = [...inputValues];
        newInput[index] = "";
        isConfirm ? setConfirmPin(newInput) : setPin(newInput);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    e: ClipboardEvent<HTMLInputElement>,
    index: number,
    isConfirm: boolean
  ) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pasteData)) return;

    const digits = pasteData.split("").slice(0, 6 - index);

    const update = isConfirm ? [...confirmPin] : [...pin];
    digits.forEach((digit, i) => {
      const targetIndex = index + i;
      if (targetIndex < 6) {
        update[targetIndex] = digit;
      }
    });

    isConfirm ? setConfirmPin(update) : setPin(update);

    const nextIndex = Math.min(index + digits.length, 5);
    (isConfirm ? confirmPinRefs : pinRefs).current[nextIndex]?.focus();

    if (!isConfirm && index + digits.length >= 6) {
      confirmPinRefs.current[0]?.focus();
    }
  };

  const handleSubmit = async () => {
    const pinValue = pin.join("");

    if (pinValue === confirmPin.join("")) {
      try {
        setLoading(true);
        const response = await api.post(
          "/card/",
          { pin: pinValue },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("PIN berhasil dibuat!");
        router.push("/form/pin/success");
      } catch (error: any) {
        if (error.response) {
          alert(error.response.data.detail || "Gagal membuat PIN.");
        } else {
          alert("Terjadi kesalahan jaringan.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setIsPinMatch(false);
      setConfirmPin(Array(6).fill(""));
      confirmPinRefs.current[0]?.focus();
    }
  };

  const isComplete =
    pin.every((digit) => digit !== "") &&
    confirmPin.every((digit) => digit !== "");

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg border border-[#00A39D] p-6">
        <h2 className="text-xl font-semibold text-center mb-6">
          Buat PIN Hasanah Card
        </h2>

        <div className="mb-6">
          <p className="text-sm text-center mb-3">Masukkan PIN Anda</p>
          <div className="flex justify-center gap-2">
            {pin.map((digit, index) => (
              <input
                key={`pin-${index}`}
                ref={(el) => {
                  pinRefs.current[index] = el;
                }}
                type="password"
                inputMode="numeric"
                className="w-10 h-12 sm:w-8 sm:h-10 text-lg sm:text-base border border-gray-300 rounded-md text-center focus:border-[#00A39D] focus:ring-1 focus:ring-[#00A39D] focus:outline-none"
                value={digit}
                onChange={(e) => handleChange(e, index, false)}
                onKeyDown={(e) => handleKeyDown(e, index, false)}
                onPaste={(e) => handlePaste(e, index, false)}
                maxLength={1}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-center mb-3">Konfirmasi PIN</p>
          <div className="flex justify-center gap-2">
            {confirmPin.map((digit, index) => (
              <input
                key={`confirm-pin-${index}`}
                ref={(el) => {
                  confirmPinRefs.current[index] = el;
                }}
                type="password"
                inputMode="numeric"
                className={`w-10 h-12 sm:w-8 sm:h-10 text-lg sm:text-base border rounded-md text-center focus:outline-none focus:ring-1 ${
                  isPinMatch === false
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#00A39D] focus:ring-[#00A39D]"
                }`}
                value={digit}
                onChange={(e) => handleChange(e, index, true)}
                onKeyDown={(e) => handleKeyDown(e, index, true)}
                onPaste={(e) => handlePaste(e, index, true)}
                maxLength={1}
              />
            ))}
          </div>
          {isPinMatch === false && (
            <p className="text-red-500 text-xs text-center mt-2">
              PIN tidak cocok. Mohon coba lagi.
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!isComplete || isPinMatch === false || loading}
            className={`px-6 py-2 rounded font-medium text-white ${
              isComplete && isPinMatch !== false && !loading
                ? "bg-[#00A39D] hover:bg-[#008f89]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Menyimpan..." : "Buat"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinInput;
