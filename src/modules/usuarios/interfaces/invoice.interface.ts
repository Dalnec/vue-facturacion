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

/* Tipos */
type ActionType = 'update' | 'create' | 'delete'
export interface FieldChange {
  new: string | number | boolean | null
  old: string | number | boolean | null
}
export type ChangesMap = Record<string, FieldChange>

export interface HistoryItem {
  id: number
  created: string // 'YYYY-MM-DD HH:mm:ss'
  modified: string // 'YYYY-MM-DD HH:mm:ss'
  changed_at?: string // opcional
  changes?: ChangesMap
  action: ActionType
  invoice: number | string
  employee: number | string // puede venir nombre o id
}

export interface InvoiceHistoryResponse {
  count: number
  next: null
  previous: null
  results: HistoryItem[]
}
