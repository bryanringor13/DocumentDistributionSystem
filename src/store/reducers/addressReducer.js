/* eslint-disable no-case-declarations */
import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  provinces: null,
  city: null,
  barangay: null,
  laodingAddress: false,
  ncrProvince: null,
  initialBarangay: [],
  ncrLabel: [],
  himsNcrCity: null,
  himsNcrCityLabel: [],

  himsProvinces: null,
  himsCity: null,
  himsBarangay: null,
  himsLoadingProvince: false,
  himsLoadingCity: false,
  himsLoadingBarangay: false,
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ALL_PROVINCES:
      return {
        ...state,
        provinces: action.payload,
        laodingAddress: false,
      };
    case ACTION_TYPES.GET_NCR_PROVINCE:
      const copyArr = [];

      for (const data of action.payload) {
        copyArr.push(data.label);
      }
      copyArr.unshift('All Locations');

      return {
        ...state,
        ncrProvince: action.payload,
        ncrLabel: copyArr,
      };
    case ACTION_TYPES.INITIAL_BARANGAY: {
      const copyArr = state.initialBarangay;
      copyArr.push(action.payload);
      return {
        ...state,
        initialBarangay: action.payload,
      };
    }
    case ACTION_TYPES.GET_CITY:
      return {
        ...state,
        city: action.payload,
        laodingAddress: false,
      };
    case ACTION_TYPES.GET_BARANGAY:
      return {
        ...state,
        barangay: action.payload,
        laodingAddress: false,
      };
    case ACTION_TYPES.ADDRESS_LOADING:
      return {
        ...state,
        laodingAddress: true,
      };
    case ACTION_TYPES.GET_HIMS_NCR_CITY:
      const copyCityArr = [];

      for (const data of action.payload) {
        copyCityArr.push(data.label);
      }
      copyCityArr.unshift('All Locations');

      return {
        ...state,
        himsNcrCity: action.payload,
        himsNcrCityLabel: copyCityArr,
      };

    case ACTION_TYPES.GET_HIMS_ALL_PROVINCE:
      return {
        ...state,
        himsProvinces: action.payload,
        laodingAddress: false,
      };
    case ACTION_TYPES.GET_HIMS_CITY:
      return {
        ...state,
        himsCity: action.payload,
        laodingAddress: false,
      };
    case ACTION_TYPES.GET_HIMS_BARANGAY:
      return {
        ...state,
        himsBarangay: action.payload,
        laodingAddress: false,
      };
    case ACTION_TYPES.CLEAR_HIMS_ADDRESS:
      return {
        ...state,
        provinces: null,
        city: null,
        barangay: null,
        laodingAddress: false,
        ncrProvince: null,
        initialBarangay: [],
        ncrLabel: [],
        himsProvinces: null,
        himsCity: null,
        himsBarangay: null,
      };
    case ACTION_TYPES.LOADING_HIMS_PROVINCE:
      return {
        ...state,
        himsLoadingProvince: action.payload,
      };
    case ACTION_TYPES.LOADING_HIMS_CITY:
      return {
        ...state,
        himsLoadingCity: action.payload,
      };
    case ACTION_TYPES.LOADING_HIMS_BARANGAY:
      return {
        ...state,
        himsLoadingBarangay: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
