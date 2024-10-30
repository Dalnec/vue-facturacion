<template>
  <button
    @click="$emit('click')"
    :class="['btn btn-circle btn-secondary fixed', position]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
})

defineEmits(['click'])
</script>

<style scoped>
.top-right {
  @apply top-10 right-10;
}
.top-left {
  @apply top-10 left-10;
}
.bottom-right {
  @apply bottom-10 right-10;
}
.bottom-left {
  @apply bottom-10 left-10;
}
</style>
