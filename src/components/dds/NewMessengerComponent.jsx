/* eslint-disable camelcase */
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import Close from '../../assets/img/close_24px.png'
import { makeValidate, Select } from 'mui-rff'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { addNewMessenger } from '../../store/actions/MessengerActions'
import * as API from '../../utils/Constants'
import PrimaryButton from '../common/Button/PrimaryButton'
import SecondaryButton from '../common/Button/SecondaryButton'
import CommonInputNumber from '../common/CommonInputNumber'
import CustomEditMultiSelect from '../common/CustomEditMultiSelect'
import TextFields from '../common/TextFields'
import PropTypes from 'prop-types'
import { compare, comparerArray } from '../../utils/common'

function NewMessengerComponent({ classes, close }) {
  const dispatch = useDispatch()

  const formSchema = Yup.object().shape({
    contact_number: Yup.string()
      .required('Required.')
      .matches(/^[0-9]\d*$/, {
        excludeEmptyString: true,
        message: 'Invalid format',
      }),
    first_name: Yup.string().required('Required.'),
    last_name: Yup.string().required('Required.'),
    username: Yup.string().required('Required.').min(5),
  })
  const [onLoadCircular, setOnLoadCircular] = useState(false)
  const address_info = useSelector((state) => state.address)
  const messenger_info = useSelector((state) => state.messenger)
  const [loadingBarangay, setLoadingBarangay] = useState(false)
  const [location, setLocation] = useState([
    {
      barangayItem: [],
      city: [],
      barangays: [],
      barangayLabel: [],
      cityInitial: [],
    },
  ])

  // eslint-disable-next-line no-unused-vars
  const [barangayList, setBarangayList] = useState([])
  const [box_no, setBoxNo] = useState('')
  const [capacity, setCapacity] = useState('')
  const [barangayLength, setBarangayLength] = useState(true)

  const address = () => {
    const copyArr2 = []
    for (const city of address_info.himsNcrCity) {
      copyArr2.push({ value: city.id, label: city.label })
    }
    return copyArr2
  }

  const getInitial = (copyArr2) => {
    for (const [index, data] of location.entries()) {
      const cities = []

      for (const a of location) {
        if (a.city !== data.city) {
          const b = copyArr2.filter((item) => item.value === a.city)
          if (b[0]) {
            cities.push(b[0])
          }
        }
      }

      // eslint-disable-next-line no-undef

      const onlyInA = cities.filter(comparerArray(copyArr2))
      const onlyInB = copyArr2.filter(comparerArray(cities))

      const result = onlyInA.concat(onlyInB)

      location[index].cityInitial = result.sort(compare)
    }
    setLocation([...location])
  }
  useEffect(() => {
    if (address_info.himsNcrCity) {
      const copyBarangay = []
      if (address_info.barangay) {
        for (const barangayLabel of address_info.barangay.data) {
          copyBarangay.push(barangayLabel.label)
        }
        setBarangayList(copyBarangay)
      }
    }
    const length = location.find((item) => item.barangays.length < 1)
    const cityLength = location.find((item) => item.city.length < 1)
    if (length || cityLength) {
      setBarangayLength(true)
    } else {
      setBarangayLength(false)
    }

    // eslint-disable-next-line
  }, [address_info.barangay, address_info.ncrProvince, location]);

  useEffect(() => {
    // ////////////
    getInitial(address())

    // eslint-disable-next-line
  }, [address_info.ncrProvince]);


  const onSave = (values) => {
    const newData = []
    for (const data of location) {
      newData.push({ barangays: data.barangays, city: data.city })
    }

    const body = {
      contact_number: values.contact_number,
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      box_no: parseInt(box_no),
      capacity: parseInt(capacity),
      assigned_locations: newData,
      status: 1,
    }
    setOnLoadCircular(true)
    dispatch(addNewMessenger(body,  close))
  
  }

  const [error, setError] = useState(false)
  const onCount = (val) => {
    const data = messenger_info.box_no.some((item) => {
      return item === parseInt(val)
    })
    if (data) {
      setError(true)
    } else {
      setError(false)
    }
    setBoxNo(val)
  }

  const onCountCapacity = (val) => {
    setCapacity(val)
  }

  const handleClose = () => {
    close(false)
  }

  const onAdd = () => {
    const copyArr = location

    const copyArr2 = []
    for (const city of address_info.himsNcrCity) {
      copyArr2.push({ value: city.id, label: city.label })
    }

    const newLocation = {
      barangayItem: [],
      city: [],
      barangays: [],
      barangayLabel: [],
      cityInitial: [],
    }
    copyArr.push(newLocation)

    for (const [index, data] of copyArr.entries()) {
      const cities = []
      for (const a of copyArr) {
        if (a.city !== data.city) {
          const b = copyArr2.filter((item) => item.value === a.city)
          if (b[0]) {
            cities.push(b[0])
          }
        }
      }

      // eslint-disable-next-line no-undef
      const onlyInA = cities.filter(comparerArray(copyArr2))
      const onlyInB = copyArr2.filter(comparerArray(cities))

      const result = onlyInA.concat(onlyInB)
      location[index].cityInitial = result.sort(compare)
    }

    setLocation([...copyArr])
  }

  const onRemoveLocation = (idx) => {
    const loc = location
    loc.splice(idx, 1)
    setLocation([...loc])
  }

  const [multiIndex, setMultiIndex] = useState('')
  const itemForCity =  (index, value) => {
    const itemData = location
    itemData[index].city = value
    const selectedCity = itemData[index].cityInitial.find(
      (city) => city.value === value
    )
    setMultiIndex(index)
    setLoadingBarangay(true)
   
    // ///////
    getInitial(address())

    // /////

     axios.get(API.GET_HIMS_BARANGAY + selectedCity.label).then((res) => {
      itemData[index].barangayItem = res.data.data
      itemData[index].barangays = []
      itemData[index].barangayLabel = []
      for (const data of res.data.data) {
        itemData[index].barangays.push(data.id)
        itemData[index].barangayLabel.push(data.label)
      }

      setLocation([...itemData])
      setLoadingBarangay(false)
    })

    // await axios.get(API.GET_BARANGAY + value + '/barangays').then((res) => {
    //   itemData[index].barangayItem = res.data.data
    //   itemData[index].barangays = []
    //   itemData[index].barangayLabel = []
    //   for (const data of res.data.data) {
    //     itemData[index].barangays.push(data.id)
    //     itemData[index].barangayLabel.push(data.label)
    //   }

    //   setLocation([...itemData])
    // })
  }

  const itemForBarangay = (index, value) => {
    const info = []
    const infoLabel = []
    location[index].barangayItem.forEach((item) => {
      for (const data of value) {
        if (item.label === data) {
          info.push(item.id)
          infoLabel.push(item.label)
        }
      }
    })

    if (Array.isArray(info)) {
      setBarangayLength(true)
    } else {
      setBarangayLength(false)
    }

    const itemData = location
    itemData[index].barangays = info
    itemData[index].barangayLabel = infoLabel
    setLocation([...itemData])
  }

  return (
    <>
      {address_info.himsNcrCity ? (
        <Form
          onSubmit={onSave}
          validate={makeValidate(formSchema)}
          render={({ handleSubmit, hasValidationErrors }) => (
            <form
              data-cy="new_messenger_form"
              onSubmit={handleSubmit}
              style={{ width: '100%' }}
              noValidate
            >
              <Grid
                container
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingLeft: '97px',
                  alignItems: 'center',
                }}
                // spacing={3}
              >
                <div className={classes.itemHolder}>
                  <div className={classes.headerWrapper}>
                    <h2 className={classes.header}>New Messenger</h2>
                    <div className={classes.btnDivider}>
                      <SecondaryButton
                        onClick={handleClose}
                        customClass={classes.btnLeft}
                        datacy="cancel_btn"
                      >
                        Cancel
                      </SecondaryButton>
                    <PrimaryButton
                        disabled={
                          hasValidationErrors ||
                          capacity < 1 ||
                          box_no < 1 ||
                          barangayLength ||
                          error
                        }
                        onClick={handleSubmit}
                        className={classes.btnLeft}
                        datacy="save_btn"
                      >
                         {onLoadCircular ?   <CircularProgress classes={{ root: classes.circle2 }} /> :   
                        'Save'}
                      </PrimaryButton>
                   
                    </div>
                  </div>

                  <Grid container>
                    <div className={classes.editItemWrapper}>
                      <div className={classes.editHolder}>
                        <h2 className={classes.subTitle}>Messenger</h2>
                      </div>
                    </div>
                    <div className={classes.editItemContainer}>
                      <Grid container>
                        <Grid item sm={6}>
                          <TextFields
                            label="First Name"
                            name="first_name"
                            datacy="first_name"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextFields
                            label="Last Name"
                            name="last_name"
                            datacy="last_name"
                          />
                        </Grid>
                        <Grid item sm={6}>
                          <TextFields
                            label="Username"
                            name="username"
                            datacy="username"
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
                        <Grid container className={classes.boxNo}>
                          <Grid item sm={6}>
                            <div className={classes.boxError}>
                              <CommonInputNumber
                                label="Box No."
                                name="box_no"
                                datacy="box_no"
                                value={box_no}
                                setItem={onCount}
                              />
                              <p
                                className={
                                  error
                                    ? classes.errorBox
                                    : classes.errorBoxNone
                                }
                              >
                                Box No. must be unique
                              </p>
                            </div>
                          </Grid>
                          <Grid item sm={6}>
                            <CommonInputNumber
                              label="Capacity"
                              name="capacity"
                              datacy="capacity"
                              value={capacity}
                              setItem={onCountCapacity}
                            />
                          </Grid>
                        </Grid>

                        {location.map((item, idx) => {
                          const info = []

                          for (const data of item.barangayItem) {
                            info.push(data.label)
                          }

                          return (
                            <div
                              style={{
                                width: '100%',
                              }}
                              key={idx}
                            >
                              <hr
                                className={idx === 0 && classes.disNone}
                                style={{
                                  width: '95%',
                                  borderTop: '1px dashed #A5B0BE',
                                }}
                              />
                              <div
                                className={idx === 0 && classes.disNone}
                                style={{ textAlign: 'right', width: '95%' }}
                              >
                                <img
                                  src={Close}
                                  onClick={() => onRemoveLocation(idx)}
                                  alt="text"
                                  className={classes.removeAssign}
                                />
                              </div>
                              <Grid
                                key={idx}
                                container
                                className={classes.boxNo}
                              >
                                <Grid item sm={6}>
                                  <FormControl className={classes.formControl}>
                                    <Select
                                      className={classes.selectItem}
                                      label="Assigned City"
                                      name="assigned_city"
                                      variant="outlined"
                                      data-cy="assigned_city"
                                      MenuProps={{
                                        MenuListProps: {
                                          'data-cy': 'assigned_city_dropdown',
                                        },
                                      }}
                                      value={item.city}
                                      onChange={(event) =>
                                        itemForCity(idx, event.target.value)
                                      }
                                      data={item.cityInitial}
                                    />
                                  </FormControl>
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
                                    selectProp={true}
                                    city={item.city}
                                    datacy="assigned_barangay"
                                    datacyDropdown="assigned_barangay_dropdown"
                                  />
                                </Grid>
                              </Grid>
                            </div>
                          )
                        })}

                        <Grid container className={classes.boxNo}>
                          <div
                            className={classes.addMore}
                            data-cy="add_more_location"
                            onClick={onAdd}
                          >
                            Add more location
                            <span className={classes.iconWrapper}>
                              <AddIcon />
                            </span>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </div>
              </Grid>
            </form>
          )}
        />
      ) : (
        <p>Loading</p>
      )}
    </>
  )
}

NewMessengerComponent.propTypes = {
  classes: PropTypes.any,
  close: PropTypes.bool,
}
export default NewMessengerComponent
