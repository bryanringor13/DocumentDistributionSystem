// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import MaterialTable from 'material-table';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@material-ui/lab/Pagination';

import Sort from '../../../assets/img/icons/sort.png';

import * as SCHEDULE from '../../../store/actions/scheduleAction';

import './CommonTable.scss';

const useStyles = makeStyles(() => ({
  contentWrapper: {
    '& .MuiTableRow-root': {
      height: '0 !important',
    },
    '& .MuiTableCell-paddingCheckbox': {
      display: 'table-cell',
      padding: '20px 20px 20px 10px',
      '& span': {
        '&::after': {
          display: 'none',
        },
      },
    },
    '& .MuiPaper-elevation2': {
      boxShadow: 'none',
    },
    '& .MuiTableFooter-root': {
      '& .MuiTableCell-root': {
        borderBottom: 'none !important',
      },
    },
    '& .MuiTableCell-root': {
      borderLeft: 'none',
      borderRight: 'none',
      padding: '16px !important',
    },
    '& .MuiTableSortLabel-root': {
      position: 'relative',
      '&::before': {
        display: 'none',
      },
      '& .MuiTableSortLabel-iconDirectionAsc': {
        display: 'none',
      },
      '& .MuiTableSortLabel-iconDirectionDesc': {
        display: 'none',
      },
      '&::after': {
        width: 'auto',
        top: '-6%',
        content: `url(${Sort}) !important`,
        backgroundImage: 'none',
        position: 'absolute',
        right: '0',
      },
    },
  },
}));

const RequestScheduleTable = ({ title = {}, columns = {}, data = {}, actions = [], components = {}, onRowClick,buttonActive }) => {
  const classes = useStyles();
  const request = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

  const tableOption = {
    actionsColumnIndex: -1,
    sorting: true,
    toolbar: false,
    draggable: false,
    search: false,
    showTitle: false,
    paging: true,
    pageSize: request.searchParams.pageLimit,
    pageSizeOptions: [10, 15, 100],
    showFirstLastPageButtons: false,
    paginationType: 'stepped',
    rowStyle: (rowData) => {
      if (rowData.capacity) {
        const data = rowData.capacity.split('/');

        if (parseInt(data[0].replace(' ', '')) >= parseInt(data[1])) {
          return { backgroundColor: '#FFEEEE' };
        }
      }
    },
  };

  const handlePagination = (page) => {
    dispatch(SCHEDULE.setPaginationPageSchedule(page,buttonActive));
  };

  const handleRowPerPage = (event) => {
    dispatch(SCHEDULE.setPageLimitSchedule(event.target.value,buttonActive));
  };

  return (
    <div className={classes.contentWrapper}>
      <MaterialTable
        title={!Object.keys(title).length ? '' : title}
        columns={columns}
        data={data}
        onOrderChange={(orderBy, orderDirection) => {
          dispatch(SCHEDULE.onSortFilter(orderBy, orderDirection, !request.order,buttonActive));
        }}
        onRowClick={(event, rowData) => onRowClick(rowData)}
        actions={!!Object.keys(components).length && actions}
        components={components}
        onChangePage={(page) => {
          // eslint-disable-next-line no-undef
          console.log(page + 1);
        }}
        onChangeRowsPerPage={(pageSize) => {
          // eslint-disable-next-line no-undef
          console.log(pageSize);
        }}
        options={tableOption}
        localization={{
          header: {
            actions: 'Action',
          },
          pagination: {
            labelRowsSelect: 'Show',
            labelDisplayedRows: 'string here',
            labelRowsPerPage: 'another string here',
          },
          body: {
            emptyDataSourceMessage: <span>No records found</span>,
          },
        }}
      />
      <div>
        <div className="pagination-custom">
          <Pagination
            count={request.table ? Math.ceil(request.table.total_count / request.table.page_limit) : 1}
            onChange={(event, page) => handlePagination(page)}
            page={request.table ? request.table.page_number : 0}
          />
        </div>
        <div className="pagination-custom">
          <Select
            value={request.table ? request.searchParams.pageLimit : 0}
            inputProps={{ 'aria-label': 'Without label' }}
            variant="outlined"
            onChange={(event) => handleRowPerPage(event)}
            className="select-option-custom"
          >
            <MenuItem value={10}>Show 10</MenuItem>
            <MenuItem value={15}>Show 15</MenuItem>
            <MenuItem value={100}>Show 100</MenuItem>
          </Select>
        </div>
        <div style={{ marginTop: '24px', marginLeft: '7px', fontSize: '16px' }}>
          {request.table
            ? request.table.page_limit * request.table.page_number -
              request.table.page_limit +
              (request.request.length ? 1 : 0)
            : 0}{' '}
          -{' '}
          {request.table
            ? request.table.page_number * request.table.page_limit > request.table.total_count
              ? request.table.total_count
              : request.table.page_number * request.table.page_limit
            : 0}{' '}
          out of {request.table ? request.table.total_count : 0}
        </div>
      </div>
    </div>
  );
};

RequestScheduleTable.propTypes = {
  title: PropTypes.any,
  columns: PropTypes.any,
  data: PropTypes.any,
  actions: PropTypes.any,
  components: PropTypes.any,
  onRowClick: PropTypes.func,
};

export default RequestScheduleTable;
