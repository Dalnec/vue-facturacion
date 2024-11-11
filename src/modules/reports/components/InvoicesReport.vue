<template>
  <div class="card glass bg-base-100 shadow-xl mb-4 p-0 h-full w-full">
    <div class="card-body px-6 pt-6 pb-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title text-primary font-bold">Reporte Facturas</h2>
          <p>Filtrar por Estado, Mes y Año</p>
        </div>
      </div>
      <div>
        <div
          class="flex grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-2 py-2 items-end"
        >
          <div class="w-50 rounded-xl">
            <label class="form-label w-full">Estado Deuda</label>
            <select
              class="select select-bordered w-full"
              v-model="filterParams.status"
            >
              <option :value="null">TODOS</option>
              <option value="P">AL DIA</option>
              <option value="D">DEUDA</option>
            </select>
          </div>
          <div class="w-50 rounded-xl">
            <label class="form-label">Mes</label>
            <select
              class="select select-bordered w-full"
              v-model="filterParams.month"
            >
              <option value="1">ENERO</option>
              <option value="2">FEBRERO</option>
              <option value="3">MARZO</option>
              <option value="4">ABRIL</option>
              <option value="5">MAYO</option>
              <option value="6">JUNIO</option>
              <option value="7">JULIO</option>
              <option value="8">AGOSTO</option>
              <option value="9">SEPTIEMBRE</option>
              <option value="10">OCTUBRE</option>
              <option value="11">NOVIEMBRE</option>
              <option value="12">DICIEMBRE</option>
            </select>
          </div>
          <div class="w-50 rounded-xl">
            <label class="form-label">Año</label>
            <select
              class="select select-bordered w-full"
              v-model="filterParams.year"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div class="rounded-xl">
            <button
              class="btn btn-secondary mr-4"
              @click="reportInvoice(filterParams)"
            >
              Descargar
            </button>
            <button
              class="btn btn-accent btn-outline"
              :disabled="isLoading"
              @click="
                () => {
                  filterParams = {
                    status: null,
                    month: `${new Date().getMonth() + 1}`,
                    year: `${currentYear}`,
                  }
                }
              "
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getInvoiceReportAction } from '../actions/getInvoicesReport'

const isLoading = ref(false)
interface FilterParams {
  status?: string | null
  month?: string
  year?: string
}

// Genera un rango de años desde 5 años atrás hasta el año actual
const currentYear = new Date().getFullYear()
const years = computed(() => {
  const range = []
  for (let i = currentYear - 5; i <= currentYear; i++) {
    range.push(i.toString())
  }
  return range
})

const filterParams = ref({
  status: null,
  month: `${new Date().getMonth() + 1}`,
  year: `${currentYear}`,
})

const reportInvoice = async (params: FilterParams) => {
  isLoading.value = true
  await getInvoiceReportAction(
    params,
    `reporte_facturas_${params.month}_${params.year}.pdf`,
  )
  setTimeout(() => {}, 1000)
  isLoading.value = false
}
</script>
