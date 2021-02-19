import * as ACTION from '../actions/action_types';

const initialState = {
  request: [],
  request_filter: [],
  request_info: [],
  reqLoading: false,
  searchParams: {
    keyword: '',
    pageLimit: 10,
    pageNum: 1,
    sortBy: '',
    orderBy: '',
    location: '',
  },
  table: null,
  modal: null,
  onShowEdit: false,
  order: false,
  box_no: [],
  newMessenger: {},
  messengerDetails: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.SHOW_MESSENGER:
      return {
        ...state,
        box_no: action.payload,
        messengerDetails: action.messenger,
        reqLoading: false,
      };
    case ACTION.ALL_MESSENGER:
      return {
        ...state,
        request: action.payload.data,
        table: action.payload.pagination,
        reqLoading: false,
      };
    case ACTION.SORT_FILTER:
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
    case ACTION.NEW_MESSENGER_INFO:
      return {
        ...state,
        newMessenger: action.payload,
      };
    case ACTION.NEW_MESSENGER_INFO_RESET:
      return {
        ...state,
        newMessenger: {},
      };
    case ACTION.MESSENGER_DETAILS:
      return {
        ...state,
        modal: action.payload,
        onShowEdit: action.onShowEdit,
        reqLoading: false,
      };
    case ACTION.SHOW_EDIT:
      return {
        ...state,
        onShowEdit: action.payload,
        reqLoading: false,
      };
    case ACTION.LOCATION_MESSENGER:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          location: action.payload,
        },
        reqLoading: false,
      };
    case ACTION.REQUEST_LOADING:
      return {
        ...state,
        reqLoading: true,
      };
    case ACTION.PAGE_LIMIT_MESSENGER:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageLimit: action.payload,
        },
        reqLoading: false,
      };
    case ACTION.PAGE_NO_MESSENGER:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageNum: action.payload,
        },
        reqLoading: false,
      };
    case ACTION.CLEAR_NEWMESSENGER:
      return {
        ...state,
        newMessenger: {},
        reqLoading: false,
      };
    case ACTION.FILTER_MESSENGER:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          keyword: action.payload,
        },
        reqLoading: false,
      };
    case ACTION.MESSENGER_LOADING:
      return {
        ...state,
        reqLoading: action.payload,
      };
    case ACTION.CLEAR_MESSENGER_FILTER:
      return {
        ...state,
        request: [],
        request_filter: [],
        request_info: [],
        reqLoading: false,
        searchParams: {
          keyword: '',
          pageLimit: 10,
          pageNum: 1,
          sortBy: '',
          orderBy: '',
          location: '',
        },
        table: null,
        modal: null,
        onShowEdit: false,
        order: false,
        box_no: [],
        newMessenger: {},
        messengerDetails: '',
      };
    default:
      return state;
  }
}
