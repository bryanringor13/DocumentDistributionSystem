/* eslint-disable no-extra-boolean-cast */
import axios from 'axios';
import * as ACTION from './action_types';
import { returnErrors } from './errorActions';
import * as API from '../../utils/Constants';
import { toast } from 'react-toastify';
import { axiosApiInstance } from '../../utils/apiConfig';

// Check token and Load User
export const loadUser = () => async (dispatch, getState) => {
  // User Loading
  dispatch({ type: ACTION.USER_LOADING });

  await axiosApiInstance
    .get(API.GET_USER, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ACTION.USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      if (!!err.response) {
        dispatch(returnErrors(err.response.message, err.response.status));
        dispatch({
          type: ACTION.AUTH_ERROR,
        });
      }
    });
};

// Register User
export const registerUser = ({ name, email, username, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ name, email, username, password });

  axios
    .post(API.REGISTER_USER, body, config)
    .then((res) => {
      // dispatch(returnErrors({}, 200, 'REGISTER_SUCCESS'));
      dispatch({
        type: ACTION.REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: ACTION.REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ username, password }) => (dispatch) => {
  dispatch({ type: ACTION.USER_LOADING });

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post(API.LOGIN_USER, body, config)
    .then((res) => {
      dispatch({
        type: ACTION.LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    })
    .catch((err) => {
      if (!!err.response) {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        toast.error('Internal server error occurred. Please contact system administrator.');

        dispatch({
          type: ACTION.LOGIN_FAIL,
        });
      } else {
        toast.error('Internal server error occurred. Please contact system administrator.');
      }
    });
};

// Logout User
export const logout = (history) => async (dispatch, getState) => {
  const emptyBody = {};

  await axiosApiInstance
    .post(API.LOGOUT_USER, emptyBody, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION.LOGOUT_SUCCESS,
      });

      history.push('/login');
    })
    .catch((err) => {
      console.log(err);
    });
};

// Setup config/Headers and token
export const tokenConfig = (getState) => {
  // Get token from local storage
  const token = localStorage.getItem('token');

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
};
