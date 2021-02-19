import { authAxios } from './apiConfig';


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
