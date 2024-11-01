import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Invoice } from '../interfaces/invoice.interface'
import { useLocalStorage } from '@vueuse/core'

export const useInvoiceStore = defineStore('invoice', () => {
  const selectedInvoiceId = ref<number>(0)
  const openPaymentModal = ref<boolean>(false)

  const selectedInvoice = ref(
    useLocalStorage<Invoice>('invoice', {} as Invoice),
  )

  const updateSelectedUsuario = (invoice: Invoice) => {
    selectedInvoice.value = invoice
    localStorage.setItem('invoice', JSON.stringify(invoice))
  }

  return {
    // Properties
    selectedInvoiceId,
    selectedInvoice,
    openPaymentModal,
    // Getters
    // Actions
    updateSelectedUsuario,
  }
})
