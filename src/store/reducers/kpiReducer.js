import * as ACTION from '../actions/action_types';

const initialState = {
  receivedVsProcess: {},
  notDelivered: {},
  performanceIndicator: {},
  monthyProductivity: {},
  reqLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_PERCENTAGE_PROCESSED:
      return {
        ...state,
        receivedVsProcess: action.payload.percentage,
        reqLoading: false,
      };
    case ACTION.LOADING_KPI:
      return {
        ...state,
        reqLoading: action.payload,
      };
    case ACTION.GET_INDICATOR:
      return {
        ...state,
        performanceIndicator: action.payload,
        reqLoading: false,
      };
    case ACTION.GET_NOT_DELIVERED:
      return {
        ...state,
        notDelivered: action.payload,
        reqLoading: false,
      };
    case ACTION.GET_MONTHLY_PRODUCTIVITY:
      return {
        ...state,
        monthyProductivity: action.payload,
        reqLoading: false,
      };
    default:
      return state;
  }
}
