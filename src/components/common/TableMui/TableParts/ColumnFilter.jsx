import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Grid, FormControl, NativeSelect, withStyles, InputBase } from '@material-ui/core';

import { sortingReport } from '../../../../store/actions/action_report';
import '../paymentRequest.scss';
const useStyles = makeStyles(() => ({
  // filterWidth: {
  //   width: '200px'
  // },
  filterHolder: {
    position: 'relative',
    marginTop: '15px',
    marginBottom: '19px',
    minWidth: '142px',
    height: '42px',
  },
  fullFilter: {
    position: 'relative',
    marginTop: '15px',
    marginBottom: '19px',
    minWidth: '242px',
    height: '42px',
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
    padding: '4px 26px 6px 12px',
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
const ColumnFilter = ({
  columnName,
  columnLabel,
  searchParams,
  // eslint-disable-next-line react/prop-types
  dataItem,
  filterTypeHandler,
  reportName,
  fullFilter,
}) => {
  const dispatch = useDispatch();
  const handleSorting = (sortData, orderData) => {
    dispatch(sortingReport(sortData, reportName));
  };

  const classes = useStyles();
  return (
    <TableCell
      align="left"
      padding="none"
      sortDirection={searchParams.sortBy === columnName ? searchParams.orderBy : false}
    >
      <TableSortLabel
        style={{ marginBottom: '15px' }}
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
      <div style={{ marginBottom: '15px' }} className={fullFilter ? classes.fullFilter : classes.filterHolder}>
        <Grid item>
          <FormControl style={{ width: '100%' }}>
            <NativeSelect
              input={<BootstrapInput />}
              onChange={(event) => filterTypeHandler(event.target.value)}
              data-cy="filter_type"
            >
              {dataItem &&
                dataItem.map((type, index) =>
                  reportName === 'scheduledRequestsReport' ? (
                    <option key={index} value={type.id}>
                      {type.text}
                    </option>
                  ) : (
                    <option key={index} value={type.code}>
                      {type.text}
                    </option>
                  )
                )}
            </NativeSelect>
          </FormControl>
        </Grid>
      </div>
    </TableCell>
  );
};

ColumnFilter.propTypes = {
  columnLabel: PropTypes.any,
  columnName: PropTypes.any,
  filterTypeHandler: PropTypes.any,
  searchParams: PropTypes.any,
  dataItem: PropTypes.any,
  reportName: PropTypes.any,
  fullFilter: PropTypes.any,
};

export default ColumnFilter;
