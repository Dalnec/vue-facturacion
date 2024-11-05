import { api } from '@/api/api'

export const changePasswordEmployeeAction = async (
  employeeId: number,
  password: string,
) => {
  try {
    const { status } = await api.put(
      `/employee/${employeeId}/change_password/`,
      { password },
    )

    // console.log(status)
    return status
  } catch (error) {
    console.log(error)
    throw new Error('Error getting employee')
  }
}
