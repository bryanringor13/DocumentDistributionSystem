import { authAxios } from './apiConfig';
/* eslint-disable camelcase */
export function comparerArray(otherArray) {
  return function (current) {
    return (
      otherArray.filter(function (other) {
        return other.value === current.value;
      }).length === 0
    );
  };
}

export function separateAtThousands(num) {
  const num_parts = num.toString().split('.');
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num_parts.join('.');
}

export function comparerArray3(otherArray) {
  return function (current) {
    return (
      otherArray.filter(function (other) {
        return other.value === current.city;
      }).length === 0
    );
  };
}

export function comparerArray4(otherArray) {
  return function (current) {
    return (
      otherArray.filter(function (other) {
        return other.city === current.value;
      }).length === 0
    );
  };
}

export function comparerArray2(otherArray) {
  return function (current) {
    return (
      otherArray.filter(function (other) {
        return other.city === current.value;
      }).length === 0
    );
  };
}

export function compare(a, b) {
  // Use toUpperCase() to ignore character casing

  const bandA = a.label ? a.label.toUpperCase() : a.label;
  const bandB = b.label ? b.label.toUpperCase() : b.label;

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}
// return the user data from the session storage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

// return the token from the session storage
export const getToken = () => localStorage.getItem('token') || null;

// remove the token and user from the session storage
export const removeUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('roles');
  authAxios.defaults.headers.common.Authorization = '';
};

// set the token from the session storage
export const setSessionToken = (token) => {
  localStorage.setItem('token', token);
  authAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// set the user data from the session storage
export const setUserData = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// set the user data from the session storage
export const setUserRoles = (roles) => {
  localStorage.setItem('roles', JSON.stringify(roles));
};

export const getStatusLabel = (status) => {
  switch (status) {
    case 'for_receipt':
      return 'For receipt';
    case 'for_clearing':
      return 'For clearing';
    case 'for_deposit':
      return 'For deposit';
    case 'cleared':
      return 'Cleared';
    case 'cancelled':
      return 'Cancelled';
    case 'bounced':
      return 'Bounced';
    default:
      return status;
  }
};

export const numberWithComma = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
