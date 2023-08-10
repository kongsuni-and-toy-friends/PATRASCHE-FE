import { StateCreator } from "zustand";
import { connectionState } from "./connectionStore";

export interface authState {
  user: string | null;
  access: string;
  refresh: string;
  login: (id: string, access: string, refresh: string) => void;
  logout: () => void;
  isLoginFormOpened: boolean;
  openLoginForm: () => void;
  closeLoginForm: () => void;
}

const createAuthStore: StateCreator<
  authState & connectionState,
  [],
  [],
  authState
> = (set) => ({
  user: null,
  access: "",
  refresh: "",
  login: (id: string, access: string, refresh: string) =>
    set(() => ({ user: id, access: access, refresh: refresh })),
  logout: () => set(() => ({ user: null, access: "", refresh: "" })),
  isLoginFormOpened: false,
  openLoginForm: () => set(() => ({ isLoginFormOpened: true })),
  closeLoginForm: () => set(() => ({ isLoginFormOpened: false })),
});

export { createAuthStore };
