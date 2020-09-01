import { combineReducers } from 'redux';
import { user } from './user/reducers';

export const rootReducer = combineReducers({
  user,
});
