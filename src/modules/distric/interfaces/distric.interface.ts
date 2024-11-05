export interface DistricResponse {
  count: number
  next: null
  previous: null
  results: Distric[]
}

export interface Distric {
  id: number
  created: Date
  modified: Date
  name: string
  address: string
  representative: string
  phone: string
  email: string
}

export class Convert {
  public static toDistricResponse(json: string): DistricResponse {
    return JSON.parse(json)
  }

  public static districResponseToJson(value: DistricResponse): string {
    return JSON.stringify(value)
  }
}

export interface Settings {
  id?: number
  interval_time_device: number
  height: number
  width: number
}
