export interface InvoiceResponse {
  count: number
  next: null
  previous: null
  results: Invoice[]
}

export interface Invoice {
  id?: number
  uuid?: string
  period: string
  ticket: string
  created?: Date
  modified?: Date
  read_date: Date
  measured: string
  price: string
  total: string
  status: string
  observations: null | string
  usuario: number
  employee: number
  employeeName?: string
  previosMeasured?: string
}

export class Convert {
  public static toInvoiceResponse(json: string): InvoiceResponse {
    return JSON.parse(json)
  }

  public static invoiceResponseToJson(value: InvoiceResponse): string {
    return JSON.stringify(value)
  }
}
