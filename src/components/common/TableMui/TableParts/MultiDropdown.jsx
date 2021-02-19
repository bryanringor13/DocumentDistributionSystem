import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSpring, animated } from 'react-spring';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import useMeasure from 'react-use-measure';
import PropTypes from 'prop-types';
import ArrowDropdown from '../../../../assets/img/icons/arrow-dropdown.svg';
import Check from '../../../../assets/img/icons/check.png';
import * as CONSTANTS from '../../../../utils/Constants';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '14px',

    margin: '0',
    color: 'rgba(43, 45, 51, 0.8)',
    marginBottom: '7px',
    lineHeight: '13px',
  },
  multiSelectWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '25px',
    position: 'relative',
    '& .PrivateSwitchBase-root-529': {
      padding: '8px 9px',
    },
  },
  mainBtn: {
    fontWeight: 'normal !important',
    fontSize: '14px !important',
    justifyContent: 'left',
    padding: ' 11px 38px 8px 16px',
    position: 'relative',
    border: '1px solid #A5B0BE',
    background: '#fff',
    borderRadius: '4px',
    '&::after': {
      content: `url(${ArrowDropdown})`,
      // content: '',
      position: 'absolute',
      right: 10,
      marginTop: '-2px',
      // top: 3,
    },
  },
  modal: {
    width: '277px',
    padding: '16px',
    position: 'absolute',
    background: '#FFFFFF',
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.08)',
    borderRadius: '2px',
    top: '50px',
  },
  multiCheckbox: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectAllWrapper: {
    borderBottom: '1px solid #c4c4c4',
    display: 'flex',
    justifyContent: ' space-between',
    '& .MuiButton-label': {
      color: '#41B67F',
      fontSize: '16px',
    },
    '& .MuiTypography-body1': {
      color: '#41B67F',
      fontSize: '16px',
    },
  },
  '& .MuiTypography-body1': {
    fontSize: '16px',
  },
  icon: {
    borderRadius: 4,
    width: 20,
    height: 20,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#41B67F',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${Check})`,
      borderRadius: 4,
      // backgroundColor: 'red',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#41B67F',
    },
  },
  noFound: {
    textAlign: 'center',
    color: '#A5B0BE',
    fontSize: '16px',
    lineHeight: '24px',
  },
  defaultItem: {
    pointerEvents: 'none',
  },
  defaultItemCheckbox: {
    opacity: '.6',
  },
  checkboxLabel: {
    fontSize: '16px',
  },
}));

