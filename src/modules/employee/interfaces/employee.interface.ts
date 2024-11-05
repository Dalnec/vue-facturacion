export interface EmployeeResponse {
  count: number
  next: null
  previous: null
  results: Employee[]
}

export interface Employee {
  id: number
  username: string
  password?: string
  profile: number
  profile_description: string
  created: Date
  modified: Date
  ci: string
  names: string
  lastnames: string
  email: string
  phone: string
  address: string
  status: string
  user: number
  employee: number | null
}
