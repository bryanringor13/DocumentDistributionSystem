/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

import PrimaryButton from '../common/Button/PrimaryButton';
import SecondaryButton from '../common/Button/SecondaryButton';

import * as CONSTANTS from '../../utils/Constants';

import * as ADDRESS from '../../store/actions/addressActions';
import * as CONTACT from '../../store/actions/contactAction';

const useStyles = makeStyles((theme) => ({
  newContactRoot: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  iconClose: {
    width: '48px',
    height: '48px',
    fontSize: '2rem',
    color: '#2f3542',
    background: '#fff',
    boxShadow: 'none',
    border: '1px solid rgba(47, 53, 66, 0.4)',
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
  newContactColumnWidth: {
    maxWidth: '389px',
  },
  newContactTitleWrapper: {
    display: 'flex',
  },
  newContactTitle: {
    marginRight: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '40px',
  },
  newContactNote: {
    fontSize: '12px',
    fontWeight: '300',
  },
  btnActionWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  btnOutlined: {
    marginRight: '15px',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContentPadding: {
    padding: theme.spacing(0, 2),
  },
  headerBG: {
    backgroundColor: '#f4f6f9',
  },
  contentItemStyle: {
    marginTop: '4px',
  },
  contentItemSelect: {
    marginBottom: '22px',
  },
  contentSubText: {
    fontSize: '14px',
    lineHeight: '24px',
    color: 'rgba(43, 45, 51, 0.8)',
  },
  contactDetailsStatus: {
    padding: '0',
    minWidth: '85px',
    fontWeight: 'bold',
  },
  codeFieldRoot: {
    pointerEvents: 'none',
    '& .MuiOutlinedInput-input': {
      backgroundColor: '#e0e6ed',
    },
  },
  countryFieldRoot: {
    pointerEvents: 'none',
    '& .MuiOutlinedInput-input': {
      backgroundColor: '#e0e6ed',
    },
  },
  btnSaveWrapper: {
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
  errorHelperTextRoot: {
    color: '#fa5656',
  },
  errorSelectField: {
    border: '1px solid #fa5656 !important',

    '&:focus': {
      boxShadow: '0 0 4px rgba(250, 86, 86, 0.65) !important',
    },
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

const EditContact = ({ open, handleOpenEditContact, buttonActive, setOpentContactDetails }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const address_info = useSelector((state) => state.address);
  const contact = useSelector((state) => state.contact);

  const [addressLoaded, setAddressLoaded] = useState(false);

  // if (!addressLoaded) {
  //   dispatch(ADDRESS.getHimsAllProvince());
  //   setAddressLoaded(true);
  // }
  useEffect(() => {
    if (!addressLoaded) {
      setAddressLoaded(true);
      dispatch(ADDRESS.getHimsAllProvince());
    }
  }, []);

  const handleClose = () => {
    handleOpenEditContact(false);
  };

  const [btnSaveDisable, setBtnSaveDisable] = useState(true);

  const validateFieldList = {
    // contact_code: true,
    contact_name: false,
    contact_person: false,
    department: false,
    contact_number: false,
    floor_no: false,
    building_name: false,
    street: false,
    zip_code: false,
  };

  const [validationState, setValidationState] = useState(validateFieldList);

  const changeValidateStatus = (name, response, oItem = null, oResponse = null) => {
    const setNewValidState = { ...validationState };
    if (oItem !== null) {
      setNewValidState[oItem] = oResponse;
    }
    setNewValidState[name] = response;

    setValidationState(setNewValidState);
  };

  // Validate of Contact Details
  // const [contactCodeNotValid, setContactCodeNotValid] = useState(false);
  const [contactNameNotValid, setContactNameNotValid] = useState(false);
  const [contactPersonNotValid, setContactPersonNotValid] = useState(false);
  const [contactDeptNotValid, setContactDeptNotValid] = useState(false);
  const [contactNumberNotValid, setContactNumberNotValid] = useState(false);
  const [contactCompanyNotValid, setContactCompanyNotValid] = useState(false);
  const [contactBrokerAgentNotValid, setContactBrokerAgentNotValid] = useState(false);
  const [contactTypeNotValid, setContactTypeNotValid] = useState(false);

  // Contact Details
  const [contactCode, setContactCode] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactDept, setContactDept] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactBrokerAgent, setContactBrokerAgent] = useState('');
  const [contactType, setContactType] = useState('');

  // Address Details
  const [stateProvince, setStateProvince] = useState('');
  const [cityMunicipality, setCityMunicipality] = useState('');
  const [brgy, setBrgy] = useState('');
  const [stateProvinceIndex, setStateProvinceIndex] = useState(0);
  const [cityMunicipalityIndex, setCityMunicipalityIndex] = useState(0);
  const [brgyIndex, setBrgyIndex] = useState(0);
  const [unit, setUnit] = useState('');
  const [floorNo, setFloorNo] = useState('');
  const [buildName, setBuildName] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState(0);

  const [boolFloorNo, setBoolFloorNo] = useState(false);
  const [boolBuildName, setBoolBuildName] = useState(false);
  const [boolStreet, setBoolStreet] = useState(false);
  const [boolZipCode, setBoolZipCode] = useState(false);

  const setCity = (event) => {
    // const name = event.target.options[event.target.selectedIndex].text;
    const splitvalue = event.target.value.split(',');
    const value = splitvalue[0];
    const valueIndex = splitvalue[1];
    setStateProvince(splitvalue);
    // setStateProvinceLabel(name);
    setStateProvinceIndex(valueIndex);

    dispatch(ADDRESS.getHimsCityAndBarangay(value));
  };

  const setBarangay = (event) => {
    // const name = event.target.options[event.target.selectedIndex].text;
    const splitvalue = event.target.value.split(',');
    const value = splitvalue[0];
    const valueIndex = splitvalue[1];
    setCityMunicipality(splitvalue);
    // setCityMunicipalityLabel(name);
    setCityMunicipalityIndex(valueIndex);

    dispatch(ADDRESS.getHimsBarangay(value));
  };

  const barangayValidation = (event) => {
    // var valid = false;
    // const name = event.target.options[event.target.selectedIndex].text;
    const splitvalue = event.target.value.split(',');

    const valueIndex = splitvalue[1];

    setBrgy(splitvalue);
    // setBrgyLabel(name);
    setBrgyIndex(valueIndex);
  };

  const unitHandler = (event) => {
    const value = event.target.value;
    setUnit(value);
  };

  // Validate Floor No.
  const [boolFloorNoErrorMessage, setboolFloorNoErrorMessage] = useState('');
  const floorNoValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
      setboolFloorNoErrorMessage(<span data-cy="floor_no_error">Floor No. is required</span>);
    }

    setFloorNo(value);
    setBoolFloorNo(valid);
    changeValidateStatus(name, valid);
  };

  // Validate Building Name
  const [boolBuildNameErrorMessage, setboolBuildNameErrorMessage] = useState('');
  const buildNameValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
      setboolBuildNameErrorMessage(<span data-cy="building_name_error">Building Name is required</span>);
    }

    setBuildName(value);
    setBoolBuildName(valid);
    changeValidateStatus(name, valid);
  };

  // Validate Street
  const [boolStreetErrorMessage, setboolStreetErrorMessage] = useState('');
  const streetValidation = (event) => {
    let valid = false;
    const name = event.target.name;
    const value = event.target.value;
    if (value) {
    } else {
      valid = true;
      setboolStreetErrorMessage(<span data-cy="street_error">Street is required</span>);
    }

    setStreet(value);
    setBoolStreet(valid);
    changeValidateStatus(name, valid);
  };

  // validation for Barangay
  const [boolZipCodeErrorMessage, setboolZipCodeErrorMessage] = useState('');
  const zipCodeValidation = (event, name) => {
    let valid = false;
    const value = event.target.value;
    let message = null;
    if (value) {
      if (isNaN(value)) {
        valid = true;
        message = 'Invalid Zip Code';
        setZipCode(0);
      } else {
        if (parseInt(value) <= 0) {
          valid = true;
          message = 'Invalid Zip Code';
          setZipCode(0);
        } else {
          setZipCode(value);
        }
      }
    } else {
      setZipCode(0);
    }

    setBoolZipCode(valid);
    setboolZipCodeErrorMessage(message);
    changeValidateStatus(name, valid);
  };
  //End of Address Details

  // Validate Contact Code
  // const [contactCodeError, setContactCodeError] = useState('');
  // const contactCodeValidation = (event) => {
  //   let valid = false;
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   if (value) {
  //   } else {
  //     valid = true;
  //     setContactCodeError(<span>Code is required</span>);
  //   }

  //   setContactCode(value);
  //   setContactCodeNotValid(valid);
  //   changeValidateStatus(name, valid);
  // };

  // Validate Contact Name
  const [contactNameError, setContactNameError] = useState('');
  const contactNameValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
      setContactNameError(<span>Name is required</span>);
    }

    setContactName(value);
    setContactNameNotValid(valid);
    changeValidateStatus(name, valid);
  };

  // Validate Contact Person
  const [contactPersonError, setContactPersonError] = useState('');
  const contactPersonValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
      setContactPersonError(<span>Contact Person is required</span>);
    }

    setContactPerson(value);
    setContactPersonNotValid(valid);
    changeValidateStatus(name, valid);
  };

  // Validate Contact Department
  const [contactDeptError, setContactDeptError] = useState('');
  const contactDeptValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
      setContactDeptError(<span>Department is required</span>);
    }

    setContactDept(value);
    setContactDeptNotValid(valid);
    changeValidateStatus(name, valid);
  };

  // Validate Contact Number
  const [contactNumberError, setContactNumberError] = useState('');
  const contactNumberValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    let message = null;

    if (value) {
      if (isNaN(value)) {
        valid = true;
        message = 'Invalid Contact Number';
      } else {
        if (parseInt(value) <= 0) {
          valid = true;
          message = 'Invalid Contact Number';
        } else if (value.toString().length > 0 && value.toString().length < 7) {
          valid = true;
          message = 'Invalid Contact Number';
        }
      }
    } else {
      message = <span>Contact Number is required</span>;
      valid = true;
    }

    setContactNumber(value);
    setContactNumberNotValid(valid);
    setContactNumberError(message);
    changeValidateStatus(name, valid);
  };

  // Validate Contact Company
  const [contactCompanyError, setContactCompanyError] = useState('');
  const contactCompanyValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
      setContactCompanyError(<span>Company is required</span>);
    }

    setContactCompany(value);
    setContactCompanyNotValid(valid);
    changeValidateStatus(name, valid);
  };

  // Validate Contact Broker/Agent
  const [contactBrokerAgentError, setContactBrokerAgentError] = useState('');
  const contactBrokerAgentValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
      setContactBrokerAgentError(<span>Broker/Agent is required</span>);
    }

    setContactBrokerAgent(value);
    setContactBrokerAgentNotValid(valid);
    changeValidateStatus(name, valid);
  };

  // Validate Contact Type
  const contactTypeValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
    }

    setContactType(value);
    setContactTypeNotValid(valid);
    changeValidateStatus(name, valid);
  };

  const [renderAddress, setRenderAddress] = useState(false);
  useEffect(() => {
    if (!renderAddress && !!contact.contactInfo && !!contact.contactInfo.address_details) {
      setRenderAddress(true);
      console.log('useEffect: renderAddress: ', true, ', Contact: ', contact);
      setContactCode(contact.contactInfo.code);
      setContactName(contact.contactInfo.name);
      setContactPerson(contact.contactInfo.contact_person);
      setContactDept(contact.contactInfo.department);
      setContactNumber(contact.contactInfo.contact_no);

      setUnit(contact.contactInfo.address_details.unit);
      setFloorNo(contact.contactInfo.address_details.floor_no);
      setBuildName(contact.contactInfo.address_details.building_name);
      setStreet(contact.contactInfo.address_details.street);
      setZipCode(contact.contactInfo.address_details.zip_code);
    }
  }, [contact.contactInfo]);

  // useEffect(() => {
  //   console.log(
  //     'Edit Contact: useEffect [contact.contactInfo], ',
  //     contact,
  //     contact.contactInfo,
  //     contact.contactInfo.address_details
  //   );
  //   if (!!contact.contactInfo.address_details) {
  //     const hasValue = Object.values(validationState).includes(true);
  //     setBtnSaveDisable(hasValue);

  //     console.log(address_info, 'HIMS ADDRESS INFO');

  //     if (!!address_info && address_info.himsProvinces) {
  //       if (address_info.himsProvinces !== null) {
  //         if (stateProvince) {
  //           // State Province
  //         } else {
  //           // dispatch(ADDRESS.getHimsCityAndBarangay(address_info.himsProvinces[0].name));

  //           // setStateProvince(address_info.himsProvinces[0].name + ',' + 0);
  //           // setStateProvinceIndex(0);

  //           const currState = address_info.himsProvinces.find(
  //             (state) => state.id === contact.contactInfo.address_details.province
  //           );
  //           const currStateIndex = address_info.himsProvinces.indexOf(currState);

  //           dispatch(ADDRESS.getHimsCityAndBarangay(currState.name));

  //           setStateProvince(currState.name + ',' + currStateIndex);
  //           setStateProvinceIndex(currStateIndex);
  //         }
  //       }
  //     }

  //     if (!!address_info && address_info.himsCity) {
  //       if (address_info.himsCity !== null) {
  //         if (cityMunicipality) {
  //         } else {
  //           // dispatch(ADDRESS.getHimsBarangay(address_info.himsCity[0].name));

  //           // setCityMunicipality(address_info.himsCity[0].name + ',' + 0);
  //           // setCityMunicipalityIndex(0);

  //           const currCity = address_info.himsCity.find((city) => city.id === contact.contactInfo.address_details.city);
  //           const currCityIndex = address_info.himsCity.indexOf(currCity);

  //           dispatch(ADDRESS.getHimsBarangay(currCity.name));

  //           setCityMunicipality(currCity.name + ',' + currCityIndex);
  //           setCityMunicipalityIndex(currCityIndex);
  //         }
  //       }
  //     }

  //     if (!!address_info && address_info.himsBarangay && address_info.himsCity) {
  //       if (address_info.himsBarangay !== null) {
  //         if (brgy) {
  //         } else {
  //           // dispatch(ADDRESS.getHimsBarangay(address_info.himsCity[0].name));

  //           // setBrgy(address_info.himsBarangay[0].name + ',' + 0);
  //           // setBrgyIndex(0);

  //           const currBarangay = address_info.himsBarangay.find(
  //             (barangay) => barangay.id === contact.contactInfo.address_details.barangay
  //           );

  //           const currBarangayIndex = address_info.himsBarangay.indexOf(currBarangay);

  //           setBrgy(currBarangay.name + ',' + currBarangayIndex);
  //           setBrgyIndex(currBarangayIndex);
  //         }
  //       }
  //     }
  //   }
  // }, [
  //   contact.contactInfo.address_details,
  //   address_info,
  //   brgy,
  //   cityMunicipality,
  //   dispatch,
  //   stateProvince,
  //   validationState,
  // ]);

  const [stateProvinceOnSet, setStateProvinceOnSet] = useState(false);
  useEffect(() => {
    if (!stateProvinceOnSet && !!address_info.himsProvinces && !!contact.contactInfo.address_details) {
      setStateProvinceOnSet(true);
      // if (stateProvince) {
      // State Province
      // } else {
      // dispatch(ADDRESS.getHimsCityAndBarangay(address_info.himsProvinces[0].name));

      // setStateProvince(address_info.himsProvinces[0].name + ',' + 0);
      // setStateProvinceIndex(0);

      const currState = address_info.himsProvinces.find(
        (state) => state.id === contact.contactInfo.address_details.province
      );
      if (currState) {
        const currStateIndex = address_info.himsProvinces.indexOf(currState);
        console.log('Setting up Province', currState);
        dispatch(ADDRESS.getHimsCity(currState.name));
        setStateProvince(currState.name + ',' + currStateIndex);
        setStateProvinceIndex(currStateIndex);
      }
      // }
    }
  }, [address_info.himsProvinces, contact.contactInfo]);

  const [cityMunicipalityOnSet, setCityMunicipalityOnSet] = useState(false);
  useEffect(() => {
    if (!cityMunicipalityOnSet && !!address_info.himsCity && !!contact.contactInfo.address_details) {
      setCityMunicipalityOnSet(true);
      // dispatch(ADDRESS.getHimsBarangay(address_info.himsCity[0].name));

      // setCityMunicipality(address_info.himsCity[0].name + ',' + 0);
      // setCityMunicipalityIndex(0);

      const currCity = address_info.himsCity.find((city) => city.id === contact.contactInfo.address_details.city);
      if (currCity) {
        const currCityIndex = address_info.himsCity.indexOf(currCity);

        console.log('Setting up City', currCity);
        dispatch(ADDRESS.getHimsBarangay(currCity.name));
        setCityMunicipality(currCity.name + ',' + currCityIndex);
        setCityMunicipalityIndex(currCityIndex);
      }
    }
  }, [address_info.himsCity, contact.contactInfo]);

  const [barangayOnSet, setBarangayOnSet] = useState(false);
  useEffect(() => {
    if (!barangayOnSet && !!address_info.himsBarangay && !!contact.contactInfo.address_details) {
      setBarangayOnSet(true);
      // dispatch(ADDRESS.getHimsBarangay(address_info.himsCity[0].name));

      // setCityMunicipality(address_info.himsCity[0].name + ',' + 0);
      // setCityMunicipalityIndex(0);

      const currBarangay = address_info.himsBarangay.find(
        (barangay) => barangay.id === contact.contactInfo.address_details.barangay
      );
      if (currBarangay) {
        console.log('Setting up Barangay', currBarangay);
        const currBarangayIndex = address_info.himsBarangay.indexOf(currBarangay);
        setBrgy(currBarangay.name + ',' + currBarangayIndex);
        setBrgyIndex(currBarangayIndex);
      }
    }
  }, [address_info.himsBarangay, contact.contactInfo]);

  useEffect(() => {
    if (
      contactName &&
      contactName.length > 0 &&
      contactPerson &&
      contactPerson.length > 0 &&
      contactNumber &&
      contactNumber.length > 6 &&
      floorNo &&
      floorNo.length > 0 &&
      buildName &&
      buildName.length > 0 &&
      street &&
      street.length > 0 &&
      !!address_info.himsProvinces &&
      !!address_info.himsCity &&
      !!address_info.himsBarangay
    ) {
      setBtnSaveDisable(false);
      if (!!contact.contactInfo && !!contact.contactInfo.department) {
        if (contactDept && contactDept.length > 0) {
          setBtnSaveDisable(false);
        } else {
          setBtnSaveDisable(true);
        }
      }
    } else {
      setBtnSaveDisable(true);
    }
  }, [
    contactName,
    contactPerson,
    contactDept,
    contactNumber,
    floorNo,
    buildName,
    street,
    address_info.himsProvinces,
    address_info.himsCity,
    address_info.himsBarangay,
  ]);

  useEffect(() => {
    return () => {
      dispatch(ADDRESS.clearHimsAddress());
    };
  }, []);

  const handleSaveContact = () => {
    const newContact = {
      name: contactName,
      contact_person: contactPerson,
      department: contactDept,
      contact_no: contactNumber,
      address_details: {
        unit: unit,
        floor_no: floorNo,
        building_name: buildName,
        street: street,
        zip_code: zipCode,
        province: address_info.himsProvinces[stateProvinceIndex].id,
        city: address_info.himsCity[cityMunicipalityIndex].id,
        barangay: address_info.himsBarangay[brgyIndex].id,
      },
    };

    if (buttonActive !== 'employee') {
      delete newContact.department;
    }

    console.log(newContact, 'NEW CONTACT DATA');

    dispatch(
      CONTACT.saveEditContact(
        contact.contactInfo._id,
        newContact,
        buttonActive,
        handleOpenEditContact,
        setOpentContactDetails
      )
    );
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <div className={classes.newContactRoot}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="flex-end">
              <Grid item={12}>
                <Fab className={classes.iconClose} onClick={handleClose} aria-label="close">
                  <ClearSharpIcon fontSize="large" />
                </Fab>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
              <Grid item xs={7}>
                <form noValidate autoComplete="off">
                  <Grid container alignItems="center" justify="center" spacing={2}>
                    <Grid item xs={6} className={classes.newContactColumnWidth}>
                      <div className={classes.newContactTitleWrapper}>
                        <div className={classes.newContactTitle}>Contact Details</div>
                        {buttonActive !== 'clients' &&
                          buttonActive !== 'partner_networks' &&
                          (contact.contactInfo.status === 'ACTIVE' ? (
                            <Alert severity="success" classes={{ root: classes.contactDetailsStatus }}>
                              Active
                            </Alert>
                          ) : (
                            <div className="custom-alert-info">
                              <Alert severity="info" classes={{ root: classes.contactDetailsStatus }}>
                                Inactive
                              </Alert>
                            </div>
                          ))}
                      </div>
                      <div className={classes.newContactNote}>All fields are required unless otherwise stated</div>
                    </Grid>
                    <Grid item xs={6} className={classes.newContactColumnWidth}>
                      <div className={classes.btnActionWrapper}>
                        <SecondaryButton
                          onClick={handleClose}
                          disabled={contact.reqLoading}
                          customClass={classes.btnOutlined}
                        >
                          Cancel
                        </SecondaryButton>
                        <div className={classes.btnSaveWrapper}>
                          <PrimaryButton
                            onClick={handleSaveContact}
                            disabled={
                              btnSaveDisable ||
                              contact.reqLoading ||
                              address_info.himsLoadingCity ||
                              address_info.himsLoadingBarangay
                                ? true
                                : false
                            }
                          >
                            Save
                          </PrimaryButton>
                          {contact.reqLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid container justify="center" spacing={2} style={{ marginTop: 19 }}>
                    <Grid item xs={6} className={classes.newContactColumnWidth}>
                      <div>
                        <Card>
                          <CardHeader
                            title={
                              <Typography className={clsx(classes.cardTitle, classes.cardContentPadding)}>
                                <span>
                                  {buttonActive === 'employee'
                                    ? 'Employee Details'
                                    : buttonActive === 'departments'
                                    ? 'Department Details'
                                    : buttonActive === 'other_companies' || buttonActive === 'brokers_and_agents'
                                    ? 'Company Details'
                                    : buttonActive === 'intellicare_branch'
                                    ? 'Intellicare Branch Details'
                                    : 'Contact Details'}
                                </span>
                              </Typography>
                            }
                          />
                          <CardContent className={classes.headerBG}>
                            {/* Company Code */}
                            <div className={classes.contentItemStyle}>
                              <FormLabel
                                htmlFor="contact-code"
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                              >
                                Code
                              </FormLabel>
                              <FormControl
                                fullWidth
                                className={clsx(
                                  classes.cardContentPadding,
                                  classes.marginTopTextArea,
                                  'textarea-field'
                                )}
                              >
                                <div>
                                  <TextField
                                    // error={contactCodeNotValid}
                                    // helperText={contactCodeNotValid ? contactCodeError : null}
                                    className={clsx(classes.textFieldWhite, classes.codeFieldRoot, 'textarea-field')}
                                    id="contact-code"
                                    name="contact_code"
                                    value={contactCode}
                                    variant="outlined"
                                    // onFocus={(event) => contactCodeValidation(event)}
                                    // onChange={(event) => contactCodeValidation(event)}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                </div>
                              </FormControl>
                            </div>
                            {/* Contact Type Broker/Agent */}
                            {buttonActive === 'brokers_and_agents' && (
                              <div className={clsx(classes.contentItemStyle, classes.contentItemSelect)}>
                                <FormLabel
                                  htmlFor="state-province"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Type
                                </FormLabel>
                                <FormControl fullWidth className={classes.cardContentPadding}>
                                  <NativeSelect
                                    id="type_broker_agent"
                                    input={<BootstrapInput />}
                                    classes={{ root: contactTypeNotValid ? classes.errorSelectField : '' }}
                                    value={contactType}
                                    name="contact_type"
                                    onFocus={(event) => contactTypeValidation(event)}
                                    onChange={(event) => contactTypeValidation(event)}
                                  >
                                    {CONSTANTS.CONTACT_TYPE_BROKERS_AGENTS.map((type, index) => (
                                      <option value={type.code} key={index}>
                                        {type.text}
                                      </option>
                                    ))}
                                  </NativeSelect>

                                  {contactTypeNotValid && (
                                    <FormHelperText
                                      id="type-helper-text"
                                      classes={{ root: classes.errorHelperTextRoot }}
                                    >
                                      Type is required
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </div>
                            )}
                            {/* Company Name */}
                            {buttonActive !== 'brokers_and_agents' && (
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="contact-name"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Name
                                </FormLabel>
                                <FormControl
                                  fullWidth
                                  className={clsx(
                                    classes.cardContentPadding,
                                    classes.marginTopTextArea,
                                    'textarea-field'
                                  )}
                                >
                                  <div>
                                    <TextField
                                      error={contactNameNotValid}
                                      helperText={contactNameNotValid ? contactNameError : null}
                                      className={clsx(classes.textFieldWhite, 'textarea-field')}
                                      id="contact-name"
                                      name="contact_name"
                                      value={contactName}
                                      variant="outlined"
                                      onFocus={(event) => contactNameValidation(event)}
                                      onChange={(event) => contactNameValidation(event)}
                                    />
                                  </div>
                                </FormControl>
                              </div>
                            )}
                            {/* Contact Person */}
                            {buttonActive !== 'brokers_and_agents' && (
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="contact-person"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Contact Person
                                </FormLabel>
                                <FormControl
                                  fullWidth
                                  className={clsx(
                                    classes.cardContentPadding,
                                    classes.marginTopTextArea,
                                    'textarea-field'
                                  )}
                                >
                                  <div>
                                    <TextField
                                      error={contactPersonNotValid}
                                      helperText={contactPersonNotValid ? contactPersonError : null}
                                      className={clsx(classes.textFieldWhite, 'textarea-field')}
                                      id="contact-person"
                                      name="contact_person"
                                      value={contactPerson}
                                      variant="outlined"
                                      onFocus={(event) => contactPersonValidation(event)}
                                      onChange={(event) => contactPersonValidation(event)}
                                    />
                                  </div>
                                </FormControl>
                              </div>
                            )}
                            {/* Department */}

                            {!!contact.contactInfo && !!contact.contactInfo.department ? (
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="department"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Department
                                </FormLabel>
                                <FormControl
                                  fullWidth
                                  className={clsx(
                                    classes.cardContentPadding,
                                    classes.marginTopTextArea,
                                    'textarea-field'
                                  )}
                                >
                                  <div>
                                    <TextField
                                      error={contactDeptNotValid}
                                      helperText={contactDeptNotValid ? contactDeptError : null}
                                      className={clsx(classes.textFieldWhite, 'textarea-field')}
                                      id="department"
                                      name="department"
                                      value={contactDept}
                                      variant="outlined"
                                      onFocus={(event) => contactDeptValidation(event)}
                                      onChange={(event) => contactDeptValidation(event)}
                                    />
                                  </div>
                                </FormControl>
                              </div>
                            ) : null}
                            {/* Contact Broker/Agent */}
                            {buttonActive === 'brokers_and_agents' && (
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="contact-broker-agent"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Broker/Agent
                                </FormLabel>
                                <FormControl
                                  fullWidth
                                  className={clsx(
                                    classes.cardContentPadding,
                                    classes.marginTopTextArea,
                                    'textarea-field'
                                  )}
                                >
                                  <div>
                                    <TextField
                                      error={contactBrokerAgentNotValid}
                                      helperText={contactBrokerAgentNotValid ? contactBrokerAgentError : null}
                                      className={clsx(classes.textFieldWhite, 'textarea-field')}
                                      id="contact-broker-agent"
                                      name="contact_broker_agent"
                                      value={contactBrokerAgent}
                                      variant="outlined"
                                      onFocus={(event) => contactBrokerAgentValidation(event)}
                                      onChange={(event) => contactBrokerAgentValidation(event)}
                                    />
                                  </div>
                                </FormControl>
                              </div>
                            )}
                            {/* Contact Number */}
                            <div className={classes.contentItemStyle}>
                              <FormLabel
                                htmlFor="contact-number"
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                              >
                                Contact No.
                              </FormLabel>
                              <FormControl
                                fullWidth
                                className={clsx(
                                  classes.cardContentPadding,
                                  classes.marginTopTextArea,
                                  'textarea-field'
                                )}
                              >
                                <div>
                                  <TextField
                                    error={contactNumberNotValid}
                                    helperText={contactNumberNotValid ? contactNumberError : null}
                                    className={clsx(classes.textFieldWhite, 'textarea-field')}
                                    id="contact-number"
                                    name="contact_number"
                                    value={contactNumber}
                                    variant="outlined"
                                    onFocus={(event) => contactNumberValidation(event)}
                                    onChange={(event) => contactNumberValidation(event)}
                                  />
                                </div>
                              </FormControl>
                            </div>
                            {/* Contact Company */}
                            {buttonActive === 'brokers_and_agents' && (
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="contact-company"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Company
                                </FormLabel>
                                <FormControl
                                  fullWidth
                                  className={clsx(
                                    classes.cardContentPadding,
                                    classes.marginTopTextArea,
                                    'textarea-field'
                                  )}
                                >
                                  <div>
                                    <TextField
                                      error={contactCompanyNotValid}
                                      helperText={contactCompanyNotValid ? contactCompanyError : null}
                                      className={clsx(classes.textFieldWhite, 'textarea-field')}
                                      id="contact-company"
                                      name="contact_company"
                                      value={contactCompany}
                                      variant="outlined"
                                      onFocus={(event) => contactCompanyValidation(event)}
                                      onChange={(event) => contactCompanyValidation(event)}
                                    />
                                  </div>
                                </FormControl>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                    <Grid item xs={6} className={classes.newContactColumnWidth}>
                      <div>
                        <Card>
                          <CardHeader
                            title={
                              <Typography className={clsx(classes.cardTitle, classes.cardContentPadding)}>
                                <span>Address</span>
                              </Typography>
                            }
                          />
                          <CardContent className={classes.headerBG}>
                            <Grid container>
                              <Grid item style={{ marginBottom: '1.25rem' }} xs={12}>
                                {/* Province */}
                                <div className={classes.contentItemStyle}>
                                  <FormLabel
                                    htmlFor="state-province"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    State / Province
                                  </FormLabel>
                                  <FormControl fullWidth className={classes.cardContentPadding}>
                                    <NativeSelect
                                      id="state_province"
                                      input={<BootstrapInput />}
                                      value={stateProvince}
                                      disabled={address_info.himsLoadingProvince}
                                      onChange={(event) => setCity(event)}
                                      inputProps={{
                                        'data-cy': 'state_province',
                                      }}
                                    >
                                      {address_info.himsLoadingProvince ? (
                                        <option value="">Loading...</option>
                                      ) : address_info.himsProvinces ? (
                                        address_info.himsProvinces.map((res, index) => (
                                          <option name={res.label} value={res.name + ',' + index} key={index}>
                                            {res.label}
                                          </option>
                                        ))
                                      ) : (
                                        <option value={'No Provinces'}>No Provinces</option>
                                      )}
                                    </NativeSelect>
                                  </FormControl>
                                </div>
                              </Grid>
                              <Grid item style={{ marginBottom: '1.25rem' }} xs={12}>
                                {/* Municipality */}

                                <div className={classes.contentItemSpacing}>
                                  <FormLabel
                                    htmlFor="city-municipality"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    City / Municipality
                                  </FormLabel>
                                  <FormControl fullWidth className={classes.cardContentPadding}>
                                    <NativeSelect
                                      id="city_municipality"
                                      input={<BootstrapInput />}
                                      value={cityMunicipality}
                                      disabled={address_info.himsLoadingCity}
                                      onChange={(event) => setBarangay(event)}
                                      inputProps={{
                                        'data-cy': 'city_municipality',
                                      }}
                                    >
                                      {address_info.himsLoadingCity ? (
                                        <option value="">Loading...</option>
                                      ) : address_info.himsCity ? (
                                        address_info.himsCity.map((res, index) => (
                                          <option name={res.label} value={res.name + ',' + index} key={index}>
                                            {res.label}
                                          </option>
                                        ))
                                      ) : (
                                        <option value={'No City/Municipality'}>No City/Municipality</option>
                                      )}
                                    </NativeSelect>
                                  </FormControl>
                                </div>
                              </Grid>
                              <Grid item xs={12}>
                                {/* Barangay */}
                                <div>
                                  <div className={classes.contentItemSpacing}>
                                    <FormLabel
                                      htmlFor="barangay"
                                      className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    >
                                      Barangay
                                    </FormLabel>
                                    <FormControl fullWidth className={classes.cardContentPadding}>
                                      <NativeSelect
                                        id="barangay"
                                        input={<BootstrapInput />}
                                        value={brgy}
                                        disabled={address_info.himsLoadingBarangay}
                                        onChange={(event) => barangayValidation(event)}
                                        inputProps={{
                                          'data-cy': 'barangay',
                                        }}
                                      >
                                        {address_info.himsLoadingBarangay ? (
                                          <option value="">Loading...</option>
                                        ) : address_info.himsBarangay ? (
                                          address_info.himsBarangay.map((res, index) => (
                                            <option name={res.label} value={res.name + ',' + index} key={index}>
                                              {res.label}
                                            </option>
                                          ))
                                        ) : (
                                          <option value={'No Barangay'}>No Barangay</option>
                                        )}
                                      </NativeSelect>
                                    </FormControl>
                                  </div>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid container style={{ marginTop: '24px' }}>
                              <Grid item xs={6}>
                                {/* Unit */}
                                <div className={classes.contentItemStyle}>
                                  <FormLabel
                                    htmlFor="unit"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    Unit (Optional)
                                  </FormLabel>
                                  <FormControl
                                    fullWidth
                                    className={clsx(
                                      classes.cardContentPadding,
                                      classes.marginTopTextArea,
                                      'textarea-field'
                                    )}
                                  >
                                    <div>
                                      <TextField
                                        className={clsx(classes.textFieldWhite, 'textarea-field')}
                                        id="unit"
                                        name="unit"
                                        value={unit}
                                        variant="outlined"
                                        onChange={(event) => unitHandler(event)}
                                        onFocus={(event) => unitHandler(event)}
                                        inputProps={{ 'data-cy': 'unit' }}
                                      />
                                    </div>
                                  </FormControl>
                                </div>
                              </Grid>
                              <Grid item xs={6}>
                                {/* Floor Number */}
                                <div className={classes.contentItemStyle}>
                                  <FormLabel
                                    htmlFor="floor_no"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    Floor No.
                                  </FormLabel>
                                  <FormControl
                                    fullWidth
                                    className={clsx(
                                      classes.cardContentPadding,
                                      classes.marginTopTextArea,
                                      'textarea-field'
                                    )}
                                  >
                                    <div>
                                      <TextField
                                        error={boolFloorNo}
                                        helperText={boolFloorNo ? boolFloorNoErrorMessage : null}
                                        className={clsx(classes.textFieldWhite, 'textarea-field')}
                                        id="floor_no"
                                        name="floor_no"
                                        value={floorNo}
                                        variant="outlined"
                                        onChange={(event) => floorNoValidation(event)}
                                        onFocus={(event) => floorNoValidation(event)}
                                        inputProps={{
                                          'data-cy': 'floor_no',
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid>
                              <Grid item xs={12}>
                                {/* Building Name */}
                                <div className={classes.contentItemStyle}>
                                  <FormLabel
                                    htmlFor="building_name"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    Building Name
                                  </FormLabel>
                                  <FormControl
                                    fullWidth
                                    className={clsx(
                                      classes.cardContentPadding,
                                      classes.marginTopTextArea,
                                      'textarea-field'
                                    )}
                                  >
                                    <div>
                                      <TextField
                                        error={boolBuildName}
                                        helperText={boolBuildName ? boolBuildNameErrorMessage : null}
                                        className={clsx(classes.textFieldWhite, 'textarea-field')}
                                        id="building_name"
                                        name="building_name"
                                        value={buildName}
                                        variant="outlined"
                                        onFocus={(event) => buildNameValidation(event)}
                                        onChange={(event) => buildNameValidation(event)}
                                        inputProps={{
                                          'data-cy': 'building_name',
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                </div>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12}>
                                {/* Street */}
                                <div className={classes.contentItemStyle}>
                                  <FormLabel
                                    htmlFor="street"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    Street
                                  </FormLabel>
                                  <FormControl
                                    fullWidth
                                    className={clsx(
                                      classes.cardContentPadding,
                                      classes.marginTopTextArea,
                                      'textarea-field'
                                    )}
                                  >
                                    <div>
                                      <TextField
                                        error={boolStreet}
                                        helperText={boolStreet ? boolStreetErrorMessage : null}
                                        className={clsx(classes.textFieldWhite, 'textarea-field')}
                                        id="street"
                                        name="street"
                                        value={street}
                                        variant="outlined"
                                        onFocus={(event) => streetValidation(event)}
                                        onChange={(event) => streetValidation(event)}
                                        inputProps={{
                                          'data-cy': 'street',
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                </div>
                              </Grid>
                              <Grid item xs={6}>
                                {/* Barangay */}
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item xs={12}>
                                {/* Country */}

                                <div className={classes.contentItemStyle}>
                                  <FormLabel
                                    htmlFor="contact-person"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    Country
                                  </FormLabel>
                                  <FormControl
                                    fullWidth
                                    className={clsx(
                                      classes.cardContentPadding,
                                      classes.marginTopTextArea,
                                      'textarea-field'
                                    )}
                                  >
                                    <div>
                                      <TextField
                                        className={clsx(
                                          classes.textFieldWhite,
                                          classes.countryFieldRoot,
                                          'textarea-field'
                                        )}
                                        id="country"
                                        name="contact_country"
                                        value="Philippines"
                                        variant="outlined"
                                        InputProps={{
                                          readOnly: true,
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                </div>
                                {/* </FormControl> */}
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item xs={6}>
                                {/* Zip Code */}
                                <div className={classes.contentItemSpacing}>
                                  <FormLabel
                                    htmlFor="zip-code"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    Zip Code (Optional)
                                  </FormLabel>
                                  <FormControl
                                    className={clsx(
                                      classes.cardContentPadding,
                                      classes.marginTopTextArea,
                                      'textarea-field'
                                    )}
                                  >
                                    <div>
                                      <TextField
                                        error={boolZipCode}
                                        helperText={boolZipCode ? boolZipCodeErrorMessage : null}
                                        className={clsx(classes.textFieldWhite, 'textarea-field')}
                                        id="zip-code"
                                        value={zipCode === 0 ? '' : zipCode}
                                        name="zip_code"
                                        variant="outlined"
                                        onFocus={(event) => zipCodeValidation(event, 'zip_code')}
                                        onChange={(event) => zipCodeValidation(event, 'zip_code')}
                                        inputProps={{
                                          'data-cy': 'zip_code',
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                </div>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
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
    </Dialog>
  );
};

export default EditContact;
