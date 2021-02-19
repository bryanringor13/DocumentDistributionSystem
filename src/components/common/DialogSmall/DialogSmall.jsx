/* eslint-disable react/no-unescaped-entities */
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
import PrimaryButton from '../Button/PrimaryButton';
import SecondaryButton from '../Button/SecondaryButton';
import { resetPasswordMessenger } from '../../../store/actions/MessengerActions';
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
  btnMargin: {
    marginLeft: '15px',
  },
  btnWrapper: {
    width: '100%',
    textAlign: 'right',
  },
}));

const DialogSmall = ({ setOpen, open, name, modalId, pass }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const body = {
    contact_number: 0,
    first_name: 'anuar',
    last_name: 'ditucalan',
    username: 'anuar',
    box_no: 1,
    capacity: 1,
    assigned_locations: 2,
    status: 1,
  };

  const onReset = () => {
    dispatch(resetPasswordMessenger(body, modalId, pass));
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      className="dialog-width"
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      disableBackdropClick
    >
      <DialogContent style={{ padding: '24px 40px 50px' }}>
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
                <Typography style={{ fontWeight: 'bold', fontSize: '36px' }}>Reset Password</Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: '24px' }}>
              <Grid item xs={12}>
                <Typography style={{ fontSize: '14px', marginBottom: '2px' }}>
                  You are resetting {name}'s password. Clicking Confirm button will reset the messenger's password
                </Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: '24px' }}>
              <div className={classes.btnWrapper}>
                <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>{' '}
                <PrimaryButton onClick={onReset} className={classes.btnMargin} datacy="confirm_reset_password">
                  Confirm Reset Password
                </PrimaryButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
DialogSmall.propTypes = {
  setOpen: PropTypes.any,
  open: PropTypes.bool,
  name: PropTypes.any,
  reset: PropTypes.any,
  modalId: PropTypes.any,
  pass: PropTypes.any,
};
export default DialogSmall;
