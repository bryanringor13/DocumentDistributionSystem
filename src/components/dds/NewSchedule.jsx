import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Grid,
  Fab,
  Card,
  CardHeader,
  CardContent,
  FormLabel,
  FormControl,
  NativeSelect,
  TextField,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  TextareaAutosize,
  FormHelperText,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DatePicker from 'react-datepicker';

import 'core-js/es/array';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarImg from '../../assets/img/icons/calendar.png';
import Slide from '@material-ui/core/Slide';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import * as ADDRESS from '../../store/actions/addressActions';
import * as SCHEDULE from '../../store/actions/scheduleAction';
import * as REQ_TYPE from '../../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import InputBase from '@material-ui/core/InputBase';
import PrimaryButton from '../common/Button/PrimaryButton';
import { DateRangePickerComponent, DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import RadioButton from '../common/RadioButton/RadioButton';
import { TrainOutlined } from '@material-ui/icons';

moment.locale();
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
    '& .MuiFab-root': {
      boxShadow: 'none',
    },
    '& .MuiFormHelperText-root.Mui-error': {
      background: '#f5f6f9 !important',
    },
  },

  timeWrapper: {
    width: '100%',
    marginTop: '10px',
  },
  checkboxWrapper: {
    flexDirection: 'unset',
    padding: '10px 20px',
  },
  contentSubText: {
    fontSize: '14px',
    lineHeight: '24px',
    color: 'rgba(43, 45, 51, 0.8)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerBG: {
    backgroundColor: '#F4F6F9',
  },
  textFieldWhite: {
    backgroundColor: 'white',
  },
  cardContentPadding: {
    padding: theme.spacing(0, 2),
  },
  cardContentPaddingWrapper: {
    marginBottom: '1.25rem',
    padding: theme.spacing(0, 2),
  },
  cardWrapper: {
    marginBottom: '50px',
  },
  contentItemStyle: {
    marginTop: '4px',
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
  headerStyle: {
    fontWeight: 'bold',
  },
  dayOfMonth: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControlWrapperDay: {
    marginLeft: '45px',
    flexDirection: 'column !important',
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
  contentText: {
    fontSize: 14,
  },
  cardContentPadding: {
    padding: theme.spacing(0, 2),
  },
  contentItemSpacing: {
    marginTop: '24px',
    width: '100%',
  },
  cardBox: {
    overflow: 'inherit',
  },
  everyDayofMonth: {
    flexDirection: 'column !important',
  },
  everyWeek: {
    flexDirection: 'column !important',
  },
  subHeaderStyle: {
    fontSize: 14,
    color: '#7F8080',
    marginBottom: 10,
  },
  cardContentPadding: {
    padding: theme.spacing(0, 2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  checkboxItem: {
    color: 'rgb(65, 182, 127) !important',
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
  typeRequest: {
    display: 'flex',
    flexDirection: 'column',
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

const NewSchedule = ({ handleClose, getData, getAddress }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule);
  const address_info = useSelector((state) => state.address);
  console.log(schedule, 'REQUESTORRR');
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

  const dataSched = [
    {
      label: 'Daily (Business Days)',
      name: 'daily',
    },
    {
      label: 'Weekly',
      name: 'weekly',
    },
    {
      label: 'Monthly',
      name: 'monthly',
    },
  ];

  const listOfMonthDay = [
    {
      label: '1st Day',
      name: '1',
    },
    {
      label: '2nd Day',
      name: '2',
    },
    {
      label: '3rd Day',
      name: '3',
    },
    {
      label: '4th Day',
      name: '4',
    },
    {
      label: '5th Day',
      name: '5',
    },
    {
      label: '6th Day',
      name: '6',
    },
    {
      label: '7th Day',
      name: '7',
    },
    {
      label: '8th Day',
      name: '8',
    },
    {
      label: '9th Day',
      name: '9',
    },
    {
      label: '10th Day',
      name: '10',
    },
    {
      label: '11th Day',
      name: '11',
    },
    {
      label: '12th Day',
      name: '12',
    },
    {
      label: '13th Day',
      name: '13th Day',
    },
    {
      label: '14th Day',
      name: '14',
    },
    {
      label: '15th Day',
      name: '15',
    },
    {
      label: '16th Day',
      name: '16',
    },
    {
      label: '17th Day',
      name: '17',
    },
    {
      label: '18th Day',
      name: '18',
    },
    {
      label: '19th Day',
      name: '19',
    },
    {
      label: '20th Day',
      name: '20',
    },
    {
      label: '21st Day',
      name: '21',
    },
    {
      label: '22nd Day',
      name: '22',
    },
    {
      label: '23rd Day',
      name: '23',
    },
    {
      label: '24th Day',
      name: '24',
    },
    {
      label: '25th Day',
      name: '25',
    },
    {
      label: '26th Day',
      name: '26',
    },
    {
      label: '27th Day',
      name: '27',
    },
    {
      label: '28th Day',
      name: '28',
    },
    {
      label: '29th Day',
      name: '29',
    },
    {
      label: '30th Day',
      name: '30',
    },
    {
      label: '31st Day',
      name: '31',
    },
  ];
  //  Item Validation
  const itemValid = {
    itemError: false,
    errMessage: '',
    otherItem: 0,
    otherItemError: false,
    otherItemMessage: '',
  };

  const validateFieldList = {
    deltype: true,
    urgent: true,
    comp_name: true,
    contact_person: true,
    contact_number: true,
    floor_no: true,
    dateStartOn: true,
    startOn: true,
    endOn: true,
    building_name: true,
    street: true,
    item0: true,
    itemNo0: true,
    oItem0: false,
    expDate: true,
    zip_code: false,
  };

  const [addressLoaded, setAddressLoaded] = useState(false);
  const [moreItems, setMoreItems] = useState([newItem]);
  const [countItem, setCountItem] = useState(1);
  const [btnToggle, setButtonToggle] = useState(true);
  const [repeatVal, setRepeatVal] = useState('daily');
  const [itemsErrorMessage, setItemsErrorMessage] = useState([itemValid]);
  const [validationState, setValidationState] = useState(validateFieldList);
  const [readyToValidate, setReadyToValidate] = useState([]);
  const [otherItem, setOtherItem] = useState(true);

  const [date_of_month, setMonth] = useState('1');
  const [dateStartOn, setDateStartOn] = useState('');
  const [day_of, setDayOf] = useState('');
  const [startOn, setStartOn] = useState('');
  const [endOn, setEndOn] = useState('');
  const [weeklyCheckbox, setWeeklyCheckbox] = useState([]);
  const [weekCheck, setWeekCheck] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
  });
  const handleChangeCheckbox = (e) => {
    const checkWeek = weekCheck;
    const value = e.target.name;
    const inner = e.target.value;
    const copyCheckbox = weeklyCheckbox;
    const index = copyCheckbox.indexOf(value);
    if (index === -1) {
      checkWeek[inner] = true;
      setWeekCheck({ ...weekCheck, checkWeek });
      copyCheckbox.push(value);
      setWeeklyCheckbox(copyCheckbox);
    } else {
      checkWeek[inner] = false;
      setWeekCheck({ ...weekCheck, checkWeek });
      copyCheckbox.splice(index, 1);
      setWeeklyCheckbox(copyCheckbox);
    }
  };

  // Company Details
  const [compName, setCompName] = useState('');
  const [compCode, setCompCode] = useState('');
  const [contPerson, setContPerson] = useState('');
  const [contNumber, setContNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [remark, setRemark] = useState();
  const [requestor_id, setRequestorID] = useState('');
  // Validation Field State
  const [boolStart, setBoolStart] = useState(false);
  const [boolEnd, setBoolEnd] = useState(false);
  const [boolResUrgency, setboolResUrgency] = useState(false);
  const [compNameNotValid, setCompNameNotValid] = useState(false);
  const [contactPerson, setContactPerson] = useState(false);
  const [contactNumber, setContactNumber] = useState(false);
  const [boolFloorNo, setBoolFloorNo] = useState(false);
  const [boolBuildName, setBoolBuildName] = useState(false);
  const [boolStreet, setBoolStreet] = useState(false);
  const [boolBarangay, setBoolBarangay] = useState(false);
  const [boolZipCode, setBoolZipCode] = useState(false);
  const [dateEndOn, setDateEndOn] = useState('');
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
  const [monthlyItem, setMonthlyItem] = useState();
  const [hmo_partner_id, setHmoPartner] = useState(0);
  const [requestorDepartment, setRequestorDepartment] = useState();
  const [preferred_time, setPreferredTime] = useState('7:30 am');
  const [request_type, setRequestType] = useState('');
  const [date_of_week, setDateOfWeek] = useState('');
  const [date_of_week_number, setDateOfWeekNumber] = useState('');
  const [department_id, setDepartmentID] = useState(0);
  const [moreValid, setMoreValid] = useState(true);
  const [requestorData, setRequestorData] = useState({
    requestor: '',
    hmo: '',
    department: '',
  });
  const [dateEndMessage, setDateEndMessage] = useState('');
  const [dateStartMessage, setDateStartMessage] = useState('');
  const [requestorList, setRequestorList] = useState([]);
  const [partnerList, setPartnerList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
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

  console.log(hmo_partner_id, 'hmo', department_id);
  const onClickEndOn = (data) => {
    document.querySelector('.date-picker-single-2').click();
  };
  const onClickStartOn = (data) => {
    document.querySelector('.date-picker-single-1').click();
  };

  // Address Actions
  const unitHandler = (event) => {
    const value = event.target.value;
    setUnit(value);
  };

  console.log(date_of_week, 's', repeatVal, 'a', day_of, 'd', date_of_week_number, 'ss', date_of_week);
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

  const onChangeHmoPartner = (e) => {
    setRequestorID('');
    setDepartmentID(0);

    setHmoPartner(parseInt(e.target.value));
    dispatch(
      SCHEDULE.filterRequestorDetailsReset(
        e.target.value,
        requestor_id,
        department_id,
        setDepartmentList,
        setPartnerList,
        setRequestorList
      )
    );
    let hmoVal = requestorData;

    var e = document.getElementById('hmo_partner_id');
    var strUser = e.options[e.selectedIndex].text;
    hmoVal.hmo = strUser;
    setRequestorData(hmoVal);
  };

  const onChangeRequestorDepartmentl = (e) => {
    setDepartmentID(parseInt(e.target.value));
    setRequestorID('');

    dispatch(
      SCHEDULE.filterRequestorDetailsPartner(
        hmo_partner_id,
        requestor_id,
        e.target.value,
        setDepartmentList,
        setPartnerList,
        setRequestorList
      )
    );

    let departmentVal = requestorData;

    var e = document.getElementById('department_id');
    var strUser = e.options[e.selectedIndex].text;
    departmentVal.department = strUser;
    setRequestorData(departmentVal);
  };

  const onChangeRequestor = (data) => {
    setRequestorID(data.target.value);
    setRequestorData({ ...requestorData, requestorId: data.target.value });
    let requestorVal = requestorData;
    var e = document.getElementById('requestor_id');
    // dispatch(SCHEDULE.filterRequestorDetailsRequestor(hmo_partner_id,data.target.value,department_id,setDepartmentList,setPartnerList,setRequestorList))

    var strUser = e.options[e.selectedIndex].text;
    requestorVal.requestor = strUser;
    setRequestorData(requestorVal);

    //  dispatch(SCHEDULE.getRequestorData(data.target.value))
  };

  const changeMonthlyItem = (e) => {
    setDayOf(e.target.value);
  };
  const changeWeek = (e) => {
    setDateOfWeek(e.target.value);
  };

  const changeWeekNumber = (e) => {
    setDateOfWeekNumber(e.target.value);
  };

  // Change State Validation
  const changeValidateStatus = (name, response, oItem = null, oResponse = null) => {
    const setNewValidState = { ...validationState };
    if (oItem !== null) {
      setNewValidState[oItem] = oResponse;
    }
    setNewValidState[name] = response;

    setValidationState(setNewValidState);
    setReadyToValidate([setNewValidState]);
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

  const otherItemsSetValidation = (index, boolSet, message) => {
    const otherItemsNewErrorMessage = [...itemsErrorMessage];
    otherItemsNewErrorMessage[index].otherItemError = boolSet;
    otherItemsNewErrorMessage[index].otherItemMessage = message;
    setItemsErrorMessage(otherItemsNewErrorMessage);
  };
  // validation for No Item
  const itemsSetValidation = (index, boolSet, message) => {
    const itemsNewErrorMessage = [...itemsErrorMessage];
    itemsNewErrorMessage[index].itemError = boolSet;
    itemsNewErrorMessage[index].errMessage = message;
    setItemsErrorMessage(itemsNewErrorMessage);
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

  const noOfItemsHandler = (index, value) => {
    const itemData = [...moreItems];
    itemData[index].count = parseInt(value);
    setMoreItems(itemData);
  };
  // Validation for Urgency
  const reasUrgencyValidation = (event, name) => {
    let valid = false;
    const value = event.target.value;

    if (value) {
      setRemark(value);
      valid = false;
    } else {
      setRemark(value);
      valid = true;
    }

    setboolResUrgency(valid);
    // changeValidateStatus(name, valid);
  };

  // Validation for Start
  const startValidation = (event, name) => {
    let valid = false;
    let message;
    const value = event.target.value;

    if (value) {
      valid = false;
    } else {
      valid = true;
      message = 'Starts On is required';
    }

    setDateStartMessage(message);
    setBoolStart(valid);
    changeValidateStatus(name, valid);
  };

  // Validation for End
  const endValidation = (event, name) => {
    let valid = false;
    let message;
    const value = event.target.value;

    if (value) {
      valid = false;
    } else {
      valid = true;
      message = 'Ends On is required';
    }

    setDateEndMessage(message);
    setBoolEnd(valid);
    changeValidateStatus(name, valid);
  };

  const today = new Date();

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

    const more = moreItems.some((item) => item.count === 0);
    setMoreValid(more);

    itemsSetValidation(index, valid, message);

    changeValidateStatus(name, valid);
  };

  const onChangePreferredTime = (data) => {
    const item = moment(data.target.value, 'h:mm').format('LT');
    console.log(item, 'format');
    setPreferredTime(item);
  };

  console.log(moreValid, 'e');
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
      const more = moreItems.some((item) => item.count === 0);
      setMoreValid(more);
      setMoreItems([...moreItems, newAdItem]);
      setItemsErrorMessage([...itemsErrorMessage, itemValid]);
      setValidationState({
        ...validationState,
        [itemName]: true,
        [noItemName]: true,
        [oItem]: false,
      });

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
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  if (!addressLoaded) {
    dispatch(ADDRESS.getHimsAllProvince());
    setAddressLoaded(true);
  }

  console.log(moreItems, 'moreitems');
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

  const setCity = (event) => {
    const name = event.target.options[event.target.selectedIndex].text;
    const splitvalue = event.target.value.split(',');
    const value = splitvalue[0];
    const valueIndex = splitvalue[1];
    setStateProvince(splitvalue);
    setStateProvinceLabel(name);
    setStateProvinceIndex(valueIndex);

    dispatch(ADDRESS.getHimsCityAndBarangay(value, setCityMunicipalityLabel, setBrgyLabel));
  };

  const onChangeRepeatVal = (event) => {
    setRepeatVal(event.target.value);
  };

  function isLater(str1, str2) {
    return new Date(str1) > new Date(str2);
  }

  // const onkeyup = (e) => {
  //   let valid = false;
  //   let message = '';

  //   if (typeof e.target.value != 'undefined') {
  //     valid = false;
  //   } else {
  //     valid = true;
  //     message = 'Starts On is required';
  //   }

  //   setDateStartMessage(message);
  //   changeValidateStatus('startOn', valid);
  // };

  // const onkeyupEnd = (e) => {
  //   let valid = false;
  //   let message = '';

  //   if (typeof e.target.value != 'undefined') {
  //     valid = false;
  //   } else {
  //     valid = true;
  //     message = 'Ends On is required';
  //   }

  //   setDateEndMessage(message);
  //   changeValidateStatus('endOn', valid);
  // };

  const onChangeEndOn = (data) => {
    let valid = false;
    let message = null;

    const item = moment(data).format('ll');
    if (item) {
      if (startOn) {
        if (isLater(startOn, item)) {
          valid = true;
          message = 'Invalid Ends On';
        }
      } else {
        valid = false;
        setBoolEnd(false);
      }
    } else {
      valid = true;
      message = 'Ends On is required';
    }

    if (!valid) {
      setBoolStart(false);
      setDateStartMessage('');

      changeValidateStatus('startOn', valid);
    }

    if (data === null) {
      valid = true;
      message = 'Ends On is required';
    }

    setDateEndMessage(message);
    setEndOn(item);
    setDateEndOn(data);
    changeValidateStatus('endOn', valid);
  };

  const onChangeStarOn = (data) => {
    let valid = false;
    let message = null;
    const item = moment(data).format('ll');
    if (item) {
      if (endOn) {
        if (isLater(item, endOn)) {
          valid = true;
          message = 'Invalid Starts On';
        }
      } else {
        valid = false;

        setBoolStart(false);
      }
    } else {
      valid = true;
      message = 'Starts On is required';
    }

    if (!valid) {
      setBoolEnd(false);
      setDateEndMessage('');

      changeValidateStatus('endOn', valid);
    }

    if (data === null) {
      valid = true;
      message = 'Starts On is required';
    }

    setStartOn(item);
    setDateStartOn(data);
    setDateStartMessage(message);
    changeValidateStatus('startOn', valid);
  };

  console.log(
    moreItems.some((item) => item.count === 0),
    'moreitem'
  );
  const setBarangay = (event) => {
    const name = event.target.options[event.target.selectedIndex].text;
    const splitvalue = event.target.value.split(',');
    const value = splitvalue[0];
    const valueIndex = splitvalue[1];
    setCityMunicipality(splitvalue);
    setCityMunicipalityLabel(name);

    setCityMunicipalityIndex(valueIndex);

    dispatch(ADDRESS.getHimsBarangay(value, setBrgyLabel));
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

  const onSaveSchedule = (event) => {
    event.preventDefault();
    let schedule_details = {};
    if (repeatVal === 'daily') {
      schedule_details = {
        repeats: repeatVal,
        starts_on: startOn,
        ends_on: endOn,
      };
    } else if (repeatVal === 'weekly') {
      schedule_details = {
        repeats: repeatVal,
        starts_on: startOn,
        ends_on: endOn,
        weekly_days: weeklyCheckbox,
      };
    } else if (repeatVal === 'monthly') {
      if (day_of === 'week') {
        schedule_details = {
          repeats: repeatVal,
          starts_on: startOn,
          ends_on: endOn,
          day_of: day_of,
          day_of_week: date_of_week,
          day_of_week_number: date_of_week_number,
        };
      } else if (day_of === 'month') {
        schedule_details = {
          repeats: repeatVal,
          starts_on: startOn,
          ends_on: endOn,
          day_of: day_of,
          day_of_month: date_of_month,
        };
      }
    }
    let allItem = [];
    for (const da of moreItems) {
      const setPerItem = {
        type: da.type,
        other: da.other,
        count: da.count,
      };
      allItem = [...allItem, setPerItem];
    }

    let newFormReq = {
      schedule_details,
      request_details: {
        hmo_partner_id: parseInt(hmo_partner_id),
        department_id: parseInt(department_id),
        requestor_id: requestor_id.toString(),
        preferred_time: preferred_time,
        request_type: parseInt(request_type),
        remarks: remark,
      },
      item_details: {
        items: allItem,
      },
      company_details: {
        name: compName,
        code: compCode,
        contact_person: contPerson,
        contact_number: contNumber.toString(),
        department: department,
      },
      address_details: {
        barangay: address_info.himsBarangay[brgyIndex].id,
        city: address_info.himsCity[cityMunicipalityIndex].id,
        province: address_info.himsProvinces[stateProvinceIndex].id,
        unit: unit,
        floor_no: floorNo,
        building_name: buildName,
        street: street,
        zip_code: parseInt(zipCode),
      },
    };

    getData(newFormReq);

    getAddress(stateProvinceLabel, cityMunicipalityLabel, brgyLabel, requestorData);
  };

  const onChangeMonth = (data) => {
    setMonth(data.target.value);
  };

  console.log(schedule.loadingRequestor, 'TESTTTTss');
  return (
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
              <form noValidate autoComplete="off" onSubmit={(event) => onSaveSchedule(event)}>
                <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                  <Grid item className={classes.containerSize} xs={6}>
                    <div>
                      <Typography gutterBottom variant="h5" className={classes.headerStyle}>
                        New Schedule Request
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
                            // disabled={btnToggle}

                            disabled={
                              new Date(startOn) > new Date(endOn) ||
                              startOn.length < 1 ||
                              dateStartMessage ||
                              dateEndMessage ||
                              endOn === null ||
                              endOn.length < 1 ||
                              hmo_partner_id === 0 ||
                              department_id === 0 ||
                              requestor_id.length < 1 ||
                              request_type.length < 1 ||
                              compName.length < 1 ||
                              contactPerson.length < 1 ||
                              contNumber.length < 1 ||
                              buildName.length < 1 ||
                              street.length < 1 ||
                              moreValid === true ||
                              hmo_partner_id.length < 1 ||
                              department_id.length < 1 ||
                              isNaN(department_id) ||
                              requestor_id.length < 1 ||
                              (repeatVal === 'weekly' && weeklyCheckbox.length < 1) ||
                              (repeatVal === 'monthly' && day_of.length < 1) ||
                              (repeatVal === 'monthly' &&
                                day_of === 'week' &&
                                (date_of_week_number === '' || date_of_week === '')) ||
                              moreItems.some((item) => item.type === 0 && item.other.length < 1) ||
                              moreItems.some((item) => item.count === 0) ||
                              moreItems.some((item) => item.type === 'none') ||
                              contactNumber === true ||
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
                <Grid container style={{ justifyContent: 'center' }} spacing={2}>
                  <Grid item className={classes.containerSize} xs={6}>
                    <div className={classes.cardWrapper}>
                      <Card classes={{ root: classes.cardBox }}>
                        <CardHeader
                          title={
                            <Typography className={clsx(classes.cardTitle, classes.cardContentPadding)}>
                              <span data-cy="request_details_text">Schedule Details</span>
                            </Typography>
                          }
                        />
                        <CardContent className={classes.headerBG}>
                          <Grid container>
                            <Grid item xs={12}>
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="state-province"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Repeats
                                </FormLabel>
                                <FormControl fullWidth className={classes.cardContentPaddingWrapper}>
                                  <NativeSelect
                                    id="repeatVal"
                                    input={<BootstrapInput />}
                                    value={repeatVal}
                                    onChange={(event) => onChangeRepeatVal(event)}
                                  >
                                    {dataSched.map((res, index) => (
                                      <option name={res.label} value={res.name} key={index}>
                                        {res.label}
                                      </option>
                                    ))}
                                  </NativeSelect>
                                </FormControl>
                              </div>
                              {repeatVal === 'weekly' ? (
                                <>
                                  <div className="checkbox">
                                    <FormControl component="fieldset" className={classes.formControl}>
                                      <FormGroup classes={{ root: classes.checkboxWrapper }}>
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={weekCheck.mon}
                                              classes={{ root: classes.checkboxItem }}
                                              onChange={handleChangeCheckbox}
                                              value="mon"
                                              name="monday"
                                            />
                                          }
                                          label="Mon"
                                        />
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={weekCheck.tue}
                                              classes={{ root: classes.checkboxItem }}
                                              onChange={handleChangeCheckbox}
                                              value="tue"
                                              name="tuesday"
                                            />
                                          }
                                          label="Tue"
                                        />
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={weekCheck.wed}
                                              classes={{ root: classes.checkboxItem }}
                                              onChange={handleChangeCheckbox}
                                              value="wed"
                                              name="wednesday"
                                            />
                                          }
                                          label="Wed"
                                        />
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={weekCheck.thu}
                                              classes={{ root: classes.checkboxItem }}
                                              onChange={handleChangeCheckbox}
                                              value="thu"
                                              name="thursday"
                                            />
                                          }
                                          label="Thu"
                                        />
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              checked={weekCheck.fri}
                                              classes={{ root: classes.checkboxItem }}
                                              onChange={handleChangeCheckbox}
                                              value="fri"
                                              name="friday"
                                            />
                                          }
                                          label="Fri"
                                        />
                                      </FormGroup>
                                    </FormControl>
                                  </div>
                                </>
                              ) : repeatVal === 'monthly' ? (
                                <>
                                  <div className={classes.cardContentPadding}>
                                    <FormControl component="fieldset" className={classes.formControlWrapper}>
                                      <RadioGroup
                                        row
                                        aria-label="position"
                                        name="day_of"
                                        id="day_of"
                                        value={day_of}
                                        className={classes.dayOfMonth}
                                        onChange={(event) => changeMonthlyItem(event)}
                                      >
                                        <FormControlLabel
                                          value={'month'}
                                          style={{ width: '100px' }}
                                          control={<RadioButton />}
                                          label={
                                            <Typography style={{ width: '200px' }} className={classes.contentText}>
                                              Day of the Month
                                            </Typography>
                                          }
                                        />
                                        <FormControlLabel
                                          value={'week'}
                                          control={<RadioButton />}
                                          label={
                                            <Typography className={classes.contentText}>Day of the Week</Typography>
                                          }
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                  <div>
                                    {day_of === 'month' ? (
                                      <FormControl fullWidth className={classes.cardContentPaddingWrapper}>
                                        <NativeSelect
                                          id="date_of_month"
                                          input={<BootstrapInput />}
                                          value={date_of_month}
                                          onChange={(event) => onChangeMonth(event)}
                                        >
                                          {listOfMonthDay.map((res, index) => (
                                            <option name={res.label} value={res.name} key={index}>
                                              {res.label}
                                            </option>
                                          ))}
                                        </NativeSelect>
                                      </FormControl>
                                    ) : day_of === 'week' ? (
                                      <div className={classes.cardContentPadding}>
                                        <p>Every</p>
                                        <div style={{ display: 'flex' }}>
                                          <FormControl component="fieldset" className={classes.formControlWrapper}>
                                            <RadioGroup
                                              row
                                              aria-label="position"
                                              name="date_of_week_number"
                                              id="date_of_week_number"
                                              value={date_of_week_number}
                                              className={classes.everyWeek}
                                              onChange={(event) => changeWeekNumber(event)}
                                            >
                                              <FormControlLabel
                                                value={'first'}
                                                style={{ width: '100px' }}
                                                control={<RadioButton />}
                                                label={
                                                  <Typography
                                                    style={{ width: '200px' }}
                                                    className={classes.contentText}
                                                  >
                                                    First
                                                  </Typography>
                                                }
                                              />
                                              <FormControlLabel
                                                value={'second'}
                                                control={<RadioButton />}
                                                label={<Typography className={classes.contentText}>Second</Typography>}
                                              />
                                              <FormControlLabel
                                                value={'third'}
                                                control={<RadioButton />}
                                                label={<Typography className={classes.contentText}>Third</Typography>}
                                              />
                                              <FormControlLabel
                                                value={'fourth'}
                                                control={<RadioButton />}
                                                label={<Typography className={classes.contentText}>Fourth</Typography>}
                                              />
                                              <FormControlLabel
                                                value={'last'}
                                                control={<RadioButton />}
                                                label={<Typography className={classes.contentText}>Last</Typography>}
                                              />
                                            </RadioGroup>
                                          </FormControl>
                                          <FormControl component="fieldset" className={classes.formControlWrapperDay}>
                                            <RadioGroup
                                              row
                                              aria-label="position"
                                              name="date_of_week"
                                              id="date_of_week"
                                              value={date_of_week}
                                              className={classes.everyDayofMonth}
                                              onChange={(event) => changeWeek(event)}
                                            >
                                              <FormControlLabel
                                                value={'monday'}
                                                style={{ width: '100px' }}
                                                control={<RadioButton />}
                                                label={
                                                  <Typography
                                                    style={{ width: '200px' }}
                                                    className={classes.contentText}
                                                  >
                                                    Mon
                                                  </Typography>
                                                }
                                              />
                                              <FormControlLabel
                                                value={'tuesday'}
                                                control={<RadioButton />}
                                                label={<Typography className={classes.contentText}>Tue</Typography>}
                                              />
                                              <FormControlLabel
                                                value={'wednesday'}
                                                control={<RadioButton />}
                                                label={<Typography className={classes.contentText}>Wed</Typography>}
                                              />
                                              <FormControlLabel
                                                value={'thursday'}
                                                control={<RadioButton />}
                                                label={<Typography className={classes.contentText}>Thu</Typography>}
                                              />
                                              <FormControlLabel
                                                value={'friday'}
                                                control={<RadioButton />}
                                                label={<Typography className={classes.contentText}>Fri</Typography>}
                                              />
                                            </RadioGroup>
                                          </FormControl>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                </>
                              ) : null}
                            </Grid>
                            <Grid item xs={12}>
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="state-province"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Starts On
                                </FormLabel>
                                <FormControl fullWidth className={classes.cardContentPadding}>
                                  <div className="date-item">
                                    <img
                                      src={CalendarImg}
                                      onClick={onClickStartOn}
                                      className="calander-icon"
                                      alt="calendar"
                                    />

                                    <DatePicker
                                      id="dateStartOn"
                                      minDate={today}
                                      // onClickOutside={(e) => onkeyup(e)}
                                      selected={dateStartOn}
                                      dateFormat="MMM d, yyyy"
                                      value={dateStartOn}
                                      className="date-picker-single date-picker-single-1"
                                      onChange={(data) => onChangeStarOn(data)}
                                      onFocus={(event) => startValidation(event, 'startOn')}
                                    />
                                  </div>
                                  {dateStartMessage && <FormHelperText error={true}>{dateStartMessage}</FormHelperText>}
                                </FormControl>
                              </div>
                            </Grid>
                            <Grid item xs={12}>
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="state-province"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Ends On
                                </FormLabel>
                                <FormControl fullWidth className={classes.cardContentPadding}>
                                  <div className="date-item">
                                    <DatePicker
                                      minDate={today}
                                      // onClickOutside={(e) => onkeyupEnd(e)}
                                      selected={dateEndOn}
                                      dateFormat="MMM d, yyyy"
                                      value={dateEndOn}
                                      className="date-picker-single date-picker-single-2"
                                      onChange={(data) => onChangeEndOn(data)}
                                      onFocus={(event) => endValidation(event, 'endOn')}
                                    />
                                    <img
                                      src={CalendarImg}
                                      onClick={onClickEndOn}
                                      className="calander-icon"
                                      alt="calendar"
                                    />
                                  </div>
                                  {dateEndMessage && <FormHelperText error={true}>{dateEndMessage}</FormHelperText>}
                                </FormControl>
                              </div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </div>
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
                          <Grid container>
                            <Grid item xs={12}>
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="state-province"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  HMO Partner
                                </FormLabel>
                                <FormControl fullWidth className={classes.cardContentPaddingWrapper}>
                                  <NativeSelect
                                    id="hmo_partner_id"
                                    input={<BootstrapInput />}
                                    value={hmo_partner_id}
                                    onChange={(event) => onChangeHmoPartner(event)}
                                  >
                                    {REQ_TYPE.PARTNER.map((res, index) => (
                                      <option name={res.text} value={res.code} key={index}>
                                        {res.text}
                                      </option>
                                    ))}
                                    {/* {partnerList.legnth && <option name={'none'} value={''}>
                              None
                        </option>}
                      {partnerList.length ? partnerList.map((res, index) => (
                        <option name={res.text} value={res.id} key={index}>
                              {res.name}
                            </option>
                        )) :REQ_TYPE.PARTNER.map((res, index) => (
                        <option name={res.text} value={res.code} key={index}>
                              {res.text}
                            </option>
                        ))} */}
                                  </NativeSelect>
                                </FormControl>
                              </div>
                            </Grid>
                            <Grid item xs={12}>
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="state-province"
                                  className={clsx(classes.contentSubText, classes.cardContentPaddingWrapper)}
                                >
                                  Requestor Department
                                </FormLabel>
                                <FormControl fullWidth className={classes.cardContentPaddingWrapper}>
                                  <NativeSelect
                                    id="department_id"
                                    name="department_id"
                                    input={<BootstrapInput />}
                                    value={department_id}
                                    disabled={schedule.loadingPartner}
                                    onChange={(event) => onChangeRequestorDepartmentl(event)}
                                  >
                                    {schedule.loadingPartner ? (
                                      <>
                                        <option value="">Loading...</option>
                                      </>
                                    ) : departmentList.length && !schedule.loadingPartner ? (
                                      <>
                                        {
                                          <option name={'none'} selected value={''}>
                                            None
                                          </option>
                                        }
                                        {departmentList.map((res, index) => {
                                          if (index === 0) {
                                            return (
                                              <option name={res.text} value={res.id} key={index}>
                                                {res.name}
                                              </option>
                                            );
                                          } else {
                                            return (
                                              <option name={res.text} value={res.id} key={index}>
                                                {res.name}
                                              </option>
                                            );
                                          }
                                        })}
                                      </>
                                    ) : (
                                      <>
                                        <option name={'none'} value={''}>
                                          None
                                        </option>
                                      </>
                                    )}
                                  </NativeSelect>
                                </FormControl>
                              </div>
                            </Grid>
                            <Grid item xs={12}>
                              <div className={classes.contentItemStyle}>
                                <FormLabel
                                  htmlFor="state-province"
                                  className={clsx(classes.contentSubText, classes.cardContentPadding)}
                                >
                                  Requestor
                                </FormLabel>
                                <FormControl fullWidth className={classes.cardContentPadding}>
                                  <NativeSelect
                                    id="requestor_id"
                                    input={<BootstrapInput />}
                                    value={requestor_id}
                                    disabled={schedule.loadingRequestor}
                                    onChange={(event) => onChangeRequestor(event)}
                                  >
                                    {schedule.loadingRequestor ? (
                                      <>
                                        <option value="">Loading...</option>
                                      </>
                                    ) : requestorList.length && !schedule.loadingRequestor ? (
                                      <>
                                        <option name={'none'} selected value={''}>
                                          None
                                        </option>
                                        {requestorList.map((res, index) => {
                                          if (index === 0) {
                                            return (
                                              <option name={res.text} value={res.id} key={index}>
                                                {res.first_name + ' ' + res.last_name}
                                              </option>
                                            );
                                          } else {
                                            return (
                                              <option name={res.text} value={res.id} key={index}>
                                                {res.first_name + ' ' + res.last_name}
                                              </option>
                                            );
                                          }
                                        })}
                                      </>
                                    ) : (
                                      <>
                                        <option name={'none'} value={''}>
                                          None
                                        </option>
                                      </>
                                    )}
                                  </NativeSelect>
                                </FormControl>
                              </div>
                            </Grid>
                            {/* Expected Date */}
                            <div className={classes.contentItemSpacing}>
                              <FormLabel
                                htmlFor="expected-delivery"
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                              >
                                Preferred Time
                              </FormLabel>
                              <FormControl className={clsx(classes.cardContentPadding)} style={{ width: '100%' }}>
                                <div className="datepicker-control-section">
                                  <TextField
                                    id="preferred_time"
                                    variant="outlined"
                                    type="time"
                                    defaultValue="07:30"
                                    className={classes.timeWrapper}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    onChange={(data) => onChangePreferredTime(data)}
                                    inputProps={{
                                      step: 300, // 5 min
                                    }}
                                  />
                                </div>
                                {/* </LocalizationProvider> */}
                              </FormControl>
                            </div>
                            {/** */}
                            <div className={classes.typeRequest}>
                              <FormLabel className={clsx(classes.contentSubText, classes.cardContentPadding)}>
                                Type of Request
                              </FormLabel>
                              <FormControl component="fieldset" className={classes.formControlWrapper}>
                                <RadioGroup
                                  row
                                  aria-label="position"
                                  name="request_type"
                                  id="request_type"
                                  value={request_type}
                                  className={classes.cardContentPadding}
                                  onChange={(event) => setRequestType(event.target.value)}
                                >
                                  <FormControlLabel
                                    value={'1'}
                                    style={{ width: '150px' }}
                                    control={<RadioButton />}
                                    label={
                                      <Typography style={{ width: '200px' }} className={classes.contentText}>
                                        For Delivery
                                      </Typography>
                                    }
                                  />
                                  <FormControlLabel
                                    value={'2'}
                                    control={<RadioButton />}
                                    label={<Typography className={classes.contentText}>For Pickup</Typography>}
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>

                            {/**/}

                            {/*textarea*/}
                            <div className={classes.contentItemSpacing}>
                              <FormLabel
                                htmlFor="remark"
                                className={clsx(classes.contentSubText, classes.cardContentPadding)}
                              >
                                Remarks (Optional):
                              </FormLabel>
                              <FormControl
                                fullWidth
                                className={clsx(classes.cardContentPadding, classes.marginTopTextArea)}
                                name="remark"
                                id="remark"
                                variant="outlined"
                              >
                                <TextareaAutosize
                                  className="text-area-custom"
                                  aria-label="Remarks"
                                  rows={5}
                                  sytle={{}}
                                  placeholder="Remarks"
                                  value={remark}
                                  onChange={(event) => reasUrgencyValidation(event, 'urgent')}
                                  onFocus={(event) => reasUrgencyValidation(event, 'urgent')}
                                />
                                {/* {boolResUrgency && (
                      <FormHelperText error={boolResUrgency}>
                        Reason for Urgency is required
                      </FormHelperText>
                    )} */}
                              </FormControl>
                            </div>
                          </Grid>
                        </CardContent>
                      </Card>
                    </div>
                  </Grid>
                  <Grid item className={classes.containerSize} xs={6}>
                    <Grid item className={classes.containerSize} xs={6}>
                      <div className={classes.cardWrapper}>
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
                          </CardContent>
                        </Card>
                      </div>
                      {/** company details */}
                      <div className={classes.cardWrapper}>
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
                                      value={compCode}
                                      variant="outlined"
                                      onChange={(event) => setCompCode(event.target.value)}
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
                                        id="buildName"
                                        name="buildName"
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
                                    // disabled={btnToggle}
                                    disabled={
                                      new Date(startOn) > new Date(endOn) ||
                                      startOn.length < 1 ||
                                      dateStartMessage ||
                                      dateEndMessage ||
                                      endOn === null ||
                                      endOn.length < 1 ||
                                      hmo_partner_id === 0 ||
                                      department_id === 0 ||
                                      requestor_id.length < 1 ||
                                      request_type.length < 1 ||
                                      compName.length < 1 ||
                                      contactPerson.length < 1 ||
                                      contNumber.length < 1 ||
                                      buildName.length < 1 ||
                                      street.length < 1 ||
                                      moreValid === true ||
                                      hmo_partner_id.length < 1 ||
                                      department_id.length < 1 ||
                                      isNaN(department_id) ||
                                      requestor_id.length < 1 ||
                                      (repeatVal === 'weekly' && weeklyCheckbox.length < 1) ||
                                      (repeatVal === 'monthly' && day_of.length < 1) ||
                                      (repeatVal === 'monthly' &&
                                        day_of === 'week' &&
                                        (date_of_week_number === '' || date_of_week === '')) ||
                                      moreItems.some((item) => item.type === 0 && item.other.length < 1) ||
                                      moreItems.some((item) => item.count === 0) ||
                                      moreItems.some((item) => item.type === 'none') ||
                                      contactNumber === true ||
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
  );
};

export default NewSchedule;
