import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Fab from '@material-ui/core/Fab';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';

import PrimaryButton from '../common/Button/PrimaryButton';
import SecondaryButton from '../common/Button/SecondaryButton';

import * as SCHEDULE from '../../store/actions/scheduleAction';

const useStyles = makeStyles((theme) => ({
  iconClose: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    width: '48px',
    height: '48px',
    fontSize: '2rem',
    color: '#2f3542',
    background: '#fff',
    boxShadow: 'none',
    border: '1px solid rgba(47, 53, 66, 0.4)',
    '& svg': {
      fontSize: '1.5rem',
    },
    '&:hover': {
      background: '#fff',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
  cancelRequestTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    lineHeight: '48px',
  },
  cancelRequestNote: {
    margin: '8px 0',
    lineHeight: '22px',
  },
  cancelRequestContent: {
    position: 'relative',
    padding: '0 40px 40px',
    maxWidth: '596px',
    '&:first-child': {
      paddingTop: '70px',
    },
  },
  cancelRequestActionWrapper: {
    textAlign: 'right',
  },
  cancelRequestConfirmBtn: {
    padding: '7px 15px',
    marginRight: '20px',
  },
  cancelIndicateReason: {
    fontSize: '14px',
    color: 'rgba(43, 45, 51, 0.8)',
  },
  cancelTextAreaCustom: {
    padding: '8px 16px',
    margin: '2px 0 9px',
    width: '100%',
    maxWidth: '100%',
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '4px',
    border: '1px solid #a5b0be',
  },
}));

const CancelScheduledRequest = ({ open, handleOpenCancel, scheduledRequestId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [validReason, setValidReason] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const handleClose = useCallback(() => {
    handleOpenCancel(false, '');
  });

  const handleCancelReason = (val) => {
    setCancelReason(val);

    if (val.length) {
      if (!val.replace(/\s/g, '').length) {
        setValidReason(false);
      } else {
        setValidReason(true);
      }
    } else {
      setValidReason(false);
    }
  };

  const handleConfirmCancellation = () => {
    dispatch(SCHEDULE.cancelParentScheduledRequest(scheduledRequestId, cancelReason));
    handleOpenCancel(false, '');
  };

  return (
    <Dialog open={open} onClose={handleClose} disableBackdropClick>
      <DialogContent classes={{ root: classes.cancelRequestContent }}>
        <Grid container justify="flex-end">
          <Grid item={12}>
            <Fab className={classes.iconClose} onClick={() => handleOpenCancel(false, '')} aria-label="close">
              <ClearSharpIcon fontSize="large" />
            </Fab>
          </Grid>
        </Grid>
        <div className={classes.cancelRequestTitle}>Cancel All Scheduled Requests</div>
        <div className={classes.cancelRequestNote}>
          You are about to cancel all the transmittal requests under this scheduled request. Click “Confirm
          Cancellation” to proceed.
        </div>
        <div className={classes.cancelIndicateReason}>Indicate Reason for Cancellation</div>
        <FormControl fullWidth variant="outlined">
          <div>
            <TextareaAutosize
              className={classes.cancelTextAreaCustom}
              aria-label="Reason for cancellation"
              rowsMin={3}
              value={cancelReason}
              placeholder="Reason for cancellation"
              onChange={(event) => handleCancelReason(event.target.value)}
            />
          </div>
        </FormControl>
        <div className={classes.cancelRequestActionWrapper}>
          <SecondaryButton
            customClass={classes.cancelRequestConfirmBtn}
            disabled={!validReason}
            onClick={handleConfirmCancellation}
          >
            Confirm Cancellation
          </SecondaryButton>
          <PrimaryButton onClick={() => handleOpenCancel(false)}>Keep Scheduled Request</PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

CancelScheduledRequest.propTypes = {
  open: PropTypes.bool,
  handleOpenCancel: PropTypes.func,
  scheduledRequestId: PropTypes.string,
};

export default CancelScheduledRequest;
