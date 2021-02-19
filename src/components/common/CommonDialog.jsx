// @ts-nocheck
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import Close from '../../assets/img/close_reassign.png';
const useStyles = makeStyles((theme) => ({
  iconClose: {
    color: '#2F3542',
    border: '1px solid rgba(47, 53, 66, 0.4)',
    background: '#fff',
    fontSize: '2rem',
    height: '48px',
    width: '48px',
    boxShadow: 'none',
    '& svg': {
      fontSize: '1.5rem',
    },
    '&:hover': {
      background: '#fff',
    },
  },
  // hidden: {
  //   overflowX: 'hidden ',
  // },
  reassign: {
    overflowX: 'hidden ',
    position: 'absolute',
    maxWidth: 321,
    right: 0,
  },
  reassignHeader: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    padding: '16px 0 16px 24px',
    borderBottom: '1px solid #d8d8d8',
    justifyContent: 'space-between',
    '& h3': {
      margin: 0,
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  dialogPad: {
    paddingRight: '40px',
    paddingBottom: '40px',
    paddingTop: '40px',
  },
}));

const CommonDialog = ({
  classesPad,
  open,
  close,
  children,
  disableBackdropClick = false,
  reassign = false,
  datacy,
}) => {
  const classes = useStyles();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClose = () => {
    close(false);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Dialog
        fullScreen
        open={open}
        disableBackdropClick={disableBackdropClick}
        classes={{ paper: reassign ? classes.reassign : classes.hidden }}
        onClose={handleClose}
        TransitionComponent={Transition}
        data-cy={datacy}
      >
        <Grid container>
          <Grid item xs={12}>
            {!reassign ? (
              <Grid
                container
                alignItems="flex-start"
                justify="flex-end"
                className={clsx(classes.dialogPad, classesPad && classesPad)}
              >
                <Grid item>
                  <Fab className={classes.iconClose} aria-label="close" onClick={handleClose}>
                    <ClearSharpIcon fontSize="large" />
                  </Fab>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <div className={classes.reassignHeader}>
                  <h3>Reassign</h3>
                  <Button>
                    <img src={Close} onClick={handleClose} alt="item" />
                  </Button>
                </div>
              </Grid>
            )}
          </Grid>
        </Grid>
        {children}
      </Dialog>
    </div>
  );
};

CommonDialog.propTypes = {
  open: PropTypes.any,
  close: PropTypes.any,
  children: PropTypes.any,
  reassign: PropTypes.any,
  disableBackdropClick: PropTypes.any,
  classesPad: PropTypes.any,
  datacy: PropTypes.string,
};

export default CommonDialog;
