import { createAction } from 'redux-actions';
import { iSignIn, iSignUp } from '../../types/auth';
import { iUser } from '../../types/user';
import { initialStateUser } from './initialState';

enum Type {
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  LOG_OUT = 'LOG_OUT'
}

const setUser = createAction<iUser>(Type.SET_USER);
const clearUser = createAction<iUser>(Type.CLEAR_USER, () => initialStateUser);
const signUp = createAction<iSignUp>(Type.SIGN_UP);
const signIn = createAction<iSignIn>(Type.SIGN_IN);
const logOut = createAction(Type.LOG_OUT);

export const UserActions = {
  Type,

  setUser,
  clearUser,
  signIn,
  signUp,
  logOut,
};

export type UserActions = Omit<typeof UserActions, 'Type'>
