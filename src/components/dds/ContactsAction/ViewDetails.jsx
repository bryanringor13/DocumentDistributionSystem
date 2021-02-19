/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import { Dialog, Grid, Fab, Typography, Card, CardHeader, CardContent, Button } from '@material-ui/core';

import ArchiveContact from './ArchiveContact';
import Loading from '../common/Loading';
import ContactPersonTable from '../common/CommonTable/ContactPersonTable';
import ContactLocationTable from '../common/CommonTable/ContactLocationTable';

import * as CONSTANTS from '../../utils/Constants';

const ViewDetails = ({ open, closeForm, buttonActive, openEditDialog }) => {
    const classes = useStyles();
    const contact = useSelector((state) => state.contact);

    const [openArchiveContact, setOpenArchiveContact] = useState(false);
    const [contactStatus, setContactStatus] = useState('');
    const [contactType, setContactType] = useState('');
    const [contactProcessedData, setContactProcessedData] = useState([]);
    const [contactLocationProcessedData, setContactLocationProcessedData] = useState([]);


    //   useEffect(() => {
    //     if (!contact.reqLoading && Object.keys(contact.contactInfo).length > 0) {
    //       const type = CONSTANTS.CONTACT_TYPE.find((type) => type.code === contact.contactInfo.type);
    //       setContactType(type.text);

    //       let newContactPersonDataArr = [];
    //       let newContactPersonDataObj = {};

    //       let newContactLocationDataArr = [];
    //       let newContactLocationDataObj = {};
    //       let processedAddress;

    //       if (buttonActive === 'departments') {
    //         newContactPersonDataObj = {
    //           contact_person: contact.contactInfo.contact_person,
    //           contact_no: contact.contactInfo.contact_no,
    //           notes: 'N/A',
    //         };

    //         newContactPersonDataArr.push(newContactPersonDataObj);

    //         setContactProcessedData(newContactPersonDataArr);
    //       }

    //       if (buttonActive === 'employee') {
    //         newContactPersonDataObj = {
    //           contact_person: contact.contactInfo.contact_person,
    //           contact_no: contact.contactInfo.contact_no,
    //           department: contact.contactInfo.department,
    //         };

    //         newContactPersonDataArr.push(newContactPersonDataObj);

    //         setContactProcessedData(newContactPersonDataArr);
    //       }

    //       if (buttonActive !== 'partner_networks') {
    //         const addressUnit =
    //           contact.contactInfo.address_details.unit.length > 0 ? `${contact.contactInfo.address_details.unit} ` : '';
    //         const addressFloor =
    //           contact.contactInfo.address_details.floor_no.length > 0
    //             ? `${contact.contactInfo.address_details.floor_no} `
    //             : '';
    //         const addressZipcode =
    //           contact.contactInfo.address_details.zip_code !== 0 ? ` ${contact.contactInfo.address_details.zip_code}` : '';

    //         processedAddress = `${addressUnit}${addressFloor}${contact.contactInfo.address_details.building_name}, ${contact.contactInfo.address_details.street}, ${contact.contactInfo.address_details.barangay_label}, ${contact.contactInfo.address_details.city_label}, ${contact.contactInfo.address_details.province_label}, ${contact.contactInfo.address_details.country}${addressZipcode}`;

    //         console.log(processedAddress, 'PROCESSED ADDRESSED');

    //         newContactLocationDataObj = {
    //           address: processedAddress,
    //         };

    //         newContactLocationDataArr.push(newContactLocationDataObj);

    //         setContactLocationProcessedData(newContactLocationDataArr);
    //       }
    //     }
    //   }, [contact.contactInfo]);

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
            title: 'Address',
            field: 'address',
            sorting: false,
        },
    ];

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
                                        <Alert severity="success" classes={{ root: classes.contactDetailsStatus }}>
                                            Active
                                        </Alert>
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
                                                                {contact.contactInfo.code}
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
                                                                    buttonActive === 'departments'
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
                                                                    ? contactType
                                                                    : buttonActive === 'partner_networks'
                                                                        ? 'Partner Type'
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
                                                                {!!contact.contactInfo ? contact.contactInfo.name : null}
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
                                                                    columns={
                                                                        buttonActive === 'departments'
                                                                            ? tableColumn
                                                                            : buttonActive === 'employee'
                                                                                ? tableColumnEmployee
                                                                                : null
                                                                    }
                                                                    data={contactProcessedData}
                                                                    buttonActive={buttonActive}
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
                                                                    columns={tableColumnAddress}
                                                                    data={contactLocationProcessedData}
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

export default ViewDetails;
