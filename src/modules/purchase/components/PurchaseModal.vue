<template>
  <div>
    <dialog class="modal" :open="open">
      <div class="modal-box">
        <span class="text-lg font-bold text-primary">
          {{ purchase.id ? 'Editar' : 'Registrar' }} Nueva Tarifa
        </span>
        <div class="modal-action flex flex-col bg-white rounded-lg">
          <form class="p-4" @submit.prevent="onSubmit()">
            <div class="first-col">
              <div class="mb-4">
                <label for="price" class="form-label">Precio</label>
                <CustomInput
                  v-model="price"
                  v-bind="priceAttrs"
                  :error="errors.price"
                  type="number"
                />
              </div>
              <div class="mb-4">
                <label for="observations" class="form-label">
                  Observaciones
                </label>
                <CustomTextArea
                  v-model="observations"
                  v-bind="observationsAttrs"
                  :error="errors.observations"
                  type="text"
                />
              </div>
              <div class="flex justify-end">
                <button
                  type="button"
                  class="btn mr-2"
                  @click="
                    () => {
                      emits('close')
                      resetForm({
                        values: {
                          id: null,
                          price: null,
                          observations: null,
                        },
                      })
                    }
                  "
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isLoading"
                >
                  Guardar
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
import { ref, watch } from 'vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import CustomInput from '@/modules/common/components/CustomInput.vue'
import { createUpdatePurchaseAction } from '../actions/createPurchase.action'
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue'

const toast = useToast()
const isLoading = ref(false)

interface PartialPurchase {
  id?: number | null
  price?: number | null
  observations?: string | null
}

interface Props {
  open: boolean
  purchase: PartialPurchase
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  purchase: () => ({
    id: null,
    price: null,
    observations: null,
  }),
})

watch(props, () => {
  resetForm({
    values: props.purchase,
  })
})

const emits = defineEmits<{
  close: [void]
  reload: [void]
}>()

const validationSchema = yup.object({
  price: yup.string().required().min(1),
  observations: yup.string().min(1).nullable(),
})

const { defineField, errors, handleSubmit, resetForm } = useForm({
  validationSchema,
})

const [price, priceAttrs] = defineField('price')
const [observations, observationsAttrs] = defineField('observations')

const onSubmit = handleSubmit(async values => {
  isLoading.value = true
  const { status } = await createUpdatePurchaseAction(values)
  setTimeout(() => {}, 1000)
  isLoading.value = false

  if (status != 200 && status != 201) {
    toast.error('Error de Accion', {
      timeout: 2000,
    })
    return
  }
  toast.success(
    `Tarifa ${status === 201 ? 'creada' : 'registrada'} correctamente`,
    {
      timeout: 2000,
    },
  )
  emits('reload')
  emits('close')
  resetForm({
    values: {
      id: null,
      price: null,
      observations: null,
    },
  })
})
</script>
