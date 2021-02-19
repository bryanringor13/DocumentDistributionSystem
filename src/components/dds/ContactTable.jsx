/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import ContactDisplayTable from '../common/CommonTable/ContactDisplayTable';
import { Grid, TextField, Button, FormControl, NativeSelect, withStyles, InputBase } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import { TablePagination, TableCell } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import CommonSelect from '../common/CommonSelect/CommonSelect';
import { useSelector, useDispatch } from 'react-redux';
import * as REQ_TYPE from '../../utils/Constants';
import SearchDateFilter from './SearchDateFilter';
import PrimaryButton from '../common/Button/PrimaryButton';

import * as CONTACT from '../../store/actions/contactAction';

const useStyles = makeStyles(() => ({
  marginLeft: {
    marginLeft: '24px',
    marginTop: '20px',
    marginBottom: '20px',
  },
  alert: {
    padding: '6px 8px 6px 8px',
    width: 'fit-content',
    '& .MuiAlert-message': {
      padding: '0',
    },
  },
  searchWrapper: {
    maxWidth: '260px',
    width: '100%',
    position: 'relative',
    marginTop: '20px',
    // marginBottom: '20px',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& input': {
      padding: '10px 30px 10px 12px',
    },
  },
  searchField: {
    maxWidth: '282px',
  },
  contactBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnSearch: {
    position: 'absolute',
    opacity: '1',
    right: '13px',
    minWidth: '37px',
    minHeight: '40px',
  },
  searchWrapperContact: {
    display: 'flex',
  },
  commonSelectLocation: {
    height: '45px !important',
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const ContactTable = ({
  typeSelection,
  setTypeSelection,
  buttonActive,
  dialogOpen,
  handleOpenNewContact,
  openEditDialog,
  setTypeLabel,
  setTypeSelectionLabel,
  typeLabel,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const address_info = useSelector((state) => state.address);
  const contact = useSelector((state) => state.contact);

  // const [searchField, setSearchField] = useState(false);
  const [refreshTable, setRefreshTable] = useState(true);
  // const [buttonTrigger, setButtonTrigger] = useState(false);
  const [searchButton, setSearchButton] = useState(contact.searchParams.keyword);

  const tableColumn = [
    {
      title: 'Code',
      field: 'code',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Contact Person',
      field: 'contact_person',
    },
    {
      title: 'Contact No.',
      field: 'contact_no',
    },
    {
      title: 'Address',
      field: 'address',
    },
  ];

  const tableColumnPartner = [
    {
      title: 'Code',
      field: 'code',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Partner Type',
      field: 'partnerType',
    },
    {
      title: 'Contact Person',
      field: 'contact_person',
    },
    {
      title: 'Contact No.',
      field: 'contact_no',
    },
    {
      title: 'Address',
      field: 'address',
    },
  ];

  const tableColumnEmployee = [
    {
      title: 'Code',
      field: 'code',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Contact Person',
      field: 'contact_person',
    },
    {
      title: 'Department',
      field: 'department',
    },
    {
      title: 'Contact No.',
      field: 'contact_no',
    },
    {
      title: 'Address',
      field: 'address',
    },
    {
      title: 'Status',
      field: 'status',
      sorting: false,
    },
  ];

  const tableColumnDepartments = [
    {
      title: 'Code',
      field: 'code',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Contact Person',
      field: 'contact_person',
    },
    {
      title: 'Contact No.',
      field: 'contact_no',
    },
    {
      title: 'Address',
      field: 'address',
    },
    {
      title: 'Status',
      field: 'status',
      sorting: false,
    },
  ];

  const tableColumnBrokersAgents = [
    {
      title: 'Code',
      field: 'code',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Type',
      field: 'type',
    },
    {
      title: 'Broker/Agent',
      field: 'contact_person',
    },
    {
      title: 'Contact No.',
      field: 'contact_no',
    },
    {
      title: 'Address',
      field: 'address',
    },
    {
      title: 'Status',
      field: 'status',
      sorting: false,
    },
  ];

  const tableColumnIntellicareBranch = [
    {
      title: 'Code',
      field: 'code',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Contact Person',
      field: 'contact_person',
    },
    {
      title: 'Contact No.',
      field: 'contact_no',
    },
    {
      title: 'Address',
      field: 'address',
    },
    {
      title: 'Status',
      field: 'status',
      sorting: false,
    },
  ];

  const tableColumnOtherCompanies = [
    {
      title: 'Code',
      field: 'code',
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Contact Person',
      field: 'contact_person',
    },
    {
      title: 'Contact No.',
      field: 'contact_no',
    },
    {
      title: 'Address',
      field: 'address',
    },
    {
      title: 'Status',
      field: 'status',
      sorting: false,
    },
  ];

  const sampleDataOtherCompanies = [
    {
      code: 'MED12345',
      name: 'Medical Institute',
      contact_person: 'Jonh Doe',
      contact_no: '09123456789',
      address_details: {
        unit: '21',
        floor_no: '2F & 3F',
        building_name: 'Lead Bldg',
        street: 'Sto. Rosario',
        barangay_label: 'Abar',
        city_label: 'Angeles City',
        province_label: 'Pampanga',
        country: 'Philippines',
        zip_code: 2009,
      },
      status: 'ACTIVE',
    },
    {
      code: 'MED16543',
      name: 'Medical Institute',
      contact_person: 'Jane Doe',
      contact_no: '09123456788',
      address_details: {
        unit: '22',
        floor_no: '2F',
        building_name: 'Dan Bldg',
        street: 'Sto. Rosario',
        barangay_label: 'Bonifacio',
        city_label: 'Angeles City',
        province_label: 'Pampanga',
        country: 'Philippines',
        zip_code: 2009,
      },
      status: 'INACTIVE',
    },
  ];

  const sampleDataIntellicareBranch = [
    {
      code: 'MED12345',
      name: 'Medical Institute',
      contact_person: 'Johnny Bravissimo',
      contact_no: '09123456789',
      address_details: {
        unit: '21',
        floor_no: '2F & 3F',
        building_name: 'Lead Bldg',
        street: 'Sto. Rosario',
        barangay_label: 'Abar',
        city_label: 'Angeles City',
        province_label: 'Pampanga',
        country: 'Philippines',
        zip_code: 2009,
      },
      status: 'ACTIVE',
    },
    {
      code: 'MED16543',
      name: 'Medical Institute',
      contact_person: 'Johnny Bravissimo',
      contact_no: '09123456788',
      address_details: {
        unit: '22',
        floor_no: '2F',
        building_name: 'Dan Bldg',
        street: 'Sto. Rosario',
        barangay_label: 'Bonifacio',
        city_label: 'Angeles City',
        province_label: 'Pampanga',
        country: 'Philippines',
        zip_code: 2009,
      },
      status: 'INACTIVE',
    },
  ];

  const sampleData = [
    {
      code: 'CLI12345',
      name: 'Medical Institute',
      contact_person: 'John Doe',
      contact_no: '09123456789',
      address_details: {
        unit: '21',
        floor_no: '2F & 3F',
        building_name: 'Lead Bldg',
        street: 'Sto. Rosario',
        barangay_label: 'Abar',
        city_label: 'Angeles City',
        province_label: 'Pampanga',
        country: 'Philippines',
        zip_code: 2009,
      },
    },
    {
      code: 'CLI16543',
      name: 'Medical Institute',
      contact_person: 'Jane Doe',
      contact_no: '09123456788',
      address_details: {
        unit: '22',
        floor_no: '2F',
        building_name: 'Dan Bldg',
        street: 'Sto. Rosario',
        barangay_label: 'Bonifacio',
        city_label: 'Angeles City',
        province_label: 'Pampanga',
        country: 'Philippines',
        zip_code: 2009,
      },
    },
  ];

  const componentsPartner = {
    Cell: (props) => {
      // console.log('Cell: ', props)
      return (
        <TableCell>
          {props.columnDef.field === 'contact_person' && !!props.rowData.contacts
            ? props.rowData.contacts.length > 1
              ? `${
                  props.rowData.contacts[0].contactPerson.length > 0
                    ? props.rowData.contacts[0].contactPerson
                    : 'No contact name'
                }, +${props.rowData.contacts.length}`
              : props.rowData.contacts.length === 0
              ? 'No contact person'
              : props.rowData.contacts[0].contactPerson.length > 0
              ? props.rowData.contacts[0].contactPerson
              : 'No contact name'
            : props.columnDef.field === 'contact_person' && !!props.rowData.contact
            ? props.rowData.contact.contactPerson.length > 0
              ? props.rowData.contact.contactPerson
              : 'Contact name is not indicated'
            : props.columnDef.field === 'contact_no' && !!props.rowData.contacts
            ? props.rowData.contacts.length > 1
              ? `${
                  props.rowData.contacts[0].contactNumber.length > 0
                    ? props.rowData.contacts[0].contactNumber
                    : 'Contact number is not indicated'
                }, +${props.rowData.contacts.length}`
              : props.rowData.contacts.length === 0
              ? 'No contact number'
              : props.rowData.contacts[0].contactNumber.length > 0
              ? props.rowData.contacts[0].contactNumber
              : 'Contact number is not indicated'
            : props.columnDef.field === 'contact_no' && !!props.rowData.contact
            ? props.rowData.contact.contactNumber.length > 0
              ? props.rowData.contact.contactNumber
              : 'Contact number is not indicated'
            : props.columnDef.field === 'address' && !!props.rowData.addresses
            ? props.rowData.addresses.length > 1
              ? `${
                  props.rowData.addresses[0].full_address.length > 0
                    ? props.rowData.addresses[0].full_address
                    : 'Address is not indicated'
                }, + ${props.rowData.addresses.length}`
              : props.rowData.addresses.length === 0
              ? 'No address'
              : props.rowData.addresses[0].full_address.length > 0
              ? props.rowData.addresses[0].full_address
              : 'Address is not indicated'
            : props.columnDef.field === 'address' && !!props.rowData.address
            ? props.rowData.address.full_address.length > 0
              ? props.rowData.address.full_address
              : 'No address'
            : props.columnDef.field === 'partnerType'
            ? typeLabel
            : props.value}
        </TableCell>
      );
    },
  };

  const componentsTable = {
    Cell: (props) => {
      let finalAddress;

      if (props.rowData.address_details !== undefined) {
        const addressUnit =
          props.rowData.address_details.unit.length > 0 ? `${props.rowData.address_details.unit} ` : '';
        const addressFloor =
          props.rowData.address_details.floor_no.length > 0 ? `${props.rowData.address_details.floor_no}/F ` : '';
        const addressZipcode =
          props.rowData.address_details.zip_code !== 0 ? ` ${props.rowData.address_details.zip_code}` : '';

        finalAddress = `${addressUnit}${addressFloor}${props.rowData.address_details.building_name}, ${props.rowData.address_details.street}, ${props.rowData.address_details.barangay_label}, ${props.rowData.address_details.city_label}, ${props.rowData.address_details.province_label}, ${props.rowData.address_details.country}${addressZipcode}`;
      }

      return props.value === 'ACTIVE' && props.columnDef.title === 'Status' ? (
        <TableCell>
          {' '}
          <Alert className={classes.alert} severity="success">
            {REQ_TYPE.ACTIVE_STATUS[0].text}
          </Alert>{' '}
        </TableCell>
      ) : props.value === 'INACTIVE' && props.columnDef.title === 'Status' ? (
        <TableCell>
          {' '}
          <div className="custom-alert-info">
            <Alert className={classes.alert} severity="info">
              {REQ_TYPE.ACTIVE_STATUS[1].text}
            </Alert>
          </div>
        </TableCell>
      ) : props.columnDef.title === 'Address' ? (
        <TableCell>{finalAddress}</TableCell>
      ) : props.value === 'BROKERS' && props.columnDef.title === 'Type' && buttonActive === 'brokers_and_agents' ? (
        <TableCell>Broker</TableCell>
      ) : props.value === 'AGENTS' && props.columnDef.title === 'Type' && buttonActive === 'brokers_and_agents' ? (
        <TableCell>Agent</TableCell>
      ) : (
        <TableCell>{props.value}</TableCell>
      );
    },
    Action: (props) => {
      if (props.action.icon === 'edit') {
        return (
          <Button
            onClick={(event) => {
              props.action.onClick(event, props.data);
              event.stopPropagation();
            }}
            color="primary"
            variant="contained"
            style={{
              textTransform: 'none',
              minWidth: '34px',
              padding: '4px 8px',
            }}
            size="small"
            data-cy="edit_btn"
          >
            Edit
          </Button>
        );
      }
    },
    Pagination: (props) => (
      <>
        <TablePagination {...props} rowsPerPageOptions={[10, 20, 30]} />
      </>
    ),
  };

  const dialogEditOpen = (data) => {
    console.log(data, 'TABLE DATA');
    dispatch(CONTACT.viewContactDetails(data._id, buttonActive));
    openEditDialog(true, true);
  };

  const tableAction = [
    {
      icon: 'edit',
      tooltip: 'edit',
      onClick: (event, rowData) => dialogEditOpen(rowData),
    },
  ];

  const onChangeLocation = (e) => {
    const location = address_info.himsNcrCity.find((item) => item.label === e.target.value);
    console.log(location, 'testtt');
  };

  const refreshTableHandler = (toggle) => {
    // console.log(toggle, 'Refresh Table')
    setRefreshTable(toggle);
  };

  const searchHandler = (filter) => {
    setSearchButton(filter);
    if (filter.length < 1) {
      dispatch(CONTACT.setContactSearch('', buttonActive));
      // if (buttonTrigger) {
      //   // dispatch(ACTION.getFilterRequest(''));
      //   // refreshTableHandler(true);
      //   setButtonTrigger(false);
      // }
    }
    // setSearchField(false);
  };
  const searchHandlerButton = () => {
    dispatch(CONTACT.setContactSearch(searchButton, buttonActive));
    // dispatch(ACTION.getFilterRequest(searchButton));
    // setButtonTrigger(true);
    // refreshTableHandler(true);
  };

  const filterStatusHandler = (status) => {
    dispatch(CONTACT.setContactFilterStatus(status, buttonActive));
  };

  const filterTypeHandler = (type) => {
    if (buttonActive === 'partner_networks') {
      const splitString = type.split('.'); // [0] Code, [1] type
      // console.log('filterTypeHandler: ', splitString[0], splitString[1]);
      console.log('Filter Type: ', splitString);
      setTypeSelection(parseInt(splitString[0]));
      setTypeLabel(splitString[2]);
      setTypeSelectionLabel(splitString[1]);
      if (splitString[0] > 0) dispatch(CONTACT.setContactFilterType(splitString[1], buttonActive));
    }

    if (buttonActive === 'brokers_and_agents') {
      dispatch(CONTACT.setContactFilterType(type, buttonActive));
    }
  };

  return (
    <>
      <Grid item>
        <div className={`${classes.searchWrapperContact} contact-flex`}>
          {buttonActive === 'clients' ? (
            <>
              <div className={classes.searchWrapper}>
                <TextField
                  id="outlined-start-adornment"
                  className="search-field"
                  placeholder="Search..."
                  // value={props.searchButton}
                  // onChange={(e) => props.searchHandler(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      // props.searchHandlerButton(props.searchButton);
                    }
                  }}
                  variant="outlined"
                  inputProps={{ 'data-cy': 'search' }}
                />
                <Button
                  // onClick={() => props.searchHandlerButton(props.searchButton)}
                  className={classes.btnSearch}
                  data-cy="search_icon"
                >
                  {''}
                </Button>
              </div>
              <div className={classes.marginLeft}>
                <CommonSelect
                  id="allLocation"
                  onChange={onChangeLocation}
                  item={address_info.himsNcrCityLabel}
                  rootClass={classes.commonSelectLocation}
                />
              </div>
            </>
          ) : buttonActive === 'partner_networks' ? (
            <>
              <div className={classes.searchWrapper}>
                <TextField
                  id="outlined-start-adornment"
                  className="search-field"
                  placeholder="Search..."
                  // value={props.searchButton}
                  // onChange={(e) => props.searchHandler(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      // props.searchHandlerButton(props.searchButton);
                    }
                  }}
                  variant="outlined"
                  inputProps={{ 'data-cy': 'search' }}
                />
                <Button
                  // onClick={() => props.searchHandlerButton(props.searchButton)}
                  className={classes.btnSearch}
                  data-cy="search_icon"
                >
                  {''}
                </Button>
              </div>

              <div className={classes.marginLeft}>
                <Grid item>
                  <FormControl style={{ width: '200px' }}>
                    <NativeSelect
                      input={<BootstrapInput />}
                      onChange={(event) => filterTypeHandler(event.target.value)}
                    >
                      {REQ_TYPE.PARTNER_TYPE.map((status, index) => (
                        <>
                          <option
                            key={index}
                            selected={typeSelection === status.code ? true : false}
                            value={`${status.code}.${status.type}.${status.text}`}
                          >
                            {status.text}
                          </option>
                        </>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Grid>
              </div>
            </>
          ) : buttonActive === 'employee' ||
            buttonActive === 'departments' ||
            buttonActive === 'brokers_and_agents' ||
            buttonActive === 'other_companies' ||
            buttonActive === 'intellicare_branch' ? (
            <Grid container style={{ marginTop: 20 }}>
              <Grid item sm={9}>
                <SearchDateFilter
                  buttonActive={buttonActive}
                  searchHandler={searchHandler}
                  searchHandlerButton={searchHandlerButton}
                  filterStatusHandler={filterStatusHandler}
                  filterTypeHandler={filterTypeHandler}
                  searchButton={searchButton}
                />
              </Grid>
              <Grid item sm={3}>
                <div className={classes.contactBtnWrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenNewContact(true)}
                    data-cy="new_request_btn"
                  >
                    Add Contact <AddIcon style={{ height: '0.6em' }} />
                  </Button>
                </div>
              </Grid>
            </Grid>
          ) : null}
        </div>
      </Grid>
      <ContactDisplayTable
        columns={
          buttonActive === 'clients'
            ? tableColumn
            : buttonActive === 'partner_networks'
            ? tableColumnPartner
            : buttonActive === 'employee'
            ? tableColumnEmployee
            : buttonActive === 'departments'
            ? tableColumnDepartments
            : buttonActive === 'brokers_and_agents'
            ? tableColumnBrokersAgents
            : buttonActive === 'other_companies'
            ? tableColumnOtherCompanies
            : buttonActive === 'intellicare_branch'
            ? tableColumnIntellicareBranch
            : null
        }
        actions={buttonActive === 'partner_networks' ? false : tableAction}
        components={
          buttonActive === 'clients' ||
          buttonActive === 'employee' ||
          buttonActive === 'departments' ||
          buttonActive === 'brokers_and_agents' ||
          buttonActive === 'other_companies' ||
          buttonActive === 'intellicare_branch'
            ? componentsTable
            : buttonActive === 'partner_networks' && contact.contactData.length > 0
            ? componentsPartner
            : []
        }
        onRowClick={(rowData) => dialogOpen(rowData)}
        data={
          buttonActive === 'clients'
            ? sampleData
            : buttonActive === 'partner_networks'
            ? contact.contactData
            : buttonActive === 'employee'
            ? contact.contactData
            : buttonActive === 'departments'
            ? contact.contactData
            : buttonActive === 'brokers_and_agents'
            ? contact.contactData
            : buttonActive === 'other_companies'
            ? sampleDataOtherCompanies
            : buttonActive === 'intellicare_branch'
            ? sampleDataIntellicareBranch
            : null
        }
        buttonActive={buttonActive}
      />
    </>
  );
};

export default ContactTable;
