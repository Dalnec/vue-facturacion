<template>
  <h1 class="text-2xl font-semibold mb-4">Iniciar Sesión</h1>
  <form @submit.prevent="onLogin">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="username" class="block text-gray-600">Usuario</label>
      <input
        v-model="myForm.username"
        ref="usernameInputRef"
        type="text"
        id="username"
        name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        v-model="myForm.password"
        ref="passwordInputRef"
        type="password"
        id="password"
        name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-primary hover:bg-info-content text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Ingresar
    </button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toastification'

const toast = useToast()
const authStore = useAuthStore()

const usernameInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)

const myForm = reactive({
  username: '',
  password: '',
})

const onLogin = async () => {
  if (myForm.username === '') {
    toast.warning('Usuario es obligatorio', {
      timeout: 2000,
    })
    return usernameInputRef.value?.focus()
  }

  if (myForm.password === '') {
    toast.warning('Contraseña es obligatoria', {
      timeout: 2000,
    })
    return passwordInputRef.value?.focus()
  }
  const success = await authStore.login(myForm.username, myForm.password)
  if (success) {
    return
  }
  toast.error('Credenciales incorrectas', {
    timeout: 2000,
  })
}
</script>
