import { combineReducers } from 'redux';
import { user } from './user/reducers';
import { app } from './app/reducers';

export const rootReducer = combineReducers({
  user,
  app,
});
