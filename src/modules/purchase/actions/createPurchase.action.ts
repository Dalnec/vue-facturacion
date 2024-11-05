import { api } from '@/api/api'
import { useAuthStore } from '../../auth/stores/auth.store'
import type { Purchase } from '../interfaces/purchase.interface'

const authStore = useAuthStore()
export const createUpdatePurchaseAction = async (
  purchase: Partial<Purchase>,
) => {
  if (purchase.id) {
    return await updatePurchaseAction(+purchase.id, purchase)
  } else {
    return await createPurchaseAction(purchase)
  }
}

const updatePurchaseAction = async (
  purchaseId: number,
  purchase: Partial<Purchase>,
) => {
  purchase.employee = authStore.user?.employee_id
  try {
    const { data, status } = await api.put<Purchase>(
      `/purchase/${purchaseId}/`,
      purchase,
    )

    // console.log(data)
    return { data, status }
  } catch (error) {
    console.log(error)
    throw new Error('Error getting Purchase')
  }
}

const createPurchaseAction = async (purchase: Partial<Purchase>) => {
  purchase.employee = authStore.user?.employee_id
  purchase.purchased_date = getCurrentFormattedDate()

  try {
    const { data, status } = await api.post<Purchase>(`/purchase/`, purchase)

    // console.log(data)
    return { data, status }
  } catch (error) {
    console.log(error)
    throw new Error('Error getting Purchase')
  }
}

function getCurrentFormattedDate() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
