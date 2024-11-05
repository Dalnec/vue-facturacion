import { api } from '@/api/api'
import type { Settings } from '../interfaces/distric.interface'

export const getSettingsByIdAction = async (id: number) => {
  try {
    const { data } = await api.get<Settings>(`/distric/${id}/get_settings/`)

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting Settings')
  }
}

export const updateSettingsAction = async (settings: Partial<Settings>) => {
  try {
    const { data, status } = await api.put(
      `/distric/${settings.id}/update_settings/`,
      settings,
    )

    // console.log(data)
    return { data, status }
  } catch (error) {
    console.log(error)
    throw new Error('Error updating Settings')
  }
}
