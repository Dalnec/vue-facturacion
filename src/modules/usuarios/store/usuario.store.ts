import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Usuario } from '../interfaces/usuario.interface'
import { useLocalStorage } from '@vueuse/core'

export const useUsuarioStore = defineStore('crudUsuario', () => {
  const selectedUsuarioId = ref<number>(0)
  // const selectedUsuario = ref<Usuario>({} as Usuario)
  const openPasswordModal = ref<boolean>(false)
  const openRestartModal = ref<boolean>(false)

  const selectedUsuario = ref(
    useLocalStorage<Usuario>('treatUsuario', {} as Usuario),
  )

  // funcion para actualizar el usuario seleccionado y localstorage
  const updateSelectedUsuario = (usuario: Usuario) => {
    selectedUsuario.value = usuario
    localStorage.setItem('treatUsuario', JSON.stringify(usuario))
  }

  return {
    // Properties
    selectedUsuarioId,
    selectedUsuario,
    openPasswordModal,
    openRestartModal,
    // Getters
    // Actions
    updateSelectedUsuario,
  }
})
