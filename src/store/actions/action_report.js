import * as ACTION_TYPES from './action_types';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as API from '../../utils/Constants';
import { axiosApiInstance } from '../../utils/apiConfig';

const CancelToken = axios.CancelToken;
let cancelReport;

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
    cancelToken: new CancelToken(function executor(c) {
      // An executor function receives a cancel function as a parameter
      cancelReport = c;
    }),
  };

  // If token, add to headers
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
};

export const setPageLimit = (data, reportName) => (dispatch, getState) => {
  // dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  dispatch({
    type: ACTION_TYPES.PAGE_LIMIT_TRANS,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
};

export const removeReport = () => (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.REMOVE_REPORT });
};

export const cancelGenerateReport = () => (dispatch) => {
  cancelReport();
  dispatch(removeReport());
  toast.error('No records found');
};

export const getReport = (body, reportName, toastShow) => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  await axiosApiInstance
    .post(API.REPORT + reportName, JSON.stringify(body), tokenConfig(getState))
    .then((res) => {
      console.log('loaded');
      dispatch({
        type: ACTION_TYPES.GET_REPORT,
        payload: res.data,
        pagination: res.data.pagination,
      });

      if (res.data.data.length) {
        if (toastShow) {
          toast.success('Report generated successfully');
        }
      } else {
        toast.error('No records found');
      }
    })
    .catch((err) => {
      dispatch({
        type: ACTION_TYPES.GET_REPORT,
        payload: {},
      });
    });
};

export const getReportPdf = (body, reportName, setShowPrint, setTruncateData) => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  let pdfQuery = {};
  pdfQuery = body;
  pdfQuery.showData = '1';

  await axiosApiInstance
    .post(API.REPORT + reportName, JSON.stringify(pdfQuery), tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_REPORT_PDF,
        payload: res.data,
        pagination: res.data.pagination,
      });

      setShowPrint(true);

      pdfQuery.showData = '2';

      setTimeout(() => {
        setTruncateData(false);
        dispatch(getReport(pdfQuery, reportName));
      }, 1000);
    })
    .catch((err) => {
      dispatch({
        type: ACTION_TYPES.GET_REPORT_PDF,
        payload: {},
      });
    });
};

export const exportExcelTransmitted = async (columnparams, dataParams, columnName, reportName) => {
  // console.log(paramsQuery, 'paramsss')
  const paramsQuery = new URLSearchParams(columnparams).toString();
  const toStringData = dataParams.toString();

  const res = await axiosApiInstance
    .get(
      API.EXPORT_DOWNLOAD + reportName + '?' + `${paramsQuery}${columnName}${toStringData}`,
      // @ts-ignore
      tokenConfigBlob()
    )
    .then((response) => response)
    .catch((err) => err.response);
  return res;
};

export const tableQuery = (body) => (dispatch, getState) => {
  let tableQueryObject = {};

  if (body === 'Recorded and Transmitted Requests') {
    tableQueryObject = getState().report.tableQueryTransmittedRecord;
  } else if (body === 'Messenger Monitoring') {
    tableQueryObject = getState().report.tableQueryMonitoring;
  } else if (body === 'Document Lost in Transit') {
    tableQueryObject = getState().report.tableQueryLostInTransit;
  } else if (body === 'Urgent Requests') {
    tableQueryObject = getState().report.tableQueryUrgentRequest;
  } else if (body === 'Cancelled Requests') {
    tableQueryObject = getState().report.tableQueryCancelledRequest;
  } else if (body === 'Intellicare and Avega Requests') {
    tableQueryObject = getState().report.tableQueryIntellicareAvegaRequest;
  } else if (body === 'Scheduled Requests') {
    tableQueryObject = getState().report.tableQueryScheduledRequest;
  } else if (body === 'Statistics per Department') {
    tableQueryObject = getState().report.tableQueryStatisticsPerDepartment;
  }

  dispatch({ type: ACTION_TYPES.TABLE_QUERY, payload: tableQueryObject });
};

export const setStatus = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.REQUEST_STATUS,
    payload: data,
  });

  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const sortingReport = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.REPORT_SORTING,
    payload: data,
  });

  dispatch(getReport(getState().report.tableQuery, reportName));
};

export const setRequestType = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.REQUEST_TYPE,
    payload: data,
  });

  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setAreaType = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.AREA_TYPE,
    payload: data,
  });

  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setDepartmentTransmitted = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_DEPARTMENT_TRANSMITTED,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setHmoTransmitted = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_HMO_TRANSMITTED,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setLostDepartment = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_LOST_DEPARTMENT,
    payload: data,
  });

  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setUrgentDepartment = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_URGENT_DEPARTMENT,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setHmoLost = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_HMO_LOST,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setHmoUrgent = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_HMO_URGENT,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const getFilteredDate = (start, end) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.FILTERED_DATE,
    start: start,
    end: end,
  });
};

export const setPageNumber = (data, reportName) => async (dispatch, getState) => {
  // dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
  dispatch({
    type: ACTION_TYPES.PAGE_NUM,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
};

export const setTransmittal = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_TRANSMITTAL_NO,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // dispatch(loadRequestPR());
};

export const setTransmittalIntellicareAvega = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_TRANSMITTAL_NO_INTELLICARE_AVEGA,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // dispatch(loadRequestPR());
};

