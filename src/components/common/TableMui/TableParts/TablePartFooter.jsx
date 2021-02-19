import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@material-ui/lab/Pagination';
// import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
// import CircularProgress from '@material-ui/core/CircularProgress'

import PropTypes from 'prop-types';

import { setPageLimit, setPageNumber } from '../../../../store/actions/action_report';
const TablePartFooter = (props) => {
  const report = useSelector((state) => state.report);
  const dispatch = useDispatch();

  const handlePagination = (event, page) => {
    console.log(page, 'PAGE NUMBER');
    dispatch(setPageNumber(page.toString(), props.reportName));
  };

  const handleRowPerPage = (event) => {
    dispatch(setPageLimit(event.target.value.toString(), props.reportName));
  };

  return (
    <>
      <div className="table-footer-items">
        {report.table && report.table.length && (
          <>
            <div className="pagination-items">
              <Pagination
                count={report.pagination && Math.ceil(report.pagination.totalData / report.pagination.pageDataLimit)}
                onChange={handlePagination}
                page={report.pagination && report.pagination.pageNumber}
              />
              <Select
                value={report.tableQuery && report.tableQuery.queryLimit}
                // value={searchParams.limit}
                inputProps={{ 'aria-label': 'Without label' }}
                variant="outlined"
                onChange={handleRowPerPage}
                data-cy="pagination"
              >
                <MenuItem value={10}>Show 10</MenuItem>
                <MenuItem value={15}>Show 15</MenuItem>
                <MenuItem value={100}>Show 100</MenuItem>
              </Select>
            </div>
            <div className="table-summary">
              {report.pagination
                ? report.pagination.pageDataLimit * report.pagination.pageNumber -
                  report.pagination.pageDataLimit +
                  (report.table.length ? 1 : 0)
                : 0}{' '}
              -{' '}
              {report.pagination
                ? report.pagination.pageNumber * report.pagination.pageDataLimit > report.pagination.totalData
                  ? report.pagination.totalData
                  : report.pagination.pageNumber * report.pagination.pageDataLimit
                : 0}{' '}
              out of {report.pagination ? report.pagination.totalData : 0}
              {' Records'}
            </div>
          </>
        )}
      </div>
    </>
  );
};

TablePartFooter.propTypes = {
  dataState: PropTypes.any,
  reportName: PropTypes.any,
};

export default TablePartFooter;
