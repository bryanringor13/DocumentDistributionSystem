import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  emptyTableHolder: {
    height: '540px',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#abacad',
  },
}));

const NoItemTable = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.emptyTableHolder}>
      <p className={classes.emptyText}>{message}</p>
    </div>
  );
};

NoItemTable.propTypes = {
  message: PropTypes.any,
};

export default NoItemTable;
