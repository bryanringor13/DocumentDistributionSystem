// import axios from 'axios';
import * as ACTION_TYPES from './action_types';
import * as API from '../../utils/Constants';
import { axiosApiInstance } from '../../utils/apiConfig';

export const kpiPercentagePocessed = () => async (dispatch, getState) => {
  await axiosApiInstance
    .get(API.RECEIVED_PROCESSED, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_PERCENTAGE_PROCESSED,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const kpiNotDelivered = () => async (dispatch, getState) => {
  await axiosApiInstance
    .get(API.NOT_DELIVERED_PROCESSED, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_NOT_DELIVERED,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const kpiLoading = () => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.LOADING_KPI,
    payload: true,
  });
};

export const kpiPerformanceIndicator = () => async (dispatch, getState) => {
  dispatch(kpiLoading());
  await axiosApiInstance
    .get(API.PERFOMANCE_INDICATOR, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_INDICATOR,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const kpiMonthyProductivity = () => async (dispatch, getState) => {
  dispatch(kpiLoading());
  await axiosApiInstance
    .get(API.MONTHLY_PRODUCTIVITY, tokenConfig(getState))
    .then((res) => {
      console.log(res, 'dataaaa');
      dispatch({
        type: ACTION_TYPES.GET_MONTHLY_PRODUCTIVITY,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Setup config/Headers and token
export const tokenConfig = (getState) => {
  // Get token from local storage
  // const token = getState().auth.token;
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
