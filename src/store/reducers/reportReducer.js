// @ts-nocheck
/* eslint-disable no-case-declarations */
import * as ACTION from '../actions/action_types';

const initialState = {
  table: {},
  tableQuery: {
    from: '2020-01-01',
    to: '2020-07-22',
    column: [
      {
        name: 'transmittalNo',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'requestor',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'requestType',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'dateScanned',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'admin',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'messenger',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'dateUpload',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'status',
        sort: 'false',
        sortType: '',
        value: '',
      },
    ],

    queryLimit: '10',
    pageNumber: '1',
    showData: '2',
  },
  paramsReport: {
    from: '2020-01-01',
    to: '2020-07-22',
    queryLimit: '10',
    pageNumber: '1',
  },
  searchParams: {
    transmittal_no: '',
    requestor: '',
    request_type: '',
    scanned_at: '',
    assigned_admin_id: '',
    assigned_messenger_id: '',
    created_at: '',
    status: '',
  },
  pagination: {},
  reqLoading: false,
  excelLoading: false,
  department: [],
  tableQueryMonitoring: {
    from: '2020-01-01',
    to: '2020-07-22',
    column: [
      {
        name: 'messenger',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'area',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'forDelivery',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'delivered',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'notDelivered',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'cannotDelivered',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'forPickUp',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'pickedUp',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'notPickedUp',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'cannotPickUp',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'cancelled',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'status',
        sort: 'false',
        sortType: '',
        value: '',
      },
    ],
    queryLimit: '10',
    pageNumber: '1',
    showData: '2',
  },
  tableQueryLostInTransit: {
    from: '2020-01-01',
    to: '2020-07-22',
    column: [
      {
        name: 'transmittalNo',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'item',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'requestor',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'department',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'hmoPartner',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'dateCreated',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'messenger',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'dateLost',
        sort: 'false',
        sortType: '',
        value: '',
      },
    ],
    queryLimit: '10',
    pageNumber: '1',
    showData: '2',
  },
  tableQueryUrgentRequest: {
    from: '2020-01-01',
    to: '2020-07-22',
    column: [
      {
        name: 'transmittal_no',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'item',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'reason_for_urgency',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'requestor',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'department',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'hmo_partner',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'date_scanned',
        sort: 'false',
        sortType: '',
        value: '',
      },
    ],
    queryLimit: '10',
    pageNumber: '1',
    showData: '2',
  },
  tableQueryTransmittedRecord: {
    from: '2020-01-01',
    to: '2020-07-22',
    column: [
      {
        name: 'transmittalNo',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'requestor',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'department',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'hmoPartner',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'requestType',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'dateScanned',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'admin',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'messenger',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'dateUpload',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'status',
        sort: 'false',
        sortType: '',
        value: '',
      },
    ],
    queryLimit: '10',
    pageNumber: '1',
    showData: '2',
  },
  tableQueryCancelledRequest: {
    from: '2020-01-01',
    to: '2020-07-22',
    column: [
      {
        name: 'transmittal_no',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'item',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'reason_for_cancellation',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'requestor',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'department',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'hmo_partner',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'date_scanned',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'date_cancelled',
        sort: 'false',
        sortType: '',
        value: '',
      },
    ],
    queryLimit: '10',
    pageNumber: '1',
    showData: '2',
  },
  tableQueryIntellicareAvegaRequest: {
    from: '2020-01-01',
    to: '2020-07-22',
    column: [
      {
        name: 'hmo_partner',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'department',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'requestor',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'date_scanned',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'transmittal_no',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'request_type',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'item',
        sort: 'false',
        sortType: '',
        value: '',
      },
    ],
    queryLimit: '10',
    pageNumber: '1',
    showData: '2',
  },
  tableQueryScheduledRequest: {
    from: '2020-01-01',
    to: '2020-07-22',
    column: [
      {
        name: 'department_id',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'requestor',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'hmo_partner_id',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'date_created',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'item',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'schedule_date',
        sort: 'false',
        sortType: '',
        value: '',
      },
    ],
    queryLimit: '10',
    pageNumber: '1',
    showData: '2',
  },
  tableQueryStatisticsPerDepartment: {
    from: '2020-01-01',
    to: '2020-07-22',
    column: [
      {
        name: 'department',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'hmo_partner',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'all_requests',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'request_sent',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'for_delivery',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'delivered',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'not_delivered',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'cannot_delivered',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'for_pickup',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'picked_up',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'not_picked_up',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'cannot_pickup',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'in_transit',
        sort: 'false',
        sortType: '',
        value: '',
      },
      {
        name: 'cancelled',
        sort: 'false',
        sortType: '',
        value: '',
      },
    ],
    queryLimit: '10',
    pageNumber: '1',
    showData: '2',
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_REPORT:
      return {
        ...state,
        table: action.payload.data,
        pagination: action.pagination,
        reqLoading: false,
      };
    case ACTION.GET_REPORT_PDF:
      return {
        ...state,
        table: action.payload.data,
        pagination: action.pagination,
        reqLoading: false,
      };
    case ACTION.SET_MESSENGER_MONITORING:
      const tableQueryMessengerMonitoring = state.tableQuery;
      const tableParamsMessengerMonitoring = state.paramsReport;

      tableQueryMessengerMonitoring.pageNumber = '1';
      tableParamsMessengerMonitoring.pageNumber = '1';

      tableQueryMessengerMonitoring.column[0].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryMessengerMonitoring,
        paramsReport: tableParamsMessengerMonitoring,
      };
    case ACTION.TABLE_QUERY:
      return {
        ...state,
        tableQuery: action.payload,
        paramsReport: {
          ...state.paramsReport,
          from: action.payload.from,
          to: action.payload.to,
          queryLimit: action.payload.queryLimit,
          pageNumber: action.payload.pageNumber,
        },
        reqLoading: false,
      };
    case ACTION.PAGE_LIMIT_TRANS:
      const pageLimit = state.tableQuery;
      const paramsPageLimit = state.paramsReport;
      pageLimit.queryLimit = action.payload;
      paramsPageLimit.queryLimit = action.payload;
      paramsPageLimit.pageNumber = '1';
      paramsPageLimit.from = pageLimit.from;
      paramsPageLimit.to = pageLimit.to;
      pageLimit.pageNumber = '1';
      return {
        ...state,
        tableQuery: pageLimit,
        paramsReport: paramsPageLimit,
        // reqLoading: true,
      };
    case ACTION.PAGE_NUM:
      const pageNum = state.tableQuery;
      const paramsPageNum = state.paramsReport;
      pageNum.pageNumber = action.payload;
      paramsPageNum.pageNumber = action.payload;
      paramsPageNum.from = pageNum.from;
      paramsPageNum.to = pageNum.to;

      return {
        ...state,
        tableQuery: pageNum,
        paramsReport: paramsPageNum,
        // reqLoading: true,
      };

    case ACTION.SET_TRANSMITTAL_NO:
      const tableQueryTrans = state.tableQuery;
      const tableParamsTrans = state.paramsReport;

      tableQueryTrans.pageNumber = '1';
      tableParamsTrans.pageNumber = '1';

      tableQueryTrans.column[0].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryTrans,
        paramsReport: tableParamsTrans,
        reqLoading: true,
      };

    case ACTION.SET_URGENT_REQUESTOR:
      const tableQueryUrgentRequestor = state.tableQuery;
      const tableParamsUrgentRequestor = state.paramsReport;

      tableQueryUrgentRequestor.pageNumber = '1';
      tableParamsUrgentRequestor.pageNumber = '1';

      tableQueryUrgentRequestor.column[3].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryUrgentRequestor,
        paramsReport: tableParamsUrgentRequestor,
        reqLoading: true,
      };

    case ACTION.SET_LOST_REQUESTOR:
      const tableQueryLostRequestor = state.tableQuery;
      const tableParamsLostRequestor = state.paramsReport;

      tableQueryLostRequestor.pageNumber = '1';
      tableParamsLostRequestor.pageNumber = '1';

      tableQueryLostRequestor.column[2].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryLostRequestor,
        paramsReport: tableParamsLostRequestor,
        reqLoading: true,
      };
    case ACTION.SET_CANCELLED_REQUESTOR:
      const tableQueryCancelledRequestor = state.tableQuery;
      const tableParamsCancelledRequestor = state.paramsReport;

      tableQueryCancelledRequestor.pageNumber = '1';
      tableParamsCancelledRequestor.pageNumber = '1';

      tableQueryCancelledRequestor.column[3].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryCancelledRequestor,
        paramsReport: tableParamsCancelledRequestor,
        reqLoading: true,
      };
    case ACTION.GET_ADMIN: {
      const tableQueryRecordAdmin = state.tableQuery;
      const tableParamsRecordAdmin = state.paramsReport;

      tableQueryRecordAdmin.pageNumber = '1';
      tableParamsRecordAdmin.pageNumber = '1';

      tableQueryRecordAdmin.column[6].value = action.payload;
      return {
        ...state,
        tableQuery: tableQueryRecordAdmin,
        paramsReport: tableParamsRecordAdmin,
      };
    }
    case ACTION.SET_MESSENGER: {
      const tableQueryRecordMessenger = state.tableQuery;
      const tableParamsRecordMessenger = state.paramsReport;

      tableQueryRecordMessenger.pageNumber = '1';
      tableParamsRecordMessenger.pageNumber = '1';

      tableQueryRecordMessenger.column[7].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryRecordMessenger,
        paramsReport: tableParamsRecordMessenger,
      };
    }
    case ACTION.SET_MESSENGER_LOST: {
      const tableQueryLostMessenger = state.tableQuery;
      const tableParamsLostMessenger = state.paramsReport;

      tableQueryLostMessenger.pageNumber = '1';
      tableParamsLostMessenger.pageNumber = '1';

      tableQueryLostMessenger.column[6].value = action.payload;

      return {
        ...state,
        tableQuery: {
          ...state.tableQuery,
          tableQuery: tableQueryLostMessenger,
          paramsReport: tableParamsLostMessenger,
        },
      };
    }
    case ACTION.SET_REQUESTOR:
      const tableQueryRecordRequestor = state.tableQuery;
      const tableParamsRecordRequestor = state.paramsReport;

      tableQueryRecordRequestor.pageNumber = '1';
      tableParamsRecordRequestor.pageNumber = '1';

      tableQueryRecordRequestor.column[1].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryRecordRequestor,
        paramsReport: tableParamsRecordRequestor,
      };
    case ACTION.REQUEST_LOADING:
      return {
        ...state,
        reqLoading: true,
      };
    case ACTION.SET_HMO_TRANSMITTED:
      const tableQueryRecordHmo = state.tableQuery;
      const tableParamsRecordHmo = state.paramsReport;

      tableQueryRecordHmo.pageNumber = '1';
      tableParamsRecordHmo.pageNumber = '1';

      tableQueryRecordHmo.column[3].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryRecordHmo,
        paramsReport: tableParamsRecordHmo,
      };

    case ACTION.SET_DEPARTMENT_TRANSMITTED:
      const tableQueryRecordDepartment = state.tableQuery;
      const tableParamsRecordDepartment = state.paramsReport;

      tableQueryRecordDepartment.pageNumber = '1';
      tableParamsRecordDepartment.pageNumber = '1';

      tableQueryRecordDepartment.column[2].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryRecordDepartment,
        paramsReport: tableParamsRecordDepartment,
      };

    case ACTION.SET_URGENT_DEPARTMENT:
      const tableQueryUrgentDepartment = state.tableQuery;
      const tableParamsUrgentDepartment = state.paramsReport;

      tableQueryUrgentDepartment.pageNumber = '1';
      tableParamsUrgentDepartment.pageNumber = '1';

      tableQueryUrgentDepartment.column[4].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryUrgentDepartment,
        paramsReport: tableParamsUrgentDepartment,
      };

    case ACTION.SET_LOST_DEPARTMENT:
      const tableQueryLostDepartment = state.tableQuery;
      const tableParamsLostDepartment = state.paramsReport;

      tableQueryLostDepartment.pageNumber = '1';
      tableParamsLostDepartment.pageNumber = '1';

      tableQueryLostDepartment.column[3].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryLostDepartment,
        paramsReport: tableParamsLostDepartment,
      };
    case ACTION.SET_HMO_LOST:
      const tableQueryLostHmo = state.tableQuery;
      const tableParamsLostHmo = state.paramsReport;

      tableQueryLostHmo.pageNumber = '1';
      tableParamsLostHmo.pageNumber = '1';

      tableQueryLostHmo.column[4].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryLostHmo,
        paramsReport: tableParamsLostHmo,
      };
    case ACTION.SET_HMO_URGENT:
      const tableQueryUrgentHmo = state.tableQuery;
      const tableParamsUrgentHmo = state.paramsReport;

      tableQueryUrgentHmo.pageNumber = '1';
      tableParamsUrgentHmo.pageNumber = '1';

      tableQueryUrgentHmo.column[5].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryUrgentHmo,
        paramsReport: tableParamsUrgentHmo,
      };

    case ACTION.REQUEST_TYPE:
      const tableQueryRecordRequestType = state.tableQuery;
      const tableParamsRecordRequestType = state.paramsReport;

      tableQueryRecordRequestType.pageNumber = '1';
      tableParamsRecordRequestType.pageNumber = '1';

      tableQueryRecordRequestType.column[4].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryRecordRequestType,
        paramsReport: tableParamsRecordRequestType,
      };

    case ACTION.AREA_TYPE:
      const tableQueryMessengerArea = state.tableQuery;
      const tableParamsMessengerArea = state.paramsReport;

      tableQueryMessengerArea.pageNumber = '1';
      tableParamsMessengerArea.pageNumber = '1';

      tableQueryMessengerArea.column[1].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryMessengerArea,
        paramsReport: tableParamsMessengerArea,
      };

    case ACTION.REQUEST_STATUS:
      const tableQueryRecordStatus = state.tableQuery;
      const tableParamsRecordStatus = state.paramsReport;

      tableQueryRecordStatus.pageNumber = '1';
      tableParamsRecordStatus.pageNumber = '1';

      tableQueryRecordStatus.column[9].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryRecordStatus,
        paramsReport: tableParamsRecordStatus,
      };

    case ACTION.REPORT_SORTING:
      const newSortingTableQuery = state.tableQuery;

      console.log(action.payload, 'payload sort data');

      for (const data of newSortingTableQuery.column) {
        console.log(data.name, action.payload, ' sorting');
        if (data.name === action.payload) {
          data.sort = 'true';
          if (data.sortType === '') {
            data.sortType = 'asc';
          } else if (data.sortType === 'asc') {
            data.sortType = 'desc';
          } else if (data.sortType === 'desc') {
            data.sortType = 'asc';
          } else {
            data.sortType = 'asc';
          }
        } else {
          data.sortType = '';
          data.sort = 'false';
        }
      }

      return {
        ...state,
        tableQuery: newSortingTableQuery,
      };

    case ACTION.SET_URGENT_DATE:
      const tableQueryUrgentDateScannced = state.tableQuery;
      const tableParamsUrgentDateScannced = state.paramsReport;

      tableQueryUrgentDateScannced.pageNumber = '1';
      tableParamsUrgentDateScannced.pageNumber = '1';

      tableQueryUrgentDateScannced.column[6].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryUrgentDateScannced,
        paramsReport: tableParamsUrgentDateScannced,
      };

    case ACTION.SET_DATE_SCANNED:
      const tableQueryRecordDateScannced = state.tableQuery;
      const tableParamsRecordDateScannced = state.paramsReport;

      tableQueryRecordDateScannced.pageNumber = '1';
      tableParamsRecordDateScannced.pageNumber = '1';

      tableQueryRecordDateScannced.column[5].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryRecordDateScannced,
        paramsReport: tableParamsRecordDateScannced,
      };

    case ACTION.SET_DATE_UPLOAD:
      const tableQueryRecordDateUpload = state.tableQuery;
      const tableParamsRecordDateUpload = state.paramsReport;

      tableQueryRecordDateUpload.pageNumber = '1';
      tableParamsRecordDateUpload.pageNumber = '1';

      tableQueryRecordDateUpload.column[8].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryRecordDateUpload,
        paramsReport: tableParamsRecordDateUpload,
      };

    case ACTION.SET_DATE_CREATE_LOST:
      const tableQueryLostDateScanned = state.tableQuery;
      const tableParamsLostDateScanned = state.paramsReport;

      tableQueryLostDateScanned.pageNumber = '1';
      tableParamsLostDateScanned.pageNumber = '1';

      tableQueryLostDateScanned.column[5].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryLostDateScanned,
        paramsReport: tableParamsLostDateScanned,
      };
    case ACTION.SET_LOST_DATE:
      const tableQueryLostDateLost = state.tableQuery;
      const tableParamsLostDateLost = state.paramsReport;

      tableQueryLostDateLost.pageNumber = '1';
      tableParamsLostDateLost.pageNumber = '1';

      tableQueryLostDateLost.column[7].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryLostDateLost,
        paramsReport: tableParamsLostDateLost,
      };
    case ACTION.FILTERED_DATE:
      const newDateFiltered = state.tableQuery;
      newDateFiltered.from = action.start;
      newDateFiltered.to = action.end;

      return {
        ...state,
        tableQuery: newDateFiltered,
      };
    case ACTION.EXCEL_REPORT_LOADING:
      return {
        ...state,
        reqLoading: action.payload,
        excelLoading: action.excel,
      };
    case ACTION.SET_DATE_SCANNED_CANCEL:
      const tableQueryCancelledDateScanned = state.tableQuery;
      const tableParamsCancelledDateScanned = state.paramsReport;

      tableQueryCancelledDateScanned.pageNumber = '1';
      tableParamsCancelledDateScanned.pageNumber = '1';

      tableQueryCancelledDateScanned.column[6].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryCancelledDateScanned,
        paramsReport: tableParamsCancelledDateScanned,
      };
    case ACTION.SET_DATE_CANCELLED:
      const tableQueryCancelledDateCancelled = state.tableQuery;
      const tableParamsCancelledDateCancelled = state.paramsReport;

      tableQueryCancelledDateCancelled.pageNumber = '1';
      tableParamsCancelledDateCancelled.pageNumber = '1';

      tableQueryCancelledDateCancelled.column[7].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryCancelledDateCancelled,
        paramsReport: tableParamsCancelledDateCancelled,
      };
    case ACTION.SET_CANCELLED_DEPARTMENT:
      const tableQueryCancelledDepartment = state.tableQuery;
      const tableParamsCancelledDepartment = state.paramsReport;

      tableQueryCancelledDepartment.pageNumber = '1';
      tableParamsCancelledDepartment.pageNumber = '1';

      tableQueryCancelledDepartment.column[4].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryCancelledDepartment,
        paramsReport: tableParamsCancelledDepartment,
      };
    case ACTION.SET_HMO_CANCELLED:
      const tableQueryCancelledHmo = state.tableQuery;
      const tableParamsCancelledHmo = state.paramsReport;

      tableQueryCancelledHmo.pageNumber = '1';
      tableParamsCancelledHmo.pageNumber = '1';

      tableQueryCancelledHmo.column[5].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryCancelledHmo,
        paramsReport: tableParamsCancelledHmo,
      };
    case ACTION.SET_HMO_INTELLICARE_AVEGA:
      const tableQueryIntellicareAvegaHmo = state.tableQuery;
      const tableParamsIntellicareAvegaHmo = state.paramsReport;

      tableQueryIntellicareAvegaHmo.pageNumber = '1';
      tableParamsIntellicareAvegaHmo.pageNumber = '1';

      tableQueryIntellicareAvegaHmo.column[0].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryIntellicareAvegaHmo,
        paramsReport: tableParamsIntellicareAvegaHmo,
      };
    case ACTION.SET_HMO_SCHEDULED:
      const tableQueryScheduledHmo = state.tableQuery;
      const tableParamsScheduledHmo = state.paramsReport;

      tableQueryScheduledHmo.pageNumber = '1';
      tableParamsScheduledHmo.pageNumber = '1';

      tableQueryScheduledHmo.column[2].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryScheduledHmo,
        paramsReport: tableParamsScheduledHmo,
      };
    case ACTION.SET_INTELLICARE_AVEGA_DEPARTMENT:
      const tableQueryIntellicareAvegaDepartment = state.tableQuery;
      const tableParamsIntellicareAvegaDepartment = state.paramsReport;

      tableQueryIntellicareAvegaDepartment.pageNumber = '1';
      tableParamsIntellicareAvegaDepartment.pageNumber = '1';

      tableQueryIntellicareAvegaDepartment.column[1].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryIntellicareAvegaDepartment,
        paramsReport: tableParamsIntellicareAvegaDepartment,
      };
    case ACTION.SET_SCHEDULED_DEPARTMENT:
      const tableQueryScheduledDepartment = state.tableQuery;
      const tableParamsScheduledDepartment = state.paramsReport;

      tableQueryScheduledDepartment.pageNumber = '1';
      tableParamsScheduledDepartment.pageNumber = '1';

      tableQueryScheduledDepartment.column[0].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryScheduledDepartment,
        paramsReport: tableParamsScheduledDepartment,
      };
    case ACTION.SET_INTELLICARE_AVEGA_REQUESTOR:
      const tableQueryIntellicareAvegaRequestor = state.tableQuery;
      const tableParamsIntellicareAvegaRequestor = state.paramsReport;

      tableQueryIntellicareAvegaRequestor.pageNumber = '1';
      tableParamsIntellicareAvegaRequestor.pageNumber = '1';

      tableQueryIntellicareAvegaRequestor.column[2].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryIntellicareAvegaRequestor,
        paramsReport: tableParamsIntellicareAvegaRequestor,
        reqLoading: true,
      };
    case ACTION.SET_SCHEDULED_REQUESTOR:
      const tableQueryScheduledRequestor = state.tableQuery;
      const tableParamsScheduledRequestor = state.paramsReport;

      tableQueryScheduledRequestor.pageNumber = '1';
      tableParamsScheduledRequestor.pageNumber = '1';

      tableQueryScheduledRequestor.column[1].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryScheduledRequestor,
        paramsReport: tableParamsScheduledRequestor,
        reqLoading: true,
      };
    case ACTION.SET_DATE_SCANNED_INTELLICARE_AVEGA:
      const tableQueryIntellicareAvegaDateScanned = state.tableQuery;
      const tableParamsIntellicareAvegaDateScanned = state.paramsReport;

      tableQueryIntellicareAvegaDateScanned.pageNumber = '1';
      tableParamsIntellicareAvegaDateScanned.pageNumber = '1';

      tableQueryIntellicareAvegaDateScanned.column[3].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryIntellicareAvegaDateScanned,
        paramsReport: tableParamsIntellicareAvegaDateScanned,
      };
    case ACTION.SET_DATE_CREATED_SCHEDULED:
      const tableQueryScheduledDateCreated = state.tableQuery;
      const tableParamsScheduledDateCreated = state.paramsReport;

      tableQueryScheduledDateCreated.pageNumber = '1';
      tableParamsScheduledDateCreated.pageNumber = '1';

      tableQueryScheduledDateCreated.column[3].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryScheduledDateCreated,
        paramsReport: tableParamsScheduledDateCreated,
      };
    case ACTION.SET_DATE_SCHEDULED:
      const tableQueryScheduledDate = state.tableQuery;
      const tableParamsScheduledDate = state.paramsReport;

      tableQueryScheduledDate.pageNumber = '1';
      tableParamsScheduledDate.pageNumber = '1';

      tableQueryScheduledDate.column[5].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryScheduledDate,
        paramsReport: tableParamsScheduledDate,
      };
    case ACTION.SET_TRANSMITTAL_NO_INTELLICARE_AVEGA:
      const tableQueryIntellicareAvegaTransNo = state.tableQuery;
      const tableParamsIntellicareAvegaTransNo = state.paramsReport;

      tableQueryIntellicareAvegaTransNo.pageNumber = '1';
      tableParamsIntellicareAvegaTransNo.pageNumber = '1';

      tableQueryIntellicareAvegaTransNo.column[4].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryIntellicareAvegaTransNo,
        paramsReport: tableParamsIntellicareAvegaTransNo,
        reqLoading: true,
      };
    case ACTION.SET_INTELLICARE_AVEGA_REQUEST_TYPE:
      const tableQueryIntellicareAvegaRequestType = state.tableQuery;
      const tableParamsIntellicareAvegaRequestType = state.paramsReport;

      tableQueryIntellicareAvegaRequestType.pageNumber = '1';
      tableParamsIntellicareAvegaRequestType.pageNumber = '1';

      tableQueryIntellicareAvegaRequestType.column[5].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryIntellicareAvegaRequestType,
        paramsReport: tableParamsIntellicareAvegaRequestType,
        reqLoading: true,
      };
    case ACTION.SET_STATISTICS_DEPARTMENT:
      const tableQueryStatisticsDepartment = state.tableQuery;
      const tableParamsStatisticsDepartment = state.paramsReport;

      tableQueryStatisticsDepartment.pageNumber = '1';
      tableParamsStatisticsDepartment.pageNumber = '1';

      tableQueryStatisticsDepartment.column[0].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryStatisticsDepartment,
        paramsReport: tableParamsStatisticsDepartment,
      };
    case ACTION.SET_HMO_STATISTICS:
      const tableQueryStatisticsPerDepartmentHmo = state.tableQuery;
      const tableParamsStatisticsPerDepartmentHmo = state.paramsReport;

      tableQueryStatisticsPerDepartmentHmo.pageNumber = '1';
      tableParamsStatisticsPerDepartmentHmo.pageNumber = '1';

      tableQueryStatisticsPerDepartmentHmo.column[1].value = action.payload;

      return {
        ...state,
        tableQuery: tableQueryStatisticsPerDepartmentHmo,
        paramsReport: tableParamsStatisticsPerDepartmentHmo,
      };
    case ACTION.GET_ALL_DEPARTMENT:
      return {
        ...state,
        department: action.payload,
        reqLoading: false,
      };
    case ACTION.REMOVE_REPORT:
      return {
        ...state,
        table: {},
        tableQuery: {
          from: '2020-01-01',
          to: '2020-07-22',
          column: [
            {
              name: 'transmittalNo',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'requestor',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'requestType',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'dateScanned',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'admin',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'messenger',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'dateUpload',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'status',
              sort: 'false',
              sortType: '',
              value: '',
            },
          ],

          queryLimit: '10',
          pageNumber: '1',
          showData: '2',
        },
        paramsReport: {
          from: '2020-01-01',
          to: '2020-07-22',
          queryLimit: '10',
          pageNumber: '1',
        },
        searchParams: {
          transmittal_no: '',
          requestor: '',
          request_type: '',
          scanned_at: '',
          assigned_admin_id: '',
          assigned_messenger_id: '',
          created_at: '',
          status: '',
        },
        pagination: {},
        reqLoading: false,
        excelLoading: false,
        tableQueryMonitoring: {
          from: '2020-01-01',
          to: '2020-07-22',
          column: [
            {
              name: 'messenger',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'area',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'forDelivery',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'delivered',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'notDelivered',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'cannotDelivered',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'forPickUp',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'pickedUp',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'notPickedUp',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'cannotPickUp',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'cancelled',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'status',
              sort: 'false',
              sortType: '',
              value: '',
            },
          ],
          queryLimit: '10',
          pageNumber: '1',
          showData: '2',
        },
        tableQueryLostInTransit: {
          from: '2020-01-01',
          to: '2020-07-22',
          column: [
            {
              name: 'transmittalNo',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'item',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'requestor',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'department',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'hmoPartner',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'dateCreated',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'messenger',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'dateLost',
              sort: 'false',
              sortType: '',
              value: '',
            },
          ],
          queryLimit: '10',
          pageNumber: '1',
          showData: '2',
        },
        tableQueryUrgentRequest: {
          from: '2020-01-01',
          to: '2020-07-22',
          column: [
            {
              name: 'transmittal_no',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'item',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'reason_for_urgency',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'requestor',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'department',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'hmo_partner',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'date_scanned',
              sort: 'false',
              sortType: '',
              value: '',
            },
          ],
          queryLimit: '10',
          pageNumber: '1',
          showData: '2',
        },
        tableQueryTransmittedRecord: {
          from: '2020-01-01',
          to: '2020-07-22',
          column: [
            {
              name: 'transmittalNo',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'requestor',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'department',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'hmoPartner',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'requestType',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'dateScanned',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'admin',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'messenger',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'dateUpload',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'status',
              sort: 'false',
              sortType: '',
              value: '',
            },
          ],
          queryLimit: '10',
          pageNumber: '1',
          showData: '2',
        },
        tableQueryCancelledRequest: {
          from: '2020-01-01',
          to: '2020-07-22',
          column: [
            {
              name: 'transmittal_no',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'item',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'reason_for_cancellation',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'requestor',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'department',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'hmo_partner',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'date_scanned',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'date_cancelled',
              sort: 'false',
              sortType: '',
              value: '',
            },
          ],
          queryLimit: '10',
          pageNumber: '1',
          showData: '2',
        },
        tableQueryIntellicareAvegaRequest: {
          from: '2020-01-01',
          to: '2020-07-22',
          column: [
            {
              name: 'hmo_partner',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'department',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'requestor',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'date_scanned',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'transmittal_no',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'request_type',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'item',
              sort: 'false',
              sortType: '',
              value: '',
            },
          ],
          queryLimit: '10',
          pageNumber: '1',
          showData: '2',
        },
        tableQueryScheduledRequest: {
          from: '2020-01-01',
          to: '2020-07-22',
          column: [
            {
              name: 'department_id',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'requestor',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'hmo_partner_id',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'date_created',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'item',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'schedule_date',
              sort: 'false',
              sortType: '',
              value: '',
            },
          ],
          queryLimit: '10',
          pageNumber: '1',
          showData: '2',
        },
        tableQueryStatisticsPerDepartment: {
          from: '2020-01-01',
          to: '2020-07-22',
          column: [
            {
              name: 'department',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'hmo_partner',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'all_requests',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'request_sent',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'for_delivery',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'delivered',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'not_delivered',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'cannot_delivered',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'for_pickup',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'picked_up',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'not_picked_up',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'cannot_pickup',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'in_transit',
              sort: 'false',
              sortType: '',
              value: '',
            },
            {
              name: 'cancelled',
              sort: 'false',
              sortType: '',
              value: '',
            },
          ],
          queryLimit: '10',
          pageNumber: '1',
          showData: '2',
        },
      };
    default:
      return state;
  }
}
