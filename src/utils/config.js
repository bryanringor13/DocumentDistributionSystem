/* eslint-disable no-undef */
// Development API config
let serverIp = 'http://localhost';
// let port = '3000'
let path = '/';

// Production API config
if (process.env.NODE_ENV === 'production') {
  // port = '80';
  serverIp = 'http://api-ddstr.veridata-test.com';
  path = '';
} else if (process.env.NODE_ENV === 'development') {
  // port = '80';
  serverIp = 'http://api-ddstr.veridata-test.com';
  path = '';
} else {
  serverIp = '';
  path = '';
}

// export const apiBaseURL = `${serverIp}:${port + path}`;

export const apiBaseURL = `${serverIp}${path}`;

export const IDLE_TIMER_MINS = 30;
