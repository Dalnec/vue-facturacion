import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { AuthStatus } from '../interfaces'

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()

  // console.log(to);
  await authStore.checkAuthStatus()

  console.log('isAuthenticatedGuard')
  console.log(authStore.authStatus === AuthStatus.UNAUTHENTICATED)

  if (
    to.name !== 'Login' &&
    authStore.authStatus === AuthStatus.UNAUTHENTICATED
  ) {
    next({ name: 'login' })
  } else next()
}
export default isAuthenticatedGuard
