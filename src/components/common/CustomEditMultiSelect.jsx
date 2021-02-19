import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSpring, animated } from 'react-spring';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useMeasure from 'react-use-measure';
import ArrowDropdown from '../../assets/img/icons/arrow-dropdown.svg';
import Check from '../../assets/img/icons/check.png';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '14px',
    margin: '0',
    color: 'rgba(43, 45, 51, 0.8)',
    marginBottom: '7px',
    lineHeight: '1.1',
  },
  multiSelectWrapper: {
    fontSize: '16px',
    width: '100%',
    maxWidth: 250,
    position: 'relative',
    '& .PrivateSwitchBase-root-529': {
      padding: '8px 9px',
    },
  },
  mainBtn: {
    justifyContent: 'left',
    padding: ' 6px 16px',
    position: 'relative',
    minHeight: '44px',

    width: '100%',
    border: '1px solid #A5B0BE',
    background: '#fff',
    borderRadius: '4px',
    '&::after': {
      content: `url(${ArrowDropdown})`,
      position: 'absolute',
      right: '18px',
    },
  },
  modal: {
    width: '100%',
    padding: '16px',
    position: 'absolute',
    background: '#FFFFFF',
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.08)',
    borderRadius: '2px',
  },
  multiCheckbox: {
    display: 'flex',
    flexDirection: 'column',
    height: '200px',
    overflowY: 'scroll',
    '& span': {
      fontSize: '16px',
    },
    '& .MuiFormControlLabel-root': {
      marginLeft: -9,
    },
  },
  selectAllWrapper: {
    borderBottom: '1px solid #c4c4c4',
    display: 'flex',
    justifyContent: ' space-between',
    '& .MuiButton-label': {
      color: '#41B67F',
      fontSize: '16px',
    },
    '& .MuiTypography-body1': {
      color: '#41B67F',
      fontSize: '16px',
    },
  },
  '& .MuiTypography-body1': {
    fontSize: '16px',
  },
  icon: {
    borderRadius: 4,
    width: 20,
    height: 20,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#41B67F',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${Check})`,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#41B67F',
    },
  },
  noFound: {
    textAlign: 'center',
    color: '#A5B0BE',
    fontSize: '16px',
    lineHeight: '24px',
  },
}));

const CustomMultiSelect = ({
  label,
  checkList,
  name,
  selectLabel,
  idx,
  loadingBarangay,
  setStateData,
  id,
  itemLength,
  initLabel,
  selectProp = false,
  city,
  itemComparison,
  multiIndex,
  datacy,
  datacyDropdown,
}) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const [checkboxList, setCheckboxList] = useState([]);
  const [selectAll, setSelectAll] = useState(selectProp);
  const [bind] = useMeasure();

  const props = useSpring({
    zIndex: show ? 2 : -1,

    opacity: show ? 1 : 0,
    padding: show ? 16 : 0,
    config: { mass: 5, tension: 1000, friction: 80, duration: 1 },
  });

  const showModal = (e) => {
    setShow(!show);
  };

  useEffect(() => {
    setCheckboxList(checkList);
    // eslint-disable-next-line
  }, [checkList]);
  useEffect(() => {
    const specifiedElement = document.getElementById(id);

    window.addEventListener('click', function (event) {
      const isClickInside = specifiedElement.contains(event.target);
      if (!isClickInside) {
        setShow(false);
      }
    });
    if (!itemLength.length) {
      setItem([]);
    } else {
      setItem(initLabel);
    }
    if (itemLength.length === itemComparison.length) {
      setSelectAll(true);
    }
  }, [checkboxList, id, initLabel, itemComparison.length, itemLength, selectAll]);

  const onChangeCheckBox = (e) => {
    const value = e.target.parentNode.parentNode.parentNode.innerText;

    const copyArr = item;
    const index = copyArr.indexOf(value);

    if (index === -1) {
      copyArr.push(value);
    } else {
      copyArr.splice(index, 1);
    }
    setSelectAll(false);
    setStateData(idx, [...copyArr]);
  };

  const onCheckAll = (e) => {
    const copyArr = [];

    copyArr.push(checkboxList);
    if (e.target.checked) {
      setStateData(idx, ...copyArr);
      setSelectAll(true);
    } else {
      setSelectAll(false);
      setStateData(idx, []);
    }
  };

  const onCheckRemove = () => {
    setStateData(idx, []);
    setSelectAll(false);
  };

  const onSearch = (e) => {
    const val = e.target.value;

    const data = checkList.filter((items) => {
      return items.toLowerCase().includes(val.toLowerCase());
    });

    if (val) {
      setCheckboxList(data);
    } else {
      setCheckboxList(checkList);
    }
  };

  console.log(id,multiIndex,"multi")

  return (
    <>
      <p className={classes.label}>{label}</p>
      <div {...bind} className={classes.multiSelectWrapper} id={id} name={name} data-cy={datacy}>
        <Button className={classes.mainBtn} disabled={Array.isArray(city)} onClick={showModal}>
          {!itemLength.length && !loadingBarangay ? '' :  (loadingBarangay  && multiIndex === id || loadingBarangay  && multiIndex === id && !itemLength.length || loadingBarangay  && !itemLength.length ) ? <p style={{color:'rgb(165, 176, 190)', margin: '0'}}>Loading...</p> : itemLength.length + ' ' + selectLabel }
        </Button>
        <animated.div style={props} className={classes.modal} data-cy={datacyDropdown}>
          <TextField
            style={{ width: '100%' }}
            onChange={onSearch}
            className="search-field"
            placeholder="Search..."
            variant="outlined"
          />
          <div className={classes.selectAllWrapper}>
            <FormControlLabel
              checked={selectAll}
              control={
                <Checkbox
                  checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                  icon={<span className={classes.icon} />}
                  onChange={onCheckAll}
                  color="primary"
                  inputProps={{ 'data-cy': 'select_all_brgy' }}
                />
              }
              label="Select All"
            />

            <Button data-cy="clear_all_brgy" onClick={onCheckRemove}>
              Clear All{' '}
            </Button>
          </div>
          <div className={classes.multiCheckbox} data-cy="assigned_barangay_dropdown_list">
            {checkboxList.map((checkbox, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={item.includes(checkbox)}
                      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                      icon={<span className={classes.icon} />}
                      key={index}
                      onChange={onChangeCheckBox}
                      color="primary"
                      inputProps={{ 'data-cy': 'brgy_checkbox' }}
                    />
                  }
                  label={checkbox}
                />
              );
            })}
            {checkboxList.length < 1 && <p className={classes.noFound}>No result found...</p>}
          </div>
        </animated.div>
      </div>
    </>
  );
};

CustomMultiSelect.propTypes = {
  label: PropTypes.string,
  checkList: PropTypes.array,
  name: PropTypes.any,
  selectLabel: PropTypes.any,
  idx: PropTypes.any,
  setStateData: PropTypes.func,
  id: PropTypes.any,
  itemLength: PropTypes.any,
  initLabel: PropTypes.any,
  selectProp: PropTypes.bool,
  city: PropTypes.any,
  itemComparison: PropTypes.any,
  datacy: PropTypes.string,
  datacyDropdown: PropTypes.string,
};

export default React.memo(CustomMultiSelect);
