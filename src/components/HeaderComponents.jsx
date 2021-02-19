import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import BrandLogo from '../assets/img/intellicare-logo-xs.png';
import './styles/headerComponents.css';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import * as ACTION from '../store/actions/authActions';
import * as NOTIF from '../store/actions/notificationActions';
import * as ADDRESS from '../store/actions/addressActions';
import PropTypes from 'prop-types';
import Notifications from './dds/Notifications';
import { SOCKET_URL } from '../utils/Constants';
import io from 'socket.io-client';
import moment from 'moment';

moment.locale();

const drawerWidth = 240;
let socket = null;

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
  notifWrapper: {
    position: 'relative',
  },
  notifNumber: {
    width: '12px',
    height: '12px',
    background: '#FA5656',
    position: 'absolute',
    top: '0',
    right: '0',
    borderRadius: '20px',
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

const HeaderComponents = (props) => {
  const classes = useStyles();
  const notifications = useSelector((state) => state.notification);
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popAnchorEl, setPopAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const openPop = Boolean(popAnchorEl);
  const [notif, setNotif] = useState(false);
  const id = openPop ? 'simple-popover' : undefined;

  // let socket = null;

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotifClose = () => {
    setPopAnchorEl(null);
    props.setHeaderNotif(false);
  };

  const handleClick = (event) => {
    setPopAnchorEl(event.currentTarget);
    setNotif(false);
    props.setHeaderNotif(true);
    dispatch(NOTIF.setFreshNotif(false));
    dispatch(NOTIF.viewedNotif(true));
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const handleLogout = () => {
    dispatch(NOTIF.viewedNotif(false));
    dispatch(ACTION.logout(history));
    socket = null;
  };

  useEffect(() => {
    dispatch(ADDRESS.getHimsNcrCity());
  }, [dispatch]);

  useEffect(() => {
    dispatch(NOTIF.unreadNotifications());
  }, [dispatch]);

  useEffect(() => {
    // const authToken = localStorage.getItem('token') !== null ? localStorage.getItem('token') : '';
    const authUserId = localStorage.getItem('user_id') !== null ? localStorage.getItem('user_id') : '';

    if (socket === null) {
      socket = io.connect(SOCKET_URL, {
        query: {
          Authorization: authUserId,
          detect: 'web',
          type: localStorage.getItem('user_type') === 'dds_requestor' ? 'requestor' : 'admin',
        },
      });

      console.log(socket, 'SOCKET CONNECTION');
    }

    socket.on('notif', (data) => {
      console.log(data, 'SOCKET DATA');
      if (data.data.has_new_notif) {
        setNotif(true);
      } else {
        setNotif(false);
      }
    });
  }, [notif]);

  useEffect(() => {
    if (notifications.newNotifCount > 0 && notifications.viewedNotif !== true) {
      dispatch(NOTIF.setFreshNotif(true));
    } else {
      dispatch(NOTIF.setFreshNotif(false));
    }

    // eslint-disable-next-line
  }, [notifications.newNotifCount]);

  const renderMenu = (
    <Menu
      className="user-icon-popup"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        <span data-cy="logout">Logout</span>
      </MenuItem>
    </Menu>
  );

  return (
    <div className="header-top">
      <Grid container>
        <Grid item xs={6}>
          <Box style={{ marginTop: 14, marginLeft: 15 }}>
            <Link to="/">
              <img
                src={BrandLogo}
                width={100}
                alt="Intellicare Logo"
                title="Intellicare Logo"
                className="logo"
                data-cy="intellicare_logo"
              />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
              <div className={classes.notifIcon} data-cy="notification_icon">
                <IconButton
                  className={classes.margin}
                  color="inherit" /* onClick={toggleDrawer(drawerPosition, true)} */
                  onClick={handleClick}
                >
                  <Badge color="secondary">
                    <div className={classes.notifWrapper}>
                      <NotificationsNoneIcon />
                      {notif || notifications.freshNotif ? (
                        <div className={classes.notifNumber} data-cy="red_dot_icon"></div>
                      ) : null}
                    </div>
                  </Badge>
                </IconButton>
                {openPop ? (
                  <Notifications
                    id={id}
                    notif={notif}
                    requestDetail={props.requestDetail}
                    setOpen={props.setOpen}
                    openPop={openPop}
                    handleClick={handleClick}
                    handleClose={handleNotifClose}
                    popAnchorEl={popAnchorEl}
                  />
                ) : null}
                <IconButton
                  className="user-icon"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  data-cy="account_icon"
                >
                  <Avatar className={classes.margin}>H</Avatar>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {renderMenu}
    </div>
  );
};

HeaderComponents.propTypes = {
  requestDetail: PropTypes.any,
  setOpen: PropTypes.any,
  setHeaderNotif: PropTypes.any,
};

export default HeaderComponents;
