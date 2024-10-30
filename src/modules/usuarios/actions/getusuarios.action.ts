import { api } from '@/api/api'
import type { UsuarioResponse } from '../interfaces/usuario.interface'

export const getUsuariosAction = async (
  page: number = 1,
  page_size: number = 20,
) => {
  try {
    const { data } = await api.get<UsuarioResponse>(`/usuario/`, {
      params: { page, page_size },
    })

    // console.log(data)
    return data.results
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}
