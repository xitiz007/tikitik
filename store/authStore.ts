import create from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types.d";
import axios from "axios";
import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
  userProfile: null,
  users: [],
  addUser: (user: User) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchUsers: async () => {
    const { data } = await axios.get(`${BASE_URL}/api/users`);
    set({ users: data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
