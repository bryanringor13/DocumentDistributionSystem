/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import AuditDisplayTable from '../common/CommonTable/AuditDisplayTable';
import { Grid, TextField, Button, FormControl, NativeSelect, withStyles, InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import { TablePagination, TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import CommonSelect from '../common/CommonSelect/CommonSelect';
import { useSelector, useDispatch } from 'react-redux';
import * as REQ_TYPE from '../../utils/Constants';
import SearchDateFilter from './SearchDateFilter';
import PrimaryButton from '../common/Button/PrimaryButton';
import downloadIcon from '../../assets/img/icons/download.png';
import PropTypes from 'prop-types';

import * as CONTACT from '../../store/actions/contactAction';

const useStyles = makeStyles(() => ({
  marginLeft: {
    marginLeft: '24px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  alert: {
    padding: '6px 8px 6px 8px',
    width: 'fit-content',
    '& .MuiAlert-message': {
      padding: '0',
    },
  },
  searchWrapper: {
    maxWidth: '260px',
    width: '100%',
    position: 'relative',
    marginTop: '20px',
    // marginBottom: '20px',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& input': {
      padding: '10px 30px 10px 12px',
    },
  },
  searchField: {
    maxWidth: '282px',
  },
  contactBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnSearch: {
    position: 'absolute',
    opacity: '1',
    right: '13px',
    minWidth: '37px',
    minHeight: '40px',
  },
  searchWrapperContact: {
    display: 'flex',
  },
  commonSelectLocation: {
    height: '45px !important',
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

const AuditLogsTable = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const address_info = useSelector((state) => state.address);
  const contact = useSelector((state) => state.contact);
  const [defaultSelectFilter, setDefaultSelectFilter] = useState(0);
  const activePage = 'audit_logs';

  const userTypeFilterHandler = (value) => {
      console.log('Audit Logs Filter: ',value);
    // setDefaultSelectFilter()
  }

  return (
    <>
      <Grid item>
        <div className={`${classes.searchWrapperContact} contact-flex`}>
            <Grid container style={{ marginTop: 20 }}>
                <Grid item sm={9}>
                    <SearchDateFilter buttonActve={activePage} filterUserCode={defaultSelectFilter} filterTypeHandler={userTypeFilterHandler}/>
                </Grid>
                <Grid item sm={3}>
                    <div className={classes.contactBtnWrapper}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log('download')}
                        data-cy="new_request_btn"
                    >
                        <img src={downloadIcon} alt="Logo" style={{ marginRight: 10 }}/><span>Download Logs</span>
                    </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
      </Grid>
      <AuditDisplayTable
        columns={props.tableColumn}
        onRowClick={(rowData) => console.log('Row Data: ',rowData)}
        data={props.dataTable}
      />
    </>
  );
};

AuditLogsTable.propTypes = {
    dataTable: PropTypes.any,
    tableColumn: PropTypes.any,
};

export default AuditLogsTable;
