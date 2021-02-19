/* eslint-disable require-jsdoc */
import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  reqLoading: false,
  order: false,
  contactData: [],
  contactPagination: null,
  contactInfo: {},
  searchParams: {
    type: 'doctors_dentists',
    keyword: '',
    pageLimit: 10,
    pageNum: 1,
    sortBy: '',
    orderBy: '',
  },
  contactStatus: '',
  contactType: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.LOADING_CONTACT:
      return {
        ...state,
        reqLoading: true,
      };
    case ACTION_TYPES.SEARCH_CONTACT:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          keyword: action.payload,
          pageLimit: 10,
          pageNum: 1,
        },
      };
    case ACTION_TYPES.FILTER_CONTACT_STATUS:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageLimit: 10,
          pageNum: 1,
        },
        contactStatus: action.payload,
      };
    case ACTION_TYPES.FILTER_CONTACT_TYPE:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageLimit: 10,
          pageNum: 1,
          type: action.payload,
        },
      };

    case ACTION_TYPES.FILTER_CONTACT_TYPE_BROKER:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageLimit: 10,
          pageNum: 1,
        },
        contactType: action.payload,
      };
    case ACTION_TYPES.SORT_CONTACT_TABLE:
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
    case ACTION_TYPES.PAGE_NO_CONTACT:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageNum: action.payload,
        },
        reqLoading: false,
      };
    case ACTION_TYPES.PAGE_LIMIT_CONTACT:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          pageLimit: action.payload,
          pageNum: 1,
        },
        reqLoading: false,
      };
    case ACTION_TYPES.CLEAR_CONTACT_DETAILS:
      console.log('CLEAR_CONTACT_DETAILS');
      return {
        ...state,
        contactInfo: {},
        reqLoading: false,
      };
    case ACTION_TYPES.VIEW_CONTACT_DETAILS:
      return {
        ...state,
        contactInfo: action.payload,
        reqLoading: false,
      };
    case ACTION_TYPES.ALL_CONTACT:
      return {
        ...state,
        contactData: action.contact,
        contactPagination: action.pagination,
        reqLoading: false,
      };
    case ACTION_TYPES.CLEAR_CONTACT_SEARCH:
      return {
        ...state,
        reqLoading: false,
        order: false,
        contactData: [],
        contactPagination: null,
        contactInfo: {},
        searchParams: {
          type: 'doctors_dentists',
          keyword: '',
          pageLimit: 10,
          pageNum: 1,
          sortBy: '',
          orderBy: '',
        },
        contactStatus: '',
        contactType: '',
      };
    default:
      return state;
  }
}
