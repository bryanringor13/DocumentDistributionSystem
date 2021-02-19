/* eslint-disable no-undef */
export const REQUEST_TYPE_DELIVERY = 1;
export const REQUEST_TYPE_PICKUP = 2;
export const REQUEST_TYPE_TEXT = [
  { code: 0, text: 'Filter Type' },
  { code: 1, text: 'Delivery' },
  { code: 2, text: 'Pickup' },
];

export const SCHEDULE_REQUEST_TYPE_TEXT = [
  { code: 0, text: 'N/A' },
  { code: 1, text: 'For Delivery' },
  { code: 2, text: 'For Pickup' },
];

export const REQUEST_REPEATS_TEXT = [
  { code: 'all', text: 'Filter Repeats' },
  { code: 'daily', text: 'Daily' },
  { code: 'weekly', text: 'Weekly' },
  { code: 'monthly', text: 'Monthly' },
];

export const REQUEST_TYPE_REPORT_DELIVERY = 1;
export const REQUEST_TYPE_REPORT_PICKUP = 2;
export const REQUEST_TYPE_REPORT_TEXT = [
  { code: 0, text: 'All' },
  { code: 1, text: 'Delivery' },
  { code: 2, text: 'Pickup' },
];

export const DEPARTMENT_REPORT_TEXT = [
  { code: 0, text: 'All' },
  { code: 'Cashiering', text: 'Cashiering' },
];

export const HMO_REPORT_TEXT = [
  { id: 0, code: 0, text: 'All' },
  { id: 2, code: 'Intellicare', text: 'Intellicare' },
  { id: 1, code: 'Avega', text: 'Avega' },
];

export const TRANSMITTED_REPORT = [
  { text: 'Transmittal No.', code: 'transmittalNo' },
  { text: 'Requestor', code: 'requestor' },
  { text: 'Department', code: 'department' },
  { text: 'HMO Partner', code: 'hmoPartner' },
  { text: 'Request Type', code: 'requestType' },
  { text: 'Date Scanned', code: 'dateScanned' },
  { text: 'Admin', code: 'admin' },
  { text: 'Messenger', code: 'messenger' },
  { text: 'Date Upload', code: 'dateUpload' },
  { text: 'Status', code: 'status' },
];

export const TRANSMITTED_REPORT_PARAMS = [
  { text: 'Transmittal No.', code: '&show[trno]=' },
  { text: 'Requestor', code: '&show[req]=' },
  { text: 'Department', code: '&show[dept]=' },
  { text: 'HMO Partner', code: '&show[hmop]=' },
  { text: 'Request Type', code: '&show[reqtype]=' },
  { text: 'Date Scanned', code: '&show[dscan]=' },
  { text: 'Admin', code: '&show[admin]=' },
  { text: 'Messenger', code: '&show[mess]=' },
  { text: 'Date Upload', code: '&show[dupload]=' },
  { text: 'Status', code: '&show[status]=' },
];

export const LOST_TRANSIT_PARAMS = [
  { text: 'Transmittal No.', code: '&show[trno]' },
  { text: 'Item', code: '&show[item]' },
  { text: 'Requestor', code: '&show[req]' },
  { text: 'Department', code: '&show[dept]' },
  { text: 'HMO Partner', code: '&show[hmop]' },
  { text: 'Date Scanned', code: '&show[dcrea]' },
  { text: 'Messenger', code: '&show[mess]' },
  { text: 'Date Lost', code: '&show[dlost]' },
];

export const URGENT_REQUEST_PARAMS = [
  { text: 'Transmittal No.', code: '&show[tnum]' },
  { text: 'Item', code: '&show[item]' },
  { text: 'Reason for Urgency', code: '&show[rfu]' },
  { text: 'Requestor', code: '&show[reqt]' },
  { text: 'Department', code: '&show[dept]' },
  { text: 'HMO Partner', code: '&show[hmop]' },
  { text: 'Date Scanned', code: '&show[dscan]' },
];

