/* eslint-disable no-extra-boolean-cast */
// @ts-nocheck
import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Sort from '../../../assets/img/icons/sort.png';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as ACTION from '../../../store/actions/requestActions';
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
const CommonTable = ({
  title = {},
  columns = {},
  data = {},
  actions = [],
  components = {},
  onRowClick = {},
  buttonActive,
  disabledAction = true,
  datacyTable,
}) => {
  const classes = useStyles();
  const request = useSelector((state) => state.request);
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
    dispatch(ACTION.setPaginationPage(page));
    dispatch(ACTION.allRequest(buttonActive));
  };

  const handleRowPerPage = (event) => {
    dispatch(ACTION.setPageLimit(event.target.value));
    dispatch(ACTION.allRequest(buttonActive));
  };

  console.log(columns, 'pogi');

  return (
    <div className={classes.contentWrapper} data-cy={datacyTable}>
      <MaterialTable
        title={!Object.keys(title).length ? '' : title}
        columns={columns}
        data={data}
        actions={Object.keys(components).length > 0 && actions}
        onRowClick={disabledAction ? (event, rowData) => onRowClick(rowData) : undefined}
        onOrderChange={(orderBy, orderDirection) => {
          dispatch(ACTION.onSortFilterTable(orderBy, orderDirection, buttonActive, !request.order));
        }}
        // actions={!!Object.keys(components).length && actions}
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
            count={!!request.table ? Math.ceil(request.table.total_count / request.table.page_limit) : 1}
            onChange={(event, page) => handlePagination(page)}
            page={!!request.table ? request.table.page_number : 0}
          />
        </div>
        <div className="pagination-custom" data-cy="pagination">
          <Select
            value={!!request.table ? request.searchParams.pageLimit : 0}
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
          {!!request.table
            ? request.table.page_limit * request.table.page_number -
            request.table.page_limit +
            (request.request.length ? 1 : 0)
            : 0}{' '}
          -{' '}
          {!!request.table
            ? request.table.page_number * request.table.page_limit > request.table.total_count
              ? request.table.total_count
              : request.table.page_number * request.table.page_limit
            : 0}{' '}
          out of {!!request.table ? request.table.total_count : 0}
        </div>
      </div>
    </div>
  );
};
CommonTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.any,
  data: PropTypes.any,
  actions: PropTypes.any,
  components: PropTypes.any,
  onRowClick: PropTypes.any,
  buttonActive: PropTypes.any,
  disabledAction: PropTypes.any,
  datacyTable: PropTypes.string,
};
export default CommonTable;
