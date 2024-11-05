import { api } from '@/api/api'
import type { Distric } from '../interfaces/distric.interface'

export const getDistricByIdAction = async (id: number): Promise<Distric> => {
  try {
    const { data } = await api.get<Distric>(`/distric/${id}`)

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting Distric')
  }
}

export const updateDistricAction = async (distric: Partial<Distric>) => {
  try {
    const { data, status } = await api.put<Distric>(
      `/distric/${distric.id}/`,
      distric,
    )

    // console.log(data)
    return { data, status }
  } catch (error) {
    console.log(error)
    throw new Error('Error updating Distric')
  }
}