export const CANCELLED_REQUEST_PARAMS = [
  { text: 'Transmittal No.', code: '&show[tnum]' },
  { text: 'Item', code: '&show[item]' },
  { text: 'Reason for Cancellation', code: '&show[rfc]' },
  { text: 'Requestor', code: '&show[reqt]' },
  { text: 'Department', code: '&show[dept]' },
  { text: 'HMO Partner', code: '&show[hmop]' },
  { text: 'Date Scanned', code: '&show[dscan]' },
  { text: 'Date Cancelled', code: '&show[dcan]' },
];

export const INTELLICARE_AVEGA_REQUEST_PARAMS = [
  { text: 'HMO Partner', code: '&show[hmop]' },
  { text: 'Department', code: '&show[dept]' },
  { text: 'Requestor', code: '&show[reqt]' },
  { text: 'Date Scanned', code: '&show[dscan]' },
  { text: 'Transmittal No.', code: '&show[tnum]' },
  { text: 'Request Type', code: '&show[reqtype]' },
  { text: 'Item', code: '&show[item]' },
];

export const SCHEDULED_REQUEST_PARAMS = [
  { text: 'Department', code: '&show[department_id]' },
  { text: 'Requestor', code: '&show[requestor]' },
  { text: 'HMO Partner', code: '&show[hmop]' },
  { text: 'Date Created', code: '&show[date_created]' },
  { text: 'Item', code: '&show[item]' },
  { text: 'Schedule', code: '&show[schedule_date]' },
];

export const STATISTICS_PER_DEPARTMENT_PARAMS = [
  { text: 'Department', code: '&show[dept]' },
  { text: 'HMO Partner', code: '&show[hmop]' },
  { text: 'All Requests', code: '&show[allreq]' },
  { text: 'Request Sent', code: '&show[reqse]' },
  { text: 'For Delivery', code: '&show[fordel]' },
  { text: 'Delivered', code: '&show[deliv]' },
  { text: 'Not Delivered', code: '&show[notdel]' },
  { text: 'Cannot Deliver', code: '&show[cannotdel]' },
  { text: 'For Pickup', code: '&show[fpu]' },
  { text: 'Picked Up', code: '&show[pu]' },
  { text: 'Not Picked Up', code: '&show[notpu]' },
  { text: 'Cannot Pickup', code: '&show[cantpu]' },
  { text: 'In Transit', code: '&show[intran]' },
  { text: 'Cancelled', code: '&show[cancl]' },
];

export const IS_URGENT_YES = 1;
export const IS_URGENT_NO = 2;
export const IS_URGENT = [
  { code: 0, text: 'None' },
  { code: 1, text: 'Yes' },
  { code: 2, text: 'No' },
];
export const REPORT_NAME = [
  { text: 'Choose type of report to generate', value: 'Choose type of report to generate' },
  { text: 'Recorded and Transmitted Requests', value: 'recTransmitReport' },
  { text: 'Messenger Monitoring', value: 'messengerMonitoring' },
  { text: 'Document Lost in Transit', value: 'lostInTransit' },
  { text: 'Urgent Requests', value: 'urgentRequest' },
  { text: 'Cancelled Requests', value: 'cancelledRequestsReport' },
  { text: 'Intellicare and Avega Requests', value: 'partnerRequestsReport' },
  { text: 'Scheduled Requests', value: 'scheduledRequestsReport' },
  { text: 'Statistics per Department', value: 'statisticsPerDepartmentReport' },
];

export const TRACKING_STATUS_PREVIEW = 0;
export const TRACKING_STATUS_REQUEST_SENT = 1; // Request Sent
export const TRACKING_STATUS_FOR_DELIVERY = 2; // For Delivery
export const TRACKING_STATUS_FOR_PICKUP = 3; // For Pickup
export const TRACKING_STATUS_DELIVERY_IN_TRANSIT = 4; // In Transit
export const TRACKING_STATUS_PICKUP_IN_TRANSIT = 5; // In Transit
export const TRACKING_STATUS_DELIVERED = 6; // Delivered
export const TRACKING_STATUS_PICKEDUP = 7; // Picked up
export const TRACKING_STATUS_CANNOT_PICKUP = 8; // Cannot Pickup
export const TRACKING_STATUS_NOT_PICKEDUP = 9; // Not Picked up
export const TRACKING_STATUS_NON_DELIVERABLE = 10; // Cannot Deliver
export const TRACKING_STATUS_NOT_DELIVERED = 11; // Not Delivered
export const TRACKING_STATUS_CANCELLED = 12; // Cancelled
export const TRACKING_STATUS = [
  { code: 0, text: 'Filter Status' },
  { code: 1, text: 'Request Sent' },
  { code: 2, text: 'For Delivery' },
  { code: 3, text: 'For Pickup' },
  { code: 4, text: 'In Transit' }, // For Deliver
  { code: 5, text: 'In Transit' }, // For Deliver
  { code: 6, text: 'Delivered' },
  { code: 7, text: 'Picked Up' },
  { code: 10, text: 'Cannot Deliver' },
  { code: 11, text: 'Not Delivered' },
  { code: 8, text: 'Cannot Pickup' },
  { code: 9, text: 'Not Picked Up' },
  { code: 12, text: 'Cancelled' },
];

