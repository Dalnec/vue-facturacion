import { api } from '@/api/api'
import { type LoginResponse, type User } from '../interfaces'
import { isAxiosError } from 'axios'

interface CheckError {
  success: false
}

interface CheckSuccess {
  success: true
  user: User
  token: string
}

export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const localToken = localStorage.getItem('token')
    if (!localToken) return { success: false }
    const { data } = await api.get<LoginResponse>('/user/auth_check/')
    console.log('ACTION')

    return {
      success: true,
      user: data.user,
      token: data.token,
    }
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.response?.status === 401) {
      return { success: false }
    }
    throw new Error('No se pudo verificar la sesión')
  }
}
