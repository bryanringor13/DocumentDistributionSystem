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

import './CommonTable.scss';
import * as AUDIT from '../../../store/actions/auditActions';

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

const AuditDisplayTable = ({
  title = {},
  columns = {},
  data = {},
  actions = [],
  components = {},
  onRowClick,
  buttonActive,
}) => {
  const classes = useStyles();
  const audit = useSelector((state) => state.audit);
  const dispatch = useDispatch();

  // console.log(components, 'componentss');

  const tableOption = {
    actionsColumnIndex: -1,
    sorting: true,
    toolbar: false,
    draggable: false,
    search: false,
    showTitle: false,
    paging: true,
    pageSize: audit.searchParams.pageLimit,
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

  // const componentsTable = {
  //   // Pagination: (props) => <TablePagination {...props} />,
  //   // Pagination: (props) => <div />,
  // }

  const handlePagination = (page) => {
    dispatch(AUDIT.setPaginationPageAudit(page));
  };

  const handleRowPerPage = (event) => {
    dispatch(AUDIT.setPageLimitAudit(event.target.value));
  };

  return (
    <div className={classes.contentWrapper}>
      <MaterialTable
        title={!Object.keys(title).length ? '' : title}
        columns={columns}
        data={data}
        onOrderChange={(orderBy, orderDirection) => {
          console.log(orderBy, orderDirection, 'TESTTTTT');
          dispatch(AUDIT.onSortFilter(orderBy, orderDirection, !audit.order, buttonActive));
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
            count={
                audit.pagination
                ? Math.ceil(audit.pagination.total_count / audit.pagination.page_limit)
                : 1
            }
            onChange={(event, page) => handlePagination(page)}
            page={audit.pagination ? audit.pagination.page_number : 0}
          />
        </div>
        <div className="pagination-custom">
          <Select
            value={audit.pagination ? audit.searchParams.pageLimit : 0}
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
          {audit.pagination
            ? audit.pagination.page_limit * audit.pagination.page_number -
            audit.pagination.page_limit +
            (audit.data.length ? 1 : 0)
            : 0}{' '}
          -{' '}
          {audit.pagination
            ? audit.pagination.page_number * audit.pagination.page_limit >
              audit.pagination.total_count
              ? audit.pagination.total_count
              : audit.pagination.page_number * audit.pagination.page_limit
            : 0}{' '}
          out of {audit.pagination ? audit.pagination.total_count : 0}
        </div>
      </div>
    </div>
  );
};

AuditDisplayTable.propTypes = {
  title: PropTypes.any,
  columns: PropTypes.any,
  data: PropTypes.any,
  actions: PropTypes.any,
  components: PropTypes.any,
  onRowClick: PropTypes.func,
  buttonActive: PropTypes.any,
};
export default AuditDisplayTable;
