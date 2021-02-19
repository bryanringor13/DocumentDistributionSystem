import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import developerReducer from './developerReducer';
import requestReducer from './requestReducer';
import addressReducer from './addressReducer';
import notification from './notificationReducer';
import messengerReducer from './messengerReducer';
import kpiReducer from './kpiReducer';
import reportReducer from './reportReducer';
import scheduleReducer from './scheduleReducer';
import contactReducer from './contactReducer';
import auditReducer from './auditReducer';

export default combineReducers({
  user: userReducer,
  developer: developerReducer,
  error: errorReducer,
  auth: authReducer,
  request: requestReducer,
  address: addressReducer,
  notification: notification,
  messenger: messengerReducer,
  kpi: kpiReducer,
  report: reportReducer,
  schedule: scheduleReducer,
  audit: auditReducer,
  contact: contactReducer,
});
