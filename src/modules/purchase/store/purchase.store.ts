import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { Purchase } from '../interfaces/purchase.interface'

export const usePurchaseStore = defineStore('purchase', () => {
  const selectedPurchaseId = ref<number>(0)
  const openPaymentModal = ref<boolean>(false)

  const selectedPurchase = ref(
    useLocalStorage<Purchase>('purchase', {} as Purchase),
  )

  const updateSelectedPurchase = (purchase: Purchase) => {
    selectedPurchase.value = purchase
    localStorage.setItem('purchase', JSON.stringify(purchase))
  }

  return {
    // Properties
    selectedPurchaseId,
    selectedPurchase,
    openPaymentModal,
    // Getters
    // Actions
    updateSelectedPurchase,
  }
})
