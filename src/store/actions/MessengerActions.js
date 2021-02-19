/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
// @ts-nocheck
// import axios from 'axios';
import * as ACTION_TYPES from './action_types';
import * as API from '../../utils/Constants';
import * as ACTION from './requestActions';
import { toast } from 'react-toastify';
import { axiosApiInstance } from '../../utils/apiConfig';

export const reassignMessengerAssignToMe = (id, data, close, all) => async (dispatch, getState) => {
  await axiosApiInstance
    .put(API.REASSIGN_MESSENGER_ASSIGN_TO_ME + `${id}/reassign`, data, tokenConfig(getState))
    .then((response) => {
      toast.success(response.data.message);
      if (all) {
        all();
      }
      close();
    })
    .catch((err) => {
      toast.error(`No Requests to Reassign`);
    });
};

export const reassignMessengerPending = (id, data, close) => async (dispatch, getState) => {
  await axiosApiInstance
    .put(API.REASSIGN_MESSENGER_PENDING + `${id}/reassign`, data, tokenConfig(getState))
    .then((response) => {
      toast.success(response.data.message);
      close();
    })
    .catch((err) => {
      toast.error(`No Requests to Reassign`);
    });
};

export const resetNewMessenger = () => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.NEW_MESSENGER_INFO_RESET,
  });
};

export const reassignMessenger = (id, data, close, btn, messengerId) => async (dispatch, getState) => {
  await axiosApiInstance
    .put(API.REASSIGN_MESSENGER + `${id}`, data, tokenConfig(getState))
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.NEW_MESSENGER_INFO,
        payload: response.data.data,
      });
      toast.success(response.data.message);
      if (btn === 'assigne_to_me' || btn === 'pending_accept') {
        dispatch(ACTION.getBoxView(messengerId, btn));
      }
      close();
    })
    .catch((err) => {
      toast.error(`No Requests to Reassign`);
    });
};

export const showAllMessenger = () => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  // eslint-disable-next-line no-undef

  await axiosApiInstance
    .get(API.ALL_MESSENGER + '?pageLimit=10&pageNum=1&showAll=true', tokenConfig(getState))
    .then((res) => {
      let response_data = [];
      let messenger_data = [];
      res.data.data.map((res) => response_data.push(res.box_no));
      res.data.data.map((res) => {
        if (res.status === 1) {
          messenger_data.push({
            messenger_id: res.messenger_id,
            name: `${res.first_name} ${res.last_name}`,
            box_no: res.box_no,
            id: res.id,
          });
        }
      });
      console.log(messenger_data, 'messenger');
      dispatch({
        type: ACTION_TYPES.SHOW_MESSENGER,
        payload: response_data,
        messenger: messenger_data,
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      console.log(err);
    });
};

export const allMessenger = (close) => async (dispatch, getState) => {
  const requestTableData = getState().messenger.searchParams;
  if (close) {
    close(false);
  }
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  // eslint-disable-next-line no-undef
  const paramsQuery = new URLSearchParams(requestTableData).toString();
  console.log(API.ALL_MESSENGER + '?' + paramsQuery, 'API MESSENGER');
  await axiosApiInstance
    .get(API.ALL_MESSENGER + '?' + paramsQuery, tokenConfig(getState))
    .then((res) => {
      let response_data = [];
      let pagination = {};
      let response = [];

      res.data.data.map((res) => {
        let loc = [];

        for (const item of res.assigned_locations_labels) {
          const lastItem = res.assigned_locations_labels[res.assigned_locations_labels.length - 1];

          if (lastItem.city === item.city) {
            loc.push(`${item.city}${' '}`);
          } else {
            loc.push(`${item.city}, ${' '}`);
          }
        }

        response_data = [
          ...response_data,
          {
            id: res.id,
            messenger_id: res.messenger_id,
            messenger: res.first_name + ' ' + res.last_name,
            contact_number: res.contact_number
              .replace(/[^\dA-Z]/g, '')
              .replace(/(.{4})/g, '$1 ')
              .trim(),
            assigned_locations_labels: loc,
            box_no: res.box_no,
            capacity: res.content_count + '/' + res.capacity,
            status: res.status,
          },
        ];
      });

      pagination = res.data.pagination;
      response = { data: response_data, pagination: pagination };

      dispatch({
        type: ACTION_TYPES.ALL_MESSENGER,
        payload: response,
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      console.log(err);
    });
};

export const getFilterRequestMessenger = (request) => {
  return {
    type: ACTION_TYPES.FILTER_MESSENGER,
    payload: request,
  };
};

export const onSortFilter = (orderBy, request, order) => (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  const newData = {
    messenger_id: '39162902',
    first_name: 'test test',
    contact_number: '9879 87',
    assigned_locations_labels: ['Port Area,  ', 'Quiapo '],
    box_no: 2,
    content_count: 4,

    status: 1,
  };

  const data = Object.keys(newData)[orderBy];

  let newOrder;
  let currOrder = order;

  if (getState().messenger.searchParams.sortBy.length === 0) {
    currOrder = false;
    newOrder = 'asc';
  } else {
    if (data === getState().messenger.searchParams.sortBy) {
      if (currOrder === true) {
        newOrder = 'asc';
      } else {
        newOrder = 'desc';
      }
    } else {
      currOrder = true;
      newOrder = 'asc';
    }
  }

  dispatch({
    type: ACTION_TYPES.SORT_FILTER,
    payload: data,
    orderBy: newOrder,
    newOrder: currOrder,
  });
  dispatch(allMessenger());
};

export const getLocationRequestMessenger = (request) => {
  return {
    type: ACTION_TYPES.LOCATION_MESSENGER,
    payload: request,
  };
};

export const setPaginationPageMessenger = (pageNumber) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.PAGE_NO_MESSENGER,
    payload: pageNumber,
  });
  dispatch(allMessenger());
};

