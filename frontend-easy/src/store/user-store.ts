import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';
  
type UserStore = {
    username: string,
    name: string,
    nik:string,
    cif:string,
    setUsername: (username: string) => void,
    setName: (name: string) => void,
    setNik: (nik: string) => void,
    setCif: (cif: string) => void
};

const initialState = {
    username: "",
    name: "",
    nik: "",
    cif: "",
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            ...initialState,
            setUsername: (username) => set({username}),
            setName: (name) => set({name}),
            setNik: (nik) => set({nik}),
            setCif: (cif) => set({cif}),
        }),
        { name: 'user-store'}
    )
)