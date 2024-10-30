import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { type User, AuthStatus } from '../interfaces'
import { checkAuthAction, loginAction } from '../actions'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.CHECKING)
  const user = ref<User | undefined>()
  const token = ref(useLocalStorage('token', ''))

  const login = async (username: string, password: string) => {
    try {
      const data = await loginAction(username, password)
      if (!data.success) {
        logout()
        return false
      }
      user.value = data.user
      token.value = data.token
      authStatus.value = AuthStatus.AUTHENTICATED
      return true
    } catch (error) {
      console.log(error)
      return logout()
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    authStatus.value = AuthStatus.UNAUTHENTICATED
    user.value = undefined
    token.value = ''
    console.log('Logout')

    return false
  }

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const data = await checkAuthAction()
      if (!data.success) {
        logout()
        return false
      }
      user.value = data.user
      token.value = data.token
      authStatus.value = AuthStatus.AUTHENTICATED
      return true
    } catch (error) {
      console.log(error)
      return logout()
    }
  }

  return {
    // Properties
    user,
    token,
    authStatus,
    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.CHECKING),
    isAuthenticated: computed(
      () => authStatus.value === AuthStatus.AUTHENTICATED,
    ),
    isUnauthenticated: computed(
      () => authStatus.value === AuthStatus.UNAUTHENTICATED,
    ),
    isAdmin: computed(
      () => user.value?.profile_description === 'ADMINISTRADOR',
    ),
    username: computed(() => user.value?.username),
    // Actions
    login,
    logout,
    checkAuthStatus,
  }
})
