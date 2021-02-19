/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
// @ts-nocheck
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checked from '../../assets/img/icons/checked.png';
import Box from '../../assets/img/icons/box.png';

import { useDispatch, useSelector } from 'react-redux';
import * as ERROR from '../../store/actions/errorActions';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import * as REQ_TYPE from '../../utils/Constants';
import { green } from '@material-ui/core/colors';
import Barcode from 'react-barcode';
import { API_URL } from '../../utils/Constants';

import moment from 'moment';
import Intellicare from '../../assets/img/icons/intellicare.png';

moment.locale();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // @ts-ignore
    margin: theme.spacing(3),
    '& .MuiCardHeader-root': {
      padding: '24px 0 8px',
      margin: '0 32px',
      borderBottom: '1px solid #E0E6ED',
    },
    '& .MuiCardContent-root': {
      padding: '0 16px 16px 16px !important',
    },
  },
  iconClose: {
    height: '48px',
    width: '48px',
    '& svg': {
      fontSize: '1.5rem',
    },
  },
  barCode: {
    marginRight: '10px',
    '& svg': {
      height: '95px',
      width: '120px',
    },
  },
  headerStyle: {
    fontWeight: '500',
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
    fontSize: 14,
    lineHeight: '24px',
    marginBottom: '6px',
  },
  transmittalText: {
    fontSize: 14,
  },
  contentText: {
    fontSize: 12.5,
    lineHeight: '24px',
    fontWeight: '600',
    color: '#2F3542',
  },
  contentItemStyle: {
    marginTop: '24px',
  },
  cardHeader: {
    fontWeight: '500',
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
    fontWeight: '500',
  },
  contentItemMargin: {
    marginTop: '5px',
  },
  contentAudit: {
    fontSize: '12.5px',
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
    marginTop: 0,
  },
  textFieldWhite: {
    backgroundColor: 'white',
  },
  fontSmall: {
    fontSize: '14px',
  },
  transNumberStyle: {
    fontWeight: 600,
  },
  auditContectMarginTop: {
    marginTop: 40,
  },
  dividerStyle: {
    marginBottom: 10,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  wrapper: {
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
  containerSize: {
    maxWidth: '389px',
  },
  borderWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    border: '1px solid #2F3542',
    marginTop: '7px',
    padding: '14px',
    borderRadius: '2px',
    width: '100%',
  },
  checkHolder: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '24px',
    '& img': {
      marginRight: '5px',
    },
  },
  titleText: {
    width: '100%',
    fontWeight: '600',
    fontSize: '16px',
    paddingBottom: '10px',
    marginBottom: '7px',
    borderBottom: '1px solid #A5B0BE',
  },
  contentSignature: {
    position: 'relative',
    bottom: '0',
    right: '0',
    width: '70%',
  },
  emptySignature: {
    position: 'fixed',
    bottom: '0',
    right: '0',
  },
  signatureImg: {
    position: 'absolute',
    right: '0',
    bottom: '-15px',
    width: '100%',
    textAlign: 'center',
  },
  relativeSignature: {
    marginTop: '50px',
    marginLeft: 'auto',
    width: '70%',
  },
  tableWrapper: {
    width: '100%',
    '& tr': {
      border: 'none important!',
    },
    '& td': {
      border: 'none !important',
    },
  },
  requestProfile: {
    margin: '10px 0 3px',
  },
}));

