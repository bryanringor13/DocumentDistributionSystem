/* eslint-disable camelcase */
// import axios from 'axios';
import * as ACTION_TYPES from './action_types';
import { returnErrors, clearErrors } from './errorActions';
import { toast } from 'react-toastify';
import * as API from '../../utils/Constants';
import moment from 'moment';
import { axiosApiInstance } from '../../utils/apiConfig';

moment.locale();

export const allRequestInit = (tableComponent) => async (dispatch, getState) => {
  const requestTableData = getState().request.searchParamsInitial;

  const newObjStateRequestTable = JSON.parse(JSON.stringify(requestTableData));
  if (requestTableData.requestType === 0) {
    delete newObjStateRequestTable.requestType;
  }

  if (requestTableData.trackingStatus === 0) {
    delete newObjStateRequestTable.trackingStatus;
  }

  if (requestTableData.keyword === '' || requestTableData.keyword === null) {
    delete newObjStateRequestTable.keyword;
  }

  if (requestTableData.dateFrom === '' || requestTableData.dateFrom === null) {
    delete newObjStateRequestTable.dateFrom;
  }

  if (requestTableData.dateTo === '' || requestTableData.dateTo === null) {
    delete newObjStateRequestTable.dateTo;
  }

  if (requestTableData.sortBy === '' || requestTableData.sortBy === null) {
    delete newObjStateRequestTable.sortBy;
  }

  if (requestTableData.orderBy === '' || requestTableData.orderBy === null) {
    delete newObjStateRequestTable.orderBy;
  }

  // Request Loading
  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  const paramsQuery = new URLSearchParams(newObjStateRequestTable).toString();
  await axiosApiInstance
    .get(API.ALL_REQUEST[localStorage.getItem('user_type')][tableComponent] + '?' + paramsQuery, tokenConfig(getState))
    .then((res) => {
      const response_data = res.data.data;
      const pagination = res.data.pagination;
      let response = [];
      for (const data of response_data) {
        data.capacity = `${' '}${data.content_count}/${data.capacity}`;
      }
      console.log(API.ALL_REQUEST[localStorage.getItem('user_type')][tableComponent] + '?' + paramsQuery, 'an');
      response = { data: response_data, pagination: pagination };
      dispatch(getCountRequest());
      dispatch({
        type: ACTION_TYPES.ALL_REQUEST,
        payload: response,
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

export const allRequest = (tableComponent) => async (dispatch, getState) => {
  const requestTableData = getState().request.searchParams;

  const newObjStateRequestTable = JSON.parse(JSON.stringify(requestTableData));
  if (requestTableData.requestType === 0) {
    delete newObjStateRequestTable.requestType;
  }

  if (requestTableData.trackingStatus === 0) {
    delete newObjStateRequestTable.trackingStatus;
  }

  if (requestTableData.keyword === '' || requestTableData.keyword === null) {
    delete newObjStateRequestTable.keyword;
  }

  if (requestTableData.dateFrom === '' || requestTableData.dateFrom === null) {
    delete newObjStateRequestTable.dateFrom;
  }

  if (requestTableData.dateTo === '' || requestTableData.dateTo === null) {
    delete newObjStateRequestTable.dateTo;
  }

  if (requestTableData.sortBy === '' || requestTableData.sortBy === null) {
    delete newObjStateRequestTable.sortBy;
  }

  if (requestTableData.orderBy === '' || requestTableData.orderBy === null) {
    delete newObjStateRequestTable.orderBy;
  }

  // Request Loading
  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  const paramsQuery = new URLSearchParams(newObjStateRequestTable).toString();
  await axiosApiInstance
    .get(API.ALL_REQUEST[localStorage.getItem('user_type')][tableComponent] + '?' + paramsQuery, tokenConfig(getState))
    .then((res) => {
      const response_data = res.data.data;
      const pagination = res.data.pagination;
      let response = [];
      for (const data of response_data) {
        data.capacity = `${' '}${data.content_count}/${data.capacity}`;
      }
      console.log(res.data.pagination, 'PAGINATION');
      response = { data: response_data, pagination: pagination };
      dispatch(getCountRequest());
      dispatch({
        type: ACTION_TYPES.ALL_REQUEST,
        payload: response,
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

export const sortingTablePagination = (tableComponent, pageNumber) => async (dispatch, getState) => {
  const requestTableData = getState().request.searchParams;
  requestTableData.pageNum = pageNumber;
  const newObjStateRequestTable = JSON.parse(JSON.stringify(requestTableData));
  if (requestTableData.requestType === 0) {
    delete newObjStateRequestTable.requestType;
  }

  if (requestTableData.trackingStatus === 0) {
    delete newObjStateRequestTable.trackingStatus;
  }

  if (requestTableData.keyword === '' || requestTableData.keyword === null) {
    delete newObjStateRequestTable.keyword;
  }

  if (requestTableData.dateFrom === '' || requestTableData.dateFrom === null) {
    delete newObjStateRequestTable.dateFrom;
  }

  if (requestTableData.dateTo === '' || requestTableData.dateTo === null) {
    delete newObjStateRequestTable.dateTo;
  }

  if (requestTableData.sortBy === '' || requestTableData.sortBy === null) {
    delete newObjStateRequestTable.sortBy;
  }

  if (requestTableData.orderBy === '' || requestTableData.orderBy === null) {
    delete newObjStateRequestTable.orderBy;
  }

  // Request Loading
  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  const paramsQuery = new URLSearchParams(newObjStateRequestTable).toString();
  await axiosApiInstance
    .get(API.ALL_REQUEST[localStorage.getItem('user_type')][tableComponent] + '?' + paramsQuery, tokenConfig(getState))
    .then((res) => {
      const response_data = res.data.data;
      const pagination = res.data.pagination;
      let response = [];
      for (const data of response_data) {
        data.capacity = `${' '}${data.content_count}/${data.capacity}`;
      }

      pagination.page_number = pageNumber;
      console.log(response_data, 'PAGENUMBER');
      response = { data: response_data, pagination: pagination };
      dispatch(getCountRequest());
      dispatch({
        type: ACTION_TYPES.ALL_REQUEST,
        payload: response,
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

export const getCountRequest = () => async (dispatch, getState) => {
  await axiosApiInstance
    .get(API.GET_REQUEST_COUNT, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_ALL_COUNT_REQUEST,
        payload: res.data.data,
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

export const removeBoxViewData = () => {
  return { type: ACTION_TYPES.REMOVE_BOX_DATA, payload: {} };
};

export const getBoxSummary = (id, btn) => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.REMOVE_BOX_DATA, payload: {} });
  await axiosApiInstance
    .get(API.GET_ASSIGN + `accepted-by-messenger/${id}/summary-list`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_BOX_CONTENT_SUMMARY,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getBoxView = (id, btn) => async (dispatch, getState) => {
  const requestTableData = getState().request.searchParamsView;

  const newObjStateRequestTable = JSON.parse(JSON.stringify(requestTableData));
  if (requestTableData.requestType === 0) {
    delete newObjStateRequestTable.requestType;
  }

  const paramsQuery = new URLSearchParams(newObjStateRequestTable).toString();
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  await axiosApiInstance
    .get(
      API.GET_ASSIGN +
        `${API.TABLE_COMPONENT[localStorage.getItem('user_type')].boxContent[btn]}/` +
        `${id}/` +
        'view' +
        '?' +
        paramsQuery,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data, 'conrtent');
      dispatch({
        type: ACTION_TYPES.GET_BOX_CONTENT,
        payload: res.data.data,
        reqLoading: false,
        pagination: res.data.pagination,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const onScan = (request, onClick, setInitialValues) => async (dispatch, getState) => {
  await axiosApiInstance
    .put(API.SCAN_FORM + request, '', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.SCAN_FORM,
        payload: res.data.data,
      });
      onClick();
      dispatch(getCountRequest());
      dispatch(allRequest('unassigned'));
      toast.success('Scan Success');
    })
    .catch((err) => {
      dispatch(allRequest('unassigned'));
      setInitialValues({ trans_no: request });
      toast.error('Failed to get transmittal ID. Please scan again.');
    });
};

export const onScanAnother = (request, setAnotherValues) => async (dispatch, getState) => {
  dispatch(scanLoading(true));
  await axiosApiInstance
    .put(API.SCAN_FORM + request, '', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.SCAN_FORM,
        payload: res.data.data,
      });

      dispatch(getCountRequest());
      dispatch(allRequest('unassigned'));
      dispatch(scanLoading(false));
      setAnotherValues({ another_trans_no: '' });
      toast.success('Scan Success');
    })
    .catch((err) => {
      dispatch(allRequest('unassigned'));
      dispatch(scanLoading(false));
      setAnotherValues({ another_trans_no: request });
      toast.error('Failed to get transmittal ID. Please scan again.');
    });
};

export const scanLoading = (bool) => {
  return {
    type: ACTION_TYPES.SCAN_LOADING,
    payload: bool,
  };
};

export const onSortFilterTable = (orderBy, request, tableComponent, order) => (dispatch, getState) => {
  let newData = {};
  console.log(tableComponent, 'table');
  if (
    tableComponent === 'assigne_to_me' ||
    tableComponent === 'pending_accept' ||
    tableComponent === 'accepted_messenger'
  ) {
    newData = {
      box_no: 0,
      assigned_locations: 1,
      messenger: 2,
      content_count: 3,
    };
  } else if (tableComponent === 'my_request' || tableComponent === 'all_request') {
    newData = {
      transmittal_no: 0,
      addressee: 2,
      request_type: 1,
      created_at: 2,
      expected_date: 3,
      requestor_name: 'james',
      tracking_status_label: 'status',
      admin_asst_name: '',
    };
  } else {
    newData = {
      transmittal_no: 0,
      addressee: 2,
      request_type: 1,
      created_at: 2,
      expected_date: 3,
      requestor_name: 'james',
      tracking_status_label: 'status',
    };
  }

  const data = Object.keys(newData)[orderBy];

  let newOrder;
  let currOrder = order;

  if (getState().request.searchParams.sortBy.length === 0) {
    currOrder = false;
    newOrder = 'asc';
  } else {
    if (data === getState().request.searchParams.sortBy) {
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
    type: ACTION_TYPES.SORT_FILTER_TABLE,
    payload: data,
    orderBy: newOrder,
    newOrder: currOrder,
  });

  dispatch(sortingTablePagination(tableComponent, getState().request.table.page_number));
};

export const onSortFilterTableView = (orderBy, request, order, btn, id) => (dispatch, getState) => {
  let newData = {};
  console.log(btn, 'TABLE VIEW BUTTON ACTIVE');

  if (btn === 'assigne_to_me') {
    newData = {
      transmittal_no: 0,
      addressee: 2,
      requestor: 1,
      request_type: 2,
      expected_date: 3,
      scanned_at: 'james',
    };
  } else {
    newData = {
      transmittal_no: 0,
      addressee: 2,
      requestor: 1,
      request_type: 2,
      expected_date: 3,
      assigned_at: 'james',
    };
  }

  const data = Object.keys(newData)[orderBy];

  let newOrder;
  let currOrder = order;

  if (getState().request.searchParamsView.sortBy.length === 0) {
    currOrder = false;
    newOrder = 'asc';
  } else {
    if (data === getState().request.searchParamsView.sortBy) {
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
    type: ACTION_TYPES.SORT_FILTER_TABLE_VIEW,
    payload: data,
    orderBy: newOrder,
    newOrder: currOrder,
    pageNum: getState().request.tableView.page_number,
  });

  dispatch(getBoxView(id, btn));
};

export const getFilterRequest = (request) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.FILTER_REQUEST,
    payload: request,
  });
};

export const getBoxContentFilterRequest = (filterType) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.FILTER_TYPE_TABLE_VIEW,
    payload: parseInt(filterType),
  });
};

export const reassignedAction = (id, btn) => async (dispatch, getState) => {
  let data = '';

  if (btn === 'assigne_to_me') {
    data = 'assigned-to-me';
  } else {
    data = 'pending-acceptance';
  }
  await axiosApiInstance
    .put(API.REASSIGN + data + `/${id}` + '/reassign', '', tokenConfig(getState))
    .then((res) => {
      toast.success('Send Success');
      dispatch(getCountRequest());
    })
    .catch((err) => {
      toast.error('Send Not Success');
    });
};
export const assignedSend = (id, btn) => async (dispatch, getState) => {
  await axiosApiInstance
    .put(API.ASSIGN_TO_ME_SEND + id + '/send', '', tokenConfig(getState))
    .then((res) => {
      dispatch(getBoxView(id, 'assigne_to_me'));
      dispatch(allRequest(btn));
      dispatch(getCountRequest());
      toast.success('Send Success');
    })
    .catch((err) => {
      toast.error('Send Not Success');
    });
};

export const setPaginationPageView = (pageNumber) => {
  return {
    type: ACTION_TYPES.PAGE_NO_VIEW,
    payload: pageNumber,
  };
};

export const setPaginationPage = (pageNumber) => {
  return {
    type: ACTION_TYPES.PAGE_NO,
    payload: pageNumber,
  };
};

export const setPageLimitView = (pageLimit) => {
  return {
    type: ACTION_TYPES.PAGE_LIMIT_VIEW,
    payload: pageLimit,
    reqLoading: false,
  };
};

export const setPageLimit = (pageLimit) => {
  return {
    type: ACTION_TYPES.PAGE_LIMIT,
    payload: pageLimit,
    reqLoading: false,
  };
};

export const getRangeDate = (start_date, end_date) => {
  return {
    type: ACTION_TYPES.RANGE_DATE,
    payload: { start_date, end_date },
  };
};

export const getRangeDateView = (start_date, end_date) => {
  return {
    type: ACTION_TYPES.RANGE_DATE_VIEW,
    payload: { start_date, end_date },
  };
};

export const getFilterRequestView = (keyword) => {
  return {
    type: ACTION_TYPES.FILTER_VIEW,
    payload: keyword,
  };
};

export const setFilterType = (filterType) => {
  return {
    type: ACTION_TYPES.FILTER_TYPE,
    payload: filterType,
  };
};

export const setFilterStatus = (filterStatus) => {
  return {
    type: ACTION_TYPES.FILTER_STATUS,
    payload: filterStatus,
  };
};

export const addRequest = (new_request) => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // Request Body
  // const body = JSON.stringify({ name, email, username, password });

  await axiosApiInstance
    .post(API.POST_REQUEST, new_request, tokenConfig(getState))
    .then((res) => {
      const response_data = {
        request: {
          id: res.data.data._id,
          transmittal_no: res.data.data.transmittal_no,
          request_type: API.REQUEST_TYPE_TEXT[res.data.data.request_type].text,
          created_at: moment(res.data.data.created_at).format('MMM DD, YYYY'),
          expected_date: moment(res.data.data.item.expected_date).format('MMM DD, YYYY'),
          requestor_name: res.data.data.requestor_name + ' - ' + res.data.data.requestor_department_name,
          tracking_status: res.data.data.tracking_status,
          address: res.data.data.address,
        },
        data: res.data.data,
      };

      dispatch({
        type: ACTION_TYPES.ADD_REQUEST,
        payload: response_data,
      });
    })
    .catch((err) => {
      // console.log(err)
      if (err.response) {
        dispatch(returnErrors(err.response.data.errors, err.response.status, err.response.data.message));
        dispatch({
          type: ACTION_TYPES.ADD_REQUEST_FAIL,
        });
      }
    });
};

export const cancelRequest = (id, reason) => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // Request Body
  // const body = JSON.stringify({ name, email, username, password });

  await axiosApiInstance
    .put(API.CANCEL_REQUEST + id + '/cancel', reason, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CANCEL_REQUEST,
        payload: res.data,
      });
      toast.success('The request is successfully cancelled');
    })
    .catch((err) => {
      console.log(err);
      if (err.response) {
        dispatch(returnErrors(err.response.data.errors, err.response.status, err.response.data.message));
        dispatch({
          type: ACTION_TYPES.CANCEL_REQUEST_FAIL,
        });
      }
    });
};

export const getRequest = (req_id) => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  console.log(req_id, 'annuuuuuuuu');
  if (localStorage.getItem('user_type')) {
    await axiosApiInstance
      .get(API.GET_REQUEST[localStorage.getItem('user_type')] + req_id, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: ACTION_TYPES.GET_REQUEST,
          payload: res.data,
        })
      )
      .catch((err) => {
        console.log(err);
        if (err.response) {
          dispatch(returnErrors(err.response.data.errors, err.response.status, err.response.data.message));
          dispatch({
            type: ACTION_TYPES.GET_REQUEST,
          });
        }
      });
  } else {
    dispatch(returnErrors('No Token', '404', 'Invalid Login'));
    dispatch({
      type: ACTION_TYPES.GET_REQUEST,
    });
  }
};

