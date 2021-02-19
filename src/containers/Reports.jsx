/* eslint-disable react/display-name */
/* eslint-disable no-prototype-builtins */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Grid, Button } from '@material-ui/core';
import Title from '../components/common/Title';
import CommonSelect from '../components/common/CommonSelect/CommonSelect';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import NoItemTable from '../components/common/NoItemTable';
import html2pdf from 'html2pdf.js';
import autotable from 'jspdf-autotable';
import TransmittalReport from '../components/dds/TransmittalReport';
import TableMui from '../components/common/TableMui/TableMui';
import ColumnSearchForm from '../components/common/TableMui/TableParts/ColumnSearchForm';
import '../components/common/TableMui/paymentRequest.scss';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as ADDRESS from '../store/actions/addressActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTransmittal,
  getReport,
  getReportPdf,
  setRequestor,
  setQuery,
  setMessenger,
  setMessengerMonitoring,
  getFilteredDate,
  setRequestType,
  setLostDepartment,
  getAdmin,
  setAreaType,
  setHmoLost,
  setHmoUrgent,
  setUrgentDepartment,
  setStatus,
  tableQuery,
  removeReport,
  setMessengerLost,
  setLostRequestor,
  setDepartmentTransmitted,
  setHmoTransmitted,
  setUrgentRequestor,
  setCancelledRequestor,
  setDepartmentCancelled,
  setHmoCancelled,
  setHmoIntellicareAvega,
  setHmoScheduled,
  setDepartmentIntellicareAvega,
  setDepartmentScheduled,
  setIntellicareAvegaRequestor,
  setScheduledRequestor,
  setTransmittalIntellicareAvega,
  setIntellicareAvegaRequestType,
  setDepartmentStatisticsPerDepartment,
  setHmoStatisticsPerDepartment,
  exportExcelTransmitted,
  excelReportLoading,
  cancelGenerateReport,
  getAllDepartment,
} from '../store/actions/action_report';
import moment from 'moment';
import ColumnFilter from '../components/common/TableMui/TableParts/ColumnFilter';
import ColumnDate from '../components/common/TableMui/TableParts/ColumnDate';
import ColumnNormal from '../components/common/TableMui/TableParts/ColumnNormal';
import * as CONSTANTS from '../utils/Constants';
import MultiDropdown from '../components/common/TableMui/TableParts/MultiDropdown';
import SecondaryButton from '../components/common/Button/SecondaryButton';

const fileDownload = require('js-file-download');
// import { comparerArray } from '../utils/common'
moment.locale();

const useStyles = makeStyles(() => ({
  titleTableMany: {
    fontSize: '12px',
  },
  showPrint: {
    display: 'block',
  },
  hidePrint: {
    display: 'none',
  },
  btnGenerate: {
    minWidth: '191px',
    background: '#41B67F',
    color: '#fff',
    '&:hover': {
      background: '#41B67F',
    },
  },
  disabledBtn: {
    pointerEvents: 'none',
    opacity: '0.7',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '48px',
  },
  titleTotal: {
    marginLeft: '23px',
  },
  titleTotalNum: {
    fontWeight: 'bold',
  },
  inputTitle: {
    fontSize: '14px',
    lineHeight: '24px',
    marginTop: '20px',
    marginBottom: '8px',
  },
  btnHolder: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    marginLeft: '20px',
  },
  inputHolder: {
    width: '352px',
    marginRight: '37px',
  },
  multiHolder: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
}));

