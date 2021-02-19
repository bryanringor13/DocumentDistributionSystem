/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, TextField, Button, FormControl, NativeSelect, withStyles, InputBase } from '@material-ui/core';
import * as REQ_TYPE from '../../utils/Constants';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

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
  searchWrapperWidthExtend: {
    width: '50%',
    position: 'relative',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& input': {
      padding: '10px 30px 10px 12px',
    },
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

const SearchDateFilter = (props) => {
  const classes = useStyles();
  const [userRoles, setUserRoles] = useState(JSON.parse(localStorage.getItem('roles')));
  const request = useSelector((state) => state.request);
  const contact = useSelector((state) => state.contact);
  const [dateFrom, setDateFrom] = useState(false);
  const [dateTo, setDateTo] = useState(false);

  useEffect(() => {
    if (request.searchParams.dateFrom.length !== 0) {
      setDateFrom(true);
    } else {
      setDateFrom(false);
    }

    if (request.searchParams.dateTo.length !== 0) {
      setDateTo(true);
    } else {
      setDateTo(false);
    }
  }, [request.searchParams.dateFrom.length, request.searchParams.dateTo.length]);

  return (
    <div>
        {
          props.buttonActve === 'audit_logs' ? 
          <Grid container spacing={3}>
            <Grid className={classes.searchWrapperWidthExtend} item xs={5}>
              <TextField
                id="outlined-start-adornment"
                className="search-field"
                placeholder="Search..."
                value={props.searchButton}
                onChange={(e) => props.searchHandler(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    props.searchHandlerButton(props.searchButton);
                  }
                }}
                variant="outlined"
                inputProps={{ 'data-cy': 'search' }}
              />
              <Button
                onClick={() => props.searchHandlerButton(props.searchButton)}
                className={classes.btnSearch}
                data-cy="search_icon"
              >
                {''}
              </Button>
            </Grid>
            <Grid item xs={3}>
                <NativeSelect
                  input={<BootstrapInput />}
                  onChange={(event) => props.filterTypeHandler(event.target.value)}
                  data-cy="filter_type"
                  style={{width: '100%'}}
                >
                  {REQ_TYPE.AUDIT_USER.map((type, index) => (
                    <option key={index} selected={props.filterUserCode === type.code} value={type.code}>
                      {type.text}
                    </option>
                  ))}
                </NativeSelect>
            </Grid>
            <Grid item xs={4}>
              <div className="daterangepicker-control-section">
                <DateRangePickerComponent
                  variant="outlined"
                  startDate={dateFrom ? request.searchParams.dateFrom : ''}
                  endDate={dateTo ? request.searchParams.dateTo : ''}
                  placeholder="Filter by date"
                  onChange={(date) => props.dateRangeFilter(date)}
                  data-cy="filter_date_field"
                />
              </div>
            </Grid>
          </Grid>
          : 
          <Grid container spacing={3}>
            <Grid className={classes.searchWrapper} item>
              <TextField
                id="outlined-start-adornment"
                className="search-field"
                placeholder="Search..."
                value={props.searchButton}
                onChange={(e) => props.searchHandler(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    props.searchHandlerButton(props.searchButton);
                  }
                }}
                variant="outlined"
                inputProps={{ 'data-cy': 'search' }}
              />
              <Button
                onClick={() => props.searchHandlerButton(props.searchButton)}
                className={classes.btnSearch}
                data-cy="search_icon"
              >
                {''}
              </Button>
            </Grid>
            {props.buttonActive === 'accepted_messenger' ||
            props.buttonActive === 'pending_accept' ||
            props.buttonActive === 'assigne_to_me' ||
            props.buttonActive === 'employee' ||
            props.buttonActive === 'departments' ||
            props.buttonActive === 'brokers_and_agents' ||
            props.buttonActive === 'other_companies' ||
            props.buttonActive === 'intellicare_branch' ? (
              ''
            ) : (
              <Grid item>
                <div className="daterangepicker-control-section">
                  <DateRangePickerComponent
                    variant="outlined"
                    startDate={dateFrom ? request.searchParams.dateFrom : ''}
                    endDate={dateTo ? request.searchParams.dateTo : ''}
                    placeholder="Filter by date"
                    onChange={(date) => props.dateRangeFilter(date)}
                    data-cy="filter_date_field"
                  ></DateRangePickerComponent>
                </div>
              </Grid>
            )}
            {props.buttonActive === 'requestor_table' ||
            props.buttonActive === 'unassigned' ||
            props.buttonActive === 'my_request' ||
            props.buttonActive === 'all_request' ||
            props.buttonActive === 'history' ||
            props.dateShow === 'yes' ? (
              <Grid item>
                <FormControl style={{ width: '159px' }}>
                  <NativeSelect
                    input={<BootstrapInput />}
                    onChange={(event) => props.filterTypeHandler(event.target.value)}
                    data-cy="filter_type"
                  >
                    {REQ_TYPE.REQUEST_TYPE_TEXT.map((type, index) => (
                      <option key={index} selected={request.searchParams.requestType === type.code} value={type.code}>
                        {type.text}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Grid>
            ) : props.buttonActive === 'assigne_to_me' || props.buttonActive === 'pending_accept' ? (
              ''
            ) : null}
            
            {props.buttonActive === 'requestor_table' ||
            props.buttonActive === 'my_request' ||
            props.buttonActive === 'all_request' ||
            props.buttonActive === 'history' ? (
              <Grid item>
                <FormControl style={{ width: '159px' }}>
                  {props.buttonActive === 'history' ? (
                    <>
                      <NativeSelect
                        input={<BootstrapInput />}
                        onChange={(event) => props.filterStatusHandler(event.target.value)}
                        inputProps={{ 'data-cy': 'filter_status' }}
                      >
                        {REQ_TYPE.TRACKING_STATUS_HISTORY.map((status, index) => (
                          <>
                            {status.code === 5 ? (
                              ''
                            ) : (
                              <option
                                key={index}
                                selected={request.searchParams.trackingStatus === status.code}
                                value={status.code}
                              >
                                {status.text}
                              </option>
                            )}
                          </>
                        ))}
                      </NativeSelect>
                    </>
                  ) : (
                    <NativeSelect
                      input={<BootstrapInput />}
                      onChange={(event) => props.filterStatusHandler(event.target.value)}
                      inputProps={{ 'data-cy': 'filter_status' }}
                    >
                      {REQ_TYPE.TRACKING_STATUS.map((status, index) => (
                        <>
                          {status.code === 5 ? (
                            ''
                          ) : (
                            <option key={index} value={status.code}>
                              {status.text}
                            </option>
                          )}
                        </>
                      ))}
                    </NativeSelect>
                  )}
                </FormControl>
              </Grid>
            ) : null}
    
            {props.buttonActive === 'brokers_and_agents' && (
              <Grid item>
                <FormControl>
                  <NativeSelect
                    input={<BootstrapInput />}
                    onChange={(event) => props.filterTypeHandler(event.target.value)}
                  >
                    {REQ_TYPE.CONTACT_TYPE_BROKER.map((status, index) => (
                      <>
                        <option key={index} selected={contact.contactType === status.code} value={status.code}>
                          {status.text}
                        </option>
                      </>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Grid>
            )}
    
            {props.buttonActive === 'employee' ||
            props.buttonActive === 'departments' ||
            props.buttonActive === 'brokers_and_agents' ||
            props.buttonActive === 'other_companies' ||
            props.buttonActive === 'intellicare_branch' ? (
              <Grid item>
                <FormControl>
                  {props.buttonActive === 'employee' ||
                  props.buttonActive === 'departments' ||
                  props.buttonActive === 'brokers_and_agents' ||
                  props.buttonActive === 'other_companies' ||
                  props.buttonActive === 'intellicare_branch' ? (
                    <>
                      <NativeSelect
                        input={<BootstrapInput />}
                        onChange={(event) => props.filterStatusHandler(event.target.value)}
                        inputProps={{ 'data-cy': 'filter_status' }}
                      >
                        {REQ_TYPE.CONTACT_STATUS.map((status, index) => (
                          <>
                            <option key={index} selected={contact.contactStatus === status.code} value={status.code}>
                              {status.text}
                            </option>
                          </>
                        ))}
                      </NativeSelect>
                    </>
                  ) : (
                    <NativeSelect
                      input={<BootstrapInput />}
                      onChange={(event) => props.filterStatusHandler(event.target.value)}
                      inputProps={{ 'data-cy': 'filter_status' }}
                    >
                      {REQ_TYPE.TRACKING_STATUS.map((status, index) => (
                        <>
                          {status.code === 5 ? (
                            ''
                          ) : (
                            <option key={index} value={status.code}>
                              {status.text}
                            </option>
                          )}
                        </>
                      ))}
                    </NativeSelect>
                  )}
                </FormControl>
              </Grid>
            ) : null}
          </Grid>
        }
    </div>
  );
};

SearchDateFilter.propTypes = {
  searchHandler: PropTypes.any,
  searchButton: PropTypes.any,
  searchHandlerButton: PropTypes.any,
  dateRangeFilter: PropTypes.any,
  filterTypeHandler: PropTypes.any,
  filterStatusHandler: PropTypes.any,
  buttonActive: PropTypes.any,
  filterUserCode: PropTypes.any,
  dateShow: PropTypes.any,
};

export default SearchDateFilter;
