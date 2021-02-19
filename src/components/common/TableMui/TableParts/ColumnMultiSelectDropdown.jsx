import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import CustomMultiSelect from '../../../../common/Forms/CustomMultiSelect';

import {
  setPRSortBy,
  setPROrderBy,
  // setCDCDFNumber,
  // setCDAccName,
  // setCDTotalAmount,
  // setCDPaymentType,
  // setCDStatus,
} from '../../../../../store/actions/prTableActions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

export default function ColumnMultiSelectDropdown(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    columnName,
    columnLabel,
    // eslint-disable-next-line react/prop-types
    defaultValue,
    InputPlaceholder,
    actionToDispatch,
    searchParams,
    includeSearch,
    dropdownList,
    datacy,
  } = props;
  const [numberInputVal, setNumberInputVal] = useState('');
  const [dropdownSelected, setDropdownSelected] = useState('');
  const [setData, setStateData] = useState(defaultValue);
  // numberInputVal
  const initialValues = {
    searchInputField: defaultValue,
  };
  const formSchema = Yup.object().shape({
    searchInputField: Yup.string(),
  });

  // const handleChange = (object, value, reason) => {
  const handleChangeSelect = (e, val, res) => {
    console.log(val);
    setNumberInputVal(val);
  };

  const handleSorting = (sortData, orderData) => {
    // console.log('test');
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

  useEffect(() => {
    // setNumberInputVal('');
    setStateData(defaultValue);
  }, [searchParams.status]);

  useEffect(() => {
    if (setData) {
      dispatch(actionToDispatch(setData));
    }
  }, [setData]);

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
        onClick={() => handleSorting(
          columnName,
          searchParams.orderBy === 'desc' ? 'asc' : 'desc',
        )}
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
      <div
        className="column-search multiple-select"
        data-cy={datacy ? datacy.dropdownName : ''}
      >
        <CustomMultiSelect
          label="test"
          name={`dp-${columnName}`}
          selectLabel="Filter"
          idx={setData}
          id={`dp-${columnName}`}
          setStateData={setStateData}
          checkList={dropdownList}
          includeSearch={includeSearch}
          searchParams={searchParams}
          data-cy={datacy ? datacy.for : ''}
          datacy={datacy ? datacy.for : ''}
        />
      </div>
    </TableCell>
  );
}

// ColumnSearhFrom.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   columnName: PropTypes.any.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   InputType: PropTypes.any.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   InputPlaceholder: PropTypes.string.isRequired,
//   actionToDispatch: PropTypes.func.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   searchParams: PropTypes.object.isRequired,
// };
