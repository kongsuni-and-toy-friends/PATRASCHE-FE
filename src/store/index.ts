import { create } from "zustand";

interface globalState {
  user: string | null;
  access: string;
  refresh: string;
  login: (id: string, access: string, refresh: string) => void;
  logout: () => void;
  isLoginFormOpened: boolean;
  openLoginForm: () => void;
  closeLoginForm: () => void;
  isConnectionFormOpened: boolean;
  openConnectionForm: () => void;
  closeConnectionForm: () => void;
}

const useGlobalStore = create<globalState>()((set) => ({
  user: null,
  access: "",
  refresh: "",
  login: (id: string, access: string, refresh: string) =>
    set(() => ({ user: id, access: access, refresh: refresh })),
  logout: () => set(() => ({ user: null, access: "", refresh: "" })),
  isLoginFormOpened: false,
  openLoginForm: () => set(() => ({ isLoginFormOpened: true })),
  closeLoginForm: () => set(() => ({ isLoginFormOpened: false })),
  isConnectionFormOpened: false,
  openConnectionForm: () => set(() => ({ isConnectionFormOpened: true })),
  closeConnectionForm: () => set(() => ({ isConnectionFormOpened: false })),
}));

export { useGlobalStore };
