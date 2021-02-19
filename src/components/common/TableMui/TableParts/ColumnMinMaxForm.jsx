import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import SearchIcon from '@material-ui/icons/Search';
// import { TextField } from '@material-ui/core';
import { makeValidate, TextField } from 'mui-rff';
import { Form } from 'react-final-form';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import {
  setPRSortBy,
  setPROrderBy,
  // setCDCDFNumber,
  // setCDAccName,
  // setCDTotalAmount,
  // setCDPaymentType,
  // setCDStatus,
} from '../../../../../store/actions/prTableActions';

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

export default function ColumnMinMaxForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [numberInputValMin, setNumberInputValMin] = useState('');
  const [numberInputValMax, setNumberInputValMax] = useState('');

  const {
    columnName,
    columnLabel,
    // eslint-disable-next-line react/prop-types
    defaultMinValue,
    defaultMaxValue,
    searchParams,
    actionToDispatchMin,
    actionToDispatchMax,
    datacy,
  } = props;

  const initialValues = {
    min: defaultMinValue,
    max: defaultMaxValue,
  };
  const formSchema = Yup.object().shape({
    defaultMinValue: Yup.string(),
    defaultMaxValue: Yup.string(),
  });

  const handleSearch = (e) => {
    // const searchInput =
    //   e.searchInputField === undefined ? '' : e.searchInputField;
    dispatch(actionToDispatchMin(numberInputValMin.split(',').join('')));
    dispatch(actionToDispatchMax(numberInputValMax.split(',').join('')));
  };

  const handleSorting = (sortData, orderData) => {
    console.log('test');
    if (sortData !== searchParams.sortBy) {
      dispatch(setPROrderBy('asc'));
    } else {
      if (orderData === 'desc') {
        dispatch(setPROrderBy('desc'));
      }
      if (orderData === 'asc') {
        dispatch(setPROrderBy('asc'));
      }
    }
    dispatch(setPRSortBy(sortData));
  };

  const handleInputNumberChangeMin = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9.,]/g, '');
    setNumberInputValMin(onlyNums);
  };
  const handleInputNumberChangeMax = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9.,]/g, '');
    setNumberInputValMax(onlyNums);
  };

  useEffect(() => {
    setNumberInputValMin(defaultMinValue);
    setNumberInputValMax(defaultMaxValue);
  }, [searchParams.status]);

  return (
    <TableCell
      className={columnName}
      align="left"
      padding="none"
      sortDirection={
        searchParams.sortBy === columnName ? searchParams.orderBy : false
      }
    >
      <TableSortLabel
        className="column-sorting"
        active={searchParams.sortBy === columnName}
        direction={
          searchParams.sortBy === columnName ? searchParams.orderBy : 'desc'
        }
        onClick={() =>
          handleSorting(
            columnName,
            searchParams.orderBy === 'desc' ? 'asc' : 'desc'
          )
        }
      >
        <span className="table-label">{columnLabel}</span>
        <span className="table-sorting-icon" />
        {searchParams.sortBy === columnName ? (
          <span className={classes.visuallyHidden}>
            {searchParams.orderBy === 'desc'
              ? 'sorted descending'
              : 'sorted ascending'}
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
              <div className="minmax-input">
                <TextField
                  id="standard-basic-1"
                  name="min"
                  placeholder="Min"
                  variant="outlined"
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      // Do code here
                      handleSubmit();
                      ev.preventDefault();
                    }
                  }}
                  onChange={handleInputNumberChangeMin}
                  value={numberInputValMin}
                  inputProps={{ 'data-cy': datacy ? datacy.min : '' }}
                />
                <span className="separator" />
                <TextField
                  id="standard-basic-2"
                  name="max"
                  placeholder="Max"
                  variant="outlined"
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      // Do code here
                      handleSubmit();
                      ev.preventDefault();
                    }
                  }}
                  onChange={handleInputNumberChangeMax}
                  value={numberInputValMax}
                  inputProps={{ 'data-cy': datacy ? datacy.max : '' }}
                />
              </div>
            </form>
          )}
        />
      </div>
    </TableCell>
  );
}

ColumnMinMaxForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  columnName: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  columnLabel: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  defaultMaxValue: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  defaultMinValue: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  actionToDispatchMin: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  actionToDispatchMax: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  searchParams: PropTypes.object.isRequired,
  datacy: PropTypes.object,
};
