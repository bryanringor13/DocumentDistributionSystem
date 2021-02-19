/* eslint-disable camelcase */
/* eslint-disable no-undef */
// import axios from 'axios';
import * as ACTION_TYPES from './action_types';
import { returnErrors, clearErrors } from './errorActions';
import * as API from '../../utils/Constants';
import { axiosApiInstance } from '../../utils/apiConfig';
import moment from 'moment';

moment.locale();

export const allNotifications = () => async (dispatch, getState) => {
  dispatch(unreadNotifCount());
  const pageData = getState().notification.pageParams;
  const paramsQuery = new URLSearchParams(pageData).toString();
  // Request Loading
  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.NOTIFICATION_LOADING });
  await axiosApiInstance
    .get(API.ALL_NOTIFICATIONS + '?' + paramsQuery, tokenConfig(getState))
    .then((res) => {
      const response_data = {
        data: res.data,
        pagination: res.data.pagination,
      };
      dispatch({
        type: ACTION_TYPES.ALL_NOTIFICATIONS,
        payload: response_data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.errors, err.response.status, err.response.data.message));
      } else {
        console.log(err);
      }
    });
};

export const viewOlderNotif = () => async (dispatch, getState) => {
  const pageData = getState().notification.pageParams;
  const paramsQuery = new URLSearchParams(pageData).toString();
  // Request Loading

  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.VIEW_OLDER_LOAD });
  await axiosApiInstance
    .get(API.OLDER_NOTIF + '?' + paramsQuery, tokenConfig(getState))
    .then((res) => {
      const response_data = {
        data: res.data,
        pagination: res.data.pagination,
      };
      console.log(response_data, paramsQuery);
      dispatch({
        type: ACTION_TYPES.VIEW_OLDER_NOTIF,
        payload: response_data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.errors, err.response.status, err.response.data.message));
      } else {
        console.log(err);
      }
    });
};

export const skipItemDefault = () => {
  return {
    type: ACTION_TYPES.SKIP_ITEM_DEFAULT,
  };
};

export const unreadNotifications = () => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch(unreadNotifCount());
  dispatch({ type: ACTION_TYPES.NOTIFICATION_LOADING });
  await axiosApiInstance
    .get(API.UNREAD_NOTIFICATIONS, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UNREAD_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.errors, err.response.status, err.response.data.message));
      } else {
        console.log(err);
      }
    });
};

export const unreadNotifCount = () => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.NOTIFICATION_LOADING });
  await axiosApiInstance
    .get(API.NOTIFICATION_COUNT, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.NOTIFICATION_COUNT,
        payload: res.data,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.errors, err.response.status, err.response.data.message));
      } else {
        console.log(err);
      }
    });
};

export const markAsRead = (index, id, items) => async (dispatch, getState) => {
  dispatch(clearErrors());
  await axiosApiInstance
    .put(API.MARK_AS_READ + id + '/mark-as-read', null, tokenConfig(getState))
    .then((res) => {
      const responseData = {
        data: res.data.data,
        index_id: index,
        itemId: id,
      };
      dispatch({
        type: ACTION_TYPES.MARK_AS_READ,
        payload: responseData,
      });
      dispatch(unreadNotifCount());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(returnErrors(err.response.data.errors, err.response.status, err.response.data.message));
      } else {
        console.log(err);
      }
    });
};

export const setNotificationLoading = () => {
  return {
    type: ACTION_TYPES.NOTIFICATION_LOADING,
  };
};

export const setFreshNotif = (bool) => {
  return {
    type: ACTION_TYPES.FRESH_NOTIF,
    payload: bool,
  };
};

export const viewedNotif = (bool) => {
  return {
    type: ACTION_TYPES.VIEWED_NOTIF,
    payload: bool,
  };
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
