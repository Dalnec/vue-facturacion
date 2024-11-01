import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { AuthStatus } from '../interfaces'

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()

  await authStore.checkAuthStatus()

  // console.log('isNotAuthenticatedGuard')
  if (authStore.authStatus === AuthStatus.AUTHENTICATED) {
    next({ name: 'main' })
  } else next()
}

export default isNotAuthenticatedGuard
