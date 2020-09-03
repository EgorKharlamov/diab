import { spawn, call, all } from '@redux-saga/core/effects';
import user from './user/sagas';
import app from './app/sagas';

export default function* rootSaga() {
  const sagas = [
    user,
    app,
  ];

  yield all(sagas.map((saga) => spawn(function* () {
    while (true) {
      try {
        yield call(saga);
        break;
      } catch (e) {
        console.log(e);
      }
    }
  })));
}
