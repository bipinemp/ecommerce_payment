import { create } from "zustand";

interface CartState {
  isCartOpen: boolean;
  openCart: (val: boolean) => void;
  closeCart: (val: boolean) => void;
}

export const useCartOpenStore = create<CartState>()((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));

interface UserIdState {
  userId: string;
  setUserId: (id: string) => void;
}

export const useUserId = create<UserIdState>()((set) => ({
  userId: "",
  setUserId: (id: string) => set({ userId: id }),
}));
