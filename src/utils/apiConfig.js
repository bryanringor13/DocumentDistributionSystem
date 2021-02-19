import axios from 'axios';
import * as API from '../utils/Constants';

const noAuthAxios = axios.create({
  baseURL: process.env.API_HOST,
  headers: { 'Content-Type': 'application/json' },
});

const authAxios = axios.create({
  baseURL: process.env.API_HOST + '/ts',
  headers: { 'Content-Type': 'application/json' },
});

const axiosApiInstance = axios.create();

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    console.log(response, 'INTERCEPT RESPOSNE');
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log(error.response.status, 'INTERCEPT ERROR');
    console.log(originalRequest, 'INTERCEPT CONFIG');
    console.log(originalRequest._retry, 'INTERCEPT ORIGINAL');

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('INTERCEPT RETRY');
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();
      console.log(accessToken, 'INTERCEPT ACCESS TOKEN');
      originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;

      return axiosApiInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  let newAccessToken;

  await axios
    .patch(API.REFRESH_TOKEN, { refresh_token: refreshToken })
    .then((res) => {
      localStorage.setItem('token', res.data.data.token);
      newAccessToken = localStorage.getItem('token');
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(newAccessToken, 'INTERCEPT NEW ACCESS TOKEN');

  return newAccessToken;
};

export { noAuthAxios, authAxios, axiosApiInstance };
