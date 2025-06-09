import { AuthSlice, createAuthSlice } from "./slices";
import { create } from "zustand";

type StoreState = AuthSlice;
export const useAppStore = create<StoreState>()((...args) => ({
    ...createAuthSlice(...args),
}));