import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { sortingReport } from '../../../../store/actions/action_report';
import '../paymentRequest.scss';
const useStyles = makeStyles(() => ({
  filterHolder: {
    position: 'relative',
    marginTop: '15px',
    marginBottom: '19px',
  },
  spacer: {
    height: '73px',
  },
  fullSpacer: {
    height: '73px',
    minWidth: '210px',
  },
  fullSpacerStatus: {
    height: '73px',
    minWidth: '128px',
  },
}));

const ColumnFilter = ({
  columnName,
  columnLabel,
  searchParams,
  fullSpacer,
  fullSpacerStatus,
  // eslint-disable-next-line react/prop-types

  reportName,
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
      <div
        className={fullSpacer ? classes.fullSpacer : fullSpacerStatus ? classes.fullSpacerStatus : classes.spacer}
      ></div>
    </TableCell>
  );
};

ColumnFilter.propTypes = {
  columnLabel: PropTypes.any,
  columnName: PropTypes.any,

  searchParams: PropTypes.any,

  reportName: PropTypes.any,
  fullSpacer: PropTypes.any,
  fullSpacerStatus: PropTypes.any,
};

export default ColumnFilter;
