<template>
  <EmployeeChangePasswordModal
    :open="openModalPassword"
    :employee="selectedEmployee"
    @close="() => (openModalPassword = false)"
  />

  <ConfirmModal
    :open="openConfirmModal"
    title="Confirmar Acción"
    :subtitle="`¿Desea Realizar la Accion con ${selectedEmployee.names}?`"
    @close="
      () => {
        openConfirmModal = false
      }
    "
    @confirm="
      () => {
        disableEmployee(
          selectedEmployee.id,
          selectedEmployee.status === 'A' ? 'I' : 'A',
        )
        openConfirmModal = false
      }
    "
  />

  <div class="card glass w-full m-3">
    <div class="card-body px-6 pt-6 pb-0">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title text-primary font-bold">Encargados</h2>
          <p>Control de Encargados, crear y editar</p>
        </div>
        <div class="">
          <RouterLink to="/employee/form/create" class="btn btn-primary">
            <AddUsuariosIcon />
            Nuevo
          </RouterLink>
        </div>
      </div>
      <div>
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
          <div class="rounded-xl">
            <button class="btn btn-secondary">Buscar</button>
          </div>
        </div>
      </div>
      <div
        v-if="isLoading"
        class="h-screen w-screen flex justify-center items-center"
      >
        <div class="flex flex-col justify-center items-center">
          <span class="loading loading-ring loading-lg"></span>
          <p>Cargando...</p>
        </div>
      </div>
      <div v-else>
        <table class="table">
          <thead>
            <tr class="text-sm">
              <th class="text-center p-1 w-[5%]"></th>
              <th class="text-center p-1 w-[12%]">Encargado</th>
              <th class="text-center p-1 w-[5%]">Celular</th>
              <th class="text-center p-1 w-[10%]">Dirección</th>
              <th class="text-center p-1 w-[10%]">Correo</th>
              <th class="text-center p-1 w-[5%]">Estado</th>
              <th class="text-center p-1 w-[10%]">Perfil</th>
              <th class="text-center p-1 w-[5%]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(employee, index) in employees"
              :key="employee.id"
              :class="`hover ${(index + 1) % 2 === 0 ? 'bg-gray-200' : ''}`"
            >
              <th class="text-center p-1">
                {{ (page - 1) * pageSize + index + 1 }}
              </th>
              <td class="text-start p-1">
                <p>{{ employee.ci }}</p>
                {{ employee.names }} {{ employee.lastnames }}
              </td>
              <td class="text-center p-1">
                {{ employee.phone }}
              </td>
              <td class="text-start p-1">
                {{ employee.address }}
              </td>
              <td class="text-center p-1">
                {{ employee.email }}
              </td>
              <td class="text-center p-1">
                <div
                  :class="`badge badge-sm ${employee.status === 'A' ? 'badge-success' : 'badge-warning'} font-bold`"
                >
                  {{ employee.status === 'A' ? 'ACTIVO' : 'INACTIVO' }}
                </div>
              </td>
              <td class="text-center p-1">
                {{ employee.profile_description }}
              </td>
              <td class="text-center p-1">
                <div class="dropdown dropdown-end">
                  <div
                    tabindex="0"
                    role="button"
                    class="btn btn-circle btn-ghost btn-sm text-info"
                  >
                    <MenuDotsIcon />
                  </div>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu bg-base-100 rounded-box z-[1] w-45 p-2 shadow"
                  >
                    <li>
                      <RouterLink :to="`/employee/form/${employee.id}`">
                        Editar
                      </RouterLink>
                    </li>
                    <li>
                      <a
                        @click="
                          () => {
                            selectedEmployee = employee
                            openConfirmModal = true
                          }
                        "
                      >
                        {{ employee.status === 'A' ? 'Inactivar' : 'Activar' }}
                      </a>
                    </li>
                    <li>
                      <a
                        @click="
                          () => {
                            selectedEmployee = employee
                            openModalPassword = true
                          }
                        "
                      >
                        Contraseña
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="overflow-x-auto overflow-y-hidden w-full">
        <ButtonPagination
          :has-more-data="!!employees && employees.length < 20"
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
import AddUsuariosIcon from '@/modules/common/icons/AddUsuariosIcon.vue'
import ButtonPagination from '@/modules/common/components/ButtonPagination.vue'
import { getEmployeesAction } from '../actions/get-employees'
import EmployeeChangePasswordModal from '../components/EmployeeChangePasswordModal.vue'
import MenuDotsIcon from '@/modules/common/icons/MenuDotsIcon.vue'
import ConfirmModal from '@/modules/common/components/ConfirmModal.vue'
import { updateEmployeeStatusAction } from '../actions/create-update-employee.action'
import { useToast } from 'vue-toastification'

const route = useRoute()
const toast = useToast()
const openModalPassword = ref(false)
const openConfirmModal = ref(false)

const page = ref(route.query.page ? Number(route.query.page) : 1)
const pageSize = ref(20)
const selectedEmployee = ref({})

const queryClient = useQueryClient()
const filterParams = ref({
  search: '',
})

const {
  data: employees,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ['employees', { page: page, page_size: pageSize, filterParams }],
  queryFn: () =>
    getEmployeesAction(page.value, pageSize.value, filterParams.value),
})

watch(
  () => route.query.page,
  newPage => {
    page.value = Number(newPage || 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

//   watch(
//     () => usuarioStore.openPasswordModal,
//     newModal => (openModal.value = newModal),
//   )

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: [
      'employees',
      { page: page.value + 1, page_size: pageSize, filterParams },
    ],
    queryFn: () =>
      getEmployeesAction(page.value + 1, pageSize.value, filterParams.value),
  })
})

const disableEmployee = async (employeeId: number, newStatus: string) => {
  const { status } = await updateEmployeeStatusAction(employeeId, newStatus)

  if (status !== 200) {
    toast.error('Error al actualizar estado', {
      timeout: 2000,
    })
    return
  }
  toast.success('Estado actualizado correctamente', {
    timeout: 2000,
  })
  refetch()
}
</script>
