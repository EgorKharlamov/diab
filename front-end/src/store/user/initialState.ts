import { iUser, signIn } from '../../types/user';

export const initialStateUser: iUser = {
  login: {
    value: null,
    valueShowed: null,
  },
  pass: null,
  email: {
    value: null,
    valueShowed: null,
    verified: null,
  },
  phone: {
    value: null,
    verified: null,

  },
  isLoggedIn: signIn.empty,
};
