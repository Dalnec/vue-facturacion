<template>
  <div>
    <input
      :type="type"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value ?? '',
        )
      "
      @blur="$emit('blur')"
      :class="['form-control', { 'border-error': error }]"
    />
    <span class="text-red-500" v-if="error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  error?: string
  type?: 'text' | 'number' | 'password'
}

withDefaults(defineProps<Props>(), {
  type: 'text',
})

defineEmits(['update:modelValue', 'blur'])
</script>
<style scoped>
.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
