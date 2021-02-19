import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BrandLogo from '../../../assets/img/intellicare-logo-xs.png';

const Logo = (props) => {
  const { className } = props;

  return (
    <Link to="/" className={`d-inline-block${className ? ` ${className}` : ''}`}>
      <img src={BrandLogo} width={115} alt="Veridata Logo" title="Veridata Logo" data-cy="intellicare_logo" />
    </Link>
  );
};

Logo.defaultProps = {
  className: '',
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
