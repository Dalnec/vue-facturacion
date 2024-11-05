import MainLayouts from '@/modules/projects/layouts/MainLayouts.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '../modules/auth/routes/index'
import { usuariosRoutes } from '@/modules/usuarios/routes'
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainLayouts,
      // beforeEnter: [isAuthenticatedGuard],
      children: [
        // {
        //   path: '',
        //   name: 'home',
        //   component: () => import('@/modules/projects/views/MainView.vue'),
        // },
        // usuariosRoutes,
        // {
        //   path: '/usuarios',
        //   name: 'usuarios',
        //   beforeEnter: [isAuthenticatedGuard],
        //   component: () => import('@/modules/usuarios/views/UsuariosView.vue'),
        // },
        usuariosRoutes,
        {
          path: '/usuarios/form/:usuarioId',
          name: 'usuario-form',
          props: true,
          beforeEnter: [isAuthenticatedGuard],
          component: () =>
            import('@/modules/usuarios/views/UsuarioFormView.vue'),
        },
        {
          path: '/usuarios/invoicing/:usuarioId',
          name: 'usuario-invoicing',
          props: true,
          beforeEnter: [isAuthenticatedGuard],
          component: () =>
            import('@/modules/usuarios/views/UsuarioInvoicing.vue'),
        },
        {
          path: '/monitoring',
          name: 'monitoring',
          beforeEnter: [isAuthenticatedGuard],
          component: () =>
            import('@/modules/monitoring/views/MonitoringView.vue'),
        },
        {
          path: '/purchases',
          name: 'purchases',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('@/modules/purchase/views/PurchaseView.vue'),
        },
        {
          path: '/distric',
          name: 'distric',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('@/modules/distric/views/DistricView.vue'),
        },
        {
          path: '/employee',
          name: 'employee',
          beforeEnter: [isAuthenticatedGuard],
          component: () => import('@/modules/employee/views/EmployeeView.vue'),
        },
        {
          path: '/employee/form/:employeeId',
          name: 'employee-form',
          beforeEnter: [isAuthenticatedGuard],
          props: true,
          component: () =>
            import('@/modules/employee/views/EmployeeFormView.vue'),
        },
      ],
    },
    authRoutes,
  ],
})

export default router
