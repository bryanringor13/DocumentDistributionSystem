import React from 'react';
import PropTypes from 'prop-types';
import CommonDialog from '../../components/common/CommonDialog';
import ReassignContent from './ReassignContent';

const Reassign = ({ openReassign, close, reassign, buttonActive, scanReassign, closeScan, closeOnReassign }) => {
  return (
    <CommonDialog
      disableBackdropClick={true}
      reassign={true}
      close={scanReassign ? closeScan : close}
      open={openReassign}
      datacy="reassign_to_modal"
    >
      <ReassignContent
        buttonActive={buttonActive}
        reassign={reassign}
        close={scanReassign ? closeScan : close}
        closeOnReassign={closeOnReassign}
      />
    </CommonDialog>
  );
};

Reassign.propTypes = {
  openReassign: PropTypes.any,
  close: PropTypes.any,
  reassign: PropTypes.any,
  buttonActive: PropTypes.any,
  closeScan: PropTypes.any,
  scanReassign: PropTypes.any,
  closeOnReassign: PropTypes.any,
};

export default Reassign;
