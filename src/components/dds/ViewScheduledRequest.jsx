import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Alert from '@material-ui/lab/Alert';

import CancelScheduledRequest from './CancelScheduledRequest';
import SecondaryButton from '../common/Button/SecondaryButton';
import Loading from '../common/Loading';
import ViewRequest from './ViewRequest';
import CancelRequest from './CancelRequest';

import * as CONSTANTS from '../../utils/Constants';
import * as REQUEST from '../../store/actions/requestActions';
import * as SCHEDULE from '../../store/actions/scheduleAction';

import { numberWithComma } from '../../utils/common';

import Check from '../../assets/img/icons/check.png';

moment.locale();

const useStyles = makeStyles((theme) => ({
  viewRequestRoot: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  iconClose: {
    width: '48px',
    height: '48px',
    fontSize: '2rem',
    color: '#2f3542',
    background: '#fff',
    boxShadow: 'none',
    border: '1px solid rgba(47, 53, 66, 0.4)',
    '& svg': {
      fontSize: '1.5rem',
    },
    '&:hover': {
      background: '#fff',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
  transmittalNo: {
    fontSize: '36px',
    fontWeight: 'bold',
  },
  requestDetailsTitleWrapper: {
    marginTop: '27px',
    marginBottom: '20px',
  },
  requestDetailsTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
  },
  btnActionWrapper: {
    textAlign: 'right',
  },
  requestColumnWidth: {
    maxWidth: '389px',
  },
  requestItemWrapper: {
    padding: '25px',
    marginBottom: '30px',
    border: '1px solid #e0e6ed',
    borderRadius: '4px',
  },
  requestItemTitle: {
    paddingBottom: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderBottom: '1px solid #e0e6ed',
  },
  requestItem: {
    marginTop: '24px',
  },
  requestItemLabel: {
    color: 'rgba(47, 53, 66, 0.8)',
  },
  requestItemData: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: '500',
  },
  requesItemHolder: {
    paddingBottom: '24px',
    borderBottom: '1px dashed #a5b0be',
    '&:last-child': {
      paddingBottom: '0',
      border: 'none',
    },
  },
  requestCreatedTitle: {
    paddingBottom: '16px',
    marginTop: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  requestCreatedTitleBorder: {
    borderBottom: '1px solid #e0e6ed',
  },
  requestCreatedWrapper: {
    marginTop: '24px',
  },
  requestCreatedHeaderItem: {
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  requestCreatedItem: {
    alignItems: 'center',
    margin: '4px 0',
    fontSize: '14px',
  },
  requestCreatedTransmittal: {
    cursor: 'pointer',
    color: '#41b67f',
  },
  customAlert: {
    padding: '0',
    fontSize: '12px',
    fontWeight: '500',
  },
  icon: {
    borderRadius: 4,
    width: 20,
    height: 20,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#41B67F',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${Check})`,
      borderRadius: 4,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#41B67F',
    },
  },
  checkboxLabel: {
    fontSize: '14px',
  },
  defaultItem: {
    pointerEvents: 'none',
  },
  defaultItemCheckbox: {
    opacity: '.5',
  },
  requestCreatedActionWrapper: {
    paddingBottom: '20px',
  },
  requestCreatedAction: {
    padding: '4px',
    fontSize: '15px',
    fontWeight: '400',
    color: '#41b67f',
    cursor: 'pointer',
  },
  cancelTransmittalRequest: {
    fontSize: '14px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewScheduledRequest = ({ refreshRequestTable, buttonActive }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule);
  const user = useSelector((state) => state.auth);
  const [tempRequestCreated, setTempRequestCreated] = useState([]);
  const [includedRequestCreated, setIncludedRequestCreated] = useState([]);
  const [filteredRequestCreated, setFilteredRequestCreated] = useState([]);
  const [selectAllRequestCreated, setSelectAllRequestCreated] = useState(false);
  const [openCancelScheduledRequest, setOpenCancelScheduledRequest] = useState(false);
  const [scheduledDetails, setScheduledDetails] = useState({});
  const [scheduledRequestId, setScheduledRequestId] = useState('');
  const [selectedTransmittalRequest, setSelectedTransmittalRequest] = useState([]);
  const [openCancelTransmittal, setOpenCancelTransmittal] = useState(false);

  const handelViewRequestDetails = (reqId) => {
    dispatch(REQUEST.getRequest(reqId));
    dispatch(REQUEST.getAuditLogs(reqId));
    dispatch(SCHEDULE.openTransmittalRequest());
  };

  const handleOpenCancelTransmittal = (bool) => {
    setOpenCancelTransmittal(bool);
  };

  useEffect(() => {
    let weekDays = [];
    let monthlyLabel = '';

    if (Object.keys(schedule.request_info).length > 0) {
      if (schedule.request_info.schedule_details.repeats === 'weekly') {
        schedule.request_info.schedule_details.weekly_days.forEach((day) => {
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

      if (schedule.request_info.schedule_details.repeats === 'monthly') {
        if (schedule.request_info.schedule_details.day_of === 'week') {
          let dayWeekNumber = schedule.request_info.schedule_details.day_of_week_number;
          let dayWeek = schedule.request_info.schedule_details.day_of_week;

          const finalDayWeekNumber = dayWeekNumber.charAt(0).toUpperCase() + dayWeekNumber.slice(1);
          const finalDayWeek = dayWeek.charAt(0).toUpperCase() + dayWeek.slice(1);

          monthlyLabel = `${finalDayWeekNumber} ${finalDayWeek} of the Week`;
        } else {
          let suffixNumber = schedule.request_info.schedule_details.day_of_month;

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

      const start_date = moment(schedule.request_info.schedule_details.starts_on).format('MMM D, YYYY');
      const end_date = moment(schedule.request_info.schedule_details.ends_on).format('MMM D, YYYY');
      const repeats =
        schedule.request_info.schedule_details.repeats === 'daily'
          ? 'Daily (Business Days)'
          : schedule.request_info.schedule_details.repeats === 'weekly'
          ? `Weekly (${finalWeekday})`
          : schedule.request_info.schedule_details.repeats === 'monthly'
          ? `Monthly (${monthlyLabel})`
          : 'N/A';

      const newScheduledDetails = {
        scheduled_repeats: repeats,
        scheduled_start_date: start_date,
        scheduled_end_date: end_date,
      };

      setScheduledDetails(newScheduledDetails);
      setTempRequestCreated(schedule.request_info.requests_transmittals);
    }
  }, [schedule.request_info]);

  useEffect(() => {
    let finalRequestCreated = [];

    tempRequestCreated.forEach((requestItem) => {
      if (
        requestItem.tracking_status !== 6 &&
        requestItem.tracking_status !== 7 &&
        requestItem.tracking_status !== 12
      ) {
        finalRequestCreated.push(requestItem);
      }
    });

    setFilteredRequestCreated([...finalRequestCreated]);
  }, [tempRequestCreated]);

  useEffect(() => {
    if (filteredRequestCreated.length !== includedRequestCreated.length) {
      setSelectAllRequestCreated(false);
    } else {
      setSelectAllRequestCreated(true);
    }
  }, [filteredRequestCreated, includedRequestCreated]);

  useEffect(() => {
    let transmittalRequest = [];

    includedRequestCreated.forEach((request) => {
      transmittalRequest.push(request.transmittal_no);
    });

    setSelectedTransmittalRequest(transmittalRequest);
  }, [includedRequestCreated]);

  const handleChangeRequestCheckbox = (request) => {
    const copyArrIncludedReaquest = includedRequestCreated;
    const requestIndex = copyArrIncludedReaquest.indexOf(request);

    if (requestIndex === -1) {
      copyArrIncludedReaquest.push(request);
    } else {
      copyArrIncludedReaquest.splice(requestIndex, 1);
    }

    setSelectAllRequestCreated(false);
    setIncludedRequestCreated([...copyArrIncludedReaquest]);
  };

  const handleChecklAllRequesCreated = (event) => {
    if (event.target.checked) {
      setSelectAllRequestCreated(true);
      setIncludedRequestCreated([...filteredRequestCreated]);
    } else {
      setSelectAllRequestCreated(false);
      setIncludedRequestCreated([]);
    }
  };

  const handleClearAllRequestCreated = () => {
    setIncludedRequestCreated([]);
    setSelectAllRequestCreated(false);
  };

  const handleOpenCancelScheduledRequest = (bool, scheduledId) => {
    setOpenCancelScheduledRequest(bool);
    setScheduledRequestId(scheduledId);
  };

  const handleCloseViewScheduledRequest = () => {
    dispatch(SCHEDULE.closeViewRequest());
    dispatch(SCHEDULE.tableCount());

    if (schedule.activeTab === 'active_schedule') {
      dispatch(SCHEDULE.allScheduledRequest());
    }

    if (schedule.activeTab === 'history_schedule') {
      dispatch(SCHEDULE.historyScheduleRequest());
    }

    if (refreshRequestTable) {
      refreshRequestTable(true);
    }
  };

  console.log(schedule.request_info, 'SCHEDULED REQUEST INFO');
  // console.log(includedRequestCreated, 'INCLUDED TEMP REQUEST CREATED');
  // console.log(filteredRequestCreated, 'FILTERED TEMP REQUEST CREATED');
  // console.log(selectAllRequestCreated, 'SELECAT TEMP REQUEST CREATED');
  // console.log(selectedTransmittalRequest, 'SELECTED TRANSMITTAL REQUEST');

  return (
    <>
      <Dialog
        fullScreen
        open={schedule.openScheduledRequest}
        onClose={handleCloseViewScheduledRequest}
        TransitionComponent={Transition}
      >
        <div className={classes.viewRequestRoot}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <Grid item={12}>
                  <Fab className={classes.iconClose} onClick={handleCloseViewScheduledRequest} aria-label="close">
                    <ClearSharpIcon fontSize="large" />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {!schedule.reqLoading && Object.keys(schedule.request_info).length ? (
                <Grid container>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                  <Grid item xs={7}>
                    <form noValidate autoComplete="off">
                      <Grid container alignItems="center" justify="center" spacing={2}>
                        <Grid item xs={6} className={classes.requestColumnWidth}>
                          <div>Request ID</div>
                          <div className={classes.transmittalNo}>{schedule.request_info.schedule_request_id}</div>
                        </Grid>
                        <Grid item xs={6} className={classes.requestColumnWidth}>
                          {/* For Margin */}
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        alignItems="center"
                        justify="center"
                        spacing={2}
                        className={classes.requestDetailsTitleWrapper}
                      >
                        <Grid item xs={6} className={classes.requestColumnWidth}>
                          <div className={classes.requestDetailsTitle}>Scheduled Request Details</div>
                        </Grid>
                        <Grid item xs={6} className={classes.requestColumnWidth}>
                          {schedule.request_info.schedule_status === 'active' && (
                            <div className={classes.btnActionWrapper}>
                              <SecondaryButton
                                onClick={() => handleOpenCancelScheduledRequest(true, schedule.request_info._id)}
                              >
                                Cancel Request
                              </SecondaryButton>
                            </div>
                          )}
                        </Grid>
                      </Grid>

                      <Grid container justify="center" spacing={2}>
                        <Grid item xs={6} className={classes.requestColumnWidth}>
                          <div className={classes.requestItemWrapper}>
                            <div className={classes.requestItemTitle}>Scheduled Details</div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Repeats</div>
                              <div className={classes.requestItemData}>{scheduledDetails.scheduled_repeats}</div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Starts On</div>
                              <div className={classes.requestItemData}>{scheduledDetails.scheduled_start_date}</div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Ends On</div>
                              <div className={classes.requestItemData}>{scheduledDetails.scheduled_end_date}</div>
                            </div>
                          </div>

                          <div className={classes.requestItemWrapper}>
                            <div className={classes.requestItemTitle}>Request Details</div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>HMO Partner</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.request_details.hmo_partner_id &&
                                  CONSTANTS.PARTNER[schedule.request_info.request_details.hmo_partner_id].text}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Requestor Department</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.schedule_requestor.hims_department_name}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Requestor</div>
                              <div
                                className={classes.requestItemData}
                              >{`${schedule.request_info.schedule_requestor.first_name} ${schedule.request_info.schedule_requestor.last_name}`}</div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Preferred Time</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.request_details.preferred_time}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Type of Request</div>
                              <div className={classes.requestItemData}>
                                {
                                  CONSTANTS.SCHEDULE_REQUEST_TYPE_TEXT[
                                    schedule.request_info.request_details.request_type
                                  ].text
                                }
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Remarks</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.request_details.remarks
                                  ? schedule.request_info.request_details.remarks.length > 0
                                    ? schedule.request_info.request_details.remarks
                                    : 'N/A'
                                  : 'N/A'}
                              </div>
                            </div>
                          </div>

                          <div className={classes.requestCreatedTitle}>Transmittal Requests Created</div>
                          {includedRequestCreated.length > 0 && (
                            <div className={classes.requestCreatedActionWrapper}>
                              <Grid container alignItems="center">
                                <Grid item xs={4}>
                                  <FormControlLabel
                                    checked={selectAllRequestCreated}
                                    control={
                                      <Checkbox
                                        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                        icon={<span className={classes.icon} />}
                                        onChange={handleChecklAllRequesCreated}
                                        color="primary"
                                      />
                                    }
                                    label="Select All"
                                    classes={{ label: classes.requestCreatedAction }}
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <Button
                                    onClick={handleClearAllRequestCreated}
                                    className={classes.requestCreatedAction}
                                  >
                                    Clear All
                                  </Button>
                                </Grid>
                                <Grid item xs={4}>
                                  <div>
                                    <SecondaryButton
                                      customClass={clsx(classes.requestCreatedAction, classes.cancelTransmittalRequest)}
                                      onClick={() => handleOpenCancelTransmittal(true)}
                                    >
                                      {includedRequestCreated.length > 1 ? 'Cancel Requests' : 'Cancel Request'}
                                    </SecondaryButton>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          )}
                          <div className={classes.requestCreatedTitleBorder}></div>
                          <div className={classes.requestCreatedWrapper}>
                            <Grid container>
                              <Grid item xs={4}>
                                <div className={classes.requestCreatedHeaderItem}>Trans No.</div>
                              </Grid>
                              <Grid item xs={4}>
                                <div className={classes.requestCreatedHeaderItem}>Delivery/Pickup</div>
                              </Grid>
                              <Grid item xs={4}>
                                <div className={classes.requestCreatedHeaderItem}>Status</div>
                              </Grid>
                            </Grid>

                            <div>
                              {tempRequestCreated.map((request, index) => (
                                <Grid container key={index} className={classes.requestCreatedItem}>
                                  <Grid item xs={1}>
                                    <FormControlLabel
                                      className={
                                        (request.tracking_status === 6 ||
                                          request.tracking_status === 7 ||
                                          request.tracking_status === 12) &&
                                        classes.defaultItem
                                      }
                                      control={
                                        <Checkbox
                                          checked={includedRequestCreated.includes(request)}
                                          checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                                          icon={<span className={classes.icon} />}
                                          className={
                                            (request.tracking_status === 6 ||
                                              request.tracking_status === 7 ||
                                              request.tracking_status === 12) &&
                                            classes.defaultItemCheckbox
                                          }
                                          onChange={() => handleChangeRequestCheckbox(request)}
                                          color="primary"
                                        />
                                      }
                                      // label={request.transmittal_no}
                                      // classes={{ label: classes.checkboxLabel }}
                                    />
                                  </Grid>
                                  <Grid item xs={11}>
                                    <Grid container className={classes.requestCreatedItem}>
                                      <Grid item xs={4}>
                                        <div
                                          className={classes.requestCreatedTransmittal}
                                          onClick={() => handelViewRequestDetails(request._id)}
                                        >
                                          {request.transmittal_no}
                                        </div>
                                      </Grid>
                                      <Grid item xs={4}>
                                        <div>{moment(request.expected_date).format('MMM D, YYYY')}</div>
                                      </Grid>
                                      <Grid item xs={4}>
                                        {request.tracking_status === 1 ? (
                                          <div className="custom-alert-info">
                                            <Alert severity="info" classes={{ root: classes.customAlert }}>
                                              {CONSTANTS.TRACKING_STATUS_ORDER[request.tracking_status].text}
                                            </Alert>
                                          </div>
                                        ) : request.tracking_status === 2 || request.tracking_status === 3 ? (
                                          <Alert severity="warning" classes={{ root: classes.customAlert }}>
                                            {CONSTANTS.TRACKING_STATUS_ORDER[request.tracking_status].text}
                                          </Alert>
                                        ) : request.tracking_status > 5 && request.tracking_status < 8 ? (
                                          <Alert severity="success" classes={{ root: classes.customAlert }}>
                                            {CONSTANTS.TRACKING_STATUS_ORDER[request.tracking_status].text}
                                          </Alert>
                                        ) : request.tracking_status > 7 && request.tracking_status < 13 ? (
                                          <Alert severity="error" classes={{ root: classes.customAlert }}>
                                            {CONSTANTS.TRACKING_STATUS_ORDER[request.tracking_status].text}
                                          </Alert>
                                        ) : request.tracking_status > 3 && request.tracking_status < 6 ? (
                                          <Alert severity="info" classes={{ root: classes.customAlert }}>
                                            {CONSTANTS.TRACKING_STATUS_ORDER[request.tracking_status].text}
                                          </Alert>
                                        ) : (
                                          <Alert severity="info" classes={{ root: classes.customAlert }}>
                                            {CONSTANTS.TRACKING_STATUS_ORDER[request.tracking_status].text}
                                          </Alert>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              ))}
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs={6} className={classes.requestColumnWidth}>
                          <div className={classes.requestItemWrapper}>
                            <div className={classes.requestItemTitle}>Item Details</div>
                            {schedule.request_info.item_details.items.map((item, index) => (
                              <div key={index} className={classes.requesItemHolder}>
                                <div className={classes.requestItem}>
                                  <div className={classes.requestItemLabel}>Item(s) for Delivery / Pickup</div>
                                  <div className={classes.requestItemData}>
                                    {CONSTANTS.REQUEST_ITEM_TYPE[item.type].text}
                                  </div>
                                </div>
                                {item.type === 0 && (
                                  <div className={classes.requestItem}>
                                    <div className={classes.requestItemLabel}>Other Item</div>
                                    <div className={classes.requestItemData}>{item.other}</div>
                                  </div>
                                )}
                                <div className={classes.requestItem}>
                                  <div className={classes.requestItemLabel}>No. of Item/s</div>
                                  <div className={classes.requestItemData}>{numberWithComma(item.count)}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className={classes.requestItemWrapper}>
                            <div className={classes.requestItemTitle}>Company Details</div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Name</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.company_details.name}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Code</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.company_details.code}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Contact Person</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.company_details.contact_person}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Contact Number</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.company_details.contact_number}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Department</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.company_details.department.length > 0
                                  ? schedule.request_info.company_details.department
                                  : 'N/A'}
                              </div>
                            </div>
                          </div>

                          <div className={classes.requestItemWrapper}>
                            <div className={classes.requestItemTitle}>Address</div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>State / Province</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.address_details.province_label}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>City / Municipality</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.address_details.city_label}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Barangay</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.address_details.barangay_label}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Unit</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.address_details.unit.length > 0
                                  ? schedule.request_info.address_details.unit
                                  : 'N/A'}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Floor No.</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.address_details.floor_no}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Building Name</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.address_details.building_name}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Street</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.address_details.street}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Country</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.address_details.country}
                              </div>
                            </div>
                            <div className={classes.requestItem}>
                              <div className={classes.requestItemLabel}>Zip Code</div>
                              <div className={classes.requestItemData}>
                                {schedule.request_info.address_details.zip_code.length > 0
                                  ? schedule.request_info.address_details.zip_code
                                  : 'N/A'}
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>

                      <Grid container alignItems="center" justify="center" spacing={2}>
                        <Grid item xs={6} className={classes.requestColumnWidth}>
                          {/* For Margin */}
                        </Grid>
                        <Grid item xs={6} className={classes.requestColumnWidth}>
                          {schedule.request_info.schedule_status === 'active' && (
                            <div className={classes.btnActionWrapper}>
                              <SecondaryButton
                                onClick={() => handleOpenCancelScheduledRequest(true, schedule.request_info._id)}
                              >
                                Cancel Request
                              </SecondaryButton>
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                </Grid>
              ) : (
                <Grid container>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                  <Grid item xs={7}>
                    <Loading />
                  </Grid>
                  <Grid item xs>
                    {/* For Margin */}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </div>

        {openCancelScheduledRequest && (
          <CancelScheduledRequest
            open={openCancelScheduledRequest}
            handleOpenCancel={handleOpenCancelScheduledRequest}
            scheduledRequestId={scheduledRequestId}
          />
        )}

        {openCancelTransmittal && (
          <CancelRequest
            getID={selectedTransmittalRequest}
            open={openCancelTransmittal}
            setOpen={handleOpenCancelTransmittal}
            setIncludedRequestCreated={setIncludedRequestCreated}
          />
        )}
      </Dialog>
      {schedule.openTransmittalRequest && <ViewRequest />}
    </>
  );
};

ViewScheduledRequest.propTypes = {
  refreshRequestTable: PropTypes.any,
};

export default ViewScheduledRequest;
