import { api } from '@/api/api'
import type { Usuario } from '../interfaces/usuario.interface'

export const getUsuarioByIdAction = async (id: number): Promise<Usuario> => {
  console.log({ id })
  if (isNaN(id)) {
    return {
      id: 0,
      hasDebt: false,
      makeInvoice: false,
      created: new Date(),
      modified: new Date(),
      ci: '',
      names: '',
      lastnames: '',
      gender: '',
      phone: '',
      email: '',
      family: '',
      address: '',
      status: '',
      user: 0,
      employee: 0,
      username: '',
      password: '',
    }
  }

  try {
    const { data } = await api.get<Usuario>(`/usuario/${id}`)

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuario')
  }
}
