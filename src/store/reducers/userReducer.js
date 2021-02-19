import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  user: null,
  user_info: [],
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ALL_USERS:
      return {
        ...state,
        developer: action.payload,
        loading: false,
      };
    case ACTION_TYPES.GET_USER:
      return {
        get_info: state.developer.filter((user) => user.id === action.payload),
        loading: false,
      };
    case ACTION_TYPES.DELETE_USER:
      return {
        ...state,
        developer: state.developer.filter((user) => user.id !== action.payload),
        loading: false,
      };
    case ACTION_TYPES.PROCESS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
