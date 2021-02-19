import React from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { sortingReport } from '../../../../store/actions/action_report';
const useStyles = makeStyles(() => ({
  dateHolder: {
    '& input': {
      height: '24px',
      fontSize: '16px',
      paddingLeft: '10px',
    },
  },
  filterHolder: {
    position: 'relative',
    marginTop: '15px',
    marginBottom: '19px',
  },
  datePick: {
    border: '1px solid #A5B0BE',
    borderRadius: '4px',
    background: '#fff',
    '& .MuiInput-underline:before': {
      display: 'none',
    },
  },
}));
const ColumnDate = ({ dateRangeFilter, columnName, columnLabel, searchParams, dateScanned, reportName }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSorting = (sortData, orderData) => {
    dispatch(sortingReport(sortData, reportName));
  };
  return (
    <TableCell
      align="left"
      padding="none"
      sortDirection={searchParams.sortBy === columnName ? searchParams.orderBy : false}
    >
      <TableSortLabel
        className="column-sorting"
        active={searchParams.sortBy === columnName}
        direction={searchParams.sortBy === columnName ? searchParams.orderBy : 'desc'}
        onClick={() => handleSorting(columnName)}
      >
        <span className="table-label">{columnLabel}</span>
        <span className="table-sorting-icon" />
        {searchParams.sortBy === columnName ? (
          <span className={classes.visuallyHidden}>
            {searchParams.orderBy === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>

      <div className="daterangepicker-control-section-filter">
        <DateRangePickerComponent
          variant="outlined"
          placeholder="Filter by date"
          onChange={(date) => dateRangeFilter(date)}
        />
      </div>
    </TableCell>
  );
};

ColumnDate.propTypes = {
  dateScanned: PropTypes.any,
  dateRangeFilter: PropTypes.any,
  columnName: PropTypes.any,
  columnLabel: PropTypes.any,
  searchParams: PropTypes.any,
  reportName: PropTypes.any,
};
export default ColumnDate;
