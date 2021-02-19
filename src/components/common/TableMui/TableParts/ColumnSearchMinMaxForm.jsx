import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import * as Yup from 'yup';

import { TextField } from '@material-ui/core';
import { getRoles } from '../../../../../utils/common';
import * as ACTION from '../../../../../store/actions/action_types';
import { apiGetORDetails } from '../../../../../utils/CashierReceipt';
import {
  setCVSortBy,
  setCVOrderBy,
} from '../../../../../store/actions/cvTableActions';

import {
  PAYMENT_TYPE,
  CD_STATUS,
  ROLES,
  CDTABLE_COLUMN,
} from '../../../../utils/Constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Cash', 'Check', 'PDC', 'Lost ID'];

export default function ColumnSearchMinMaxForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cdTable = useSelector((state) => state.cdTable);

  const [personName, setPersonName] = React.useState([]);
  const [numberInputVal, setNumberInputVal] = useState('');

  const {
    columnName,
    columnLabel,
    InputType,
    defaultValue,
    InputPlaceholder,
    dataCyTh,
  } = props;
  const { searchParams } = cdTable;

  const initialValues = {
    searchInputField:
      columnName === 'payment_type'
        ? defaultValue.split('_').join(' ')
        : defaultValue,
    columnName,
  };
  const formSchema = Yup.object().shape({
    searchInputField: Yup.string(),
  });

  const handleSorting = (sortData, orderData) => {
    // console.log(sortData);
    if (sortData !== searchParams.sortBy) {
      dispatch(setCVOrderBy('asc'));
    } else {
      if (orderData === 'desc') {
        dispatch(setCVOrderBy('desc'));
      }
      if (orderData === 'asc') {
        dispatch(setCVOrderBy('asc'));
      }
    }
    dispatch(setCVSortBy(sortData));
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const handleInputNumberChange = (e) => {
    const onlyNums = e.target.value.replace(/[^0-9.]/g, '');
    setNumberInputVal(onlyNums);
  };

  return (
    <TableCell
      className={columnName}
      align="left"
      padding="none"
      sortDirection={
        searchParams.sortBy === columnName ? searchParams.orderBy : false
      }
      data-cy={dataCyTh}
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
        <div className="minmax-input">
          <TextField
            id="standard-basic"
            name="searchInputField"
            placeholder="Min"
            variant="outlined"
            inputProps={{ 'data-cy': 'cd_min_amount_search' }}
            // onChange={handleInputNumberChange}
          />
          <span className="separator" />
          <TextField
            id="standard-basic"
            name="searchInputField"
            placeholder="Max"
            variant="outlined"
            inputProps={{ 'data-cy': 'cd_max_amount_search' }}
            // onChange={handleInputNumberChange}
          />
        </div>
      </div>

      {/* <FormControl className={classes.formControl}>
          <Select
            variant="outlined"
            label="mutiple-checkbox-label"
            labelId="mutiple-checkbox-label"
            id="mutiple-checkbox"
            multiple
            value={personName}
            defaultValue="Cash"
            placeholder="test"
            onChange={handleChange}
            input={<Input variant="outlined" placeholder="test" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
     */}
    </TableCell>
  );
}
