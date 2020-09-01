import { call, takeEvery, put } from '@redux-saga/core/effects';
import { Action } from 'redux-actions';
import { UserActions } from './actions';
import requester from '../../helpers/requester';
import { iSignIn, iSignUp } from '../../types/auth';
import { iUser } from '../../types/user';

function* createUserWorker(action: Action<iSignUp>) {
  try {
    yield call(requester.createUser, { ...action.payload });
  } catch (e) {}
}

function* authUserWorker(action: Action<iSignIn>) {
  try {
    const { data } = yield call(requester.authUser, { ...action.payload });

    if (data.authUser) {
      yield put(UserActions.setUser({ ...data.authUser.user }));
    }
  } catch (e) {}
}

function* logOutUserWorker(action: Action<iUser>) {
  try {
    const { data } = yield call(requester.logOutUser);

    if (data.invalidateTokens) {
      yield put(UserActions.clearUser());
    }
  } catch (e) {}
}

export default function* watchUser() {
  yield takeEvery(UserActions.Type.SIGN_UP, createUserWorker);
  yield takeEvery(UserActions.Type.SIGN_IN, authUserWorker);
  yield takeEvery(UserActions.Type.LOG_OUT, logOutUserWorker);
}
