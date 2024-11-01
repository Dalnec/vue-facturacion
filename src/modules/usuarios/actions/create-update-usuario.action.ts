import { api } from '@/api/api'
import type { Usuario } from '../interfaces/usuario.interface'
import { useAuthStore } from '../../auth/stores/auth.store'

const authStore = useAuthStore()
export const createUpdateUsuarioAction = async (usuario: Partial<Usuario>) => {
  if (usuario.id) {
    return await updateUsuarioAction(+usuario.id, usuario)
  } else {
    return await createUsuarioAction(usuario)
  }
}

const updateUsuarioAction = async (
  usuarioId: number,
  usuario: Partial<Usuario>,
) => {
  delete usuario.id
  delete usuario.hasDebt
  delete usuario.makeInvoice
  delete usuario.created
  delete usuario.modified
  delete usuario.user
  delete usuario.username
  delete usuario.password
  // delete usuario.status
  usuario.employee = authStore.user?.user_id
  try {
    const { data } = await api.put<Usuario>(`/usuario/${usuarioId}/`, usuario)

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuario')
  }
}

const createUsuarioAction = async (usuario: Partial<Usuario>) => {
  delete usuario.id
  delete usuario.hasDebt
  delete usuario.makeInvoice
  delete usuario.created
  delete usuario.modified
  delete usuario.user
  delete usuario.status
  usuario.username = usuario.ci
  usuario.password = usuario.ci
  usuario.employee = authStore.user?.user_id

  try {
    const { data } = await api.post<Usuario>(`/usuario/`, usuario)

    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuario')
  }
}
