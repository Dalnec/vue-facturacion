<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
        @click="emit('close')"
      >
        ✕
      </button>
      <div class="border-b border-gray-300">
        <slot name="header" />
      </div>

      <div class="my-5">
        <slot name="body" />
      </div>

      <div class="flex justify-end">
        <slot name="actions" />
      </div>
    </div>
  </dialog>
  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-0 bg-black opacity-30 w-screen h-screen"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  open: boolean
}

withDefaults(defineProps<Props>(), {
  open: false,
  title: undefined,
})

const emit = defineEmits<{
  close: [void]
}>()
</script>

<style scoped></style>
