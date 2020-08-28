import requesterMaster from './requesterMaster';

export interface iCreateUser {
  login:string
  pass: string
  email: string
}

export interface iAuthUser {
  entry: string
  pass: string
}

export const whoAmI = (ctx?:any) => requesterMaster('{me {login {login email{value verified} pass phone{value verified}}}}', ctx || undefined);
export const createUser = (u:iCreateUser, ctx?:any) => requesterMaster(`mutation{ createUser(login:"${u.login}" pass:"${u.pass}" email:"${u.email}")}`, ctx || undefined);
export const authUser = (u:iAuthUser, ctx?:any) => requesterMaster(`mutation{ authUser(entry:"${u.entry}" pass:"${u.pass}")}`, ctx || undefined);
export const logOutUser = () => requesterMaster('mutation{invalidateTokens}');
