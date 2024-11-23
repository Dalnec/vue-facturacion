export interface UsuarioResponse {
  count: number
  next: string
  previous: null
  results: Usuario[]
}

export interface Usuario {
  id: number
  hasDebt: boolean
  makeInvoice: boolean
  restart: boolean
  created: Date
  modified: Date
  ci: string
  names: string
  lastnames: string
  gender: string
  phone: string
  email: string
  family: string
  address: string
  status: string
  user: number
  employee: number
  username?: string
  password?: string
  code?: string
  last_measured?: number
}
