import {
  call, takeEvery, put, delay,
} from '@redux-saga/core/effects';
import { Action } from 'redux-actions';
import { UserActions } from './actions';
import requester from '../../helpers/requester';
import { iSignIn, iSignUp, iPassRecovery } from '../../types/auth';
import { iUser, iResponse, eResponseType } from '../../types/user';

function* createUserWorker(action: Action<iSignUp>) {
  try {
    const res = yield call(requester.createUser, { ...action.payload });
    let data: iResponse;
    if (res && res.data) {
      data = {
        type: eResponseType.success,
        message: res.data.createUser,
      };
    }
    if (res && res.errors && res.errors[0] && res.errors[0].message) {
      data = {
        type: eResponseType.error,
        message: res.errors[0].message,
      };
    }
    yield put(UserActions.signUpMessage({ ...data }));
    yield delay(5000);
    yield put(UserActions.signUpMessage(null));
  } catch (e) { }
}

function* authUserWorker(action: Action<iSignIn>) {
  try {
    const res = yield call(requester.authUser, { ...action.payload });
    let data: iResponse;
    if (res && res.data && res.data.authUser) {
      yield put(UserActions.setUser({ ...res.data.authUser.user }));
    }
    if (res && res.errors && res.errors[0] && res.errors[0].message) {
      data = {
        type: eResponseType.error,
        message: res.errors[0].message,
      };
    }
    yield put(UserActions.signInMessage({ ...data }));
    yield delay(5000);
    yield put(UserActions.signInMessage(null));
  } catch (e) { }
}

function* passRecoveryUserWorker(action: Action<iPassRecovery>) {
  try {
    const res = yield call(requester.passwordRecovery, { ...action.payload });
    let data: iResponse;
    if (res && res.data) {
      data = {
        type: eResponseType.success,
        message: res.data.passRecovery,
      };
    }
    if (res && res.errors && res.errors[0] && res.errors[0].message) {
      data = {
        type: eResponseType.error,
        message: res.errors[0].message,
      };
    }
    console.log(`
    
    hey!
    
    `);
    yield put(UserActions.passRecoveryMessage({ ...data }));
    yield delay(5000);
    yield put(UserActions.passRecoveryMessage(null));
  } catch (e) { }
}

function* logOutUserWorker() {
  try {
    const { data } = yield call(requester.logOutUser);

    if (data.invalidateTokens) {
      yield put(UserActions.clearUser());
    }
  } catch (e) { }
}

export default function* watchUser() {
  yield takeEvery(UserActions.Type.SIGN_UP, createUserWorker);
  yield takeEvery(UserActions.Type.SIGN_IN, authUserWorker);
  yield takeEvery(UserActions.Type.LOG_OUT, logOutUserWorker);
  yield takeEvery(UserActions.Type.PASSWORD_RECOVERY, passRecoveryUserWorker);
}
