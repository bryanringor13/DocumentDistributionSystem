import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as ACTION from '../../store/actions/notificationActions';
import * as REQUEST from '../../store/actions/requestActions';
import * as SCHEDULE from '../../store/actions/scheduleAction';
import { Popover, Grid, Divider, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import './styles/Notification.scss';
import Mark from '../../assets/img/icons/mark.png';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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
  notifTitle: {
    fontWeight: 'bold',
  },
  typeEllipses: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  textLink: {
    cursor: 'pointer',
  },
  notifHolder: {
    position: 'relative',
    '&::after': {
      content: `url(${Mark})`,
      position: 'absolute',
      right: '37px',
      top: '14px',
      width: '10px',
      height: '18px',
    },
  },
  notifEllipsis: {
    overflow: 'hidden',
    position: 'relative',
    lineHeight: '24px',
    maxHeight: '50px',
    textAlign: 'justify',
    paddingRight: '1em',
    '&&:before': {
      content: '"..."',
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    '&&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      width: '1em',
      height: '1em',
      marginTop: '0.2em',
      background: 'white',
    },
  },
}));

const Notifications = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);

  const handleClose = () => {
    props.handleClose(null);
  };

  const allNotifOpen = () => {
    dispatch(ACTION.allNotifications());
    props.handleClose(null);
    props.setOpen(true);
  };

  useEffect(() => {
    dispatch(ACTION.unreadNotifications());
  }, [dispatch, props.notif]);

  const circle = <span className="new-notif-dot"></span>;
  const readNotifRequestName = (index, requestId, refId) => {
    dispatch(REQUEST.getRequest(refId));
    dispatch(REQUEST.getAuditLogs(refId));
    // props.requestDetail(true);
    dispatch(SCHEDULE.openTransmittalRequest());

    // console.log(requestId)
  };
  const readNotifRequest = (index, requestId, refId) => {
    dispatch(REQUEST.getRequest(refId));
    dispatch(REQUEST.getAuditLogs(refId));
    // props.requestDetail(true);
    dispatch(SCHEDULE.openTransmittalRequest());
    dispatch(ACTION.markAsRead(index, requestId));
    // console.log(requestId)
  };

  return (
    <div className={classes.notifHolder} data-cy="notification_container">
      <Popover
        classes={{ paper: classes.notif }}
        id={props.id}
        open={props.openPop}
        anchorEl={props.popAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 50,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div
          style={{
            paddingTop: 24,
            paddingLeft: 40,
            paddingRight: 40,
            width: 500,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.notifTitle} variant="h6" style={{ fontSize: '18px' }}>
                Notifications
              </Typography>
            </Grid>
          </Grid>
          {notifications.notifLoading ? (
            <Box pt={0.5} style={{ marginBottom: '40px' }}>
              <Skeleton width="60%" />
              <Skeleton />
              <Skeleton />
            </Box>
          ) : (
            <div>
              <div>
                <Grid container>
                  <Grid item xs={12} style={{ marginTop: 24 }} className="notif-container">
                    {notifications.newNotif.length > 0 ? (
                      notifications.newNotif.map((res, index) => (
                        <div key={index}>
                          {res.is_read === false ? (
                            <div
                              style={{ cursor: 'pointer' }}
                              onClick={(event) => readNotifRequest(index, res.id, res.refference_id)}
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
                            <div onClick={(event) => readNotifRequestName(index, res.id, res.refference_id)}>
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
                          {notifications.newNotif.length > 1 ? (
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
              <div style={{ marginTop: '25px', marginBottom: '40px' }}>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item>
                    <Typography
                      className={clsx(classes.notifTitle, classes.textLink)}
                      color="primary"
                      style={{ fontSize: '16px' }}
                      onClick={(event) => allNotifOpen()}
                      data-cy="view_all"
                    >
                      View All
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
        </div>
      </Popover>
    </div>
  );
};

Notifications.propTypes = {
  notif: PropTypes.any,
  handleClose: PropTypes.any,
  setOpen: PropTypes.any,
  requestDetail: PropTypes.any,
  id: PropTypes.any,
  openPop: PropTypes.any,
  popAnchorEl: PropTypes.any,
};
export default Notifications;
