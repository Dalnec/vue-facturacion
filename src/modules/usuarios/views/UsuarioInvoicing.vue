<template>
  <CustomModal
    :open="openEditMeasured"
    @close="() => (openEditMeasured = false)"
  >
    <template #header>
      <h3 class="text-lg font-bold">Editar Lectura</h3>
    </template>
    <template #body>
      <input
        type="text"
        :placeholder="'Ingresar valor'"
        class="input input-bordered input-primary w-full flex-1"
        v-model.number="editValues.measured"
      />
    </template>
    <template #actions>
      <div class="flex justify-end">
        <button
          class="btn mr-4"
          @click="
            () => {
              openEditMeasured = false
            }
          "
        >
          Cerrar
        </button>
        <button
          class="btn btn-primary"
          @click="
            async () => {
              await updateInvoice(editValues)
            }
          "
          :disabled="loadingEditMeasured"
        >
          Aceptar
        </button>
      </div>
    </template>
  </CustomModal>

  <ConfirmModal
    ref="openConfirmModalRef"
    :open="invoiceStore.openPaymentModal"
    title="Confirmar Accón"
    subtitle="¿Desea Realizar el Cobro?"
    @close="
      () => {
        openDrawer = false
        invoiceStore.openPaymentModal = false
      }
    "
    @confirm="
      () => {
        paymentInvoice(drawerValues.id)
        openDrawer = false
      }
    "
  />
  <div class="drawer drawer-end">
    <div class="card glass w-full m-3">
      <div
        v-if="!invoices && isLoading"
        class="h-screen w-screen flex justify-center items-center"
      >
        <div class="flex flex-col justify-center items-center">
          <span class="loading loading-ring loading-lg"></span>
          <p>Carganddo...</p>
        </div>
      </div>
      <div v-else class="card-body px-6 pt-6 pb-0">
        <div class="flex justify-between items-center">
          <div class="flex justify-start items-center">
            <RouterLink to="/usuarios" class="btn btn-circle mr-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M11 6L5 12L11 18M18 6L12 12L18 18"
                    stroke="#0284c7"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </RouterLink>
            <div>
              <h2 class="card-title text-primary font-bold">
                Facturación "{{ usuarioStore.selectedUsuario.family }}"
              </h2>
              <p>Generacion de recibos y cobros</p>
            </div>
          </div>
        </div>
        <div>
          <table class="table">
            <!-- head -->
            <thead>
              <tr class="text-sm">
                <th class="text-center p-1 w-[5%]"></th>
                <th class="text-center p-1 w-[10%]">Periodo</th>
                <th class="text-center p-1 w-[10%]">Lectura</th>
                <th class="text-center p-1 w-[10%]">Total</th>
                <th class="text-center p-1 w-[10%]">Estado</th>
                <th class="text-center p-1 w-[10%]">Fecha Modificacion</th>
                <th class="text-center p-1 w-[10%]">Encargado</th>
                <th class="text-center p-1 w-[10%]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(invoice, index) in invoices"
                :key="invoice.id"
                :class="`hover ${(index + 1) % 2 === 0 ? 'bg-gray-200' : ''}`"
              >
                <th class="text-center p-1">
                  {{ (page - 1) * pageSize + index + 1 }}
                </th>
                <td class="text-center p-1">{{ invoice.period }}</td>
                <td class="text-center p-1">{{ invoice.measured }}</td>
                <td class="text-center p-1">{{ invoice.total }}</td>
                <td class="text-center p-1">
                  <div
                    :class="`badge badge-sm ${invoice.status === 'P' ? 'badge-success' : 'badge-warning'} font-bold `"
                  >
                    {{ invoice.status === 'P' ? 'PAGADO' : 'DEUDA' }}
                  </div>
                </td>
                <td class="text-center p-1">{{ invoice.modified }}</td>
                <td class="text-center p-1">{{ invoice.employeeName }}</td>
                <td class="flex justify-center text-center p-1">
                  <button
                    v-if="invoice.status !== 'P'"
                    class="btn btn-warning btn-outline btn-xs mr-4"
                    @click="
                      () => {
                        editValues = { ...invoice }
                        openEditMeasured = true
                      }
                    "
                  >
                    Editar
                  </button>
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    class="drawer-toggle"
                    :checked="openDrawer"
                    @change="openDrawerChange"
                  />
                  <div class="drawer-content">
                    <label
                      for="my-drawer-4"
                      class="btn btn-primary btn-xs btn-outline"
                      @click="
                        () => {
                          drawerValues.id = invoice.id ?? 0
                          drawerValues.status = invoice.status
                          drawerValues.ticket = invoice.ticket
                          drawerValues.uuid = invoice.uuid ?? ''
                        }
                      "
                      >Ver Recibo</label
                    >
                  </div>
                  <div class="drawer-side h-full">
                    <label
                      for="my-drawer-4"
                      aria-label="close sidebar"
                      class="drawer-overlay opacity-10"
                    ></label>
                    <div
                      class="flex flex-col bg-base-200 text-base-content min-h-full w-80 p-4"
                    >
                      <div v-if="openDrawer" class="card bg-base-100 shadow-xl">
                        <InvoiceTicket
                          :ticket="JSON.parse(drawerValues.ticket)"
                          :status="drawerValues.status"
                          :uuid="drawerValues.uuid"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="overflow-x-auto overflow-y-hidden w-full">
            <ButtonPagination
              :has-more-data="!!invoices && invoices.length < 20"
              :page="page"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUsuarioStore } from '../store/usuario.store'
