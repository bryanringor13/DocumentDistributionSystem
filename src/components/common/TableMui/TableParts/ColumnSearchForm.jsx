import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import SearchIcon from '@material-ui/icons/Search';
import { makeValidate, TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { getReport, sortingReport } from '../../../../store/actions/action_report';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function ColumnSearhFrom(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [numberInputVal, setNumberInputVal] = useState('');
  const [inputVal, setInputVal] = useState('');
  const report = useSelector((state) => state.report);

  const {
    columnName,
    columnLabel,
    InputType,
    reportName,
    // eslint-disable-next-line react/prop-types
    defaultValue,
    InputPlaceholder,
    actionToDispatch,
    searchParams,
    datacy,
  } = props;

  const initialValues = {
    searchInputField: InputType === 'Number' ? numberInputVal : defaultValue,
  };
  const formSchema = Yup.object().shape({
    searchInputField: Yup.string(),
  });

  const handleSearch = () => {
    // const searchInput = e.searchInputField === undefined ? '' : e.searchInputField;
    if (InputType === 'Number') {
      dispatch(actionToDispatch(numberInputVal, reportName));
    } else {
      dispatch(actionToDispatch(inputVal, reportName));
    }
    // console.log(e.searchInputField);
  };

  const handleSorting = (sortData, orderData) => {
    dispatch(sortingReport(sortData, reportName));
  };

  const handleInputNumberChange = (event) => {
    const onlyNums = event.target.value.replace(/[^0-9.]/g, '');
    setNumberInputVal(onlyNums);

    if (event.target.value === '') {
      if (
        (columnName === 'transmittalNo' && reportName === 'recTransmitReport') ||
        (columnName === 'transmittalNo' && reportName === 'lostInTransit') ||
        (columnName === 'transmittal_no' && reportName === 'urgentRequest') ||
        (columnName === 'transmittal_no' && reportName === 'cancelledRequestsReport')
      ) {
        report.tableQuery.column[0].value = '';
      } else if (columnName === 'admin') {
        report.tableQuery.column[4].value = '';
      } else if (columnName === 'messenger' && reportName === 'recTransmitReport') {
        report.tableQuery.column[5].value = '';
      } else if (columnName === 'messenger' && reportName === 'messengerMonitoring') {
        report.tableQuery.column[0].value = '';
      } else if (columnName === 'transmittal_no' && reportName === 'partnerRequestsReport') {
        report.tableQuery.column[4].value = '';
      }

      dispatch(getReport(report.tableQuery, reportName));
    }
  };

  const handleInputChange = (event) => {
    setInputVal(event.target.value);

    console.log(columnName, reportName, 'ANUUUUUU');
    if (event.target.value === '') {
      if (columnName === 'requestor' && reportName === 'lostInTransit') {
        report.tableQuery.column[2].value = '';
      } else if (columnName === 'messenger' && reportName === 'lostInTransit') {
        report.tableQuery.column[6].value = '';
      } else if (
        (columnName === 'messenger' && reportName === 'messengerMonitoring') ||
        (columnName === 'transmittalNo' && reportName === 'recTransmitReport')
      ) {
        report.tableQuery.column[0].value = '';
      } else if (columnName === 'requestor' && reportName === 'recTransmitReport') {
        report.tableQuery.column[1].value = '';
      } else if (columnName === 'admin' && reportName === 'recTransmitReport') {
        report.tableQuery.column[6].value = '';
      } else if (columnName === 'messenger' && reportName === 'recTransmitReport') {
        report.tableQuery.column[7].value = '';
      } else if (columnName === 'requestor' && reportName === 'urgentRequest') {
        report.tableQuery.column[3].value = '';
      } else if (columnName === 'requestor' && reportName === 'cancelledRequestsReport') {
        report.tableQuery.column[3].value = '';
      } else if (columnName === 'requestor' && reportName === 'partnerRequestsReport') {
        report.tableQuery.column[2].value = '';
      } else if (columnName === 'request_type' && reportName === 'partnerRequestsReport') {
        report.tableQuery.column[5].value = '';
      } else if (columnName === 'requestor' && reportName === 'scheduledRequestsReport') {
        report.tableQuery.column[1].value = '';
      }

      report.tableQuery.pageNumber = '1';

      dispatch(getReport(report.tableQuery, reportName));
    }
  };

  useEffect(() => {
    // setNumberInputVal('');
    setNumberInputVal(defaultValue);
    setInputVal(defaultValue);
  }, [defaultValue, searchParams.status]);

  return (
    <TableCell
      className={columnName}
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
      <div className="column-search">
        <Form
          onSubmit={handleSearch}
          initialValues={initialValues}
          validate={makeValidate(formSchema)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              {InputType === 'Number' && (
                <TextField
                  name="searchInputField"
                  placeholder={InputPlaceholder}
                  variant="outlined"
                  onChange={handleInputNumberChange}
                  value={numberInputVal}
                  inputProps={{ 'data-cy': datacy ? datacy.number : '' }}
                />
              )}

              {InputType === 'Text' && (
                <TextField
                  name="searchInputField"
                  placeholder={InputPlaceholder}
                  variant="outlined"
                  onChange={handleInputChange}
                  type={InputType}
                  value={inputVal}
                  inputProps={{ 'data-cy': datacy ? datacy.text : '' }}
                />
              )}

              <SearchIcon
                onClick={handleSubmit}
                className="btn-submit-search"
                data-cy={datacy ? datacy.searchIcon : ''}
              />
            </form>
          )}
        />
      </div>
    </TableCell>
  );
}

ColumnSearhFrom.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  columnName: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  columnLabel: PropTypes.any.isRequired,
  reportName: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  InputType: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  InputPlaceholder: PropTypes.string.isRequired,
  actionToDispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  searchParams: PropTypes.object.isRequired,
  datacy: PropTypes.object,
};
