import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  likedUsers: [],

  setUser: (userData) => set({ user: userData }),

  likeUser: (newUser) =>
    set((state) => ({
      likedUsers: [...state.likedUsers, newUser],
    })),

  logout: () => set({ user: null, likedUsers: [] }),
}));

export default useUserStore;
