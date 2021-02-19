import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  user: null,
  user_info: [],
  loading: false,
  reqLoading: false,
  requestorList: '',
  hims_department_name: '',
  hims_hmo_partner_id: '',
  request: [],
  request_info: {},
  table: null,
  order: false,
  searchParams: {
    keyword: '',
    start_date: '',
    end_date: '',
    pageLimit: 10,
    pageNum: 1,
    sortBy: '',
    orderBy: '',
    request_type: '',
    repeats: '',
  },
  tableCount: {},
  loadingPartner: false,
  loadingRequestor: false,
  reqLoading: false,
  openTransmittalRequest: false,
  openScheduledRequest: false,
  scheduledReqMenu: false,
  activeTab: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.LOADING_PARTNER:
      return {
        ...state,
        loadingPartner: action.payload,
      };
    case ACTION_TYPES.LOADING_REQUESTOR:
      return {
        ...state,
        loadingRequestor: action.payload,
      };
    case ACTION_TYPES.NEW_SCHEDULE:
      return {
        ...state,
        table: action.payload.data,
        pagination: action.pagination,
        reqLoading: false,
      };
    case ACTION_TYPES.LIST_REQUESTOR:
      return {
        ...state,
        requestorList: action.payload,
        reqLoading: false,
      };
    case ACTION_TYPES.REQUESTOR_DATA_SCHEDULE:
      return {
        ...state,
        hims_department_name: action.payload.hims_department_name,
        hims_hmo_partner_id: action.payload.hims_hmo_partner_id,
        reqLoading: false,
      };
    case ACTION_TYPES.REQUEST_LOADING_SCHEDULE:
      return {
        ...state,
        reqLoading: true,
      };
    case ACTION_TYPES.ALL_SCHEDULED_REQUEST:
      return {
        ...state,
        request: action.scheduled_request,
        table: action.pagination,
        reqLoading: false,
      };
    case ACTION_TYPES.HISTORY_SCHEDULED_REQUEST:
      return {
        ...state,
        request: action.scheduled_request,
        table: action.pagination,
        reqLoading: false,
      };
    case ACTION_TYPES.TABLE_COUNT_SCHEDULE:
      return {
        ...state,
        tableCount: action.payload,
      };
    case ACTION_TYPES.PAGE_NO_SCHEDULE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageNum: action.payload,
        },
        reqLoading: false,
      };
    case ACTION_TYPES.PAGE_LIMIT_SCHEDULE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageLimit: action.payload,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION_TYPES.SORT_FILTER_SCHEDULE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          sortBy: action.payload,
          orderBy: action.orderBy,
        },
        order: action.newOrder,
        reqLoading: false,
      };
    case ACTION_TYPES.FILTER_TYPE_SCHEDULE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          request_type: action.payload,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION_TYPES.FILTER_REPEATS_SCHEDULE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          repeats: action.payload,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION_TYPES.SEARCH_SCHEDULE_REQUEST:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          keyword: action.payload,
          pageLimit: 10,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION_TYPES.FILTER_DATE_RANGE_SCHEDULE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          start_date: action.payload.start_date,
          end_date: action.payload.end_date,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION_TYPES.VIEW_SCHEDULED_REQUEST:
      return {
        ...state,
        request_info: action.payload,
        reqLoading: false,
      };
    case ACTION_TYPES.OPEN_TRANSMITTAL_REQUEST:
      return {
        ...state,
        openTransmittalRequest: true,
        openScheduledRequest: false,
      };
    case ACTION_TYPES.OPEN_SCHEDULED_REQUEST:
      return {
        ...state,
        openTransmittalRequest: false,
        openScheduledRequest: true,
      };
    case ACTION_TYPES.CLOSE_VIEW_REQUEST:
      return {
        ...state,
        openTransmittalRequest: false,
        openScheduledRequest: false,
      };
    case ACTION_TYPES.IN_SCHEDULED_REQUEST_MENU:
      return {
        ...state,
        scheduledReqMenu: action.payload,
      };
    case ACTION_TYPES.SCHEDULED_REQUEST_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    case ACTION_TYPES.CLEAR_SCHEDULE_REQUEST_SEARCH:
      return {
        ...state,
        user: null,
        user_info: [],
        request: [],
        request_info: {},
        table: null,
        order: false,
        searchParams: {
          keyword: '',
          start_date: '',
          end_date: '',
          pageLimit: 10,
          pageNum: 1,
          sortBy: '',
          orderBy: '',
          request_type: '',
          repeats: '',
        },
        reqLoading: false,
        openTransmittalRequest: false,
        openScheduledRequest: false,
        scheduledReqMenu: false,
        activeTab: '',
      };
    default:
      return state;
  }
}
