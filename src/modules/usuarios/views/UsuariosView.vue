<template>
  <UsuarioChangePasswordModal
    :open="usuarioStore.openPasswordModal"
    @close="() => (usuarioStore.openPasswordModal = false)"
  />
  <UsuarioRestartMeasured
    :open="usuarioStore.openRestartModal"
    @close="() => (usuarioStore.openRestartModal = false)"
    @reload="
      () => {
        refetch()
      }
    "
  />

  <div class="card glass w-full m-3">
    <div class="card-body px-6 pt-6 pb-0">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title text-primary font-bold">Usuarios</h2>
          <p>Control de Usuarios y generacion de recibos</p>
        </div>
        <div class="">
          <RouterLink to="/usuarios/form/create" class="btn btn-primary">
            <AddUsuariosIcon />
            Nuevo
          </RouterLink>
        </div>
      </div>
      <div>
        <!-- <h2>Filtros</h2> -->
        <div
          class="flex grid grid-cols-1 md:grid-cols-4 xl:grid-cols-4 gap-2 py-2 items-end"
        >
          <div class="w-50 rounded-xl">
            <label for="" class="form-label">Busqueda General</label>

            <label class="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                type="text"
                class="grow"
                placeholder="Buscar..."
                v-model="filterParams.search"
              />
            </label>
          </div>
          <div class="w-50 rounded-xl">
            <label for="" class="form-label w-full">Estado Deuda</label>
            <select
              class="select select-bordered w-full"
              v-model="filterParams.hasDebt"
            >
              <option :value="null">TODOS</option>
              <option value="false">AL DIA</option>
              <option value="true">DEUDA</option>
            </select>
          </div>
          <div class="w-50 rounded-xl">
            <label for="" class="form-label">Estado Facturacion</label>
            <select
              class="select select-bordered w-full"
              v-model="filterParams.makeInvoice"
            >
              <option :value="null">TODOS</option>
              <option value="false">AL DIA</option>
              <option value="true">PENDIENTE</option>
            </select>
          </div>
          <div class="rounded-xl">
            <button class="btn btn-secondary">Buscar</button>
          </div>
        </div>
        <!-- {{ filterParams }} -->
      </div>
      <div
        v-if="!usuarios"
        class="h-screen w-screen flex justify-center items-center"
      >
        <div class="flex flex-col justify-center items-center">
          <span class="loading loading-ring loading-lg"></span>
          <p>Carganddo...</p>
        </div>
      </div>
      <UsuariosDataTable
        v-else
        :usuarios="usuarios"
        :isLoading="isLoading"
        :index="(page - 1) * pageSize"
      />

      <div class="overflow-x-auto overflow-y-hidden w-full">
        <ButtonPagination
          :has-more-data="!!usuarios && usuarios.length < 20"
          :page="page"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { getUsuariosAction } from '@/modules/usuarios/actions/getusuarios.action'
import AddUsuariosIcon from '@/modules/common/icons/AddUsuariosIcon.vue'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import UsuariosDataTable from '../components/UsuariosDataTable.vue'
import UsuarioChangePasswordModal from '../components/UsuarioChangePasswordModal.vue'
import { useUsuarioStore } from '../store/usuario.store'
import UsuarioRestartMeasured from '../components/UsuarioRestartMeasured.vue'

const route = useRoute()
const usuarioStore = useUsuarioStore()
const openModal = ref(false)

const page = ref(route.query.page ? Number(route.query.page) : 1)
const pageSize = ref(20)
const queryClient = useQueryClient()
const filterParams = ref({
  search: '',
  hasDebt: null,
  makeInvoice: null,
})

const {
  data: usuarios,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ['usuarios', { page: page, page_size: pageSize, filterParams }],
  queryFn: () =>
    getUsuariosAction(page.value, pageSize.value, filterParams.value),
})

watch(
  () => route.query.page,
  newPage => {
    console.log(newPage)

    page.value = Number(newPage || 1)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

watch(
  () => usuarioStore.openPasswordModal,
  newModal => (openModal.value = newModal),
)

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: [
      'usuarios',
      { page: page.value + 1, page_size: pageSize, filterParams },
    ],
    queryFn: () =>
      getUsuariosAction(page.value + 1, pageSize.value, filterParams.value),
  })
})
</script>
