/* eslint-disable react/display-name */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Layout from '../components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { TablePagination, TableCell } from '@material-ui/core';
import MessengerTable from '../components/common/CommonTable/MessengerTable';
import AddIcon from '@material-ui/icons/Add';
import PrimaryButton from '../components/common/Button/PrimaryButton';
import Title from '../components/common/Title';

import EditMessenger from '../components/dds/EditMessenger';
import NewMessenger from '../components/dds/NewMessenger';
import { useDispatch, useSelector } from 'react-redux';
import * as ADDRESS from '../store/actions/addressActions';
import * as MESSENGER from '../store/actions/MessengerActions';
import Alert from '@material-ui/lab/Alert';
import * as REQ_TYPE from '../utils/Constants';
import * as ACTION from '../store/actions/MessengerActions';
import CommonSelect from '../components/common/CommonSelect/CommonSelect';
import Loading from '../components/common/Loading';
import { numberWithComma } from '../utils/common';

// @ts-ignore
const useStyles = makeStyles(() => ({
  circle: {
    height: '16px !important',
    color: 'green',
    margin: '4px 40px',
    width: '16px !important',
  },
  circle2: {
    height: '16px !important',
    color: 'green',
    margin: '4px 15px  !important',
    width: '16px !important',
  },
  messengerWrapper: {
    display: 'flex',
  },
  alert: {
    padding: '6px 8px 6px 8px',
    width: 'fit-content',
    '& .MuiAlert-message': {
      padding: '0',
    },
  },
  btnWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionWrapper: {
    display: 'flex',
  },
  btnHolder: {
    marginTop: ' 24px',
    marginBottom: '16px',
  },
  itemWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #E0E6ED',
    marginBottom: '19px',
    '& button': {
      border: 'none',
      color: '#41B67F',
    },
  },
  header: {
    fontWeight: '600',
    fontSize: '28px',
    lineHeight: '1.8',
    marginBottom: '24px',
  },
  itemContainer: {
    border: ' 1px solid #E0E6ED',
    padding: '24px 40px',
    marginBottom: '40px',
  },
  itemHolder: {
    maxWidth: '604px',
  },
  assignHolder: {
    margin: '20px 0',
  },
  selectItem: {
    '&  .MuiSelect-selectMenu': {
      fontSize: '16px',
    },
  },
  MuiMenuItem: {
    root: {
      fontSize: '16px',
    },
  },
  pass: {
    color: '#2F3542',
    margin: '8px 0',
    fontSize: '16px',
    maxWidth: '165px',
    fontWeight: 600,
    border: 'none',
    pointerEvents: 'none',
    lineHeight: 1.3,
    backgroundColor: '#fff !important',
  },
  title: {
    color: 'rgba(47, 53, 66, 0.8)',
    fontSize: '16px',
    lineHeight: '1.3',
    margin: '8px 0',
  },
  subTitle: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#2F3542',
  },
  description: {
    maxWidth: '190px',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '1.3',
    color: '#2F3542',

    wordBreak: 'break-all',

    margin: '8px 0',
  },
  btnReset: {
    marginTop: '22px',
  },
  boxNo: {
    margin: '10px 0',
    '& .MuiInputLabel-root': {
      color: 'rgba(43, 45, 51, 0.8)',
      margin: '0',
      fontSize: '14px',
      lineHeight: '13px',
      marginBottom: '7px',
    },
  },
  boxNos: {
    margin: '30px 0 0',
    '& .MuiInputLabel-root': {
      color: 'rgba(43, 45, 51, 0.8)',
      margin: '0',
      fontSize: '14px',
      lineHeight: '13px',
      marginBottom: '7px',
    },
  },
  removeAssign: {
    cursor: 'pointer',
  },
  editItemContainer: {
    borderTop: 'none',
    border: '1px solid #E0E6ED',
    padding: '24px 40px',
    background: '#F4F6F9',
  },
  editHolder: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deactivateBtn: {
    width: '100%',
    color: '#FA5656',
    textAlign: 'center',
    padding: '24px',
    border: '1px solid #E0E6ED',
    borderTop: 'none',
    marginBottom: '40px',
  },
  editItemWrapper: {
    padding: '25px 40px 12px',
    width: '100%',
    border: '1px solid #E0E6ED',
    borderBottom: 'none',
    '& button': {
      border: 'none',
      color: '#41B67F',
    },
    MuiList: {
      root: {
        fontSize: '20px',
      },
    },
  },
  btnDivider: {
    marginBottom: '14px',
  },
  btnLeft: {
    marginLeft: '16px',
    minWidth: '86px',
    minHeight: '40px',
    padding: '8px 24px !important',
  },
  addMore: {
    fontWeight: 600,
    marginTop: '15px',
    background: '#fff',
    cursor: 'pointer',
    padding: '10px',
    alignItems: 'center',
    width: '100%',
    border: ' 1px solid #E0E6ED',
    borderRadius: '2px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    borderRadius: '20px',
    height: '16px',
    width: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgb(65, 182, 127)',
    border: '1px solid rgb(65, 182, 127)',

    '& svg': {
      fontSize: '18px',
    },
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchWrapper: {
    position: 'relative',
    '& input': {
      height: '18px',
      padding: '10px 30px 10px 12px',
    },
  },
  search: {
    cursor: 'pointer',
    right: 0,
    height: '40px',
    minWidth: '36px',
    position: 'absolute',
  },
  loadingWidth: {
    width: '100%',
  },
  marginLeft: {
    marginLeft: 10,
  },
  formControl: {
    minWidth: 250,
  },
  btnRight: {
    textAlign: 'right',
  },
  errorBox: {
    marginTop: '5px',
    color: '#FA5656',
    fontSize: '0.8571428571428571rem',
    display: 'block',
  },
  showPrint: {
    display: 'block',
  },
  hidePrint: {
    display: 'none',
  },
  errorBoxNone: {
    display: 'none',
  },
  reseton: {
    marginTop: '5px',
    color: 'rgba(47, 53, 66, 0.8)',
    fontSize: '0.8571428571428571rem',
    display: 'block',
  },
  disNone: {
    display: 'none',
  },
  resetonNone: {
    display: 'none',
  },
  boxError: {
    position: 'relative',
  },
  limit: {
    color: 'red',
  },
}));

