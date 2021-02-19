// @ts-nocheck
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import * as ACTION from '../../store/actions/requestActions';

import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Slide from '@material-ui/core/Slide';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import short from 'short-uuid';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import * as ADDRESS from '../../store/actions/addressActions';
import * as REQ_TYPE from '../../utils/Constants';
import './styles/NewRequest.scss';
import CloseIcon from '@material-ui/icons/Close';
import RadioButton from '../common/RadioButton/RadioButton';
import { DataUsageTwoTone } from '@material-ui/icons';

moment.locale();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
    '& .MuiFab-root': {
      boxShadow: 'none',
    },
  },
  iconClose: {
    color: '#2F3542',
    border: '1px solid rgba(47, 53, 66, 0.4)',
    background: '#fff',
    fontSize: '2rem',
    height: '48px',
    width: '48px',
    '& svg': {
      fontSize: '1.5rem',
    },
    '&:hover': {
      background: '#fff',
    },
  },
  cardMargin: {
    marginBottom: '40px',
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
    fontSize: '14px',
    lineHeight: '24px',
    color: 'rgba(43, 45, 51, 0.8)',
  },
  contentText: {
    fontSize: 14,
  },
  contentItemStyle: {
    marginTop: '4px',
  },
  contentItemSpacing: {
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
    fontWeight: 'bold',
  },
  cardFullWidth: {
    width: '100%',
  },
  headerBG: {
    backgroundColor: '#F4F6F9',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  marginTopTextArea: {
    marginTop: theme.spacing(1),
    '& textarea': {
      // border: '1px solid #A5B0BE',
      boxSizing: 'border-box',
      borderRadius: '4px',
      fontSize: '16px',
      lineHeight: '24px',
      fontFamily: 'Inter, Arial, sans-serif',
      '&:focus': {
        outline: 'none',
      },
    },
  },
  buttonAddItem: {
    padding: 5,
  },
  buttonAddHeight: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  dividerStyle: {
    marginBottom: 10,
  },
  containerSize: {
    maxWidth: '389px',
  },
  otherField: {
    marginBottom: 0,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// React Final Form

const NewRequest = (props) => {
  const classes = useStyles();
  const translator = short();
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.auth);
  const address_info = useSelector((state) => state.address);
  const [addressLoaded, setAddressLoaded] = useState(false);
  const [btnToggle, setButtonToggle] = useState(true);
  const handleClose = () => {
    props.closeForm(false);
  };

  if (!addressLoaded) {
    dispatch(ADDRESS.getHimsAllProvince());
    setAddressLoaded(true);
  }

  // Validation Field State
  const [boolResUrgency, setboolResUrgency] = useState(false);
  const [compNameNotValid, setCompNameNotValid] = useState(false);
  const [contactPerson, setContactPerson] = useState(false);
  const [contactNumber, setContactNumber] = useState(false);
  const [boolFloorNo, setBoolFloorNo] = useState(false);
  const [boolBuildName, setBoolBuildName] = useState(false);
  const [boolStreet, setBoolStreet] = useState(false);
  const [boolBarangay, setBoolBarangay] = useState(false);
  const [boolZipCode, setBoolZipCode] = useState(false);

  const validateFieldList = {
    deltype: true,
    urgent: true,
    comp_name: true,
    contact_person: true,
    contact_number: true,
    floor_no: true,
    building_name: true,
    street: true,
    item0: true,
    itemNo0: true,
    oItem0: false,
    expDate: true,
    zip_code: false,
  };

  const [validationState, setValidationState] = useState(validateFieldList);

  const user_info_name = user_info.user ? user_info.user.first_name + ' ' + user_info.user.last_name : 'No User';
  const user_info_department = user_info.user ? user_info.user.hims_department_name : 'No Department';
  const user_info_hims_partner = user_info.user
    ? REQ_TYPE.PARTNER[user_info.user.hims_hmo_partner_id].text
    : 'No HMO Partner';

  // Request Details
  const [reqType, setReqType] = useState('');
  const [urgReq, setUrgReq] = useState();
  const [resForUrg, setResForUrg] = useState('');
  const [remarks, setRemarks] = useState('');

  // Item Details

  const [expectDelPick, setExpectDelPick] = useState(null);

  // More Items
  const newItem = {
    id: 0,
    name: 'item0',
    itemNo: 'itemNo0',
    oItem: 'oItem0',
    type: 'none',
    other: '',
    count: 0,
  };

  const [moreItems, setMoreItems] = useState([newItem]);

  //  Item Validation
  const itemValid = {
    itemError: false,
    errMessage: '',
    otherItem: 0,
    otherItemError: false,
    otherItemMessage: '',
  };

  // Company Details
  const [compName, setCompName] = useState('');
  const [compCode, setCompCode] = useState('');
  const [contPerson, setContPerson] = useState('');
  const [contNumber, setContNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [codeValid,setCodeValid] = useState(false)
  // Address
  const [floorNo, setFloorNo] = useState('');
  const [unit, setUnit] = useState('');
  const [buildName, setBuildName] = useState('');
  const [street, setStreet] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [cityMunicipality, setCityMunicipality] = useState('');
  const [brgy, setBrgy] = useState('');
  const [stateProvinceLabel, setStateProvinceLabel] = useState('');
  const [cityMunicipalityLabel, setCityMunicipalityLabel] = useState('');
  const [brgyLabel, setBrgyLabel] = useState('');
  const [stateProvinceIndex, setStateProvinceIndex] = useState(0);
  const [cityMunicipalityIndex, setCityMunicipalityIndex] = useState(0);
  const [brgyIndex, setBrgyIndex] = useState(0);
  const [country, setCountry] = useState('Philippines');
  const [zipCode, setZipCode] = useState(0);

  // Expected Date
  const setExpectedDate = (date, name) => {
    let valid = false;
    // console.log(date)
    if (date.value) {
      valid = false;
    } else {
      valid = true;
    }

    changeValidateStatus(name, valid);
    setExpectDelPick(date.value);
  };

  // Address Actions
  const unitHandler = (event) => {
    const value = event.target.value;
    setUnit(value);
  };

  const setCity = (event) => {
    const name = event.target.options[event.target.selectedIndex].text;
    const splitvalue = event.target.value.split(',');
    const value = splitvalue[0];
    const valueIndex = splitvalue[1];
    setStateProvince(splitvalue);
    setStateProvinceLabel(name);
    setStateProvinceIndex(valueIndex);
        console.log(splitvalue,valueIndex)
    dispatch(ADDRESS.getHimsCityAndBarangay(value));
  };

  const setBarangay = (event) => {
    const name = event.target.options[event.target.selectedIndex].text;
    const splitvalue = event.target.value.split(',');
    const value = splitvalue[0];
    const valueIndex = splitvalue[1];
    setCityMunicipality(splitvalue);
    setCityMunicipalityLabel(name);
    setCityMunicipalityIndex(valueIndex);
    console.log(splitvalue,"BARANGAY",name,event.target.value)
    dispatch(ADDRESS.getHimsBarangay(value));
  };

  const changeReqTypeMethod = (methodType) => {
    const valid = false;
    const name = 'deltype';

    setReqType(methodType);
    changeValidateStatus(name, valid);
  };

  const changeUrgency = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (parseInt(value) === 1) {
      valid = true;
    } else {
      setboolResUrgency(false);
      setResForUrg('');
    }

    setUrgReq(value);
    changeValidateStatus(name, valid);
  };

  const [countItem, setCountItem] = useState(1);
  const addMoreItemsHandler = () => {
    if (moreItems.length < 15) {
      const itemName = 'item' + countItem;
      const noItemName = 'itemNo' + countItem;
      const oItem = 'oItem' + countItem;
      const newAdItem = {
        id: countItem,
        name: itemName,
        itemNo: noItemName,
        oItem: oItem,
        type: 'none',
        other: '',
        count: 0,
      };
      setMoreItems([...moreItems, newAdItem]);
      setItemsErrorMessage([...itemsErrorMessage, itemValid]);
      setValidationState({
        ...validationState,
        [itemName]: true,
        [noItemName]: true,
        [oItem]: false,
      });

      // console.log(validationState)
      setCountItem(countItem + 1);
    }
  };

  const removeItem = (index, itemName, itemNo, oItem) => {
    const newItemList = moreItems.filter((_, item) => item !== index);

    const newObjState = JSON.parse(JSON.stringify(validationState));
    delete newObjState[itemName];
    delete newObjState[itemNo];
    delete newObjState[oItem];

    setValidationState(newObjState);

    setMoreItems(newItemList);
  };

  const itemsForDelPickHandler = (index, value, itemName, id) => {
    let valid = false;
    let validOitem = false;
    const itemData = [...moreItems];
    itemData[index].type = parseInt(value);
    setMoreItems(itemData);

    if (parseInt(value) === 0) {
      const OtherItemSet = [...itemsErrorMessage];
      OtherItemSet[index].otherItem = 1;
      setItemsErrorMessage(OtherItemSet);
      validOitem = true;
    } else {
      if (value === 'none') {
        valid = true;
      }
    }

    changeValidateStatus('oItem' + id, validOitem, itemName, valid);
  };

  const otherItemHandler = (index, value) => {
    const itemData = [...moreItems];
    itemData[index].other = value;
    setMoreItems(itemData);
  };

  const noOfItemsHandler = (index, value) => {
    const itemData = [...moreItems];
    itemData[index].count = parseInt(value);
    setMoreItems(itemData);
  };

  const sendPrintHandler = (event) => {
    event.preventDefault();

    var keyCode = event.keyCode || event.which;
   console.log(keyCode,"code")
    if (keyCode === 13) { 
      event.preventDefault();
      return false;
    } else {
      const newFormReq = {
        request_type: parseInt(reqType),
        is_urgent: parseInt(urgReq),
        reason_urgency: resForUrg,
        remarks: remarks,
        item: {
          items: moreItems,
          expected_date: moment(expectDelPick).format('MMM DD, YYYY'),
        },
        company: {
          name: compName,
          code: compCode,
          contact_person: contPerson,
          contact_number: contNumber.toString(),
          department: department,
        },
        address: {
          floor_no: floorNo,
          unit: unit,
          building_name: buildName,
          street: street,
          barangay: brgyIndex,
          city: cityMunicipalityIndex,
          province: stateProvinceIndex,
          zip_code: parseInt(zipCode),
        },
      };
  
      props.prevDetails(newFormReq);
      props.openPrevDetails(true);
    }

  };

  // const validateAction = (fieldName, validateResult) => {
  // }
  const [itemsErrorMessage, setItemsErrorMessage] = useState([itemValid]);

  // Validation for Urgency
  const reasUrgencyValidation = (event, name) => {
    let valid = false;
    const value = event.target.value;
    if (parseInt(urgReq) === 1) {
      if (value) {
        setResForUrg(value);
        valid = false;
      } else {
        setResForUrg(value);
        valid = true;
      }
    } else {
      valid = false;
    }

    setboolResUrgency(valid);
    changeValidateStatus(name, valid);
  };

  // validation for Other
  const otherItemsSetValidation = (index, boolSet, message) => {
    const otherItemsNewErrorMessage = [...itemsErrorMessage];
    otherItemsNewErrorMessage[index].otherItemError = boolSet;
    otherItemsNewErrorMessage[index].otherItemMessage = message;
    setItemsErrorMessage(otherItemsNewErrorMessage);
  };
  const otherItemsValidationfunction = (index, otherItem, name) => {
    let valid = false;
    let message = null;

    if (itemsErrorMessage[index].otherItem === 1) {
      if (otherItem) {
        valid = false;
        otherItemHandler(index, otherItem);
      } else {
        valid = true;
        message = 'Specify Other Item';
        otherItemHandler(index, otherItem);
      }
    } else {
      otherItemHandler(index, otherItem);
      valid = false;
    }

    otherItemsSetValidation(index, valid, message);
    changeValidateStatus(name, valid);
  };

  // validation for No Item
  const itemsSetValidation = (index, boolSet, message) => {
    const itemsNewErrorMessage = [...itemsErrorMessage];
    itemsNewErrorMessage[index].itemError = boolSet;
    itemsNewErrorMessage[index].errMessage = message;
    setItemsErrorMessage(itemsNewErrorMessage);
  };

  const noItemsValidationfunction = (index, itemNo, name) => {
    let valid = false;
    let message = null;
    if (itemNo) {
      if (isNaN(itemNo)) {
        valid = true;
        message = 'Invalid No. of Item(s)';
        noOfItemsHandler(index, 0);
      } else {
        noOfItemsHandler(index, itemNo);
        if (parseInt(itemNo) <= 0) {
          valid = true;
          message = 'Must be greater than 0';
        }
      }
    } else {
      noOfItemsHandler(index, 0);
      valid = true;
      message = 'No. of Item(s) is required';
    }

    itemsSetValidation(index, valid, message);

    changeValidateStatus(name, valid);
  };

  // Validation Company Name
  const [compNameNotError, setCompNameError] = useState('');
  const compNameValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
      setCompNameError(<span data-cy="company_name_error">Company Name is required</span>);
    }

    setCompName(value);
    setCompNameNotValid(valid);
    changeValidateStatus(name, valid);
  };

  // validation for Contact Person
  const [contactErrorMessage, setContactErrorMessage] = useState('');
  const contactPersonValidation = (event) => {
    let valid = false;
    const value = event.target.value;
    const name = event.target.name;
    if (value) {
    } else {
      valid = true;
      setContactErrorMessage(<span data-cy="company_contact_person_error">Contact Person is required</span>);
    }

    setContPerson(value);
    setContactPerson(valid);
    changeValidateStatus(name, valid);
  };

  // validation for Contact Number
  const [contactNoErrorMessage, setContactNoErrorMessage] = useState('');
  const contactNoValidation = (event) => {
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
      message = <span data-cy="company_number_error">Contact Number is required</span>;
      valid = true;
    }

    setContNumber(value);
    setContactNumber(valid);
    setContactNoErrorMessage(message);
    changeValidateStatus(name, valid);
  };

  // validation for Floor Number
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

  // validation for Building Name
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

  // validation for Street
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

  const barangayValidation = (event) => {
    // var valid = false;
    const name = event.target.options[event.target.selectedIndex].text;
    const splitvalue = event.target.value.split(',');

    const valueIndex = splitvalue[1];

    setBrgy(splitvalue);
    setBrgyLabel(name);
    setBrgyIndex(valueIndex);
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

  const onChangeCompCode =(data)=> {
    setCompCode(data)
    setCodeValid(false)
  }

  const getCodeData = (data) => {
    setCompName(data.name)
    setContPerson(data.contact_person)
    setContNumber(data.contact_no)
    setDepartment(data.department)
    setFloorNo(data.address_details.floor_no)
    setUnit(data.address_details.unit)
    setBuildName(data.address_details.building_name)
    setStreet(data.address_details.street)
    setZipCode(data.address_details.zip_code)
 
    for (const [i, value] of address_info.himsProvinces.entries()) {
      if(value.label === data.address_details.province_label){

        dispatch(ADDRESS.getHimsCityAndBarangayCode(value.label,data.address_details.city_label,data.address_details.barangay_label,setCityMunicipality,setCityMunicipalityLabel,setCityMunicipalityIndex,setBrgy,setBrgyLabel,setBrgyIndex));
        setStateProvince(address_info.himsProvinces[i].name + ',' + i);
        setStateProvinceLabel(address_info.himsProvinces[i].label);
        setStateProvinceIndex(i);

    //     for (const [i, value] of address_info.himsCity.entries()) {
    //       if(value.label === data.address_details.city_label){
    //         dispatch(ADDRESS.getHimsBarangay(value.label));
    //         setCityMunicipality(data.address_details.city_label + ',' + i);
    //         setCityMunicipalityLabel(address_info.himsCity[i].label);
    //         setCityMunicipalityIndex(i);
    //         for (const [i, value] of address_info.himsBarangay.entries()) {
    //           console.log(value.label,"test", data.address_details.barangay_label)
    //           if(value.label === data.address_details.barangay_label){
  
    //             setBrgy(address_info.himsBarangay[i].name + ',' + i);
    //             setBrgyLabel(address_info.himsBarangay[i].label);
    //             setBrgyIndex(i);
    //           }
    //       }
    //   }
    // }
      }
  }

  
    
  }


  const onEnter = (e)=> {
     const code =  e.target.value

     if(e.keyCode == 13){
      dispatch(ACTION.getCode(code,getCodeData,setCodeValid))
   }
  }
  // Change State Validation
  const [readyToValidate, setReadyToValidate] = useState([]);
  const changeValidateStatus = (name, response, oItem = null, oResponse = null) => {
    const setNewValidState = { ...validationState };
    if (oItem !== null) {
      setNewValidState[oItem] = oResponse;
    }
    setNewValidState[name] = response;

    setValidationState(setNewValidState);
    setReadyToValidate([setNewValidState]);
  };

  const minDate = new Date();

  useEffect(() => {
    const hasValue = Object.values(validationState).includes(true);
    setButtonToggle(hasValue);

    if (address_info.himsProvinces) {
      if (address_info.himsProvinces.length > 0) {
        if (stateProvince) {
        } else {
          dispatch(ADDRESS.getHimsCityAndBarangay(address_info.himsProvinces[0].name));

          setStateProvince(address_info.himsProvinces[0].name + ',' + 0);
          setStateProvinceLabel(address_info.himsProvinces[0].label);
          setStateProvinceIndex(0);
        }
      }
    }

    if (address_info.himsCity) {
      if (address_info.himsCity.length > 0) {
        if (cityMunicipality) {
        } else {
          dispatch(ADDRESS.getHimsBarangay(address_info.himsCity[0].name));

          setCityMunicipality(address_info.himsCity[0].name + ',' + 0);
          setCityMunicipalityLabel(address_info.himsCity[0].label);
          setCityMunicipalityIndex(0);
        }
      }
    }

    if (address_info.himsBarangay && address_info.himsCity) {
      if (address_info.himsBarangay.length > 0) {
        if (brgy) {
        } else {
          dispatch(ADDRESS.getHimsBarangay(address_info.himsCity[0].name));

          setBrgy(address_info.himsBarangay[0].name + ',' + 0);
          setBrgyLabel(address_info.himsBarangay[0].label);
          setBrgyIndex(0);
        }
      }
    }
  }, [address_info, brgy, cityMunicipality, dispatch, stateProvince, validationState]);

  console.log(address_info, 'ADDRESS INFO');

  return (
    <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
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
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs>
                {/* For Margin */}
              </Grid>
              <Grid item xs={7}>
                <form noValidate autoComplete="off" onSubmit={(event) => sendPrintHandler(event)} onKeyPress={(e)=>{e.target.keyCode === 13 && e.preventDefault();}}>
                  <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                    <Grid item className={classes.containerSize} xs={6}>
                      <div>
                        <Typography
                          gutterBottom
                          variant="h5"
                          className={classes.headerStyle}
                          data-cy="new_request_text"
                        >
                          New Request
                        </Typography>
                      </div>
                      <div>
                        <Typography gutterBottom className={classes.subHeaderStyle}>
                          All fields are required unless otherwise stated
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item className={classes.containerSize} xs={6}>
                      <Grid container alignItems="flex-start" justify="flex-end">
                        <Grid item>
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              className="btn-send-print"
                              disabled={
                                btnToggle ||
                                address_info.himsLoadingProvince ||
                                address_info.himsLoadingCity ||
                                address_info.himsLoadingBarangay
                              }
                            >
                              Next
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                    <Grid item className={classes.containerSize} xs={6}>
                      <div>
                        <Card>
                          <CardHeader
                            title={
                              <Typography className={clsx(classes.cardTitle, classes.cardContentPadding)}>
                                <span data-cy="request_details_text">Request Details</span>
                              </Typography>
                            }
                          />
                          <CardContent className={classes.headerBG}>
                            <div className={classes.contentItemStyle}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Requestor
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                                data-cy="requestor_name"
                              >
                                {user_info_name}
                              </Typography>
                            </div>
                            <div className={classes.contentItemSpacing}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                Requestor Department
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                                data-cy="requestor_dept"
                              >
                                {user_info_department}
                              </Typography>
                            </div>
                            <div className={classes.contentItemSpacing}>
                              <Typography
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                color="textSecondary"
                              >
                                HMO Partner
                              </Typography>
                              <Typography
                                className={clsx(classes.contentText, classes.cardContentPadding)}
                                gutterBottom
                                data-cy="hmo_partner"
                              >
                                {user_info_hims_partner}
                              </Typography>
                            </div>
                            <div className={classes.contentItemSpacing}>
                              <FormControl component="fieldset">
                                <FormLabel
                                  htmlFor="type_request"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Type of Request
                                </FormLabel>
                                <RadioGroup
                                  row
                                  aria-label="position"
                                  id="type_request"
                                  name="type_request"
                                  value={reqType}
                                  className={classes.cardContentPadding}
                                  onChange={(event) => changeReqTypeMethod(event.target.value)}
                                >
                                  <FormControlLabel
                                    value={REQ_TYPE.REQUEST_TYPE_DELIVERY.toString()}
                                    style={{ width: '100px' }}
                                    control={
                                      <RadioButton
                                        inputProps={{
                                          'data-cy': 'delivery_radio_btn',
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography className={classes.contentText}>
                                        {REQ_TYPE.REQUEST_TYPE_TEXT[REQ_TYPE.REQUEST_TYPE_DELIVERY].text}
                                      </Typography>
                                    }
                                  />
                                  <FormControlLabel
                                    value={REQ_TYPE.REQUEST_TYPE_PICKUP.toString()}
                                    control={
                                      <RadioButton
                                        inputProps={{
                                          'data-cy': 'pickup_radio_btn',
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography className={classes.contentText}>
                                        {REQ_TYPE.REQUEST_TYPE_TEXT[REQ_TYPE.REQUEST_TYPE_PICKUP].text}
                                      </Typography>
                                    }
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                            <div className={classes.contentItemSpacing}>
                              <FormControl component="fieldset">
                                <FormLabel
                                  htmlFor="urgent_request"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Urgent Request?
                                </FormLabel>
                                <RadioGroup
                                  row
                                  aria-label="position"
                                  name="urgent"
                                  id="urgent_request"
                                  value={urgReq}
                                  className={classes.cardContentPadding}
                                  onChange={(event) => changeUrgency(event)}
                                >
                                  <FormControlLabel
                                    value={REQ_TYPE.IS_URGENT_NO.toString()}
                                    style={{ width: '100px' }}
                                    control={
                                      <RadioButton
                                        inputProps={{
                                          'data-cy': 'urgent_no',
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography className={classes.contentText}>
                                        {REQ_TYPE.IS_URGENT[REQ_TYPE.IS_URGENT_NO].text}
                                      </Typography>
                                    }
                                  />
                                  <FormControlLabel
                                    value={REQ_TYPE.IS_URGENT_YES.toString()}
                                    control={
                                      <RadioButton
                                        inputProps={{
                                          'data-cy': 'urgent_yes',
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography className={classes.contentText}>
                                        {REQ_TYPE.IS_URGENT[REQ_TYPE.IS_URGENT_YES].text}
                                      </Typography>
                                    }
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                            {parseInt(urgReq) === 1 ? (
                              <div className={classes.contentItemSpacing}>
                                <FormLabel
                                  htmlFor="reason_urgency"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Reason for Urgency:
                                </FormLabel>
                                <FormControl
                                  fullWidth
                                  className={clsx(
                                    classes.cardContentPadding,
                                    classes.marginTopTextArea,
                                    boolResUrgency ? 'error' : null
                                  )}
                                  name="reason_urgency"
                                  id="reason_urgency"
                                  variant="outlined"
                                >
                                  <TextareaAutosize
                                    className="text-area-custom"
                                    aria-label="Reason fo Urgency"
                                    rows={5}
                                    sytle={{}}
                                    placeholder="Reason for Urgency"
                                    value={resForUrg}
                                    onChange={(event) => reasUrgencyValidation(event, 'urgent')}
                                    onFocus={(event) => reasUrgencyValidation(event, 'urgent')}
                                    data-cy="reason_for_urgency"
                                  />
                                  {boolResUrgency && (
                                    <FormHelperText error={boolResUrgency}>
                                      Reason for Urgency is required
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </div>
                            ) : null}
                            <div className={classes.contentItemSpacing}>
                              <FormLabel
                                htmlFor="remarks"
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                              >
                                Remarks (Optional):
                              </FormLabel>
                              <FormControl
                                className={clsx(
                                  classes.cardContentPadding,
                                  classes.marginTopTextArea,
                                  'textarea-field'
                                )}
                                name="remarks"
                                id="remarks"
                                variant="outlined"
                              >
                                <TextareaAutosize
                                  aria-label="Remarks"
                                  rows={5}
                                  className={clsx('textarea-field', 'text-area-custom')}
                                  placeholder="Remarks"
                                  value={remarks}
                                  onChange={(event) => setRemarks(event.target.value)}
                                  data-cy="remarks"
                                />
                              </FormControl>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                    <Grid item className={classes.containerSize} xs={6}>
                      <div>
                        <Card className={classes.cardMargin}>
                          <CardHeader
                            title={
                              <Typography className={clsx(classes.cardTitle, classes.cardContentPadding)}>
                                <span data-cy="item_details_text">Item Details</span>
                              </Typography>
                            }
                          />
                          {/* More Items */}
                          <CardContent className={classes.headerBG}>
                            {moreItems.map((res, index) => (
                              <div key={index}>
                                {index > 0 ? (
                                  <div>
                                    <Divider
                                      variant="middle"
                                      style={{
                                        marginBottom: 15,
                                        border: '0.5px dashed #A5B0BE',
                                      }}
                                    />
                                    <div className={'other-item-close'}>
                                      <IconButton
                                        aria-label="delete"
                                        onClick={(event) => removeItem(index, res.name, res.itemNo, res.oItem)}
                                        className={classes.margin}
                                        size="small"
                                        data-cy="close_item_btn"
                                      >
                                        <CloseIcon fontSize="inherit" />
                                      </IconButton>
                                    </div>
                                  </div>
                                ) : null}
                                <Grid style={{ marginTop: '8px' }}>
                                  <FormLabel
                                    htmlFor="item-delivery-pickup"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    Item(s) for Delivery/Pickup
                                  </FormLabel>
                                  <FormControl fullWidth className={classes.cardContentPadding}>
                                    <NativeSelect
                                      id="item-delivery-pickup"
                                      input={<BootstrapInput />}
                                      value={res.type}
                                      onChange={(event) =>
                                        itemsForDelPickHandler(index, event.target.value, res.name, res.id)
                                      }
                                      required
                                      inputProps={{
                                        'data-cy': 'item_delivery_pickup',
                                      }}
                                    >
                                      <option value="none" disabled={true}>
                                        Select Item
                                      </option>
                                      <option
                                        value={REQ_TYPE.REQUEST_ITEM_TYPE_CHECK}
                                        hidden={moreItems.some(
                                          (item) => item.type === REQ_TYPE.REQUEST_ITEM_TYPE_CHECK
                                        )}
                                      >
                                        {REQ_TYPE.REQUEST_ITEM_TYPE[REQ_TYPE.REQUEST_ITEM_TYPE_CHECK].text}
                                      </option>
                                      <option
                                        value={REQ_TYPE.REQUEST_ITEM_TYPE_CONTRACT_CARDS}
                                        hidden={moreItems.some(
                                          (item) => item.type === REQ_TYPE.REQUEST_ITEM_TYPE_CONTRACT_CARDS
                                        )}
                                      >
                                        {REQ_TYPE.REQUEST_ITEM_TYPE[REQ_TYPE.REQUEST_ITEM_TYPE_CONTRACT_CARDS].text}
                                      </option>
                                      <option
                                        value={REQ_TYPE.REQUEST_ITEM_TYPE_SOA}
                                        hidden={moreItems.some((item) => item.type === REQ_TYPE.REQUEST_ITEM_TYPE_SOA)}
                                      >
                                        {REQ_TYPE.REQUEST_ITEM_TYPE[REQ_TYPE.REQUEST_ITEM_TYPE_SOA].text}
                                      </option>
                                      <option value={REQ_TYPE.REQUEST_ITEM_TYPE_OTHER}>
                                        {REQ_TYPE.REQUEST_ITEM_TYPE[REQ_TYPE.REQUEST_ITEM_TYPE_OTHER].text}
                                      </option>
                                    </NativeSelect>
                                  </FormControl>
                                </Grid>
                                {res.type === REQ_TYPE.REQUEST_ITEM_TYPE_OTHER ? (
                                  <div className={classes.contentItemStyle}>
                                    <FormLabel
                                      htmlFor="other-item"
                                      className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    >
                                      Please Specify
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
                                          className={clsx(classes.textFieldWhite, classes.otherField, 'textarea-field')}
                                          error={itemsErrorMessage[index].otherItemError}
                                          helperText={
                                            itemsErrorMessage[index].otherItemError
                                              ? itemsErrorMessage[index].otherItemMessage
                                              : null
                                          }
                                          id="other-item"
                                          variant="outlined"
                                          value={res.other}
                                          onFocus={(event) =>
                                            otherItemsValidationfunction(index, moreItems[index].other, res.oItem)
                                          }
                                          onChange={(event) =>
                                            otherItemsValidationfunction(index, event.target.value, res.oItem)
                                          }
                                          inputProps={{
                                            'data-cy': 'specify_other_item',
                                          }}
                                        />
                                      </div>
                                    </FormControl>
                                  </div>
                                ) : null}
                                <Grid className={classes.contentItemSpacing}>
                                  <FormLabel
                                    htmlFor="no-items"
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                  >
                                    No. of Item(s)
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
                                        error={itemsErrorMessage[index].itemError}
                                        helperText={
                                          itemsErrorMessage[index].itemError
                                            ? itemsErrorMessage[index].errMessage
                                            : null
                                        }
                                        className={clsx(classes.textFieldWhite, 'textarea-field')}
                                        id="no-items"
                                        variant="outlined"
                                        value={res.count.toString()}
                                        onFocus={(event) =>
                                          noItemsValidationfunction(index, moreItems[index].count, res.itemNo)
                                        }
                                        onChange={(event) =>
                                          noItemsValidationfunction(index, event.target.value, res.itemNo)
                                        }
                                        inputProps={{ 'data-cy': 'no_items' }}
                                      />
                                    </div>
                                  </FormControl>
                                </Grid>
                              </div>
                            ))}
                            {/*  Button Add More Item  */}
                            {moreItems.length < 10 ? (
                              <div className={`${classes.contentItemStyle} ${classes.cardContentPadding}`}>
                                <Card>
                                  <CardHeader
                                    title={<Typography className={clsx(classes.cardTitle)}>Add More Item</Typography>}
                                    action={
                                      <div>
                                        <IconButton
                                          className={clsx(classes.buttonAddItem, 'button-add')}
                                          onClick={(event) => addMoreItemsHandler(countItem)}
                                          data-cy="add_more_item_btn"
                                        >
                                          <AddCircleOutlineIcon color="primary" size="small" />
                                        </IconButton>
                                      </div>
                                    }
                                    className={classes.buttonAddHeight}
                                  />
                                </Card>
                              </div>
                            ) : null}
                            {/* Expected Date */}
                            <div className={classes.contentItemSpacing}>
                              <FormLabel
                                htmlFor="expected-delivery"
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                              >
                                Expected Delivery / Pickup Date
                              </FormLabel>
                              <FormControl className={clsx(classes.cardContentPadding)} style={{ width: '100%' }}>
                                <div className="datepicker-control-section">
                                  <DatePickerComponent
                                    variant="outlined"
                                    value={expectDelPick}
                                    allowEdit={false}
                                    // placeholder={moment(new Date()).format(
                                    //   'MMM DD, YYYY'
                                    // )}
                                    min={minDate}
                                    showTodayButton={false}
                                    onChange={(date) => setExpectedDate(date, 'expDate')}
                                    data-cy="expected_delivery_pickup_date"
                                  />
                                </div>
                                {/* </LocalizationProvider> */}
                              </FormControl>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className={classes.contentItemStyle}>
                        <Card className={classes.cardMargin}>
                          <CardHeader
                            title={
                              <Typography className={clsx(classes.cardTitle, classes.cardContentPadding)}>
                                <span data-cy="company_details_text">Company Details</span>
                              </Typography>
                            }
                          />
                          <CardContent className={classes.headerBG}>
                            {/* Company Name */}
                            <div className={classes.contentItemStyle}>
                              <FormLabel
                                htmlFor="company-name"
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
                                  {/* <input {...input} type="text" placeholder="First Name" />
                                                                {meta.error && meta.touched && <span>{meta.error}</span>} */}
                                  <TextField
                                    error={compNameNotValid}
                                    helperText={compNameNotValid ? compNameNotError : null}
                                    className={clsx(classes.textFieldWhite, 'textarea-field')}
                                    id="company-name"
                                    name="comp_name"
                                    value={compName}
                                    variant="outlined"
                                    onFocus={(event) => compNameValidation(event)}
                                    onChange={(event) => compNameValidation(event)}
                                    inputProps={{ 'data-cy': 'company_name' }}
                                  />
                                </div>
                              </FormControl>
                            </div>
                            {/* Company Code */}
                            <div className={classes.contentItemStyle}>
                              <FormLabel
                                htmlFor="company-code"
                                
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                              >
                                Code (Optional)
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
                                    id="company-code"
                                    error={codeValid}
                                    helperText={codeValid ? 'Code does not exist' : null}
                                    value={compCode}
                                    variant="outlined"
                                    onKeyDown={(e)=>onEnter(e)}
                                    onChange={(event) => onChangeCompCode(event.target.value)}
                                    inputProps={{ 'data-cy': 'company_code' }}
                                  />
                                </div>
                              </FormControl>
                            </div>
                            {/* Contact Person */}
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
                                    error={contactPerson}
                                    helperText={contactPerson ? contactErrorMessage : null}
                                    className={clsx(classes.textFieldWhite, 'textarea-field')}
                                    id="contact_person"
                                    name="contact_person"
                                    value={contPerson}
                                    variant="outlined"
                                    onFocus={(event) => contactPersonValidation(event)}
                                    onChange={(event) => contactPersonValidation(event)}
                                    inputProps={{
                                      'data-cy': 'company_contact_person',
                                    }}
                                  />
                                </div>
                              </FormControl>
                            </div>
                            {/* Contact Number */}
                            <div className={classes.contentItemStyle}>
                              <FormLabel
                                htmlFor="contact-number"
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                              >
                                Contact Number
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
                                    id="contact_number"
                                    name="contact_number"
                                    value={contNumber}
                                    variant="outlined"
                                    onFocus={(event) => contactNoValidation(event)}
                                    onChange={(event) => contactNoValidation(event)}
                                    error={contactNumber}
                                    helperText={contactNumber ? contactNoErrorMessage : null}
                                    inputProps={{ 'data-cy': 'company_number' }}
                                  />
                                </div>
                              </FormControl>
                            </div>
                            {/* Department */}
                            <div className={classes.contentItemStyle}>
                              <FormLabel
                                htmlFor="department"
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                              >
                                Department (Optional)
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
                                    id="department"
                                    value={department}
                                    variant="outlined"
                                    onChange={(event) => setDepartment(event.target.value)}
                                    inputProps={{
                                      'data-cy': 'company_department',
                                    }}
                                  />
                                </div>
                              </FormControl>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      {/* ADDRESS */}
                      <div className={classes.contentItemStyle}>
                        <Card>
                          <CardHeader
                            title={
                              <Typography className={clsx(classes.cardTitle, classes.cardContentPadding)}>
                                <span data-cy="address_text">Address</span>
                              </Typography>
                            }
                          />
                          <CardContent className={classes.headerBG}>
                            <Grid container>
                              <Grid item xs={12}>
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
                              <Grid item xs={12}>
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
                                        // error={boolFloorNo}
                                        // helperText={
                                        //   boolFloorNo
                                        //     ? boolFloorNoErrorMessage
                                        //     : null
                                        // }
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
                                <div className={classes.contentItemSpacing}>
                                  <Typography
                                    className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                    color="textSecondary"
                                  >
                                    Country
                                  </Typography>
                                  <Typography
                                    className={clsx(classes.cardContentPadding)}
                                    style={{ marginTop: 5, fontSize: 16 }}
                                    gutterBottom
                                  >
                                    {country}
                                  </Typography>
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
                      {/* Button Send and Print */}
                      <div className={classes.contentItemSpacing}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid container alignItems="flex-start" justify="flex-end">
                              <Grid item>
                                <div>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={
                                      btnToggle ||
                                      address_info.himsLoadingProvince ||
                                      address_info.himsLoadingCity ||
                                      address_info.himsLoadingBarangay
                                    }
                                    data-cy="send_print_btn"
                                  >
                                    Next
                                  </Button>
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
    </Dialog>
  );
};

NewRequest.propTypes = {
  closeForm: PropTypes.any,
  open: PropTypes.any,
  prevDetails: PropTypes.any,
  openPrevDetails: PropTypes.any,
  buttonActive: PropTypes.any,
};

export default NewRequest;
