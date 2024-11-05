import { api } from '@/api/api'
import type {
  Purchase,
  PurchaseResponse,
} from '../interfaces/purchase.interface'

interface FilterParams {
  purchased_date_range_after: string
  purchased_date_range_before: string
}
export const getPurchasesAction = async (
  page: number = 1,
  page_size: number = 20,
  params?: FilterParams,
) => {
  try {
    const { data } = await api.get<PurchaseResponse>(`/purchase/`, {
      params: { page, page_size, ordering: '-id', ...params },
    })

    // console.log(data)
    return data.results
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}

export const getPurchasesNoPageAction = async (params?: FilterParams) => {
  try {
    const { data } = await api.get<Purchase[]>(`/purchase/get_purchases/`, {
      params: { ordering: '-id', ...params },
    })

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}
