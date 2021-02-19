import * as ACTION from './action_types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => ({
  type: ACTION.GET_ERRORS,
  payload: { msg, status, id },
});

// CLEAR ERRORS
export const clearErrors = () => ({
  type: ACTION.CLEAR_ERRORS,
});
