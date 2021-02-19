/* eslint-disable no-undef */
/* eslint-disable prefer-const */
// import axios from 'axios';
import * as ACTION_TYPES from './action_types';
import * as API from '../../utils/Constants';
import { axiosApiInstance } from '../../utils/apiConfig';

// HIMS Address Action
export const getHimsNcrCity = () => async (dispatch) => {
  await axiosApiInstance
    .get(`${API.GET_HIMS_CITY}Metro Manila`)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_HIMS_NCR_CITY,
        payload: res.data.data,
      });
      console.log(res.data.data, 'ateee');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getHimsAllProvince = () => async (dispatch) => {
  dispatch(addressLoading());
  dispatch(loadingHimsProvince(true));

  await axiosApiInstance
    .get(API.ALL_HIMS_PROVINCE)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_HIMS_ALL_PROVINCE,
        payload: res.data.data,
      });
      dispatch(loadingHimsProvince(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(loadingHimsProvince(false));
    });
};

export const getHimsCityAndBarangay = (province, setCityMunicipality, setBrgyLabel) => async (dispatch) => {
  dispatch(addressLoading());
  dispatch(loadingHimsCity(true));
  dispatch(loadingHimsBarangay(true));

  // GET CITY
  await axiosApiInstance
    .get(API.GET_HIMS_CITY + province)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_HIMS_CITY,
        payload: res.data.data,
      });

      if (setCityMunicipality !== undefined) {
        setCityMunicipality(res.data.data[0].name);
      }

      dispatch(loadingHimsCity(false));

      // GET BARANGAY
      dispatch(getHimsBarangay(res.data.data[0].name, setBrgyLabel));
      // axiosApiInstance
      //   .get(API.GET_HIMS_BARANGAY + res.data.data[0].name)
      //   .then((res) => {
      //     dispatch({
      //       type: ACTION_TYPES.GET_HIMS_BARANGAY,
      //       payload: res.data.data,
      //     });

      //     if (setBrgyLabel !== undefined) {
      //       setBrgyLabel(res.data.data[0].name);
      //     }
      //     dispatch(loadingHimsBarangay(false));
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     dispatch(loadingHimsBarangay(false));
      //   });
    })
    .catch((err) => {
      console.log(err);
      dispatch(loadingHimsCity(false));
    });
};

export const getHimsCity = (province) => async (dispatch) => {
  dispatch(addressLoading());
  dispatch(loadingHimsCity(true));

  // GET CITY
  await axiosApiInstance
    .get(API.GET_HIMS_CITY + province)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_HIMS_CITY,
        payload: res.data.data,
      });

      if (setCityMunicipality !== undefined) {
        setCityMunicipality(res.data.data[0].name);
      }

      dispatch(loadingHimsCity(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(loadingHimsCity(false));
    });
};

export const getHimsCityAndBarangayCode = (
  province,
  city,
  barangay,
  setCityMunicipality,
  setCityMunicipalityLabel,
  setCityMunicipalityIndex,
  setBrgy,
  setBrgyLabel,
  setBrgyIndex
) => async (dispatch) => {
  dispatch(addressLoading());
  dispatch(loadingHimsCity(true));
  dispatch(loadingHimsBarangay(true));

  // GET CITY
  await axiosApiInstance
    .get(API.GET_HIMS_CITY + province)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_HIMS_CITY,
        payload: res.data.data,
      });
      for (const [i, value] of res.data.data.entries()) {
        if (value.label === city) {
          setCityMunicipality(city + ',' + i);
          setCityMunicipalityLabel(res.data.data[i].label);
          setCityMunicipalityIndex(i);
        }
      }
      dispatch(loadingHimsCity(false));

      // GET BARANGAY
      axiosApiInstance
        .get(API.GET_HIMS_BARANGAY + city)
        .then((res) => {
          dispatch({
            type: ACTION_TYPES.GET_HIMS_BARANGAY,
            payload: res.data.data,
          });
          for (const [i, value] of res.data.data.entries()) {
            if (value.label === barangay) {
              setBrgy(res.data.data[i].name + ',' + i);
              setBrgyLabel(res.data.data[i].label);
              setBrgyIndex(i);
            }
          }

          dispatch(loadingHimsBarangay(false));
        })
        .catch((err) => {
          console.log(err);
          dispatch(loadingHimsBarangay(false));
        });
    })
    .catch((err) => {
      console.log(err);
      dispatch(loadingHimsCity(false));
    });
};

