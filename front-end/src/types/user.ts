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
