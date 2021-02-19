/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Layout from '../components/Layout';
import * as SCHEDULER from '../store/actions/scheduleAction';
import {
  Grid,
  ButtonGroup,
  Button,
  FormControl,
  NativeSelect,
  withStyles,
  TextField,
  InputBase,
  TableCell,
} from '@material-ui/core';

import PrimaryButton from '../components/common/Button/PrimaryButton';

import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../components/common/Title';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import * as REQ_TYPE from '../utils/Constants';
import * as SCHEDULE from '../store/actions/scheduleAction';
import NewScheduleComponent from '../components/dds/NewScheduleComponent';
import ViewScheduledRequest from '../components/dds/ViewScheduledRequest';
import NewScheduleData from '../components/dds/NewScheduleData';
import RequestScheduleTable from '../components/common/CommonTable/RequestScheduleTable';
import Loading from '../components/common/Loading';

moment.locale();

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  newRequest: {
    display: 'flex',
  },
  root: {
    display: 'flex',
    '& .MuiTableCell-body': {
      paddingLeft: '19px !important',
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  notifIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 20px',
    ...theme.mixins.toolbar,
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    backgroundColor: '#1F236F',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: {
    ...theme.mixins.toolbar,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  newRequest: {
    display: 'flex',
    width: '211px',
    height: '46px',
  },
  marginSpacing: {
    marginRight: '30px',
  },
  searchWrapper: {
    maxWidth: '282px',
    width: '100%',
    marginRight: '30px',

    position: 'relative',
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: '0',
    },
    '& input': {
      padding: '10px 30px 10px 12px',
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    '& .e-calendar .e-content.e-month td': {
      border: '1px solid #E0E6ED',
    },
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: '#F1F7FC',
  },
  fixedHeight: {
    height: 240,
  },
  fullList: {
    width: 'auto',
  },
  depositContext: {
    flex: 1,
  },
  section1: {
    width: 250,
    margin: theme.spacing(1, 1),
  },
  notifStyle: {
    padding: theme.spacing(1, 1),
    textAlign: 'center',
  },
  headerStyle: {
    padding: theme.spacing(1, 4),
    fontWeight: 'bold',
  },
  subNotifStyle: {
    color: '#A7A8AA',
  },
  margin: {
    margin: theme.spacing(1),
  },
  loadingWidth: {
    width: '100%',
  },
  btnSearch: {
    position: 'absolute',
    opacity: '1',
    right: '13px',
    minWidth: '37px',
    minHeight: '40px',
  },
  requestTableWrapper: {
    '& table tbody tr td': {
      // borderBottom: '1px solid #E0E6ED',
      padding: '10px !important',
    },
  },
  requestBtnGroup: {
    '& button': {
      padding: '5px 20px',
      border: 'none',
    },
  },
  btnHolder: {
    marginTop: ' 24px',
    marginBottom: '19px',
  },
  schedulerWrapper: {
    display: 'flex',
  },
  btnWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tempDisabledHistory: {
    pointerEvents: 'none',
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const Scheduler = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const schedule = useSelector((state) => state.schedule);
  const user = useSelector((state) => state.auth);
  const [buttonActive, setButtonActive] = useState('active_schedule');
  const [openNewSchedule, setOpenNewSchedule] = useState(false);
  const [newData, setNewData] = useState();
  const [address, setAddress] = useState();
  const [openNewData, setOpenNewData] = useState(false);
  useEffect(() => {
    dispatch(SCHEDULER.getRequestor());
  }, []);
  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);

  useEffect(() => {
    dispatch(SCHEDULE.tableCount());
    dispatch(SCHEDULE.setScheduledRequestActiveTab(buttonActive));

    if (buttonActive === 'active_schedule') {
      dispatch(SCHEDULE.allScheduledRequest());
      dispatch(SCHEDULE.inScheduledRequestMenu(true));
    } else if (buttonActive === 'history_schedule') {
      dispatch(SCHEDULE.historyScheduleRequest());
      dispatch(SCHEDULE.inScheduledRequestMenu(false));
    }
    dispatch(SCHEDULE.closeViewRequest());
  }, [buttonActive]);

  useEffect(() => {
    if (schedule.searchParams.start_date.length !== 0) {
      setStartDate(true);
    } else {
      setStartDate(false);
    }

    if (schedule.searchParams.end_date.length !== 0) {
      setEndDate(true);
    } else {
      setEndDate(false);
    }
  }, [schedule.searchParams.start_date, schedule.searchParams.end_date]);

  useEffect(() => {
    return () => {
      dispatch(SCHEDULE.closeViewRequest());
      dispatch(SCHEDULE.clearScheduledRequestSearch());
    };
  }, []);

  const handleChange = (name) => {
    setButtonActive(name);
    setSearchValue('');

    if (buttonActive === name) {
      dispatch(SCHEDULE.allScheduledRequest());
    } else if (buttonActive === name) {
      dispatch(SCHEDULE.historyScheduleRequest());
    }

    dispatch(SCHEDULE.clearScheduledRequestSearch());
  };

  const scheduleRequest = (item) => {
    setOpenNewSchedule(item);
  };

  const openViewRequestDialog = (data) => {
    dispatch(SCHEDULE.viewScheduledRequest(data._id));
    dispatch(SCHEDULE.openScheduledRequest());
  };

  const searchHandler = (filter) => {
    setSearchValue(filter);

    if (filter.length < 1) {
      dispatch(SCHEDULE.setRequestSearch('', buttonActive));
      dispatch(SCHEDULE.setPaginationPageSchedule(1, buttonActive));
      dispatch(SCHEDULE.setPageLimitSchedule(10, buttonActive));
    }
  };

  const searchHandlerButton = () => {
    dispatch(SCHEDULE.setRequestSearch(searchValue, buttonActive));
    dispatch(SCHEDULE.setPaginationPageSchedule(1, buttonActive));
    dispatch(SCHEDULE.setPageLimitSchedule(10, buttonActive));
  };

  const dateRangeFilter = (date) => {
    if (date.value !== null) {
      const startDate = moment(date.value[0]).format('L').toString().split('/');
      const endDate = moment(date.value[1]).format('L').toString().split('/');
      const finalStartDate = `${startDate[0]}-${startDate[1]}-${startDate[2]}`;
      const finalEndDate = `${endDate[0]}-${endDate[1]}-${endDate[2]}`;

      dispatch(SCHEDULE.setDateRangeFilter(finalStartDate, finalEndDate, buttonActive));
    } else {
      dispatch(SCHEDULE.setDateRangeFilter('', '', buttonActive));
    }
  };

  const filterTypeRequestHandler = (type) => {
    if (type > 0) {
      dispatch(SCHEDULE.setRequestFilterType(type, buttonActive));
    } else {
      dispatch(SCHEDULE.setRequestFilterType('', buttonActive));
    }
  };

  const getAddress = (prov, city, bar, req) => {
    const addressItem = {
      province: prov,
      city: city,
      barangay: bar,
      req: req,
    };

    setAddress(addressItem);
  };

  const getDataItem = (data) => {
    setNewData(data);

    setOpenNewData(true);
  };

  const filterRepeatsRequestHandler = (type) => {
    if (type !== 'all') {
      dispatch(SCHEDULE.setRequestFilterRepeats(type, buttonActive));
    } else {
      dispatch(SCHEDULE.setRequestFilterRepeats('', buttonActive));
    }
  };

  const scheduledRequestTable = {
    Cell: (props) => {
      let weekDays = [];
      let monthlyLabel = '';

      if (props.rowData.schedule_details.repeats === 'weekly') {
        props.rowData.schedule_details.weekly_days.forEach((day) => {
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

      if (props.rowData.schedule_details.repeats === 'monthly') {
        if (props.rowData.schedule_details.day_of === 'week') {
          let dayWeekNumber = props.rowData.schedule_details.day_of_week_number;
          let dayWeek = props.rowData.schedule_details.day_of_week;

          const finalDayWeekNumber = dayWeekNumber.charAt(0).toUpperCase() + dayWeekNumber.slice(1);
          const finalDayWeek = dayWeek.charAt(0).toUpperCase() + dayWeek.slice(1);

          monthlyLabel = `${finalDayWeekNumber} ${finalDayWeek} of the Week`;
        } else {
          let suffixNumber = props.rowData.schedule_details.day_of_month;

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

      const request_id = props.rowData.schedule_request_id;
      const addressee = props.rowData.company_details.name;
      const request_type = props.rowData.request_details.request_type === 1 ? 'Delivery' : 'Pickup';
      const requestor = `${props.rowData.schedule_requestor.first_name} ${props.rowData.schedule_requestor.last_name}`;
      const start_date = moment(props.rowData.schedule_details.starts_on).format('MMM D, YYYY');
      const end_date = moment(props.rowData.schedule_details.ends_on).format('MMM D, YYYY');
      const repeats =
        props.rowData.schedule_details.repeats === 'daily'
          ? 'Daily (Business Days)'
          : props.rowData.schedule_details.repeats === 'weekly'
          ? `Weekly (${finalWeekday})`
          : props.rowData.schedule_details.repeats === 'monthly'
          ? `Monthly (${monthlyLabel})`
          : 'N/A';

      return props.columnDef.title === 'Request ID' ? (
        <TableCell>{request_id}</TableCell>
      ) : props.columnDef.title === 'Addressee' ? (
        <TableCell>{addressee}</TableCell>
      ) : props.columnDef.title === 'Type' ? (
        <TableCell>{request_type}</TableCell>
      ) : props.columnDef.title === 'Requestor' ? (
        <TableCell>{requestor}</TableCell>
      ) : props.columnDef.title === 'Start Date' ? (
        <TableCell>{start_date}</TableCell>
      ) : props.columnDef.title === 'End Date' ? (
        <TableCell>{end_date}</TableCell>
      ) : props.columnDef.title === 'Repeats' ? (
        <TableCell>{repeats}</TableCell>
      ) : (
        <TableCell>{props.value}</TableCell>
      );
    },
  };

  console.log(schedule, 'SCHEDULED REQUEST REDUX');

  return (
    <Layout>
      <Grid item className={classes.schedulerWrapper} sm={12}>
        <Grid item sm={6}>
          <Title>Scheduled Requests</Title>
        </Grid>
      </Grid>

      {!schedule.reqLoading && Object.keys(schedule.tableCount).length ? (
        <>
          <Grid container style={{ marginTop: 30 }}>
            <Grid
              item
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <div>
                <ButtonGroup
                  aria-label="outlined button group"
                  style={{ backgroundColor: 'white' }}
                  className={classes.requestBtnGroup}
                >
                  <Button
                    name="active_schedule"
                    disabled={buttonActive === 'active_schedule' ? true : false}
                    variant={buttonActive === 'active_schedule' ? 'contained' : null}
                    onClick={(event) => handleChange(event.currentTarget.getAttribute('name'))}
                  >
                    Active
                    <span style={{ marginLeft: '4px', fontWeight: 600 }}>
                      ({schedule.table ? schedule.tableCount.active : 0})
                    </span>
                  </Button>
                  <Button
                    name="history_schedule"
                    disabled={buttonActive === 'history_schedule' ? true : false}
                    variant={buttonActive === 'history_schedule' ? 'contained' : null}
                    onClick={(event) => handleChange(event.currentTarget.getAttribute('name'))}
                    // className={classes.tempDisabledHistory}
                  >
                    History
                    <span style={{ marginLeft: '4px', fontWeight: 600 }}>
                      {' '}
                      ({schedule.table ? schedule.tableCount.history : 0})
                    </span>
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>

          <Grid container className={classes.btnHolder}>
            <Grid item style={{ display: 'flex', alignItems: 'center' }} sm={12}>
              <Grid className={classes.searchWrapper} item>
                <TextField
                  id="outlined-start-adornment"
                  className="search-field"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(event) => searchHandler(event.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      searchHandlerButton(searchValue);
                    }
                  }}
                  autoComplete="off"
                  variant="outlined"
                />
                <Button onClick={() => searchHandlerButton(searchValue)} className={classes.btnSearch}>
                  {''}
                </Button>
              </Grid>
              <Grid item classes={{ root: classes.marginSpacing }}>
                <div className="daterangepicker-control-section daterangepicker-input date-margin section-width">
                  <DateRangePickerComponent
                    variant="outlined"
                    startDate={startDate ? schedule.searchParams.start_date : ''}
                    endDate={endDate ? schedule.searchParams.end_date : ''}
                    placeholder="Filter by Start Date to End Date"
                    onChange={(date) => dateRangeFilter(date)}
                  ></DateRangePickerComponent>
                </div>
              </Grid>
              <Grid item classes={{ root: classes.marginSpacing }}>
                <FormControl style={{ width: '159px' }}>
                  <NativeSelect
                    input={<BootstrapInput />}
                    onChange={(event) => filterTypeRequestHandler(event.target.value)}
                  >
                    {REQ_TYPE.REQUEST_TYPE_TEXT.map((type, index) => (
                      <option
                        key={index}
                        selected={schedule.searchParams.request_type === type.code.toString()}
                        value={type.code}
                      >
                        {type.text}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item classes={{ root: classes.marginSpacing }}>
                <FormControl style={{ width: '159px' }}>
                  <NativeSelect
                    input={<BootstrapInput />}
                    onChange={(event) => filterRepeatsRequestHandler(event.target.value)}
                  >
                    {REQ_TYPE.REQUEST_REPEATS_TEXT.map((type, index) => (
                      <option key={index} selected={schedule.searchParams.repeats === type.code} value={type.code}>
                        {type.text}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Grid>
              <Grid item classes={{ root: classes.marginSpacing }}>
                {user.user && user.user.user_type === 2 && (
                  <div className={classes.newRequest}>
                    <Button variant="contained" color="primary" onClick={(e) => scheduleRequest(true)}>
                      Scheduled Request <AddIcon style={{ height: '0.6em' }} />
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <RequestScheduleTable
            buttonActive={buttonActive}
            columns={REQ_TYPE.TABLE_COLUMN_SCHEDULED_REQUEST}
            data={schedule.request}
            onRowClick={(rowData) => openViewRequestDialog(rowData)}
            // actions={tableAction}
            components={scheduledRequestTable}
          />
        </>
      ) : (
        <Loading />
      )}

      {openNewSchedule && (
        <NewScheduleComponent
          getData={getDataItem}
          getAddress={getAddress}
          open={openNewSchedule}
          closeForm={setOpenNewSchedule}
        />
      )}

      {openNewData && (
        <NewScheduleData
          getData={newData}
          oncloseNewSched={setOpenNewSchedule}
          getAddress={address}
          open={openNewData}
          closeForm={setOpenNewData}
        />
      )}

      {schedule.openScheduledRequest && <ViewScheduledRequest />}
    </Layout>
  );
};

export default Scheduler;
