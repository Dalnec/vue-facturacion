import { api } from '@/api/api'
import type {
  Monitoring,
  MonitoringResponse,
} from '../interfaces/monitoring.interface'

interface FilterParams {
  read_date_range_after: string
  read_date_range_before: string
}
export const getMonitoringsAction = async (
  page: number = 1,
  page_size: number = 20,
  params?: FilterParams,
) => {
  try {
    const { data } = await api.get<MonitoringResponse>(`/monitoring/`, {
      params: { page, page_size, ordering: '-id', ...params },
    })

    // console.log(data)
    return data.results
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}

export const getMonitoringsNoPageAction = async (params?: FilterParams) => {
  console.log({ nopage: params })
  try {
    const { data } = await api.get<Monitoring[]>(
      `/monitoring/get_monitorings/`,
      {
        params: { ordering: '-id', ...params },
      },
    )

    // console.log({ nopage: data })
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}

export const getLastMonitoringAction = async () => {
  try {
    const { data } = await api.get<Monitoring>(`/monitoring/get_last/`)

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting usuarios')
  }
}
