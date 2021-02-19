import axios from 'axios';
import { noAuthAxios, authAxios } from '../../utils/apiConfig';
import { setUserData } from '../../utils/common';
import * as ACTION from './action_types';
import { returnErrors } from './errorActions';

// Check token and Load User
export const loadUser = () => (dispatch) => {
  // User Loading
  dispatch({ type: ACTION.USER_LOADING });

  authAxios
    .get('/users/2')
    .then((res) => {
      dispatch({
        type: ACTION.USER_LOADED,
        payload: res.data,
      });

      // Storage user data to localStorage
      setUserData(res.data);
    })
    .catch(() => {
      dispatch(logout());
    });
};

// Register User
// export const registerUser = ({
//   name, email, username, password,
// }) => (
//   dispatch,
// ) => {
//   // Headers
//   const config = {
//     headers: {
//       'Content-type': 'application/json',
//     },
//   };

//   // Request Body
//   const body = JSON.stringify({
//     name,
//     email,
//     username,
//     password,
//   });

//   axios
//     .post('/api/auth/register', body, config)
//     .then((res) => {
//       // dispatch(returnErrors({}, 200, 'REGISTER_SUCCESS'));
//       dispatch({
//         type: ACTION.REGISTER_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
//       );
//       dispatch({
//         type: ACTION.REGISTER_FAIL,
//       });
//     });
// };

// Login User
// export const login = ({ username, password }) => (dispatch) => {
//   dispatch({ type: ACTION.USER_LOADING });

//   noAuthAxios
//     .post('/login', {
//       email: username,
//       password,
//     })
//     .then((res) => {
//       if (res.data.token) {
//         dispatch({
//           type: ACTION.LOGIN_SUCCESS,
//           payload: res.data,
//         });
//       }
//     })
//     .catch((err) => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'),
//       );
//       dispatch({
//         type: ACTION.LOGIN_FAIL,
//       });
//     });
// };

// Login User
// export const login = (token) => (dispatch) => {
//   dispatch({
//     type: ACTION.LOGIN_SUCCESS,
//   payload: token,
//   })
// });

// Login User
export const login = (token) => (dispatch) => {
  dispatch({
    type: ACTION.LOGIN_SUCCESS,
    payload: token,
  });
  dispatch(loadUser());
};

// Set User Roles
export const roles = (data) => (dispatch) => {
  dispatch({
    type: ACTION.SET_USER_ROLES,
    payload: data,
  });
};
// export const login = (token) => ({
//   type: ACTION.LOGIN_SUCCESS,
//   payload: token,
// });

// Logout User
export const logout = () => ({
  type: ACTION.LOGOUT_SUCCESS,
});

// set CD header sorting
export const setCDHeaderSort = (data) => (dispatch) => {
  dispatch({
    type: ACTION.SET_CD_HEADER_SORT,
    payload: data,
  });
};


// // Setup config/Headers and token
// export const tokenConfig = (getState) => {
//   // Get token from local storage
//   const { token } = getState().auth;

//   // Headers
//   const config = {
//     headers: {
//       'Content-type': 'application/json',
//     },
//   };

//   // If token, add to headers
//   if (token) {
//     config.headers['x-auth-token'] = token;
//   }

//   return config;
// };
