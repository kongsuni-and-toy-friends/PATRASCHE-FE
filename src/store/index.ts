import { create } from "zustand";
import { authState, createAuthStore } from "./authStore";
import { connectionState, createConnectionStore } from "./connectionStore";

const useGlobalStore = create<authState & connectionState>()((...a) => ({
  ...createAuthStore(...a),
  ...createConnectionStore(...a),
}));

export { useGlobalStore };
