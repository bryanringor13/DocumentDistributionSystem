// import axios from 'axios';
import * as ACTION_TYPES from './action_types';
import * as API from '../../utils/Constants';
import { toast } from 'react-toastify';
import { axiosApiInstance } from '../../utils/apiConfig';

// export const addNewSchedule = (data) => (dispatch, getState) => {
//   axios
//     .post(API.ADD_NEW_SCHEDULE, data, tokenConfig(getState))
//     .then((response) => {
//       toast.success(response.data.message);
//     })
//     .catch((err) => {
//       toast.error(err.response.data.message);
//     });
// };

export const getRequestor = (data) => async (dispatch, getState) => {
  await axiosApiInstance
    .get(API.GET_ALL_REQUESTOR, tokenConfig(getState))
    .then((response) => {
      console.log(response, 'dateeeee');
      dispatch({
        type: ACTION_TYPES.LIST_REQUESTOR,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const tableCount = () => async (dispatch, getState) => {
  await axiosApiInstance
    .get(API.SCHEDULE_TABLE_COUNT, tokenConfig(getState))
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.TABLE_COUNT_SCHEDULE,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// export const getRequestorData = (data) => (dsipatch, getState) => {
//   axios
//   .get(API.GET_REQUESTOR + data, tokenConfig(getState))
//   .then((response) => {
//     console.log(response.data.data,"dateeeee")
//  dispatch({
//    type: ACTION_TYPES.REQUESTOR_DATA_SCHEDULE,
//    payload: response.data.data,
//  })
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }

export const loadingPartner = (bool) => {
  return {
    type: ACTION_TYPES.LOADING_PARTNER,
    payload: bool,
  };
};

export const loadingRequestor = (bool) => {
  return {
    type: ACTION_TYPES.LOADING_REQUESTOR,
    payload: bool,
  };
};

//hmo reset list
export const filterRequestorDetailsReset = (
  partnerId = '',
  req_id = '',
  departmentId = '',
  setDepartmentList,
  setPartnerList,
  setRequestorList
) => async (dispatch, getState) => {
  console.log(partnerId, 's', departmentId, 's', req_id, 'IDDD HMO');
  dispatch(loadingPartner(true));
  dispatch(loadingRequestor(true));

  await axiosApiInstance
    .get(API.FILTER_DEPARTMENT + `?partner_id=${partnerId}&req_id=`, tokenConfig(getState))
    .then((response) => {
      dispatch(loadingPartner(false));
      dispatch(loadingRequestor(false));
      setDepartmentList(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });

  await axiosApiInstance
    .get(
      API.FILTER_HMO + `?dept_id=${departmentId > 0 ? departmentId : null}&req_id=${departmentId === '' ? '' : req_id}`,
      tokenConfig(getState)
    )
    .then((response) => {
      console.log(response, 'response');
      //  const unique2 = [...new Set(response.data.data.map(item => item.name))];
      setPartnerList(response.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  setRequestorList('');
};

//requestor and department list
export const filterRequestorDetailsPartner = (
  partnerId = '',
  req_id = '',
  departmentId = '',
  setDepartmentList,
  setPartnerList,
  setRequestorList
) => async (dispatch, getState) => {
  console.log(partnerId, 's', departmentId, 's', req_id, 'IDDD');
  dispatch(loadingRequestor(true));
  if (departmentId === 0 || departmentId === '') {
    await axiosApiInstance
      .get(API.FILTER_DEPARTMENT + `?partner_id=${partnerId}&req_id=`, tokenConfig(getState))
      .then((response) => {
        setDepartmentList(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // console.log(API.FILTER_DEPARTMENT + `?partner_id=${partnerId}&req_id=${req_id === 0  || req_id === '' ? '' :req_id}`,"DEPARTMENT")

  await axiosApiInstance
    .get(
      API.FILTER_REQUESTOR +
        `?dept_id=${departmentId === 0 || departmentId === '' ? '' : departmentId}&partner_id=${partnerId}`,
      tokenConfig(getState)
    )
    .then((response) => {
      console.log(departmentId === 0 || departmentId === '' ? 'd' : departmentId);
      console.log(response.data.data, 'DATAREST', departmentId, parseInt(partnerId));

      dispatch(loadingRequestor(false));
      if (departmentId === 0 || departmentId === '') {
        setRequestorList('');
      } else {
        setRequestorList(response.data.data);
        console.log(response.data.data, 'DATAAAAA');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const filterRequestorDetailsRequestor = (
  partnerId = '',
  req_id = '',
  departmentId = '',
  setDepartmentList,
  setPartnerList,
  setRequestorList
) => async (dispatch, getState) => {
  console.log(partnerId, 's', departmentId, 's', req_id, 'IDDD');

  dispatch(loadingPartner(true));

  await axiosApiInstance
    .get(
      API.FILTER_DEPARTMENT + `?partner_id=${partnerId}&req_id=${req_id === 0 || req_id === '' ? '' : req_id}`,
      tokenConfig(getState)
    )
    .then((response) => {
      setDepartmentList(response.data.data);
      dispatch(loadingPartner(false));
    })
    .catch((err) => {
      console.log(err);
    });

  // axios
  // .get(API.FILTER_REQUESTOR + `?dept_id=${departmentId === 0  || departmentId === '' ? '' : departmentId}&partner_id=${partnerId}` , tokenConfig(getState))
  // .then((response) => {
  //     console.log(departmentId === 0  || departmentId === '' ? 'd' : departmentId)
  //     console.log(response.data.data,"DATAREST",departmentId,parseInt(partnerId))
  //   setRequestorList(response.data.data)
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

export const onSaveSchedule = (data, handleClose, loading, cancelLoading, oncloseNewSched) => async (
  dispatch,
  getState
) => {
  await axiosApiInstance
    .post(API.SAVE_SCHEDULE, data, tokenConfig(getState))
    .then((response) => {
      toast.success(response.data.message);
      dispatch(viewScheduledRequest(response.data.data._id));
      dispatch(openScheduledRequest());
      handleClose(false);
      oncloseNewSched(false);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      loading(false);
      cancelLoading(false);
    });
};

export const historyScheduleRequest = () => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING_SCHEDULE });

  const params = getState().schedule.searchParams;
  const paramsQuery = new URLSearchParams(params).toString();

  await axiosApiInstance
    .get(`${API.HISTORY_SCHEDULED_REQUEST}?${paramsQuery}`, tokenConfig())
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.HISTORY_SCHEDULED_REQUEST,
        scheduled_request: res.data.data,
        pagination: res.data.pagination,
      });
      console.log(res, 'itemm');
      if (res.data.data.length < 1) {
        toast.error('No records found');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const allScheduledRequest = () => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING_SCHEDULE });

  const params = getState().schedule.searchParams;
  const paramsQuery = new URLSearchParams(params).toString();

  await axiosApiInstance
    .get(`${API.ALL_SCHEDULED_REQUEST}?${paramsQuery}`, tokenConfig())
    .then((res) => {
      if (res.data.data.length < 1 && getState().schedule.reqLoading) {
        toast.error('No records found');
      }

      dispatch({
        type: ACTION_TYPES.ALL_SCHEDULED_REQUEST,
        scheduled_request: res.data.data,
        pagination: res.data.pagination,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const viewScheduledRequest = (scheduledRequestId) => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING_SCHEDULE });

  await axiosApiInstance
    .get(`${API.ALL_SCHEDULED_REQUEST}/${scheduledRequestId}`, tokenConfig())
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.VIEW_SCHEDULED_REQUEST,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setPaginationPageSchedule = (pageNumber, buttonActive) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.PAGE_NO_SCHEDULE,
    payload: pageNumber,
  });
  if (buttonActive === 'active_schedule') {
    dispatch(allScheduledRequest());
  } else if (buttonActive === 'history_schedule') {
    dispatch(historyScheduleRequest());
  }
};

export const setPageLimitSchedule = (pageLimit, buttonActive) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.PAGE_LIMIT_SCHEDULE,
    payload: pageLimit,
  });
  if (buttonActive === 'active_schedule') {
    dispatch(allScheduledRequest());
  } else if (buttonActive === 'history_schedule') {
    dispatch(historyScheduleRequest());
  }
};

export const onSortFilter = (orderBy, request, order, buttonActive) => (dispatch, getState) => {
  const newData = {
    schedule_request_id: '123456773445',
    company_details_name: 'Golden Empire',
    request_details_type: 'Delivery',
    request_details_requestor: 'Allison Franci',
    schedule_details_starts_on: 'Jan 1, 2020',
    schedule_details_ends_on: 'Jan 20, 2020',
    schedule_details_repeats: 'Weekly (Mon, Tue, Wed, Thu, Fri)',
  };

  const data = Object.keys(newData)[orderBy];
  console.log(orderBy, 'orderby');
  let newOrder;
  let currOrder = order;

  if (getState().schedule.searchParams.sortBy.length === 0) {
    currOrder = false;
    newOrder = 'asc';
  } else {
    if (data === getState().schedule.searchParams.sortBy) {
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
    type: ACTION_TYPES.SORT_FILTER_SCHEDULE,
    payload: data,
    orderBy: newOrder,
    newOrder: currOrder,
  });
  if (buttonActive === 'active_schedule') {
    dispatch(allScheduledRequest());
  } else if (buttonActive === 'history_schedule') {
    dispatch(historyScheduleRequest());
  }
};

export const setRequestFilterType = (filterType, buttonActive) => (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING_SCHEDULE });
  dispatch({ type: ACTION_TYPES.FILTER_TYPE_SCHEDULE, payload: filterType });

  if (buttonActive === 'active_schedule') {
    dispatch(allScheduledRequest());
  } else if (buttonActive === 'history_schedule') {
    dispatch(historyScheduleRequest());
  }
};

export const setRequestFilterRepeats = (filterRepeats, buttonActive) => (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING_SCHEDULE });
  dispatch({ type: ACTION_TYPES.FILTER_REPEATS_SCHEDULE, payload: filterRepeats });

  if (buttonActive === 'active_schedule') {
    dispatch(allScheduledRequest());
  } else if (buttonActive === 'history_schedule') {
    dispatch(historyScheduleRequest());
  }
};

export const setRequestSearch = (keyword, buttonActive) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.SEARCH_SCHEDULE_REQUEST,
    payload: keyword,
  });

  if (buttonActive === 'active_schedule') {
    dispatch(allScheduledRequest());
  } else if (buttonActive === 'history_schedule') {
    dispatch(historyScheduleRequest());
  }
};

export const setDateRangeFilter = (start_date, end_date, buttonActive) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.FILTER_DATE_RANGE_SCHEDULE,
    payload: { start_date, end_date },
  });

  if (buttonActive === 'active_schedule') {
    dispatch(allScheduledRequest());
  } else if (buttonActive === 'history_schedule') {
    dispatch(historyScheduleRequest());
  }
};

