/* eslint-disable camelcase */
/* eslint-disable no-case-declarations */
import * as ACTION from '../actions/action_types';
import moment from 'moment';

moment.locale();

const initialState = {
  notifications: [],
  newNotif: [],
  newNotifCount: 0,
  currentOpen: [],
  notifLoading: false,
  freshNotif: false,
  viewedNotif: false,
  pageParams: {
    itemLimit: 10,
    skipItem: 0,
  },
  has_next: true,
  viewOlderLoad: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.data.data,
        pageParams: {
          ...state.pageParams,
          skipItem: action.payload.pagination.skip_item,
        },
        has_next: action.payload.pagination.has_next,
        notifLoading: false,
      };
    case ACTION.VIEW_OLDER_NOTIF:
      const allnotif = [...state.notifications, ...action.payload.data.data];
      return {
        ...state,
        notifications: allnotif,
        viewOlderLoad: false,
        pageParams: {
          ...state.pageParams,
          skipItem: action.payload.pagination.skip_item,
        },
        has_next: action.payload.pagination.has_next,
      };
    case ACTION.UNREAD_NOTIFICATIONS:
      return {
        ...state,
        newNotif: action.payload.data,
        notifLoading: false,
      };
    case ACTION.MARK_AS_READ:
      const updateDataNotifAll = [...state.notifications];
      const updateDataNotif = [...state.newNotif];

      let content_data = {};

      if (updateDataNotif.length > 0) {
        const getNotifNew = updateDataNotif.findIndex((notification) => notification.id === action.payload.itemId);

        if (getNotifNew > -1) {
          updateDataNotif[getNotifNew].is_read = true;

          content_data = {
            ...state,
            newNotif: updateDataNotif,
            currentOpen: action.payload.data,
            notifLoading: false,
          };
        }
      }

      if (updateDataNotifAll.length > 0) {
        const getNotifAll = updateDataNotifAll.findIndex((notification) => notification.id === action.payload.itemId);
        updateDataNotifAll[getNotifAll].is_read = true;

        content_data = {
          ...state,
          notifications: updateDataNotifAll,
          newNotif: updateDataNotif,
          currentOpen: action.payload.data,
          notifLoading: false,
        };
      }

      return content_data;
    case ACTION.NOTIFICATION_COUNT:
      return {
        ...state,
        newNotifCount: action.payload.data,
        notifLoading: false,
      };
    case ACTION.NOTIFICATION_LOADING:
      return {
        ...state,
        notifLoading: true,
      };
    case ACTION.VIEW_OLDER_LOAD:
      return {
        ...state,
        viewOlderLoad: true,
      };
    case ACTION.SKIP_ITEM_DEFAULT:
      return {
        ...state,
        notifications: [],
        pageParams: {
          ...state.pageParams,
          skip_item: 0,
        },
      };
    case ACTION.FRESH_NOTIF:
      return {
        ...state,
        freshNotif: action.payload,
      };
    case ACTION.VIEWED_NOTIF:
      return {
        ...state,
        viewedNotif: action.payload,
      };
    default:
      return state;
  }
}
