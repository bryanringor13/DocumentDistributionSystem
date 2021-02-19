import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import {
  DateRangePicker,
  DateRange,
  DateRangeDelimiter,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import MUIDataTable from 'mui-datatables';
import {
  makeValidate,
  TextField,
  KeyboardDatePicker,
  DatePicker,
  // DateRangePicker,
  // DateRange,
  // DateRangeDelimiter,
} from 'mui-rff';

import { Form } from 'react-final-form';
import * as Yup from 'yup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import {
  setPRSortBy,
  setPROrderBy,
} from '../../../../../store/actions/prTableActions';

// import { CDTABLE_COLUMN } from '../../../../../utils/Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function ColumnFilterDateForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cdTable = useSelector((state) => state.cdTable);
  const [mountedRef, setMountedRef] = useState(false);
  const {
    columnName,
    columnLabel,
    InputPlaceholder,
    dataCyTh,
    actionToDispatch,
    defaultValue,
    searchParams,
    defaultStart,
    defaultEnd,
  } = props;

  const [defaulDateStart, setDefaulDateStart] = useState('');
  const [defaulDateEnd, setDefaulDateEnd] = useState('');

  const initialValues = {
    searchInputField: '',
    columnName,
  };
  const formSchema = Yup.object().shape({
    searchInputField: Yup.string(),
  });

  const handleSearch = (e) => {
    if (e.value === null) {
      console.log('NULL', e.value);
      dispatch(actionToDispatch({ 0: '', 1: '' }));
    } else {
      // const startDate = moment(e.value[0]).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      const startDate = moment(e.value[0]).format('YYYY-MM-DD HH:mm:ss');
      const endDate = moment(e.value[1])
        .add(1, 'days')
        .subtract(1, 'seconds')
        .format('YYYY-MM-DD HH:mm:ss');
      // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      dispatch(actionToDispatch({ 0: startDate, 1: endDate }));
      // setDateStartDefault(startDate);
      // setDateEndDefault(endDate);
    }
  };

  const handleSorting = (sortData, orderData) => {
    if (sortData !== searchParams.sortBy) {
      dispatch(setPROrderBy('asc'));
    } else {
      if (orderData === 'desc') {
        dispatch(setPROrderBy('desc'));
      }
      if (orderData === 'asc') {
        dispatch(setPROrderBy('asc'));
      }
    }
    dispatch(setPRSortBy(sortData));
  };
  // canlendar rendering
  setTimeout(() => {
    setMountedRef(true);
  }, 300);

  useEffect(() => {
    setDefaulDateStart(defaultStart);
    setDefaulDateEnd(defaultEnd);
  }, []);

  return (
    <TableCell
      className={`date-filter-th ${columnName}`}
      align="left"
      padding="none"
      sortDirection={
        searchParams.sortBy === columnName ? searchParams.orderBy : false
      }
    >
      <TableSortLabel
        className="column-sorting"
        active={searchParams.sortBy === columnName}
        direction={
          searchParams.sortBy === columnName ? searchParams.orderBy : 'desc'
        }
        onClick={() =>
          handleSorting(
            columnName,
            searchParams.orderBy === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span className="table-label">{columnLabel}</span>
        <span className="table-sorting-icon" />
        {searchParams.sortBy === columnName ? (
          <span className={classes.visuallyHidden}>
            {searchParams.orderBy === 'desc'
              ? 'sorted descending'
              : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>
      <div className="column-search date-filter">
        {mountedRef ? (
          <DateRangePickerComponent
            id={`daterangepickers-${columnName}`}
            allowEdit={false}
            placeholder={InputPlaceholder}
            onChange={handleSearch}
            startDate={defaulDateStart}
            endDate={defaulDateEnd}
            // onCleared={(e) => console.log('cleared')}
          />
        ) : (
          ''
        )}
      </div>
    </TableCell>
  );
}
