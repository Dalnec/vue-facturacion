<template>
  <div class="card glass w-full m-3">
    <div class="card-body px-6 pt-6 pb-0">
      <div class="flex justify-start items-center">
        <RouterLink to="/employee" class="btn btn-circle mr-4">
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
          <h2 class="card-title text-primary font-bold">Encargados</h2>
          <p>{{ values.id ? 'Edición' : 'Creación' }} de Encargados</p>
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
                  <label for="ci" class="form-label">Carnet de Identidad</label>
                  <CustomInput
                    v-model.number="ci"
                    v-bind="ciAttrs"
                    :error="errors.ci"
                  />
                </div>

                <div class="mb-4">
                  <label for="names" class="form-label">Nombre</label>
                  <CustomInput
                    v-model="names"
                    v-bind="namesAttrs"
                    :error="errors.names"
                  />
                </div>

                <div class="mb-4">
                  <label for="lastnames" class="form-label">Apellidos</label>
                  <CustomInput
                    v-model="lastnames"
                    v-bind="lastnamesAttrs"
                    :error="errors.lastnames"
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
                <!-- <input
                  v-model="names"
                  v-bind="namesAttrs"
                  type="text"
                  id="name"
                  :class="['form-control', { 'border-error': errors.name }]"
                />
                <span class="text-red-500" v-if="errors.name">{{
                  errors.name
                }}</span> -->

                <div class="flex flex-col mb-4 w-full">
                  <label for="stock" class="form-label w-full">Perfil</label>
                  <select
                    :class="[
                      'select select-bordered bg-white w-full',
                      { 'border-error': errors.profile },
                    ]"
                    v-model="profile"
                    v-bind="profileAttrs"
                  >
                    <option value="">Seleccione</option>
                    <option value="2">LECTURADOR</option>
                    <option value="1">ADMINISTRADOR</option>
                  </select>
                  <span class="text-red-500" v-if="errors.profile">
                    {{ errors.profile }}
                  </span>
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
import { watch } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { getEmployeeByIdAction } from '../actions/get-employees'
import { createUpdateEmployeeAction } from '../actions/create-update-employee.action'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const validationSchema = yup.object({
  address: yup.string().required(),
  ci: yup.string().required().min(7),
  names: yup.string().required(),
  lastnames: yup.string().required(),
  phone: yup.number().required(),
  email: yup.string().email(),
})

const router = useRouter()
const toast = useToast()
interface Props {
  employeeId: string
}

const props = defineProps<Props>()

const { data: employee, isLoading } = useQuery({
  queryKey: ['employee', +props.employeeId],
  queryFn: () => getEmployeeByIdAction(+props.employeeId),
  retry: false,
})

const { values, defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema,
})

const [ci, ciAttrs] = defineField('ci')
const [names, namesAttrs] = defineField('names')
const [lastnames, lastnamesAttrs] = defineField('lastnames')
const [address, addressAttrs] = defineField('address')
const [phone, phoneAttrs] = defineField('phone')
const [email, emailAttrs] = defineField('email')
const [profile, profileAttrs] = defineField('profile')

const {
  mutate,
  isPending,
  isSuccess,
  data: updatedEmployee,
} = useMutation({
  mutationFn: createUpdateEmployeeAction,
})

const onSubmit = handleSubmit(values => {
  console.log(values)
  mutate(values)
})

// watchEffect(() => {
//   console.log('isError.value', isError.value)

//   if (isError.value && !isLoading.value) {
//     router.replace('/employee')
//     return
//   }
// })

watch(
  employee,
  () => {
    if (!employee) return
    console.log('watch-employee', employee.value)

    resetForm({
      values: employee.value,
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

watch(isSuccess, value => {
  if (!value) return

  toast.success(
    `Encargado ${values.id ? 'Actualizado' : 'Creado'} correctamente`,
    {
      timeout: 2000,
    },
  )
  setTimeout(() => {}, 500)
  router.replace(`/employee/form/${updatedEmployee.value!.id}`)

  resetForm({
    values: updatedEmployee.value,
  })
})
</script>
