import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const useStyles = makeStyles(() => ({
  contentWrapper: {
    marginBottom: '24px',
  },
  title: {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: 8,
  },
  text: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    marginTop: 0,
  },
}));

const CommonTextTitle = ({ title, text, style = {}, datacy }) => {
  const classes = useStyles();
  return (
    <div className={classes.contentWrapper} style={style}>
      <p className={classes.title}>{title}</p>
      <p className={classes.text} data-cy={datacy.text}>
        {text}
      </p>
    </div>
  );
};

CommonTextTitle.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.any,
  datacy: PropTypes.object,
};

export default CommonTextTitle;
