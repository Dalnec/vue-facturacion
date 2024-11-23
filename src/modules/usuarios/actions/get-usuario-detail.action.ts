import { api } from '@/api/api'
import type {
  UsuarioDetail,
  UsuarioDetailResponse,
} from '../interfaces/usuario-detail.interface'

export const getUsuarioDetailAction = async (
  page: number = 1,
  page_size: number = 20,
  usuario: number,
) => {
  try {
    const { data } = await api.get<UsuarioDetailResponse>(`/usuariodetail/`, {
      params: { page, page_size, usuario },
    })

    // console.log('api invoices', data)
    return data.results
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}

export const createUsuarioDetailAction = async (
  detail: Partial<UsuarioDetail>,
) => {
  try {
    const { data, status } = await api.post<UsuarioDetail>(
      `/usuariodetail/`,
      detail,
    )

    return { data, status }
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}

export const updateUsuarioDetailAction = async (detail: UsuarioDetail) => {
  try {
    const { data, status } = await api.put<UsuarioDetail>(
      `/usuariodetail/${detail.id}/`,
      detail,
    )

    return { data, status }
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}
