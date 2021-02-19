import * as ACTION from '../actions/action_types';
import {
  getToken,
  setSessionToken,
  setUserRoles,
  removeUserSession,
} from '../../utils/common';

const initialState = {
  token: getToken(),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  roles: null,
  collection_data: {
    headerSort: 'for_receipt',
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.LOGIN_SUCCESS:
      setSessionToken(action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case ACTION.SET_USER_ROLES:
      setUserRoles(action.payload);
      return {
        ...state,
        roles: action.payload,
      };
    case ACTION.SET_CD_HEADER_SORT:
      // setUserRoles(action.payload);
      return {
        ...state,
        collection_data: { headerSort: action.payload },
      };
    case ACTION.USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    // case ACTION.LOGIN_SUCCESS:
    // case ACTION.REGISTER_SUCCESS:
    //   localStorage.setItem('token', action.payload.token);
    //   return {
    //     ...state,
    //     ...action.payload,
    //     isAuthenticated: true,
    //     isLoading: false,
    //   };
    case ACTION.AUTH_ERROR:
    case ACTION.LOGIN_FAIL:
    case ACTION.LOGOUT_SUCCESS:
      removeUserSession();

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        roles: null,
      };
    default:
      return state;
  }
}
