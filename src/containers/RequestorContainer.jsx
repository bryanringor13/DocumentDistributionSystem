/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTION from '../store/actions/requestActions';
import * as MESSENGER from '../store/actions/MessengerActions';
import * as NOTIF from '../store/actions/notificationActions';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import RequestTable from '../components/dds/RequestTable';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import NewRequest from '../components/dds/NewRequest';
import ViewRequest from '../components/dds/ViewRequest';
import PreviewRequest from '../components/dds/PreviewRequest';
import SiderComponent from '../components/SiderComponent';
import HeaderComponent from '../components/HeaderComponents';
// import CancelRequest from '../components/dds/CancelRequest';
import { Typography, Link } from '@material-ui/core';
import './styles/Requestor.css';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import * as Constants from '../utils/Constants';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import ScanForm from '../components/dds/ScanForm';
import TableView from '../assets/img/table_view.png';
import ViewNotification from '../components/dds/ViewNotification';
import SearchDateFilter from '../components/dds/SearchDateFilter';
import UserComponent from '../components/UserComponent';
import InboxIcon from '@material-ui/icons/Inbox';
import ViewContentBox from '../components/dds/ViewContentBox';
import Reassign from '../components/dds/Reassign';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  },
  searchWrapper: {
    maxWidth: '282px',
    width: '100%',
    position: 'relative',
    '& .MuiFormControl-root': {
      width: '100%',
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
  dialogHeight: {
    height: '765px',
  },
}));

