export interface iSignUp {
  login:string
  pass: string
  email: string
}

export interface iSignIn {
  entry: string
  pass: string
}

export enum loginMode {
  signIn = 'signIn',
  signUp = 'signUp'
}
export interface iLoginMode {
  mode: loginMode.signIn | loginMode.signUp
}
