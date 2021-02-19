import React from 'react';
import { Dialog } from '@material-ui/core';
import NewSchedule from './NewSchedule';
import Slide from '@material-ui/core/Slide';
const NewScheduleComponent = ({ open, closeForm, openViewRequest,getData, getAddress}) => {

  const handleClose = () => {
    closeForm(false);
  };
  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <NewSchedule getData={getData} getAddress={getAddress} handleClose={handleClose} handleViewScheduledRequest={openViewRequest} />
      </Dialog>
    </>
  );
};
export default NewScheduleComponent;
