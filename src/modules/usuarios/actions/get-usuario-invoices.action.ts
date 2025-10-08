import { api } from '@/api/api'
import type { InvoiceResponse } from '../interfaces/invoice.interface'
interface FilterParams {
  search: string | null
  hasDebt: boolean | null
  makeInvoice: boolean | null
}
export const getInvoicesAction = async (
  page: number = 1,
  page_size: number = 20,
  usuario: number,
  params?: FilterParams,
) => {
  try {
    const { data } = await api.get<InvoiceResponse>(`/invoice/`, {
      params: { page, page_size, usuario, ordering: '-id', ...params },
    })

    // console.log('api invoices', data)
    return data.results
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}

export const getInvoiceHistoryAction = async (id: number) => {
  try {
    const { data } = await api.get<InvoiceResponse>(`/invoice/${id}/history/`)

    // console.log('api historyinvoices', data)
    return data.results
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}