const RequestorContainer = () => {
  const userComponent = Constants.TABLE_COMPONENT[localStorage.getItem('user_type')];
  const dispatch = useDispatch();
  const location = useLocation();
  const request = useSelector((state) => state.request);
  const assignTo = null;
  const classes = useStyles();
  const [reassign, setReassign] = useState({});
  const [scanReassign, setScanReassign] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [openScan, setOpenScan] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [openHeaderNotif, setOpenHeaderNotif] = useState(false);
  const [printView, setPrintView] = useState(false);
  const [boxContentOpen, setBoxContentOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewDetails, setPreviewDetails] = useState(null);
  const [buttonTrigger, setButtonTrigger] = useState(false);
  const [searchField, setSearchField] = useState(false);
  const [searchButton, setSearchButton] = useState('');
  // const [idForCancel, setIDForCancel] = useState('');
  const [userRoles, setUserRoles] = useState(JSON.parse(localStorage.getItem('roles')));
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [getBox, setGetbox] = useState('');
  const [requestContentDetails, setRequestContentDetails] = useState([]);
  const [buttonActive, setButtonActive] = useState(userComponent.tableDefault);
  // const [tableComponent, setTableComponent] = useState(component)
  const [refreshTable, setRefreshTable] = useState(true);
  const [boxView, setBoxView] = useState(true);

  // const [cancelOpen, setCancelOpen] = useState(false);

  // const setIDForCancelHandler = (id) => {
  //   setIDForCancel(id);
  // };

  const handleChange = (name) => {
    dispatch(ACTION.clearAllFilter());
    dispatch(ACTION.getFilterRequest(''));
    dispatch(ACTION.setPageLimit(10));
    dispatch(ACTION.setPaginationPage(1));
    setSearchButton('');
    setButtonActive(name);
    refreshTableHandler(true);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const notifOpenHandler = (toggle) => {
    setNotifOpen(toggle);
  };

  const headerNotifHandler = (toggle) => {
    setOpenHeaderNotif(toggle);
  };

  const boxOpenHandler = (toggle) => {
    setBoxContentOpen(toggle);
  };

  const searchHandler = (filter) => {
    setSearchButton(filter);
    if (filter.length < 1) {
      if (buttonTrigger) {
        dispatch(ACTION.setPageLimit(request.searchParams.prevPageLimit));
        dispatch(ACTION.setPaginationPage(request.searchParams.prevPageNum));
        dispatch(ACTION.setPrevPage(10, 1));
        dispatch(ACTION.getFilterRequest(''));
        refreshTableHandler(true);
        setButtonTrigger(false);
      }
    }
    // setSearchField(false)
  };

  const searchToggle = (toggle) => {
    setSearchField(toggle);
  };

  const searchHandlerButton = () => {
    dispatch(ACTION.setPrevPage(request.searchParams.pageLimit, request.searchParams.pageNum));
    dispatch(ACTION.setPageLimit(10));
    dispatch(ACTION.setPaginationPage(1));
    dispatch(ACTION.getFilterRequest(searchButton));
    setButtonTrigger(true);
    refreshTableHandler(true);
    // }
  };

  const [openReassign, setOpenReassign] = useState(false);
  const [rangeDateFiltered, setRangeDateFiltered] = useState(false);
  const dateRangeFilter = (date) => {
    console.log(date, 'DATE RANGE!!!');
    if (date.value) {
      dispatch(
        ACTION.getRangeDate(moment(date.value[0]).format('L').toString(), moment(date.value[1]).format('L').toString())
      );
      setButtonTrigger(true);
      refreshTableHandler(true);
    } else {
      dispatch(ACTION.getRangeDate('', ''));
      refreshTableHandler(true);

      if (buttonTrigger) {
        setButtonTrigger(false);
      }
    }
  };

  const [btnID, setBtnID] = useState('');
  const getId = (id) => {
    setBtnID(id);
  };

  const filterTypeHandler = (type) => {
    if (type > 0) {
      dispatch(ACTION.setFilterType(type));
      setButtonTrigger(true);
      refreshTableHandler(true);
    } else {
      if (buttonTrigger) {
        dispatch(ACTION.setFilterType(0));
        refreshTableHandler(true);
        setButtonTrigger(false);
      } else {
        dispatch(ACTION.setFilterType(0));
        refreshTableHandler(true);
        setButtonTrigger(false);
      }
    }
  };

  const filterStatusHandler = (status) => {
    if (status > 0) {
      dispatch(ACTION.setFilterStatus(status));
      setButtonTrigger(true);
      refreshTableHandler(true);
    } else {
      if (buttonTrigger) {
        dispatch(ACTION.setFilterStatus(0));
        refreshTableHandler(true);
        setButtonTrigger(false);
      } else {
        dispatch(ACTION.setFilterStatus(0));
        refreshTableHandler(true);
        setButtonTrigger(false);
      }
    }
  };

  useEffect(() => {
    filterStatusHandler();
    // eslint-disable-next-line
  }, []);

  const newRequestFormAction = (formAction) => {
    setOpenForm(formAction);
  };

  const newScanFormAction = (scanform) => {
    setOpenScan(scanform);
    // dispatch(ACTION.getCountRequest());
  };

  const requestDetail = (viewDetails) => {
    setOpenView(viewDetails);
  };

  const openPrevContent = (openPreview) => {
    setOpenPreview(openPreview);
  };

  const setPreviewContent = (prevContent) => {
    setPreviewDetails(prevContent);
  };

  const setPrintToggle = (toggle) => {
    setPrintView(toggle);
  };

  const buttonGroupStyle = {
    backgroundColor: 'white',
  };

  // const cancelOpenHandler = (toggle) => {
  //   setCancelOpen(toggle);
  // };

  const preventDefault = (event, toggle) => {
    event.preventDefault();
    setBoxView(toggle);
  };

  const refreshTableHandler = (toggle) => {
    setRefreshTable(toggle);
  };

  const onOpenReassignBox = (bool, data) => {
    setReassign({
      messenger: data.messenger,
      box_no: data.box_no,
      messengerId: data.id,
    });
    setOpenReassign(bool);
  };

  const onOpenReassign = (data, messenger, box, messengerId, requestId) => {
    setReassign({
      messenger: messenger,
      box_no: box,
      messengerId: messengerId,
      requestId: requestId,
    });

    setOpenScan(false);
    setOpenReassign(data);
  };

  const handleCloseReassign = () => {
    setOpenReassign(false);
    setOpenScan(false);
    setScanReassign(false);
    setScanStep(0);
    dispatch(ACTION.allRequest(buttonActive));
  };

  const handleScanCloseReassign = () => {
    setOpenReassign(false);
    setScanStep(1);
    setOpenScan(true);
  };

  useEffect(() => {
    dispatch(ACTION.clearAllFilter());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (refreshTable) {
      if (location.pathname === '/app/myrequest') {
        setButtonActive('my_request');
        dispatch(MESSENGER.showAllMessenger());
        dispatch(ACTION.allRequest('my_request'));
        // dispatch(NOTIF.unreadNotifCount())
        refreshTableHandler(false);
      } else {
        dispatch(MESSENGER.showAllMessenger());

        dispatch(ACTION.allRequest(buttonActive));
        // dispatch(NOTIF.unreadNotifCount())
        refreshTableHandler(false);
      }
    }
  }, [refreshTable, location.pathname, dispatch, buttonActive]);

  console.log(request, 'REQUEST!!!');

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SiderComponent />

      <main className={classes.content}>
        <HeaderComponent requestDetail={requestDetail} setOpen={notifOpenHandler} setHeaderNotif={headerNotifHandler} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {location.pathname === '/app/myrequest' ? <h2>My Requests</h2> : <h2>Requests</h2>}
            </Grid>
            <Grid item xs={6}>
              {buttonActive === 'assigne_to_me' ||
              buttonActive === 'pending_accept' ||
              buttonActive === 'accepted_messenger' ? (
                <Grid container alignItems="flex-start" justify="flex-end">
                  <Grid item>
                    {boxView ? (
                      <div
                        style={{
                          marginTop: '15px',
                          display: '-webkit-inline-box',
                        }}
                      >
                        <div style={{ marginRight: '10px', marginTop: '1px' }}>
                          <img src={TableView} alt="icon" style={{ width: '16px', height: '18px' }} />{' '}
                        </div>
                        <div style={{ fontSize: '16px' }}>
                          {' '}
                          <Link
                            href="#"
                            onClick={(event) => {
                              preventDefault(event, false);
                            }}
                            style={{
                              color: 'rgba(47, 53, 66, 0.8)',
                              fontWeight: 'normal',
                            }}
                            data-cy="switch_table_view"
                          >
                            Switch to Table View
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          marginTop: '15px',
                          display: '-webkit-inline-box',
                        }}
                      >
                        <div style={{ marginRight: '10px', marginTop: '-2px' }}>
                          <InboxIcon
                            style={{
                              color: '#41B67F',
                              width: '24px',
                              height: '24px',
                            }}
                          />{' '}
                        </div>
                        <div style={{ fontSize: '16px' }}>
                          {' '}
                          <Link
                            href="#"
                            onClick={(event) => {
                              preventDefault(event, true);
                            }}
                            style={{
                              color: 'rgba(47, 53, 66, 0.8)',
                              fontWeight: 'normal',
                            }}
                            data-cy="switch_box_view"
                          >
                            Switch to Box View
                          </Link>
                        </div>
                      </div>
                    )}
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
          <UserComponent
            buttonActive={buttonActive}
            boxView={boxView}
            getId={getId}
            onOpenReassign={onOpenReassign}
            onOpenReassignBox={onOpenReassignBox}
            handleChange={handleChange}
            searchHandler={searchHandler}
            searchHandlerButton={searchHandlerButton}
            dateRangeFilter={dateRangeFilter}
            filterTypeHandler={filterTypeHandler}
            filterStatusHandler={filterStatusHandler}
            searchButton={searchButton}
            newScanFormAction={newScanFormAction}
            newRequestFormAction={newRequestFormAction}
            reqFilter={searchToggle}
            reqContent={requestContentDetails}
            viewForm={openView}
            userComponent={userComponent}
            reqViewDetails={requestDetail}
            setReqViewDetails={setRequestContentDetails}
            // setidForCancel={setIDForCancelHandler}
            setOpenBoxContent={boxOpenHandler}
          />
        </Container>
      </main>
      {openForm ? (
        <NewRequest
          buttonActive={buttonActive}
          open={openForm}
          closeForm={newRequestFormAction}
          prevDetails={setPreviewContent}
          openPrevDetails={openPrevContent}
          assignment={assignTo}
        />
      ) : null}
      {openScan ? (
        <ScanForm
          classes={classes.dialogHeight}
          open={openScan}
          buttonActive={buttonActive}
          closeForm={newScanFormAction}
          scanStep={scanStep}
          setScanStep={setScanStep}
          setScanReassign={setScanReassign}
          onOpenReassign={onOpenReassign}
        />
      ) : null}
      <ViewRequest
        getBox={getBox}
        requestId={reassign.requestId}
        open={openView}
        onOpenReassign={onOpenReassign}
        closeView={requestDetail}
        // openCancel={cancelOpen}
        buttonActive={buttonActive}
        // setOpenCancel={cancelOpenHandler}
        setRefreshTable={setRefreshTable}
        openNotif={notifOpen}
        headerOpenNotif={openHeaderNotif}
      />
      {/* {openView ? (
      ) : null} */}
      {openPreview && previewDetails !== null ? (
        <PreviewRequest
          buttonActive={buttonActive}
          open={openPreview}
          closePreview={openPrevContent}
          closeView={requestDetail}
          closeForm={newRequestFormAction}
          togglePrint={setPrintToggle}
          prevContent={previewDetails}
        />
      ) : null}
      {openReassign ? (
        <Reassign
          buttonActive={buttonActive}
          reassign={reassign}
          openReassign={openReassign}
          close={handleCloseReassign}
          closeOnReassign={handleCloseReassign}
          scanReassign={scanReassign}
          closeScan={handleScanCloseReassign}
        />
      ) : null}
      {/* {cancelOpen ? <CancelRequest getID={idForCancel} open={cancelOpen} setOpen={cancelOpenHandler} /> : null} */}
      {notifOpen ? <ViewNotification open={notifOpen} setOpen={notifOpenHandler} closeView={requestDetail} /> : null}
      {boxContentOpen ? (
        <ViewContentBox
          setGetBox={setGetbox}
          open={boxContentOpen}
          setOpen={boxOpenHandler}
          filterTypeHandler={filterTypeHandler}
          getId={btnID}
          onOpenReassign={onOpenReassign}
          reqViewDetails={requestDetail}
          buttonActive={buttonActive}
        />
      ) : null}
    </div>
  );
};
RequestorContainer.propTypes = {
  location: PropTypes.any,
};

export default RequestorContainer;