const MultiDropdown = ({
  label,
  checkList,
  name,
  selectLabel,
  reportName,
  idx,
  setStateData,
  includeSearch,

  id,
  datacy,
  // triggerChange,
}) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const [item, setItem] = useState([]);
  const [checkboxList, setCheckboxList] = useState(checkList);
  const [selectAll, setSelectAll] = useState(false);
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  const [defaultCheckbox, setDefaultCheckbox] = useState('');
  const [defaultSecondCheckbox, setDefaultSecondCheckbox] = useState('');

  const [bind] = useMeasure();
  const props = useSpring({
    zIndex: show ? 2 : -1,

    opacity: show ? 1 : 0,
    padding: show ? 16 : 0,
    config: {
      mass: 5,
      tension: 1000,
      friction: 80,
      duration: 1,
    },
  });

  const showModal = (e) => {
    setShow(!show);
  };

  useEffect(() => {
    const specifiedElement = document.getElementById(id);

    window.addEventListener('click', (event) => {
      const isClickInside = specifiedElement.contains(event.target);
      if (!isClickInside) {
        setShow(false);
      }
    });
  }, [id]);

  const onChangeCheckBox = (e) => {
    const value = e.target.parentNode.parentNode.parentNode.innerText;
    const copyArr = item;
    const index = copyArr.indexOf(value);

    if (index === -1) {
      copyArr.push(value);
    } else {
      copyArr.splice(index, 1);
    }
    // console.log(item);
    setSelectAll(false);
    setItem([...copyArr]);
    setStateData([...copyArr]);

    // triggerChange();
  };

  useEffect(() => {
    setSelectAll(true);

    if (reportName === 'recTransmitReport') {
      const reportDataColumn = [];
      for (const item of CONSTANTS.TRANSMITTED_REPORT) {
        reportDataColumn.push(item.text);
      }

      setItem(reportDataColumn);
      setStateData(reportDataColumn);
    } else if (reportName === 'messengerMonitoring') {
      const reportDataColumn = [];
      for (const item of CONSTANTS.MESSENGER_MONITORING) {
        reportDataColumn.push(item.text);
      }

      setItem(reportDataColumn);
      setStateData(reportDataColumn);
    } else if (reportName === 'lostInTransit') {
      const reportDataColumn = [];
      for (const item of CONSTANTS.LOST_IN_TRANSIT) {
        reportDataColumn.push(item.text);
      }

      setItem(reportDataColumn);
      setStateData(reportDataColumn);
    } else if (reportName === 'urgentRequest') {
      const reportDataColumn = [];
      for (const item of CONSTANTS.URGENT_REQUEST) {
        reportDataColumn.push(item.text);
      }

      setItem(reportDataColumn);
      setStateData(reportDataColumn);
    } else if (reportName === 'cancelledRequestsReport') {
      const reportDataColumn = [];
      for (const item of CONSTANTS.CANCELLED_REQUEST) {
        reportDataColumn.push(item.text);
      }

      setItem(reportDataColumn);
      setStateData(reportDataColumn);
    } else if (reportName === 'partnerRequestsReport') {
      const reportDataColumn = [];
      for (const item of CONSTANTS.INTELLICARE_AVEGA_REQUEST) {
        reportDataColumn.push(item.text);
      }

      setItem(reportDataColumn);
      setStateData(reportDataColumn);
    } else if (reportName === 'scheduledRequestsReport') {
      const reportDataColumn = [];
      for (const item of CONSTANTS.SCHEDULED_REQUEST) {
        reportDataColumn.push(item.text);
      }

      setItem(reportDataColumn);
      setStateData(reportDataColumn);
    } else if (reportName === 'statisticsPerDepartmentReport') {
      const reportDataColumn = [];
      for (const item of CONSTANTS.STATISTICS_PER_DEPARTMENT) {
        reportDataColumn.push(item.text);
      }

      setItem(reportDataColumn);
      setStateData(reportDataColumn);
    }
  }, [setStateData]);

  const onCheckAll = (e) => {
    const copyArr = [];

    if (e.target.checked) {
      setItem([...checkboxList]);
      // setStateData(idx, [...checkboxList]);
      setStateData(checkboxList);
      setSelectAll(true);
    } else {
      let defaultItem = [];

      if (
        reportName === 'recTransmitReport' ||
        reportName === 'lostInTransit' ||
        reportName === 'urgentRequest' ||
        reportName === 'cancelledRequestsReport' ||
        reportName === 'partnerRequestsReport'
      ) {
        defaultItem.push('Transmittal No.');
        setItem(defaultItem);
        setStateData(defaultItem);
      }

      if (reportName === 'messengerMonitoring') {
        defaultItem.push('Messenger');
        setItem(defaultItem);
        setStateData(defaultItem);
      }

      if (reportName === 'statisticsPerDepartmentReport') {
        defaultItem.push('Department');
        setItem(defaultItem);
        setStateData(defaultItem);
      }

      if (reportName === 'scheduledRequestsReport') {
        defaultItem.push('Department', 'Requestor');
        setItem(defaultItem);
        setStateData(defaultItem);
      }

      // setItem([]);
      setSelectAll(false);
      // setStateData(idx, []);
      // setStateData([]);
    }

    // triggerChange();
  };

  const onCheckRemove = () => {
    let defaultItem = [];

    if (
      reportName === 'recTransmitReport' ||
      reportName === 'lostInTransit' ||
      reportName === 'urgentRequest' ||
      reportName === 'cancelledRequestsReport' ||
      reportName === 'partnerRequestsReport'
    ) {
      defaultItem.push('Transmittal No.');
      setItem(defaultItem);
      setStateData(defaultItem);
    }

    if (reportName === 'messengerMonitoring') {
      defaultItem.push('Messenger');
      setItem(defaultItem);
      setStateData(defaultItem);
    }

    if (reportName === 'statisticsPerDepartmentReport') {
      defaultItem.push('Department');
      setItem(defaultItem);
      setStateData(defaultItem);
    }

    if (reportName === 'scheduledRequestsReport') {
      defaultItem.push('Department', 'Requestor');
      setItem(defaultItem);
      setStateData(defaultItem);
    }

    setSelectAll(false);
    // triggerChange();
  };

  const onSearch = (e) => {
    const val = e.target.value;

    const data = checkList.filter((items) => items.toLowerCase().includes(val.toLowerCase()));

    if (val) {
      setCheckboxList(data);
    } else {
      setCheckboxList(checkList);
    }
    // triggerChange();
  };

  useEffect(() => {
    if (
      reportName === 'recTransmitReport' ||
      reportName === 'lostInTransit' ||
      reportName === 'urgentRequest' ||
      reportName === 'cancelledRequestsReport' ||
      reportName === 'partnerRequestsReport'
    ) {
      const hasTransmittal = checkboxList.find((item) => item === 'Transmittal No.');

      if (hasTransmittal !== undefined) {
        setDisableCheckbox(true);
        setDefaultCheckbox('Transmittal No.');
      } else {
        setDisableCheckbox(false);
        setDefaultCheckbox('');
      }
    }

    if (reportName === 'messengerMonitoring') {
      const hasMessenger = checkboxList.find((item) => item === 'Messenger');

      if (hasMessenger !== undefined) {
        setDisableCheckbox(true);
        setDefaultCheckbox('Messenger');
      } else {
        setDisableCheckbox(false);
        setDefaultCheckbox('');
      }
    }

    if (reportName === 'statisticsPerDepartmentReport') {
      const hasDepartment = checkboxList.find((item) => item === 'Department');

      if (hasDepartment !== undefined) {
        setDisableCheckbox(true);
        setDefaultCheckbox('Department');
      } else {
        setDisableCheckbox(false);
        setDefaultCheckbox('');
      }
    }

    if (reportName === 'scheduledRequestsReport') {
      const hasDepartment = checkboxList.find((item) => item === 'Department');
      const hastRequestor = checkboxList.find((item) => item === 'Requestor');

      if (hasDepartment !== undefined || hastRequestor !== undefined) {
        setDisableCheckbox(true);
      } else {
        setDisableCheckbox(false);
      }

      if (hasDepartment !== undefined) {
        // setDisableCheckbox(true);
        setDefaultCheckbox('Department');
      } else {
        // setDisableCheckbox(false);
        setDefaultCheckbox('');
      }

      if (hastRequestor !== undefined) {
        // setDisableCheckbox(true);
        setDefaultSecondCheckbox('Requestor');
      } else {
        // setDisableCheckbox(false);
        setDefaultSecondCheckbox('');
      }
    }
  }, [checkboxList]);

  useEffect(() => {
    if (checkList.length !== item.length) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }
  }, [item]);

  return (
    <>
      {/* <p className={classes.label}>{label}</p> */}
      <div {...bind} className={classes.multiSelectWrapper} id={id} name={name}>
        <Button className={`multiselect-btn ${classes.mainBtn}`} onClick={showModal}>
          {item.length ? (
            `${item.length} Columns included in the Report`
          ) : (
            <span className="placehoder">Columns included in the Report</span>
          )}
        </Button>
        <animated.div style={props} className={`${classes.modal} dropdown-popup`}>
          {includeSearch && (
            <TextField
              style={{ width: '100%' }}
              onChange={onSearch}
              className="search-field"
              placeholder="Search..."
              variant="outlined"
            />
          )}
          <div className={classes.selectAllWrapper}>
            <FormControlLabel
              checked={selectAll}
              control={
                <Checkbox
                  checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                  icon={<span className={classes.icon} />}
                  onChange={onCheckAll}
                  color="primary"
                />
              }
              label="Select All"
            />

            <Button onClick={onCheckRemove} data-cy={`clear_${datacy}`}>
              Clear All
            </Button>
          </div>
          <div className={classes.multiCheckbox}>
            {checkboxList.map((checkbox, index) => (
              <FormControlLabel
                key={index}
                className={
                  disableCheckbox && (defaultCheckbox === checkbox || defaultSecondCheckbox === checkbox)
                    ? classes.defaultItem
                    : ''
                }
                control={
                  <Checkbox
                    checked={item.includes(checkbox)}
                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                    icon={<span className={classes.icon} />}
                    key={index}
                    className={
                      disableCheckbox && (defaultCheckbox === checkbox || defaultSecondCheckbox === checkbox)
                        ? classes.defaultItemCheckbox
                        : ''
                    }
                    onChange={onChangeCheckBox}
                    color="primary"
                    inputProps={{
                      'data-cy': `${checkbox.replace(' ', '_').toLowerCase()}_${datacy}`,
                    }}
                  />
                }
                label={checkbox}
                classes={{ label: classes.checkboxLabel }}
              />
            ))}
            {checkboxList.length < 1 && <p className={classes.noFound}>No result found...</p>}
          </div>
        </animated.div>
      </div>
    </>
  );
};

MultiDropdown.propTypes = {
  label: PropTypes.any,
  checkList: PropTypes.any,
  name: PropTypes.any,
  selectLabel: PropTypes.any,
  idx: PropTypes.any,
  setStateData: PropTypes.any,
  includeSearch: PropTypes.any,
  id: PropTypes.any,
  datacy: PropTypes.any,
  reportName: PropTypes.any,
};

export default MultiDropdown;