export const PARTNER_TYPE = [
  {
    code: 0,
    text: 'Filter by Partner Type',
    type: 'none',
  },
  {
    code: 1,
    text: 'Doctor',
    type: 'doctors_dentists',
  },
  {
    code: 2,
    text: 'Dentist',
    type: 'doctors_dentists',
  },
  {
    code: 3,
    text: 'Hospital',
    type: 'facilities',
  },
  {
    code: 4,
    text: 'Medical Clinic',
    type: 'facilities',
  },
  {
    code: 5,
    text: 'Dental Clinic',
    type: 'facilities',
  },
  {
    code: 6,
    text: 'Special Services',
    type: 'other_services',
  },
];

export const AUDIT_USER = [
  {
    code: 0,
    text: 'Filter by user',
    type: 'none',
  },
];

export const TRACKING_STATUS_3 = [
  { code: 0, text: 'Filter Status' },
  { code: 2, text: 'Received' }, // For Delivery and For Pickup
  { code: 4, text: 'In Transit' }, // All in transit request
  { code: 6, text: 'Delivered' },
  { code: 7, text: 'Picked Up' },
  { code: 11, text: 'Not Delivered' },
  { code: 9, text: 'Not Picked Up' },
  { code: 10, text: 'Cannot Deliver' },
  { code: 8, text: 'Cannot Pickup' },
  { code: 12, text: 'Cancelled' },
];

export const TRACKING_STATUS_ORDER = [
  { code: 0, text: 'Filter Status' },
  { code: 1, text: 'Request Sent' },
  { code: 2, text: 'For Delivery' },
  { code: 3, text: 'For Pickup' },
  { code: 4, text: 'In Transit' }, // For Deliver
  { code: 5, text: 'In Transit' }, // For Deliver
  { code: 6, text: 'Delivered' },
  { code: 7, text: 'Picked Up' },
  { code: 8, text: 'Cannot Pickup' },
  { code: 9, text: 'Not Picked Up' },
  { code: 10, text: 'Cannot Deliver' },
  { code: 11, text: 'Not Delivered' },
  { code: 12, text: 'Cancelled' },
];

export const CONTACT_STATUS = [
  { code: '', text: 'Filter by Status' },
  { code: 'ACTIVE', text: 'Active' },
  { code: 'INACTIVE', text: 'Inactive' },
];

export const CONTACT_TYPE_BROKER = [
  { code: '', text: 'Filter by Type' },
  { code: 'BROKERS', text: 'Broker' },
  { code: 'AGENTS', text: 'Agent' },
];

export const TRACKING_STATUS_HISTORY = [
  { code: 0, text: 'Filter Status' },
  { code: 6, text: 'Delivered' },
  { code: 7, text: 'Picked Up' },
  { code: 10, text: 'Cannot Deliver' },
  { code: 11, text: 'Not Delivered' },
  { code: 8, text: 'Cannot Pickup' },
  { code: 9, text: 'Not Picked Up' },
  { code: 12, text: 'Cancelled' },
];

export const ACTIVE_STATUS = [
  { code: 1, text: 'Active' },
  { code: 2, text: 'Inactive' },
];

export const PARTNER_AVIDA = 1;
export const PARTNER_INTELLICARE = 2;
export const PARTNER = [
  { code: 0, text: 'None' },
  { code: 1, text: 'Avega' },
  { code: 2, text: 'Intellicare' },
  { code: 3, text: 'FPAD' },
];

