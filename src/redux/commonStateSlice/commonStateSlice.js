import {createSlice} from '@reduxjs/toolkit';
import {H_SWIPE_RANGE} from '../../helpers/ResponsiveFonts';
import strings from '../../constants/string';

const initialState = {
  showLoader: false,
  redAlertSwipeState: false,
  redAlertSwipeText: strings.slideToRedAlert,
  yellowAlertSwipeState: false,
  yellowAlertSwipeText: strings.slidetoTeamAlert,
  recordOrStopState: false,
  recordOrStopText: 'Slide  to Record & Set Timer',
  swiperValue: 0,
  stepNumber: 0,
  gpsStatus: false,
  notifications: [],
  watchConnectionState: '',
  devicesData: [],
  pairedDevices: [],
  countdownStartTime: '',
  connectionIndex: 0,
  isRedAlertActive: false,
  previousSwiperValue: 0,
  isRedAlertCanceled: false,
};

const CommonStateSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setShowLoader: (state, action) => {
      state.showLoader = action.payload;
    },
    setRedAlertSwipe: (state, action) => {
      console.log('action.payload', action.payload);
      state.redAlertSwipeState = action.payload;
      state.redAlertSwipeText = action.payload
        ? strings.cancelAlert
        : strings.slideToRedAlert;
      state.swiperValue = action.payload ? H_SWIPE_RANGE : 1;
    },

    setRedAlertCanceled(state, action) {
      state.isRedAlertCanceled = action.payload;
    },
    setYellowAlertSwipe: (state, action) => {
      state.yellowAlertSwipeState = action.payload;
      state.yellowAlertSwipeText = action.payload
        ? strings.cancelAlert
        : strings.slidetoTeamAlert;
    },
    setRecordOrStop: (state, action) => {
      state.recordOrStopState = action.payload;
      state.recordOrStopText = action.payload
        ? 'Slide to Stop Recording'
        : 'Slide to Record';
    },
    setStepValue: (state, action) => {
      state.stepNumber = action.payload;
    },
    setGpsStatus: (state, action) => {
      console.log(action.payload, 'action.payload for gpsStatus');
      state.gpsStatus = action.payload;
    },
    saveNotification: (state, action) => {
      console.log(action.payload, 'action.payload for notification');
      state.notifications = [...state.notifications, ...action.payload];
    },
    setWatchConnectionState: (state, action) => {
      console.log('action.payload of watch connection state', action.payload);
      state.watchConnectionState = action.payload;
    },
    setDevicesData: (state, action) => {
      state.devicesData = action.payload;
    },
    setPairedDevices: (state, action) => {
      state.pairedDevices = action.payload;
    },
    setCountdownStartTime: (state, action) => {
      console.log(
        'action.payload of time when countdwon started',
        action.payload,
      );
      state.countdownStartTime = action.payload;
    },
    setConnectionIndex: (state, action) => {
      console.log('action.payload of connection Index', action.payload);
      state.connectionIndex = action.payload;
    },
  },
});
export const {
  setShowLoader,
  setRedAlertSwipe,
  setSwiperValue,
  setYellowAlertSwipe,
  setStepValue,
  setRecordOrStop,
  setGpsStatus,
  saveNotification,
  setWatchConnectionState,
  setDevicesData,
  setPairedDevices,
  setCountdownStartTime,
  setConnectionIndex,
  setRedAlertCanceled,
} = CommonStateSlice.actions;

export default CommonStateSlice.reducer;
export const ShowLoaderState = state => state.common.showLoader;
