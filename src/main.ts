import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import './config/yup'

import 'vue-toastification/dist/index.css'
const pinia = createPinia()
const app = createApp(App)

app.use(VueQueryPlugin)
app.use(pinia)
app.use(router)
app.use(Toast)
app.mount('#app')