export const REQUEST_STATUS_PENDING = 0;
export const REQUEST_STATUS_UNASSIGNED = 1;
export const REQUEST_STATUS_ASSIGNED = 2;
export const REQUEST_STATUS_PENDING_ACCEPTANCE = 3;
export const REQUEST_STATUS_ACCEPTED_BY_MESSAGNER = 4;

export const REQUEST_ITEM_TYPE_OTHER = 0;
export const REQUEST_ITEM_TYPE_CHECK = 1;
export const REQUEST_ITEM_TYPE_SOA = 2;
export const REQUEST_ITEM_TYPE_CONTRACT_CARDS = 3;
// export const  = 4;
export const REQUEST_ITEM_TYPE = [
  { code: 0, text: 'Other' },
  { code: 1, text: 'Check' },
  { code: 2, text: 'SOA' },
  { code: 3, text: 'ID Cards' },
  // { code: 4, text: "Other" },
];

export const HIMS_DEPARTMENT_NODEPT = 1;
export const HIMS_DEPARTMENT_CASHIERING = 2;
export const HIMS_DEPARTMENT = [
  { code: 0, text: 'None' },
  { code: 1, text: 'No Department Yet' },
  { code: 2, text: 'Cashiering' },
];
export const LOST_IN_TRANSIT = [
  { text: 'Transmittal No.', code: 'transmittalNo' },
  { text: 'Item', code: 'item' },
  { text: 'Requestor', code: 'requestor' },
  { text: 'Department', code: 'department' },
  { text: 'HMO Partner', code: 'hmoPartner' },
  { text: 'Date Scanned', code: 'dateCreated' },
  { text: 'Messenger', code: 'messenger' },
  { text: 'Date Lost', code: 'dateLost' },
];

export const URGENT_REQUEST = [
  { text: 'Transmittal No.', code: 'transmittal_no' },
  { text: 'Item', code: 'item' },
  { text: 'Reason for Urgency', code: 'reason_for_urgency' },
  { text: 'Requestor', code: 'requestor' },
  { text: 'Department', code: 'department' },
  { text: 'HMO Partner', code: 'hmo_partner' },
  { text: 'Date Scanned', code: 'date_scanned' },
];

export const CANCELLED_REQUEST = [
  { text: 'Transmittal No.', code: 'transmittal_no' },
  { text: 'Item', code: 'item' },
  { text: 'Reason for Cancellation', code: 'reason_for_cancellation' },
  { text: 'Requestor', code: 'requestor' },
  { text: 'Department', code: 'department' },
  { text: 'HMO Partner', code: 'hmo_partner' },
  { text: 'Date Scanned', code: 'date_scanned' },
  { text: 'Date Cancelled', code: 'date_cancelled' },
];

export const INTELLICARE_AVEGA_REQUEST = [
  { text: 'HMO Partner', code: 'hmo_partner' },
  { text: 'Department', code: 'department' },
  { text: 'Requestor', code: 'requestor' },
  { text: 'Date Scanned', code: 'date_scanned' },
  { text: 'Transmittal No.', code: 'transmittal_no' },
  { text: 'Request Type', code: 'request_type' },
  { text: 'Item', code: 'item' },
];

export const SCHEDULED_REQUEST = [
  { text: 'Department', code: 'department_id' },
  { text: 'Requestor', code: 'requestor' },
  { text: 'HMO Partner', code: 'hmo_partner_id' },
  { text: 'Date Created', code: 'date_created' },
  { text: 'Item', code: 'item' },
  { text: 'Schedule', code: 'schedule_date' },
];

export const STATISTICS_PER_DEPARTMENT = [
  { text: 'Department', code: 'department' },
  { text: 'HMO Partner', code: 'hmo_partner' },
  { text: 'All Requests', code: 'all_requests' },
  { text: 'Request Sent', code: 'request_sent' },
  { text: 'For Delivery', code: 'for_delivery' },
  { text: 'Delivered', code: 'delivered' },
  { text: 'Not Delivered', code: 'not_delivered' },
  { text: 'Cannot Deliver', code: 'cannot_delivered' },
  { text: 'For Pickup', code: 'for_pickup' },
  { text: 'Picked Up', code: 'picked_up' },
  { text: 'Not Picked Up', code: 'not_picked_up' },
  { text: 'Cannot Pickup', code: 'cannot_pickup' },
  { text: 'In Transit', code: 'in_transit' },
  { text: 'Cancelled', code: 'cancelled' },
];