export const setPageLimitMessenger = (pageLimit) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.PAGE_LIMIT_MESSENGER,
    payload: pageLimit,
  });
  dispatch(allMessenger());
};

export const showEdit = () => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.SHOW_EDIT,
    payload: true,
  });
};

export const getMessengerDetailsMy = (id, btn, openReassign, data) => async (dispatch, getState) => {
  console.log(id, 'anuar');
  await axiosApiInstance
    .get(API.ALL_MESSENGER + `/${id}`, tokenConfig(getState))
    .then((response) => {
      console.log(response.data.data.first_name, response.data.data.box_no, response.data.data.id, data, 'aaa');
      openReassign(
        true,
        `${response.data.data.first_name} ${' '} ${response.data.data.last_name}`,
        response.data.data.box_no,
        response.data.data.id,
        data
      );
    })
    .catch((err) => {
      toast.error(err);
    });
};

export const clearMessenger = () => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.CLEAR_NEWMESSENGER,
  });
};

export const getMessengerDetails = (id, setOpen, showEdit) => async (dispatch, getState) => {
  await axiosApiInstance
    .get(API.ALL_MESSENGER + `/${id}`, tokenConfig(getState))
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.MESSENGER_DETAILS,
        payload: response.data.data,
        onShowEdit: showEdit,
      });

      setOpen(true);
    })
    .catch((err) => {
      toast.error(err);
    });
};

export const getMessengerPassword = (id) => async (dispatch, getState) => {
  await axiosApiInstance
    .get(API.ALL_MESSENGER + `/${id}`, tokenConfig(getState))
    .then((response) => {
      console.log(response.data.data, 'aaaaaaa');
    })
    .catch((err) => {
      toast.error(err);
    });
};

export const addNewMessenger = (data, handleClose) => async (dispatch, getState) => {
  await axiosApiInstance
    .post(API.ADD_NEW_MESSENGER, data, tokenConfig(getState))
    .then((response) => {
      dispatch(createNewMessenger(response));
      dispatch(allMessenger(handleClose));
      toast.success(response.data.message);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const editMessenger = (data, id, test, test2, handleClose) => async (dispatch, getState) => {
  await axiosApiInstance
    .put(API.ADD_NEW_MESSENGER + `/${id}`, data, tokenConfig(getState))
    .then((response) => {
      dispatch(createNewMessenger(response));
      dispatch(allMessenger(handleClose));

      toast.success(response.data.message);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const resetPasswordMessenger = (data, id, pass) => async (dispatch, getState) => {
  await axiosApiInstance
    .put(API.ADD_NEW_MESSENGER + `/${id}/reset-password`, data, tokenConfig(getState))
    .then((response) => {
      console.log(response.data.data.password, 'anuarrrrr');

      toast.success('Password has been successfully reset');
      dispatch(createNewMessenger(response));
      pass(response.data.data.password);
    })
    .catch((err) => {
      console.log(tokenConfig(getState));
      toast.error(err.response.data.message);
    });
};

const createNewMessenger = () => {
  // handleClose(false)
  return {
    type: ACTION_TYPES.ADD_NEW_MESSENGER,
  };
};

export const messengerLoading = (bool) => {
  return {
    type: ACTION_TYPES.MESSENGER_LOADING,
    payload: bool,
  };
};

export const clearMessengerFilter = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.CLEAR_MESSENGER_FILTER });
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

  console.log(config, 'sd');
  return config;
};
