import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

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
  transmittal: {
    width: '13.5%',
  },
  itemHolder: {
    width: '11%',
  },
  itemMessenger: {
    width: '13%',
  },
  requestor: {
    width: '20%',
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

const TransmittalReport = ({ request }) => {
  const classes = useStyles();
  // const dataItem = [
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  //   {
  //     transmittal: '1029182912222121',
  //     requestor: 'Requestor Name - Department',
  //     requestorType: 'Delivery',
  //     dataScan: 'May 10, 2020',
  //     admin: 'Anuar',
  //     messenger: 'Username / Courier',
  //     dateUpload: 'May 12, 2020',
  //     status: 'For Delivery',
  //   },
  // ]
  return (
    <div className={clsx(classes.tableWrapper)}>
      {/* <div>
        <div>
          <div>
            <div className={classes.tableContentTransmittal}>
              <div
                className={clsx(classes.tableWrapper, classes.tableTransmittal)}
              >
                <div>
                  {dataItem.map((item, index) => {
                    return (
                      <div key={index} className={classes.tableTransmittalRow}>
                        <div className={classes.transmittal}>
                          {item.transmittal}
                        </div>
                        <div className={classes.requestor}>
                          {item.requestor}
                        </div>
                        <div className={classes.itemHolder}>
                          {item.requestorType}
                        </div>
                        <div className={classes.itemHolder}>
                          {item.dataScan}
                        </div>
                        <div className={classes.itemHolder}>{item.admin}</div>
                        <div className={classes.itemMessenger}>
                          {item.messenger}
                        </div>
                        <div className={classes.itemHolder}>
                          {item.dateUpload}
                        </div>
                        <div className={classes.itemHolder}>{item.status}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  );
};

TransmittalReport.propTypes = {
  request: PropTypes.any,
};

export default TransmittalReport;
