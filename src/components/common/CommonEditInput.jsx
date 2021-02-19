import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import dropUp from '../../assets/img/icons/arrow_drop_up.svg';
import dropDown from '../../assets/img/icons/arrow_drop_down.svg';

const useStyles = makeStyles(() => ({
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    maxWidth: '250px',
    width: '100%',
    marginBottom: 0,
    '& label': {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '24px',
    },
    '& .MuiInput-underline::before': {
      border: 'none',
    },
    '& .MuiInput-underline::after': {
      border: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      border: 'none',
    },
    '& label + .MuiInput-formControl': {
      marginTop: '22px',
    },
    '& input': {
      background: '#fff',
      width: '100%',
      height: '40px',
      padding: ' 0 35px 0 16px',
      border: '1px solid #A5B0BE',
      borderRadius: '4px',
    },
  },
  btnHolder: {
    width: '35px',
    bottom: 0,
    position: 'absolute',
    right: 12,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '42px',
    borderLeft: ' 1px solid #A5B0BE',
  },
  btnUp: {
    position: 'relative',
    flexBasis: '50%',
    padding: 0,
    minWidth: '24px',
    borderRadius: '1px',
    borderBottom: ' 1px solid #A5B0BE',
  },
  btnDown: {
    position: 'relative',
    flexBasis: '50%',
    padding: 0,
    minWidth: '24px',
  },
}));
const CommonEditInput = ({ name, label, value, setItem, datacy }) => {
  const classes = useStyles();

  const onClickAdd = (e) => {
    if (!value) {
      setItem(1);
    } else {
      setItem(parseInt(value) + 1);
    }
  };

  const onClickMinus = (e) => {
    if (!value || value < 0) {
      setItem(0);
    } else {
      setItem(parseInt(value) - 1);
    }
  };

  const onChangeInput = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setItem(e.target.value);
    } else if (e.target.value < 0) {
      setItem(0);
    }
  };

  return (
    <div className={classes.inputWrapper}>
      <div className={classes.btnHolder}>
        <Button className={classes.btnUp} onClick={onClickAdd}>
          <img src={dropUp} alt="up" />
        </Button>
        <Button className={classes.btnDown} onClick={onClickMinus}>
          {' '}
          <img src={dropDown} alt="down" />
        </Button>
      </div>
      <TextField
        className={classes.input}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ min: '0', max: '10', step: '1', 'data-cy': datacy }}
        onChange={onChangeInput}
        value={value}
        type="text"
        label={label}
        name={name}
      />
    </div>
  );
};

CommonEditInput.propTypes = {
  name: PropTypes.any,
  label: PropTypes.string,
  value: PropTypes.any,
  setItem: PropTypes.func,
  datacy: PropTypes.string,
};

export default CommonEditInput;
