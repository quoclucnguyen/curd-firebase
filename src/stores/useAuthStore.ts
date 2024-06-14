import { User } from "firebase/auth";
import { create } from "zustand";

interface UserStateInterface {
  user?: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStateInterface>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));
