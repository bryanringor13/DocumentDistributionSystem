/* eslint-disable camelcase */
/* eslint-disable no-extend-native */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { numberWithComma } from '../../utils/common';

moment.locale();

const useStyles = makeStyles((_theme) => ({
  centerItem: {
    display: 'flex',
    alignItems: 'center',
  },
  fontBold: {
    margin: '5px 0',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  sectionTitle: {
    paddingBottom: '8px',
    fontSize: '16px',
    borderBottom: '1px solid #a5b0be',
  },
  infoHolder: {
    '& div': {
      marginBottom: '8px',
    },
  },
  infoLabel: {
    margin: '5px 0',
    fontSize: '14px',
    color: '#2f3542cc',
  },
  address: {
    marginLeft: '35px',
    fontSize: '12px',
  },
  pageNumber: {
    marginTop: '12px',
    fontSize: '14px',
    textAlign: 'right',
  },
  title: {
    margin: '17px auto 27px',
    width: '100%',
    fontSize: '26px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationWrapper: {
    marginBottom: '30px',
  },
  city: {
    marginBottom: '16px',
  },
  barangays: {
    columnCount: '3',
  },
  barangay: {
    marginBottom: '5px',
  },
  theadInfo: {
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: '600',
    position: 'relative',
    paddingBottom: '13px',
  },
  infoLine: {
    '& tr': {
      border: 'none !important',
    },
    '& td': {
      border: 'none !important',
    },
  },
  titeInfo: {
    border: 'none !important',
    '& tr td': {
      borderBottom: 'none !important',
    },
  },
  borderNone: {
    border: 'none !important',
  },
  tablePad: {
    padding: '10px 0',
  },
}));

const PrintMessengerInstruction = ({ messengerDetails, pass }) => {
  const classes = useStyles();

  // Temporary Instruction
  const tempInstruction = [
    {
      step: '1',
      info: 'Login to Intellicare Document Distribution Mobile App.',
    },
    {
      step: '2',
      info: 'Type in Username and default password and click the Login button.',
    },
    {
      step: '3',
      info: 'Upon successful login, you will be required to nominate a new password.',
    },
    {
      step: '4',
      info: 'Please nominate a strong password for a more secure account.',
    },
  ];

  function chunkArray(myArray, chunk_size) {
    let index = 0;
    const arrayLength = myArray.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }

  return (
    <>
      <div className={classes.borderNone}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.title}>Messenger Instruction</div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.titeInfo} style={{ width: '100%' }}>
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexBasis: '50%',
                  }}
                >
                  <p className={classes.theadInfo}>
                    Messenger Information
                    <hr
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: '-5px',
                        marginBottom: '10px',
                        border: 'none',
                        borderTop: '1px solid #A5B0BE',
                        height: '1px',
                        display: 'block',
                        width: '85%',
                      }}
                    ></hr>
                  </p>
                  <Grid container>
                    <Grid item xs={6}>
                      <p className={classes.infoLabel}>Name:</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.fontBold}>
                        {messengerDetails.first_name} {messengerDetails.last_name}
                      </p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.infoLabel}>Contact Number:</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.fontBold}>{messengerDetails.contact_number}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.infoLabel}>Box No:</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.fontBold}>{numberWithComma(messengerDetails.box_no)}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.infoLabel}>Capacity:</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.fontBold}> {numberWithComma(messengerDetails.capacity)}</p>
                    </Grid>
                  </Grid>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexBasis: '50%',
                  }}
                >
                  <p className={classes.theadInfo}>
                    Messenger Account{' '}
                    <hr
                      style={{
                        marginBottom: '10px',
                        position: 'absolute',
                        left: 0,
                        bottom: '-5px',
                        border: 'none',
                        borderTop: '1px solid #A5B0BE',
                        height: '1px',
                        display: 'block',
                        width: '100%',
                      }}
                    ></hr>
                  </p>

                  <Grid container>
                    <Grid item xs={6}>
                      <p className={classes.infoLabel}>Username:</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.fontBold}>{messengerDetails.username}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.infoLabel}>Password:</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.fontBold}>{pass ? pass : messengerDetails.password}</p>
                    </Grid>

                    <Grid item xs={6}>
                      <p className={classes.infoLabel}>Status:</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p className={classes.fontBold}>{messengerDetails.status === 1 ? 'Active' : 'Inactive'}</p>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <h1 className={clsx(classes.fontBold, classes.sectionTitle)}>Instruction</h1>
        {tempInstruction.map((item, index) => (
          <p style={{ fontSize: '12px' }} key={index}>
            {item.step}. {item.info}
          </p>
        ))}
      </div>
      <div style={{ width: '100%' }}>
        <div
          style={{
            padding: '25px 0',
            textAlign: 'left',
            fontSize: '16px',
            width: '140px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '0',
              width: '160px',
              fontWeight: 'bold',
            }}
          >
            Messenger Location
          </div>
          <hr
            style={{
              position: 'absolute',
              left: 0,
              bottom: '0px',
              border: 'none',
              borderTop: '1px solid #A5B0BE',
              height: '1px',
              display: 'block',
              marginBottom: '10px',
              width: '19.3cm',
            }}
          ></hr>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <div style={{ fontSize: '12px' }}>
          {messengerDetails.assigned_locations_labels.map((location, index) => {
            const loc = location.barangays;
            const data = chunkArray(loc, 4);

            return (
              <>
                <Grid container>
                  <Grid item xs={3}>
                    <p className={classes.tablePad}>Assigned City:</p>
                  </Grid>
                  <Grid item xs={9}>
                    <p style={{ paddingLeft: '5px', fontWeight: 'bold' }} className={classes.tablePad}>
                      {location.city}
                    </p>
                  </Grid>
                  <Grid container style={{ position: 'relative' }}>
                    <Grid item xs={3}>
                      <div>Assigned Barangay(s):</div>
                    </Grid>
                    <Grid item xs={9}>
                      {data.map((barangay, index) => {
                        const data2 = chunkArray(barangay, 1);
                        return (
                          <div key={index} style={{ width: '100%', display: 'flex' }}>
                            {data2.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    width: '25%',
                                    verticalAlign: 'top',
                                  }}
                                >
                                  {item.map((item2, i) => {
                                    return (
                                      <div key={i} className={classes.borderNone}>
                                        <div style={{ display: 'flex' }}>
                                          <div
                                            style={{
                                              marginRight: '3px',
                                            }}
                                          >
                                            -
                                          </div>
                                          <div>{item2}</div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

PrintMessengerInstruction.propTypes = {
  messengerDetails: PropTypes.any,
  pass: PropTypes.any,
};

export default PrintMessengerInstruction;
