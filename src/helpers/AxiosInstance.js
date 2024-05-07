import axios from 'axios';
import GLOBALS from '../constants/index';
// import {selectCurrentToken} from '@redux/slice/authSlice';
// import {logOut} from 'src/redux/slice/authSlice';
// import store from 'src/redux/store';
import store from '../redux/store';
import {errorHandler} from './ErrorHandler';
import { logOut, selectCurrentToken } from '../redux/slice/authSlice';
const {BASE_URL} = GLOBALS;
let headers = {};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers,
  // timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async config => {
    let ContentType = '';

    // Determine the content type based on the request data.
    if (config?.data?.constructor?.name === 'FormData') {
      ContentType = 'multipart/form-data';
    } else {
      ContentType = 'application/json';
    }

    const isLoggedIn = store.getState().auth.isUserLoggedIn;
    const accessToken = isLoggedIn ? selectCurrentToken(store.getState()) : '';
    // Check if the accessToken is available and not empty.

    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }

    config.headers['Content-Type'] = ContentType;

    return config;
  },
  error => {
    console.log(error, 'axios req err');

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    // console.log(response, 'axios response success');
    return response;
  },
  async function (error) {
    console.log(error, 'axios response err');

    const originalRequest = error.config;

    // Check if the error is due to token expiration
    if (
      error?.response &&
      error?.response?.status === 401 &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;
      console.log('axios response inside 401');

      // Trigger user logout
      store.dispatch(logOut()); // Assuming this function clears tokens and navigates to the login screen

      return axiosInstance(originalRequest);
    }
    errorHandler(error);

    return Promise.reject(error);
  },
);

export default axiosInstance;
