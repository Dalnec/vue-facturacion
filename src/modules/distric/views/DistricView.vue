<template>
  <div class="card glass w-full m-3">
    <div class="card-body px-6 pt-6 pb-0">
      <div class="flex justify-start items-center">
        <div>
          <h2 class="card-title text-primary font-bold">Barrio/OTB</h2>
          <p>Informacion del Barrio/OTB</p>
        </div>
        <!-- Boton de accion -->
      </div>

      <div class="flex justify-center w-full items-center">
        <div class="card bg-base-100 shadow-xl w-[60%]">
          <div class="card-body bg-white p-0 rounded-lg">
            <div
              v-if="isLoading"
              class="h-full w-full flex justify-center items-center"
            >
              <div class="flex flex-col justify-center items-center">
                <span class="loading loading-ring loading-lg"></span>
                <p>Cargando...</p>
              </div>
            </div>
            <form
              v-else
              class="grid grid-cols-1 px-5 gap-4 py-4 w-full"
              @submit.prevent="onSubmit()"
            >
              <div class="first-col">
                <div class="mb-4">
                  <label for="names" class="form-label">Nombre</label>
                  <CustomInput
                    v-model="name"
                    v-bind="nameAttrs"
                    :error="errors.name"
                  />
                </div>
                <div class="mb-4">
                  <label for="family" class="form-label">Familia</label>
                  <CustomInput
                    v-model="representative"
                    v-bind="representativeAttrs"
                    :error="errors.representative"
                  />
                </div>

                <div class="mb-4">
                  <label for="address" class="form-label">Direccion</label>
                  <CustomInput
                    v-model="address"
                    v-bind="addressAttrs"
                    :error="errors.address"
                  />
                </div>

                <div class="mb-4">
                  <label for="phone" class="form-label">Celular</label>
                  <CustomInput
                    v-model.number="phone"
                    v-bind="phoneAttrs"
                    :error="errors.phone"
                  />
                </div>

                <div class="mb-4">
                  <label for="email" class="form-label"
                    >Correo Electronico</label
                  >
                  <CustomInput
                    v-model="email"
                    v-bind="emailAttrs"
                    :error="errors.email"
                  />
                </div>
              </div>
              <button
                :disabled="isPending"
                class="btn btn-primary disabled:bg-gray-300"
                type="submit"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  getDistricByIdAction,
  updateDistricAction,
} from '../action/get-distric.action'
import { onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const validationSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  representative: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
})

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema,
})

const [name, nameAttrs] = defineField('name')
const [address, addressAttrs] = defineField('address')
const [representative, representativeAttrs] = defineField('representative')
const [phone, phoneAttrs] = defineField('phone')
const [email, emailAttrs] = defineField('email')

const {
  data: distric,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ['distric', 1],
  queryFn: () => getDistricByIdAction(1),
  retry: false,
})

onMounted(() => {
  if (!distric.value) return
  resetForm({ values: distric.value })
})

watch(distric, value => {
  if (!value) return
  resetForm({ values: distric.value })
})

const { mutate, isPending, isSuccess } = useMutation({
  mutationFn: updateDistricAction,
})

const onSubmit = handleSubmit(values => {
  mutate(values)
})

watch(isSuccess, value => {
  if (!value) return

  toast.success('Datos actualizadas correctamente', {
    timeout: 2000,
  })
  refetch()
})
</script>
