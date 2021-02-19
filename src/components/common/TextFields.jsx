import React from 'react';
import { TextField } from 'mui-rff';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const useStyles = makeStyles(() => ({
  input: {
    maxWidth: '250px',
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
      padding: '0 16px',
      border: '1px solid #A5B0BE',
      borderRadius: '4px',
    },
  },
}));

const TextFields = ({ type = 'text', style = {}, label, name, datacy, disabled = false, autoFocus }) => {
  const classes = useStyles();
  return (
    <div
      className={
        // @ts-ignore
        classes.inputWrapper
      }
    >
      <TextField
        className={classes.input}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ style: style, 'data-cy': datacy }}
        type={type}
        autoFocus={autoFocus}
        disabled={disabled}
        label={label}
        name={name}
      />
    </div>
  );
};

TextFields.propTypes = {
  type: PropTypes.any,
  style: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.any,
  disabled: PropTypes.bool,
  datacy: PropTypes.string,
  autoFocus: PropTypes.any,
};

export default TextFields;
