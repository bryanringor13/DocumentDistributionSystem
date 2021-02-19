import axios from 'axios';
import * as ACTION_TYPES from './action_types';
import * as API from '../../utils/Constants';

export const allUsers = () => (dispatch) => {
  dispatch(setProcessLoading());
  axios.get(API.ALL_USER).then((res) =>
    dispatch({
      type: ACTION_TYPES.ALL_USERS,
      payload: res.data,
    })
  );
};

export const getUser = (id) => {
  return {
    type: ACTION_TYPES.GET_USER,
    payload: id,
  };
};

export const deleteUser = (id) => {
  return {
    type: ACTION_TYPES.DELETE_USER,
    payload: id,
  };
};

export const setProcessLoading = () => {
  return {
    type: ACTION_TYPES.PROCESS_LOADING,
  };
};
