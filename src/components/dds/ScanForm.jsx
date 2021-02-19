/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';

import { allRequest, getCountRequest } from '../../store/actions/requestActions';
import DialogContent from '@material-ui/core/DialogContent';

import './styles/ScanForm.scss';

import ScanFormStep1 from './ScanFormStep1';

const useStyles = makeStyles(() => ({
  scanFormDialog: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 0',
  },
}));

const ScanForm = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);

  const handleClose = () => {
    props.closeForm(false);
    props.setScanStep(0);
    props.setScanReassign(false);
    dispatch(getCountRequest());

    dispatch(allRequest(props.buttonActive));
  };

  return (
    <Fragment>
      <CssBaseline />
      <Dialog
        fullWidth={fullWidth}
        maxWidth="md"
        classes={{ paper: props.classes }}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        disableBackdropClick
        data-cy="scan_form_modal"
      >
        <DialogContent className={classes.scanFormDialog}>
          <ScanFormStep1
            buttonActive={props.buttonActive}
            handleClose={handleClose}
            scanStep={props.scanStep}
            setScanStep={props.setScanStep}
            setScanReassign={props.setScanReassign}
            onOpenReassign={props.onOpenReassign}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

ScanForm.propTypes = {
  closeForm: PropTypes.any,
  open: PropTypes.bool,
  scanStep: PropTypes.any,
  setScanStep: PropTypes.any,
  setScanReassign: PropTypes.any,
  onOpenReassign: PropTypes.any,
  buttonActive: PropTypes.any,
  classes: PropTypes.any,
};
export default ScanForm;
