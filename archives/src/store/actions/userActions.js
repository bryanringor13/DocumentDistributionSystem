import axios from 'axios';
import * as ACTION_TYPES from './action_types';

export const allUsers = () => (dispatch) => {
  dispatch(setProcessLoading());
  axios.get('/api/users').then((res) => dispatch({
    type: ACTION_TYPES.ALL_USERS,
    payload: res.data,
  }));
};

export const getUser = (id) => ({
  type: ACTION_TYPES.GET_USER,
  payload: id,
});

export const deleteUser = (id) => ({
  type: ACTION_TYPES.DELETE_USER,
  payload: id,
});

export const setProcessLoading = () => ({
  type: ACTION_TYPES.PROCESS_LOADING,
});
