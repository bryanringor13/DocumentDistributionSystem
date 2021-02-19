/* eslint-disable no-undef */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeValidate, Select } from 'mui-rff';
import { Form } from 'react-final-form';
import * as Yup from 'yup';
import axios from 'axios';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import TextFields from '../common/TextFields';
import SecondaryButton from '../common/Button/SecondaryButton';
import PrimaryButton from '../common/Button/PrimaryButton';
import CustomEditMultiSelect from '../common/CustomEditMultiSelect';
import CommonEditInput from '../common/CommonEditInput';
import PrintMessengerInstruction from '../dds/PrintMessengerInstruction';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as API from '../../utils/Constants';
import * as ACTION from '../../store/actions/MessengerActions';
import Close from '../../assets/img/close_24px.png';
import { compare, comparerArray, numberWithComma } from '../../utils/common';
import DialogSmall from '../common/DialogSmall/DialogSmall';
import html2pdf from 'html2pdf.js';
const EditMessengerComponents = ({ classes, close }) => {
  const address_info = useSelector((state) => state.address);
  const messenger_info = useSelector((state) => state.messenger);
  const modal = messenger_info.modal;
  const dispatch = useDispatch();
  const [location, setLocation] = useState([]);
  const [pass, setPass] = useState('');
  const [initialValues, setInitialValues] = useState({});
  const [capacity, setCapacity] = useState(modal.capacity);
  const [box_no, setBoxNo] = useState(modal.box_no);
  const [show, setShow] = useState(false);
  const [reset, setReset] = useState(false);
  const [barangayLength, setBarangayLength] = useState(true);
  const [selectedCity, setSelectedCity] = useState([]);
  const [open, setOpen] = useState(false);
  const [printLoad, setPrintLoad] = useState(false);
  const [onLoadCircular, setOnLoadCircular] = useState(false)
  const [loadingBarangay, setLoadingBarangay] = useState(false)
  const address = () => {
    const copyArr2 = []
    for (const city of address_info.himsNcrCity) {
      copyArr2.push({ value: city.id, label: city.label })
    }
    return copyArr2;
  };

  const getInitial = (copyArr2) => {
    for (const [index, data] of location.entries()) {
      const cities = [];

      for (const a of location) {
        if (a.city !== data.city) {
          const b = copyArr2.filter((item) => item.value === a.city);
          if (b[0]) {
            cities.push(b[0]);
          }
        }
      }

      // eslint-disable-next-line no-undef
      const onlyInA = cities.filter(comparerArray(copyArr2));
      const onlyInB = copyArr2.filter(comparerArray(cities));

      const result = onlyInA.concat(onlyInB);

      location[index].cityInitial = result.sort(compare);
    }
    setLocation([...location]);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
   
    // initial value
    const newItem = {
      messenger_id: messenger_info.modal.messenger_id,
      contact_number: messenger_info.modal.contact_number,
      first_name: messenger_info.modal.first_name,
      last_name: messenger_info.modal.last_name,
      username: messenger_info.modal.username,
      status: messenger_info.modal.status,
    };

    setInitialValues(newItem);

    // api for city

    // initial value assigned location

    for (const [i, data] of modal.assigned_locations.entries()) {
      const barangayInitial = [];
      for (const item of data.barangays) {
        barangayInitial.push(item);
      }

      axios.get(API.GET_BARANGAY + data.city + '/barangays').then((res) => {
        const itemDetails = location;
        itemDetails.push({
          city: data.city,
          cityInitial: [],
          barangays: barangayInitial,
          barangayItem: res.data.data,
          barangayLabel: modal.assigned_locations_labels[i].barangays,
        })

        // ////////////
        const copyArr2 = address();

        for (const [index, data] of itemDetails.entries()) {
          const cities = [];

          for (const a of itemDetails) {
            if (a.city !== data.city) {
              const b = copyArr2.filter((item) => item.value === a.city);
              cities.push(b[0]);
            }
          }

          const onlyInA = cities.filter(comparerArray(copyArr2));
          const onlyInB = copyArr2.filter(comparerArray(cities));

          const result = onlyInA.concat(onlyInB);

          itemDetails[index].cityInitial = result.sort(compare);
          setLocation([...itemDetails]);
        }

        // /////////////
        console.log(selectedCity)
        for (const data of itemDetails) {
          const cities = []
          cities.push(itemDetails.filter((a) => a.city !== data.city))
          setSelectedCity([cities])
          console.log(cities, 'citiesssss')
        }
        // ////
      });
    }

    // eslint-disable-next-line
  }, []);

  const onReset = (data) => {
    setOpen(false);
    setReset(data);
  };
  // Validate Locations
  useEffect(() => {
    const length = location.find((item) => item.barangays.length < 1);
    const cityLength = location.find((item) => item.city.length < 1);

    if (length || cityLength) {
      setBarangayLength(true);
    } else {
      setBarangayLength(false);
    }

    // eslint-disable-next-line
  }, [location]);

  const formSchema = Yup.object().shape({
    contact_number: Yup.string()
      .required('Required.')
      .matches(/^[0-9]\d*$/, {
        excludeEmptyString: true,
        message: 'Invalid format ',
      }),
    first_name: Yup.string().required('Required.'),
    last_name: Yup.string().required('Required.'),
    username: Yup.string().required('Required.').min(5),
  });

  const [error, setError] = useState(false);

  const onCount = (val) => {
    const data = messenger_info.box_no.some((item) => {
      return item === parseInt(val);
    });
    if (data) {
      if (parseInt(modal.box_no) !== parseInt(val)) {
        setError(true);
      }
    } else {
      setError(false);
    }
    setBoxNo(val);
  };

  const onEdit = () => {
    dispatch(ACTION.showEdit());
  };

  const onSubmit = (values) => {
    const newData = [];
    for (const data of location) {
      newData.push({ barangays: data.barangays, city: data.city });
    }

    const body = {
      contact_number: values.contact_number,
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      box_no: parseInt(box_no),
      capacity: parseInt(capacity),
      assigned_locations: newData,
      status: parseInt(values.status),
    };
    setOnLoadCircular(true)
    dispatch(ACTION.editMessenger(body, modal.id, reset, modal.messenger_id,close));

  };

  const status = [
    { label: 'Inactive', value: '2' },
    { label: 'Active', value: '1' },
  ];

  const onAdd = () => {
    const copyArr = location;

    const copyArr2 = address();

    const newLocation = {
      barangayItem: [],
      city: [],
      barangays: [],
      barangayLabel: [],
      cityInitial: [],
    };
    copyArr.push(newLocation);

    for (const [index, data] of copyArr.entries()) {
      const cities = [];
      for (const a of copyArr) {
        if (a.city !== data.city) {
          const b = copyArr2.filter((item) => item.value === a.city);
          if (b[0]) {
            cities.push(b[0]);
          }
        }
      }

      // eslint-disable-next-line no-undef
      const onlyInA = cities.filter(comparerArray(copyArr2));
      const onlyInB = copyArr2.filter(comparerArray(cities));

      const result = onlyInA.concat(onlyInB);
      location[index].cityInitial = result.sort(compare);
    }

    setLocation([...copyArr]);
  };

  const handleClose = () => {
    close(false);
  };