export const MESSENGER_MONITORING = [
  { text: 'Messenger', code: 'messenger' },
  { text: 'Area', code: 'area' },
  { text: 'For Delivery', code: 'forDelivery' },
  { text: 'Delivered', code: 'delivered' },
  { text: 'Not Delivered', code: 'notDelivered' },
  { text: 'Cannot Deliver', code: 'cannotDelivered' },
  { text: 'For Pickup', code: 'forPickUp' },
  { text: 'Picked Up', code: 'pickedUp' },
  { text: 'Not Picked Up', code: 'notPickedUp' },
  { text: 'Cannot Pickup', code: 'cannotPickUp' },
  { text: 'Cancelled', code: 'cancelled' },
];
export const MESSENGER_MONITORING_EXCEL = [
  { text: 'Messenger', code: '&show[mess]=' },
  { text: 'Area', code: '&show[area]=' },
  { text: 'For Delivery', code: '&show[fordel]=' },
  { text: 'Delivered', code: '&show[deliv]=' },
  { text: 'Not Delivered', code: '&show[notdel]=' },
  { text: 'Cannot Deliver', code: '&show[cannotdel]=' },
  { text: 'For Pickup', code: '&show[fpu]=' },
  { text: 'Picked Up', code: '&show[pu]' },
  { text: 'Not Picked Up', code: '&show[notpu]=' },
  { text: 'Cannot Pickup', code: '&show[cantpu]=' },
  { text: 'Cancelled', code: '&show[cancl]=' },
];

// For URL API
export const API_URL = process.env.API_HOST;
export const SOCKET_URL = process.env.SOCKET_URL;

export const GET_CODE_URL = API_URL + '/contacts/';
export const LOGIN_USER = API_URL + '/login';
export const GET_USER = API_URL + '/users/';
export const REGISTER_USER = API_URL + '';
export const ALL_USER = API_URL + '';
export const LOGOUT_USER = API_URL + '/logout';

// Admin Assistant and Requestor User
export const ASSIGN_TO_ME_SEND = API_URL + '/admin/requests/assigned-to-me/';
export const REASSIGN = API_URL + '/admin/requests/';

export const ALL_REQUEST = {
  dds_requestor: {
    requestor_table: API_URL + '/requestor/requests/',
  },
  dds_admin_assistant: {
    unassigned: API_URL + '/admin/requests/unassigned',
    assigne_to_me: API_URL + '/admin/requests/assigned-to-me',
    pending_accept: API_URL + '/admin/requests/pending-acceptance',
    accepted_messenger: API_URL + '/admin/requests/accepted-by-messenger',
    my_request: API_URL + '/admin/requests/my-requests',
    all_request: API_URL + '/admin/requests/all-requests',
    history: API_URL + '/admin/requests/history',
  },
};
export const REASSIGN_MESSENGER_PENDING = API_URL + '/admin/requests/pending-acceptance/';

export const EXPORT_TRANSMITTED = API_URL + '/reports/download/recTransmitReport';
export const EXPORT_DOWNLOAD = API_URL + '/reports/download/';
export const REASSIGN_MESSENGER_ASSIGN_TO_ME = API_URL + '/admin/requests/assigned-to-me/';
export const REASSIGN_MESSENGER = API_URL + '/admin/requests/reassign/';
export const GET_REQUEST_COUNT = API_URL + '/admin/requests/navigation-total-count';
export const SCAN_FORM = API_URL + '/admin/requests/accept/';
export const CANCEL_REQUEST = API_URL + '/requestor/requests/';
export const GET_REQUEST = {
  dds_requestor: API_URL + '/requestor/requests/',
  dds_admin_assistant: API_URL + '/requestor/requests/',
};

