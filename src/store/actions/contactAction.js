// import axios from 'axios';
import * as ACTION_TYPES from './action_types';
import * as API from '../../utils/Constants';
import { toast } from 'react-toastify';
import { axiosApiInstance } from '../../utils/apiConfig';

export const clearContactSearch = () => (dispatch) => {
  dispatch({ type: ACTION_TYPES.CLEAR_CONTACT_SEARCH });
};

export const setContactSearch = (keyword, buttonActive) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.SEARCH_CONTACT,
    payload: keyword,
  });

  dispatch(allContact(buttonActive));
};

export const setContactFilterStatus = (status, buttonActive) => (dispatch) => {
  dispatch({ type: ACTION_TYPES.FILTER_CONTACT_STATUS, payload: status });

  dispatch(allContact(buttonActive));
};

export const setContactFilterType = (type, buttonActive) => (dispatch) => {
  if (buttonActive === 'partner_networks') {
    dispatch({ type: ACTION_TYPES.FILTER_CONTACT_TYPE, payload: type });
  }

  if (buttonActive === 'brokers_and_agents') {
    dispatch({ type: ACTION_TYPES.FILTER_CONTACT_TYPE_BROKER, payload: type });
  }

  dispatch(allContact(buttonActive));
};

export const onSortFilter = (orderBy, orderDirection, order, buttonActive) => (dispatch, getState) => {
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
    type: ACTION_TYPES.SORT_CONTACT_TABLE,
    payload: data,
    orderBy: newOrder,
    newOrder: currOrder,
  });

  dispatch(allContact(buttonActive));
};

export const setPaginationPageContact = (pageNumber, buttonActive) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.PAGE_NO_CONTACT,
    payload: pageNumber,
  });

  dispatch(allContact(buttonActive));
};

export const setPageLimitContact = (pageLimit, buttonActive) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.PAGE_LIMIT_CONTACT,
    payload: pageLimit,
  });

  dispatch(allContact(buttonActive));
};

