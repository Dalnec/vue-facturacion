import { api } from '@/api/api'
import { useAuthStore } from '../../auth/stores/auth.store'
import type { Employee } from '../interfaces/employee.interface'

const authStore = useAuthStore()
export const createUpdateEmployeeAction = async (
  employee: Partial<Employee>,
) => {
  if (employee.id) {
    return await updateEmployeeAction(+employee.id, employee)
  } else {
    return await createEmployeeAction(employee)
  }
}

const updateEmployeeAction = async (
  employeeId: number,
  employee: Partial<Employee>,
) => {
  delete employee.id
  delete employee.created
  delete employee.modified
  delete employee.user
  employee.employee = authStore.user?.employee_id
  try {
    const { data } = await api.put<Employee>(
      `/employee/${employeeId}/`,
      employee,
    )

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting Employee')
  }
}

const createEmployeeAction = async (employee: Partial<Employee>) => {
  delete employee.id
  delete employee.created
  delete employee.modified
  delete employee.user
  employee.username = employee.ci
  employee.password = employee.ci
  employee.employee = authStore.user?.employee_id

  try {
    const { data } = await api.post<Employee>(`/employee/`, employee)

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Error getting Employee')
  }
}

export const updateEmployeeStatusAction = async (
  employeeId: number,
  newStatus: string,
) => {
  try {
    const { data, status } = await api.put<Employee>(
      `/employee/${employeeId}/change_status/`,
      { status: newStatus },
    )

    // console.log(data)
    return { data, status }
  } catch (error) {
    console.log(error)
    throw new Error('Error getting Employee')
  }
}
