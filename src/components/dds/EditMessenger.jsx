import React from 'react';
import CommonDialog from '../common/CommonDialog';
import EditMessengerComponents from './EditMessengerComponent';
import PropTypes from 'prop-types';

const EditMessenger = ({ classes, close, open }) => {
  return (
    <>
      <CommonDialog close={close} classesPad="print-pad-none" open={open}>
        <EditMessengerComponents close={close} classes={classes} />
      </CommonDialog>
    </>
  );
};

EditMessenger.propTypes = {
  classes: PropTypes.any,
  close: PropTypes.bool,
  open: PropTypes.bool,
};

export default React.memo(EditMessenger);
