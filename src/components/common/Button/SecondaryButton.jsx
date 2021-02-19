import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  btnWrapper: {
    background: '#fff',
    padding: ' 8px 15px',
    border: '1px solid #41B67F',
    borderRadius: '4px',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#41B67F',
    '&.Mui-disabled': {
      color: '#41B67F',
      opacity: '.48',
    },
  },
}));
const SecondaryButton = ({ children, style, customClass, datacy, onClick, disabled }) => {
  const classes = useStyles();
  return (
    <Button
      style={style}
      onClick={onClick}
      className={`${classes.btnWrapper} ${customClass}`}
      data-cy={datacy}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.any,
  onClick: PropTypes.func,
  customClass: PropTypes.any,
  datacy: PropTypes.string,
  disabled: PropTypes.string,
};
export default SecondaryButton;