export const viewContactDetails = (contactId, buttonActive) => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.LOADING_CONTACT });
  let contactApi;

  if (buttonActive === 'employee') {
    contactApi = API.ALL_CONTACT_EMPLOYEE;
  } else if (buttonActive === 'departments') {
    contactApi = API.ALL_DEPARTMENT;
  } else if (buttonActive === 'partner_networks') {
    contactApi = API.PARTNER_NETWORKS;
  } else if (buttonActive === 'brokers_and_agents') {
    contactApi = API.ALL_CONTACT_BROKERS_AGENTS;
  }

  console.log(contactId, 'iddddddd');

  await axiosApiInstance
    .get(`${contactApi}/${contactId}`, tokenConfig())
    .then((res) => {
      console.log('VIEW_CONTACT_DETAILS', res.data.data);
      dispatch({
        type: ACTION_TYPES.VIEW_CONTACT_DETAILS,
        payload: res.data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const clearContactDetails = () => {
  return {
    type: ACTION_TYPES.CLEAR_CONTACT_DETAILS,
  };
};

export const archiveContact = (contactId, status, buttonActive, contactType) => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.LOADING_CONTACT });

  let contactApi;
  let message;

  if (buttonActive === 'employee') {
    contactApi = API.ALL_CONTACT_EMPLOYEE;

    if (status === 'archive') {
      message = 'Employee contact has been successfully archived.';
    } else {
      message = 'Employee contact has been successfully activated.';
    }
  } else if (buttonActive === 'departments') {
    contactApi = API.ALL_DEPARTMENT;

    if (status === 'archive') {
      message = 'Department contact has been successfully archived.';
    } else {
      message = 'Department contact has been successfully activated.';
    }
  } else if (buttonActive === 'brokers_and_agents') {
    contactApi = API.ALL_CONTACT_BROKERS_AGENTS;

    if (status === 'archive') {
      if (contactType === 'BROKERS') {
        message = 'Broker contact has been successfully archived.';
      } else {
        message = 'Agent contact has been successfully archived.';
      }
    } else {
      if (contactType === 'BROKERS') {
        message = 'Broker contact has been successfully activated.';
      } else {
        message = 'Agent contact has been successfully activated.';
      }
    }
  }

  let params = {
    action: status,
  };

  const paramsQuery = new URLSearchParams(params).toString();

  const token = localStorage.getItem('token');

  const config = {
    method: 'put',
    url: `${contactApi}/${contactId}?${paramsQuery}`,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  await axiosApiInstance(config)
    .then((res) => {
      toast.success(message);
      dispatch(viewContactDetails(res.data.data._id, buttonActive));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveNewContact = (contactData, buttonActive, setOpenFormView, handleOpenNewContact) => async (
  dispatch
) => {
  dispatch({ type: ACTION_TYPES.LOADING_CONTACT });
  let contactApi;
  let message;

  if (buttonActive === 'employee') {
    contactApi = API.ALL_CONTACT_EMPLOYEE;
    message = 'Employee contact has been successfully added';
  }

  if (buttonActive === 'departments') {
    contactApi = API.ALL_DEPARTMENT;
    message = 'Department contact has been successfully added';
  }

  if (buttonActive === 'brokers_and_agents') {
    contactApi = API.ALL_CONTACT_BROKERS_AGENTS;

    if (contactData.type === 'BROKERS') {
      message = 'Broker contact has been successfully added';
    } else {
      message = 'Agent contact has been successfully added';
    }
  }

  await axiosApiInstance
    .post(contactApi, contactData, tokenConfig())
    .then((res) => {
      dispatch(viewContactDetails(res.data.data._id, buttonActive));
      toast.success(message);
      handleOpenNewContact(false);
      setOpenFormView(true);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      // dispatch(allContact(buttonActive));
    });
};

export const saveEditContact = (
  contactId,
  contactData,
  buttonActive,
  handleOpenEditContact,
  setOpentContactDetails
) => async (dispatch) => {
  dispatch({ type: ACTION_TYPES.LOADING_CONTACT });
  let contactApi;
  let message;

  if (buttonActive === 'employee') {
    contactApi = API.ALL_CONTACT_EMPLOYEE;
    message = 'Employee contact has been successfully saved';
  }

  if (buttonActive === 'departments') {
    contactApi = API.ALL_DEPARTMENT;
    message = 'Department contact has been successfully saved';
  }

  await axiosApiInstance
    .put(`${contactApi}/${contactId}`, contactData, tokenConfig())
    .then((res) => {
      dispatch(viewContactDetails(res.data.data._id, buttonActive));
      toast.success(message);
      handleOpenEditContact(false);
      setOpentContactDetails(true);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const allContact = (buttonActive) => async (dispatch, getState) => {
  dispatch({ type: ACTION_TYPES.LOADING_CONTACT });

  let params = getState().contact.searchParams;

  if (buttonActive !== 'partner_networks') {
    params.status = getState().contact.contactStatus;
  }

  if (buttonActive === 'brokers_and_agents') {
    params.type = getState().contact.contactType;
  }

  const paramsQuery = new URLSearchParams(params).toString();

  let contactApi;

  if (buttonActive === 'employee') {
    contactApi = API.ALL_CONTACT_EMPLOYEE;
  } else if (buttonActive === 'departments') {
    contactApi = API.ALL_DEPARTMENT;
  } else if (buttonActive === 'partner_networks') {
    contactApi = API.PARTNER_NETWORKS;
  } else if (buttonActive === 'brokers_and_agents') {
    contactApi = API.ALL_CONTACT_BROKERS_AGENTS;
  }

  await axiosApiInstance
    .get(`${contactApi}?${paramsQuery}`, tokenConfig())
    .then((res) => {
      if (res.data.data.length < 1) {
        toast.error('No records found');
      }

      dispatch({
        type: ACTION_TYPES.ALL_CONTACT,
        contact: res.data.data,
        pagination: res.data.pagination,
      });
    })
    .catch((err) => {
      console.log(err);
    });
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
