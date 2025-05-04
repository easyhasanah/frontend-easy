import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type CardData = {
  card_no: string;
  expired_date: Date;
  card_category: number;
};

type CardStore = CardData & {
  setCard: (card: CardData) => void;
};

const initialState: CardData = {
  card_no: "",
  expired_date: new Date(),
  card_category: 0,
};

export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCard: (card) => set({ ...card }),
    }),
    { name: "card-store", storage: createJSONStorage(() => localStorage) }
  )
);

// type CardStore = {
//   card_no: string;
//   expired_date: Date;
//   card_category: number;
//   setCard: (card: CardStore) => void;
// };

// const initialState = {
//   card_no: "",
//   expired_date: new Date(),
//   card_category: 0,
// };

// export const useCardStore = create<CardStore>()(
//   persist(
//     (set) => ({
//       ...initialState,
//       setCard: (card) => set({ ...card }),
//     }),
//     { name: "card-store" }
//   )
// );
