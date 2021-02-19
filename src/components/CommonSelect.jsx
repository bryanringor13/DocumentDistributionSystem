import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'mui-rff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  selectWrapper: {
    display: 'block',
    maxWidth: '250px',
  },
}));

const CommonSelect = ({ name, data, label, onChange, value, defaultValue }) => {
  const classes = useStyles();
  return (
    <div className={classes.selectWrapper}>
      <Select
        value={value}
        defaultValue={defaultValue}
        variant="outlined"
        onChange={onChange}
        label={label}
        name={name}
        data={data}
      />
    </div>
  );
};

CommonSelect.propTypes = {
  name: PropTypes.any,
  data: PropTypes.any,
  label: PropTypes.string,
  onChange: PropTypes.any,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
};

export default CommonSelect;
