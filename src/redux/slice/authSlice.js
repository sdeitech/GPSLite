import axiosInstance from '../../helpers/AxiosInstance';
import {createSlice} from '@reduxjs/toolkit';
import {setShowLoader} from '../commonStateSlice/commonStateSlice';
import ToastMessage from '../../components/common/ToastMessage';
import API_URL from '../../constants/apiUrl';

const initialState = {
  user: null,
  token: null,
  isUserLoggedIn: false,
  Pin: '',
  showGeneratePinScreen: true,
  reduxLocation: {latitude: 0, longitude: 0},
  checkInOutData: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginProfile: (state, actions) => {
      const {user, accessToken} = actions.payload;
      state.user = user;
      state.token = accessToken;
      state.isUserLoggedIn = true;
      state.showGeneratePinScreen = true;
    },
    setChangePassword: (state, actions) => {
      state.oldpassword = '';
      state.newPassword = '';
    },
    sendpasswordlink: (state, actions) => {
      state.emailId = '';
    },
    setProfileDetail: (state, actions) => {
      state.profileDetail = actions.payload;
    },
    setCreatePin: (state, action) => {
      state.Pin = action.payload;
    },
    setChangePin: (state, action) => {
      state.oldPin = action.payload;
      state.newPin = action.payload;
    },
    setVerifyPin: (state, action) => {
      state.pinVerify = action.payload;
    },
    logOut: state => {
      state.user = null;
      state.token = null;
      state.isUserLoggedIn = false;
      state.showGeneratePinScreen = true;
    },
    hideGeneratePinScreen: state => {
      state.showGeneratePinScreen = false;
    },
    setReduxLocation: (state, action) => {
      state.reduxLocation = action.payload;
    },
    setCheckInOutData: (state, action) => {
      state.checkInOutData = action.payload;
    },
  },
});

export const loginAsync = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.post(API_URL.LOGIN, data);
    console.log(response, 'responseoflogin');
    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.isSuccess) {
        console.log('response============>>>>>>>>>', response);
        dispatch(
          setLoginProfile({
            user: response?.data,
            accessToken: response?.data?.accessToken,
          }),
        );
        return response?.data?.userId;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.errorMessage,
        });
      }
    } else {
      dispatch(setShowLoader(false));
    }
  } catch (error) {
    dispatch(setShowLoader(false));
    ToastMessage({
      type: 'error',
      text1: 'Email is incorrect.',
    });

    return false;
  }
};

export const changePassword = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.post(API_URL.CHANGE_PASSWORD, data);

    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setChangePassword());
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {
    dispatch(setShowLoader(false));
    return 'error';
  }
};

export const forgotPassword = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.post(API_URL.FORGOT_PASSWORD, data);
    if (response) {
      dispatch(setShowLoader(false));
      if (response?.data?.success) {
        // ToastMessage({
        //   type: 'success',
        //   text1: response?.data?.message,
        // });
        return true;
      }
    }
  } catch (error) {
    dispatch(setShowLoader(false));
    return 'error';
  }
};

export const saveFcmToken = data => async dispatch => {
  try {
    const response = await axiosInstance.post(
      `${API_URL.SAVE_FCM_TOKEN}?userid=${data?.userid}&token=${data?.token}`,
    );
    if (response) {
    }
  } catch (error) {
    return 'error';
  }
};

export const getProfileDetail = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.get(
      `${API_URL.GET_PROFILE_DATA}/${data.username}`,
    );

    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setProfileDetail(response.data.data.employeesMaster));
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {
    dispatch(setShowLoader(false));
    return 'error';
  }
};

export const getCheckInandOut = () => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.get(`${API_URL.GET_CHECKIN_OUT}`);
    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        console.log(response.data.data, 'response of check in and check out');
        dispatch(setCheckInOutData(response.data.data));
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {
    console.log('erro>>>>>>newr', error);
    dispatch(setShowLoader(false));
    return 'error';
  }
};

export const createPin = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.post(API_URL.CREATE_PIN, data);
    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setCreatePin(response.data));
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {
    dispatch(setShowLoader(false));
    return 'error';
  }
};

export const changePin = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.post(API_URL.CHANGE_PIN, data);
    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setChangePin());
        ToastMessage({
          type: 'success',
          text1: response.data.message,
        });
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {
    dispatch(setShowLoader(false));
    return error;
  }
};

export const verifyPin = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.post(
      `${API_URL.VERIFY_PIN}?userid=${data.userid}&pin=${data.pin}`,
    );
    if (response.data.success) {
      console.log(response, 'response>>>>>');

      return true;
    } else {
      ToastMessage({
        type: 'error',
        text1: response?.data?.message,
      });
      // return false;
    }
  } catch (error) {
    ToastMessage({
      type: 'error',
      // text1: response?.data?.message,
    });

    return false;
  } finally {
    dispatch(setShowLoader(false));
  }
};
export const forgotPin = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.post(API_URL.FORGOT_PIN, data);
    console.log(response, 'response>>>>>>forgot');
    if (response) {
      dispatch(setShowLoader(false));
      if (response?.data?.success) {
        // ToastMessage({
        //   type: 'success',
        //   text1: response?.data?.message,
        // });
        return true;
      }
    }
  } catch (error) {
    dispatch(setShowLoader(false));
    return error;
  }
};
export const resetPassworddata = data => async dispatch => {
  console.log(data, 'data>>>');
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.post(API_URL.RESET_PASSWORD, data);
    console.log(response, 'response>>>>>>forgot');
    if (response) {
      dispatch(setShowLoader(false));
      if (response.status === 200) {
        return true;
      }
    }
  } catch (error) {
    dispatch(setShowLoader(false));
    return error;
  }
};
export const {
  setLoginProfile,
  setChangePassword,
  logOut,
  hideGeneratePinScreen,
  setProfileDetail,
  setCreatePin,
  setChangePin,
  setVerifyPin,
  setReduxLocation,
  setCheckInOutData,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
export const selectCurrentToken = state => state.auth.token;
export const isUserLoggedIn = state => state.auth.isUserLoggedIn;
export const showGeneratePin = state => state.auth.showGeneratePinScreen;
export const oldpassword = state => state.auth.oldpassword;
export const newPassword = state => state.auth.newPassword;
export const profileDetail = state => state.auth.profileDetail;
export const pin = state => state.auth.Pin;
export const oldPin = state => state.auth.oldPin;
export const newPin = state => state.auth.newPin;
export const pinVerify = state => state.auth.verifyPin;
export const selectedReduxLocation = state => state.auth.reduxLocation;
export const selectCheckInOutData = state => state.auth.checkInOutData;
