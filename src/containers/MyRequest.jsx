import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Grid, Button, makeStyles, TableCell } from '@material-ui/core';
import Title from '../components/common/Title';
import SearchDateFilter from '../components/dds/SearchDateFilter';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import Reassign from '../components/dds/Reassign';
import * as MESSENGER from '../store/actions/MessengerActions';
import * as Constants from '../utils/Constants';
import * as ACTION from '../store/actions/requestActions';
import RequestTable from '../components/dds/RequestTable';
import { Alert } from '@material-ui/lab';
import PrimaryButton from '../components/common/Button/PrimaryButton';
const useStyles = makeStyles((theme) => ({
  messengerWrapper: {
    display: 'flex',
  },
}));

const MyRequest = () => {
  const classes = useStyles();
  const request = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const [searchField, setSearchField] = useState(false);
  const [refreshTable, setRefreshTable] = useState(true);
  const [buttonTrigger, setButtonTrigger] = useState(false);
  const [openReassign, setOpenReassign] = useState(false);
  const [searchButton, setSearchButton] = useState('');
  const [reassign, setReassign] = useState({});
  const [idForCancel, setIDForCancel] = useState('');

  const buttonActive = 'my_request';
  const tableActionMyRequest = [
    {
      icon: 'edit',
      tooltip: 'edit',
      onClick: (event, rowData) => onOpenReassignBox(true, rowData),
    },
  ];

  const componentsMyRequest = {
    Cell: (props) => {
      let valueItem = '';
      if (props.columnDef.title === 'Status') {
        const data = Constants.TRACKING_STATUS.find((item) => item.code === props.value);
        valueItem = data.text;
      }
      return props.columnDef.title === 'Status' ? (
        props.value === 1 ? (
          <TableCell>
            {' '}
            <div className="custom-alert-info">
              <Alert severity="info">{valueItem}</Alert>
            </div>
          </TableCell>
        ) : props.value === 2 || props.value === 3 ? (
          <TableCell>
            {' '}
            <Alert severity="warning">{valueItem}</Alert>
          </TableCell>
        ) : props.value > 5 && props.value < 8 ? (
          <TableCell>
            {' '}
            <Alert severity="success">{valueItem}</Alert>
          </TableCell>
        ) : props.value > 7 && props.value < 14 ? (
          <TableCell>
            {' '}
            <Alert severity="error">{props.value === 12 ? 'Cancelled' : valueItem}</Alert>
          </TableCell>
        ) : props.value > 3 && props.value < 6 ? (
          <TableCell>
            {' '}
            <Alert severity="info">{valueItem}</Alert>
          </TableCell>
        ) : (
          <TableCell>{props.value}</TableCell>
        )
      ) : props.columnDef.title === 'Type' ? (
        parseInt(props.value) > 0 ? (
          <TableCell>{Constants.REQUEST_TYPE_TEXT[props.value].text}</TableCell>
        ) : (
          <TableCell>{props.value}</TableCell>
        )
      ) : props.columnDef.title === 'Action' ? (
        <TableCell>
          {buttonActive === 'accepted_messenger' ? (
            ''
          ) : (
            <Button variant="outlined" color="primary" className={classes.actionBtn} style={{ marginLeft: '5px' }}>
              Reassign
            </Button>
          )}
          {buttonActive === 'pending_acceptance' || buttonActive === 'accepted_messenger' ? (
            ''
          ) : (
            <Button variant="contained" color="primary" className={classes.actionBtn}>
              Send
            </Button>
          )}
          {buttonActive === 'assigne_to_me' ||
          buttonActive === 'pending_acceptance' ||
          buttonActive === 'accepted_messenger' ? (
            ''
          ) : (
            <Button variant={'outlined'} color="primary" className={classes.actionBtn} style={{ marginLeft: '5px' }}>
              View Content
            </Button>
          )}

          {buttonActive === 'accepted_messenger' && (
            <Button variant="contained" color="primary" style={{ minWidth: '20px' }} className={classes.actionBtn}>
              Print
            </Button>
          )}
        </TableCell>
      ) : props.columnDef.title === 'Capacity' ? (
        <TableCell>{props.value}</TableCell>
      ) : (
        <TableCell>{props.value}</TableCell>
      );
    },
    Action: (props) => {
      if (props.action.icon === 'edit') {
        return (
          <PrimaryButton
            onClick={(event) => {
              props.action.onClick(event, props.data);
              event.stopPropagation();
            }}
          >
            Reassign
          </PrimaryButton>
        );
      }
    },
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

  const onOpenReassignBox = (bool, data) => {
    setReassign({
      messenger: data.messenger,
      box_no: data.box_no,
      messengerId: data.id,
    });
    setOpenReassign(bool);
  };

  const refreshTableHandler = (toggle) => {
    // console.log(toggle, 'Refresh Table')
    setRefreshTable(toggle);
  };
  const searchHandler = (filter) => {
    setSearchButton(filter);
    if (filter.length < 1) {
      if (buttonTrigger) {
        dispatch(ACTION.getFilterRequest(''));
        refreshTableHandler(true);
        setButtonTrigger(false);
      }
    }
    setSearchField(false);
  };
  const searchHandlerButton = () => {
    dispatch(ACTION.getFilterRequest(searchButton));
    setButtonTrigger(true);
    refreshTableHandler(true);
  };
  const searchToggle = (toggle) => {
    setSearchField(toggle);
  };
  const dateRangeFilter = (date) => {
    if (date.value) {
      dispatch(
        ACTION.getRangeDate(moment(date.value[0]).format('L').toString(), moment(date.value[1]).format('L').toString())
      );
      setButtonTrigger(true);
      refreshTableHandler(true);
    } else {
      if (buttonTrigger) {
        dispatch(ACTION.getRangeDate('', ''));
        refreshTableHandler(true);
        setButtonTrigger(false);
      }
    }
  };

  const setIDForCancelHandler = (id) => {
    setIDForCancel(id);
  };

  const handleCloseReassign = () => {
    setOpenReassign(false);

    dispatch(ACTION.allRequest(buttonActive));
  };
  useEffect(() => {
    if (refreshTable) {
      console.log('Table Refresh');
      dispatch(MESSENGER.showAllMessenger());
      dispatch(ACTION.allRequest('my_request'));
      // dispatch(NOTIF.unreadNotifCount())
      refreshTableHandler(false);
    }
  });
  return (
    <Layout>
      <Grid item className={classes.messengerWrapper} sm={12}>
        <Grid item sm={6}>
          <Title>My Requests</Title>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 20 }}>
        <Grid item sm={9}>
          {/* Search Field and Date Range Filter */}

          <SearchDateFilter
            buttonActive="my_request"
            searchHandler={searchHandler}
            searchHandlerButton={searchHandlerButton}
            dateRangeFilter={dateRangeFilter}
            filterTypeHandler={filterTypeHandler}
            filterStatusHandler={filterStatusHandler}
            searchButton={searchButton}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.m}>
        {request.reqLoading ? (
          <div className={classes.loadingWidth}></div>
        ) : (
          <RequestTable
            reqFilter={searchToggle}
            onOpenReassignBox={onOpenReassignBox}
            // search={searchField}
            openReassign={openReassign}
            tableAction={tableActionMyRequest}
            components={componentsMyRequest}
            buttonActive="my_request"
            content="my_request"
            setidForCancel={setIDForCancelHandler}
          />
        )}
      </Grid>
      {openReassign ? (
        <Reassign
          buttonActive={buttonActive}
          reassign={reassign}
          openReassign={openReassign}
          close={handleCloseReassign}
          closeOnReassign={handleCloseReassign}
        />
      ) : null}
    </Layout>
  );
};

MyRequest.propTypes = {
  setOpenBoxContent: PropTypes.any,
  buttonActive: PropTypes.any,
  handleChange: PropTypes.any,
  boxView: PropTypes.any,
  getId: PropTypes.any,
  onOpenReassignBox: PropTypes.any,
  searchHandler: PropTypes.any,
  searchHandlerButton: PropTypes.any,
  dateRangeFilter: PropTypes.any,
  filterTypeHandler: PropTypes.any,
  filterStatusHandler: PropTypes.any,
  searchButton: PropTypes.any,
  newScanFormAction: PropTypes.any,
  newRequestFormAction: PropTypes.any,
  searchToggle: PropTypes.any,
  requestContentDetails: PropTypes.any,
  openView: PropTypes.any,
  userComponent: PropTypes.any,
  action: PropTypes.any,
  reqViewDetails: PropTypes.any,
  setReqViewDetails: PropTypes.any,
  setidForCancel: PropTypes.any,
  data: PropTypes.any,
  columnDef: PropTypes.any,
  value: PropTypes.any,
};

export default MyRequest;
