import { create } from 'zustand'
import { getToken } from '../../services/asyncStorage/getAsyncStorage.js'

export const useGlobalState = create((set) => ({
  bears: 1,
  authToken: null,
  infoUser: [],
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  setAuthToken: (token) => set({ authToken: token }),
  setInfoUser: (info) => set({ infoUser: info }),
  commentsUpdate: false,
  setCommentsUpdate: (state) => set({ commentsUpdate: state }),
}))