import { useUserStore } from '@/stores/user'
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth'

export function initAuth() {
  const auth = getAuth()
  const userStore = useUserStore()

  return new Promise<void>(
    (resolve) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            userStore.setUser({
              uid: user.uid,
              email: user.email ?? null,
            })
          } else {
            userStore.setUser(null)
          }
          userStore.setAuthReady()
          resolve()
        },
      )
    },
  )
}
