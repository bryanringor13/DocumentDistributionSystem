// @ts-nocheck
import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Sort from '../../../assets/img/icons/sort.png';
import PropTypes from 'prop-types';
import * as ACTION from '../../../store/actions/requestActions';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
const ViewTable = ({
  title = {},
  columns = {},
  data = {},
  actions = [],
  components = {},
  onRowClick,
  handlePagination,
  handleRowPerPage,
  btn,
  id,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);

  const tableOption = {
    actionsColumnIndex: -1,
    sorting: true,
    toolbar: false,
    draggable: false,
    search: false,
    showTitle: false,
    paging: true,
    pageSize: request.searchParamsView.pageLimit,
    pageSizeOptions: [10, 15, 100],
    showFirstLastPageButtons: false,
    paginationType: 'stepped',
  };

  return (
    <div className={classes.contentWrapper}>
      <MaterialTable
        title={!Object.keys(title).length ? '' : title}
        columns={columns}
        data={data}
        onOrderChange={(orderBy, orderDirection) => {
          dispatch(ACTION.onSortFilterTableView(orderBy, orderDirection, !request.order, btn, id));
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
        }}
      />
      <div>
        <div className="pagination-custom">
          <Pagination
            count={request.tableView ? Math.ceil(request.tableView.total_count / request.tableView.page_limit) : 1}
            onChange={(event, page) => handlePagination(page)}
            page={request.tableView ? request.tableView.page_number : 0}
          />
        </div>
        <div className="pagination-custom">
          <Select
            value={request.tableView ? request.searchParamsView.pageLimit : 0}
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
          {request.tableView
            ? request.tableView.page_limit * request.tableView.page_number -
              request.tableView.page_limit +
              (request.boxContent.requests.length ? 1 : 0)
            : 0}{' '}
          -{' '}
          {request.tableView
            ? request.tableView.page_number * request.tableView.page_limit > request.tableView.total_count
              ? request.tableView.total_count
              : request.tableView.page_number * request.tableView.page_limit
            : 0}{' '}
          out of {request.tableView ? request.tableView.total_count : 0}
        </div>
      </div>
    </div>
  );
};

ViewTable.propTypes = {
  title: PropTypes.any,
  columns: PropTypes.any,
  data: PropTypes.any,
  actions: PropTypes.any,
  components: PropTypes.any,
  onRowClick: PropTypes.func,
  handleRowPerPage: PropTypes.func,
  handlePagination: PropTypes.func,
  btn: PropTypes.any,
  id: PropTypes.any,
};
export default ViewTable;