export const GET_ASSIGN = API_URL + '/admin/requests/';
export const POST_REQUEST = API_URL + '/requestor/requests';
export const GET_AUDIT_LOGS = API_URL + '/requests/';
export const GET_SCAN = API_URL + '/admin/requests/accept/';

// Notifications
export const ALL_NOTIFICATIONS = API_URL + '/notifications?skipItem=0';
export const UNREAD_NOTIFICATIONS = API_URL + '/notifications/unread/preview';
export const MARK_AS_READ = API_URL + '/notifications/';
export const NOTIFICATION_COUNT = API_URL + '/notifications/unread/count';
export const OLDER_NOTIF = API_URL + '/notifications';

// Address
export const ALL_PROVINCES = API_URL + '/common/locations?list=province';
export const GET_CITY = API_URL + '/common/locations/pro  vinces/';
export const GET_BARANGAY = API_URL + '/common/locations/municipalities/';

// HIMS Address
export const ALL_HIMS_PROVINCE = API_URL + '/sub/common/locations?list=province';
export const ALL_HIMS_CITY = API_URL + '/sub/common/locations?list=city';
export const ALL_HIMS_BARANGAY = API_URL + '/sub/common/locations?list=barangay';
export const GET_HIMS_PROVINCE = API_URL + '/sub/common/filter/province-list/';
export const GET_HIMS_CITY = API_URL + '/sub/common/filter/city-list/';
export const GET_HIMS_BARANGAY = API_URL + '/sub/common/filter/barangay-list/';

// User ROLES
export const ADMIN_ASSISTANT = ['dds_admin_assistant'];
export const REQUESTOR = ['dds_requestor'];

// KPI
export const RECEIVED_PROCESSED = API_URL + '/admin/kpi/received-vs-processed-transmittals';

export const NOT_DELIVERED_PROCESSED = API_URL + '/admin/kpi/not-delivered-pickedup-transmittals';

export const PERFOMANCE_INDICATOR = API_URL + '/admin/kpi/messengers-daily-performance-indicator';

export const MONTHLY_PRODUCTIVITY = API_URL + '/admin/kpi/productivity-for-the-month';

//  Report
export const REPORT = API_URL + '/reports/';
// Messenger

export const ADD_NEW_MESSENGER = API_URL + '/admin/messengers';
export const ALL_MESSENGER = API_URL + '/admin/messengers';

// Department
export const GET_ALL_DEPARTMENT = API_URL + '/users/departments';

// SCHEDULE
export const ADD_NEW_SCHEDULE = API_URL + '/admin/requests/schedule';
export const GET_ALL_REQUESTOR = API_URL + '/requests/requestors';
export const GET_REQUESTOR = API_URL + '/users/';
export const FILTER_DEPARTMENT = API_URL + '/users/departments';
export const FILTER_HMO = API_URL + '/users/partners';
export const FILTER_REQUESTOR = API_URL + '/requests/requestors';
export const SAVE_SCHEDULE = API_URL + '/requests/schedule';

// Scheduled Request
export const ALL_SCHEDULED_REQUEST = API_URL + '/requests/schedule';
export const HISTORY_SCHEDULED_REQUEST = API_URL + '/requests/schedule-history';

// CONTACT TYPE
export const CONTACT_TYPE = [
  { code: 'EMPLOYEE', text: 'Employee' },
  { code: 'DEPARTMENT', text: 'Department' },
];

// CONTACT TYPE BROKERS/AGENTS
export const CONTACT_TYPE_BROKERS_AGENTS = [
  { code: 'BROKERS', text: 'Broker' },
  { code: 'AGENTS', text: 'Agent' },
];

// CONTACT
export const ALL_CONTACT_EMPLOYEE = API_URL + '/contacts/employees';
export const ALL_DEPARTMENT = API_URL + '/contacts/departments';
export const PARTNER_NETWORKS = API_URL + '/contacts/partner-networks';
export const ALL_CONTACT_BROKERS_AGENTS = API_URL + '/contacts/agents-and-brokers';

// AUDIT LOGS
export const AUDIT_LOGS = API_URL + '/audit-logs/list';

