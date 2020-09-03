import { createStore, applyMiddleware } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './rootReducer';
import { initialStateUser } from './user/initialState';
import rootSaga from './rootSaga';
import { iUser } from '../types/user';
import { iApp } from '../types/app';
import { initialStateApp } from './app/initialState';

export interface iState {
  user: iUser,
  app: iApp
}
export const initialState = {
  user: { ...initialStateUser },
  app: { ...initialStateApp },
};

const bindMiddleware = (middleware:any) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require('redux-devtools-extension');
    // eslint-disable-next-line global-require
    const { logger } = require('redux-logger');
    return composeWithDevTools(applyMiddleware(...middleware, logger));
  }
  return applyMiddleware(...middleware);
};

// create a makeStore function
// eslint-disable-next-line no-underscore-dangle
const makeStore: MakeStore<iState> = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware]),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<iState>(makeStore, { debug: true });
