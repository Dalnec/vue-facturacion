import { api } from '@/api/api'
import type { LoginResponse, User } from '../interfaces'
import { isAxiosError } from 'axios'

interface LoginError {
  success: false
  message: string
}

interface LoginSuccess {
  success: true
  user: User
  token: string
}

export const loginAction = async (
  username: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await api.post<LoginResponse>('/login/', {
      username,
      password,
    })

    return {
      success: true,
      user: data.user,
      token: data.token,
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return {
        success: false,
        message: 'Usuario o contraseña incorrectos',
      }
    }

    console.log(error)
    throw new Error('No se pudo realizar la petición')
  }
}
