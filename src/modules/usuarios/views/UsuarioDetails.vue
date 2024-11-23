<template>
  <CustomModal :open="opendModal" @close="() => (opendModal = false)">
    <template #header>
      <h3 class="text-lg font-bold">Registar Nuevo Detalle</h3>
    </template>
    <template #body>
      <div class="flex flex-col mb-4 w-full">
        <label for="stock" class="form-label w-full">Tipo</label>
        <select
          :class="[
            'select select-bordered bg-white w-full',
            { 'border-error': errors.profile },
          ]"
          v-model="is_income"
          v-bind="is_incomeAttrs"
        >
          <option value="1">Ingreso</option>
          <option value="0">Egreso</option>
        </select>
        <span class="text-red-500" v-if="errors.profile">
          {{ errors.is_income }}
        </span>
      </div>
      <div class="mb-4">
        <label for="address" class="form-label">Descripción</label>
        <CustomInput
          v-model="description"
          v-bind="descriptionAttrs"
          :error="errors.description"
        />
      </div>

      <div class="mb-4">
        <label for="phone" class="form-label">Cantidad</label>
        <CustomInput
          v-model.number="quantity"
          v-bind="quantityAttrs"
          :error="errors.quantity"
          type="number"
        />
      </div>
      <div class="mb-4">
        <label for="phone" class="form-label">Precio</label>
        <CustomInput
          v-model.number="price"
          v-bind="priceAttrs"
          :error="errors.price"
          type="number"
        />
      </div>
    </template>
    <template #actions>
      <div class="flex justify-end">
        <button
          class="btn mr-4"
          @click="
            () => {
              opendModal = false
            }
          "
        >
          Cerrar
        </button>
        <button
          class="btn btn-primary"
          @click="
            async () => {
              await onSubmit()
            }
          "
          :disabled="loading"
        >
          Aceptar
        </button>
      </div>
    </template>
  </CustomModal>

  <ConfirmModal
    ref="openConfirmModalRef"
    :open="openDeleteModal"
    title="Confirmar Accón"
    subtitle="¿Desea Anular el Registro?"
    @close="
      () => {
        openDeleteModal = false
      }
    "
    @confirm="
      () => {
        updateDetail(selectedDetail!)
      }
    "
  />

  <div class="card glass w-full m-3">
    <div
      v-if="!details && isLoading"
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
              Detalle de Usuario "{{ usuarioStore.selectedUsuario.family }}"
            </h2>
            <p>Generación de pagos varios</p>
          </div>
        </div>
        <div class="">
          <button @click="opendModal = true" class="btn btn-primary">
            <span class="text-2xl">+</span> Nuevo
          </button>
        </div>
      </div>
      <div>
        <table class="table">
          <!-- head -->
          <thead>
            <tr class="text-sm">
              <th class="text-center p-1 w-[5%]"></th>
              <th class="text-center p-1 w-[10%]">Tipo</th>
              <th class="text-center p-1 w-[10%]">Fecha Registro</th>
              <th class="text-center p-1 w-[10%]">Recibo</th>
              <th class="text-center p-1 w-[15%]">Descripción</th>
              <th class="text-center p-1 w-[10%]">Precio</th>
              <th class="text-center p-1 w-[10%]">Cantidad</th>
              <th class="text-center p-1 w-[10%]">Subtotal</th>
              <th class="text-center p-1 w-[5%]">Estado</th>
              <th class="text-center p-1 w-[10%]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(detail, index) in details"
              :key="detail.id"
              :class="`hover ${(index + 1) % 2 === 0 ? 'bg-gray-200' : ''}`"
            >
              <th class="text-center p-1">
                {{ (page - 1) * pageSize + index + 1 }}
              </th>
              <td
                :class="`${detail.is_income ? 'text-success' : 'text-warning'} text-center p-1 font-bold`"
              >
                {{ detail.is_income ? 'Ingreso' : 'Egreso' }}
              </td>
              <td class="text-center p-1">{{ detail.created }}</td>
              <td v-if="detail.invoice" class="text-center p-1">
                N°{{ detail.invoice_number }}<br />{{ detail.invoice_status }}
              </td>
              <td v-else class="text-center p-1">-</td>
              <td class="text-center p-1">{{ detail.description }}</td>
              <td class="text-center p-1">{{ detail.price }}</td>
              <td class="text-center p-1">{{ detail.quantity }}</td>
              <td class="text-center p-1">{{ detail.subtotal }}</td>
              <td class="text-center p-1">
                <div
                  :class="`badge badge-sm ${detail.status ? 'badge-success' : 'badge-error'} font-bold `"
                >
                  {{ detail.status ? 'ACTIVO' : 'ANULADO' }}
                </div>
              </td>
              <td class="text-center p-1">
                <button
                  :disabled="
                    detail.invoice_status === 'PAGADO' || !detail.status
                  "
                  class="btn btn-error btn-outline btn-xs"
                  @click="
                    () => {
                      const editedDetail = { ...detail }
                      selectedDetail = {
                        ...editedDetail,
                        status: false,
                      }
                      openDeleteModal = true
                    }
                  "
                >
                  Anular
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="overflow-x-auto overflow-y-hidden w-full">
          <ButtonPagination
            :has-more-data="!!details && details.length < 20"
            :page="page"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUsuarioStore } from '../store/usuario.store'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import {
  createUsuarioDetailAction,
  getUsuarioDetailAction,
  updateUsuarioDetailAction,
} from '../actions/get-usuario-detail.action'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import CustomModal from '@/modules/common/components/CustomModal.vue'
import ConfirmModal from '@/modules/common/components/ConfirmModal.vue'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import type { UsuarioDetail } from '../interfaces/usuario-detail.interface'

