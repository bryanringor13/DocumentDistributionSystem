import * as ACTION from './action_types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: ACTION.GET_ERRORS,
    payload: { msg, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: ACTION.CLEAR_ERRORS,
  };
};
