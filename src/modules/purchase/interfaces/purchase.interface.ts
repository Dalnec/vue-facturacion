export interface PurchaseResponse {
  count: number
  next: null
  previous: null
  results: Purchase[]
}

export interface Purchase {
  id: number
  employee_name: string
  created: Date
  modified: Date
  purchased_date: string
  total: string
  liters: string
  active: boolean
  price: string
  observations: string
  employee: number
}

export class Convert {
  public static toPurchaseResponse(json: string): PurchaseResponse {
    return JSON.parse(json)
  }

  public static purchaseResponseToJson(value: PurchaseResponse): string {
    return JSON.stringify(value)
  }
}
