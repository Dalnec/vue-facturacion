export interface UsuarioDetailResponse {
  count: number
  next: null
  previous: null
  results: UsuarioDetail[]
}

export interface UsuarioDetail {
  id: number
  invoice_number: number
  invoice_status: string
  created: Date
  modified: Date
  description: string
  price: string
  quantity: string
  subtotal: string
  is_income: boolean
  status: boolean
  usuario: number
  invoice: number
}

export class Convert {
  public static toUsuarioDetailResponse(json: string): UsuarioDetailResponse {
    return JSON.parse(json)
  }

  public static usuarioDetailResponseToJson(
    value: UsuarioDetailResponse,
  ): string {
    return JSON.stringify(value)
  }
}
