import { AnyAction } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { AppActions } from './actions';
import { initialStateApp } from './initialState';
import { iApp } from '../../types/app';

export const app = (state:iApp | undefined = initialStateApp, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.app };
    case AppActions.Type.CHANGE_THEME:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
