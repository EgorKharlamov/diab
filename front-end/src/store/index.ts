import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import { initialStateUser, iUser } from './user/initialState';
import rootSaga from './rootSaga';

export interface iState {
  user: iUser
}
export const initialState = {
  user: { ...initialStateUser },
};

// create a makeStore function
// eslint-disable-next-line no-underscore-dangle
const makeStore: MakeStore<iState> = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(
      logger, sagaMiddleware,
    )),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<iState>(makeStore, { debug: true });
