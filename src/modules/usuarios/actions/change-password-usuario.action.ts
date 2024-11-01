import { api } from '@/api/api'

export const changePasswordUsuarioAction = async (
  usuarioId: number,
  password: string,
) => {
  try {
    const { status } = await api.put(`/usuario/${usuarioId}/change_password/`, {
      password,
    })

    // console.log(status)
    return status
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuario')
  }
}
