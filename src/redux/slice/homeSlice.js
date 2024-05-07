import API_URL from '../../constants/apiUrl';
import {createSlice} from '@reduxjs/toolkit';
import {setShowLoader} from '../commonStateSlice/commonStateSlice';
import axiosInstance from '../../helpers/AxiosInstance';
import {errorHandler} from '../../helpers/ErrorHandler';
import ToastMessage from '../../components/common/ToastMessage';
import {setRedAlertCanceled} from '../commonStateSlice/commonStateSlice';
const initialState = {
  currLocation: {},
  alertId: '',
  welfareAlertId: '',
  sosAlertData: {},
  fallAlertData: {},
  overSpeedAlertData: {},
  welfareAlertData: {},
  geofencingData: {},
  deviceStatusData: {},
};
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setCurrLocation: (state, action) => {
      state.currLocation = action.payload;
    },
    setAlertId: (state, action) => {
      state.alertId = action.payload;
    },
    setWelfareAlertId: (state, action) => {
      state.welfareAlertId = action.payload;
    },
    setRedAlertStatus: (state, action) => {
      state.redAlertStatus = action.payload;
    },
    setSosAlertData: (state, action) => {
      state.sosAlertData = action.payload;
    },
    setFallAlertData: (state, action) => {
      state.fallAlertData = action.payload;
    },
    setOverSpeedAlertData: (state, action) => {
      state.overSpeedAlertData = action.payload;
    },
    setWelfareAlertData: (state, action) => {
      console.log('action.payload=======>>>>>>>..', action.payload);
      state.welfareAlertData = action.payload;
    },
    setGeoFencingData: (state, action) => {
      state.geofencingData = action.payload;
    },
    setDeviceStatus: (state, action) => {
      state.deviceStatusData = action.payload;
    },
  },
});
/**api to get data of all jobs in jobs>index.js */

/**api to RAISE ALERT */
export const raiseAlert = data => async dispatch => {
  dispatch(setShowLoader(true));

  try {
    const response = await axiosInstance.post(API_URL.RAISE_ALERT, data);

    if (response) {
      dispatch(setAlertId(response.data));
      dispatch(setRedAlertStatus(response.data.success));
      dispatch(setShowLoader(false));
      return true;
    }
  } catch (error) {
    dispatch(setShowLoader(false));

    return error;
  }
};

/**to add device details:------ */
export const addDeviceDetails = data => async dispatch => {
  try {
    const response = await axiosInstance.post(API_URL.DEVICE_DETAILS, data);
    console.log('r+++++esponse>>>>', response);
    if (response) {
    }
  } catch (error) {
    errorHandler(error);
  }
};

export const checkMobileAction = data => async dispatch => {
  try {
    const response = await axiosInstance.post(
      API_URL.MOBILE_ACTION_FOR_GPS,
      data,
    );
    // console.log('response=====>>>>>>>', response);
  } catch (error) {
    errorHandler(error);
  }
};

export const cancelAlert = data => async dispatch => {
  try {
    const response = await axiosInstance.post(API_URL.CANCEL_ALERT, data);

    if (response) {
      // ToastMessage({
      //   type: 'success',
      //   text1: response.data.message,
      // });
      // Dispatch action indicating the cancellation of Red alert
      dispatch(setRedAlertCanceled(true)); // Assuming this action sets the Red alert canceled state to true
    }
  } catch (error) {
    errorHandler(error);
  }
};

export const welfareAlert = data => async dispatch => {
  try {
    const response = await axiosInstance.post(API_URL.WELFARE_ALERT, data);

    if (response) {
      // ToastMessage({
      //   type: 'success',
      //   text1: response.data.message,
      // });
      console.log('response=======>>>>>', response);
      dispatch(setWelfareAlertId(response.data.data.id));
    }
  } catch (error) {
    errorHandler(error);
  }
};
export const welfareAlertCancel = data => async dispatch => {
  try {
    const response = await axiosInstance.post(
      API_URL.WELFARE_ALERT_CANCEL,
      data,
    );

    if (response) {
      // ToastMessage({
      //   type: 'success',
      //   text1: response.data.message,
      // });
    }
  } catch (error) {
    errorHandler(error);
  }
};

export const getSosAlert = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.get(`${API_URL.GET_SOS_ALERT}`);

    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setSosAlertData(response.data.data));
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {}
};

export const getFallAlert = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.get(`${API_URL.GET_FALL_ALERT}`);

    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setFallAlertData(response.data.data));
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {}
};

export const getWelfareAlertData = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.get(
      `${API_URL.GET_WELFARE_TIMER_DATA}`,
    );
    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setWelfareAlertData(response.data.data));
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {}
};

export const getOverspeedData = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.get(`${API_URL.GET_OVERSPEED_DATA}`);
    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setOverSpeedAlertData(response.data.data));
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {}
};
export const getGeoFenceData = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.get(`${API_URL.GET_GEOFENCING_DATA}`);
    if (response) {
      console.log('response========>>>>>>', response);
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setGeoFencingData(response.data.data));
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {}
};

export const getDeviceStatus = data => async dispatch => {
  dispatch(setShowLoader(true));
  try {
    const response = await axiosInstance.get(`${API_URL.GET_DEVICE_STATUS}`);
    if (response) {
      dispatch(setShowLoader(false));
      if (response.data.success) {
        dispatch(setDeviceStatus(response.data.data));
        return true;
      } else {
        ToastMessage({
          type: 'error',
          text1: response.data.message,
        });
      }
    }
  } catch (error) {}
};
export const {
  setCurrLocation,
  setAlertId,
  setWelfareAlertId,
  setRedAlertStatus,
  setSosAlertData,
  setFallAlertData,
  setOverSpeedAlertData,
  setWelfareAlertData,
  setGeoFencingData,
  setDeviceStatus,
} = homeSlice.actions;
export default homeSlice.reducer;
export const userLocation = state => state.home.currLocation;
export const deviceAlertId = state => state.home.alertId;
export const welfareSafetyId = state => state.home.welfareAlertId;
export const redAlertStatus = state => state.home.redAlertStatus;
export const deviceStatusDetail = state => state.home.deviceStatusData;