const Reports = () => {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report);
  const auth = useSelector((state) => state.auth);
  const address_info = useSelector((state) => state.address);

  console.log(report, 'REPORT REDUX');

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportName, setReportName] = useState('Choose type of report to generate');
  const [selectedReportName, setSelectedReportName] = useState('Choose type of report to generate');
  const sampleReport = [
    'Choose type of report to generate',
    'Recorded and Transmitted Requests',
    'Messenger Monitoring',
    'Urgent Requests',
    'Cancelled Requests',
    'Document Lost in Transit',
    'Intellicare and Avega Requests',
    'Scheduled Requests',
    'Statistics per Department',
  ];

  const [tbHeader, setTBHeader] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [showPrint, setShowPrint] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [title, setTitle] = useState('');
  const [tableItem, setTableItem] = useState([]);
  const [multiItem, setMultiItem] = useState([]);
  const [city, setCity] = useState([{ code: 'All Locations', text: 'All Locations' }]);
  const [tableMessage, setTableMessage] = useState('No data available. Please generate a report first.');
  const [showCancel, setShowCancel] = useState(false);
  const [enableDatePicker, setEnableDatePicker] = useState(false);
  const [truncateData, setTruncateData] = useState(false);

  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);

  const onChangeReportName = (e) => {
    setShowTable(false);
    setTableItem([]);
    setMultiItem([]);
    setStateData([]);
    setTableMessage('No data available. Please generate a report first.');
    dispatch(removeReport());

    const data = CONSTANTS.REPORT_NAME.find((item) => item.text === e.target.value);

    setTitle(data.text);

    if (data) {
      setReportName(data.value);
      setSelectedReportName(data.text);
    }

    if (data.text === 'Recorded and Transmitted Requests') {
      const reportDataName = [];
      for (const item of CONSTANTS.TRANSMITTED_REPORT) {
        reportDataName.push(item.text);
      }
      setMultiItem(reportDataName);
      dispatch(tableQuery('Recorded and Transmitted Requests'));
    } else if (data.text === 'Messenger Monitoring') {
      const reportDataName = [];
      for (const item of CONSTANTS.MESSENGER_MONITORING) {
        reportDataName.push(item.text);
      }
      setMultiItem(reportDataName);
      dispatch(tableQuery('Messenger Monitoring'));
    } else if (data.text === 'Document Lost in Transit') {
      const reportDataName = [];
      for (const item of CONSTANTS.LOST_IN_TRANSIT) {
        reportDataName.push(item.text);
      }
      setMultiItem(reportDataName);
      dispatch(tableQuery('Document Lost in Transit'));
    } else if (data.text === 'Urgent Requests') {
      const reportDataName = [];
      for (const item of CONSTANTS.URGENT_REQUEST) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Urgent Requests'));
    } else if (data.text === 'Cancelled Requests') {
      const reportDataName = [];

      for (const item of CONSTANTS.CANCELLED_REQUEST) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Cancelled Requests'));
    } else if (data.text === 'Intellicare and Avega Requests') {
      const reportDataName = [];

      for (const item of CONSTANTS.INTELLICARE_AVEGA_REQUEST) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Intellicare and Avega Requests'));
    } else if (data.text === 'Scheduled Requests') {
      const reportDataName = [];

      for (const item of CONSTANTS.SCHEDULED_REQUEST) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Scheduled Requests'));
    } else if (data.text === 'Statistics per Department') {
      const reportDataName = [];

      for (const item of CONSTANTS.STATISTICS_PER_DEPARTMENT) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Statistics per Department'));
    }

    if (data.value === 'Choose type of report to generate') {
      setShowTable(false);
    }
  };

  const dateRangeFilter = (date) => {
    if (date.value !== null) {
      setDateShow(true);
    } else {
      setDateShow(false);
    }
    if (date.value !== null) {
      setStartDate(moment(date.value[0]).format('L').toString());
      setEndDate(moment(date.value[1]).format('L').toString());

      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');
      setStartDate(`${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]}`);
      setEndDate(`${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`);
    }
  };

  const generateReport = () => {
    if (title === 'Recorded and Transmitted Requests') {
      dispatch(tableQuery('Recorded and Transmitted Requests'));
    } else if (title === 'Messenger Monitoring') {
      dispatch(tableQuery('Messenger Monitoring'));
    } else if (title === 'Document Lost in Transit') {
      dispatch(tableQuery('Document Lost in Transit'));
    } else if (title === 'Urgent Requests') {
      dispatch(tableQuery('Urgent Requests'));
    } else if (title === 'Cancelled Requests') {
      dispatch(tableQuery('Cancelled Requests'));
    } else if (title === 'Intellicare and Avega Requests') {
      dispatch(tableQuery('Intellicare and Avega Requests'));
    } else if (title === 'Scheduled Requests') {
      dispatch(tableQuery('Scheduled Requests'));
    } else if (title === 'Statistics per Department') {
      dispatch(tableQuery('Statistics per Department'));
    }
    dispatch(getFilteredDate(startDate, endDate));

    dispatch(getReport(report.tableQuery, reportName, true));
    setShowTable(true);
    setShowCancel(true);
  };

  const onCancel = () => {
    setTableMessage('No records found');
    setShowTable(false);
    dispatch(cancelGenerateReport());

    if (selectedReportName === 'Recorded and Transmitted Requests') {
      const reportDataName = [];
      for (const item of CONSTANTS.TRANSMITTED_REPORT) {
        reportDataName.push(item.text);
      }
      setMultiItem(reportDataName);
      dispatch(tableQuery('Recorded and Transmitted Requests'));
    } else if (selectedReportName === 'Messenger Monitoring') {
      const reportDataName = [];
      for (const item of CONSTANTS.MESSENGER_MONITORING) {
        reportDataName.push(item.text);
      }
      setMultiItem(reportDataName);
      dispatch(tableQuery('Messenger Monitoring'));
    } else if (selectedReportName === 'Document Lost in Transit') {
      const reportDataName = [];
      for (const item of CONSTANTS.LOST_IN_TRANSIT) {
        reportDataName.push(item.text);
      }
      setMultiItem(reportDataName);
      dispatch(tableQuery('Document Lost in Transit'));
    } else if (selectedReportName === 'Urgent Requests') {
      const reportDataName = [];
      for (const item of CONSTANTS.URGENT_REQUEST) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Urgent Requests'));
    } else if (selectedReportName === 'Cancelled Requests') {
      const reportDataName = [];

      for (const item of CONSTANTS.CANCELLED_REQUEST) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Cancelled Requests'));
    } else if (selectedReportName === 'Intellicare and Avega Requests') {
      const reportDataName = [];

      for (const item of CONSTANTS.INTELLICARE_AVEGA_REQUEST) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Intellicare and Avega Requests'));
    } else if (selectedReportName === 'Scheduled Requests') {
      const reportDataName = [];

      for (const item of CONSTANTS.SCHEDULED_REQUEST) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Scheduled Requests'));
    } else if (selectedReportName === 'Statistics per Department') {
      const reportDataName = [];

      for (const item of CONSTANTS.STATISTICS_PER_DEPARTMENT) {
        reportDataName.push(item.text);
      }

      setMultiItem(reportDataName);
      dispatch(tableQuery('Statistics per Department'));
    }
  };

  const onReport = () => {
    setShowPrint(true);
  };

  // function isEmpty(obj) {
  //   for (const key in obj) {
  //     if (obj.hasOwnProperty(key)) return false
  //   }
  //   return true
  // }
  const [item, setItem] = useState({ data: [] });
  const [setData, setStateData] = useState([]);
  const [params, setParams] = useState([]);
  const [dateShow, setDateShow] = useState(false);

  const dateScannedHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');

      dispatch(
        setQuery(
          `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
          'dateScanned',
          reportName
        )
      );
    } else {
      dispatch(setQuery('', 'dateScanned', reportName));
    }
  };

  const dateLostHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');

      dispatch(
        setQuery(
          `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
          'dateLost',
          reportName
        )
      );
    } else {
      dispatch(setQuery('', 'dateLost', reportName));
    }
  };

  const lostDateScannedHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');

      dispatch(
        setQuery(
          `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
          'dateCreated',
          reportName
        )
      );
    } else {
      dispatch(setQuery('', 'dateCreated', reportName));
    }
  };

  const urgentDateScannedHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');

      dispatch(
        setQuery(
          `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
          'date_scanned',
          reportName
        )
      );
    } else {
      dispatch(setQuery('', 'date_scanned', reportName));
    }
  };

  const dateUploadHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');
      if (date.value[0]) {
        dispatch(
          setQuery(
            `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
            'dateUpload',
            reportName
          )
        );
      } else {
        dispatch(setQuery('', 'dateUpload', reportName));
      }
    } else {
      dispatch(setQuery('', 'dateUpload', reportName));
    }
  };

  const cancelledDateScannedHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');

      dispatch(
        setQuery(
          `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
          'date_scanned',
          reportName
        )
      );
    } else {
      dispatch(setQuery('', 'date_scanned', reportName));
    }
  };

  const cancelledDateHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');

      dispatch(
        setQuery(
          `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
          'date_cancelled',
          reportName
        )
      );
    } else {
      dispatch(setQuery('', 'date_cancelled', reportName));
    }
  };

  const intellicareAvegaDateScannedHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');

      dispatch(
        setQuery(
          `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
          'date_scanned',
          reportName
        )
      );
    } else {
      dispatch(setQuery('', 'date_scanned', reportName));
    }
  };

  const scheduledDateCreatedHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');

      dispatch(
        setQuery(
          `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
          'date_created',
          reportName
        )
      );
    } else {
      dispatch(setQuery('', 'date_created', reportName));
    }
  };

  const scheduledDateHandle = (date) => {
    if (date.value !== null) {
      const dateReplaceSlash1 = moment(date.value[0]).format('L').toString().split('/');
      const dateReplaceSlash2 = moment(date.value[1]).format('L').toString().split('/');

      dispatch(
        setQuery(
          `${dateReplaceSlash1[0]}-${dateReplaceSlash1[1]}-${dateReplaceSlash1[2]} ${dateReplaceSlash2[0]}-${dateReplaceSlash2[1]}-${dateReplaceSlash2[2]}`,
          'schedule_date',
          reportName
        )
      );
    } else {
      dispatch(setQuery('', 'schedule_date', reportName));
    }
  };

  const filterRequestTypeHandler = (type) => {
    if (type === '0') {
      dispatch(setRequestType('', reportName));
    } else {
      dispatch(setRequestType(type, reportName));
    }
  };

  const filterRequestTypeIntellicareAvegaHandler = (type) => {
    if (type === '0') {
      dispatch(setIntellicareAvegaRequestType('', reportName));
    } else {
      dispatch(setIntellicareAvegaRequestType(type, reportName));
    }
  };

  const filterAreaHandler = (type) => {
    if (type === 'All Locations') {
      dispatch(setAreaType('', reportName));
    } else {
      dispatch(setAreaType(type, reportName));
    }
  };

  const filterHMOUgentHandler = (type) => {
    if (type === '0') {
      dispatch(setHmoUrgent('', reportName));
    } else {
      dispatch(setHmoUrgent(type, reportName));
    }
  };
  const filterHMOLostHandler = (type) => {
    if (type === '0') {
      dispatch(setHmoLost('', reportName));
    } else {
      dispatch(setHmoLost(type, reportName));
    }
  };

  const filterDepartmentLostHandler = (type) => {
    if (type === '0') {
      dispatch(setLostDepartment('', reportName));
    } else {
      dispatch(setLostDepartment(type, reportName));
    }
  };

  const filterUrgentHandler = (type) => {
    if (type === '0') {
      dispatch(setUrgentDepartment('', reportName));
    } else {
      dispatch(setUrgentDepartment(type, reportName));
    }
  };

  const filterDepartmentTransmittedHandler = (type) => {
    if (type === '0') {
      dispatch(setDepartmentTransmitted('', reportName));
    } else {
      dispatch(setDepartmentTransmitted(type, reportName));
    }
  };

  const filterHmoTransmittedHandler = (type) => {
    if (type === '0') {
      dispatch(setHmoTransmitted('', reportName));
    } else {
      dispatch(setHmoTransmitted(type, reportName));
    }
  };

  const filterStatusHandler = (type) => {
    if (type === '0') {
      dispatch(setStatus('', reportName));
    } else {
      dispatch(setStatus(type, reportName));
    }
  };

  const filterDepartmentCancelledHandler = (type) => {
    if (type === '0') {
      dispatch(setDepartmentCancelled('', reportName));
    } else {
      dispatch(setDepartmentCancelled(type, reportName));
    }
  };

  const filterHmoCancelledHandler = (type) => {
    if (type === '0') {
      dispatch(setHmoCancelled('', reportName));
    } else {
      dispatch(setHmoCancelled(type, reportName));
    }
  };

  const filterHmoIntellicareAvegaHandler = (type) => {
    if (type === '0') {
      dispatch(setHmoIntellicareAvega('', reportName));
    } else {
      dispatch(setHmoIntellicareAvega(type, reportName));
    }
  };

  const filterHmoScheduledHandler = (type) => {
    console.log(type, 'HMO TYPE');
    if (type === '0') {
      dispatch(setHmoScheduled('', reportName));
    } else {
      dispatch(setHmoScheduled(type, reportName));
    }
  };

  const filterHmoStatisticsPerDepartmentHandler = (type) => {
    if (type === '0') {
      dispatch(setHmoStatisticsPerDepartment('', reportName));
    } else {
      dispatch(setHmoStatisticsPerDepartment(type, reportName));
    }
  };

  const filterDepartmentIntellicareAvegaHandler = (type) => {
    if (type === '0') {
      dispatch(setDepartmentIntellicareAvega('', reportName));
    } else {
      dispatch(setDepartmentIntellicareAvega(type, reportName));
    }
  };

  const filterDepartmentScheduledHandler = (type) => {
    console.log(type, 'DEPARTMENT TYPE');
    if (type === '0') {
      dispatch(setDepartmentScheduled('', reportName));
    } else {
      dispatch(setDepartmentScheduled(type, reportName));
    }
  };

  const filterDepartmentStatisticsPerDepartmentHandler = (type) => {
    if (type === '0') {
      dispatch(setDepartmentStatisticsPerDepartment('', reportName));
    } else {
      dispatch(setDepartmentStatisticsPerDepartment(type, reportName));
    }
  };

  let columns = [];

  if (reportName === 'recTransmitReport') {
    columns = [
      {
        name: 'transmittalNo',
        label: 'Transmittal No.',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Number"
              reportName={reportName}
              defaultValue={report.searchParams.transmittal_no}
              InputPlaceholder="Search..."
              actionToDispatch={setTransmittal}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'requestor',
        label: 'Requestor',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.requestor}
              InputPlaceholder="Search..."
              actionToDispatch={setRequestor}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'department',
        label: 'Department',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              columnName={column.name}
              reportName={reportName}
              columnLabel={column.label}
              dataItem={report.department}
              filterTypeHandler={filterDepartmentTransmittedHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'hmoPartner',
        label: 'HMO Partner',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={CONSTANTS.HMO_REPORT_TEXT}
              filterTypeHandler={filterHmoTransmittedHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'requestType',
        label: 'Request Type',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={CONSTANTS.REQUEST_TYPE_REPORT_TEXT}
              filterTypeHandler={filterRequestTypeHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'dateScanned',
        label: 'Date Scanned',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dateRangeFilter={dateScannedHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'admin',
        label: 'Admin',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.assigned_admin_id}
              InputPlaceholder="Search..."
              actionToDispatch={getAdmin}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'messenger',
        label: 'Messenger',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.assigned_messenger_id}
              InputPlaceholder="Search..."
              actionToDispatch={setMessenger}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'dateUpload',
        label: 'Date Upload',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              columnName={column.name}
              columnLabel={column.label}
              reportName={reportName}
              dateRangeFilter={dateUploadHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'status',
        label: 'Status',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              reportName={reportName}
              dataItem={CONSTANTS.TRACKING_STATUS_3}
              filterTypeHandler={filterStatusHandler}
              searchParams={report.searchParams}
            />
          ),
          customBodyRender: (value, tableMeta, updateValue) => {
            let valueItem = '';

            const data = CONSTANTS.TRACKING_STATUS.find((item) => item.code === value);

            if (data) {
              valueItem = data.text;
            } else {
              valueItem = 0;
            }

            if (value === 1) {
              return (
                <div className="custom-alert-info">
                  <Alert severity="info">{valueItem}</Alert>
                </div>
              );
            } else if (value === 2 || value === 3) {
              return <Alert severity="warning">{valueItem}</Alert>;
            } else if (value > 5 && value < 8) {
              return <Alert severity="success">{valueItem}</Alert>;
            } else if (value > 7 && value < 14) {
              return <Alert severity="error">{value === 12 ? 'Cancelled' : valueItem}</Alert>;
            } else if (value > 3 && value < 6) {
              return <Alert severity="info">{valueItem}</Alert>;
            } else {
              return value;
            }
          },
        },
      },
    ];
  } else if (reportName === 'messengerMonitoring') {
    columns = [
      {
        name: 'messenger',
        label: 'Messenger',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.transmittal_no}
              InputPlaceholder="Search..."
              actionToDispatch={setMessengerMonitoring}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'area',
        label: 'Area',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={city}
              filterTypeHandler={filterAreaHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'forDelivery',
        label: 'For Delivery',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'delivered',
        label: 'Delivered',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'notDelivered',
        label: 'Not Delivered',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'cannotDelivered',
        label: 'Cannot Deliver',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'forPickUp',
        label: 'For Pickup',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'pickedUp',
        label: 'Picked Up',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'notPickedUp',
        label: 'Not Picked Up',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'cannotPickUp',
        label: 'Cannot Pickup',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'cancelled',
        label: 'Cancelled',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
    ];
  } else if (reportName === 'lostInTransit') {
    columns = [
      {
        name: 'transmittalNo',
        label: 'Transmittal No.',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Number"
              reportName={reportName}
              defaultValue={report.searchParams.transmittal_no}
              InputPlaceholder="Search..."
              actionToDispatch={setTransmittal}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'item',
        label: 'Item',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'requestor',
        label: 'Requestor',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.transmittal_no}
              InputPlaceholder="Search..."
              actionToDispatch={setLostRequestor}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'department',
        label: 'Department',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={report.department}
              filterTypeHandler={filterDepartmentLostHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'hmoPartner',
        label: 'HMO Partner',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={CONSTANTS.HMO_REPORT_TEXT}
              filterTypeHandler={filterHMOLostHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },

      {
        name: 'dateCreated',
        label: 'Date Scanned',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              columnName={column.name}
              columnLabel={column.label}
              reportName={reportName}
              dateRangeFilter={lostDateScannedHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'messenger',
        label: 'Messenger',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.transmittal_no}
              InputPlaceholder="Search..."
              actionToDispatch={setMessengerLost}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'dateLost',
        label: 'Date Lost',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              columnName={column.name}
              columnLabel={column.label}
              reportName={reportName}
              dateRangeFilter={dateLostHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
    ];
  } else if (reportName === 'urgentRequest') {
    columns = [
      {
        name: 'transmittal_no',
        label: 'Transmittal No.',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Number"
              reportName={reportName}
              defaultValue={report.searchParams.transmittal_no}
              InputPlaceholder="Search..."
              actionToDispatch={setTransmittal}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'item',
        label: 'Item',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'reason_for_urgency',
        label: 'Reason for Urgency',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'requestor',
        label: 'Requestor',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.transmittal_no}
              InputPlaceholder="Search..."
              actionToDispatch={setUrgentRequestor}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'department',
        label: 'Department',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={report.department}
              filterTypeHandler={filterUrgentHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'hmo_partner',
        label: 'HMO Partner',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={CONSTANTS.HMO_REPORT_TEXT}
              filterTypeHandler={filterHMOUgentHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'date_scanned',
        label: 'Date Scanned',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              columnName={column.name}
              columnLabel={column.label}
              reportName={reportName}
              dateRangeFilter={urgentDateScannedHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
    ];
  } else if (reportName === 'cancelledRequestsReport') {
    columns = [
      {
        name: 'transmittal_no',
        label: 'Transmittal No.',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Number"
              reportName={reportName}
              defaultValue={report.searchParams.transmittal_no}
              InputPlaceholder="Search..."
              actionToDispatch={setTransmittal}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'item',
        label: 'Item',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacer={true}
            />
          ),
        },
      },
      {
        name: 'reason_for_cancellation',
        label: 'Reason for Cancellation',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacer={true}
            />
          ),
        },
      },
      {
        name: 'requestor',
        label: 'Requestor',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.requestor}
              InputPlaceholder="Search..."
              actionToDispatch={setCancelledRequestor}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'department',
        label: 'Department',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={report.department}
              filterTypeHandler={filterDepartmentCancelledHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'hmo_partner',
        label: 'HMO Partner',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={CONSTANTS.HMO_REPORT_TEXT}
              filterTypeHandler={filterHmoCancelledHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'date_scanned',
        label: 'Date Scanned',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              columnName={column.name}
              columnLabel={column.label}
              reportName={reportName}
              dateRangeFilter={cancelledDateScannedHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'date_cancelled',
        label: 'Date Cancelled',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              columnName={column.name}
              columnLabel={column.label}
              reportName={reportName}
              dateRangeFilter={cancelledDateHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
    ];
  } else if (reportName === 'partnerRequestsReport') {
    columns = [
      {
        name: 'hmo_partner',
        label: 'HMO Partner',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={CONSTANTS.HMO_REPORT_TEXT}
              filterTypeHandler={filterHmoIntellicareAvegaHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'department',
        label: 'Department',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={report.department}
              filterTypeHandler={filterDepartmentIntellicareAvegaHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'requestor',
        label: 'Requestor',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.requestor}
              InputPlaceholder="Search..."
              actionToDispatch={setIntellicareAvegaRequestor}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'date_scanned',
        label: 'Date Scanned',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              columnName={column.name}
              columnLabel={column.label}
              reportName={reportName}
              dateRangeFilter={intellicareAvegaDateScannedHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'transmittal_no',
        label: 'Transmittal No.',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Number"
              reportName={reportName}
              defaultValue={report.searchParams.transmittal_no}
              InputPlaceholder="Search..."
              actionToDispatch={setTransmittalIntellicareAvega}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'request_type',
        label: 'Request Type',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={CONSTANTS.REQUEST_TYPE_REPORT_TEXT}
              filterTypeHandler={filterRequestTypeIntellicareAvegaHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'item',
        label: 'Item',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
    ];
  } else if (reportName === 'scheduledRequestsReport') {
    columns = [
      {
        name: 'department_id',
        label: 'Department',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={report.department}
              filterTypeHandler={filterDepartmentScheduledHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'requestor',
        label: 'Requestor',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnSearchForm
              key={index}
              columnName={column.name}
              columnLabel={column.label}
              InputType="Text"
              reportName={reportName}
              defaultValue={report.searchParams.requestor}
              InputPlaceholder="Search..."
              actionToDispatch={setScheduledRequestor}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'hmo_partner_id',
        label: 'HMO Partner',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={CONSTANTS.HMO_REPORT_TEXT}
              filterTypeHandler={filterHmoScheduledHandler}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'date_created',
        label: 'Date Created',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              columnName={column.name}
              columnLabel={column.label}
              reportName={reportName}
              dateRangeFilter={scheduledDateCreatedHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'item',
        label: 'Item',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
            />
          ),
        },
      },
      {
        name: 'schedule_date',
        label: 'Schedule',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnDate
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dateRangeFilter={scheduledDateHandle}
              searchParams={report.searchParams}
            />
          ),
        },
      },
    ];
  } else if (reportName === 'statisticsPerDepartmentReport') {
    columns = [
      {
        name: 'department',
        label: 'Department',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={report.department}
              filterTypeHandler={filterDepartmentStatisticsPerDepartmentHandler}
              searchParams={report.searchParams}
              fullFilter={true}
            />
          ),
        },
      },
      {
        name: 'hmo_partner',
        label: 'HMO Partner',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnFilter
              key={index}
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              dataItem={CONSTANTS.HMO_REPORT_TEXT}
              filterTypeHandler={filterHmoStatisticsPerDepartmentHandler}
              searchParams={report.searchParams}
              fullFilter={true}
            />
          ),
        },
      },
      {
        name: 'all_requests',
        label: 'All Requests',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'request_sent',
        label: 'Request Sent',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'for_delivery',
        label: 'For Delivery',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'delivered',
        label: 'Delivered',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'not_delivered',
        label: 'Not Delivered',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'cannot_delivered',
        label: 'Cannot Deliver',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'for_pickup',
        label: 'For Pickup',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'picked_up',
        label: 'Picked Up',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'not_picked_up',
        label: 'Not Picked Up',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'cannot_pickup',
        label: 'Cannot Pickup',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'in_transit',
        label: 'In Transit',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
      {
        name: 'cancelled',
        label: 'Cancelled',
        options: {
          filter: true,
          customHeadRender: ({ index, ...column }) => (
            <ColumnNormal
              reportName={reportName}
              columnName={column.name}
              columnLabel={column.label}
              searchParams={report.searchParams}
              fullSpacerStatus={true}
            />
          ),
        },
      },
    ];
  }

  const options = {
    filterType: 'dropdown',
    selectableRows: false,
    jsonMode: true,
    searchOpen: false,
    searchPlaceholder: 'Search...',
    responsive: 'vertical',
    search: false,
    pagination: false,
    print: false,
    download: false,
    viewColumns: false,
    textLabels: {
      body: {
        noMatch: 'No records found',
      },
    },
    filter: false,
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(ADDRESS.getHimsNcrCity());
  }, [dispatch]);

  useEffect(() => {
    if (address_info.himsNcrCityLabel) {
      const itemCity = [];
      for (const data of address_info.himsNcrCityLabel) {
        itemCity.push({ code: data, text: data });
      }

      setCity(itemCity);
    }
    // eslint-disable-next-line
  }, [address_info.himsNcrCityLabel]);

  useEffect(() => {
    const sortData = [];
    const sortHeader = [];
    const itemParams = [];

    // if( address_info.himsNcrCityLabel) {
    //   const city = []
    //   for(const i of  address_info.himsNcrCityLabel){
    //       city.push({code: })
    //   }
    // }

    if (setData) {
      let copyArr;
      let dataParams;
      for (const compareData of setData) {
        if (reportName === 'recTransmitReport') {
          copyArr = CONSTANTS.TRANSMITTED_REPORT.find((item) => item.text === compareData);
          dataParams = CONSTANTS.TRANSMITTED_REPORT_PARAMS.find((item) => item.text === compareData);
        } else if (reportName === 'messengerMonitoring') {
          copyArr = CONSTANTS.MESSENGER_MONITORING.find((item) => item.text === compareData);
          dataParams = CONSTANTS.MESSENGER_MONITORING_EXCEL.find((item) => item.text === compareData);
        } else if (reportName === 'lostInTransit') {
          copyArr = CONSTANTS.LOST_IN_TRANSIT.find((item) => item.text === compareData);
          dataParams = CONSTANTS.LOST_TRANSIT_PARAMS.find((item) => item.text === compareData);
        } else if (reportName === 'urgentRequest') {
          copyArr = CONSTANTS.URGENT_REQUEST.find((item) => item.text === compareData);
          dataParams = CONSTANTS.URGENT_REQUEST_PARAMS.find((item) => item.text === compareData);
        } else if (reportName === 'cancelledRequestsReport') {
          copyArr = CONSTANTS.CANCELLED_REQUEST.find((item) => item.text === compareData);
          dataParams = CONSTANTS.CANCELLED_REQUEST_PARAMS.find((item) => item.text === compareData);
        } else if (reportName === 'partnerRequestsReport') {
          copyArr = CONSTANTS.INTELLICARE_AVEGA_REQUEST.find((item) => item.text === compareData);
          dataParams = CONSTANTS.INTELLICARE_AVEGA_REQUEST_PARAMS.find((item) => item.text === compareData);
        } else if (reportName === 'scheduledRequestsReport') {
          copyArr = CONSTANTS.SCHEDULED_REQUEST.find((item) => item.text === compareData);
          dataParams = CONSTANTS.SCHEDULED_REQUEST_PARAMS.find((item) => item.text === compareData);
        } else if (reportName === 'statisticsPerDepartmentReport') {
          copyArr = CONSTANTS.STATISTICS_PER_DEPARTMENT.find((item) => item.text === compareData);
          dataParams = CONSTANTS.STATISTICS_PER_DEPARTMENT_PARAMS.find((item) => item.text === compareData);
        }
        if (dataParams) {
          itemParams.push(dataParams.code);
          sortHeader.push(copyArr.text);
          sortData.push(copyArr.code);
        }
      }
      setParams(itemParams);

      const reportHeader =
        reportName === 'recTransmitReport'
          ? CONSTANTS.TRANSMITTED_REPORT
          : reportName === 'messengerMonitoring'
          ? CONSTANTS.MESSENGER_MONITORING
          : reportName === 'lostInTransit'
          ? CONSTANTS.LOST_IN_TRANSIT
          : reportName === 'urgentRequest'
          ? CONSTANTS.URGENT_REQUEST
          : reportName === 'cancelledRequestsReport'
          ? CONSTANTS.CANCELLED_REQUEST
          : reportName === 'partnerRequestsReport'
          ? CONSTANTS.INTELLICARE_AVEGA_REQUEST
          : reportName === 'scheduledRequestsReport'
          ? CONSTANTS.SCHEDULED_REQUEST
          : reportName === 'statisticsPerDepartmentReport'
          ? CONSTANTS.STATISTICS_PER_DEPARTMENT
          : [];

      let copyTableHeader = sortHeader;
      let newTableHeader = [];

      reportHeader.forEach((column) => {
        copyTableHeader.forEach((headerColumn) => {
          if (headerColumn === column.text) {
            newTableHeader.push(headerColumn);
          }
        });
      });

      setTBHeader(newTableHeader);

      const pick = (obj, keys) =>
        Object.keys(obj)
          .filter((i) => keys.includes(i))
          .reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
          }, {});

      if (item.data) {
        const tableData = [];
        item.data.forEach((i) => {
          tableData.push(pick(i, sortData));
        });

        setTableItem(tableData);
      }
    }
    if (showPrint) {
      const data = document.getElementById('print-report');
      const img =
        'data:image/png;base64,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';

      const reportTitleArr = title.split(' ');
      let reportTitle = [];
      let reportTitleFinal;

      reportTitleArr.forEach((item) => {
        const itemUppercase = item.charAt(0).toUpperCase() + item.substr(1);

        reportTitle.push(itemUppercase);
      });

      reportTitleFinal = reportTitle.join('');

      const dateFormat = moment(new Date()).format('YYYYMMDD');
      const timeFormat = moment(new Date()).format('hhmmss');

      const fileName = `${reportTitleFinal}Report_${dateFormat}_${timeFormat}`;

      const opt = {
        margin: [60, 0, 0, 0],

        filename: fileName,
        image: { type: 'jpeg', quality: 1 },

        html2canvas: { dpi: 96, logging: true, scale: 4 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };
      html2pdf()
        .from(data)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
          const totalPagesExp = '{total_pages_count_string}';
          const dateAndTime = moment().format('MMM D, YYYY hh:mm:ss A');
          const reportDateRange = `${moment(report.tableQuery.from).format('MMMM D, YYYY')} to ${moment(
            report.tableQuery.to
          ).format('MMMM D, YYYY')}`;

          // /
          const header = function (data) {
            let str = 'Page ' + data.pageCount;

            if (typeof pdf.putTotalPages === 'function') {
              str = str + ' of ' + totalPagesExp;
            }

            let finalTitle = `${title} Report`;

            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(269, 12, str);
            pdf.addImage(img, 'PNG', 15, 5, 45, 15);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(63, 12, '7/F Feliza Building, 108 V.A. Rufino St., Legaspi Village, Makati City, Philippines');
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(63, 17, 'Tels.: (632) 789-400 Fax # (632)750-7009');
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('bold');
            pdf.setFontSize(25);
            const fontSize = pdf.internal.getFontSize();
            const pageWidth = pdf.internal.pageSize.width;
            const txtWidth = (pdf.getStringUnitWidth(finalTitle) * fontSize) / pdf.internal.scaleFactor;
            const xOffset = (pageWidth - txtWidth) / 2;

            pdf.text(xOffset, 32, finalTitle);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('bold');
            pdf.setFontSize(14);
            pdf.text(15, 42, 'Report Details');
            pdf.setDrawColor(165, 176, 190);
            pdf.line(15, 45, 278, 45);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(15, 52, 'Generated By:');
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('bold');
            pdf.setFontSize(9);
            pdf.text(50, 52, `${auth.user.first_name} ${auth.user.last_name} (${auth.user.username})`);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(170, 42, 'Report Date Range:');
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('bold');
            pdf.setFontSize(9);
            pdf.text(210, 42, reportDateRange);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(170, 52, 'Date Generated:');
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('bold');
            pdf.setFontSize(9);
            pdf.text(210, 52, dateAndTime);
            // /
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('bold');
            pdf.setFontSize(11);

            pdf.setDrawColor(165, 176, 190);
            pdf.line(15, 68, 278, 68);
          };

          // let tablePdfColumn = [];

          // tbHeader.forEach((item) => {
          //   tablePdfColumn.push({
          //     header: item,
          //     dataKey: item.toLowerCase().replace(/\s/g, ''),
          //   });
          // });

          // let tablePdfColumnStyle = {}

          // if (reportName === 'cancelledRequestsReport') {
          //   tablePdfColumnStyle = {
          //     item: { cellWidth: 37 },
          //     reasonforcancellation: { cellWidth: 37 }
          //   }
          // }

          autotable(pdf, {
            html: '#table-id',
            margin: {
              top: 60,
            },
            styles: {
              overflow: 'linebreak',
              fontSize: 8,
            },
            tableWidth: 'auto',
            beforePageContent: header,
            theme: 'plain', // 'grid',//'plain',
            startY: 60,
            // columns: tablePdfColumn,
            // columnStyles: tablePdfColumnStyle,
            headStyles: {
              fontSize: 8,
              cellWidth:
                reportName === 'partnerRequestsReport' || reportName === 'urgentRequest'
                  ? 37
                  : reportName === 'cancelledRequestsReport' || reportName === 'lostInTransit'
                  ? 35
                  : reportName === 'scheduledRequestsReport'
                  ? 40
                  : 'auto',
            },
          });

          if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
          }
          // pdf.autoPrint()
          // window.open(pdf.output('bloburl'), '_blank')
        })
        .save();
    }

    setTimeout(() => {
      setShowPrint(false);
    }, 5);

    // if (isEmpty(report.table)) {
    //   console.log(report.table, 'POGIIIII')
    //   dispatch(getReport(report.tableQuery, reportName))
    // }

    if (report.table) {
      if (report.table[0]) {
        const dataFilter = { data: [] };

        for (const item of report.table) {
          let objectItem = {};
          if (reportName === 'recTransmitReport') {
            objectItem = {
              transmittalNo: item.transmittal_no,
              requestor: item.requestorInfo.first_name + ' ' + item.requestorInfo.last_name,
              department: item.requestor_department_name,
              hmoPartner: item.requestor_hmo_partner_id === 1 ? 'Avega' : 'Intellicare',
              requestType: item.request_type === 1 ? 'Delivery' : 'Pickup',
              dateScanned: moment(item.scanned_at).format('MMM DD, YYYY'),
              admin: `${item.adminInfo.first_name}  ${item.adminInfo.last_name}`,
              messenger: `${item.messengerInfo.first_name}  ${item.messengerInfo.last_name}`,
              dateUpload: moment(item.created_at).format('MMM DD, YYYY'),
              status: item.tracking_status,
            };
          } else if (reportName === 'messengerMonitoring') {
            const loc = [];

            for (const data of item.assigned_locations_labels) {
              const lastItem = item.assigned_locations_labels[item.assigned_locations_labels.length - 1];

              if (lastItem.city === data.city) {
                loc.push(`${data.city}${' '}`);
              } else {
                loc.push(`${data.city}, ${' '}`);
              }
            }

            if (item.messengerRequests) {
              objectItem = {
                messenger: item.first_name + ' ' + item.last_name,
                area: loc,
                forDelivery: item.messengerRequests.forDelivery,
                delivered: item.messengerRequests.delivered,
                notDelivered: item.messengerRequests.notDelivered,
                cannotDelivered: item.messengerRequests.cannotDelivered,
                forPickUp: item.messengerRequests.forPickUp,
                pickedUp: item.messengerRequests.pickedUp,
                notPickedUp: item.messengerRequests.notPickedUp,
                cannotPickUp: item.messengerRequests.cannotPickUp,
                cancelled: item.messengerRequests.cancelled,
              };
            } else {
              objectItem = {
                messenger: item.first_name + ' ' + item.last_name,
                area: loc,
                forDelivery: 0,
                delivered: 0,
                notDelivered: 0,
                cannotDelivered: 0,
                forPickUp: 0,
                pickedUp: 0,
                notPickedUp: 0,
                cannotPickUp: 0,
                cancelled: 0,
              };
            }
          } else if (reportName === 'lostInTransit') {
            const itemCard = [];

            for (const data of item.item.items) {
              itemCard.push(
                `${
                  data.type === 1
                    ? 'Check'
                    : data.type === 2
                    ? 'SOA'
                    : data.type === 3
                    ? 'ID Cards'
                    : truncateData
                    ? data.other
                      ? data.other
                      : 'N/A'
                    : data.other
                    ? data.other.length > 47
                      ? data.other.substring(0, 50 - 3) + '...'
                      : data.other
                    : 'N/A'
                }`
              );
            }

            const finalItemCard = itemCard.join(', ');

            objectItem = {
              transmittalNo: item.transmittal_no,
              item: finalItemCard,
              requestor: item.requestorInfo.first_name + ' ' + item.requestorInfo.last_name,

              department: item.requestor_department_name,
              hmoPartner:
                item.requestor_hmo_partner_id === 1
                  ? 'Avega'
                  : item.requestor_hmo_partner_id === 2
                  ? 'Intellicare'
                  : '',
              dateCreated: moment(item.created_at).format('MMM DD, YYYY'),

              messenger: item.messengerInfo.first_name + ' ' + item.messengerInfo.last_name,
              dateLost: moment(
                item.tracking_status_details.cannot_deliver
                  ? item.tracking_status_details.cannot_deliver.date
                  : item.tracking_status_details.cannot_pickup && item.tracking_status_details.cannot_pickup.date
              ).format('MMM DD, YYYY'),
            };
          } else if (reportName === 'urgentRequest') {
            const itemCard = [];

            for (const data of item.item.items) {
              itemCard.push(
                `${
                  data.type === 1
                    ? 'Check'
                    : data.type === 2
                    ? 'SOA'
                    : data.type === 3
                    ? 'ID Cards'
                    : truncateData
                    ? data.other
                      ? data.other
                      : 'N/A'
                    : data.other
                    ? data.other.length > 47
                      ? data.other.substring(0, 50 - 3) + '...'
                      : data.other
                    : 'N/A'
                }`
              );
            }

            const finalItemCard = itemCard.join(', ');

            objectItem = {
              transmittal_no: item.transmittal_no,
              item: finalItemCard,
              reason_for_urgency: truncateData
                ? item.reason_urgency
                  ? item.reason_urgency
                  : 'N/A'
                : item.reason_urgency
                ? item.reason_urgency.length > 29
                  ? item.reason_urgency.substring(0, 32 - 3) + '...'
                  : item.reason_urgency
                : 'N/A',
              requestor: item.requestorInfo.first_name + ' ' + item.requestorInfo.last_name,
              department: item.requestor_department_name,
              hmo_partner:
                item.requestor_hmo_partner_id === 1
                  ? 'Avega'
                  : item.requestor_hmo_partner_id === 2
                  ? 'Intellicare'
                  : '',
              date_scanned: moment(item.scanned_at).format('MMM DD, YYYY'),
            };
          } else if (reportName === 'cancelledRequestsReport') {
            const itemCard = [];

            for (const data of item.item.items) {
              itemCard.push(
                `${
                  data.type === 1
                    ? 'Check'
                    : data.type === 2
                    ? 'SOA'
                    : data.type === 3
                    ? 'ID Cards'
                    : truncateData
                    ? data.other
                      ? data.other
                      : 'N/A'
                    : data.other
                    ? data.other.length > 47
                      ? data.other.substring(0, 50 - 3) + '...'
                      : data.other
                    : 'N/A'
                }`
              );
            }

            const finalItemCard = itemCard.join(', ');

            objectItem = {
              transmittal_no: item.transmittal_no,
              item: finalItemCard,
              reason_for_cancellation: truncateData
                ? item.tracking_status_details.reason
                  ? item.tracking_status_details.reason
                  : 'N/A'
                : item.tracking_status_details.reason
                ? item.tracking_status_details.reason.length > 29
                  ? item.tracking_status_details.reason.substring(0, 32 - 3) + '...'
                  : item.tracking_status_details.reason
                : 'N/A',
              requestor: item.requestorInfo.first_name + ' ' + item.requestorInfo.last_name,
              department: item.requestor_department_name,
              hmo_partner:
                item.requestor_hmo_partner_id === 1
                  ? 'Avega'
                  : item.requestor_hmo_partner_id === 2
                  ? 'Intellicare'
                  : '',
              date_scanned: moment(item.scanned_at).format('MMM DD, YYYY'),
              date_cancelled: moment(item.tracking_status_details.date).format('MMM DD, YYYY'),
            };
          } else if (reportName === 'partnerRequestsReport') {
            const itemCard = [];

            for (const data of item.item.items) {
              itemCard.push(
                `${
                  data.type === 1
                    ? 'Check'
                    : data.type === 2
                    ? 'SOA'
                    : data.type === 3
                    ? 'ID Cards'
                    : truncateData
                    ? data.other
                      ? data.other
                      : 'N/A'
                    : data.other
                    ? data.other.length > 47
                      ? data.other.substring(0, 50 - 3) + '...'
                      : data.other
                    : 'N/A'
                }`
              );
            }

            const finalItemCard = itemCard.join(', ');

            objectItem = {
              hmo_partner:
                item.requestor_hmo_partner_id === 1
                  ? 'Avega'
                  : item.requestor_hmo_partner_id === 2
                  ? 'Intellicare'
                  : '',
              department: item.requestor_department_name,
              requestor: item.requestorInfo.first_name + ' ' + item.requestorInfo.last_name,
              date_scanned: moment(item.scanned_at).format('MMM DD, YYYY'),
              transmittal_no: item.transmittal_no,
              request_type: CONSTANTS.REQUEST_TYPE_REPORT_TEXT[item.request_type].text,
              item: finalItemCard,
            };
          } else if (reportName === 'scheduledRequestsReport') {
            const itemCard = [];

            for (const data of item.item_details.items) {
              itemCard.push(
                `${
                  data.type === 1
                    ? 'Check'
                    : data.type === 2
                    ? 'SOA'
                    : data.type === 3
                    ? 'ID Cards'
                    : truncateData
                    ? data.other
                      ? data.other
                      : 'N/A'
                    : data.other
                    ? data.other.length > 47
                      ? data.other.substring(0, 50 - 3) + '...'
                      : data.other
                    : 'N/A'
                }`
              );
            }

            const finalItemCard = itemCard.join(', ');

            let weekDays = [];
            let monthlyLabel = '';

            if (item.schedule_details.repeats === 'weekly') {
              item.schedule_details.weekly_days.forEach((day) => {
                if (day === 'monday') {
                  weekDays.push('Mon');
                }

                if (day === 'tuesday') {
                  weekDays.push('Tue');
                }

                if (day === 'wednesday') {
                  weekDays.push('Wed');
                }

                if (day === 'thursday') {
                  weekDays.push('Thu');
                }

                if (day === 'friday') {
                  weekDays.push('Fri');
                }
              });
            }

            const finalWeekday = weekDays.join(', ');

            if (item.schedule_details.repeats === 'monthly') {
              if (item.schedule_details.day_of === 'week') {
                let dayWeekNumber = item.schedule_details.day_of_week_number;
                let dayWeek = item.schedule_details.day_of_week;

                const finalDayWeekNumber = dayWeekNumber.charAt(0).toUpperCase() + dayWeekNumber.slice(1);
                const finalDayWeek = dayWeek.charAt(0).toUpperCase() + dayWeek.slice(1);

                monthlyLabel = `${finalDayWeekNumber} ${finalDayWeek} of the Week`;
              } else {
                let suffixNumber = item.schedule_details.day_of_month;

                const singleDigit = suffixNumber % 10;
                const doubleDigit = suffixNumber % 100;

                if (singleDigit === 1 && doubleDigit !== 11) {
                  suffixNumber = suffixNumber + 'st';
                } else if (singleDigit === 2 && doubleDigit !== 12) {
                  suffixNumber = suffixNumber + 'nd';
                } else if (singleDigit === 3 && doubleDigit !== 13) {
                  suffixNumber = suffixNumber + 'rd';
                } else {
                  suffixNumber = suffixNumber + 'th';
                }

                monthlyLabel = `${suffixNumber} Day of the Month`;
              }
            }

            const repeats =
              item.schedule_details.repeats === 'daily'
                ? 'Daily (Business Days)'
                : item.schedule_details.repeats === 'weekly'
                ? `Weekly (${finalWeekday})`
                : item.schedule_details.repeats === 'monthly'
                ? `Monthly (${monthlyLabel})`
                : 'N/A';

            objectItem = {
              department_id: item.request_details.department_name,
              requestor: item.requestorInfo.first_name + ' ' + item.requestorInfo.last_name,
              hmo_partner_id:
                item.request_details.hmo_partner_id === 1
                  ? 'Avega'
                  : item.request_details.hmo_partner_id === 2
                  ? 'Intellicare'
                  : '',
              date_created: moment(item.created_at).format('MMM DD, YYYY'),
              item: finalItemCard,
              schedule_date: `${repeats} from ${moment(item.schedule_details.starts_on).format(
                'MMM DD, YYYY'
              )} to ${moment(item.schedule_details.ends_on).format('MMM DD, YYYY')}`,
            };
          } else if (reportName === 'statisticsPerDepartmentReport') {
            objectItem = {
              department: item.requestor_department_name,
              hmo_partner:
                item.requestor_hmo_partner_id === 1
                  ? 'Avega'
                  : item.requestor_hmo_partner_id === 2
                  ? 'Intellicare'
                  : '',
              all_requests: item.all_requests,
              request_sent: item.request_sent,
              for_delivery: item.for_delivery,
              delivered: item.delivered,
              not_delivered: item.not_delivered,
              cannot_delivered: item.cannot_delivered,
              for_pickup: item.for_pickUp,
              picked_up: item.picked_up,
              not_picked_up: item.not_picked_up,
              cannot_pickup: item.cannot_pickup,
              in_transit: item.in_transit,
              cancelled: item.cancelled,
            };
          }

          dataFilter.data.push(objectItem);
        }

        setItem(dataFilter);
      } else {
        setItem({});
      }
    } else {
      setItem({});
    }

    // eslint-disable-next-line
  }, [report.table, report.tableQuery, showPrint, truncateData, setData]);

  console.log(item.data, 'FILTERED DATA');
  console.log(report.table, 'REPORT TABLE');

  const onClickPdf = () => {
    setAnchorEl(null);
    setShowCancel(false);
    setTruncateData(true);
    dispatch(getReportPdf(report.tableQuery, reportName, setShowPrint, setTruncateData));
  };

  useEffect(() => {
    if (report.reqLoading && report.excelLoading) {
      setTimeout(() => {
        dispatch(excelReportLoading(false, false));
      }, 1000);
    }
  }, [report.excelLoading]);

  console.log(report.tableQuery.column, 'TABLE QUERY COLUMN');

  const onClickExcel = async () => {
    dispatch(excelReportLoading(true, true));
    setAnchorEl(null);
    setShowCancel(false);

    let columnItem;

    if (title === 'Recorded and Transmitted Requests') {
      columnItem = `&column[0][name]=${report.tableQuery.column[0].name}&column[0][sort]=${
        report.tableQuery.column[0].sort === '' ? 'false' : report.tableQuery.column[0].sort
      }&column[0][sortType]=${report.tableQuery.column[0].sortType}&column[0][value]=${
        report.tableQuery.column[0].value
      }&column[1][name]=${report.tableQuery.column[1].name}&column[1][sort]=${
        report.tableQuery.column[1].sort === '' ? 'false' : report.tableQuery.column[1].sort
      }&column[1][sortType]=${report.tableQuery.column[1].sortType}&column[1][value]=${
        report.tableQuery.column[1].value
      }&column[2][name]=${report.tableQuery.column[2].name}&column[2][sort]=${
        report.tableQuery.column[2].sort === '' ? 'false' : report.tableQuery.column[2].sort
      }&column[2][sortType]=${report.tableQuery.column[2].sortType}&column[2][value]=${
        report.tableQuery.column[2].value
      }&column[3][name]=${report.tableQuery.column[3].name}&column[3][sort]=${
        report.tableQuery.column[3].sort === '' ? 'false' : report.tableQuery.column[3].sort
      }&column[3][sortType]=${report.tableQuery.column[3].sortType}&column[3][value]=${
        report.tableQuery.column[3].value
      }&column[4][name]=${report.tableQuery.column[4].name}&column[4][sort]=${
        report.tableQuery.column[4].sort === '' ? 'false' : report.tableQuery.column[4].sort
      }&column[4][sortType]=${report.tableQuery.column[4].sortType}&column[4][value]=${
        report.tableQuery.column[4].value
      }&column[5][name]=${report.tableQuery.column[5].name}&column[5][sort]=${
        report.tableQuery.column[5].sort === '' ? 'false' : report.tableQuery.column[5].sort
      }&column[5][sortType]=${report.tableQuery.column[5].sortType}&column[5][value]=${
        report.tableQuery.column[5].value
      }&column[6][name]=${report.tableQuery.column[6].name}&column[6][sort]=${
        report.tableQuery.column[6].sort === '' ? 'false' : report.tableQuery.column[6].sort
      }&column[6][sortType]=${report.tableQuery.column[6].sortType}&column[6][value]=${
        report.tableQuery.column[6].value
      }&column[7][name]=${report.tableQuery.column[7].name}&column[7][sort]=${
        report.tableQuery.column[7].sort === '' ? 'false' : report.tableQuery.column[7].sort
      }&column[7][sortType]=${report.tableQuery.column[7].sortType}&column[7][value]=${
        report.tableQuery.column[7].value
      }&column[8][name]=${report.tableQuery.column[8].name}&column[8][sort]=${
        report.tableQuery.column[8].sort === '' ? 'false' : report.tableQuery.column[8].sort
      }&column[8][sortType]=${report.tableQuery.column[8].sortType}&column[8][value]=${
        report.tableQuery.column[8].value
      }&column[9][name]=${report.tableQuery.column[9].name}&column[9][sort]=${
        report.tableQuery.column[9].sort === '' ? 'false' : report.tableQuery.column[9].sort
      }&column[9][sortType]=${report.tableQuery.column[9].sortType}&column[9][value]=${
        report.tableQuery.column[9].value
      }`;
    } else if (title === 'Messenger Monitoring') {
      columnItem = `&column[0][name]=${report.tableQuery.column[0].name}&column[0][sort]=${
        report.tableQuery.column[0].sort === '' ? 'false' : report.tableQuery.column[0].sort
      }&column[0][sortType]=${report.tableQuery.column[0].sortType}&column[0][value]=${
        report.tableQuery.column[0].value
      }&column[1][name]=${report.tableQuery.column[1].name}&column[1][sort]=${
        report.tableQuery.column[1].sort === '' ? 'false' : report.tableQuery.column[1].sort
      }&column[1][sortType]=${report.tableQuery.column[1].sortType}&column[1][value]=${
        report.tableQuery.column[1].value
      }&column[2][name]=${report.tableQuery.column[2].name}&column[2][sort]=${
        report.tableQuery.column[2].sort === '' ? 'false' : report.tableQuery.column[2].sort
      }&column[2][sortType]=${report.tableQuery.column[2].sortType}&column[2][value]=${
        report.tableQuery.column[2].value
      }&column[3][name]=${report.tableQuery.column[3].name}&column[3][sort]=${
        report.tableQuery.column[3].sort === '' ? 'false' : report.tableQuery.column[3].sort
      }&column[3][sortType]=${report.tableQuery.column[3].sortType}&column[3][value]=${
        report.tableQuery.column[3].value
      }&column[4][name]=${report.tableQuery.column[4].name}&column[4][sort]=${
        report.tableQuery.column[4].sort === '' ? 'false' : report.tableQuery.column[4].sort
      }&column[4][sortType]=${report.tableQuery.column[4].sortType}&column[4][value]=${
        report.tableQuery.column[4].value
      }&column[5][name]=${report.tableQuery.column[5].name}&column[5][sort]=${
        report.tableQuery.column[5].sort === '' ? 'false' : report.tableQuery.column[5].sort
      }&column[5][sortType]=${report.tableQuery.column[5].sortType}&column[5][value]=${
        report.tableQuery.column[5].value
      }&column[6][name]=${report.tableQuery.column[6].name}&column[6][sort]=${
        report.tableQuery.column[6].sort === '' ? 'false' : report.tableQuery.column[6].sort
      }&column[6][sortType]=${report.tableQuery.column[6].sortType}&column[6][value]=${
        report.tableQuery.column[6].value
      }&column[7][name]=${report.tableQuery.column[7].name}&column[7][sort]=${
        report.tableQuery.column[7].sort === '' ? 'false' : report.tableQuery.column[7].sort
      }&column[7][sortType]=${report.tableQuery.column[7].sortType}&column[7][value]=${
        report.tableQuery.column[7].value
      }&column[8][name]=${report.tableQuery.column[8].name}&column[8][sort]=${
        report.tableQuery.column[8].sort === '' ? 'false' : report.tableQuery.column[8].sort
      }&column[8][sortType]=${report.tableQuery.column[8].sortType}&column[8][value]=${
        report.tableQuery.column[8].value
      }&column[9][name]=${report.tableQuery.column[9].name}&column[9][sort]=${
        report.tableQuery.column[9].sort === '' ? 'false' : report.tableQuery.column[9].sort
      }&column[9][sortType]=${report.tableQuery.column[9].sortType}&column[9][value]=${
        report.tableQuery.column[9].value
      }&column[10][name]=${report.tableQuery.column[10].name}&column[10][sort]=${
        report.tableQuery.column[10].sort === '' ? 'false' : report.tableQuery.column[10].sort
      }&column[10][sortType]=${report.tableQuery.column[10].sortType}&column[10][value]=${
        report.tableQuery.column[10].value
      }&column[11][name]=${report.tableQuery.column[11].name}&column[11][sort]=${
        report.tableQuery.column[11].sort === '' ? 'false' : report.tableQuery.column[11].sort
      }&column[11][sortType]=${report.tableQuery.column[11].sortType}&column[11][value]=${
        report.tableQuery.column[11].value
      }`;
    } else if (title === 'Document Lost in Transit') {
      columnItem = `&column[0][name]=${report.tableQuery.column[0].name}&column[0][sort]=${
        report.tableQuery.column[0].sort === '' ? 'false' : report.tableQuery.column[0].sort
      }&column[0][sortType]=${report.tableQuery.column[0].sortType}&column[0][value]=${
        report.tableQuery.column[0].value
      }&column[1][name]=${report.tableQuery.column[1].name}&column[1][sort]=${
        report.tableQuery.column[1].sort === '' ? 'false' : report.tableQuery.column[1].sort
      }&column[1][sortType]=${report.tableQuery.column[1].sortType}&column[1][value]=${
        report.tableQuery.column[1].value
      }&column[2][name]=${report.tableQuery.column[2].name}&column[2][sort]=${
        report.tableQuery.column[2].sort === '' ? 'false' : report.tableQuery.column[2].sort
      }&column[2][sortType]=${report.tableQuery.column[2].sortType}&column[2][value]=${
        report.tableQuery.column[2].value
      }&column[3][name]=${report.tableQuery.column[3].name}&column[3][sort]=${
        report.tableQuery.column[3].sort === '' ? 'false' : report.tableQuery.column[3].sort
      }&column[3][sortType]=${report.tableQuery.column[3].sortType}&column[3][value]=${
        report.tableQuery.column[3].value
      }&column[4][name]=${report.tableQuery.column[4].name}&column[4][sort]=${
        report.tableQuery.column[4].sort === '' ? 'false' : report.tableQuery.column[4].sort
      }&column[4][sortType]=${report.tableQuery.column[4].sortType}&column[4][value]=${
        report.tableQuery.column[4].value
      }&column[5][name]=${report.tableQuery.column[5].name}&column[5][sort]=${
        report.tableQuery.column[5].sort === '' ? 'false' : report.tableQuery.column[5].sort
      }&column[5][sortType]=${report.tableQuery.column[5].sortType}&column[5][value]=${
        report.tableQuery.column[5].value
      }&column[6][name]=${report.tableQuery.column[6].name}&column[6][sort]=${
        report.tableQuery.column[6].sort === '' ? 'false' : report.tableQuery.column[6].sort
      }&column[6][sortType]=${report.tableQuery.column[6].sortType}&column[6][value]=${
        report.tableQuery.column[6].value
      }&column[7][name]=${report.tableQuery.column[7].name}&column[7][sort]=${
        report.tableQuery.column[7].sort === '' ? 'false' : report.tableQuery.column[7].sort
      }&column[7][sortType]=${report.tableQuery.column[7].sortType}&column[7][value]=${
        report.tableQuery.column[7].value
      }`;
    } else if (title === 'Urgent Requests') {
      columnItem = `&column[0][name]=${report.tableQuery.column[0].name}&column[0][sort]=${
        report.tableQuery.column[0].sort === '' ? 'false' : report.tableQuery.column[0].sort
      }&column[0][sortType]=${report.tableQuery.column[0].sortType}&column[0][value]=${
        report.tableQuery.column[0].value
      }&column[1][name]=${report.tableQuery.column[1].name}&column[1][sort]=${
        report.tableQuery.column[1].sort === '' ? 'false' : report.tableQuery.column[1].sort
      }&column[1][sortType]=${report.tableQuery.column[1].sortType}&column[1][value]=${
        report.tableQuery.column[1].value
      }&column[2][name]=${report.tableQuery.column[2].name}&column[2][sort]=${
        report.tableQuery.column[2].sort === '' ? 'false' : report.tableQuery.column[2].sort
      }&column[2][sortType]=${report.tableQuery.column[2].sortType}&column[2][value]=${
        report.tableQuery.column[2].value
      }&column[3][name]=${report.tableQuery.column[3].name}&column[3][sort]=${
        report.tableQuery.column[3].sort === '' ? 'false' : report.tableQuery.column[3].sort
      }&column[3][sortType]=${report.tableQuery.column[3].sortType}&column[3][value]=${
        report.tableQuery.column[3].value
      }&column[4][name]=${report.tableQuery.column[4].name}&column[4][sort]=${
        report.tableQuery.column[4].sort === '' ? 'false' : report.tableQuery.column[4].sort
      }&column[4][sortType]=${report.tableQuery.column[4].sortType}&column[4][value]=${
        report.tableQuery.column[4].value
      }&column[5][name]=${report.tableQuery.column[5].name}&column[5][sort]=${
        report.tableQuery.column[5].sort === '' ? 'false' : report.tableQuery.column[5].sort
      }&column[5][sortType]=${report.tableQuery.column[5].sortType}&column[5][value]=${
        report.tableQuery.column[5].value
      }&column[6][name]=${report.tableQuery.column[6].name}&column[6][sort]=${
        report.tableQuery.column[6].sort === '' ? 'false' : report.tableQuery.column[6].sort
      }&column[6][sortType]=${report.tableQuery.column[6].sortType}&column[6][value]=${
        report.tableQuery.column[6].value
      }`;
    } else if (title === 'Cancelled Requests') {
      columnItem = `&column[0][name]=${report.tableQuery.column[0].name}&column[0][sort]=${
        report.tableQuery.column[0].sort === '' ? 'false' : report.tableQuery.column[0].sort
      }&column[0][sortType]=${report.tableQuery.column[0].sortType}&column[0][value]=${
        report.tableQuery.column[0].value
      }&column[1][name]=${report.tableQuery.column[1].name}&column[1][sort]=${
        report.tableQuery.column[1].sort === '' ? 'false' : report.tableQuery.column[1].sort
      }&column[1][sortType]=${report.tableQuery.column[1].sortType}&column[1][value]=${
        report.tableQuery.column[1].value
      }&column[2][name]=${report.tableQuery.column[2].name}&column[2][sort]=${
        report.tableQuery.column[2].sort === '' ? 'false' : report.tableQuery.column[2].sort
      }&column[2][sortType]=${report.tableQuery.column[2].sortType}&column[2][value]=${
        report.tableQuery.column[2].value
      }&column[3][name]=${report.tableQuery.column[3].name}&column[3][sort]=${
        report.tableQuery.column[3].sort === '' ? 'false' : report.tableQuery.column[3].sort
      }&column[3][sortType]=${report.tableQuery.column[3].sortType}&column[3][value]=${
        report.tableQuery.column[3].value
      }&column[4][name]=${report.tableQuery.column[4].name}&column[4][sort]=${
        report.tableQuery.column[4].sort === '' ? 'false' : report.tableQuery.column[4].sort
      }&column[4][sortType]=${report.tableQuery.column[4].sortType}&column[4][value]=${
        report.tableQuery.column[4].value
      }&column[5][name]=${report.tableQuery.column[5].name}&column[5][sort]=${
        report.tableQuery.column[5].sort === '' ? 'false' : report.tableQuery.column[5].sort
      }&column[5][sortType]=${report.tableQuery.column[5].sortType}&column[5][value]=${
        report.tableQuery.column[5].value
      }&column[6][name]=${report.tableQuery.column[6].name}&column[6][sort]=${
        report.tableQuery.column[6].sort === '' ? 'false' : report.tableQuery.column[6].sort
      }&column[6][sortType]=${report.tableQuery.column[6].sortType}&column[6][value]=${
        report.tableQuery.column[6].value
      }&column[7][name]=${report.tableQuery.column[7].name}&column[7][sort]=${
        report.tableQuery.column[7].sort === '' ? 'false' : report.tableQuery.column[7].sort
      }&column[7][sortType]=${report.tableQuery.column[7].sortType}&column[7][value]=${
        report.tableQuery.column[7].value
      }`;
    } else if (title === 'Intellicare and Avega Requests') {
      columnItem = `&column[0][name]=${report.tableQuery.column[0].name}&column[0][sort]=${
        report.tableQuery.column[0].sort === '' ? 'false' : report.tableQuery.column[0].sort
      }&column[0][sortType]=${report.tableQuery.column[0].sortType}&column[0][value]=${
        report.tableQuery.column[0].value
      }&column[1][name]=${report.tableQuery.column[1].name}&column[1][sort]=${
        report.tableQuery.column[1].sort === '' ? 'false' : report.tableQuery.column[1].sort
      }&column[1][sortType]=${report.tableQuery.column[1].sortType}&column[1][value]=${
        report.tableQuery.column[1].value
      }&column[2][name]=${report.tableQuery.column[2].name}&column[2][sort]=${
        report.tableQuery.column[2].sort === '' ? 'false' : report.tableQuery.column[2].sort
      }&column[2][sortType]=${report.tableQuery.column[2].sortType}&column[2][value]=${
        report.tableQuery.column[2].value
      }&column[3][name]=${report.tableQuery.column[3].name}&column[3][sort]=${
        report.tableQuery.column[3].sort === '' ? 'false' : report.tableQuery.column[3].sort
      }&column[3][sortType]=${report.tableQuery.column[3].sortType}&column[3][value]=${
        report.tableQuery.column[3].value
      }&column[4][name]=${report.tableQuery.column[4].name}&column[4][sort]=${
        report.tableQuery.column[4].sort === '' ? 'false' : report.tableQuery.column[4].sort
      }&column[4][sortType]=${report.tableQuery.column[4].sortType}&column[4][value]=${
        report.tableQuery.column[4].value
      }&column[5][name]=${report.tableQuery.column[5].name}&column[5][sort]=${
        report.tableQuery.column[5].sort === '' ? 'false' : report.tableQuery.column[5].sort
      }&column[5][sortType]=${report.tableQuery.column[5].sortType}&column[5][value]=${
        report.tableQuery.column[5].value
      }&column[6][name]=${report.tableQuery.column[6].name}&column[6][sort]=${
        report.tableQuery.column[6].sort === '' ? 'false' : report.tableQuery.column[6].sort
      }&column[6][sortType]=${report.tableQuery.column[6].sortType}&column[6][value]=${
        report.tableQuery.column[6].value
      }`;
    } else if (title === 'Scheduled Requests') {
      columnItem = `&column[0][name]=${report.tableQuery.column[0].name}&column[0][sort]=${
        report.tableQuery.column[0].sort === '' ? 'false' : report.tableQuery.column[0].sort
      }&column[0][sortType]=${report.tableQuery.column[0].sortType}&column[0][value]=${
        report.tableQuery.column[0].value
      }&column[1][name]=${report.tableQuery.column[1].name}&column[1][sort]=${
        report.tableQuery.column[1].sort === '' ? 'false' : report.tableQuery.column[1].sort
      }&column[1][sortType]=${report.tableQuery.column[1].sortType}&column[1][value]=${
        report.tableQuery.column[1].value
      }&column[2][name]=${report.tableQuery.column[2].name}&column[2][sort]=${
        report.tableQuery.column[2].sort === '' ? 'false' : report.tableQuery.column[2].sort
      }&column[2][sortType]=${report.tableQuery.column[2].sortType}&column[2][value]=${
        report.tableQuery.column[2].value
      }&column[3][name]=${report.tableQuery.column[3].name}&column[3][sort]=${
        report.tableQuery.column[3].sort === '' ? 'false' : report.tableQuery.column[3].sort
      }&column[3][sortType]=${report.tableQuery.column[3].sortType}&column[3][value]=${
        report.tableQuery.column[3].value
      }&column[4][name]=${report.tableQuery.column[4].name}&column[4][sort]=${
        report.tableQuery.column[4].sort === '' ? 'false' : report.tableQuery.column[4].sort
      }&column[4][sortType]=${report.tableQuery.column[4].sortType}&column[4][value]=${
        report.tableQuery.column[4].value
      }&column[5][name]=${report.tableQuery.column[5].name}&column[5][sort]=${
        report.tableQuery.column[5].sort === '' ? 'false' : report.tableQuery.column[5].sort
      }&column[5][sortType]=${report.tableQuery.column[5].sortType}&column[5][value]=${
        report.tableQuery.column[5].value
      }`;
    } else if (title === 'Statistics per Department') {
      columnItem = `&column[0][name]=${report.tableQuery.column[0].name}&column[0][sort]=${
        report.tableQuery.column[0].sort === '' ? 'false' : report.tableQuery.column[0].sort
      }&column[0][sortType]=${report.tableQuery.column[0].sortType}&column[0][value]=${
        report.tableQuery.column[0].value
      }&column[1][name]=${report.tableQuery.column[1].name}&column[1][sort]=${
        report.tableQuery.column[1].sort === '' ? 'false' : report.tableQuery.column[1].sort
      }&column[1][sortType]=${report.tableQuery.column[1].sortType}&column[1][value]=${
        report.tableQuery.column[1].value
      }&column[2][name]=${report.tableQuery.column[2].name}&column[2][sort]=${
        report.tableQuery.column[2].sort === '' ? 'false' : report.tableQuery.column[2].sort
      }&column[2][sortType]=${report.tableQuery.column[2].sortType}&column[2][value]=${
        report.tableQuery.column[2].value
      }&column[3][name]=${report.tableQuery.column[3].name}&column[3][sort]=${
        report.tableQuery.column[3].sort === '' ? 'false' : report.tableQuery.column[3].sort
      }&column[3][sortType]=${report.tableQuery.column[3].sortType}&column[3][value]=${
        report.tableQuery.column[3].value
      }&column[4][name]=${report.tableQuery.column[4].name}&column[4][sort]=${
        report.tableQuery.column[4].sort === '' ? 'false' : report.tableQuery.column[4].sort
      }&column[4][sortType]=${report.tableQuery.column[4].sortType}&column[4][value]=${
        report.tableQuery.column[4].value
      }&column[5][name]=${report.tableQuery.column[5].name}&column[5][sort]=${
        report.tableQuery.column[5].sort === '' ? 'false' : report.tableQuery.column[5].sort
      }&column[5][sortType]=${report.tableQuery.column[5].sortType}&column[5][value]=${
        report.tableQuery.column[5].value
      }&column[6][name]=${report.tableQuery.column[6].name}&column[6][sort]=${
        report.tableQuery.column[6].sort === '' ? 'false' : report.tableQuery.column[6].sort
      }&column[6][sortType]=${report.tableQuery.column[6].sortType}&column[6][value]=${
        report.tableQuery.column[6].value
      }&column[7][name]=${report.tableQuery.column[7].name}&column[7][sort]=${
        report.tableQuery.column[7].sort === '' ? 'false' : report.tableQuery.column[7].sort
      }&column[7][sortType]=${report.tableQuery.column[7].sortType}&column[7][value]=${
        report.tableQuery.column[7].value
      }&column[8][name]=${report.tableQuery.column[8].name}&column[8][sort]=${
        report.tableQuery.column[8].sort === '' ? 'false' : report.tableQuery.column[8].sort
      }&column[8][sortType]=${report.tableQuery.column[8].sortType}&column[8][value]=${
        report.tableQuery.column[8].value
      }&column[9][name]=${report.tableQuery.column[9].name}&column[9][sort]=${
        report.tableQuery.column[9].sort === '' ? 'false' : report.tableQuery.column[9].sort
      }&column[9][sortType]=${report.tableQuery.column[9].sortType}&column[9][value]=${
        report.tableQuery.column[9].value
      }&column[10][name]=${report.tableQuery.column[10].name}&column[10][sort]=${
        report.tableQuery.column[10].sort === '' ? 'false' : report.tableQuery.column[10].sort
      }&column[10][sortType]=${report.tableQuery.column[10].sortType}&column[10][value]=${
        report.tableQuery.column[10].value
      }&column[11][name]=${report.tableQuery.column[11].name}&column[11][sort]=${
        report.tableQuery.column[11].sort === '' ? 'false' : report.tableQuery.column[11].sort
      }&column[11][sortType]=${report.tableQuery.column[11].sortType}&column[11][value]=${
        report.tableQuery.column[11].value
      }&column[12][name]=${report.tableQuery.column[12].name}&column[12][sort]=${
        report.tableQuery.column[12].sort === '' ? 'false' : report.tableQuery.column[12].sort
      }&column[12][sortType]=${report.tableQuery.column[12].sortType}&column[12][value]=${
        report.tableQuery.column[12].value
      }`;
    }

    const paramsQueryLimit = report.paramsReport;
    paramsQueryLimit.queryLimit = report.pagination.totalData;
    paramsQueryLimit.from = report.tableQuery.from;
    paramsQueryLimit.to = report.tableQuery.to;
    paramsQueryLimit.showData = '1';

    const paramsReplace = params.toString().replace(/,/g, '');
    const apiResponse = await exportExcelTransmitted(paramsQueryLimit, paramsReplace, columnItem, reportName);

    const reportTitleArr = title.split(' ');
    let reportTitle = [];
    let reportTitleFinal;

    reportTitleArr.forEach((item) => {
      const itemUppercase = item.charAt(0).toUpperCase() + item.substr(1);

      reportTitle.push(itemUppercase);
    });

    reportTitleFinal = reportTitle.join('');

    const dateFormat = moment(new Date()).format('YYYYMMDD');
    const timeFormat = moment(new Date()).format('hhmmss');

    const fileName = `${reportTitleFinal}Report_${dateFormat}_${timeFormat}`;

    fileDownload(apiResponse.data, `${fileName}.xlsx`);
  };

  useEffect(() => {
    setTimeout(() => {
      setEnableDatePicker(true);
    }, 6000);
  }, []);

  return (
    <Layout>
      <Grid item>
        <Grid item sm={6}>
          <Title onClick={onReport}>Reports</Title>
        </Grid>
      </Grid>
      <Grid container>
        <div className={classes.inputHolder}>
          <p className={classes.inputTitle}>Report Name</p>
          <CommonSelect
            id="reportname"
            customCss={{ width: '100%' }}
            onChange={onChangeReportName}
            item={sampleReport}
          />
        </div>
        <div>
          <p className={classes.inputTitle}>Date Range</p>
          <div className="daterangepicker-control-section-new">
            <DateRangePickerComponent
              variant="outlined"
              placeholder={enableDatePicker ? 'Filter by date' : 'Please wait...'}
              onChange={(date) => dateRangeFilter(date)}
              enabled={enableDatePicker}
            />
          </div>
        </div>
        <div className={classes.btnHolder}>
          <Button
            variant="contained"
            className={
              report.reqLoading || dateShow === false || reportName === 'Choose type of report to generate'
                ? classes.disabledBtn
                : ''
            }
            onClick={generateReport}
            color="primary"
            data-cy="new_request_btn"
          >
            Generate
          </Button>

          {report.reqLoading && showTable && showCancel && (
            <SecondaryButton style={{ marginLeft: '10px' }} onClick={onCancel}>
              Cancel
            </SecondaryButton>
          )}
        </div>
      </Grid>
      {!showTable ? (
        <NoItemTable message={tableMessage} />
      ) : (
        <>
          <Grid container>
            <Grid item xs={7}>
              <div className={classes.titleWrapper}>
                <p className={classes.title}>{`${title} Report`}</p>
                {report.reqLoading !== true && title === 'Intellicare and Avega Requests' && (
                  <div className={classes.titleTotal}>
                    Total number of requests:{' '}
                    <span className={classes.titleTotalNum}>
                      {report.pagination.totalData ? report.pagination.totalData : 0}
                    </span>
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className={classes.multiHolder}>
                <MultiDropdown
                  label="test"
                  name={`dp-column`}
                  selectLabel="Columns included in the Report"
                  idx={setData}
                  id={`dp-column`}
                  reportName={reportName}
                  setStateData={setStateData}
                  checkList={multiItem}
                  includeSearch={true}
                />
                <Button
                  onClick={handleClick}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  className={
                    report.reqLoading || report.table.length === 0
                      ? clsx(classes.btnGenerate, classes.disabledBtn)
                      : classes.btnGenerate
                  }
                >
                  Generate Report <ArrowDropDownIcon />
                </Button>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem onClick={onClickPdf}>Export PDF</MenuItem>
                  <MenuItem onClick={onClickExcel}>Export Excel</MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>

          <TableMui
            id="table-id"
            reportName={reportName}
            dataState={item}
            columns={columns}
            options={options}
            handleBulkApprove={() => ''}
            handleBulkDisapprove={() => ''}
          />
        </>
      )}

      <div id="print-report" className={showPrint ? classes.showPrint : classes.hidePrint}>
        <table id="table-id" style={{ display: 'none' }}>
          <thead>
            <tr>
              {tbHeader &&
                tbHeader.map((item, idx) => {
                  return (
                    <th key={idx} className={tbHeader.length > 7 && classes.titleTableMany}>
                      {item}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {tableItem.map((dataItem, idx) => {
              const valueItem = Object.values(dataItem);
              return (
                <tr key={idx}>
                  {valueItem.map((value, idx) => {
                    return (
                      <>
                        {reportName !== 'messengerMonitoring' && reportName !== 'statisticsPerDepartmentReport' ? (
                          <td key={idx}>
                            {value === 1
                              ? 'Request Sent'
                              : value === 2
                              ? 'For Delivery'
                              : value === 3
                              ? 'For Pickup'
                              : value === 4 || value === 5
                              ? 'In Transit'
                              : value === 6
                              ? 'Delivered'
                              : value === 7
                              ? 'Picked Up'
                              : value === 8
                              ? 'Cannot Pickup'
                              : value === 9
                              ? 'Not Picked Up'
                              : value === 10
                              ? 'Cannot Deliver'
                              : value === 11
                              ? 'Not Delivered'
                              : value === 12
                              ? 'Cancelled'
                              : value}
                          </td>
                        ) : (
                          <td key={idx}>{value}</td>
                        )}
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <TransmittalReport />
      </div>
    </Layout>
  );
};

Reports.propTypes = {
  value: PropTypes.any,
  index: PropTypes.any,
};

export default Reports;