export const setUrgentRequestor = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_URGENT_REQUESTOR,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // dispatch(loadRequestPR());
};

export const setLostRequestor = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_LOST_REQUESTOR,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // dispatch(loadRequestPR());
};

export const setCancelledRequestor = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_CANCELLED_REQUESTOR,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // dispatch(loadRequestPR());
};

export const setIntellicareAvegaRequestor = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_INTELLICARE_AVEGA_REQUESTOR,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // dispatch(loadRequestPR());
};

export const setScheduledRequestor = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_SCHEDULED_REQUESTOR,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // dispatch(loadRequestPR());
};

export const setIntellicareAvegaRequestType = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_INTELLICARE_AVEGA_REQUEST_TYPE,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  // dispatch(loadRequestPR());
};

export const setDepartmentCancelled = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_CANCELLED_DEPARTMENT,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setDepartmentIntellicareAvega = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_INTELLICARE_AVEGA_DEPARTMENT,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setDepartmentScheduled = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_SCHEDULED_DEPARTMENT,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setDepartmentStatisticsPerDepartment = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_STATISTICS_DEPARTMENT,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setHmoCancelled = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_HMO_CANCELLED,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setHmoIntellicareAvega = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_HMO_INTELLICARE_AVEGA,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setHmoScheduled = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_HMO_SCHEDULED,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setHmoStatisticsPerDepartment = (data, reportName) => (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_HMO_STATISTICS,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });
};

export const setRequestor = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_REQUESTOR,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  // dispatch(loadRequestPR());
};

export const setMessenger = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_MESSENGER,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  // dispatch(loadRequestPR());
};

export const setMessengerLost = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_MESSENGER_LOST,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  // dispatch(loadRequestPR());
};

export const setMessengerMonitoring = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.SET_MESSENGER_MONITORING,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  // dispatch(loadRequestPR());
};

export const getAdmin = (data, reportName) => async (dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.GET_ADMIN,
    payload: data,
  });
  dispatch(getReport(getState().report.tableQuery, reportName));
  // dispatch(loadRequestPR());
};

export const setQuery = (data, queryName, reportName) => async (dispatch, getState) => {
  if (queryName === 'dateScanned') {
    dispatch({
      type: ACTION_TYPES.SET_DATE_SCANNED,
      payload: data,
    });
  } else if (queryName === 'dateCreated') {
    dispatch({
      type: ACTION_TYPES.SET_DATE_CREATE_LOST,
      payload: data,
    });
  } else if (queryName === 'dateUpload') {
    dispatch({
      type: ACTION_TYPES.SET_DATE_UPLOAD,
      payload: data,
    });
  } else if (queryName === 'dateLost') {
    dispatch({
      type: ACTION_TYPES.SET_LOST_DATE,
      payload: data,
    });
  } else if (queryName === 'date_scanned' && reportName === 'urgentRequest') {
    dispatch({
      type: ACTION_TYPES.SET_URGENT_DATE,
      payload: data,
    });
  } else if (queryName === 'date_scanned' && reportName === 'cancelledRequestsReport') {
    dispatch({
      type: ACTION_TYPES.SET_DATE_SCANNED_CANCEL,
      payload: data,
    });
  } else if (queryName === 'date_scanned' && reportName === 'partnerRequestsReport') {
    dispatch({
      type: ACTION_TYPES.SET_DATE_SCANNED_INTELLICARE_AVEGA,
      payload: data,
    });
  } else if (queryName === 'date_cancelled') {
    dispatch({
      type: ACTION_TYPES.SET_DATE_CANCELLED,
      payload: data,
    });
  } else if (queryName === 'date_created' && reportName === 'scheduledRequestsReport') {
    dispatch({
      type: ACTION_TYPES.SET_DATE_CREATED_SCHEDULED,
      payload: data,
    });
  } else if (queryName === 'schedule_date' && reportName === 'scheduledRequestsReport') {
    dispatch({
      type: ACTION_TYPES.SET_DATE_SCHEDULED,
      payload: data,
    });
  }

  dispatch(getReport(getState().report.tableQuery, reportName));
  // dispatch(loadRequestPR());
};

export const excelReportLoading = (bool) => {
  return {
    type: ACTION_TYPES.EXCEL_REPORT_LOADING,
    payload: bool,
    excel: bool,
  };
};

export const getAllDepartment = () => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.REQUEST_LOADING });

  await axiosApiInstance
    .get(API.GET_ALL_DEPARTMENT, tokenConfig(getState))
    .then((res) => {
      let departmentArr = [{ id: 0, code: 0, text: 'All' }];

      console.log(res.data.data, 'DEPARTMENT DATA');
      for (const item of res.data.data) {
        departmentArr.push({ id: item.id, code: item.name, text: item.name });
      }

      dispatch({
        type: ACTION_TYPES.GET_ALL_DEPARTMENT,
        payload: departmentArr,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// //BLOB
// Setup config/Headers and token
export const tokenConfigBlob = (getState) => {
  // Get token from local storage
  // const token = getState().auth.token;
  const token = localStorage.getItem('token');

  // Headers
  const config = {
    responseType: 'blob',
    headers: {},
  };

  // If token, add to headers
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
};
