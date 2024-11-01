export interface MonitoringResponse {
  count: number
  next: string
  previous: null
  results: Monitoring[]
}

export interface Monitoring {
  id: number
  isConnected: boolean
  created: Date
  modified: Date
  read_date: Date
  measured: string
  percentage: string
  battery: string
  status: string
  observations: string
}
export class Convert {
  public static toMonitoringResponse(json: string): MonitoringResponse {
    return JSON.parse(json)
  }

  public static monitoringResponseToJson(value: MonitoringResponse): string {
    return JSON.stringify(value)
  }
}
