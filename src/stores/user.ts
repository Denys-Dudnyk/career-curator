import { defineStore } from 'pinia'

export interface IUser {
  uid: string
  email: string | null
}

export const useUserStore = defineStore(
  'user',
  {
    // const userId = ref<string>('')

    // return {
    //   userId,
    // }

    state: () => ({
      user: null as IUser | null,
      isAuthReady: false,
    }),

    getters: {
      userId: (state) =>
        state.user?.uid ?? '',
      isAuthenticated: (state) =>
        !!state.user,
    },

    actions: {
      setUser(user: IUser | null) {
        this.user = user
      },

      setAuthReady() {
        this.isAuthReady = true
      },
    },
  },
)
