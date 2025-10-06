<template>
  <div>
    <dialog class="modal" :open="open">
      <div class="modal-box">
        <span class="text-lg font-bold text-primary">Cambiar Contraseña</span>
        <div class="modal-action flex flex-col bg-white rounded-lg">
          <form class="p-4" @submit.prevent="onSubmit()">
            <div class="first-col">
              <div class="mb-4">
                <label for="newpassword" class="form-label">
                  Nueva Contraseña
                </label>
                <CustomInput
                  v-model="newpassword"
                  v-bind="newpasswordAttrs"
                  :error="errors.newpassword"
                  type="password"
                />
              </div>
              <div class="mb-4">
                <label for="newpassword2" class="form-label">
                  Repetir Nueva Contraseña
                </label>
                <CustomInput
                  v-model="newpassword2"
                  v-bind="newpassword2Attrs"
                  :error="errors.newpassword2"
                  type="password"
                />
              </div>
              <div class="flex justify-end">
                <button
                  class="btn mr-2"
                  @click="
                    () => {
                      emits('close')
                      resetForm({
                        values: {
                          newpassword: '',
                          newpassword2: '',
                        },
                      })
                    }
                  "
                >
                  Cancelar
                </button>
                <button class="btn btn-primary" :disabled="isLoading">
                  Cambiar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  </div>
  <div v-if="open" class="fixed inset-0 z-[50] bg-black/70"></div>
</template>

<script setup lang="ts">
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { changePasswordUsuarioAction } from '../actions'
import { useUsuarioStore } from '../store/usuario.store'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const usarioStore = useUsuarioStore()
const toast = useToast()
const isLoading = ref(false)

interface Props {
  open: boolean
}

withDefaults(defineProps<Props>(), {
  open: false,
})

const emits = defineEmits<{
  close: [void]
}>()

const validationSchema = yup.object({
  newpassword: yup.string().required().min(4),
  newpassword2: yup.string().required().min(4),
})

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema,
})

const [newpassword, newpasswordAttrs] = defineField('newpassword')
const [newpassword2, newpassword2Attrs] = defineField('newpassword2')

const onSubmit = handleSubmit(async values => {
  if (values.newpassword !== values.newpassword2) {
    toast.error('Las contraseñas no coinciden', {
      timeout: 2000,
    })
    return
  }
  isLoading.value = true
  const response = await changePasswordUsuarioAction(
    usarioStore.selectedUsuario.id,
    values.newpassword,
  )
  setTimeout(() => {}, 1000)
  isLoading.value = false

  if (response != 201) {
    toast.error('Error de actualización', {
      timeout: 2000,
    })
    return
  }
  toast.success('Contraseña actualizada correctamente', {
    timeout: 2000,
  })
  emits('close')
  resetForm({
    values: {
      newpassword: '',
      newpassword2: '',
    },
  })
})
</script>
