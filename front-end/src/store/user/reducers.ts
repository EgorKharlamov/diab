import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { initialStateUser } from './initialState';
import { iUser, signIn } from '../../types/user';
import { UserActions } from './actions';

export const user = (state:iUser | undefined = initialStateUser, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user };
    case UserActions.Type.SET_USER:
      return { ...state, ...action.payload, isLoggedIn: signIn.succeed };
    case UserActions.Type.CLEAR_USER:
      return { ...state, ...action.payload, isLoggedIn: signIn.guest };
    default:
      return state;
  }
};
