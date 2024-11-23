import { api } from '@/api/api'
import type { Usuario } from '../interfaces/usuario.interface'
import { useAuthStore } from '../../auth/stores/auth.store'
import type { UsuarioDetail } from '../interfaces/usuario-detail.interface'

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
  usuario.employee = authStore.user?.employee_id
  try {
    const { data } = await api.put<Usuario>(`/usuario/${usuarioId}/`, usuario)

    // console.log(data)
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
  usuario.employee = authStore.user?.employee_id

  try {
    const { data } = await api.post<Usuario>(`/usuario/`, usuario)

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuario')
  }
}

export const updateUsuarioDetailRestartAction = async (
  usuarioId: number,
  detail: Partial<UsuarioDetail>,
) => {
  try {
    const { data, status } = await api.put<Usuario>(
      `/usuario/${usuarioId}/restart_measured/`,
      detail,
    )

    // console.log({ data, status })
    return { data, status }
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuario')
  }
}