const [multiIndex, setMultiIndex] = useState('')
  const itemForCity = async (index, value) => {
    const itemData = location
    itemData[index].city = value
    const selectedCity = itemData[index].cityInitial.find(
      (city) => city.value === value
    )
    setMultiIndex(index)
    setLoadingBarangay(true)
    // ////////////
    getInitial(address());
    // ////////
    await axios.get(API.GET_HIMS_BARANGAY + selectedCity.label).then((res) => {
      itemData[index].barangayItem = res.data.data
      itemData[index].barangays = []
      itemData[index].barangayLabel = []
      for (const data of res.data.data) {
        itemData[index].barangays.push(data.id);
        itemData[index].barangayLabel.push(data.label);
      }
      
      setLoadingBarangay(false)
      setLocation([...itemData]);
    });
    // dispatch(ADDRESS.getBarangay(value))
  };

  const onRemoveLocation = (idx) => {
    const loc = location;
    loc.splice(idx, 1);
    setLocation([...loc]);
  };
  const itemForBarangay = (index, value) => {
    const info = [];
    const infoLabel = [];
    location[index].barangayItem.forEach((item) => {
      for (const data of value) {
        if (item.label === data) {
          info.push(item.id);
          infoLabel.push(item.label);
        }
      }
    });

    if (info.length > 0) {
      setBarangayLength(false);
    } else {
      setBarangayLength(true);
    }

    const itemData = location;
    itemData[index].barangays = info;
    itemData[index].barangayLabel = infoLabel;

    setLocation([...itemData]);
  };

  // Print Messenger Instruction
  const handlePrint = () => {
    setShow(true);
    setPrintLoad(true);

    setTimeout(() => {
      setPrintLoad(false);
    }, 7000);
  };

  useEffect(() => {
    if (show) {
      const data = document.getElementById('printmessengers');
      const img =
        'data:image/png;base64,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';

      const opt = {
        margin: [40, 10, 10, 18],

        filename: 'myfile.pdf',
        image: { type: 'jpeg', quality: 1 },

        html2canvas: { dpi: 96, logging: true, scale: 4 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      html2pdf()
        .from(data)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
          const pageCount = pdf.internal.getNumberOfPages();

          for (let count = 1; count <= pageCount; ++count) {
            pdf.setPage(count);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(8);
            pdf.text(180, 12, 'Page ' + pdf.internal.getCurrentPageInfo().pageNumber + ' of ' + pageCount);
            pdf.addImage(img, 'PNG', 10, 5, 45, 15);
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(60, 12, '7/F Feliza Building, 108 V.A. Rufino St., Legaspi Village,');
            pdf.setTextColor(0, 0, 0);
            pdf.setFontType('normal');
            pdf.setFontSize(9);
            pdf.text(60, 17, 'Makati City, Philippines Tels.: (632) 789-400 Fax # (632)750-7009');
            if (pdf.internal.getCurrentPageInfo().pageNumber > 1) {
              pdf.setTextColor(47, 53, 66);
              pdf.setFontType('bold');
              pdf.setFontSize(13);
              pdf.text(10, 33, 'Messenger Location');
              pdf.setDrawColor(165, 176, 190);
              pdf.line(10, 35, 195, 35);
            }
          }
          pdf.autoPrint();
          window.open(pdf.output('bloburl'), '_blank');
        });
    }
    setTimeout(() => {
      setShow(false);
    }, 10);
  }, [show]);


  return (
    <>
      <Grid
        id="no-printmessenger"
        container
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingLeft: '97px',
          alignItems: 'center',
        }}
      >
        <div className={classes.itemHolder}>
        <Grid container>
            <Grid item sm={6}>
              <h2 className={classes.header} data-cy="messenger_details_title">
                Messenger Details
              </h2>
            </Grid>
            <Grid item className={classes.btnRight} sm={6}>
              <PrimaryButton onClick={handlePrint}>
                {printLoad ? (
                  <CircularProgress classes={{ root: classes.circle }} />
                ) : (
                  'Print Instruction'
                )}
              </PrimaryButton>
            </Grid>
          </Grid>

          {!messenger_info.onShowEdit ? (
            <Grid container className={classes.itemContainer}>
              <div className={classes.itemWrapper}>
                <h2 className={classes.subTitle}>Messenger</h2>
                <Button onClick={onEdit}>Edit</Button>
              </div>

              <Grid container>
                <Grid sm={6}>
                  <p className={classes.title} data-cy="messenger_details_id">
                    Messenger ID:
                  </p>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.description}> {modal.messenger_id}</p>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.title} data-cy="messenger_details_name">
                    Name:
                  </p>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.description}> {`${modal.first_name}${' '} ${modal.last_name}`}</p>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.title} data-cy="messenger_details_contact">
                    Contact Number:
                  </p>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.description}>
                    {' '}
                    {modal.contact_number
                      .replace(/[^\dA-Z]/g, '')
                      .replace(/(.{4})/g, '$1 ')
                      .trim()}{' '}
                  </p>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.title} data-cy="messenger_details_username">
                    Username:
                  </p>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.description}> {modal.username}</p>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.title} data-cy="messenger_details_password">
                    Password:
                  </p>
                </Grid>
                <Grid sm={6}>
                  <div className={classes.pass}>●●●●●</div>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.title} data-cy="messenger_details_status">
                    Status:
                  </p>
                </Grid>
                <Grid sm={6}>
                  <p className={classes.description}> {modal.status === 1 ? 'Active' : 'Inactive'}</p>
                </Grid>
                <Grid container style={{ marginTop: '22px' }}>
                  <Grid sm={6}>
                    <p className={classes.title} data-cy="messenger_details_box_no">
                      Box No.:
                    </p>
                  </Grid>
                  <Grid sm={6}>
                    <p className={classes.description}> {numberWithComma(modal.box_no)}</p>
                  </Grid>
                  <Grid sm={6}>
                    <p className={classes.title} data-cy="messenger_details_capacity">
                      Capacity:
                    </p>
                  </Grid>
                  <Grid sm={6}>
                    <p className={classes.description}> {numberWithComma(modal.capacity)}</p>
                  </Grid>
                </Grid>
                {modal.assigned_locations_labels.map((item, idx) => {
                  const loc = [];

                  for (const data of item.barangays) {
                    loc.push(`${data}${' '}`);
                  }
                
                  return (
                    <Grid key={idx} container style={{ marginTop: '22px' }}>
                      <Grid sm={6}>
                        <p className={classes.title} data-cy="messenger_details_city">
                          Assigned City:
                        </p>
                      </Grid>
                      <Grid sm={6}>
                        <p className={classes.description}>{item.city}</p>
                      </Grid>
                      <Grid sm={6}>
                        <p className={classes.title} data-cy="messenger_details_brgy">
                          Assigned Barangay(s):
                        </p>
                      </Grid>
                      <Grid sm={6}>
                        {item.barangays.map((itemText, id) => {
                          return (
                            <p key={id} className={classes.description}>
                              {itemText}
                            </p>
                          );
                        })}
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          ) : (
            <Grid container>
              {initialValues ? (
                <Form
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validate={makeValidate(formSchema)}
                  render={({
                    handleSubmit,
                    submitting,
                    pristine,
                    validating,
                    hasValidationErrors,
                    dirtySinceLastSubmit,
                    hasSubmitErrors,
                  }) => (
                    <form onSubmit={handleSubmit} style={{ width: '100%' }} noValidate>
                      <div className={classes.editItemWrapper}>
                        <div className={classes.editHolder}>
                          <h2 className={classes.subTitle}>Messenger</h2>
                          <div className={classes.btnDivider}>
                            <Button onClick={handleClose} className={classes.btnLeft} data-cy="cancel_btn">
                              Cancel
                            </Button>
                          
                            <PrimaryButton
                              disabled={
                                hasValidationErrors ||
                                capacity < 1 ||
                                box_no < 1 ||
                                barangayLength === true ||
                                location.length < 1 ||
                                error
                              }
                              onClick={handleSubmit}
                              className={classes.btnLeft}
                              datacy="save_btn"
                            >
                                {onLoadCircular ?   <CircularProgress classes={{ root: classes.circle2 }} /> : 
                              'Save'   }
                            </PrimaryButton>
                  </div>
                        </div>
                      </div>
                      <div className={classes.editItemContainer}>
                        <Grid container>
                          <Grid item sm={6}>
                            <TextFields
                              disabled={true}
                              label="Messenger ID"
                              name="messenger_id"
                              datacy="messenger_id"
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <TextFields
                              type="tel"
                              label="Contact Number"
                              name="contact_number"
                              datacy="contact_number"
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <TextFields label="First Name" name="first_name" datacy="first_name" />
                          </Grid>
                          <Grid item sm={6}>
                            <TextFields label="Last Name" name="last_name" datacy="last_name" />
                          </Grid>
                          <Grid item sm={6}>
                            <TextFields label="Username" name="username" datacy="username" />
                          </Grid>
                          <Grid item sm={6}>
                            <div className={classes.btnReset}>
                              <SecondaryButton onClick={handleOpen} datacy="reset_password">
                                Reset Password
                              </SecondaryButton>
                              <p className={classes.reseton}>
                                Resetting the password will be applied without clicking the Save button.
                              </p>
                            </div>
                          </Grid>
                          <Grid item sm={6}>
                            <div style={{ maxWidth: '250px' }}>
                              <Select
                                label="Status"
                                name="status"
                                variant="outlined"
                                data={status}
                                data-cy="status"
                                MenuProps={{
                                  MenuListProps: {
                                    'data-cy': 'status_dropdown',
                                  },
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid container style={{ marginBottom: '20px' }} className={classes.boxNos}>
                            <Grid item sm={6}>
                              <div className={classes.boxError}>
                                <CommonEditInput
                                  value={box_no}
                                  label="Box No."
                                  name="box_no"
                                  datacy="box_no"
                                  setItem={onCount}
                                />
                                <p className={error ? classes.errorBox : classes.errorBoxNone}>
                                  Box No. must be unique
                                </p>
                              </div>
                            </Grid>
                            <Grid item sm={6}>
                              <CommonEditInput
                                value={capacity}
                                label="Capacity"
                                name="capacity"
                                datacy="capacity"
                                setItem={setCapacity}
                              />
                            </Grid>
                          </Grid>
                          {location.map((item, idx) => {
                            const info = [];
                            for (const data of item.barangayItem) {
                              info.push(data.label);
                            }
                            return (
                              <div
                                style={{
                                  width: '100%',
                                }}
                                key={idx}
                              >
                                <hr
                                  style={{
                                    width: '95%',
                                    borderTop: '1px dashed #A5B0BE',
                                  }}
                                />
                                <div style={{ textAlign: 'right', width: '95%' }}>
                                  <img
                                    src={Close}
                                    onClick={() => onRemoveLocation(idx)}
                                    alt="text"
                                    className={classes.removeAssign}
                                  />
                                </div>

                                <Grid container className={classes.assignHolder}>
                                  <Grid item sm={6}>
                                    <div style={{ maxWidth: '250px' }}>
                                      <Select
                                        value={item.city}
                                        label="Assigned City"
                                        name="assigned_city"
                                        variant="outlined"
                                        data-cy="assigned_city"
                                        data={item.cityInitial}
                                        MenuProps={{
                                          MenuListProps: {
                                            'data-cy': 'assigned_city_dropdown',
                                          },
                                        }}
                                        fullWidth
                                        onChange={(event) => itemForCity(idx, event.target.value)}
                                      />
                                    </div>
                                  </Grid>
                                  <Grid item sm={6}>
                                    <CustomEditMultiSelect
                                      label="Assigned Barangay(s)"
                                      idx={idx}
                                      multiIndex={multiIndex}
                                      loadingBarangay={loadingBarangay}
                                      itemComparison={location[idx].barangayItem}
                                      itemLength={location[idx].barangays}
                                      setStateData={itemForBarangay}
                                      selectLabel="Barangay Selected"
                                      checkList={info}
                                      initLabel={item.barangayLabel}
                                      name="assigned_barangay"
                                      id={idx}
                                      city={item.city}
                                      datacy="assigned_barangay"
                                      datacyDropdown="assigned_barangay_dropdown"
                                    />
                                  </Grid>
                                </Grid>
                              </div>
                            );
                          })}
                          <Grid container className={classes.boxNo}>
                            <div className={classes.addMore} data-cy="add_more_location" onClick={onAdd}>
                              Add more location
                              <span className={classes.iconWrapper}>
                                <AddIcon />
                              </span>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </form>
                  )}
                />
              ) : null}
            </Grid>
          )}
        </div>
      </Grid>
      <div id="printmessengers" className={show ? classes.showPrint : classes.hidePrint}>
        <PrintMessengerInstruction pass={pass} messengerDetails={modal} />
      </div>

      <DialogSmall
        reset={onReset}
        setOpen={setOpen}
        modalId={modal.id}
        pass={setPass}
        name={modal.first_name}
        open={open}
      />
    </>
  );
};

EditMessengerComponents.propTypes = {
  classes: PropTypes.any,
  close: PropTypes.any,
};

export default React.memo(EditMessengerComponents);
