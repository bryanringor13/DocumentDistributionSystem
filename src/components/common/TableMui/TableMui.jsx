import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import MUIDataTable from 'mui-datatables';
import TablePartFooter from './TableParts/TablePartFooter';
import './table-mui.scss';

const TableMui = (props) => {
  const { dataState, columns, options, selectedRow, handleBulkApprove, handleBulkDisapprove, reportName, id } = props;
  const { searchParams, data } = dataState;
  console.log(searchParams);
  const report = useSelector((state) => state.report);

  const loadingComponent = (
    <div
      style={{
        position: 'absolute',
        zIndex: 110,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.8)',
      }}
    >
      <CircularProgress size={24} style={{ marginRight: '6px' }} /> Loading
    </div>
  );

  console.log(selectedRow, handleBulkApprove, handleBulkDisapprove);
  return (
    <div className="table-data-provider">
      <div style={{ position: 'relative' }} className={`table-data-body `}>
        {report.reqLoading && loadingComponent}
        <MUIDataTable
          id={id}
          className={`mui-datatables-layout cv-table-layout search-layout`}
          data={data}
          columns={columns}
          options={options}
        />
      </div>

      <TablePartFooter reportName={reportName} />
    </div>
  );
};

TableMui.propTypes = {
  reportName: PropTypes.any,
  handleBulkApprove: PropTypes.any,
  handleBulkDisapprove: PropTypes.any,
  columns: PropTypes.any,
  options: PropTypes.any,
  dataState: PropTypes.any,
  selectedRow: PropTypes.any,
  id: PropTypes.any,
};

export default TableMui;
