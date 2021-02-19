/* eslint-disable no-case-declarations */
/* eslint-disable no-extra-boolean-cast */
import * as ACTION from '../actions/action_types';
import moment from 'moment';

moment.locale();

const initialState = {
  request: [],
  boxContent: {},
  request_filter: [],
  request_info: [],

  audit_logs: [],
  print_info: null,
  new_info: null,
  cancel_req: null,
  reqLoading: false,
  searchParams: {
    keyword: '',
    dateFrom: '',
    dateTo: '',
    pageLimit: 10,
    pageNum: 1,
    prevPageLimit: 10,
    prevPageNum: 1,
    sortBy: '',
    orderBy: '',
    requestType: 0,
    trackingStatus: 0,
  },
  searchParamsInitial: {
    keyword: '',
    pageLimit: 10,
    pageNum: 1,
    sortBy: '',
    orderBy: '',
    location: '',
  },
  searchParamsView: {
    keyword: '',
    dateFrom: '',
    dateTo: '',
    pageLimit: 10,
    pageNum: 1,
    sortBy: '',
    orderBy: '',
    requestType: 0,
  },
  scanData: '',
  scanLoading: false,
  table: null,
  tableView: null,
  order: false,
  getRequestCount: '',
  boxLoad: false,
  summaryList: {},
  boxNo: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ALL_REQUEST:
      return {
        ...state,
        request: action.payload.data,
        table: action.payload.pagination,
        new_info: null,
        reqLoading: false,
      };
    case ACTION.REMOVE_BOX_DATA: {
      return {
        ...state,
        summaryList: {},
        boxLoad: true,
      };
    }
    case ACTION.GET_BOX_CONTENT_SUMMARY:
      return {
        ...state,
        summaryList: action.payload,
        boxLoad: false,
      };
    case ACTION.GET_ALL_COUNT_REQUEST:
      return {
        ...state,
        getRequestCount: action.payload,
      };

    case ACTION.GET_BOX_CONTENT:
      return {
        ...state,
        boxContent: action.payload,
        reqLoading: false,
        tableView: action.pagination,
        boxNo: action.payload.messenger.box_no,
      };

    case ACTION.FILTER_VIEW:
      return {
        ...state,
        searchParamsView: {
          ...state.searchParamsView,
          keyword: action.payload,
        },
        reqLoading: false,
      };
    case ACTION.FILTER_REQUEST:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          keyword: action.payload,
        },
        reqLoading: false,
      };
    case ACTION.RANGE_DATE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          dateFrom: action.payload.start_date,
          dateTo: action.payload.end_date,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION.RANGE_DATE_VIEW:
      return {
        ...state,
        searchParamsView: {
          ...state.searchParamsView,
          dateFrom: action.payload.start_date,
          dateTo: action.payload.end_date,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION.FILTER_TYPE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          requestType: action.payload,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION.FILTER_STATUS:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          trackingStatus: action.payload,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION.PAGE_LIMIT_VIEW:
      return {
        ...state,
        searchParamsView: {
          ...state.searchParamsView,
          pageLimit: action.payload,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION.PAGE_LIMIT:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageLimit: action.payload,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION.PAGE_NO:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageNum: action.payload,
        },
        reqLoading: false,
      };
    case ACTION.PAGE_NO_VIEW:
      return {
        ...state,
        searchParamsView: {
          ...state.searchParamsView,
          pageNum: action.payload,
        },
        reqLoading: false,
      };
    case ACTION.SORT_FILTER_TABLE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          sortBy: action.payload,
          orderBy: action.orderBy,
          pageNum: 1,
        },
        order: action.newOrder,
        reqLoading: false,
      };
    case ACTION.SORT_FILTER_TABLE_VIEW:
      return {
        ...state,
        searchParamsView: {
          ...state.searchParamsView,
          sortBy: action.payload,
          orderBy: action.orderBy,
          pageNum: action.pageNum,
        },
        order: action.newOrder,
        reqLoading: false,
      };
    case ACTION.FILTER_TYPE_TABLE_VIEW:
      console.log('FILTER_TYPE_TABLE_VIEW', action.payload);
      return {
        ...state,
        searchParamsView: {
          ...state.searchParamsView,
          requestType: action.payload,
          pageNum: 1,
        },
        order: action.newOrder,
        reqLoading: false,
      };
    case ACTION.SCAN_FORM:
      return {
        ...state,
        scanData: action.payload,
      };
    case ACTION.ORDER_BY:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          orderBy: action.payload,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION.ADD_REQUEST:
      return {
        ...state,
        request: [action.payload.request, ...state.request],
        new_info: action.payload.data,
        reqLoading: false,
      };
    case ACTION.CANCEL_REQUEST:
      return {
        ...state,
        cancel_req: action.payload.data,
        reqLoading: false,
      };
    case ACTION.GET_REQUEST:
      // console.log(action.payload.data);
      // console.log(action.payload);
      let payload;
      if (!!action.payload) {
        payload = action.payload.data;
      } else {
        payload = 'none';
      }

      return {
        ...state,
        request_info: payload,
        reqLoading: false,
      };
    case ACTION.GET_AUDIT_LOGS:
      let audit;
      if (!!action.payload) {
        audit = action.payload.data;
      } else {
        audit = [];
      }
      return {
        ...state,
        audit_logs: audit,
        reqLoading: false,
      };
    case ACTION.GET_PRINT_PREVIEW:
      return {
        ...state,
        print_info: action.payload.data,
        reqLoading: false,
      };
    case ACTION.REQUEST_LOADING:
      return {
        ...state,
        reqLoading: true,
      };
    case ACTION.CANCEL_REQUEST_FAIL:
    case ACTION.ADD_REQUEST_FAIL:
      return {
        ...state,
        reqLoading: false,
      };
    case ACTION.CLEAR_NEW_INFO:
      return {
        ...state,
        request_info: [],
        new_info: null,
        audit_logs: [],
      };
    case ACTION.SET_PREV_PAGE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          prevPageLimit: action.payload.prevPageLimit,
          prevPageNum: action.payload.prevPageNum,
        },
      };
    case ACTION.CLEAR_FILTER_ACTION:
      // eslint-disable-next-line no-undef
      console.log('CLEAR_FILTER_ACTION');
      return {
        ...state,
        searchParamsView: {
          keyword: '',
          dateFrom: '',
          dateTo: '',
          pageLimit: 10,
          pageNum: 1,
          sortBy: '',
          orderBy: '',
        },
      };
    case ACTION.CLEAR_ALL_FILTER:
      return {
        ...state,
        request: [],
        boxContent: {},
        request_filter: [],
        request_info: [],

        audit_logs: [],
        print_info: null,
        new_info: null,
        cancel_req: null,
        reqLoading: false,
        searchParams: {
          keyword: '',
          dateFrom: '',
          dateTo: '',
          pageLimit: 10,
          pageNum: 1,
          prevPageLimit: 10,
          prevPageNum: 1,
          sortBy: '',
          orderBy: '',
          requestType: 0,
          trackingStatus: 0,
        },
        searchParamsInitial: {
          keyword: '',
          pageLimit: 10,
          pageNum: 1,
          sortBy: '',
          orderBy: '',
          location: '',
        },
        searchParamsView: {
          keyword: '',
          dateFrom: '',
          dateTo: '',
          pageLimit: 10,
          pageNum: 1,
          prevPageLimit: 10,
          prevPageNum: 1,
          sortBy: '',
          orderBy: '',
          requestType: 0,
        },
        scanData: '',
        table: null,
        tableView: null,
        order: false,
        getRequestCount: '',
        boxLoad: false,
        summaryList: {},
        boxNo: '',
      };
    case ACTION.SCAN_LOADING:
      return {
        ...state,
        scanLoading: action.payload,
      };
    default:
      return state;
  }
}
