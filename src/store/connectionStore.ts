import { create, StateCreator } from "zustand";
import { authState } from "./authStore";

export interface connectionState {
  isConnectionFormOpened: boolean;
  openConnectionForm: () => void;
  closeConnectionForm: () => void;
}

const createConnectionStore: StateCreator<
  connectionState & authState,
  [],
  [],
  connectionState
> = (set) => ({
  isConnectionFormOpened: false,
  openConnectionForm: () => set(() => ({ isConnectionFormOpened: true })),
  closeConnectionForm: () => set(() => ({ isConnectionFormOpened: false })),
});

export { createConnectionStore };