export const TABLE_COMPONENT = {
  dds_requestor: {
    tableDefault: 'requestor_table',
    tableColumn: {
      requestor_table: [
        { field: 'transmittal_no', title: 'Transmittal No' },
        { field: 'addressee', title: 'Addressee' },
        { field: 'request_type', title: 'Type' },
        { field: 'created_at', title: 'Date Created' },
        { field: 'expected_date', title: 'Expected Delivery/Pickup' },
        { field: 'requestor_name', title: 'Requestor' },
        { field: 'tracking_status', title: 'Status' },
      ],
    },
  },
  dds_admin_assistant: {
    tableDefault: 'all_request',
    tableColumn: {
      all_request: [
        { field: 'transmittal_no', title: 'Transmittal No' },
        { field: 'addressee', title: 'Addressee' },
        { field: 'request_type', title: 'Type' },
        { field: 'created_at', title: 'Date Created' },
        { field: 'expected_date', title: 'Expected Delivery/Pickup' },
        { field: 'requestor_name', title: 'Requestor' },
        { field: 'tracking_status', title: 'Status' },
        { field: 'admin_asst_name', title: 'Admin Asst.' },
      ],
      unassigned: [
        { field: 'transmittal_no', title: 'Transmittal No' },
        { field: 'addressee', title: 'Addressee' },
        { field: 'request_type', title: 'Type' },
        { field: 'created_at', title: 'Date Created' },
        { field: 'expected_date', title: 'Expected Delivery/Pickup' },
        { field: 'requestor_name', title: 'Requestor' },
      ],
      assigne_to_me: [
        { field: 'box_no', title: 'Box No.' },
        { field: 'box_assignment', title: 'Area Assignment' },
        { field: 'messenger', title: 'Messenger' },
        { field: 'capacity', title: 'Capacity' },
      ],
      pending_accept: [
        { field: 'box_no', title: 'Box No.' },
        { field: 'box_assignment', title: 'Area Assignment' },
        { field: 'messenger', title: 'Messenger' },
        { field: 'capacity', title: 'Capacity' },
      ],
      accepted_messenger: [
        { field: 'box_no', title: 'Box No.' },
        { field: 'box_assignment', title: 'Area Assignment' },
        { field: 'messenger', title: 'Messenger' },
        { field: 'capacity', title: 'Capacity' },
      ],
      my_request: [
        { field: 'transmittal_no', title: 'Transmittal No' },
        { field: 'addressee', title: 'Addressee' },
        { field: 'request_type', title: 'Type' },
        { field: 'created_at', title: 'Date Created' },
        { field: 'expected_date', title: 'Expected Delivery/Pickup' },
        { field: 'requestor_name', title: 'Requestor' },
        { field: 'tracking_status', title: 'Status' },
        { field: 'admin_asst_name', title: 'Admin Asst.' },
      ],
      history: [
        { field: 'transmittal_no', title: 'Transmittal No' },
        { field: 'addressee', title: 'Addressee' },
        { field: 'request_type', title: 'Type' },
        { field: 'created_at', title: 'Date Created' },
        { field: 'expected_date', title: 'Expected Delivery/Pickup' },
        { field: 'requestor_name', title: 'Requestor' },
        { field: 'tracking_status', title: 'Status' },
        { field: 'admin_asst_name', title: 'Admin Asst.' },
      ],
    },
    boxContent: {
      assigne_to_me: 'assigned-to-me',
      pending_accept: 'pending-acceptance',
      accepted_messenger: 'accepted-by-messenger',
      history: 'history',
    },
  },
};
export const SCHEDULE_TABLE_COUNT = API_URL + '/requests/schedule-tabs-total-count';
export const TABLE_COLUMN_SCHEDULED_REQUEST = [
  { field: 'schedule_request_id', title: 'Request ID' },
  { field: 'company_details_name', title: 'Addressee' },
  { field: 'request_details_type', title: 'Type' },
  { field: 'request_details_requestor', title: 'Requestor' },
  { field: 'schedule_details_starts_on', title: 'Start Date' },
  { field: 'schedule_details_ends_on', title: 'End Date' },
  { field: 'schedule_details_repeats', title: 'Repeats' },
];

// REFRESH TOKEN
export const REFRESH_TOKEN = API_URL + '/login/refresh-token';
