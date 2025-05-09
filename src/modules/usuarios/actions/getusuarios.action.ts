import { api } from '@/api/api'
import type { UsuarioResponse } from '../interfaces/usuario.interface'

interface FilterParams {
  search: string | null
  hasDebt: boolean | null
  makeInvoice: boolean | null
}
export const getUsuariosAction = async (
  page: number = 1,
  page_size: number = 20,
  params?: FilterParams,
) => {
  try {
    const { data } = await api.get<UsuarioResponse>(`/usuario/`, {
      params: { page, page_size, ...params },
    })

    // console.log(data)
    return data.results
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}
