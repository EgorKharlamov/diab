import { createAction } from 'redux-actions';
import { iSignIn, iSignUp, iPassRecovery } from '../../types/auth';
import { iUser } from '../../types/user';
import { initialStateUser } from './initialState';

enum Type {
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  LOG_OUT = 'LOG_OUT',
  PASSWORD_RECOVERY = 'PASSWORD_RECOVERY',
  SIGN_UP_MESSAGE = 'SIGN_UP_MESSAGE',
  SIGN_IN_MESSAGE = 'SIGN_IN_MESSAGE',
  PASS_RECOVERY_MESSAGE = 'PASS_RECOVERY_MESSAGE'
}

const setUser = createAction<iUser>(Type.SET_USER);
const clearUser = createAction<iUser>(Type.CLEAR_USER, () => initialStateUser);
const signUp = createAction<iSignUp>(Type.SIGN_UP);
const signIn = createAction<iSignIn>(Type.SIGN_IN);
const logOut = createAction(Type.LOG_OUT);
const passRecovery = createAction<iPassRecovery>(Type.PASSWORD_RECOVERY);
const signUpMessage = createAction<iUser>(Type.SIGN_UP_MESSAGE);
const signInMessage = createAction<iUser>(Type.SIGN_IN_MESSAGE);
const passRecoveryMessage = createAction<iUser>(Type.PASS_RECOVERY_MESSAGE);

export const UserActions = {
  Type,

  setUser,
  clearUser,
  signIn,
  signUp,
  logOut,
  passRecovery,
  signUpMessage,
  signInMessage,
  passRecoveryMessage,
};

export type UserActions = Omit<typeof UserActions, 'Type'>
