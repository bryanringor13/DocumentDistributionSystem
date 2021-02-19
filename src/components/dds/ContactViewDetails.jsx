/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, Grid, Fab, Typography, Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Alert from '@material-ui/lab/Alert';
import { TableCell, TableRow } from '@material-ui/core';
import clsx from 'clsx';

import ArchiveContact from './ArchiveContact';
import Loading from '../common/Loading';
import ContactPersonTable from '../common/CommonTable/ContactPersonTable';
import ContactLocationTable from '../common/CommonTable/ContactLocationTable';

// import * as CONSTANTS from '../../utils/Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '24px',
  },
  contentText: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: '600',
    color: '#2F3542',
  },
  headerStyle: {
    fontWeight: 'bold',
    marginRight: '20px',
    marginBottom: '0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerBack: {
    maxWidth: '778px',
  },
  containerSize: {
    maxWidth: '389px',
  },
  fullContainerSize: {
    marginTop: '8px',
    maxWidth: '778px',
  },
  headerBG: {
    padding: '15px 20px 35px',
    '&:last-child': {
      paddingBottom: '35px',
    },
  },
  iconClose: {
    color: '#2F3542',
    border: '1px solid rgba(47, 53, 66, 0.4)',
    fontSize: '2rem',
    height: '48px',
    width: '48px',
    background: '#fff',
    boxShadow: 'none',
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
  contentSubText: {
    fontSize: 16,
    lineHeight: '24px',
    marginBottom: '8px',
  },
  cardContentPadding: {
    padding: theme.spacing(0, 2),
  },
  contentItemStyle: {
    marginTop: '10px',
  },
  contentTableStyle: {
    marginTop: '23px',
  },
  cardHeader: {
    position: 'relative',
    padding: '20px 20px 12px',
    '&:after': {
      content: "''",
      position: 'absolute',
      bottom: '0',
      left: '50%',
      width: '91%',
      height: '1px',
      backgroundColor: '#e0e6ed',
      transform: 'translateX(-50%)',
    },
  },
  contactDetailsTitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  contactDetailsStatus: {
    padding: '0',
    minWidth: '85px',
    fontWeight: 'bold',
  },
  btnActionWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnOutlined: {
    marginRight: '15px',
  },
  contactTable: {
    padding: '0 17px',
  },
}));

