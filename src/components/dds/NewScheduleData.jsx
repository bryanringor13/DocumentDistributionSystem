import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import * as REQ_TYPE from '../../utils/Constants';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Alert from '@material-ui/lab/Alert';

import CancelScheduledRequest from './CancelScheduledRequest';
import SecondaryButton from '../common/Button/SecondaryButton';
import * as SCHEDULE from '../../store/actions/scheduleAction';
import * as CONSTANTS from '../../utils/Constants';
import Check from '../../assets/img/icons/check.png';
import PrimaryButton from '../common/Button/PrimaryButton';

import { numberWithComma } from '../../utils/common';

moment.locale();

const useStyles = makeStyles((theme) => ({
  viewRequestRoot: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  circle2: {
    height: '16px !important',
    color: 'green',
    margin: '4px 15px  !important',
    width: '16px !important',
  },
  btnProceed: {
    display: 'flex',
    justifyContent: 'flex-end',
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
    paddingLeft: '20px',
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
    margin: '8px 0',
    fontSize: '14px',
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
    color: '#41b67f',
    cursor: 'pointer',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewScheduleData = ({ open, openViewRequest, getData, getAddress, closeForm, oncloseNewSched }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [capital, setCapital] = useState('');
  const [includedRequestCreated, setIncludedRequestCreated] = useState([]);
  const [filteredRequestCreated, setFilteredRequestCreated] = useState([]);
  const [selectAllRequestCreated, setSelectAllRequestCreated] = useState(false);
  const [onLoadCircular, setOnLoadCircular] = useState(false);
  const [cancelActive, setCancelActive] = useState(false);
  console.log(getAddress, 'SCHEDULE DETAILS ADDRESS DATA');
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

  const handleCheclAllRequesCreated = (event) => {
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

  console.log(getData.request_details.request_type, 'delivery');

  const handleCloseViewRequest = useCallback(() => {
    closeForm(false);
  });

  const handleSave = () => {
    setOnLoadCircular(true);
    setCancelActive(true);
    dispatch(SCHEDULE.onSaveSchedule(getData, closeForm, setOnLoadCircular, setCancelActive, oncloseNewSched));
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    let repeatWeek = [];
    let copyRepeat = [];
    if (getData.schedule_details.weekly_days) {
      const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      for (const data of day) {
        for (const item of getData.schedule_details.weekly_days) {
          if (data === capitalizeFirstLetter(item)) {
            copyRepeat.push(data);
          }
        }
      }
      if (copyRepeat) {
        for (const item of copyRepeat) {
          const lastItem = copyRepeat[copyRepeat.length - 1];
          const firstItem = copyRepeat[0];

          if (lastItem === item) {
            repeatWeek.push(`${' '}${capitalizeFirstLetter(item)}`);
          } else if (firstItem === item) {
            repeatWeek.push(`${capitalizeFirstLetter(item)}`);
          } else {
            repeatWeek.push(`${' '}${capitalizeFirstLetter(item)}`);
          }
        }
        setCapital(repeatWeek);
      }
    }
    console.log(getData.schedule_details.weekly_days, 'repeat week');
  }, []);

  return (
    <Dialog fullScreen open={open} onClose={handleCloseViewRequest} TransitionComponent={Transition}>
      {getData.schedule_details && (
        <div className={classes.viewRequestRoot}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                <Grid item={12}>
                  <Fab className={classes.iconClose} onClick={() => closeForm(false)} aria-label="close">
                    <ClearSharpIcon fontSize="large" />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs>
                  {/* For Margin */}
                </Grid>
                <Grid item xs={7}>
                  <form noValidate autoComplete="off">
                    <Grid container alignItems="center" justify="center" spacing={2}>
                      <Grid item xs={6} className={classes.requestColumnWidth}>
                        {/* <div>Request ID</div>
                      <div className={classes.transmittalNo}>199209102</div> */}
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
                        <div className={classes.btnProceed}>
                          <div className={classes.btnActionWrapper}>
                            <SecondaryButton disabled={cancelActive} onClick={() => closeForm(false)}>
                              Cancel
                            </SecondaryButton>
                          </div>
                          <div className={classes.btnActionWrapper}>
                            <PrimaryButton onClick={() => handleSave()}>
                              {onLoadCircular ? (
                                <CircularProgress classes={{ root: classes.circle2 }} />
                              ) : (
                                'Confirm and Send'
                              )}
                            </PrimaryButton>
                          </div>
                        </div>
                      </Grid>
                    </Grid>

                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={6} className={classes.requestColumnWidth}>
                        <div className={classes.requestItemWrapper}>
                          <div className={classes.requestItemTitle}>Scheduled Details</div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Repeats</div>
                            <div className={classes.requestItemData}>
                              {getData.schedule_details.repeats === 'daily'
                                ? 'Daily (Business Days)'
                                : getData.schedule_details.repeats === 'weekly'
                                ? `Weekly (${capital})`
                                : getData.schedule_details.day_of_week_number
                                ? `Monthly (${capitalizeFirstLetter(
                                    getData.schedule_details.day_of_week_number
                                  )} ${capitalizeFirstLetter(getData.schedule_details.day_of_week)} of the Week) `
                                : getData.schedule_details.day_of_month
                                ? `${getData.schedule_details.day_of_month}${
                                    parseInt(getData.schedule_details.day_of_month) === 1
                                      ? 'st'
                                      : parseInt(getData.schedule_details.day_of_month) === 2
                                      ? 'nd'
                                      : parseInt(getData.schedule_details.day_of_month) === 3
                                      ? 'rd'
                                      : parseInt(getData.schedule_details.day_of_month) === 21
                                      ? 'st'
                                      : parseInt(getData.schedule_details.day_of_month) === 22
                                      ? 'nd'
                                      : parseInt(getData.schedule_details.day_of_month) === 23
                                      ? 'rd'
                                      : parseInt(getData.schedule_details.day_of_month) > 3
                                      ? 'th'
                                      : parseInt(getData.schedule_details.day_of_month) > 30
                                      ? 'st'
                                      : null
                                  } Day of the Month`
                                : null}{' '}
                            </div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Starts On</div>
                            <div className={classes.requestItemData}>{getData.schedule_details.starts_on}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Ends On</div>
                            <div className={classes.requestItemData}>{getData.schedule_details.ends_on}</div>
                          </div>
                        </div>

                        <div className={classes.requestItemWrapper}>
                          <div className={classes.requestItemTitle}>Request Details</div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>HMO Partner</div>
                            <div className={classes.requestItemData}>{getAddress.req.hmo}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Requestor Department</div>
                            <div className={classes.requestItemData}>
                              {getAddress.req.department ? getAddress.req.department : 'N/A'}
                            </div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Requestor</div>
                            <div className={classes.requestItemData}>{getAddress.req.requestor}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Preferred Time</div>
                            <div className={classes.requestItemData}>
                              {getData.request_details.preferred_time.toUpperCase()}
                            </div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Type of Request</div>
                            <div className={classes.requestItemData}>
                              {getData.request_details.request_type === 1 ? 'For Delivery' : 'For Pickup'}
                            </div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Remarks</div>
                            <div className={classes.requestItemData}>
                              {getData.request_details.remarks ? getData.request_details.remarks : 'N/A'}
                            </div>
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={6} className={classes.requestColumnWidth}>
                        <div className={classes.requestItemWrapper}>
                          <div className={classes.requestItemTitle}>Item Details</div>
                          {getData.item_details.items.map((item, i) => (
                            <div key={i} className={classes.requesItemHolder}>
                              <div className={classes.requestItem}>
                                <div className={classes.requestItemLabel}>Item(s) for Delivery / Pickup</div>
                                <div className={classes.requestItemData}>
                                  {REQ_TYPE.REQUEST_ITEM_TYPE[item.type].text}
                                </div>
                              </div>
                              {item.other && (
                                <div className={classes.requestItem}>
                                  <div className={classes.requestItemLabel}>Other/s</div>
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
                            <div className={classes.requestItemData}>{getData.company_details.name}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Code</div>
                            <div className={classes.requestItemData}>
                              {getData.company_details.code ? getData.company_details.code : 'N/A'}
                            </div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Contact Person</div>
                            <div className={classes.requestItemData}>{getData.company_details.contact_person}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Contact Number</div>
                            <div className={classes.requestItemData}>{getData.company_details.contact_number}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Department</div>
                            <div className={classes.requestItemData}>
                              {getData.company_details.department ? getData.company_details.department : 'N/A'}
                            </div>
                          </div>
                        </div>

                        <div className={classes.requestItemWrapper}>
                          <div className={classes.requestItemTitle}>Address</div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>State / Province</div>
                            <div className={classes.requestItemData}>{getAddress.province}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>City / Municipality</div>
                            <div className={classes.requestItemData}>{getAddress.city}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Barangay</div>
                            <div className={classes.requestItemData}>{getAddress.barangay}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Unit</div>
                            <div className={classes.requestItemData}>
                              {getData.address_details.unit ? getData.address_details.unit : 'N/A'}
                            </div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Floor No.</div>
                            <div className={classes.requestItemData}>{getData.address_details.floor_no}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Building Name</div>
                            <div className={classes.requestItemData}>{getData.address_details.building_name}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Street</div>
                            <div className={classes.requestItemData}>{getData.address_details.street}</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Country</div>
                            <div className={classes.requestItemData}>Philippines</div>
                          </div>
                          <div className={classes.requestItem}>
                            <div className={classes.requestItemLabel}>Zip Code</div>
                            <div className={classes.requestItemData}>
                              {getData.address_details.zip_code > 0 ? getData.address_details.zip_code : 'N/A'}
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
                        <div className={classes.btnProceed}>
                          <div className={classes.btnActionWrapper}>
                            <SecondaryButton disabled={cancelActive} onClick={() => closeForm(false)}>
                              Cancel
                            </SecondaryButton>
                          </div>
                          <div className={classes.btnActionWrapper}>
                            <PrimaryButton onClick={() => handleSave()}>
                              {onLoadCircular ? (
                                <CircularProgress classes={{ root: classes.circle2 }} />
                              ) : (
                                'Confirm and Send'
                              )}
                            </PrimaryButton>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item xs>
                  {/* For Margin */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </Dialog>
  );
};

NewScheduleData.propTypes = {
  open: PropTypes.any,
  openViewRequest: PropTypes.any,
};

export default NewScheduleData;
