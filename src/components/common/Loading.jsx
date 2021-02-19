import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50vh',
  },
  wholePage: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '9999',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, .9)',
  },
  loadingText: {
    marginLeft: '16px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#A5B0BE',
  },
  loadingTextComponent: {
    marginRight: '10%',
  },
}));

const Loading = ({ wholePage }) => {
  const classes = useStyles();

  return (
    <div className={clsx(wholePage ? classes.wholePage : classes.loadingWrapper)}>
      <CircularProgress />
      <span className={clsx(!wholePage && classes.loadingTextComponent, classes.loadingText)}>Loading...</span>
    </div>
  );
};

Loading.propTypes = {
  wholePage: PropTypes.any,
};

export default Loading;
