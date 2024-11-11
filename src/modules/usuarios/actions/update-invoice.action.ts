import { api } from '@/api/api'
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import type { Invoice } from '../interfaces/invoice.interface'

const authStore = useAuthStore()
export const updateInvoiceAction = async (
  invoiceId: number,
  invoice: Partial<Invoice>,
) => {
  delete invoice.id
  invoice.employee = authStore.user?.employee_id
  try {
    const { data, status } = await api.put<Invoice>(
      `/invoice/${invoiceId}/`,
      invoice,
    )

    console.log({ data, status })
    return { data, status }
  } catch (error) {
    console.log(error)
    throw new Error('Error Updating Invoice')
  }
}
export const updateStatusInvoiceAction = async (invoiceId: number) => {
  try {
    const data = await api.put(`/invoice/${invoiceId}/change_status/`, {
      status: 'P',
    })

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error Updating Invoice')
  }
}
