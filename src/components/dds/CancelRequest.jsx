/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import { CircularProgress, Grid } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';

import * as ACTION from '../../store/actions/requestActions';
import * as SCHEDULE from '../../store/actions/scheduleAction';
import './styles/CancelRequest.scss';

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    position: 'relative',
  },
  textAreaCustom: {
    padding: '8px 16px',
    width: '100%',
    maxWidth: '100%',
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '4px',
    border: '1px solid #a5b0be',
  },
}));

const CancelRequest = (props) => {
  const classes = useStyles();
  const [successSend, setSuccessSend] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const request = useSelector((state) => state.request);
  const schedule = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const [cancelReason, setCancelReason] = useState('');
  const [cancelReqID, setCancelReqID] = useState(props.getID);
  const [cancelNotSent, setCancelNotSent] = useState(false);
  const [updateRequestInfo, setupdateRequestInfo] = useState(false);
  const [cancelError, setCancelError] = useState(null);
  const [cancelBtnTrggr, setCancelBtnTrggr] = useState(false);

  const handleClose = useCallback(() => {
    props.setOpen(false, '');
  });

  const buttonClassname = clsx({
    [classes.buttonSuccess]: successSend,
  });

  const cancelReasonHandler = (reason) => {
    setCancelError(null);
    setCancelReason(reason);
  };

  const cancelRequest = () => {
    if (cancelReason) {
      setCancelNotSent(true);
      setSuccessSend(false);
      setSendingRequest(true);
      const reasonForCancel = {
        reason: cancelReason,
      };

      if (Array.isArray(cancelReqID)) {
        dispatch(
          SCHEDULE.cancelChildScheduledRequest(
            schedule.request_info._id,
            cancelReqID,
            cancelReason,
            props.setIncludedRequestCreated
          )
        );
      } else {
        dispatch(ACTION.cancelRequest(cancelReqID, reasonForCancel));
      }
      // setCancelBtnTrggr(true)
    } else {
      setCancelError('Please enter reason');
    }
  };

  useEffect(() => {
    if (!request.reqLoading && cancelNotSent) {
      if (!updateRequestInfo) {
        if (Array.isArray(cancelReqID) === false) {
          dispatch(ACTION.getRequest(cancelReqID));
          dispatch(ACTION.getAuditLogs(cancelReqID));
        }

        setupdateRequestInfo(true);
        handleClose();
      } else {
        setCancelNotSent(false);
        setSuccessSend(true);
        setSendingRequest(false);
        // handleClose()
      }
      // cancelNotSent(true);
    }
  }, [cancelNotSent, cancelReqID, dispatch, handleClose, props, request.reqLoading, updateRequestInfo]);

  return (
    <div>
      <Dialog
        open={props.open}
        className="dialog-width"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogContent style={{ padding: '24px 40px 50px' }}>
          {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
          <Grid container>
            <Grid item xs={12}>
              <Grid container direction="row" alignItems="center" justify="flex-end">
                <Grid item>
                  <IconButton aria-label="close" className="btn-cancel-custom" onClick={handleClose}>
                    <ClearSharpIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: '-5px' }}>
                <Grid item>
                  <Typography style={{ fontWeight: 'bold', fontSize: '36px' }}>Reason for cancelling</Typography>
                </Grid>
              </Grid>
              {cancelError !== null ? (
                <Grid container style={{ marginTop: '15px' }}>
                  <Grid item xs={12}>
                    <Alert severity="error">{cancelError}</Alert>
                  </Grid>
                </Grid>
              ) : null}
              <Grid container style={{ marginTop: '24px' }}>
                <Grid item xs={12}>
                  <Typography style={{ fontSize: '14px', marginBottom: '2px' }}>
                    Indicate Reason for Cancelling
                  </Typography>
                  <FormControl fullWidth variant="outlined">
                    {/* <Select
                      native
                      value="none"
                      onChange={(event) =>
                        cancelReasonHandler(event.target.value)
                      }
                    >
                      <option aria-label="None" value="none">
                        Select Reason
                      </option>
                      <option value="Reason 1">Reason 1</option>
                      <option value="Reason 2">Reason 2</option>
                      <option value="Reason 3">Reason 3</option>
                    </Select> */}
                    <div>
                      <TextareaAutosize
                        className={classes.textAreaCustom}
                        aria-label="Reason for Cancelling"
                        rowsMin={3}
                        value={cancelReason}
                        placeholder="Reason for cancelling"
                        data-cy="reason_field"
                        onChange={(event) => cancelReasonHandler(event.target.value)}
                      />
                    </div>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: 21 }} direction="row" alignItems="center" justify="center">
                <Grid item>
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      className={buttonClassname}
                      disabled={sendingRequest}
                      style={{ width: 257, height: 56 }}
                      color="primary"
                      onClick={(event) => cancelRequest()}
                      disableElevation
                      data-cy="cancel_req_btn"
                    >
                      Confirm Cancellation
                    </Button>
                    {sendingRequest ? <CircularProgress size={24} className={classes.buttonProgress} /> : null}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
CancelRequest.propTypes = {
  getID: PropTypes.any,
  setOpen: PropTypes.any,
  open: PropTypes.bool,
};
export default CancelRequest;
