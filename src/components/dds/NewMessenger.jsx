import React from 'react';
import CommonDialog from '../common/CommonDialog';
import NewMessengerComponent from './NewMessengerComponent';
import PropTypes from 'prop-types';

const NewMessenger = ({ classes, close, open }) => {
  return (
    <>
      <CommonDialog close={close} open={open}>
        <NewMessengerComponent close={close} classes={classes} />
      </CommonDialog>
    </>
  );
};

NewMessenger.propTypes = {
  classes: PropTypes.any,
  close: PropTypes.bool,
  open: PropTypes.bool,
};

export default NewMessenger;
