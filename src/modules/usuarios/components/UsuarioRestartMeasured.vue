<template>
  <div>
    <dialog class="modal" :open="open">
      <div v-if="!usarioStore.selectedUsuario.restart" class="modal-box">
        <span class="text-lg font-bold text-primary">
          Reiniciar Valor Medidor
        </span>
        <br />
        <span>
          En caso de haber una lectura pendiente, se deberá registrar la lectura
          pendiente.
        </span>
        <div class="modal-action flex flex-col bg-white rounded-lg p-0 mt-1">
          <form class="px-4 py-2" @submit.prevent="onSubmit()">
            <div class="first-col">
              <div class="mb-4">
                <label for="newpassword" class="form-label"> Lectura </label>
                <CustomInput
                  v-model="quantity"
                  v-bind="quantityAttrs"
                  :error="errors.quantity"
                  type="number"
                />
              </div>
              <div class="flex justify-end">
                <button
                  class="btn mr-2"
                  @click.prevent="
                    () => {
                      emits('close')
                      resetForm({
                        values: { quantity: 0 },
                      })
                    }
                  "
                >
                  Cancelar
                </button>
                <button class="btn btn-primary" :disabled="isLoading">
                  Reiniciar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-else class="modal-box">
        <span class="text-lg font-bold text-primary"> Revertir Reinicio </span>
        <br />
        <span> No reiniciar el valor del medidor en la siguiente lectura </span>
        <div class="modal-action flex flex-col rounded-lg p-0 mt-1">
          <form class="px-4 py-2" @submit.prevent="onSubmit()">
            <div class="first-col">
              <div class="flex justify-end">
                <button
                  class="btn mr-2"
                  @click.prevent="
                    () => {
                      emits('close')
                      resetForm({
                        values: { quantity: 0 },
                      })
                    }
                  "
                >
                  Cancelar
                </button>
                <button class="btn btn-primary" :disabled="isLoading">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  </div>
  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-0 bg-black opacity-30 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUsuarioStore } from '../store/usuario.store'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import type { UsuarioDetail } from '../interfaces/usuario-detail.interface'
import {
  createUpdateUsuarioAction,
  updateUsuarioDetailRestartAction,
} from '../actions'

const usarioStore = useUsuarioStore()
const toast = useToast()
const isLoading = ref(false)

onMounted(() => {
  resetForm({
    values: { quantity: 0 },
  })
})
interface Props {
  open: boolean
}

withDefaults(defineProps<Props>(), {
  open: false,
})

const emits = defineEmits<{
  close: [void]
  reload: [void]
}>()

const validationSchema = yup.object({
  quantity: yup.string(),
})

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema,
})

const [quantity, quantityAttrs] = defineField('quantity')

const onSubmit = handleSubmit(async values => {
  isLoading.value = true
  const detail: Partial<UsuarioDetail> = {
    usuario: usarioStore.selectedUsuario.id,
    description: 'Lectura Anterior al Reinicio del Medidor',
    price: '0',
    quantity: values.quantity,
    is_income: true,
  }

  if (!usarioStore.selectedUsuario.restart) {
    const { status } = await updateUsuarioDetailRestartAction(
      detail.usuario!,
      detail,
    )
    setTimeout(() => {}, 1000)
    isLoading.value = false

    if (status != 200) {
      toast.error('Error de Reinicio, Revise el valor de lectura', {
        timeout: 3000,
      })
      return
    }
    toast.success('Reinicio realizado correctamente', {
      timeout: 2000,
    })
  } else {
    const usuario = { ...usarioStore.selectedUsuario }
    usuario.restart = false
    const resp = await createUpdateUsuarioAction(usuario)
    setTimeout(() => {}, 1000)
    isLoading.value = false

    if (!resp) {
      toast.error('Error de actualizacion', {
        timeout: 2000,
      })
      return
    }
    toast.success('Actualizacion correcta!', {
      timeout: 2000,
    })
  }

  emits('close')
  emits('reload')
  resetForm({
    values: { quantity: 0 },
  })
})
</script>
