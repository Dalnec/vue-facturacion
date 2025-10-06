<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-xl font-bold">{{ title }}</h3>
      <p v-show="subtitle" class="text-lg">{{ subtitle }}</p>
      <div class="modal-action flex flex-col">
        <div class="flex justify-end mt-5">
          <button class="btn mr-4" @click="emits('close')">Cerrar</button>
          <button ref="buttonRef" class="btn btn-primary" @click="submitValue">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </dialog>

  <div v-if="open" class="fixed inset-0 z-[50] bg-black/70"></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  open: boolean
  placeholder?: string
  title: string
  subtitle?: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  close: [void]
  confirm: [void]
}>()

const buttonRef = ref<HTMLInputElement | null>(null)

watch(props, ({ open }) => {
  if (open) {
    buttonRef.value?.focus()
  }
})

const submitValue = () => {
  emits('confirm')
  emits('close')
}
</script>

<style scoped></style>
