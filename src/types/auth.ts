export interface SuccessAuthResponse {
  success: true
  extToken: string
}

export interface ErrorAuthResponse {
  success: false
  msg: string
}

export type AuthResponse = SuccessAuthResponse | ErrorAuthResponse;