// "use client";

export default function Cardgold() {
  return (
    <div className="w-full max-w-[350px] sm:max-w-[320px] md:max-w-[350px] mx-auto">
      <div className="bg-gradient-to-r from-[#F8AD3C] to-[#FFCE84] rounded-2xl text-white px-4 py-5 sm:px-5 sm:py-6 w-full h-[180px] sm:h-[200px] md:h-[220px] shadow-lg relative font-sans text-[12px] sm:text-sm md:text-base">
        <div className="absolute top-3 right-5 sm:top-4 sm:right-6 text-xs sm:text-sm font-medium">
          GOLD
        </div>

        <div className="mb-3 sm:mb-4">
          <div className="text-lg sm:text-xl font-semibold flex items-center space-x-2">
            <img
              src="/image/chip_gold.svg"
              alt="chip"
              className="w-6 sm:w-8 h-auto"
            />
            <span>BSI Hasanah Card</span>
          </div>
        </div>

        <div className="text-white/90 font-medium mb-2">
          <span className="border px-2 py-1 rounded bg-white/10 backdrop-blur-sm">
            Muhammad
          </span>
        </div>

        <div className="flex items-center space-x-2 tracking-widest mb-2">
          <span>★ ★ ★ ★ ★ ★ ★ ★</span>
          <span>3090</span>
          <span className="text-white/70">👁️‍🗨️</span>
        </div>

        <div className="text-xs sm:text-sm mt-3 sm:mt-4">EXP 09/24</div>

        <div className="absolute bottom-3 right-5 sm:bottom-4 sm:right-6 flex items-center">
          <img
            src="/image/master_card.svg"
            alt="Mastercard"
            className="w-12 sm:w-16 h-auto"
          />
        </div>
      </div>
    </div>
  );
}