import { ref, watch, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { getInvoicesAction } from '../actions/get-usuario-invoices.action'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
// import TicketInvoiceIcon from '@/modules/common/icons/TicketInvoiceIcon.vue'
import InvoiceTicket from '../components/InvoiceTicket.vue'
import ConfirmModal from '@/modules/common/components/ConfirmModal.vue'
import { useInvoiceStore } from '../store/invoice.store'
import {
  updateInvoiceAction,
  updateStatusInvoiceAction,
} from '../actions/update-invoice.action'
import { useToast } from 'vue-toastification'
import CustomModal from '@/modules/common/components/CustomModal.vue'
import type { Invoice } from '../interfaces/invoice.interface'

const route = useRoute()
const usuarioStore = useUsuarioStore()
const invoiceStore = useInvoiceStore()
const queryClient = useQueryClient()
const toast = useToast()
const drawerValues = ref({
  id: 0,
  ticket: '',
  status: '',
  uuid: '',
})

const editValues = ref<Invoice>({
  period: '',
  ticket: '',
  read_date: new Date(),
  measured: '',
  price: '',
  total: '',
  status: '',
  employee: 0,
  usuario: 0,
  observations: null,
})
const openDrawer = ref(false)
const openEditMeasured = ref(false)
const loadingEditMeasured = ref(false)
const openDrawerChange = () => {
  openDrawer.value = !openDrawer.value
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

interface Props {
  usuarioId: string
}

const props = defineProps<Props>()

const page = ref(route.query.page ? Number(route.query.page) : 1)
const pageSize = ref(20)
const filterParams = ref({
  search: '',
  hasDebt: null,
  makeInvoice: null,
})

const {
  data: invoices,
  isLoading,
  refetch,
} = useQuery({
  queryKey: [
    'invoices',
    {
      page: page,
      page_size: pageSize,
      usuario: +props.usuarioId,
      filterParams,
    },
  ],
  queryFn: () =>
    getInvoicesAction(
      page.value,
      pageSize.value,
      +props.usuarioId,
      filterParams.value,
    ),
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
    queryKey: [
      'invoices',
      { page: page.value + 1, usuario: +props.usuarioId, filterParams },
    ],
    queryFn: () =>
      getInvoicesAction(
        page.value + 1,
        pageSize.value,
        +props.usuarioId,
        filterParams.value,
      ),
  })
})

watch(
  () => props.usuarioId,
  () => {
    refetch()
  },
)

const paymentInvoice = async (invoiceId: number) => {
  const { status } = await updateStatusInvoiceAction(invoiceId)

  if (status !== 200) {
    toast.error('Error al realizar el cobro', {
      timeout: 2000,
    })
    return
  }
  toast.success('Recibo cobrado correctamente', {
    timeout: 2000,
  })
  refetch()
}

const updateInvoice = async (invoice: Invoice) => {
  loadingEditMeasured.value = true
  invoice.total = `${parseFloat(invoice.measured) - parseFloat(invoice.previosMeasured ?? '0') * parseFloat(invoice.price)}`
  const { status } = await updateInvoiceAction(invoice.id ?? 0, invoice)

  if (status !== 200) {
    toast.error('Error de actualizacion', {
      timeout: 2000,
    })
    loadingEditMeasured.value = false
    return
  }
  toast.success('Lectura acutalizada correctamente', {
    timeout: 2000,
  })
  loadingEditMeasured.value = false
  openEditMeasured.value = false
  refetch()
}
</script>
