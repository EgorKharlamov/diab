import { call, takeEvery } from '@redux-saga/core/effects';
import { Action } from 'redux-actions';
import { AppActions } from './actions';
import { iApp } from '../../types/app';
import { setTheme } from '../../helpers/theme';

function* changeThemeWorker(action: Action<iApp>) {
  try {
    yield call(setTheme, action.payload.theme);
  } catch (e) {}
}

export default function* watchApp() {
  yield takeEvery(AppActions.Type.CHANGE_THEME, changeThemeWorker);
}