const Messenger = () => {
  const dispatch = useDispatch();
  const messenger_info = useSelector((state) => state.messenger);
  const address_info = useSelector((state) => state.address);

  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  useEffect(() => {
    dispatch(ACTION.getFilterRequestMessenger(''));
    dispatch(ADDRESS.getNcrProvince());
    dispatch(ADDRESS.initialBarangay());
    dispatch(MESSENGER.setPaginationPageMessenger(1));
    dispatch(MESSENGER.setPageLimitMessenger(10));

    dispatch(MESSENGER.getLocationRequestMessenger(''));
    dispatch(MESSENGER.allMessenger());
    dispatch(MESSENGER.showAllMessenger());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(MESSENGER.clearMessengerFilter());
    };
  }, []);

  const tableColumn = [
    {
      title: 'Messenger ID',
      field: 'messenger_id',
    },
    { title: 'Messenger', field: 'messenger' },
    { title: 'Contact Number', field: 'contact_number' },
    { title: 'Assigned Location', field: 'assigned_locations_labels' },
    {
      title: 'Box No.',
      field: 'box_no',
    },
    {
      title: 'Capacity',
      field: 'capacity',
    },
    {
      title: 'Status',
      field: 'status',
    },
  ];

  const dialogOpen = (data) => {
    const matched = messenger_info.request.find((item) => item.messenger_id === data.messenger_id);

    dispatch(MESSENGER.getMessengerDetails(matched.id, setOpen, false));
  };

  const dialogEditOpen = (data) => {
    const matched = messenger_info.request.find((item) => item.messenger_id === data.messenger_id);

    dispatch(MESSENGER.getMessengerDetails(matched.id, setOpen, true));
  };

  const tableAction = [
    {
      icon: 'edit',
      tooltip: 'edit',
      onClick: (event, rowData) => dialogEditOpen(rowData),
    },
  ];

  const componentsTable = {
    Cell: (props) => {
      let data = [];
      let capacityLimit = false;

      if (props.columnDef.title === 'Capacity') {
        data = props.value.split('/');
        if (parseInt(data[0].replace(' ', '')) >= parseInt(data[1])) {
          capacityLimit = true;
        }
      }

      return props.value === 1 && props.columnDef.title === 'Status' ? (
        <TableCell>
          {' '}
          <Alert className={classes.alert} severity="success">
            {REQ_TYPE.ACTIVE_STATUS[0].text}
          </Alert>{' '}
        </TableCell>
      ) : props.value === 2 && props.columnDef.title === 'Status' ? (
        <TableCell>
          {' '}
          <div className="custom-alert-info">
            <Alert className={classes.alert} severity="info">
              {REQ_TYPE.ACTIVE_STATUS[1].text}
            </Alert>
          </div>
        </TableCell>
      ) : props.columnDef.title === 'Capacity' ? (
        <TableCell className={capacityLimit === true && classes.limit}>{numberWithComma(props.value)}</TableCell>
      ) : props.columnDef.title === 'Box No.' ? (
        <TableCell>{numberWithComma(props.value)}</TableCell>
      ) : (
        <TableCell>{props.value}</TableCell>
      );
    },
    Action: (props) => {
      if (props.action.icon === 'edit') {
        return (
          <Button
            onClick={(event) => {
              props.action.onClick(event, props.data);
              event.stopPropagation();
            }}
            color="primary"
            variant="contained"
            style={{
              textTransform: 'none',
              minWidth: '34px',
              padding: '4px 0',
            }}
            size="small"
            data-cy="edit_btn"
          >
            Edit
          </Button>
        );
      }
    },
    Pagination: (props) => (
      <>
        <TablePagination {...props} rowsPerPageOptions={[10, 20, 30]} />
      </>
    ),
  };

  console.log(messenger_info.request, 'te');

  const searchHandler = (filter) => {
    setSearch(filter);
    if (!filter.length) {
      dispatch(ACTION.getFilterRequestMessenger(''));
      dispatch(MESSENGER.allMessenger());
    }
  };

  const onChangeLocation = (e) => {
    const location = address_info.himsNcrCity.find((item) => item.label === e.target.value);

    if (location) {
      dispatch(MESSENGER.getLocationRequestMessenger(location.id));
      dispatch(MESSENGER.setPaginationPageMessenger(1));
      dispatch(MESSENGER.allMessenger());
    } else {
      dispatch(MESSENGER.getLocationRequestMessenger(''));
      dispatch(MESSENGER.allMessenger());
    }
  };

  const onSearchClick = (filter) => {
    if (search.length) {
      dispatch(ACTION.getFilterRequestMessenger(search));
      dispatch(MESSENGER.allMessenger());
    } else if (!search.length) {
      dispatch(ACTION.getFilterRequestMessenger(''));
      dispatch(MESSENGER.allMessenger());
    }
  };

  const handleClose = (data) => {
    setOpen(data);
    dispatch(MESSENGER.allMessenger());
  };

  const handleCloseNew = (data) => {
    setOpenNew(data);
    dispatch(MESSENGER.allMessenger());
  };

  const onClickNew = (data) => {
    setOpenNew(data);
  };

  const [location, setLocation] = useState([
    {
      city: '',
      barangary: [],
    },
  ]);

  console.log(messenger_info.request, 'MESSENGER REQUEST');

  return (
    <Layout>
      <Grid item className={classes.messengerWrapper} sm={12}>
        <Grid item sm={6}>
          <Title>Messenger</Title>
        </Grid>
        <Grid className={classes.btnWrapper} item sm={6}>
          <PrimaryButton datacy="new_messenger_btn" onClick={() => onClickNew(true)}>
            New Messenger <AddIcon style={{ fontSize: '1rem' }} />{' '}
          </PrimaryButton>
        </Grid>
      </Grid>
      {address_info.himsNcrCity ? (
        <>
          <Grid container className={classes.btnHolder}>
            <Grid item style={{ display: 'flex', alignItems: 'center' }} sm={6}>
              <div className={classes.searchWrapper}>
                <TextField
                  style={{ marginBottom: '0' }}
                  id="outlined-start-adornment"
                  className="search-field"
                  placeholder="Search..."
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      onSearchClick();
                    }
                  }}
                  onChange={(e) => searchHandler(e.target.value)}
                  variant="outlined"
                  inputProps={{ 'data-cy': 'search' }}
                />
                <Button className={classes.search} onClick={onSearchClick} />
              </div>
              <div className={classes.marginLeft}>
                <CommonSelect
                  id="allLocation"
                  onChange={onChangeLocation}
                  item={address_info.himsNcrCityLabel}
                  datacy="city_filter"
                />
              </div>
            </Grid>
          </Grid>
          {!messenger_info.reqLoading ? (
            <MessengerTable
              columns={tableColumn}
              data={messenger_info.request}
              onRowClick={(rowData) => dialogOpen(rowData)}
              actions={tableAction}
              components={componentsTable}
            />
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <Loading />
      )}
      {open && <EditMessenger close={handleClose} open={open} classes={classes} />}
      {openNew && (
        <NewMessenger
          close={handleCloseNew}
          open={openNew}
          location={location}
          classes={classes}
          setLocation={setLocation}
        />
      )}
    </Layout>
  );
};

Messenger.propTypes = {
  value: PropTypes.any,
  columnDef: PropTypes.any,
  action: PropTypes.any,
  data: PropTypes.any,
  onOrderChange: PropTypes.any,
};

export default Messenger;
