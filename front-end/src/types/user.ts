export enum signIn {
  empty,
  guest,
  succeed
}

export interface iUser {
  login: iLogin
  pass: string | null
  email: iEmail
  phone: iPhone
  isLoggedIn: signIn | null

  signUpMessage: iResponse | null,
  signInMessage: iResponse | null,
  passRecoveryMessage: iResponse | null
}

export interface iLogin {
  value: string | null
  valueShowed: string | null
}

export interface iEmail {
  value: string | null
  valueShowed: string | null
  verified: boolean | null
}

export interface iPhone {
  value: string | null
  verified: boolean | null
}

export enum eResponseType {
  success = 'success',
  error = 'error'
}
export interface iResponse {
  type: eResponseType.error | eResponseType.success | null,
  message: string | null
}
