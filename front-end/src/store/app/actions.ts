import { createAction } from 'redux-actions';
import { iApp } from '../../types/app';

enum Type {
  CHANGE_THEME = 'CHANGE_THEME',
}

const changeTheme = createAction<iApp>(Type.CHANGE_THEME);

export const AppActions = {
  Type,

  changeTheme,
};

export type AppActions = Omit<typeof AppActions, 'Type'>
