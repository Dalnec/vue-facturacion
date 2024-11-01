export interface Ticket {
  header: Header
  body: Body
}

export interface Body {
  previous_reading: string
  actual_reading: string
  price: string
  total: string
  previous_month: string
  actual_month: string
  consumed: string
}

export interface Header {
  number: string
  emission_date: string
  medidor: string
  full_name: string
  address: string
}

export class Convert {
  public static toTicket(json: string): Ticket {
    return JSON.parse(json)
  }

  public static ticketToJson(value: Ticket): string {
    return JSON.stringify(value)
  }
}
