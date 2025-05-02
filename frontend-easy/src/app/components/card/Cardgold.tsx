"use client";

export default function Cardgold() {
  return (
    <div className="p-4">
      <div className="inline-block origin-top-left scale-[0.6] sm:scale-[0.75] md:scale-100 transition-transform duration-300">
        <div className="bg-gradient-to-r from-[#F8AD3C] to-[#FFCE84] rounded-2xl text-white p-6 w-[320px] md:w-[350px] h-[200px] md:h-[220px] shadow-lg relative font-sans">
          {/* GOLD */}
          <div className="absolute top-4 right-6 text-sm font-medium">GOLD</div>

          {/* Logo & Judul */}
          <div className="mb-4">
            <div className="text-xl font-semibold flex items-center space-x-2">
              <img
                src="/image/chip_gold.svg"
                alt="chip"
                className="w-8 h-auto"
              />
              <span>BSI Hasanah Card</span>
            </div>
          </div>

          {/* Nama */}
          <div className="text-white/90 text-lg font-medium mb-2">
            <span className="border px-2 py-1 rounded bg-white/10 backdrop-blur-sm">
              Muhammad
            </span>
          </div>

          {/* Nomor Kartu */}
          <div className="flex items-center space-x-2  tracking-widest mb-2">
            <span>★ ★ ★ ★ ★ ★ ★ ★</span>
            <span>3090</span>
            <span className="text-white/70">👁️‍🗨️</span>
          </div>

          {/* Expiry */}
          <div className="text-sm mt-4">EXP 09/24</div>

          {/* Logo Mastercard */}
          <div className="absolute bottom-4 right-6 flex items-center">
            <img
              src="/image/master_card.svg"
              alt="Mastercard"
              className="w-16 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
