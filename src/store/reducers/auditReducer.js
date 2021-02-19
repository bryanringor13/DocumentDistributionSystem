/* eslint-disable require-jsdoc */
import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
    data: [],
    order: false,
    searchParams: {
        keyword: '',
        pageLimit: 10,
        pageNum: 1,
        sortBy: '',
        orderBy: '',
    },
    pagination: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.AUDIT_LOGS:
            console.log('AUDIT_LOGS', action.payload)
            return {
                ...state,
                data: action.payload.data,
                pagination: action.payload.pagination
            }
        case ACTION_TYPES.PAGE_NO_AUDIT:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    pageNum: action.payload,
                },
                loading: false,
            };
        case ACTION_TYPES.PAGE_LIMIT_AUDIT:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    pageLimit: action.payload,
                    pageNum: 1,
                },
                loading: false,
            };
        case ACTION_TYPES.SORT_AUDIT_TABLE:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    sortBy: action.payload,
                    orderBy: action.orderBy,
                },
                order: action.newOrder,
                loading: false,
            };
        case ACTION_TYPES.LOADING_AUDIT:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
  }
}
