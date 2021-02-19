import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
const PrimaryButton = ({ children, className, datacy, onClick, disabled = false }) => {
  return (
    <Button
      disabled={disabled}
      className={className}
      onClick={onClick}
      style={{
        opacity: disabled ? ' 0.48' : '1',
        background: '#41B67F',
        padding: ' 8px 15px',
        borderRadius: '4px',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#fff',
      }}
      data-cy={datacy}
    >
      {children}
    </Button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  datacy: PropTypes.string,
};
export default PrimaryButton;
