import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    fontSize: '36px',
    lineHeight: '48px',
  },
}));

const Title = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.title} component="h1">
      {children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Title;
