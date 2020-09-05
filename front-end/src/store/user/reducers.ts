import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { initialStateUser } from './initialState';
import { iUser, signIn } from '../../types/user';
import { UserActions } from './actions';

export const user = (state: iUser | undefined = initialStateUser, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user };
    case UserActions.Type.SET_USER:
      return { ...state, ...action.payload, isLoggedIn: signIn.succeed };
    case UserActions.Type.CLEAR_USER:
      return { ...state, ...action.payload, isLoggedIn: signIn.guest };
    case UserActions.Type.SIGN_UP_MESSAGE:
      return { ...state, signUpMessage: { ...action.payload } };
    case UserActions.Type.SIGN_IN_MESSAGE:
      return { ...state, signInMessage: { ...action.payload } };
    case UserActions.Type.PASS_RECOVERY_MESSAGE:
      return { ...state, passRecoveryMessage: { ...action.payload } };
    default:
      return state;
  }
};
