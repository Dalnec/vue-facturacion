<template>
  <div class="card glass w-full m-3">
    <div class="card-body px-6 pt-6 pb-0">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title text-primary font-bold">Usuarios</h2>
          <p>Control de Usuarios y generacion de recibos</p>
        </div>
        <div class="">
          <RouterLink to="/usuarios/form/create" class="btn btn-primary btn-sm">
            <AddUsuariosIcon />
            Nuevo
          </RouterLink>
        </div>
      </div>
      <div
        v-if="!usuarios"
        class="h-screen w-screen flex justify-center items-center"
      >
        <span class="loading loading-ring loading-lg"></span>
        <!-- <h1 class="text-xl">Cargando...</h1> -->
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
import { ref, watch, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import AddUsuariosIcon from '@/modules/common/icons/AddUsuariosIcon.vue'
import { getUsuariosAction } from '@/modules/usuarios/actions/getusuarios.action'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import { useRoute } from 'vue-router'
import UsuariosDataTable from '../components/UsuariosDataTable.vue'

const route = useRoute()

const page = ref(route.query.page ? Number(route.query.page) : 1)
const pageSize = ref(20)
const queryClient = useQueryClient()

const { data: usuarios, isLoading } = useQuery({
  queryKey: ['usuarios', { page: page, page_size: pageSize }],
  queryFn: () => getUsuariosAction(page.value, pageSize.value),
})

watch(
  () => route.query.page,
  newPage => {
    console.log(newPage)

    page.value = Number(newPage || 1)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getUsuariosAction(page.value + 1),
  })
})
</script>
