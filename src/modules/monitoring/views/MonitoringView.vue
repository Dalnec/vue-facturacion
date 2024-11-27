<template>
  <SettingsModal
    :open="openSettingsModal"
    @close="openSettingsModal = false"
    title="Ajustar Intervalo de Tiempo"
    subtitle="Establecer tiempo de envio de datos al servidor"
  />
  <div class="card glass w-full m-3">
    <div class="card-body px-6 pt-6 pb-0">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title text-primary font-bold">
            Monitoreo Nivel del Agua
          </h2>
          <p>Estado del Nivel de Agua en el tanque barrial</p>
        </div>
        <div>
          <div class="flex grid grid-cols-1 lg:grid-cols-5 gap-2 items-end">
            <div class="rounded-xl col-span-1 lg:col-span-2">
              <label class="input input-bordered flex items-center gap-2">
                Desde:
                <input
                  type="date"
                  class="grow"
                  placeholder="Fecha Desde"
                  v-model="dateFilters.read_date_range_after"
                  @change="
                    () => {
                      $router.replace(`/monitoring/?page=1`)
                      filterParams.read_date_range_after = `${dateFilters.read_date_range_after} 00:00:00`
                    }
                  "
                />
              </label>
            </div>
            <div class="rounded-xl col-span-1 lg:col-span-2">
              <label class="input input-bordered flex items-center gap-2">
                Hasta:
                <input
                  type="date"
                  class="grow"
                  placeholder="Fecha Hasta"
                  v-model="dateFilters.read_date_range_before"
                  @change="
                    () => {
                      $router.replace(`/monitoring/?page=1`)
                      filterParams.read_date_range_before = `${dateFilters.read_date_range_before} 23:59:59`
                    }
                  "
                />
              </label>
            </div>
            <div class="col-span-1">
              <button
                class="btn btn-primary btn-circle mr-1"
                @click="
                  () => {
                    dateFilters.read_date_range_after = `${formatedDate()}`
                    dateFilters.read_date_range_before = `${formatedDate()}`
                    filterParams.read_date_range_after = `${formatedDate()} 00:00:00`
                    filterParams.read_date_range_before = `${formatedDate()} 23:59:59`
                  }
                "
              >
                <ReloadIcon />
              </button>
              <button
                class="btn btn-primary btn-circle"
                @click="
                  () => {
                    openSettingsModal = true
                  }
                "
              >
                <SettingsIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-4">
        <!-- cards -->
        <div class="col-span-7 lg:col-span-3">
          <div class="card bg-base-100 shadow-xl p-0 h-full">
            <div
              v-if="lastLoading"
              class="h-full w-full flex justify-center items-center"
            >
              <div class="flex flex-col justify-center items-center">
                <span class="loading loading-ring loading-lg"></span>
                <p>Cargando...</p>
              </div>
            </div>
            <div
              v-else
              class="grid grid-cols-7 items-center card-body p-4 m-0 h-[45vh]"
            >
              <div class="col-span-4 flex justify-center">
                <div class="w-[85%]">
                  <DoughnutChart :data="dataDoughnut" />
                  <span
                    class="flex justify-center w-full mt-2 font-bold text-gray-600"
                  >
                    {{ parseFloat(lastMonitoring?.liters ?? '0').toFixed(0) }}
                    litros aprox.
                  </span>
                </div>
              </div>
              <!-- detail -->
              <div class="col-span-3 flex flex-col gap-2">
                <!-- <span>Altura: 240cm</span> -->
                <div
                  class="flex items-center justify-evenly gap-1 text-sm text-gray-400 font-bold"
                >
                  <div>
                    <span>Capacidad:</span><br />
                    <span>{{ lastMonitoring?.capacity }} litros</span>
                  </div>
                  <div>
                    <span>Altura:</span><br />
                    <span>{{ lastMonitoring?.height }} cm</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <DropIcon class="w-7 h-7" />
                  <div class="flex flex-col">
                    <span class="font-bold">Nivel del Agua</span>
                    <span>
                      {{ lastMonitoring?.percentage }}%
                      {{
                        parseFloat(lastMonitoring?.height ?? '0') -
                        parseFloat(lastMonitoring?.measured ?? '0')
                      }}cm
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <UpdateIcon class="w-7 h-7" />
                  <div class="flex flex-col">
                    <span class="font-bold">Última Actualización</span>
                    <span>{{ lastMonitoring?.read_date }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <ConnectedIcon
                    v-if="lastMonitoring?.isConnected"
                    class="w-7 h-7"
                  />
                  <DisconnectedIcon v-else class="w-7 h-7" />
                  <div class="flex flex-col">
                    <span class="font-bold">Estado Dispositivo</span>
                    <span
                      :class="[
                        'font-bold',
                        lastMonitoring?.isConnected
                          ? 'text-success'
                          : 'text-error',
                      ]"
                      >{{
                        lastMonitoring?.isConnected
                          ? 'Conectado'
                          : 'Desconectado'
                      }}</span
                    >
                  </div>
                </div>
                <div
                  v-if="!lastMonitoring?.isConnected"
                  class="flex items-center gap-2"
                >
                  <UnknownBatteryIcon class="w-8 h-8" />
                  <div class="flex flex-col">
                    <span class="font-bold">Nivel de Bateria</span>
                    <span
                      :class="[
                        'font-bold',
                        lastMonitoring?.isConnected
                          ? 'text-success'
                          : 'text-error',
                      ]"
                    >
                      - %
                    </span>
                  </div>
                </div>
                <div v-else class="flex items-center gap-2">
                  <FullBatteryIcon
                    v-if="
                      parseInt(lastMonitoring?.battery ?? '0') == 100 ||
                      parseInt(lastMonitoring?.battery ?? '0') > 75
                    "
                    class="w-8 h-8"
                  />
                  <SeventyFiveBatteryIcon
                    v-else-if="
                      parseInt(lastMonitoring?.battery ?? '0') <= 75 &&
                      parseInt(lastMonitoring?.battery ?? '0') > 50
                    "
                    class="w-8 h-8"
                  />
                  <FiftyBatteryIcon
                    v-else-if="
                      parseInt(lastMonitoring?.battery ?? '0') <= 50 &&
                      parseInt(lastMonitoring?.battery ?? '0') > 25
                    "
                    class="w-8 h-8"
                  />
                  <TwentyFiveBatteryIcon
                    v-else-if="
                      parseInt(lastMonitoring?.battery ?? '0') <= 25 &&
                      parseInt(lastMonitoring?.battery ?? '0') > 10
                    "
                    class="w-8 h-8"
                  />
                  <EmptyBatteryIcon v-else class="w-8 h-8" />
                  <div class="flex flex-col">
                    <span class="font-bold">Nivel de Bateria</span>
                    <span>{{ lastMonitoring?.battery }} %</span>
                  </div>
                </div>
              </div>
              <!-- end detail -->
            </div>
          </div>
        </div>

        <div class="col-span-7 lg:col-span-4">
          <div class="card bg-base-100 shadow-xl p-0 h-full">
            <div class="card-body p-4 h-[45vh]">
              <div
                v-if="chartLoading"
                class="h-full w-full flex justify-center items-center"
              >
                <div class="flex flex-col justify-center items-center">
                  <span class="loading loading-ring loading-lg"></span>
                  <p>Cargando...</p>
                </div>
              </div>
              <!-- <h2 class="card-title">Card title!</h2> -->
              <!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
              <LineChart v-else :data="data" />
            </div>
          </div>
        </div>

        <div
          v-if="!monitorings && isLoading"
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
                    <th class="text-center p-1 w-[10%]">Fecha</th>
                    <th class="text-center p-1 w-[10%]">Medición</th>
                    <th class="text-center p-1 w-[10%]">Nivel Agua</th>
                    <th class="text-center p-1 w-[10%]">Nivel Bateria</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(monitoring, index) in monitorings"
                    :key="monitoring.id"
                    :class="`hover ${(index + 1) % 2 === 0 ? 'bg-gray-200' : ''}`"
                  >
                    <th class="text-center p-1">
                      {{ (page - 1) * pageSize + index + 1 }}
                    </th>
                    <td class="text-center p-1">{{ monitoring.read_date }}</td>
                    <td class="text-center p-1">
                      {{ monitoring.measured }} cm
                    </td>
                    <td class="text-center p-1">
                      {{ monitoring.percentage }} %
                    </td>
                    <td class="text-center p-1">{{ monitoring.battery }} %</td>
                  </tr>
                </tbody>
              </table>
              <div class="overflow-x-auto overflow-y-hidden w-full">
                <ButtonPagination
                  :has-more-data="!!monitorings && monitorings.length < 20"
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
import DoughnutChart from '@/modules/common/components/charts/DoughnutChart.vue'
import LineChart from '@/modules/common/components/charts/LineChart.vue'
import ReloadIcon from '@/modules/common/icons/ReloadIcon.vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import {
  getLastMonitoringAction,
  getMonitoringsAction,
  getMonitoringsNoPageAction,
} from '../actions/get-monitorings.action'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import DropIcon from '@/modules/common/icons/DropIcon.vue'
import UpdateIcon from '@/modules/common/icons/UpdateIcon.vue'
import DisconnectedIcon from '@/modules/common/icons/DisconnectedIcon.vue'
import FullBatteryIcon from '@/modules/common/icons/FullBatteryIcon.vue'
import ConnectedIcon from '@/modules/common/icons/ConnectedIcon.vue'
import SeventyFiveBatteryIcon from '@/modules/common/icons/SeventyFiveBatteryIcon.vue'
import FiftyBatteryIcon from '@/modules/common/icons/FiftyBatteryIcon.vue'
import TwentyFiveBatteryIcon from '@/modules/common/icons/TwentyFiveBatteryIcon.vue'
import EmptyBatteryIcon from '@/modules/common/icons/EmptyBatteryIcon.vue'
import SettingsIcon from '@/modules/common/icons/SettingsIcon.vue'
import SettingsModal from '../components/SettingsModal.vue'
import UnknownBatteryIcon from '@/modules/common/icons/UnknownBatteryIcon.vue'

