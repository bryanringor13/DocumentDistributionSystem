/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-final-form';
import * as Yup from 'yup';
import * as ACTION from '../../store/actions/requestActions';
import { makeValidate } from 'mui-rff';
import Button from '@material-ui/core/Button';
import { Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import './styles/ScanForm.scss';
import { onScan, onScanAnother } from '../../store/actions/requestActions';
import { useDispatch, useSelector } from 'react-redux';
import Barcode1 from '../../assets/img/barcode-1.png';
import Barcode2 from '../../assets/img/barcode-2.png';
import Full from '../../assets/img/full.png';
import Default from '../../assets/img/default.png';
import CommonTextTitle from '../common/CommonTextTitle';
import PropTypes from 'prop-types';

import { useTransition, animated } from 'react-spring';
import TextFields from '../common/TextFields';
import PrimaryButton from '../common/Button/PrimaryButton';
import { numberWithComma } from '../../utils/common';
import BarcodeScanner from '../../assets/img/icons/barcode-scanner.svg';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  text: {
    fontSize: '16px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '24px',
  },
  boxHolder: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',

    minWidth: 282,
    minHeight: 282,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '7px',
    marginLeft: '10px',
  },
  subTitle: {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: 1.3,
  },
  subText: {
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: 1.8,
  },
  centerTitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '32px',
    textAlign: 'center',
    marginBottom: '34px',
  },
  titleBox: {
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '32px',
    paddingBottom: '5px',
    borderBottom: '1px solid #e6e5e5',
    marginBottom: '25px',
  },
  boxWrapper: {
    border: '1px solid #e6e5e5',
    borderRadius: '4px',
    padding: '20px 40px 0',
  },
  transitionWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textShadow: '0px 2px 40px #00000020, 0px 2px 5px #00000030',
  },
  scanFormContent: {
    padding: '0 24px',
    [theme.breakpoints.up('xl')]: {
      marginTop: '-61px',
    },
  },
  scanFormWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '21px 0 18px',
    // marginTop: '20px',
    backgroundColor: '#f4f6f9',
  },
  scanFormText: {
    margin: '0 40px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  scanFormInputWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  scanFormInputHelperText: {
    fontSize: '14px',
    lineHeight: '24px',
    color: 'rgba(43, 45, 51, 0.8)',
  },
  scanFormInputHolder: {
    display: 'flex',
    flexDirection: 'column',
  },
  scanFormInput: {
    marginBottom: '0',
  },
  scanFormButton: {
    marginLeft: '8px',
    padding: '7px 16px',
  },
  scanFormButtonLoading: {
    marginLeft: '8px',
    width: '86.46px',
    height: '42px',
  },
  scanFormCloseBtn: {
    position: 'absolute',
    top: '20px',
    right: '24px',
    zIndex: 9999,
  },
  circleProgress: {
    height: '20px !important',
    color: 'green',
    width: '20px !important',
  },
}));

