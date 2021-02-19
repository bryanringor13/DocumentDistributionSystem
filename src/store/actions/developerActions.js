import axios from 'axios';
import * as ACTION_TYPES from './action_types';

export const allDevelopers = () => (dispatch) => {
  dispatch(setDeveloperLoading());
  axios.get('/api/developers').then((res) =>
    dispatch({
      type: ACTION_TYPES.ALL_DEVELOPERS,
      payload: res.data,
    })
  );
};

export const getDeveloper = (id) => {
  return {
    type: ACTION_TYPES.GET_DEVELOPER,
    payload: id,
  };
};

export const addDeveloper = (developer) => (dispatch) => {
  axios.post('/api/developers', developer).then((res) =>
    dispatch({
      type: ACTION_TYPES.ADD_DEVELOPER,
      payload: res.data,
    })
  );
};

export const deleteDeveloper = (id) => (dispatch) => {
  axios.delete(`/api/developers/${id}`).then((res) =>
    dispatch({
      type: ACTION_TYPES.DELETE_DEVELOPER,
      payload: id,
    })
  );
};

export const setDeveloperLoading = () => {
  return {
    type: ACTION_TYPES.DEVELOPER_LOADING,
  };
};
