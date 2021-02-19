/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
import * as ACTION from '../actions/action_types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION.USER_LOADED:
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: true,
        isLoading: false,
      };
    case ACTION.LOGIN_SUCCESS:
    case ACTION.REGISTER_SUCCESS:
      const selected = [];
      selected.push(action.payload.data.user.user_type);
      localStorage.setItem('token', action.payload.data.token);
      localStorage.setItem('refresh_token', action.payload.data.refresh_token);
      // console.log(action.payload, 'LOAD USER');
      localStorage.setItem('roles', JSON.stringify(selected));
      localStorage.setItem('user_id', action.payload.data.user.id);
      localStorage.setItem('user_type', action.payload.data.user.user_type);
      return {
        ...state,
        // ...action.payload.data,
        token: action.payload.data.token,
        // isAuthenticated: true,
        isLoading: false,
      };
    case ACTION.AUTH_ERROR:
    case ACTION.LOGIN_FAIL:
    case ACTION.LOGOUT_SUCCESS:
    case ACTION.REGISTER_FAIL:
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('roles');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_type');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