const ScanFormStep1 = ({ handleClose, buttonActive, onOpenReassign, scanStep, setScanStep, setScanReassign }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const [initialValues, setInitialValues] = useState({ trans_no: '' });
  const [anotherValues, setAnotherValues] = useState({ another_trans_no: '' });
  const onClick = useCallback(() => setScanStep((state) => state + 1), [setScanStep]);
  const transitions = useTransition(scanStep, (p) => p, {
    from: { opacity: 0, transform: 'translate3d(0,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,0,0)' },
  });

  const formSchema = Yup.object().shape({
    trans_no: Yup.string().required('Required.'),
  });

  const onSubmit = (values) => {
    dispatch(onScan(values.trans_no, onClick, setInitialValues));
  };

  const onSubmitAnother = (values) => {
    dispatch(onScanAnother(values.another_trans_no, setAnotherValues));
  };

  const handleChangeScan = (event) => {
    const { name, value } = event.target;

    setInitialValues({ ...initialValues, [name]: value });
  };

  const handleChangeScanAnoter = (event) => {
    const { name, value } = event.target;

    setAnotherValues({ ...anotherValues, [name]: value });
  };

  useEffect(() => {
    if (scanStep === 1 && request.scanData.messenger.exceed_capacity) {
      setScanReassign(true);
    } else {
      setScanReassign(false);
    }
  }, [request.scanData.messenger, scanStep, setScanReassign]);

  const pages = [
    ({ style }) => {
      return (
        <animated.div style={{ ...style }} className={classes.transitionWrapper}>
          <div className={classes.scanFormContent}>
            <Form
              initialValues={initialValues}
              onSubmit={onSubmit}
              validate={makeValidate(formSchema)}
              render={({ handleSubmit, hasValidationErrors }) => (
                <form onSubmit={handleSubmit} style={{ width: '100%' }} noValidate>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                      <Typography align="center" classes={{ root: classes.text }}>
                        Scan barcode on form
                      </Typography>
                      <Typography
                        variant="h4"
                        classes={{ root: classes.title }}
                        gutterBottom
                        data-cy="scan_transmittal_form_text"
                      >
                        Scan Transmittal Form
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                      <TextFields
                        style={{ fontWeight: '600' }}
                        id="trans_no"
                        label="Transmittal No."
                        autoFocus={true}
                        name="trans_no"
                        value={initialValues.trans_no}
                        onChange={(event) => handleChangeScan(event)}
                        datacy="transmittal_no"
                      />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                      <Paper />
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justify="center" alignItems="center">
                    {!hasValidationErrors ? (
                      <img src={Barcode2} alt="barcode" data-cy="check_img" />
                    ) : (
                      <img src={Barcode1} alt="barcode" />
                    )}
                  </Grid>
                  <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                      <Button
                        className="width-257"
                        variant="contained"
                        size="large"
                        color="primary"
                        data-cy="accept"
                        disabled={hasValidationErrors}
                        disableElevation
                        onClick={handleSubmit}
                      >
                        Accept
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </div>
        </animated.div>
      );
    },
    ({ style }) => {
      return (
        <animated.div className={classes.transitionWrapper} style={{ ...style }}>
          <div className={classes.scanFormContent}>
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item>
                <Typography align="center" classes={{ root: classes.text }}>
                  Put form in box
                </Typography>
                <Typography variant="h4" classes={{ root: classes.title }} gutterBottom data-cy="messenger_name">
                  {request.scanData.messenger.messenger}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={6} style={{ display: 'flex' }}>
                <Grid container direction="row" justify="center" alignItems="center">
                  <div
                    className={classes.boxHolder}
                    data-cy="container_box"
                    style={{
                      backgroundImage: request.scanData.messenger.exceed_capacity ? `url(${Full})` : `url(${Default})`,
                    }}
                  >
                    <Typography variant="h4" classes={{ root: classes.centerTitle }} gutterBottom>
                      {request.scanData.messenger.messenger}
                    </Typography>
                    <div className={classes.textWrapper}>
                      <Typography
                        variant="p"
                        classes={{ root: classes.subTitle }}
                        gutterBottom
                        data-cy="messenger_location"
                      >
                        {request.scanData.messenger.assigned_locations[0].city}
                        {request.scanData.messenger.assigned_locations.length > 1 &&
                          ` +${request.scanData.messenger.assigned_locations.length - 1} Cities`}
                      </Typography>
                      <Typography
                        variant="p"
                        style={
                          request.scanData.messenger.exceed_capacity ? { color: 'rgb(250, 86, 86)' } : { color: '#000' }
                        }
                        classes={{ root: classes.subText }}
                        gutterBottom
                      >
                        Capacity {numberWithComma(request.scanData.messenger.content_count)}/
                        {numberWithComma(request.scanData.messenger.capacity)}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid item sm={6}>
                <div className={classes.boxWrapper}>
                  <Typography
                    variant="h4"
                    classes={{ root: classes.titleBox }}
                    data-cy="request_details_transmittal_no_text"
                  >
                    Transmittal No.{' '}
                    <span data-cy="transmittal_no_value">{request.scanData.request.transmittal_no}</span>
                  </Typography>
                  <CommonTextTitle
                    title="Addressee"
                    text={request.scanData.request.addressee}
                    datacy={{ text: 'addressee_value' }}
                  />
                  <CommonTextTitle
                    title="Requestor"
                    text={request.scanData.request.requestor}
                    datacy={{ text: 'requestor_value' }}
                  />
                  <CommonTextTitle
                    title="Type"
                    text={request.scanData.request.request_type === 1 ? 'Delivery' : 'Pickup'}
                    datacy={{ text: 'type_value' }}
                  />
                  <CommonTextTitle
                    style={{ marginBottom: '0' }}
                    title="Expected Date of Delivery / Pickup"
                    text={request.scanData.request.expected_date}
                    datacy={{ text: 'date_value' }}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container style={{ justifyContent: 'center', padding: '0 20px' }}></Grid>
            {request.scanData.messenger.exceed_capacity ? (
              <Grid container style={{ justifyContent: 'center', paddingTop: '20px' }}>
                <PrimaryButton
                  datacy="reassign_to_another_box"
                  onClick={() =>
                    onOpenReassign(
                      true,
                      request.scanData.messenger.messenger,
                      request.scanData.messenger.box_no,
                      request.scanData.messenger.id,
                      request.scanData.request.id
                    )
                  }
                >
                  Reassign to Another Box
                </PrimaryButton>
              </Grid>
            ) : null}
          </div>
          <div
            className={classes.scanFormWrapper}
            style={{
              marginTop: request.scanData.messenger.exceed_capacity ? '20px' : '68px',
            }}
          >
            <div>
              <img src={BarcodeScanner} alt="Barcode Scanner" />
            </div>
            <div>
              <span className={classes.scanFormText}>Scan another form</span>
            </div>
            <div>
              <Form
                initialValues={anotherValues}
                onSubmit={onSubmitAnother}
                render={({ handleSubmit }) => {
                  return (
                    <form onSubmit={handleSubmit} style={{ width: '100%' }} noValidate>
                      <div className={classes.scanFormInputWrapper}>
                        <div className={classes.scanFormInputHolder}>
                          <FormLabel htmlFor="transmittal-number" className={classes.scanFormInputHelperText}>
                            Transmittal Number
                          </FormLabel>
                          <FormControl>
                            <div>
                              <TextField
                                id="another_trans_no"
                                name="another_trans_no"
                                value={anotherValues.another_trans_no}
                                onChange={(event) => handleChangeScanAnoter(event)}
                                disabled={request.scanLoading}
                                className={classes.scanFormInput}
                                autoFocus={true}
                                variant="outlined"
                              />
                            </div>
                          </FormControl>
                        </div>
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disableElevation
                            className={request.scanLoading ? classes.scanFormButtonLoading : classes.scanFormButton}
                          >
                            {request.scanLoading ? (
                              <CircularProgress classes={{ root: classes.circleProgress }} />
                            ) : (
                              'Accept'
                            )}
                          </Button>
                        </div>
                      </div>
                    </form>
                  );
                }}
              />
            </div>
          </div>
        </animated.div>
      );
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div className={classes.scanFormCloseBtn}>
        <div>
          <Fab className={classes.iconClose} aria-label="close" onClick={handleClose} data-cy="scan_form_close_btn">
            <ClearSharpIcon fontSize="large" />
          </Fab>
        </div>
      </div>
      <div style={{ minHeight: '520px', position: 'relative', minWidth: '596px' }}>
        {transitions.map(({ item, props, key }) => {
          const Page = pages[item];
          return <Page key={key} style={props} />;
        })}
      </div>
    </div>
  );
};

ScanFormStep1.propTypes = {
  handleClose: PropTypes.any,
  buttonActive: PropTypes.any,
  scanStep: PropTypes.any,
  setScanStep: PropTypes.any,
  setScanReassign: PropTypes.any,
  onOpenReassign: PropTypes.any,
};

export default ScanFormStep1;