const ContactViewDetails = ({ open, closeForm, buttonActive, openEditDialog, typeSelectionLabel, typeLabel }) => {
  const classes = useStyles();
  const contact = useSelector((state) => state.contact);

  const [openArchiveContact, setOpenArchiveContact] = useState(false);
  const [contactStatus, setContactStatus] = useState('');
  // const [contactType, setContactType] = useState('');
  // const [contactProcessedData, setContactProcessedData] = useState([]);
  const [contactLocationProcessedData, setContactLocationProcessedData] = useState([]);
  const [contactPersonProcessedData, setContactPersonProcessedData] = useState([]);

  useEffect(() => {
    if (!contact.reqLoading && Object.keys(contact.contactInfo).length > 0) {
      // const type = CONSTANTS.CONTACT_TYPE.find((type) => type.code === contact.contactInfo.type);
      // setContactType(type.text);

      let newContactPersonDataArr = [];
      let newContactPersonDataObj = {};

      let newContactLocationDataArr = [];
      let newContactLocationDataObj = {};
      let processedAddress;

      if (buttonActive === 'departments' || buttonActive === 'brokers_and_agents') {
        newContactPersonDataObj = {
          contact_person: contact.contactInfo.contact_person,
          contact_no: contact.contactInfo.contact_no,
          notes: 'N/A',
        };

        newContactPersonDataArr.push(newContactPersonDataObj);

        setContactPersonProcessedData(newContactPersonDataArr);
      }

      if (buttonActive === 'employee') {
        newContactPersonDataObj = {
          contact_person: contact.contactInfo.contact_person,
          contact_no: contact.contactInfo.contact_no,
          department: contact.contactInfo.department,
        };

        newContactPersonDataArr.push(newContactPersonDataObj);

        setContactPersonProcessedData(newContactPersonDataArr);
      }

      if (buttonActive !== 'partner_networks') {
        const addressUnit =
          contact.contactInfo.address_details.unit.length > 0 ? `${contact.contactInfo.address_details.unit} ` : '';
        const addressFloor =
          contact.contactInfo.address_details.floor_no.length > 0
            ? `${contact.contactInfo.address_details.floor_no}/F `
            : '';
        const addressZipcode =
          contact.contactInfo.address_details.zip_code !== 0 ? ` ${contact.contactInfo.address_details.zip_code}` : '';

        processedAddress = `${addressUnit}${addressFloor}${contact.contactInfo.address_details.building_name}, ${contact.contactInfo.address_details.street}, ${contact.contactInfo.address_details.barangay_label}, ${contact.contactInfo.address_details.city_label}, ${contact.contactInfo.address_details.province_label}, ${contact.contactInfo.address_details.country}${addressZipcode}`;

        console.log(processedAddress, 'PROCESSED ADDRESSED');

        newContactLocationDataObj = {
          full_address: processedAddress,
        };

        newContactLocationDataArr.push(newContactLocationDataObj);
        console.log('newContactLocationDataArr: ', newContactLocationDataArr);
        setContactLocationProcessedData(newContactLocationDataArr);
      }
    }
  }, [contact.contactInfo]);

  const handleClose = () => {
    closeForm(false);
  };

  const handleOpenArchiveContact = (bool, status) => {
    setOpenArchiveContact(bool);
    setContactStatus(status);
  };

  const tableColumn = [
    {
      title: 'Contact Person',
      field: 'contact_person',
      sorting: false,
    },
    {
      title: 'Contact Number',
      field: 'contact_no',
      sorting: false,
    },
    {
      title: 'Notes',
      field: 'notes',
      sorting: false,
    },
  ];

  const tableColumnEmployee = [
    {
      title: 'Contact Person',
      field: 'contact_person',
      sorting: false,
    },
    {
      title: 'Contact Number',
      field: 'contact_no',
      sorting: false,
    },
    {
      title: 'Department',
      field: 'department',
      sorting: false,
    },
  ];

  const tableColumnAddress = [
    {
      title: 'Facility ID',
      field: 'facility_id',
      sorting: true,
    },
    {
      title: 'Facility Name',
      field: 'facility_name',
      sorting: true,
    },
    {
      title: 'Address',
      field: 'full_address',
      sorting: true,
    },
  ];

  const tableColumnAddressOnly = [
    {
      title: 'Address',
      field: 'full_address',
      sorting: buttonActive === 'partner_networks' ? true : false,
    },
  ];

  const componentsContactPerson = {
    Cell: (props) => {
      console.log('View Cell', props);
      return (
        <TableCell>
          {props.columnDef.field === 'contact_person'
            ? props.rowData.contact_person
            : props.columnDef.field === 'contact_no'
            ? props.rowData.contact_no
            : props.columnDef.field === 'notes' && props.rowData.notes}
        </TableCell>
      );
    },
  };

  const componentsAddress = {
    Cell: (props) => {
      console.log('Address Cell: ', props);
      return (
        <TableCell>
          {props.columnDef.field === 'facility_id'
            ? props.rowData.facility_id
            : props.columnDef.field === 'facility_name'
            ? props.rowData.facility_name
            : props.columnDef.field === 'full_address' && props.rowData.full_address}
        </TableCell>
      );
    },
  };

  const contactPersonHandler = () => {
    if (!!contact.contactInfo.contacts) {
      let addressData = [];
      let addressObject = {};

      contact.contactInfo.contacts.map((contact, index) => {
        addressObject = {
          contact_person: contact.contactPerson,
          contact_no: contact.contactNumber,
          notes: contact.notes,
        };

        addressData = [...addressData, addressObject];
      });

      setContactPersonProcessedData(addressData);
    } else if (!!contact.contactInfo.contact && Object.keys(contact.contactInfo.contact).length > 0) {
      let addressData = [];
      let addressObject = {};
      addressObject = {
        contact_person: contact.contactInfo.contact.contactPerson,
        contact_no: contact.contactInfo.contact.contactNumber,
        notes: contact.contactInfo.contact.notes,
      };

      addressData = [addressObject];
      console.log('Contact Person Handler', contact.contactInfo.contact, addressData);
      setContactPersonProcessedData(addressData);
    }
  };

  const contactAddressHandler = () => {
    if (!!contact.contactInfo.address && contact.contactInfo.address.addresses) {
      let addressData = [];
      let addressObject = {};
      contact.contactInfo.address.addresses.map((address, index) => {
        addressObject = {
          facility_id: address.facility_id,
          facility_name: address.facility_name,
          facility_type: address.facility_type,
          full_address: address.full_address,
        };

        addressData = [...addressData, addressObject];
      });
      setContactLocationProcessedData(addressData);
    } else if (!!contact.contactInfo.address && Object.keys(contact.contactInfo.address).length > 0) {
      let addressData = [];
      let addressObject = {};

      addressObject = {
        full_address: `${
          contact.contactInfo.address.unit_flr_bldg.length > 0 ? `${contact.contactInfo.address.unit_flr_bldg}, ` : ''
        } 
        ${contact.contactInfo.address.subdivision.length > 0 ? `${contact.contactInfo.address.subdivision}, ` : ''} 
        ${contact.contactInfo.address.building_name.length > 0 ? `${contact.contactInfo.address.building_name}, ` : ''}
        ${contact.contactInfo.address.street.length > 0 ? `${contact.contactInfo.address.street}, ` : ''}
        ${contact.contactInfo.address.barangay.length > 0 ? `${contact.contactInfo.address.barangay}, ` : ''} 
        ${contact.contactInfo.address.city.length > 0 ? `${contact.contactInfo.address.city}, ` : ''}
        ${contact.contactInfo.address.district.length > 0 ? `${contact.contactInfo.address.district}, ` : ''}
        ${contact.contactInfo.address.zip_code.length > 0 ? `${contact.contactInfo.address.zip_code}` : ''}`,
      };
      addressData = [addressObject];
      // (Unit, Floor No., Building Name, Street, Barangay, City/Municipality, State/Province, Country, Zip code)

      setContactLocationProcessedData(addressData);
    }
  };

  useEffect(() => {
    contactPersonHandler();
    contactAddressHandler();
  }, [contact.contactInfo]);

  console.log(contact.contactInfo, 'CONTACT INFO');

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container alignItems="flex-start" justify="flex-end">
                <Grid item>
                  <Fab className={classes.iconClose} aria-label="close" onClick={handleClose} data-cy="close_btn">
                    <ClearSharpIcon fontSize="large" />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        {!contact.reqLoading ? (
          <Grid container>
            <Grid item xs>
              {/* For Margin */}
            </Grid>
            <Grid item xs={7} style={{ marginBottom: 50 }}>
              <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                <Grid item className={classes.containerSize} xs={6}>
                  <div className={classes.contactDetailsTitle}>
                    <Typography gutterBottom variant="h5" className={classes.headerStyle} data-cy="new_request_text">
                      Contact Details
                    </Typography>
                    {buttonActive !== 'clients' &&
                      buttonActive !== 'partner_networks' &&
                      (!!contact.contactInfo && !!contact.contactInfo.status ? (
                        contact.contactInfo.status === 'ACTIVE' ? (
                          <Alert severity="success" classes={{ root: classes.contactDetailsStatus }}>
                            Active
                          </Alert>
                        ) : (
                          <div className="custom-alert-info">
                            <Alert severity="info" classes={{ root: classes.contactDetailsStatus }}>
                              Inactive
                            </Alert>
                          </div>
                        )
                      ) : null)}
                  </div>
                </Grid>
                <Grid item className={classes.containerSize} xs={6}>
                  {buttonActive !== 'clients' && buttonActive !== 'partner_networks' && (
                    <div className={classes.btnActionWrapper}>
                      {!!contact.contactInfo ? (
                        contact.contactInfo.status === 'ACTIVE' ? (
                          <>
                            <Button
                              variant="outlined"
                              color="primary"
                              className={classes.btnOutlined}
                              onClick={() => handleOpenArchiveContact(true, 'archive')}
                            >
                              Archive
                            </Button>
                            <Button variant="contained" onClick={() => openEditDialog(true)} color="primary">
                              Edit
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenArchiveContact(true, 'activate')}
                          >
                            Activate
                          </Button>
                        )
                      ) : null}
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                {/* New Contact Details */}
                <Grid item className={classes.fullContainerSize} xs={12}>
                  <div>
                    <Card>
                      <CardHeader
                        title={
                          <Typography className={clsx(classes.cardTitle, classes.cardContentPadding)}>
                            <span>
                              {buttonActive === 'clients'
                                ? 'Client Details'
                                : buttonActive === 'partner_networks'
                                ? 'Partner Network Details'
                                : buttonActive === 'employee'
                                ? 'Employee Details'
                                : buttonActive === 'departments'
                                ? 'Department Details'
                                : buttonActive === 'intellicare_branch'
                                ? 'Intellicare Branch Details'
                                : buttonActive === 'brokers_and_agents'
                                ? 'Broker/Agent Details'
                                : buttonActive === 'other_companies'
                                ? 'Company Details'
                                : null}
                            </span>
                          </Typography>
                        }
                        classes={{ root: classes.cardHeader }}
                      ></CardHeader>
                      <CardContent classes={{ root: classes.headerBG }}>
                        <Grid container>
                          <Grid item xs={3}>
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
                              >
                                {!!contact.contactInfo.code && contact.contactInfo.code}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={4}>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                {buttonActive === 'clients' ||
                                buttonActive === 'employee' ||
                                buttonActive === 'departments' ||
                                buttonActive === 'brokers_and_agents' ||
                                buttonActive === 'other_companies' ||
                                buttonActive === 'intellicare_branch'
                                  ? 'Type'
                                  : buttonActive === 'partner_networks'
                                  ? 'Partner Type'
                                  : null}
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                              >
                                {buttonActive === 'clients' ||
                                buttonActive === 'employee' ||
                                buttonActive === 'departments'
                                  ? `${contact.contactInfo.type
                                      .charAt(0)
                                      .toUpperCase()}${contact.contactInfo.type.toLowerCase().slice(1)}`
                                  : buttonActive === 'brokers_and_agents'
                                  ? `${contact.contactInfo.type
                                      .charAt(0)
                                      .toUpperCase()}${contact.contactInfo.type.toLowerCase().slice(1, -1)}`
                                  : buttonActive === 'partner_networks'
                                  ? typeLabel
                                  : null}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={5}>
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
                                {!!contact.contactInfo && contact.contactInfo.name}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div className={classes.contentTableStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Contact Persons
                              </Typography>
                              <div className={classes.contactTable}>
                                <ContactPersonTable
                                  columns={buttonActive === 'employee' ? tableColumnEmployee : tableColumn}
                                  data={
                                    buttonActive !== 'partner_networks'
                                      ? contactPersonProcessedData
                                      : !!contact.contactInfo.contacts || !!contact.contactInfo.contact
                                      ? contactPersonProcessedData
                                      : []
                                  }
                                  buttonActive={buttonActive}
                                  components={
                                    !!contact.contactInfo.contacts || !!contact.contactInfo.contact
                                      ? componentsContactPerson
                                      : []
                                  }
                                />
                              </div>
                            </div>

                            <div className={classes.contentTableStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                {buttonActive === 'partner_networks'
                                  ? 'Branch or Office Locations'
                                  : 'Branch or Office Location'}
                              </Typography>
                              <div className={classes.contactTable}>
                                <ContactLocationTable
                                  columns={
                                    buttonActive === 'clients' ||
                                    (buttonActive === 'partner_networks' && typeSelectionLabel === 'other_services') ||
                                    buttonActive === 'brokers_and_agents' ||
                                    buttonActive === 'intellicare_branch' ||
                                    buttonActive === 'departments' ||
                                    buttonActive === 'employee' ||
                                    buttonActive === 'other_companies'
                                      ? tableColumnAddressOnly
                                      : tableColumnAddress
                                  }
                                  data={
                                    buttonActive !== 'partner_networks'
                                      ? contactLocationProcessedData
                                      : !!contact.contactInfo.address
                                      ? contactLocationProcessedData
                                      : []
                                  }
                                  components={!!contact.contactInfo.address ? componentsAddress : []}
                                  buttonActive={buttonActive}
                                />
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
                {/* End of New Contact Details */}
              </Grid>
            </Grid>

            <Grid item xs>
              {/* For Margin */}
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs>
              {/* For Margin */}
            </Grid>
            <Grid item xs={7}>
              <Loading />
            </Grid>
            <Grid item xs>
              {/* For Margin */}
            </Grid>
          </Grid>
        )}
      </Dialog>
      {openArchiveContact && (
        <ArchiveContact
          open={openArchiveContact}
          handleOpenArchiveContact={handleOpenArchiveContact}
          status={contactStatus}
          buttonActive={buttonActive}
        />
      )}
    </>
  );
};

export default ContactViewDetails;
