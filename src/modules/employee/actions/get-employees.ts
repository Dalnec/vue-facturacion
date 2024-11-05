import { api } from '@/api/api'
import type {
  Employee,
  EmployeeResponse,
} from '@/modules/employee/interfaces/employee.interface'

interface FilterParams {
  search: string | null
}
export const getEmployeesAction = async (
  page: number = 1,
  page_size: number = 20,
  params?: FilterParams,
) => {
  try {
    const { data } = await api.get<EmployeeResponse>(`/employee/`, {
      params: { page, page_size, ...params },
    })

    // console.log(data)
    return data.results
  } catch (error) {
    console.log(error)
    throw new Error('Error getting employee')
  }
}

export const getEmployeeByIdAction = async (employeeId: number) => {
  try {
    const { data } = await api.get<Employee>(`/employee/${employeeId}`)

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting employee')
  }
}
