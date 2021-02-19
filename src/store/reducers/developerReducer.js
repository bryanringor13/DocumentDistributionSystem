import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  developer: [],
  developer_info: [],
  loading: false,
};

const developerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ALL_DEVELOPERS:
      return {
        ...state,
        developer: action.payload,
        loading: false,
      };
    case ACTION_TYPES.GET_DEVELOPER:
      return {
        ...state,
        developer_info: state.developer.filter((developer) => developer._id === action.payload),
        loading: false,
      };
    case ACTION_TYPES.ADD_DEVELOPER:
      return {
        ...state,
        developer: [action.payload, ...state.developer],
        loading: false,
      };
    case ACTION_TYPES.DELETE_DEVELOPER:
      return {
        ...state,
        developer: state.developer.filter((developer) => developer._id !== action.payload),
        loading: false,
      };
    case ACTION_TYPES.DEVELOPER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default developerReducer;
