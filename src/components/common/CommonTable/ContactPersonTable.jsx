/* eslint-disable prettier/prettier */
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
import * as CONTACT from '../../../store/actions/contactAction';

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

const ContactPersonTable = ({
  // title = {},
  columns = {},
  data = {},
  // actions = [],
  components = {},
  // onRowClick,
  buttonActive,
}) => {
  const classes = useStyles();
  const contact = useSelector((state) => state.contact);
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
    pageSize: contact.searchParams.pageLimit,
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
    dispatch(CONTACT.setPaginationPageContact(page, buttonActive));
  };

  const handleRowPerPage = (event) => {
    dispatch(CONTACT.setPageLimitContact(event.target.value, buttonActive));
  };

  return (
    <div className={classes.contentWrapper}>
      <MaterialTable
        // title={!Object.keys(title).length ? '' : title}
        columns={columns}
        data={data}
        onOrderChange={(orderBy, orderDirection) => {
          console.log(orderBy, orderDirection, 'TESTTTTT');
          dispatch(CONTACT.onSortFilter(orderBy, orderDirection, !contact.order, buttonActive));
        }}
        // onRowClick={(event, rowData) => onRowClick(rowData)}
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
          body: {
            emptyDataSourceMessage: <span>No records found</span>,
          },
        }}
      />

      {data.length > 1 ? buttonActive === 'partner_networks' && (
        <div>
          <div className="pagination-custom">
            <Pagination
              count={
                contact.contactPagination
                  ? Math.ceil(contact.contactPagination.total_count / contact.contactPagination.page_limit)
                  : 1
              }
              onChange={(event, page) => handlePagination(page)}
              page={contact.contactPagination ? contact.contactPagination.page_number : 0}
            />
          </div>
          <div className="pagination-custom">
            <Select
              value={contact.contactPagination ? contact.searchParams.pageLimit : 10}
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
            {contact.contactPagination
              ? contact.contactPagination.page_limit * contact.contactPagination.page_number -
              contact.contactPagination.page_limit +
              (contact.contactData.length ? 1 : 0)
              : 0}{' '}
            -{' '}
            {contact.contactPagination
              ? contact.contactPagination.page_number * contact.contactPagination.page_limit >
                contact.contactPagination.total_count
                ? contact.contactPagination.total_count
                : contact.contactPagination.page_number * contact.contactPagination.page_limit
              : 0}{' '}
            out of {contact.contactPagination ? contact.contactPagination.total_count : 0}
          </div>
        </div>
      ) : null}
    </div>
  );
};

ContactPersonTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  components: PropTypes.any,
};
export default ContactPersonTable;
