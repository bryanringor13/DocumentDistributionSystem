// import axios from 'axios';
import * as ACTION_TYPES from './action_types';
import * as API from '../../utils/Constants';
import { toast } from 'react-toastify';
import { axiosApiInstance } from '../../utils/apiConfig';


export const auditLogs = () => async (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.LOADING_AUDIT });

    let params = getState().audit.searchParams;

    const paramsQuery = new URLSearchParams(params).toString();

    await axiosApiInstance
        .get(`${API.AUDIT_LOGS}?${paramsQuery}`, tokenConfig())
        .then((res) => {

            if (res.data.data.length < 1) {
                toast.error('No records found');
            }

            dispatch({
                type: ACTION_TYPES.AUDIT_LOGS,
                payload: {
                    data: res.data.data,
                    pagination: res.data.pagination,
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const setPaginationPageAudit = (pageNumber) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.PAGE_NO_AUDIT,
    payload: pageNumber,
  });

  dispatch(auditLogs());
};

export const setPageLimitAudit = (pageLimit) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.PAGE_LIMIT_AUDIT,
    payload: pageLimit,
  });

  dispatch(auditLogs());
};

export const onSortFilter = (orderBy, orderDirection, order) => (dispatch, getState) => {
  let newData = {};

  if (buttonActive === 'employee') {
    newData = {
      code: '123',
      name: 'Erika mae Cruz',
      contact_person: 'ricka mae',
      department: 'Cashering',
      contact_no: '0999999',
      address: '138 makati city',
    };
  } else if (buttonActive === 'departments') {
    newData = {
      code: '456',
      name: 'Intellicare',
      contact_person: 'John Doe',
      contact_no: '09123456789',
      address: '123 Pluto St., Ortigas, Pasig CIty',
      remarks: 'Some notes here to read.',
      status: 'ACTIVE',
    };
  } else if (buttonActive === 'brokers_and_agents') {
    newData = {
      code: '789',
      name: 'Company Name',
      type: 'Brokers',
      contact_person: 'John Doe',
      contact_no: '09123456789',
      address: '123 Pluto St., Ortigas, Pasig CIty',
    };
  }

  const data = Object.keys(newData)[orderBy];

  let newOrder;
  let currOrder = order;

  if (getState().contact.searchParams.sortBy.length === 0) {
    currOrder = true;
    newOrder = 'asc';
  } else {
    if (data === getState().contact.searchParams.sortBy) {
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
    type: ACTION_TYPES.SORT_AUDIT_TABLE,
    payload: data,
    orderBy: newOrder,
    newOrder: currOrder,
  });

  dispatch(auditLogs());
};

// Setup config/Headers and tok`en
export const tokenConfig = () => {
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