const route = useRoute()
const queryClient = useQueryClient()

const page = ref(route.query.page ? Number(route.query.page) : 1)
const pageSize = ref(20)

const openSettingsModal = ref(false)
const formatedDate = () => {
  const date = new Date()

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)

  return `${year}-${month}-${day}`
}

const dateFilters = reactive({
  read_date_range_after: `${formatedDate()}`,
  read_date_range_before: `${formatedDate()}`,
})
const filterParams = reactive({
  read_date_range_after: `${formatedDate()} 00:00:00`,
  read_date_range_before: `${formatedDate()} 23:59:59`,
})

const {
  data: monitorings,
  isLoading,
  refetch: monitoringsRefetch,
} = useQuery({
  queryKey: [
    'monitorings',
    {
      page: page,
      page_size: pageSize,
      filterParams,
    },
  ],
  queryFn: () => getMonitoringsAction(page.value, pageSize.value, filterParams),
})

watch(
  () => route.query.page,
  newPage => {
    page.value = Number(newPage || 1)
  },
)

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['monitorings', { page: page.value + 1, filterParams }],
    queryFn: () =>
      getMonitoringsAction(page.value + 1, pageSize.value, filterParams),
  })
})

const {
  data: chartMonitorings,
  isLoading: chartLoading,
  refetch: chartRefetch,
} = useQuery({
  queryKey: [
    'chart-monitorings',
    {
      filterParams,
    },
  ],
  queryFn: () => getMonitoringsNoPageAction(filterParams),
})

const { data: lastMonitoring, isLoading: lastLoading } = useQuery({
  queryKey: ['last-monitoring'],
  queryFn: () => getLastMonitoringAction(),
  refetchInterval: 10000,
})

const data = computed(() => {
  const labels: string[] = []
  const data_values: string[] = []

  chartMonitorings.value?.forEach((v, i) => {
    labels.push(`${i + 1}`)
    data_values.push(v.measured)
  })
  const datasets = [
    {
      label: 'Mediciones',
      backgroundColor: '#3ba0ff',
      data: data_values.reverse(),
    },
  ]
  return { labels, datasets }
})

const dataDoughnut = computed(() => {
  return {
    labels: ['Agua', 'Vacio'],
    datasets: [
      {
        data: [
          lastMonitoring.value?.percentage,
          100 - +lastMonitoring.value!.percentage,
        ],
        backgroundColor: ['#3ba0ff', '#e0e0e0'],
      },
    ],
  }
})

watch(lastMonitoring, newLastMonitoring => {
  console.log(newLastMonitoring)
  chartRefetch()
  monitoringsRefetch()
})
</script>
