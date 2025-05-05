<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p v-show="subtitle" class="">{{ subtitle }}</p>
      <div v-if="isLoading" class="modal-action flex flex-col">Cargando...</div>
      <div v-else class="modal-action flex flex-col">
        <form class="p-2 grid grid-cols-1 gap-2 items-center">
          <div class="grid grid-cols-4 gap-4 items-center">
            <div class="col-span-2">
              <label class="form-label p-0 m-0" for="">
                Campo Carnet de Identidad Obligatorio:
              </label>
            </div>
            <div class="col-span-2">
              <input
                type="checkbox"
                class="toggle toggle-info"
                v-model="inputValue!.force_ci"
              />
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4 items-center">
            <div class="col-span-2">
              <label class="form-label p-0 m-0" for="">
                Autogenerar Mora:
              </label>
            </div>
            <div class="col-span-2">
              <input
                type="checkbox"
                class="toggle toggle-info"
                v-model="inputValue!.auto_penalty"
              />
            </div>
          </div>
          <div>
            <label class="form-label p-0 m-0" for=""> Monto de Mora: </label>
            <input
              ref="inputRef"
              type="text"
              :placeholder="placeholder ?? 'Ingresar valor'"
              class="input input-bordered input-primary w-full flex-1 mb-2"
              v-model.number="inputValue!.penalty_amount"
              :disabled="edit"
            />
          </div>
          <div class="grid grid-cols-4 gap-4 items-center">
            <div class="col-span-2">
              <label class="form-label p-0 m-0" for="">
                Cobrar Mes Anterior:
              </label>
            </div>
            <div class="col-span-2">
              <input
                type="checkbox"
                class="toggle toggle-info"
                v-model="inputValue!.collect_previous_month"
              />
            </div>
          </div>
          <div class="flex justify-end mt-5">
            <!-- {{ inputValue }} -->
            <button
              class="btn mr-4"
              @click.prevent="
                () => {
                  edit = true
                  emits('close')
                }
              "
            >
              Cerrar
            </button>
            <button
              class="btn btn-primary"
              @click.prevent="
                () => {
                  if (!edit) {
                    submitValue()
                    edit = true
                  } else {
                    edit = false
                  }
                }
              "
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-0 bg-black opacity-70 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
import {
  getSettingsByIdAction,
  updateSettingsAction,
} from '@/modules/distric/action/get-settings.action'
import type { Settings } from '@/modules/distric/interfaces/distric.interface'
import { useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

const edit = ref(true)
const toast = useToast()
interface Props {
  open: boolean
  placeholder?: string
  title: string
  subtitle?: string
}

defineProps<Props>()

const emits = defineEmits<{
  close: [void]
}>()

const inputValue = ref<Settings>()

const inputRef = ref<HTMLInputElement | null>(null)

const { data: settings, isLoading } = useQuery({
  queryKey: [
    'settings',
    {
      id: 1,
    },
  ],
  queryFn: () => getSettingsByIdAction(1),
})

watch(
  settings,
  () => {
    if (!settings) return

    inputValue.value = {
      ...settings.value,
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

const submitValue = async () => {
  if (!inputValue.value!.interval_time_device) {
    inputRef.value?.focus()
    return
  }
  const resp = await updateSettingsAction({
    id: 1,
    interval_time_device: inputValue.value!.interval_time_device,
    height: inputValue.value!.height,
    width: inputValue.value!.width,
    length: inputValue.value!.length,
    force_ci: inputValue.value!.force_ci,
    auto_penalty: inputValue.value!.auto_penalty,
    penalty_amount: inputValue.value!.penalty_amount,
    collect_previous_month: inputValue.value!.collect_previous_month,
  })
  if (resp.status !== 200) {
    toast.error('Error al actualizar', {
      timeout: 2000,
    })
    return
  }

  toast.success('Configuración actualizada correctamente', {
    timeout: 2000,
  })
  emits('close')
}
</script>
