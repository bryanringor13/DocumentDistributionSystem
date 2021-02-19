import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UrgentIcon from '../../assets/img/icons/urgent-icon.svg';

import * as REQ_TYPE from '../../utils/Constants';

const useStyles = makeStyles(() => ({
  tableWrapper: {
    width: '100%',
    '& tr': {
      border: 'none !important',
    },
    '& td': {
      border: 'none !important',
    },
  },
  centerItem: {
    display: 'flex',
    alignItems: 'center',
  },
  headerWrapper: {
    marginBottom: '10px',
  },
  headerAddress: {
    marginRight: '55px',
    marginLeft: '35px',
  },
  headerTitle: {
    marginBottom: '8px',
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerDetails: {
    paddingBottom: '8px',
    marginBottom: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderBottom: '1px solid #A5B0BE',
  },
  detailsArea: {
    display: 'flex',
  },
  detailItem: {
    marginRight: '12px',
    fontSize: '16px',
  },
  detailItemDate: {
    marginRight: '35px',
    fontSize: '16px',
  },
  tableTransmittal: {
    '& tr td': {
      verticalAlign: 'top',
      paddingTop: '14px',
    },
  },
  tableHeaderTransmittal: {
    display: 'flex',
    paddingBottom: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'left',
    borderBottom: '1px solid #A5B0BE',
    '& div': {
      fontSize: '14px',
    },
  },
  tableContentTransmittal: {
    marginTop: '20px',
  },
  itemHolder: {
    width: '12%',
  },
  itemType: {
    width: '6.5%',
  },
  itemTransmittal: {
    width: '12%',
  },
  itemCompany: {
    width: '13%',
  },
  itemAddress: {
    width: '29%',
  },
  itemContact: {
    width: '13%',
  },
  itemTransmittalData: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '& span': {
      marginLeft: '23px',
    },
  },
  tableSignature: {
    position: 'relative',
    paddingTop: '3px',
    marginTop: '45px',
    marginLeft: 'auto',
    maxWidth: '400px',
    fontSize: '14px',
    fontWeight: 500,
    textAlign: 'center',
    borderTop: '2px solid #A5B0BE',
    '&:before': {
      content: '"Received By:"',
      position: 'absolute',
      top: '-35px',
      left: '-112px',
      fontWeight: 500,
    },
  },
  transmittalUrgent: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '18px',
    color: '#767676',
  },
  tableTransmittalRow: {
    display: 'flex',
    paddingTop: '16px',
    '& div': {
      padding: '0 4px',
      fontSize: '12px',
    },
  },
}));

const PrintSummaryList = ({ request }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.tableWrapper)}>
      <div>
        <div>
          <div>
            <Grid container>
              <Grid item xs={12}>
                <div className={classes.headerTitle}>Summary List</div>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.headerDetails}>Summary List Details</div>
                <Grid container>
                  <Grid item xs={4}>
                    <div>
                      <span className={classes.detailItem}>Messenger Name:</span>
                      <span>{request.summaryList.summary && request.summaryList.summary.info.messenger}</span>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.detailsArea}>
                      <div className={classes.detailItem}>Area Assignment:</div>
                      <div>
                        {request.summaryList.summary &&
                          request.summaryList.summary.info.assigned_locations.map((item, key) => {
                            return <div key={key}>{item}</div>;
                          })}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={{ marginBottom: '15px' }}>
                      <span className={classes.detailItem}>Admin Assistant:</span>
                      <span>{request.summaryList.summary && request.summaryList.summary.info.assigned_admin}</span>
                    </div>
                    <div>
                      <span className={classes.detailItemDate}>Date Printed:</span>
                      <span>{request.summaryList.summary && request.summaryList.summary.info.date_printed}</span>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
        {request.summaryList.summary &&
          request.summaryList.summary.list.map((transmittal, key) => {
            return (
              <div key={key}>
                <div>
                  <div className={classes.tableContentTransmittal}>
                    <div className={clsx(classes.tableWrapper, classes.tableTransmittal)}>
                      <div className={classes.tableHeaderTransmittal}>
                        <div className={classes.itemTransmittal}>Transmittal No.</div>
                        <div className={classes.itemType}>Type</div>
                        <div className={classes.itemCompany}>Name</div>
                        <div className={classes.itemAddress}>Address</div>
                        <div className={classes.itemContact}>Contact Person</div>
                        <div className={classes.itemHolder}>Date Received</div>
                        <div className={classes.itemHolder}>Remarks</div>
                      </div>
                      <div>
                        {transmittal.transmital_requests.map((item, index) => {
                          return (
                            <div key={index} className={classes.tableTransmittalRow}>
                              <div className={classes.itemTransmittal}>
                                <div className={classes.itemTransmittalData}>
                                  {item.is_urgent && (
                                    <img src={UrgentIcon} className={classes.transmittalUrgent} alt="Urgent" />
                                  )}
                                  <span>{item.transmittal_no}</span>
                                </div>
                              </div>
                              <div className={classes.itemType}>
                                {REQ_TYPE.REQUEST_TYPE_TEXT[item.request_type].text}
                              </div>
                              <div className={classes.itemCompany}>{item.company_name}</div>
                              <div className={classes.itemAddress}>
                                {item.address.floor_no +
                                  '/F ' +
                                  item.address.unit +
                                  ' ' +
                                  item.address.building_name +
                                  ' ' +
                                  item.address.street +
                                  ' ' +
                                  item.address.barangay +
                                  ' ' +
                                  item.address.city +
                                  ' ' +
                                  item.address.province +
                                  ' ' +
                                  item.address.zip_code +
                                  ' ' +
                                  item.address.country}
                              </div>
                              <div className={classes.itemContact}>{item.contact_person}</div>
                              <div className={classes.itemHolder}>{item.scanned_at}</div>
                              <div className={classes.itemHolder}>
                                {item.remarks
                                  ? item.remarks.length > 20
                                    ? item.remarks.substring(0, 20 - 3) + '...'
                                    : item.remarks
                                  : 'N/A'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {transmittal.transmital_type === 'MULTIPLE_ITEM' && (
                      <div className={classes.tableSignature}>Signature Over Printed Name / Date & Time</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

PrintSummaryList.propTypes = {
  request: PropTypes.any,
};

export default PrintSummaryList;
