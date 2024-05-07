// import ToastMessage from '@components/common/ToastMessage';
import GLOBALS from '../../src/constants/index';
import ToastMessage from '../components/common/ToastMessage';
const {NETWORKSTATUS} = GLOBALS;
export const errorHandler = error => {
  console.log(error.response.status, 'error.response');
  if (error.response) {
    let toastMessage = '';
    if (error.response.data) {
      toastMessage = error.response.data.errorMessage;
    }

    if (error.response.status === NETWORKSTATUS.SERVER_ERROR) {
      toastMessage = 'Server Error';
    } else if (
      error?.response?.status === NETWORKSTATUS.AUTH_ERROR ||
      error?.response?.status === NETWORKSTATUS.AUTH_ERROR2
    ) {
      toastMessage = 'Session Expired. Please login again.';
    }
    ToastMessage({
      type: 'error',
      text1: toastMessage ? toastMessage : 'Something went wrong',
    });
  } else if (error.request) {
  } else {
    ToastMessage({
      type: 'error',
      text1: 'Something went wrong',
    });
  }
};
