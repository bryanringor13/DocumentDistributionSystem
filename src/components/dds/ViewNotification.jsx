import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

import { LinearProgress } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import * as ACTION from '../../store/actions/notificationActions';
import * as REQUEST from '../../store/actions/requestActions';
import * as SCHEDULE from '../../store/actions/scheduleAction';

import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';

import moment from 'moment';

import { green } from '@material-ui/core/colors';

import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import './styles/ViewNotification.scss';

moment.locale();

// @ts-ignore
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
    '& .MuiCardHeader-root': {
      padding: '24px 0 8px',
      margin: '0 32px',
      borderBottom: '1px solid #E0E6ED',
    },
    '& .MuiCardContent-root': {
      padding: '0 16px 16px 16px !important',
    },
  },
  headerStyle: {
    fontWeight: 'bold',
  },
  subHeaderStyle: {
    fontSize: 14,
    color: '#7F8080',
    marginBottom: 10,
  },
  cardContentPadding: {
    padding: theme.spacing(0, 2),
  },
  contentSubText: {
    fontSize: 16,
    lineHeight: '24px',
    marginBottom: '8px',
  },
  transmittalText: {
    fontSize: 15,
  },
  contentText: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: '600',
    color: '#2F3542',
  },
  contentItemStyle: {
    marginTop: '24px',
  },
  cardHeader: {
    fontWeight: 'bold',
    padding: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: '#2F3542',
    lineHeight: '24px',
    fontWeight: 'bold',
  },
  contentAudit: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  cardFullWidth: {
    width: '100%',
  },
  headerBG: {
    backgroundColor: '#fff',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  marginTopTextArea: {
    marginTop: theme.spacing(1),
  },
  marginTopView: {
    marginTop: 30,
  },
  textFieldWhite: {
    backgroundColor: 'white',
  },
  barCodeStyle: {
    height: 70,
  },
  transNumberStyle: {
    fontWeight: 'bold',
  },
  auditContectMarginTop: {
    marginTop: 40,
  },
  dividerStyle: {
    marginBottom: 10,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  textLink: {
    cursor: 'pointer',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewNotification = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);

  const handleClose = () => {
    dispatch(ACTION.skipItemDefault());
    props.setOpen(false);
  };

  const unReadNotifRequest = (index, requestId, refId, items) => {
    dispatch(REQUEST.getRequest(refId));
    dispatch(REQUEST.getAuditLogs(refId));
    dispatch(SCHEDULE.openTransmittalRequest());
    props.closeView(true);
    dispatch(ACTION.markAsRead(index, requestId, items));
    // console.log(requestId);
  };

  const readNotifRequest = (refId) => {
    dispatch(REQUEST.getRequest(refId));
    dispatch(REQUEST.getAuditLogs(refId));
    dispatch(SCHEDULE.openTransmittalRequest());
    props.closeView(true);
    // dispatch(ACTION.markAsRead(index, requestId, items))
    // console.log(requestId);
  };

  const viewOlder = () => {
    dispatch(ACTION.viewOlderNotif());
  };

  const circle = <span className="new-notif-dot"></span>;

  // console.log(request.request_info);
  return (
    <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
      <div className={classes.root}>
        <Grid container style={{ paddingLeft: '123px' }}>
          <Grid item xs={12}>
            <Grid container alignItems="flex-start" justify="flex-end">
              <Grid item>
                <IconButton aria-label="close" className="close-btn-notif" onClick={handleClose}>
                  <ClearSharpIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Typography className={clsx('notif-title')}>
                    Notifications ({notifications.newNotifCount} Unread)
                  </Typography>
                </div>
              </Grid>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
            </Grid>
            <Grid container className={classes.marginTopView}>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
              <Grid item xs={6}>
                <div className="container-notif">
                  <div>
                    <Grid container>
                      <Grid item xs={12}>
                        {notifications.notifLoading ? (
                          <Box pt={0.5}>
                            <Skeleton width="60%" />
                            <Skeleton />
                          </Box>
                        ) : notifications.notifications.length > 0 ? (
                          notifications.notifications.map((res, index) => (
                            <div key={index}>
                              {res.is_read === false ? (
                                <div
                                  onClick={(event) => {
                                    unReadNotifRequest(index, res.id, res.refference_id, res);
                                  }}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <Typography
                                    variant="body1"
                                    style={{
                                      fontWeight: 300,
                                      marginBottom: '4px',
                                      fontSize: '14px',
                                    }}
                                  >
                                    {res.activity_at} {circle}
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.notifEllipsis, classes.textLink)}
                                    style={{
                                      fontWeight: 'bold',
                                      fontSize: '16px',
                                    }}
                                  >
                                    {res.refference_title}
                                  </Typography>
                                  <Typography
                                    className={classes.typeEllipses}
                                    variant="body1"
                                    style={{
                                      fontSize: '14px',
                                    }}
                                  >
                                    {res.refference_body}
                                  </Typography>
                                </div>
                              ) : (
                                <div
                                  onClick={(event) => readNotifRequest(res.refference_id)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <Typography
                                    variant="body1"
                                    style={{
                                      fontWeight: 300,
                                      marginBottom: '4px',
                                      fontSize: '14px',
                                    }}
                                  >
                                    {res.activity_at}
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.notifEllipsis, classes.textLink)}
                                    variant={('h6', 'body1')}
                                    style={{
                                      fontSize: '16px',
                                    }}
                                  >
                                    {res.refference_title}
                                  </Typography>
                                  <Typography
                                    className={classes.typeEllipses}
                                    variant="body1"
                                    style={{
                                      color: 'rgba(47, 53, 66, 0.4)',
                                      fontSize: '14px',
                                    }}
                                  >
                                    {res.refference_body}
                                  </Typography>
                                </div>
                              )}
                              {notifications.notifications.length > 1 ? (
                                <Divider style={{ marginTop: 16, marginBottom: 16 }} />
                              ) : null}
                            </div>
                          ))
                        ) : (
                          <Alert severity="error" className={classes.alertStyle}>
                            No Notification
                          </Alert>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                  {notifications.has_next ? (
                    <div style={{ marginTop: '41px' }}>
                      {notifications.viewOlderLoad ? (
                        <LinearProgress />
                      ) : (
                        <Grid container direction="row" justify="center" alignItems="center">
                          <Grid item>
                            <Typography
                              className={clsx(classes.notifTitle, classes.textLink)}
                              color="primary"
                              style={{ fontSize: '16px' }}
                              onClick={(event) => viewOlder()}
                            >
                              View Older
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
                    </div>
                  ) : null}
                </div>
              </Grid>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};

ViewNotification.propTypes = {
  setOpen: PropTypes.any,
  closeView: PropTypes.any,
  open: PropTypes.bool,
};

export default ViewNotification;