// export const getPrint = (req_id) => async (dispatch, getState) => {
//   dispatch(clearErrors());
//   dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

//   await axiosApiInstance
//     .get(API.GET_REQUEST + req_id, tokenConfig(getState))
//     .then((res) =>
//       dispatch({
//         type: ACTION_TYPES.GET_PRINT_PREVIEW,
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       dispatch(returnErrors(err.message, err.status, 'PRINT_FAILED'));
//       dispatch({
//         type: ACTION_TYPES.GET_PRINT_PREVIEW,
//       });
//     });
// };

// export const getScan = (data) => async (dispatch, getState) => {
//   await axiosApiInstance
//     .get(API.GET_SCAN + data, tokenConfig(getState))
//     .then((res) =>
//       dispatch({
//         type: ACTION_TYPES.SCAN_FORM,
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const getAuditLogs = (req_id) => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  if (localStorage.getItem('user_type')) {
    await axiosApiInstance
      .get(API.GET_AUDIT_LOGS + req_id + '/tracking-details', tokenConfig(getState))
      .then((res) => {
        console.log('GET AUDIT LOGSSS!!!');
        dispatch({
          type: ACTION_TYPES.GET_AUDIT_LOGS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          dispatch(returnErrors(err.response.data.errors, err.response.status, err.response.data.message));
          dispatch({
            type: ACTION_TYPES.GET_AUDIT_LOGS,
          });
        }
      });
  } else {
    dispatch(returnErrors('No Token', '404', 'Invalid Login'));
    dispatch({
      type: ACTION_TYPES.GET_REQUEST,
    });
  }
};

export const clearNewInfo = () => {
  return {
    type: ACTION_TYPES.CLEAR_NEW_INFO,
  };
};

export const clearActionFilter = () => {
  return {
    type: ACTION_TYPES.CLEAR_FILTER_ACTION,
  };
};

export const clearAllFilter = () => {
  return {
    type: ACTION_TYPES.CLEAR_ALL_FILTER,
  };
};

export const setRequestLoading = () => {
  return {
    type: ACTION_TYPES.REQUEST_LOADING,
  };
};

export const setPrevPage = (prevPageLimit, prevPageNum) => {
  return {
    type: ACTION_TYPES.SET_PREV_PAGE,
    payload: { prevPageLimit, prevPageNum },
  };
};

export const getCode = (code,getCodeData,codeValid) => (dispatch,getState)=> {
  axios
  .get(API.GET_CODE_URL + code + '/search', tokenConfig(getState))
  .then((res) => {
    getCodeData(res.data.data)
 
    codeValid(false)
  })
  .catch((err) => {
    console.log(err);
    codeValid(true)
    
  });
}

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
