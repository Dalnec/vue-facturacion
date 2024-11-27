<template>
  <PurchaseModal
    :open="openModal"
    :purchase="selectedPurchase"
    @close="openModal = false"
    @reload="refetch()"
  />
  <div class="card glass w-full m-3">
    <div class="card-body px-6 pt-6 pb-0">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title text-primary font-bold">Tarifa</h2>
          <p>Historial de tarifas del consumo de agua</p>
        </div>
        <div>
          <div
            class="flex grid grid-cols-1 md:grid-cols-8 xl:grid-cols-8 gap-2 items-end"
          >
            <div class="rounded-xl col-span-3">
              <label class="input input-bordered flex items-center gap-2">
                Desde:
                <input
                  type="date"
                  class="grow"
                  placeholder="Fecha Desde"
                  v-model="dateFilters.purchased_date_range_after"
                  @change="
                    () => {
                      $router.replace(`/purchases/?page=1`)
                      filterParams.purchased_date_range_after = `${dateFilters.purchased_date_range_after} 00:00:00`
                    }
                  "
                />
              </label>
            </div>
            <div class="rounded-xl col-span-3">
              <label class="input input-bordered flex items-center gap-2">
                Hasta:
                <input
                  type="date"
                  class="grow"
                  placeholder="Fecha Hasta"
                  v-model="dateFilters.purchased_date_range_before"
                  @change="
                    () => {
                      $router.replace(`/purchases/?page=1`)
                      filterParams.purchased_date_range_before = `${dateFilters.purchased_date_range_before} 23:59:59`
                    }
                  "
                />
              </label>
            </div>
            <div class="col-span-2">
              <button
                class="btn btn-secondary btn-circle"
                @click="
                  () => {
                    const currentYear = new Date().getFullYear()
                    dateFilters.purchased_date_range_after = `${currentYear}-01-01`
                    dateFilters.purchased_date_range_before = `${currentYear}-12-31`
                    filterParams.purchased_date_range_after = `${currentYear}-01-01 00:00:00`
                    filterParams.purchased_date_range_before = `${currentYear}-12-31 23:59:59`
                  }
                "
              >
                <ReloadIcon />
              </button>
              <button
                class="btn btn-primary ml-2"
                @click="
                  () => {
                    selectedPurchase = {
                      price: null,
                      observations: null,
                    }
                    openModal = true
                  }
                "
              >
                <MoneyPlusIcon />
                Nuevo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div class="col-span-1 md:col-span-7 w-full">
          <div class="card bg-base-100 shadow-xl p-0 h-full w-full">
            <div class="card-body p-4 h-[50vh] w-full">
              <div
                v-if="chartLoading"
                class="h-full w-full flex justify-center items-center"
              >
                <div class="flex flex-col justify-center items-center">
                  <span class="loading loading-ring loading-lg"></span>
                  <p>Cargando...</p>
                </div>
              </div>
              <LineChart v-else :data="data" class="w-full h-full" />
            </div>
          </div>
        </div>

        <div
          v-if="!purchases && isLoading"
          class="h-screen w-screen flex justify-center items-center"
        >
          <div class="flex flex-col justify-center items-center">
            <span class="loading loading-ring loading-lg"></span>
            <p>Cargando...</p>
          </div>
        </div>

        <div v-else class="col-span-7">
          <div class="card bg-base-100 shadow-xl p-0">
            <div class="card-body p-4">
              <table class="table">
                <thead>
                  <tr class="text-sm">
                    <th class="text-center p-1 w-[10%]"></th>
                    <th class="text-center p-1 w-[10%]">Fecha Registro</th>
                    <th class="text-center p-1 w-[10%]">Última Modificación</th>
                    <th class="text-center p-1 w-[10%]">Tarifa</th>
                    <th class="text-center p-1 w-[10%]">Empleado</th>
                    <th class="text-center p-1 w-[10%]">Observaciones</th>
                    <th class="text-center p-1 w-[10%]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(purchase, index) in purchases"
                    :key="purchase.id"
                    :class="`hover ${(index + 1) % 2 === 0 ? 'bg-gray-200' : ''}`"
                  >
                    <th class="text-center p-1">
                      {{ (page - 1) * pageSize + index + 1 }}
                    </th>
                    <td class="text-center p-1">
                      {{ purchase.purchased_date }}
                    </td>
                    <td class="text-center p-1">
                      {{ purchase.modified }}
                    </td>
                    <td class="text-center p-1">
                      {{ purchase.price }}
                    </td>
                    <td class="text-center p-1">
                      {{ purchase.employee_name }}
                    </td>
                    <td class="text-center p-1">{{ purchase.observations }}</td>
                    <td class="text-center p-1">
                      <button
                        class="btn btn-warning btn-outline btn-xs"
                        @click="
                          () => {
                            selectedPurchase = purchase
                            openModal = true
                          }
                        "
                        :disabled="index !== 0"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="overflow-x-auto overflow-y-hidden w-full">
                <ButtonPagination
                  :has-more-data="!!purchases && purchases.length < 20"
                  :page="page"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LineChart from '@/modules/common/components/charts/LineChart.vue'
import ReloadIcon from '@/modules/common/icons/ReloadIcon.vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import {
  getPurchasesAction,
  getPurchasesNoPageAction,
} from '../actions/getPurchases.action'
import PurchaseModal from '../components/PurchaseModal.vue'
import MoneyPlusIcon from '@/modules/common/icons/MoneyPlusIcon.vue'

const route = useRoute()
const queryClient = useQueryClient()

const page = ref(route.query.page ? Number(route.query.page) : 1)
const pageSize = ref(20)
const openModal = ref(false)
const selectedPurchase = ref({})

const currentYear = new Date().getFullYear()
const dateFilters = reactive({
  purchased_date_range_after: `${currentYear}-01-01`,
  purchased_date_range_before: `${currentYear}-12-31`,
})

const filterParams = reactive({
  purchased_date_range_after: `${currentYear}-01-01 00:00:00`,
  purchased_date_range_before: `${currentYear}-12-31 23:59:59`,
})

const {
  data: purchases,
  isLoading,
  refetch,
} = useQuery({
  queryKey: [
    'purchases',
    {
      page: page,
      page_size: pageSize,
      filterParams,
    },
  ],
  queryFn: () => getPurchasesAction(page.value, pageSize.value, filterParams),
})

watch(
  () => route.query.page,
  newPage => {
    page.value = Number(newPage || 1)
  },
)

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['purchases', { page: page.value + 1, filterParams }],
    queryFn: () =>
      getPurchasesAction(page.value + 1, pageSize.value, filterParams),
  })
})

const { data: chartPurchases, isLoading: chartLoading } = useQuery({
  queryKey: [
    'chart-purchases',
    {
      filterParams,
    },
  ],
  queryFn: () => getPurchasesNoPageAction(filterParams),
})

const data = computed(() => {
  let labels = []
  const data_values = []

  chartPurchases.value?.forEach(v => {
    labels.push(`${new Date(v.purchased_date).toISOString().split('T')[0]}`)
    data_values.push(v.price)
  })
  labels = labels.reverse()
  const datasets = [
    {
      label: 'Tarifas',
      backgroundColor: '#3ba0ff',
      data: data_values.reverse(),
    },
  ]
  return { labels, datasets }
})
</script>
