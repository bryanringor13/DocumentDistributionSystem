/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Checked from '../../assets/img/icons/checked.png';
import Box from '../../assets/img/icons/box.png';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import { useDispatch, useSelector } from 'react-redux';
import * as ACTION from '../../store/actions/requestActions';
import * as ERROR from '../../store/actions/errorActions';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import * as REQ_TYPE from '../../utils/Constants';
import { green } from '@material-ui/core/colors';
import Barcode from 'react-barcode';
import './styles/PreviewRequest.scss';
import moment from 'moment';
import Intellicare from '../../assets/img/icons/intellicare.png';
import PrintView from './PrintView';
import { numberWithComma } from '../../utils/common';
import html2pdf from 'html2pdf.js';
moment.locale();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
    '& .MuiFab-root': {
      boxShadow: 'none',
    },
    '& .MuiCardHeader-root': {
      padding: '24px 0 8px',
      margin: '0 32px',
      borderBottom: '1px solid #E0E6ED',
    },
    '& .MuiCardContent-root': {
      padding: '0 16px 16px 16px !important',
    },
  },
  closeIcon: {
    maxWidth: '48px',
    maxHeight: '48px',
    border: '1px solid',
    '& svg': {
      fontSize: '1.5rem',
      color: '#000',
    },
  },
  headerStyle: {
    fontWeight: 'bold',
  },
  subHeaderStyle: {
    fontSize: 14,
    color: '#7F8080',
    marginBottom: 10,
  },
  cardContentPadding: {
    padding: theme.spacing(0, 2),
  },
  contentSubText: {
    fontSize: 16,
    lineHeight: '24px',
    marginBottom: '8px',
  },
  transmittalText: {
    fontSize: 15,
  },
  contentText: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: '600',
    color: '#2F3542',
  },
  contentItemStyle: {
    marginTop: '24px',
  },
  cardHeader: {
    fontWeight: 'bold',
    padding: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: '#2F3542',
    lineHeight: '24px',
    fontWeight: 'bold',
  },
  cardFullWidth: {
    width: '100%',
  },
  headerBG: {
    backgroundColor: '#fff',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  marginTopTextArea: {
    marginTop: theme.spacing(1),
  },
  marginTopView: {
    marginTop: 30,
  },
  textFieldWhite: {
    backgroundColor: 'white',
  },
  barCodeStyle: {
    width: '100%',
    height: 70,
  },
  transNumberStyle: {
    fontWeight: 'bold',
  },
  auditContectMarginTop: {
    marginTop: 40,
  },
  dividerStyle: {
    marginBottom: 10,
  },
  buttonSuccess: {
    backgroundColor: '#41B67F',
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  barWrapper: {
    '& svg': {
      maxWidth: '120px',
      height: '80px',
    },
  },
  borderWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px solid #2F3542',
    padding: '16px',
    borderRadius: '2px',
    width: '100%',
  },
  checkHolder: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    lineHeight: '24px',
    '& img': {
      marginRight: '5px',
    },
  },
  titleText: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '32px',
    paddingBottom: '15px',
    borderBottom: '1px solid #A5B0BE',
  },
  barcordWrapper: {
    '& svg': {
      height: '40px',
    },
  },
  showPrint: {
    display: 'block',
  },
  hidePrint: {
    display: 'none',
  },
  requestSent: {
    marginLeft: 'auto',
    width: '138px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PreviewRequest = (props) => {
  const classes = useStyles();
  const request = useSelector((state) => state.request);
  const user_info = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);
  const address_info = useSelector((state) => state.address);

  const [printNow, setPrintNow] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [successSend, setSuccessSend] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [transmittalNo, setTransmittalNo] = useState('');
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(ERROR.clearErrors());

    props.closePreview(false);
  };

  const handleCloseFrom = () => {
    if (props.buttonActive === 'my_request') {
      dispatch(ACTION.allRequest('my_request'));
    } else {
      dispatch(ACTION.allRequest('requestor_table'));
    }
    dispatch(ACTION.clearNewInfo());
    props.closePreview(false);
    props.closeForm(false);
  };

  const imageHandler = (toggle) => {
    setImageLoad(toggle);
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: successSend,
  });
  const country = 'Philippines';

  const user_info_name = user_info.user ? user_info.user.first_name + ' ' + user_info.user.last_name : 'No User';
  const user_info_department = user_info.user ? user_info.user.hims_department_name : 'No Department';
  const user_info_hims_partner = user_info.user
    ? REQ_TYPE.PARTNER[user_info.user.hims_hmo_partner_id].text
    : 'No HMO Partner';

  // const [isLoading, setIsLoading] = useState(true);

  const [allItems, setAllItems] = useState(() => {
    let allItem = [];
    props.prevContent.item.items.map((res, index) => {
      const setPerItem = {
        type: res.type,
        other: res.other,
        count: res.count,
      };
      allItem = [...allItem, setPerItem];
    });
    return allItem;
  });
  const [boolItems, setBoolItems] = useState(false);

  const onPrintPreviewSend = () => {
    props.closeForm(false);
    if (!sendingRequest) {
      setSuccessSend(false);
      setSendingRequest(true);
    }

    if (printNow) {
      printOrder();
      setSuccessSend(true);
      setSendingRequest(false);
    } else {
      // console.log(allItems)
      const newFormReq = {
        request_type: props.prevContent.request_type,
        is_urgent: props.prevContent.is_urgent,
        reason_urgency: props.prevContent.reason_urgency,
        remarks: props.prevContent.remarks,
        item: {
          items: allItems,
          expected_date: props.prevContent.item.expected_date,
        },
        company: {
          name: props.prevContent.company.name,
          code: props.prevContent.company.code,
          contact_person: props.prevContent.company.contact_person,
          contact_number: props.prevContent.company.contact_number,
          department: props.prevContent.company.department,
        },
        address: {
          floor_no: props.prevContent.address.floor_no,
          unit: props.prevContent.address.unit,
          building_name: props.prevContent.address.building_name,
          street: props.prevContent.address.street,
          barangay: address_info.himsBarangay[props.prevContent.address.barangay].id,
          city: address_info.himsCity[props.prevContent.address.city].id,
          province: address_info.himsProvinces[props.prevContent.address.province].id,
          zip_code: props.prevContent.address.zip_code,
        },
      };

      dispatch(ACTION.addRequest(newFormReq));
    }
  };

  const printOrder = () => {
    // window.print()
    setShowPreview(true);
  };

  useEffect(() => {
    function printContent() {
      // if (!boolItems) {
      // props.prevContent.item.items.map((res, index) => {
      //   let setPerItem = {
      //     type: res.type,
      //     other: res.other,
      //     count: res.count,
      //   }
      //   setAllItems([...allItems, setPerItem])
      // })

      // console.log(allItems)
      //   setBoolItems(true)
      // }
      if (request.new_info && request.new_info.request_type) {
        setPrintNow(true);
        console.log('printing..');
        setTransmittalNo(request.new_info.transmittal_no);
        // if (imageLoad) {
        //   printOrder()
        // }

        setSuccessSend(true);
        setSendingRequest(false);
      }

      if (!request.reqLoading) {
        setSuccessSend(true);
        setSendingRequest(false);
      }
    }

    printContent();
  }, [allItems, boolItems, imageLoad, props.prevContent.item.items, request]);

  useEffect(() => {
    if (showPreview) {
      const data = document.getElementById('printme-preview-request');

      let opt = {};

      opt = {
        margin: [10, 10, 12, 10],

        filename: 'myfile.pdf',
        image: { type: 'jpeg', quality: 1 },

        html2canvas: { dpi: 192, logging: true, scale: 4 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      html2pdf()
        .from(data)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
          pdf.setFontType('normal');
          pdf.setFontSize(10);

          pdf.text(85, 282, 'Received by:');

          pdf.setDrawColor(165, 176, 190);
          pdf.line(200, 285, 110, 285);

          pdf.setFontType('normal');
          pdf.setFontSize(10);

          pdf.text(120, 290, 'Signature Over Printed Name / Date & Time');

          pdf.autoPrint();
          window.open(pdf.output('bloburl'), '_blank');
        });
    }
    setTimeout(() => {
      setShowPreview(false);
    }, 2000);
  }, [showPreview]);

  console.log(props.prevContent.address, 'ADDRESS PREVIEW');

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      onEscapeKeyDown={printNow ? handleCloseFrom : handleClose}
      TransitionComponent={Transition}
    >
      <div className={classes.root} id="no-printme-preview">
        <Grid container>
          <Grid item xs={12}>
            <Grid container alignItems="flex-start" justify="flex-end">
              <Grid item>
                {printNow ? (
                  <IconButton
                    aria-label="close"
                    className={classes.closeIcon}
                    onClick={handleCloseFrom}
                    data-cy="close_btn"
                  >
                    <ClearSharpIcon fontSize="large" />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="close"
                    className={classes.closeIcon}
                    onClick={handleClose}
                    data-cy="close_btn"
                  >
                    <ClearSharpIcon fontSize="large" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
              <Grid item xs={7}>
                {transmittalNo && (
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography className={clsx(classes.transmittalText)}>Transmittal Number:</Typography>
                      <Typography
                        variant="h4"
                        className={clsx(classes.transNumberStyle)}
                        gutterBottom
                        data-cy="transmittal_number"
                      >
                        {transmittalNo}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <div className={classes.requestSent}>
                        <div className="custom-alert-info">
                          <Alert severity="info">Request Sent</Alert>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
            </Grid>
            <Grid container className={classes.marginTopView}>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
              <Grid item xs={7}>
                <form noValidate autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div>
                        <Typography
                          gutterBottom
                          variant="h3"
                          className={classes.headerStyle}
                          data-cy="request_details_text"
                        >
                          Request Details
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container direction="row" alignItems="center" spacing={2} justify="flex-end">
                        <Grid item>
                          <div>
                            {printNow ? (
                              <Button variant="outlined" color="primary" onClick={handleCloseFrom} data-cy="close_btn">
                                Close
                              </Button>
                            ) : (
                              <Button variant="outlined" color="primary" onClick={handleClose} data-cy="cancel_btn">
                                Cancel
                              </Button>
                            )}
                          </div>
                        </Grid>
                        <Grid style={{ paddingRight: '0', paddingLeft: '8px' }} item>
                          <div className={classes.wrapper}>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ minWidth: '85px' }}
                              className={buttonClassname}
                              disabled={sendingRequest}
                              onClick={(event) => onPrintPreviewSend()}
                              data-cy="print_btn"
                            >
                              {transmittalNo ? 'Print' : 'Confirm and Send'}
                            </Button>
                            {sendingRequest && <CircularProgress size={24} className={classes.buttonProgress} />}
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container style={{ marginBottom: 20 }}>
                    <Grid item xs={12}>
                      {error.msg &&
                        (error.msg.length > 0
                          ? error.msg.map((res, index) => (
                              <Alert key={index} severity="error" className={classes.alertStyle}>
                                {res.errMessage}
                              </Alert>
                            ))
                          : null)}
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <div>
                        <Card>
                          <CardHeader
                            title={<Typography className={clsx(classes.cardTitle)}>Request Details</Typography>}
                          />
                          <CardContent className={classes.headerBG}>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Requestor:
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                              >
                                {user_info_name}
                              </Typography>
                            </div>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Requestor Department
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                              >
                                {user_info_department}
                              </Typography>
                            </div>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                HMO Partner
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                              >
                                {user_info_hims_partner}
                              </Typography>
                            </div>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Type of Request:
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                              >
                                {props.prevContent
                                  ? REQ_TYPE.REQUEST_TYPE_TEXT[props.prevContent.request_type] &&
                                    REQ_TYPE.REQUEST_TYPE_TEXT[props.prevContent.request_type].text
                                  : null}
                              </Typography>
                            </div>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Urgent Request?
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                                data-cy="urgency_value"
                              >
                                {props.prevContent
                                  ? REQ_TYPE.IS_URGENT[props.prevContent.is_urgent] &&
                                    REQ_TYPE.IS_URGENT[props.prevContent.is_urgent].text
                                  : null}
                              </Typography>
                            </div>
                            {props.prevContent ? (
                              <div className={classes.contentItemStyle}>
                                <Typography
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  color="textSecondary"
                                >
                                  Reason for Urgency:
                                </Typography>
                                <Typography
                                  className={clsx(classes.contentText, classes.cardContentPadding)}
                                  gutterBottom
                                >
                                  {props.prevContent.reason_urgency
                                    ? props.prevContent.reason_urgency.length > 140
                                      ? props.prevContent.reason_urgency.substring(0, 143 - 3) + '...'
                                      : props.prevContent.reason_urgency
                                    : 'N/A'}
                                </Typography>
                              </div>
                            ) : null}
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Remarks:
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                                data-cy="remarks_value"
                              >
                                {props.prevContent.remarks
                                  ? props.prevContent.remarks.length > 140
                                    ? props.prevContent.remarks.substring(0, 143 - 3) + '...'
                                    : props.prevContent.remarks
                                  : 'N/A'}
                              </Typography>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <Card>
                          <CardHeader
                            title={<Typography className={clsx(classes.cardTitle)}>Item Details</Typography>}
                          />
                          <CardContent className={classes.headerBG}>
                            {props.prevContent
                              ? props.prevContent.item.items.map((resItems, index) => (
                                  <div className={index === 0 ? null : classes.contentItemStyle} key={index}>
                                    {index > 0 ? (
                                      <Divider
                                        variant="middle"
                                        className={classes.dividerStyle}
                                        style={{
                                          height: '0px',
                                          border: '1px dashed #A5B0BE',
                                        }}
                                      />
                                    ) : null}
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        Item(s) for Delivery / Pickup:
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                        data-cy="items_value"
                                      >
                                        {REQ_TYPE.REQUEST_ITEM_TYPE[resItems.type] &&
                                          REQ_TYPE.REQUEST_ITEM_TYPE[resItems.type].text}
                                      </Typography>
                                    </div>
                                    {resItems.type === 0 ? (
                                      <div className={classes.contentItemStyle}>
                                        <Typography
                                          className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                          color="textSecondary"
                                        >
                                          Other Item:
                                        </Typography>
                                        <Typography
                                          className={clsx(classes.contentText, classes.cardContentPadding)}
                                          gutterBottom
                                          data-cy="other_item_value"
                                        >
                                          {resItems.other}
                                        </Typography>
                                      </div>
                                    ) : null}
                                    <div className={classes.contentItemStyle}>
                                      <Typography
                                        className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                        color="textSecondary"
                                      >
                                        No of Item(s):
                                      </Typography>
                                      <Typography
                                        className={clsx(classes.contentText, classes.cardContentPadding)}
                                        gutterBottom
                                      >
                                        {numberWithComma(resItems.count)}
                                      </Typography>
                                    </div>
                                  </div>
                                ))
                              : null}
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Expected Delivery / Pickup Date:
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                              >
                                {props.prevContent
                                  ? props.prevContent.item
                                    ? props.prevContent.item.expected_date
                                    : null
                                  : null}
                              </Typography>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className={classes.contentItemStyle}>
                        <Card>
                          <CardHeader
                            title={<Typography className={clsx(classes.cardTitle)}>Company Details</Typography>}
                          />
                          <CardContent className={classes.headerBG}>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Name
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                              >
                                {props.prevContent.company ? props.prevContent.company.name : null}
                              </Typography>
                            </div>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Code
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                                data-cy="company_code_value"
                              >
                                {props.prevContent.company
                                  ? props.prevContent.company.code
                                    ? props.prevContent.company.code
                                    : 'N/A'
                                  : 'N/A'}
                              </Typography>
                            </div>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Contact Person
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                              >
                                {props.prevContent.company ? props.prevContent.company.contact_person : null}
                              </Typography>
                            </div>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Contact Number
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                              >
                                {props.prevContent.company ? props.prevContent.company.contact_number : null}
                              </Typography>
                            </div>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Department
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                                data-cy="department_value"
                              >
                                {props.prevContent.company
                                  ? props.prevContent.company.department
                                    ? props.prevContent.company.department
                                    : 'N/A'
                                  : 'N/A'}
                              </Typography>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className={classes.contentItemStyle}>
                        <Card>
                          <CardHeader title={<Typography className={clsx(classes.cardTitle)}>Address</Typography>} />
                          <CardContent className={classes.headerBG}>
                            <Grid container>
                              <Grid item xs={12}>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    State / Province
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {!!address_info.himsProvinces && !!props.prevContent.address
                                      ? address_info.himsProvinces[props.prevContent.address.province].label
                                      : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    City / Municipality
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {!!address_info.himsCity && !!props.prevContent.address
                                      ? address_info.himsCity[props.prevContent.address.city].label
                                      : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Barangay
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {!!address_info.himsBarangay && !!props.prevContent.address
                                      ? address_info.himsBarangay[props.prevContent.address.barangay].label
                                      : null}
                                  </Typography>
                                </div>

                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Unit
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                    data-cy="unit_value"
                                  >
                                    {props.prevContent.address
                                      ? props.prevContent.address.unit
                                        ? props.prevContent.address.unit
                                        : 'N/A'
                                      : 'N/A'}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Floor No.
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {props.prevContent ? props.prevContent.address.floor_no : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Building Name
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {props.prevContent ? props.prevContent.address.building_name : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Street
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {props.prevContent ? props.prevContent.address.street : null}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Country
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                  >
                                    {country}
                                  </Typography>
                                </div>
                                <div className={classes.contentItemStyle}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Zip Code
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.contentText, classes.cardContentPadding)}
                                    gutterBottom
                                    data-cy="zip_code_value"
                                  >
                                    {props.prevContent
                                      ? props.prevContent.address.zip_code === 0
                                        ? 'N/A'
                                        : props.prevContent.address.zip_code
                                      : 'N/A'}
                                  </Typography>
                                </div>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </div>
                      <div className={classes.contentItemStyle}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid container direction="row" alignItems="center" spacing={2} justify="flex-end">
                              <Grid item>
                                <div>
                                  {printNow ? (
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      onClick={handleCloseFrom}
                                      data-cy="close_btn"
                                    >
                                      Close
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      onClick={handleClose}
                                      data-cy="cancel_btn"
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </div>
                              </Grid>
                              <Grid item>
                                <div className={classes.wrapper}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ minWidth: '85px' }}
                                    className={buttonClassname}
                                    disabled={sendingRequest}
                                    onClick={(event) => onPrintPreviewSend()}
                                    data-cy="print_btn"
                                  >
                                    {transmittalNo ? 'Print' : 'Confirm and Send'}
                                  </Button>
                                  {sendingRequest && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {request.new_info ? (
        <div id="printme-preview-request" className={showPreview ? classes.showPrint : classes.hidePrint}>
          <PrintView request_info={request.new_info} status={0} imageLoad={imageHandler} />
        </div>
      ) : null}
    </Dialog>
  );
};

PreviewRequest.propTypes = {
  closePreview: PropTypes.any,
  prevContent: PropTypes.any,
  closeForm: PropTypes.bool,
  open: PropTypes.bool,
  buttonActive: PropTypes.any,
};

export default PreviewRequest;