interface Props {
  usuarioId: string
}

const props = defineProps<Props>()
const route = useRoute()
const usuarioStore = useUsuarioStore()
const queryClient = useQueryClient()
const toast = useToast()
const selectedDetail = ref<UsuarioDetail>()
const loading = ref(false)
const opendModal = ref(false)
const openDeleteModal = ref(false)
const page = ref(route.query.page ? Number(route.query.page) : 1)
const pageSize = ref(20)
const defaultValues = {
  usuario: +props.usuarioId,
  description: null,
  price: null,
  quantity: null,
  is_income: 1,
}

const validationSchema = yup.object({
  description: yup.string().required(),
  price: yup.number().required(),
  quantity: yup.number().required(),
  is_income: yup.boolean().required(),
})

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema,
})

onMounted(() => {
  resetForm({
    values: { ...defaultValues },
  })
})

const [description, descriptionAttrs] = defineField('description')
const [price, priceAttrs] = defineField('price')
const [quantity, quantityAttrs] = defineField('quantity')
const [is_income, is_incomeAttrs] = defineField('is_income')

const onSubmit = handleSubmit(async values => {
  loading.value = true
  const { status } = await createUsuarioDetailAction(values)

  if (status !== 201) {
    toast.error('Error', {
      timeout: 2000,
    })
    return
  }
  toast.success('Detalle creado correctamente', {
    timeout: 2000,
  })
  resetForm({
    values: { ...defaultValues },
  })
  opendModal.value = false
  loading.value = false
  refetch()
})

const {
  data: details,
  isLoading,
  refetch,
} = useQuery({
  queryKey: [
    'usuario-detail',
    {
      page: page,
      page_size: pageSize,
      usuario: +props.usuarioId,
    },
  ],
  queryFn: () =>
    getUsuarioDetailAction(page.value, pageSize.value, +props.usuarioId),
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
      'usuario-detail',
      { page: page.value + 1, usuario: +props.usuarioId },
    ],
    queryFn: () =>
      getUsuarioDetailAction(page.value + 1, pageSize.value, +props.usuarioId),
  })
})

watch(
  () => props.usuarioId,
  () => {
    refetch()
  },
)

const updateDetail = async (detail: UsuarioDetail) => {
  loading.value = true
  const { status } = await updateUsuarioDetailAction(detail)

  if (status !== 200) {
    toast.error('Error de actualizacion', {
      timeout: 2000,
    })
    loading.value = false
    return
  }
  toast.success('Registro acutalizada correctamente', {
    timeout: 2000,
  })
  loading.value = false
  refetch()
}
</script>
