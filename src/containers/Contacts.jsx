import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, ButtonGroup, Button } from '@material-ui/core';

import Title from '../components/common/Title';
import Layout from '../components/Layout';
import ContactTable from '../components/dds/ContactTable';
import Loading from '../components/common/Loading';
import ContactViewDetails from '../components/dds/ContactViewDetails';
import NewContact from '../components/dds/NewContact';
import EditContact from '../components/dds/EditContact';

import * as CONTACT from '../store/actions/contactAction';

const useStyles = makeStyles(() => ({
  messengerWrapper: {
    display: 'flex',
  },
  contactBtnGroup: {
    '& button': {
      padding: '5px 20px',
      border: '1px solid #e0e6ed',
    },
  },
}));

const Contacts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact);
  const [buttonActive, setButtonActive] = useState('clients');
  console.log(contact, 'contact');
  const handleChange = (name) => {
    setButtonActive(name);
    dispatch(CONTACT.clearContactSearch());
  };

  const [openForm, setOpenForm] = useState(false);
  // const [partnerNetworkType, setPartnerNetworkType] = useState({});
  const [openNewContact, setOpenNewContact] = useState(false);
  const [openEditContact, setOpenEditContact] = useState(false);
  const [typeSelection, setTypeSelection] = useState(1);
  const [typeLabel, setTypeLabel] = useState('Doctor');
  const [typeSelectionLabel, setTypeSelectionLabel] = useState('doctors_dentists');

  const dialogOpen = (data) => {
    setOpenForm(true);
    console.log('Dialog Open: ', data);
    // console.log('Dialog Form', data);
    console.log('Dialog Open: ', data, buttonActive);

    // if (buttonActive === 'employee') {
    // dispatch(CONTACT.viewContactDetails(data.code, buttonActive));
    // } else if (buttonActive === 'departments') {
    //   dispatch(CONTACT.viewContactDetails(data._id, buttonActive));
    // }

    if (buttonActive === 'partner_networks') {
      dispatch(CONTACT.viewContactDetails(data.code, buttonActive));
    } else {
      dispatch(CONTACT.viewContactDetails(data._id, buttonActive));
    }
  };

  const contactViewDetails = () => {
    setOpenForm(false);

    dispatch(CONTACT.allContact(buttonActive));
  };

  const handleOpenNewContact = (bool) => {
    setOpenNewContact(bool);
  };

  // const [editData, setEditData] = useState(null);
  const openEditDialog = (bool, clearDetails) => {
    // setEditData(data);
    if (clearDetails) {
      dispatch(CONTACT.clearContactDetails());
    }
    setOpenEditContact(bool);
  };

  useEffect(() => {
    if (buttonActive === 'employee' || buttonActive === 'departments' || buttonActive === 'partner_networks') {
      dispatch(CONTACT.allContact(buttonActive));
    } else if (buttonActive === 'brokers_and_agents') {
      dispatch(CONTACT.allContact(buttonActive));
    }
  }, [buttonActive]);

  useEffect(() => {
    return () => {
      dispatch(CONTACT.clearContactSearch());
    };
  }, []);

  console.log(contact, 'CONTACT REDUX');

  return (
    <Layout>
      <Grid item className={classes.messengerWrapper} sm={12}>
        <Grid item sm={6}>
          <Title>Contacts</Title>
        </Grid>
      </Grid>
      {!contact.reqLoading ? (
        <>
          <Grid container style={{ marginTop: 30 }}>
            <Grid
              item
              style={{
                display: 'flex',
                width: '100%',
              }}
            >
              <div>
                <ButtonGroup
                  aria-label="outlined button group"
                  style={{ backgroundColor: 'white' }}
                  className={classes.contactBtnGroup}
                >
                  <Button
                    name="clients"
                    disabled={buttonActive === 'clients' ? true : false}
                    variant={buttonActive === 'clients' ? 'contained' : null}
                    onClick={(event) => handleChange(event.currentTarget.getAttribute('name'))}
                  >
                    Clients
                  </Button>
                  <Button
                    name="partner_networks"
                    disabled={buttonActive === 'partner_networks' ? true : false}
                    variant={buttonActive === 'partner_networks' ? 'contained' : null}
                    onClick={(event) => handleChange(event.currentTarget.getAttribute('name'))}
                  >
                    Partner Networks
                  </Button>
                  <Button
                    name="brokers_and_agents"
                    disabled={buttonActive === 'brokers_and_agents' ? true : false}
                    variant={buttonActive === 'brokers_and_agents' ? 'contained' : null}
                    onClick={(event) => handleChange(event.currentTarget.getAttribute('name'))}
                  >
                    Brokers & Agents
                  </Button>
                  <Button
                    name="intellicare_branch"
                    disabled={buttonActive === 'intellicare_branch' ? true : false}
                    variant={buttonActive === 'intellicare_branch' ? 'contained' : null}
                    onClick={(event) => handleChange(event.currentTarget.getAttribute('name'))}
                  >
                    Intellicare Branch
                  </Button>
                  <Button
                    name="departments"
                    disabled={buttonActive === 'departments' ? true : false}
                    variant={buttonActive === 'departments' ? 'contained' : null}
                    onClick={(event) => handleChange(event.currentTarget.getAttribute('name'))}
                  >
                    Departments
                  </Button>
                  <Button
                    name="employee"
                    disabled={buttonActive === 'employee' ? true : false}
                    variant={buttonActive === 'employee' ? 'contained' : null}
                    onClick={(event) => handleChange(event.currentTarget.getAttribute('name'))}
                  >
                    Employees
                  </Button>
                  <Button
                    name="other_companies"
                    disabled={buttonActive === 'other_companies' ? true : false}
                    variant={buttonActive === 'other_companies' ? 'contained' : null}
                    onClick={(event) => handleChange(event.currentTarget.getAttribute('name'))}
                  >
                    Other Companies
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
          <ContactTable
            typeSelection={typeSelection}
            typeLabel={typeLabel}
            setTypeLabel={setTypeLabel}
            setTypeSelection={setTypeSelection}
            setTypeSelectionLabel={setTypeSelectionLabel}
            buttonActive={buttonActive}
            dialogOpen={dialogOpen}
            handleOpenNewContact={handleOpenNewContact}
            openEditDialog={openEditDialog}
          />
        </>
      ) : (
        <Loading />
      )}

      {openForm && (
        <ContactViewDetails
          closeForm={contactViewDetails}
          buttonActive={buttonActive}
          typeLabel={typeLabel}
          typeSelectionLabel={typeSelectionLabel}
          open={openForm}
          openEditContact={openEditContact}
          openEditDialog={openEditDialog}
        />
      )}

      {openNewContact && (
        <NewContact
          open={openNewContact}
          handleOpenNewContact={handleOpenNewContact}
          buttonActive={buttonActive}
          setOpenFormView={setOpenForm}
        />
      )}

      {openEditContact && (
        <EditContact
          open={openEditContact}
          buttonActive={buttonActive}
          handleOpenEditContact={openEditDialog}
          setOpentContactDetails={setOpenForm}
        />
      )}

      {/* Contacts View Details */}
      {/* {contactDetails && <ContactsAction />} */}
    </Layout>
  );
};

export default Contacts;
