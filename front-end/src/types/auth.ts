export interface iSignUp {
  login: string
  pass: string
  email: string
}

export interface iSignIn {
  entry: string
  pass: string
}

export interface iPassRecovery {
  email: string
}

export enum loginMode {
  signIn = 'signIn',
  signUp = 'signUp',
  passRecovery = 'passRecovery'
}
export interface iLoginMode {
  mode: loginMode.signIn | loginMode.signUp | loginMode.passRecovery
}
