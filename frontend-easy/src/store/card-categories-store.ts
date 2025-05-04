import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CardCategoriesStore = {
  type: string;
  limit: number;
  setCardCategories: (card_categories: CardCategoriesStore) => void
};

const initialState = {
    type: "",
    limit: 0
};

export const useCardCategoriesStore = create<CardCategoriesStore>()(
  persist(
    (set) => ({
      ...initialState,
      setCardCategories: (card_categories) => set(card_categories),
    }),
    { name: "card-categories-store" }
  )
);