export const getHimsBarangay = (city, setBrgyLabel) => async (dispatch) => {
  dispatch(addressLoading());
  dispatch(loadingHimsBarangay(true));

  console.log(city, 'BARANGAY CITY');

  await axiosApiInstance
    .get(API.GET_HIMS_BARANGAY + city)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_HIMS_BARANGAY,
        payload: res.data.data,
      });

      if (setBrgyLabel !== undefined) {
        setBrgyLabel(res.data.data[0].name);
      }
      dispatch(loadingHimsBarangay(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(loadingHimsBarangay(false));
    });
};

export const clearHimsAddress = () => {
  return {
    type: ACTION_TYPES.CLEAR_HIMS_ADDRESS,
  };
};

export const loadingHimsProvince = (bool) => {
  return {
    type: ACTION_TYPES.LOADING_HIMS_PROVINCE,
    payload: bool,
  };
};

export const loadingHimsCity = (bool) => {
  return {
    type: ACTION_TYPES.LOADING_HIMS_CITY,
    payload: bool,
  };
};

export const loadingHimsBarangay = (bool) => {
  return {
    type: ACTION_TYPES.LOADING_HIMS_BARANGAY,
    payload: bool,
  };
};

// End of HIMS Address Action

export const getNcrProvince = () => async (dispatch) => {
  let ncr = [];
  await axiosApiInstance
    .get(API.GET_CITY + '5eb967ced00be5a6309e01e3' + '/municipalities')
    .then((res) => {
      let resData = res.data.data;
      for (const data of resData) {
        ncr.push(data);
      }
      axiosApiInstance
        .get(API.GET_CITY + '5eb967d0d00be5a6309e0300' + '/municipalities')
        .then((res) => {
          let resData = res.data.data;
          for (const data of resData) {
            ncr.push(data);
          }

          axiosApiInstance
            .get(API.GET_CITY + '5eb967d6d00be5a6309e068f' + '/municipalities')
            .then((res) => {
              let resData = res.data.data;
              for (const data of resData) {
                ncr.push(data);
              }
              dispatch(getNcrBarangay(ncr[0]));
              dispatch({
                type: ACTION_TYPES.GET_NCR_PROVINCE,
                payload: ncr,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const initialBarangay = () => async (dispatch) => {
  await axiosApiInstance.get(API.GET_BARANGAY + '5eb967ced00be5a6309e01e4' + '/barangays').then((res) => {
    dispatch({
      type: ACTION_TYPES.INITIAL_BARANGAY,
      payload: res.data.data,
    });
  });
};

export const getNcrBarangay = (data) => async (dispatch) => {
  await axiosApiInstance.get(API.GET_BARANGAY + data.id + '/barangays').then((res) =>
    dispatch({
      type: ACTION_TYPES.GET_BARANGAY,
      payload: res.data,
    })
  );
};

export const allProvinces = () => async (dispatch) => {
  dispatch(addressLoading());
  await axiosApiInstance.get(API.ALL_PROVINCES).then((res) =>
    dispatch({
      type: ACTION_TYPES.ALL_PROVINCES,
      payload: res.data,
    })
  );
};

export const getCityAndBaranggay = (province) => async (dispatch) => {
  dispatch(addressLoading());
  await axiosApiInstance.get(API.GET_CITY + province + '/municipalities').then((res) => {
    dispatch({
      type: ACTION_TYPES.GET_CITY,
      payload: res.data,
    });
    // barangay api
    axiosApiInstance.get(API.GET_BARANGAY + res.data.data[0].id + '/barangays').then((res) => {
      dispatch({
        type: ACTION_TYPES.GET_BARANGAY,
        payload: res.data,
      });
    });
  });
};

export const getCity = (province) => async (dispatch) => {
  dispatch(addressLoading());
  await axiosApiInstance.get(API.GET_CITY + province + '/municipalities').then((res) =>
    dispatch({
      type: ACTION_TYPES.GET_CITY,
      payload: res.data,
    })
  );
};

export const getBarangay = (city) => async (dispatch) => {
  dispatch(addressLoading());
  await axiosApiInstance.get(API.GET_BARANGAY + city + '/barangays').then((res) =>
    dispatch({
      type: ACTION_TYPES.GET_BARANGAY,
      payload: res.data,
    })
  );
};

export const addressLoading = () => {
  return {
    type: ACTION_TYPES.ADDRESS_LOADING,
  };
};
