<template>
  <RouterView />
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { AuthStatus } from './modules/auth/interfaces'
import { useAuthStore } from './modules/auth/stores/auth.store'
// import FullScreenLoader from './modules/common/components/FullScreenLoader.vue'

const authStore = useAuthStore()

const router = useRouter()
const route = useRoute()

authStore.$subscribe((_, state) => {
  if (state.authStatus === AuthStatus.CHECKING) {
    console.log('APP CHECKING')

    authStore.checkAuthStatus()
    return
  }
  if (
    route.path.includes('/auth') &&
    state.authStatus === AuthStatus.AUTHENTICATED
  ) {
    router.push({ name: 'main' })
    return
  }
  // if (state.authStatus === AuthStatus.UNAUTHENTICATED) {
  //   router.push({ path: '/auth/login' })
  //   return
  // }
})
</script>
