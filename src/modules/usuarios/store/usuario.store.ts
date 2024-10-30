import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsuarioStore = defineStore('crudUsuario', () => {
  const selectedUsuarioId = ref<number>(0)

  return {
    // Properties
    selectedUsuarioId,

    // Getters
    // Actions
  }
})
