import requesterMaster from './requesterMaster';
import { iSignIn, iSignUp } from '../../types/auth';

const whoAmI = (ctx?:any) => requesterMaster(`{
  me { 
    user { 
      login { value valueShowed }
      email { value valueShowed verified } 
      pass 
      role 
      phone { value verified }
    }
  }
}`, ctx || undefined);

const createUser = (u:iSignUp, ctx?:any) => requesterMaster(`mutation {
  createUser(login:"${u.login}" pass:"${u.pass}" email:"${u.email}")
}`, ctx || undefined);

const authUser = (u:iSignIn, ctx?:any) => requesterMaster(`mutation { 
  authUser(entry:"${u.entry}" pass:"${u.pass}") {
    user {
      login {value valueShowed} 
      email {value valueShowed verified} 
      pass 
      role 
      phone {value verified}
    }
  }
}`, ctx || undefined);

const logOutUser = () => requesterMaster('mutation{invalidateTokens}');

const requester = {
  whoAmI,
  createUser,
  authUser,
  logOutUser,
};

export default requester;
