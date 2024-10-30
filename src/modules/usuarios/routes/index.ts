import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard'
import type { RouteRecordRaw } from 'vue-router'

export const usuariosRoutes: RouteRecordRaw = {
  path: '/usuarios',
  name: 'usuarios',
  beforeEnter: [isAuthenticatedGuard],
  component: () => import('@/modules/usuarios/views/UsuariosView.vue'),
}
