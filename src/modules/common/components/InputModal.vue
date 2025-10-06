<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p v-show="subtitle" class="py-4">{{ subtitle }}</p>
      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder ?? 'Ingresar valor'"
            class="input input-bordered input-primary w-full flex-1"
            v-model="inputValue"
          />
          <div class="flex justify-end mt-5">
            <button class="btn mr-4" @click="emits('close')">Cerrar</button>
            <button class="btn btn-primary">Aceptar</button>
          </div>
        </form>
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
  value: [string]
}>()

const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(props, ({ open }) => {
  if (open) {
    inputValue.value = ''
    inputRef.value?.focus()
  }
})

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus()
    return
  }
  emits('value', inputValue.value.trim())
  emits('close')
  inputValue.value = ''
}
</script>

<style scoped></style>
