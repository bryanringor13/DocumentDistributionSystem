import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';

import PrimaryButton from '../common/Button/PrimaryButton';
import SecondaryButton from '../common/Button/SecondaryButton';

import * as CONTACT from '../../store/actions/contactAction';

const useStyles = makeStyles(() => ({
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
  archiveContactContent: {
    position: 'relative',
    padding: '0 40px 40px',
    maxWidth: '596px',
    '&:first-child': {
      paddingTop: '70px',
    },
  },
  archiveContactTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    lineHeight: '48px',
  },
  archiveContactNote: {
    margin: '26px 0 42px',
    lineHeight: '22px',
  },
  archiveContactActionWrapper: {
    textAlign: 'right',
  },
  archiveContactCancelBtn: {
    padding: '7px 15px',
    marginRight: '20px',
  },
}));

const ArchiveContact = ({ open, handleOpenArchiveContact, status, buttonActive }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact);

  const handleClose = useCallback(() => {
    handleOpenArchiveContact(false, '');
  });

  const handleArchiveContact = () => {
    dispatch(CONTACT.archiveContact(contact.contactInfo._id, status, buttonActive, contact.contactInfo.type));
    handleOpenArchiveContact(false, '');
  };

  return (
    <Dialog open={open} onClose={handleClose} disableBackdropClick>
      <DialogContent classes={{ root: classes.archiveContactContent }}>
        <Grid container justify="flex-end">
          <Grid item={12}>
            <Fab className={classes.iconClose} aria-label="close" onClick={() => handleOpenArchiveContact(false, '')}>
              <ClearSharpIcon fontSize="large" />
            </Fab>
          </Grid>
        </Grid>
        <div className={classes.archiveContactTitle}>
          {status === 'archive' ? 'Archive Contact' : 'Activate Contact'}
        </div>
        <div className={classes.archiveContactNote}>
          Are you sure you want to {status === 'archive' ? 'archive' : 'activate'} this contact? Please click “Confirm”
          to proceed.
        </div>
        <div className={classes.archiveContactActionWrapper}>
          <SecondaryButton
            customClass={classes.archiveContactCancelBtn}
            onClick={() => handleOpenArchiveContact(false, '')}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleArchiveContact}>Confirm</PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ArchiveContact.propTypes = {
  open: PropTypes.bool,
  handleOpenArchiveContact: PropTypes.func,
  status: PropTypes.string,
  buttonActive: PropTypes.string,
};

export default ArchiveContact;
