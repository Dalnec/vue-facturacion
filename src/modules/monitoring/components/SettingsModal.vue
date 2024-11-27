<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p v-show="subtitle" class="">{{ subtitle }}</p>
      <div v-if="isLoading" class="modal-action flex flex-col">Cargando...</div>
      <div v-else class="modal-action flex flex-col">
        <form>
          <label class="form-label p-0 m-0" for="">Intervalo de Tiempo:</label>
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder ?? 'Ingresar valor'"
            class="input input-bordered input-primary w-full flex-1 mb-2"
            v-model.number="inputValue!.interval_time_device"
            :disabled="edit"
          />
          <label class="form-label p-0 m-0" for="">Altura del Tanque:</label>
          <input
            type="text"
            :placeholder="placeholder ?? 'Ingresar valor'"
            class="input input-bordered input-primary w-full flex-1 mb-2"
            v-model.number="inputValue!.height"
            :disabled="edit"
          />
          <label class="form-label p-0 m-0" for="">Ancho del Tanque:</label>
          <input
            type="text"
            :placeholder="placeholder ?? 'Ingresar valor'"
            class="input input-bordered input-primary w-full flex-1 mb-2"
            v-model.number="inputValue!.width"
            :disabled="edit"
          />
          <label class="form-label p-0 m-0" for="">Longitud del Tanque:</label>
          <input
            type="text"
            :placeholder="placeholder ?? 'Ingresar valor'"
            class="input input-bordered input-primary w-full flex-1 mb-2"
            v-model.number="inputValue!.length"
            :disabled="edit"
          />
          <div class="flex justify-end mt-5">
            {{ inputValue }}
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

// Computed property to handle the interval in minutes
// const intervalInMinutes = computed({
//   get: () => (inputValue.value?.interval_time_device ?? 0) / 60000, // Convert ms to minutes
//   set: (value: number) => {
//     if (inputValue.value) {
//       inputValue.value.interval_time_device = value * 60000 // Convert minutes back to ms
//     }
//   },
// })

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
