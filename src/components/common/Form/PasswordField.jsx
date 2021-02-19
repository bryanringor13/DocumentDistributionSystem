import React, { useState } from 'react';
import { TextField } from 'mui-rff';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  passwordField: {
    position: 'relative',
    '& input': {
      paddingRight: 40,
    },
  },
  icon: {
    position: 'absolute',
    top: 20,
    right: 14,
    transform: 'translateY(-50%)',
    lineHeight: 1,
    display: 'inline-block',
    cursor: 'pointer',
    height: 22,
    '& svg': {
      fontSize: 22,
      color: '#2F3542',
    },
    '.password-field-label &': {
      top: 41,
    },
  },
}));

const PasswordField = (props) => {
  const classes = useStyles();
  const [isPassword, setIsPassword] = useState(true);

  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  return (
    <div className={classes.passwordField + (props.label ? ' password-field-label' : '')}>
      <TextField type={isPassword ? 'password' : 'text'} {...props} />
      <span onClick={togglePassword} className={classes.icon}>
        {isPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </span>
    </div>
  );
};
PasswordField.propTypes = {
  label: PropTypes.any,
};

export default PasswordField;
