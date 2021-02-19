import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';

const BootstrapInput = withStyles((theme) => ({
  root: {
    '& label + &': {
      color: 'rgba(43, 45, 51, 0.8)',
      margin: '0',
      fontSize: '14px',
      lineHeight: '13px',
      marginBottom: '7px',
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #A5B0BE',
    fontSize: 16,
    height: '38px !important',
    padding: '0 26px 0 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: 'rgb(65, 182, 127)',
      //  boxShadow: '0 0 0 0.rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
const CommonSelect = ({ value, id, item, onChange, defaultOption, datacy, customCss, rootClass }) => {
  return (
    <NativeSelect
      style={customCss}
      id={id}
      input={<BootstrapInput />}
      value={value}
      onChange={onChange}
      data-cy={datacy}
      classes={{ root: rootClass }}
    >
      {item ? (
        item.map((res, index) => (
          <option value={res} key={index}>
            {res}
          </option>
        ))
      ) : (
        <option value={defaultOption}>{defaultOption}</option>
      )}
    </NativeSelect>
  );
};

CommonSelect.propTypes = {
  value: PropTypes.any,
  id: PropTypes.any,
  item: PropTypes.any,
  onChange: PropTypes.func,
  defaultOption: PropTypes.any,
  customCss: PropTypes.any,
  datacy: PropTypes.any,
  rootClass: PropTypes.any,
};
export default CommonSelect;
