import type { User } from './user.interface'

export interface LoginResponse {
  token: string
  user: User
  message: string
}

export class Convert {
  public static toLoginResponse(json: string): LoginResponse {
    return JSON.parse(json)
  }

  public static loginResponseToJson(value: LoginResponse): string {
    return JSON.stringify(value)
  }
}
