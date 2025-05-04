
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthStore = {
    token: string | undefined,
    setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            token: undefined,
            setToken: (token: string) => set({token}),
        }),
        { name: "auth-store" }
    )
)