export const clearScheduledRequestSearch = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.CLEAR_SCHEDULE_REQUEST_SEARCH });
};

export const openTransmittalRequest = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.OPEN_TRANSMITTAL_REQUEST });
};

export const openScheduledRequest = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.OPEN_SCHEDULED_REQUEST });
};

export const closeViewRequest = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.CLOSE_VIEW_REQUEST });
};

export const cancelParentScheduledRequest = (scheduledRequestId, reason) => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING_SCHEDULE });

  const bodyRequest = {
    reason: reason,
  };

  await axiosApiInstance
    .put(`${API.ALL_SCHEDULED_REQUEST}/${scheduledRequestId}/cancel`, JSON.stringify(bodyRequest), tokenConfig())
    .then((res) => {
      dispatch(viewScheduledRequest(scheduledRequestId));
      toast.success('Scheduled request and all of its active transmittal requests are cancelled');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const cancelChildScheduledRequest = (
  scheduledRequestId,
  transmittalRequestId,
  reason,
  setIncludedRequestCreated
) => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING_SCHEDULE });

  const bodyRequest = {
    requests_transmittals: transmittalRequestId,
    reason: reason,
  };

  await axiosApiInstance
    .put(
      `${API.ALL_SCHEDULED_REQUEST}/${scheduledRequestId}/cancel/transmittals`,
      JSON.stringify(bodyRequest),
      tokenConfig()
    )
    .then((res) => {
      dispatch(viewScheduledRequest(scheduledRequestId));
      setIncludedRequestCreated([]);

      if (transmittalRequestId.length > 1) {
        toast.success('The requests are successfully cancelled');
      } else {
        toast.success('The request is successfully cancelled');
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const inScheduledRequestMenu = (bool) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.IN_SCHEDULED_REQUEST_MENU,
    payload: bool,
  });
};

export const setScheduledRequestActiveTab = (tab) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.SCHEDULED_REQUEST_ACTIVE_TAB,
    payload: tab,
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

  console.log(config, 'sd');
  return config;
};
