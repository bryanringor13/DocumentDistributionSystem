import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  auth: authReducer,
});
