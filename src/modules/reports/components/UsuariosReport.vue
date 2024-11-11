<template>
  <div class="card glass bg-base-100 shadow-xl mb-4 p-0 h-full w-full">
    <div class="card-body px-6 pt-6 pb-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title text-primary font-bold">Reporte Usuarios</h2>
          <p>Descargar Lista de Usuarios</p>
        </div>
      </div>
      <div>
        <div
          class="flex grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-2 py-2 items-end"
        >
          <div class="rounded-xl">
            <button
              class="btn btn-secondary mr-4"
              :disabled="isLoading"
              @click="reportUsuarios()"
            >
              Descargar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUsuariosReportAction } from '../actions/getUsuariosReport'
const isLoading = ref(false)

const formatedDate = () => {
  const date = new Date()

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)

  return `${day}-${month}-${year}`
}
const reportUsuarios = async () => {
  isLoading.value = true
  await getUsuariosReportAction(`Reporte_Usuarios_${formatedDate()}.pdf`)
  setTimeout(() => {}, 1000)
  isLoading.value = false
}
</script>