const PrintView = (props) => {
  const classes = useStyles();

  const handleImageLoaded = (toggle) => {
    props.imageLoad(toggle);
  };

  const handleImageError = (toggle) => {
    props.imageLoad(toggle);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {props.status > 3 ? (
            <>
              <Grid container end className={classes.requestProfile}>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info.company ? props.request_info.company.name : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Contact Person:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info.company ? props.request_info.company.contact_person : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={5}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Contact Number:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info.company ? props.request_info.company.contact_number : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Address:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info.address
                          ? props.request_info.address.unit +
                            ' ' +
                            props.request_info.address.floor_no +
                            '/F' +
                            ' ' +
                            props.request_info.address.building_name +
                            ',' +
                            ' ' +
                            props.request_info.address.street +
                            ',' +
                            ' ' +
                            props.request_info.address.barangay +
                            ',' +
                            ' ' +
                            props.request_info.address.city +
                            ',' +
                            ' ' +
                            props.request_info.address.province +
                            ',' +
                            ' ' +
                            props.request_info.address.country +
                            ' ' +
                            (props.request_info.address.zip_code > 0 ? props.request_info.address.zip_code : '')
                          : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Department:
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info.company.department ? props.request_info.company.department : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid container>
                <Grid item xs={6}>
                  <img
                    src={Intellicare}
                    onLoad={(event) => handleImageLoaded(true)}
                    onError={(event) => handleImageError(false)}
                    alt="logo"
                  />
                  <p
                    style={{
                      marginTop: '-3px',
                      marginRight: '10px',
                      width: '255px',
                      fontSize: '12px',
                    }}
                  >
                    7/F Feliza Building, 108 V.A. Rufino St., Legaspi Village, Makati City, Philippines Tels.: (632)
                    789-400 Fax # (632) 750-7009
                  </p>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ marginRight: '-8px' }}>
                    {props.request_info.transmittal_no ? (
                      <Barcode value={props.request_info.transmittal_no} height={40} displayValue={false} />
                    ) : (
                      ''
                    )}
                  </div>
                  <div
                    item
                    style={{
                      marginTop: '-10px',
                      width: '100%',
                      textAlign: 'right',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '16px !important',
                        fontWeight: 'bold',
                      }}
                      gutterBottom
                    >
                      {props.request_info ? props.request_info.transmittal_no : 'N/A'}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <h1
                      style={{
                        fontWeight: '600',
                        fontSize: '28px',
                        margin: '5px 0 10px',
                      }}
                    >
                      Transmittal Slip
                    </h1>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          Name:
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info.company ? props.request_info.company.name : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          Contact Person:
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info.company ? props.request_info.company.contact_person : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={5}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          Contact Number:
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info.company ? props.request_info.company.contact_number : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={3}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          Address:
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info.address
                            ? props.request_info.address.unit +
                              ' ' +
                              props.request_info.address.floor_no +
                              '/F' +
                              ' ' +
                              props.request_info.address.building_name +
                              ',' +
                              ' ' +
                              props.request_info.address.street +
                              ',' +
                              ' ' +
                              props.request_info.address.barangay +
                              ',' +
                              ' ' +
                              props.request_info.address.city +
                              ',' +
                              ' ' +
                              props.request_info.address.province +
                              ',' +
                              ' ' +
                              props.request_info.address.country +
                              ' ' +
                              (props.request_info.address.zip_code > 0 ? props.request_info.address.zip_code : '')
                            : ''}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={3}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          Department:
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info.company
                            ? props.request_info.company.department
                              ? props.request_info.company.department
                              : 'N/A'
                            : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          {props.status < 4 && (
            <Grid container className={classes.marginTopView}>
              <div className={classes.borderWrapper}>
                <div className={classes.checkHolder}>
                  <img src={props.request_info.request_type === 1 ? Checked : Box} alt="logo" /> Delivery
                </div>
                <div className={classes.checkHolder}>
                  <img src={props.request_info.request_type === 1 ? Box : Checked} alt="logo" /> Pickup
                </div>
                <div className={classes.checkHolder}>
                  <img src={!props.request_info.reason_urgency ? Box : Checked} alt="logo" /> Urgent
                </div>
                <div className={classes.checkHolder}>
                  <div>
                    Expected Delivery / Pickup Date:{' '}
                    {props.request_info.item ? props.request_info.item.expected_date : 'N/A'}
                  </div>
                </div>
              </div>
            </Grid>
          )}
          <Grid container style={{ marginTop: '-8px' }}>
            <p data-cy="item_details_text" className={classes.titleText}>
              Item Details
            </p>
            {props.request_info.item &&
              props.request_info.item.items.map((resItems, index) => (
                <Grid container key={index}>
                  <Grid
                    item
                    style={{
                      display: 'flex',
                      maxWidth: '75%',
                      minWidth: '50%',
                    }}
                  >
                    <Typography
                      className={clsx(classes.contentSubText)}
                      color="textSecondary"
                      style={{ marginRight: '10px' }}
                    >
                      Item(s) for Delivery / Pickup:
                    </Typography>{' '}
                    <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }}>
                      {REQ_TYPE.REQUEST_ITEM_TYPE[resItems.type].text === 'Other'
                        ? resItems.other.length > 57
                          ? 'Others - ' + resItems.other.substring(0, 57)
                          : 'Others - ' + resItems.other
                        : REQ_TYPE.REQUEST_ITEM_TYPE[resItems.type].text}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    style={{
                      display: 'flex',
                      maxWidth: '25%',
                      minWidth: '25%',
                    }}
                  >
                    <Typography
                      style={{ margin: '0 10px 0 15px' }}
                      className={clsx(classes.contentSubText)}
                      color="textSecondary"
                    >
                      No. of Item/s:
                    </Typography>{' '}
                    <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }}>
                      {resItems.count}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
          </Grid>
          <Grid container style={{ marginTop: '-8px' }}>
            <p className={classes.titleText}>Request Details</p>
          </Grid>
          {props.status > 3 ? (
            <Grid container>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={6}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Requestor:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info ? props.request_info.requestor_name : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          Requestor Department:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info.requestor_department_name
                            ? props.request_info.requestor_department_name
                            : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          HMO Partner:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info.requestor_hmo_partner_label
                            ? props.request_info.requestor_hmo_partner_label
                            : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={6}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Requested On:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info ? props.request_info.created_at : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={5}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Remarks:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <div>
                        {props.request_info.schedule_request && (
                          <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                            {`Preferred ${REQ_TYPE.REQUEST_TYPE_TEXT[
                              props.request_info.schedule_request_data.request_details.request_type
                            ].text.toLowerCase()} time: ${props.request_info.schedule_request_data.request_details.preferred_time.toUpperCase()}`}
                          </Typography>
                        )}

                        {props.request_info.schedule_request && props.request_info.remarks.length === 0 ? (
                          ''
                        ) : (
                          <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                            {props.request_info.remarks
                              ? props.request_info.remarks.length > 140
                                ? props.request_info.remarks.substring(0, 143 - 3) + '...'
                                : props.request_info.remarks
                              : 'N/A'}
                          </Typography>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={5}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Reason for Urgency:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info.reason_urgency
                          ? props.request_info.reason_urgency.length > 140
                            ? props.request_info.reason_urgency.substring(0, 143 - 3) + '...'
                            : props.request_info.reason_urgency
                          : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={6}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Requestor:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info ? props.request_info.requestor_name : null}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          Requestor Department:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info.requestor_department_name
                            ? props.request_info.requestor_department_name
                            : null}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          HMO Partner:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info.requestor_hmo_partner_label
                            ? props.request_info.requestor_hmo_partner_label
                            : 'N/A'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                          Requested On:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                          {props.request_info ? props.request_info.created_at : null}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}></Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={5}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Remarks:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <div>
                        {props.request_info.schedule_request && (
                          <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                            {`Preferred ${REQ_TYPE.REQUEST_TYPE_TEXT[
                              props.request_info.schedule_request_data.request_details.request_type
                            ].text.toLowerCase()} time: ${props.request_info.schedule_request_data.request_details.preferred_time.toUpperCase()}`}
                          </Typography>
                        )}

                        {props.request_info.schedule_request && props.request_info.remarks.length === 0 ? (
                          ''
                        ) : (
                          <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                            {props.request_info.remarks
                              ? props.request_info.remarks.length > 140
                                ? props.request_info.remarks.substring(0, 143 - 3) + '...'
                                : props.request_info.remarks
                              : 'N/A'}
                          </Typography>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{ display: 'flex' }}>
                    <Grid item xs={5}>
                      <Typography className={clsx(classes.contentSubText)} color="textSecondary" gutterBottom>
                        Reason for Urgency:
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography className={clsx(classes.contentText)} style={{ fontWeight: '500' }} gutterBottom>
                        {props.request_info.reason_urgency
                          ? props.request_info.reason_urgency.length > 140
                            ? props.request_info.reason_urgency.substring(0, 143 - 3) + '...'
                            : props.request_info.reason_urgency
                          : 'N/A'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}

          {props.status === 12 ? (
            <>
              <Grid container style={{ marginTop: '-15px' }}>
                <p className={classes.titleText}>Cancelled</p>
              </Grid>
              <Typography classes={{ root: classes.fontSmall }} color="textSecondary">
                {props.request_info.tracking_status_details && props.request_info.tracking_status_details.reason}
              </Typography>
              <div className={classes.tableWrapper}>
                <Grid container style={{ marginTop: '-8px' }}>
                  <p className={classes.titleText}>Tracking Details</p>
                </Grid>
                {props.audit_logs
                  ? props.audit_logs
                      .map((res, index) => (
                        <div key={index}>
                          <div className={classes.contentItemMargin}>
                            <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                              {res.date} - {res.details}
                            </Typography>
                          </div>
                        </div>
                      ))
                      .reverse()
                  : null}
              </div>
            </>
          ) : props.status === 11 ? (
            <>
              <Grid container style={{ marginTop: '-8px' }}>
                <p className={classes.titleText}>Not Delivered</p>
              </Grid>
              <Typography classes={{ root: classes.fontSmall }} color="textSecondary">
                {props.request_info.tracking_status_details.not_delivered.reason
                  ? props.request_info.tracking_status_details.not_delivered.reason
                  : 'N/A'}
              </Typography>
              <div className={classes.tableWrapper}>
                <Grid container style={{ marginTop: '-8px' }}>
                  <p className={classes.titleText}>Tracking Details</p>
                </Grid>
                {props.audit_logs
                  ? props.audit_logs
                      .map((res, index) => (
                        <div key={index}>
                          <div className={classes.contentItemMargin}>
                            <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                              {res.date} - {res.details}
                            </Typography>
                          </div>
                        </div>
                      ))
                      .reverse()
                  : null}
              </div>
            </>
          ) : props.status === 10 ? (
            <>
              <Grid container style={{ marginTop: '-8px' }}>
                <p className={classes.titleText}>Cannot Deliver</p>
              </Grid>
              <Typography classes={{ root: classes.fontSmall }} color="textSecondary">
                {props.request_info.tracking_status_details.cannot_deliver.others
                  ? 'Others - ' + props.request_info.tracking_status_details.cannot_deliver.others
                  : props.request_info.tracking_status_details.cannot_deliver.reason
                  ? props.request_info.tracking_status_details.cannot_deliver.reason
                  : 'N/A'}
              </Typography>
              <div className={classes.tableWrapper}>
                <Grid container style={{ marginTop: '-8px' }}>
                  <p className={classes.titleText}>Tracking Details</p>
                </Grid>
                {props.audit_logs
                  ? props.audit_logs
                      .map((res, index) => (
                        <div key={index}>
                          <div className={classes.contentItemMargin}>
                            <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                              {res.date} - {res.details}
                            </Typography>
                          </div>
                        </div>
                      ))
                      .reverse()
                  : null}
              </div>{' '}
            </>
          ) : props.status === 9 ? (
            <>
              <Grid container style={{ marginTop: '-8px' }}>
                <p className={classes.titleText}>Not Picked up</p>
              </Grid>
              <Typography classes={{ root: classes.fontSmall }} color="textSecondary">
                {props.request_info.tracking_status_details.not_picked_up.reason
                  ? props.request_info.tracking_status_details.not_picked_up.reason
                  : 'N/A'}
              </Typography>
              <div className={classes.tableWrapper}>
                <Grid container style={{ marginTop: '-8px' }}>
                  <p className={classes.titleText}>Tracking Details</p>
                </Grid>
                {props.audit_logs
                  ? props.audit_logs
                      .map((res, index) => (
                        <div key={index}>
                          <div className={classes.contentItemMargin}>
                            <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                              {res.date} - {res.details}
                            </Typography>
                          </div>
                        </div>
                      ))
                      .reverse()
                  : null}
              </div>{' '}
            </>
          ) : props.status === 8 ? (
            <>
              <Grid container style={{ marginTop: '-8px' }}>
                <p className={classes.titleText}>Cannot Pickup</p>
              </Grid>
              <Typography classes={{ root: classes.fontSmall }} color="textSecondary">
                {props.request_info.tracking_status_details.cannot_pickup.others
                  ? 'Others - ' + props.request_info.tracking_status_details.cannot_pickup.others
                  : props.request_info.tracking_status_details.cannot_pickup.reason
                  ? props.request_info.tracking_status_details.cannot_pickup.reason
                  : 'N/A'}
              </Typography>
              <div className={classes.tableWrapper}>
                <Grid container style={{ marginTop: '-8px' }}>
                  <p className={classes.titleText}>Tracking Details</p>
                </Grid>
                {props.audit_logs
                  ? props.audit_logs
                      .map((res, index) => (
                        <div key={index}>
                          <div className={classes.contentItemMargin}>
                            <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                              {res.date} - {res.details}
                            </Typography>
                          </div>
                        </div>
                      ))
                      .reverse()
                  : null}
              </div>{' '}
            </>
          ) : props.status === 7 ? (
            <>
              <div className={classes.tableWrapper}>
                <Grid container style={{ marginTop: '-8px' }}>
                  <p className={classes.titleText}>Tracking Details</p>
                </Grid>
                {props.audit_logs
                  ? props.audit_logs
                      .map((res, index) => (
                        <div key={index}>
                          <div className={classes.contentItemMargin}>
                            <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                              {res.date} - {res.details}
                            </Typography>
                          </div>
                        </div>
                      ))
                      .reverse()
                  : null}
              </div>{' '}
            </>
          ) : props.status === 6 ? (
            <>
              <div className={classes.tableWrapper}>
                <Grid container style={{ marginTop: '-8px' }}>
                  <p className={classes.titleText}>Tracking Details</p>
                </Grid>
                {props.audit_logs
                  ? props.audit_logs
                      .map((res, index) => (
                        <div key={index}>
                          <div className={classes.contentItemMargin}>
                            <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                              {res.date} - {res.details}
                            </Typography>
                          </div>
                        </div>
                      ))
                      .reverse()
                  : null}
              </div>
            </>
          ) : props.status === 5 || props.status === 4 ? (
            <div className={classes.tableWrapper}>
              <Grid container style={{ marginTop: '-8px' }}>
                <p className={classes.titleText}>Tracking Details</p>
              </Grid>
              {props.audit_logs
                ? props.audit_logs
                    .map((res, index) => (
                      <div key={index}>
                        <div className={classes.contentItemMargin}>
                          <Typography className={clsx(classes.contentAudit)} color="textSecondary">
                            {res.date} - {res.details}
                          </Typography>
                        </div>
                      </div>
                    ))
                    .reverse()
                : null}
            </div>
          ) : (
            <div className={classes.emptySignature}>
              <form noValidate autoComplete="off">
                <Grid container>
                  <Grid item xs={12}></Grid>
                </Grid>
              </form>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

PrintView.propTypes = {
  request_info: PropTypes.any,
  imageLoad: PropTypes.any,
  status: PropTypes.any,
  audit_logs: PropTypes.any,
};

export default PrintView;
