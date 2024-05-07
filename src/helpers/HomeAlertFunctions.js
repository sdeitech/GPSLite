/* eslint-disable no-shadow */
// alertFunctions.js

import moment from 'moment';
import {
  addDeviceDetails,
  checkMobileAction,
  raiseAlert,
} from 'src/redux/slice/homeSlice';
import notifee from '@notifee/react-native';
import {saveNotification} from 'src/redux/commonStateSlice/commonStateSlice';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import {
  getCurrentLocation,
  getLocationPermission,
  requestPermissionNotification,
} from './Permissions';
import {Alert, Linking, Vibration} from 'react-native';
import {getAllJobs} from 'src/redux/slice/jobSlice';
import {saveFcmToken, setReduxLocation} from 'src/redux/slice/authSlice';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';
import Tts from 'react-native-tts';
import {useState} from 'react';

// functions to detect fall:-
setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100s
export const handleAcceleration = (
  {x, y, z},
  setCurrentSpeed,
  setOverSpeedShow,
  handleFallAlert,
) => {
  const speed = x + y + z;
  const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  setCurrentSpeed(acceleration);

  if (acceleration > 80) {
    setOverSpeedShow(true);
  } else {
    setOverSpeedShow(false);
  }
  if (speed > 0) {
    console.log('speed====>>>>', speed);
    handleFallAlert();
  }
};

export const handleError = () => {
  // Handle error if needed
};

export const subscribeToAcceleration = (
  setCurrentSpeed,
  setOverSpeedShow,
  handleFallAlert,
) => {
  return accelerometer
    .pipe(
      map(handleAcceleration),
      filter(speed => speed > 0),
    )
    .subscribe(handleFallAlert, handleError);
};

// functions ot renderinitial api calls:-
/**save fcm Token */
const saveFirebaseToken = (dispatch, user) => {
  const body = {
    userid: user?.userId,
    token: user?.accessToken,
  };
  dispatch(saveFcmToken(body));
};
export const onRenderApiCalls = async (dispatch, user) => {
  /**
   * call API to get  number of jobs and job for other screens && fcm Token save.
   */
  const body = {
    emailId: user?.userDetails?.emailId,
  };
  dispatch(getAllJobs(body));
  saveFirebaseToken(dispatch, user);
  getLocationPermission().then(r => {
    if (r) {
      locationEnable();
    }
  });
  const currentLocation = await getCurrentLocation();
  console.log('currentLocation=====>>>>>', currentLocation);
  dispatch(setReduxLocation(currentLocation));
  requestPermissionNotification();
};

// Functions for locations:-
const openLocationSettings = () => {
  Linking.sendIntent('android.settings.SETTINGS');
};
const showEnableLocationAlert = () => {
  Alert.alert(
    'Enable Location',
    'To use this feature, please enable location services.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Enable',
        onPress: openLocationSettings,
      },
    ],
  );
};
export const locationEnable = async () => {
  const deviceGpsActive = await DeviceInfo.isLocationEnabled();
  if (!deviceGpsActive) {
    showEnableLocationAlert();
  }
};

// functions for debounce

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// for locationGps:-
export const locationGps = async (user, reduxLocation, location, dispatch) => {
  const isLocationEnabled = await DeviceInfo.isLocationEnabled();
  console.log('isLocationEnabled====>>>>', isLocationEnabled);
  const actionBody = {
    actionType: isLocationEnabled ? 4 : 3,
    genertatedOn: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    userId: user?.userId,
    latitude: isLocationEnabled
      ? location.current.latitude
      : reduxLocation.latitude,
    longitude: isLocationEnabled
      ? location.current.longitude
      : reduxLocation.longitude,
  };
  dispatch(checkMobileAction(actionBody));
  // Handle the location change event here
};

// Functions for alerts:--
export const raiseTeamAlert = (
  dispatch,
  user,
  reduxLocation,
  job,
  setIsTeamAlert,
  isTeamAlert,
) => {
  const data = {
    createdBy: 0,
    deviceAlertId: 0,
    userId: user?.userId,
    alertType: 3,
    alertDateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    staffName: `${user?.userDetails?.firstName} ${user?.userDetails?.lastName}`,
    longitude: reduxLocation.longitude,
    latitude: reduxLocation.latitude,
    groupId: Number(job[0]?.group),
    customer: '',
  };
  dispatch(raiseAlert(data));
  // setIsTeamAlert(!isTeamAlert);
};

export const raiseRedAlert = (
  dispatch,
  user,
  reduxLocation,
  setIsRedAlert,
  sosAlertData,
  welfareTimerEnds,
  audioBase64Data,
) => {
  if (sosAlertData.deviceAudioVoiceOn === true) {
    Tts.speak(sosAlertData.sosDeviceAudioActivation);
  }
  console.log('reduxRecording======>>>>', sosAlertData);

  const data = {
    createdBy: user?.userId,
    deviceAlertId: 0,
    userId: user?.userId,
    alertType: 1,
    alertDateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    staffName: `${user?.userDetails?.firstName} ${user?.userDetails?.lastName}`,
    longitude: reduxLocation.longitude,
    latitude: reduxLocation.latitude,
    customer: '',
    sosWelfareAlert: welfareTimerEnds ? true : false,
    filePath: welfareTimerEnds ? audioBase64Data : '',
  };
  const actiondata = {
    actiontype: 5,
    userId: user?.userId,
    longitude: reduxLocation.longitude,
    latitude: reduxLocation.latitude,
    genertatedOn: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    audioFile: welfareTimerEnds ? audioBase64Data : '',
  };
  console.log('data of red alert by welfrae alert', data);
  dispatch(raiseAlert(data));
  dispatch(checkMobileAction(actiondata));
  if (sosAlertData.popUpMWMOn === true) {
    setIsRedAlert(true);
    setTimeout(() => {
      setIsRedAlert(false);
    }, 2000);
  }
};

export const raiseFallAlert = (
  dispatch,
  user,
  reduxLocation,
  setFallAlertCountdown,
  setIsFallAlert,
) => {
  setFallAlertCountdown(15);
  setIsFallAlert(false);
  const data = {
    createdBy: 0,
    deviceAlertId: 0,
    userId: user?.userId,
    alertType: 2,
    alertDateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    staffName: `${user?.userDetails?.firstName} ${user?.userDetails?.lastName}`,
    longitude: reduxLocation.longitude,
    latitude: reduxLocation.latitude,
    customer: '',
  };
  dispatch(raiseAlert(data));
};

// functions for navigation for home screen
export const navigateToProfile = navigation => {
  navigation.navigate('Profile');
};

export const navigatetoVerifyPin = navigation => {
  Vibration.vibrate(500);
  navigation.navigate('GeneratePin', {
    isCancelAlertScreen: true,
    isTeamAlertScreen: false,
  });
};

export const navigatetoVerifyPinAlert = navigation => {
  navigation.navigate('GeneratePin', {
    isCancelAlertScreen: false,
    isTeamAlertScreen: true,
  });
};

export const navigateToNotification = navigation => {
  navigation.navigate('Notifications', {source: 'notificationRedux'});
};

// functions for notifications for home screen
export const onDisplayNotification = async (title, body) => {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: title || 'Notification Title',
    body: body || 'Main body content of the notification',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      sound: 'my-sound.mp3',
      pressAction: {
        id: 'default',
      },
      actions: [
        {
          title: 'Cancel',
          pressAction: {
            id: 'cancel',
          },
        },
      ],
    },
    // ios: {
    //   foregroundPresentationOptions: {
    //     badge: true,
    //     sound: true,
    //     banner: true,
    //     list: true,
    //   },
    // },
  });
};

export const openNotificationScreen = (navigation, dispatch, item) => {
  dispatch(saveNotification([item]));
  navigation.navigate('Notifications', {source: 'notification', item});
};

export const foreGroundNotificationEventHandle = (
  notifee,
  messaging,
  EventType,
  dispatch,
  navigation,
) => {
  return notifee.onForegroundEvent(({type, detail}) => {
    switch (type) {
      case EventType.DISMISSED:
        break;
      case EventType.PRESS:
        openNotificationScreen(navigation, dispatch, detail.notification);
        break;
    }
  });
};

// getDeviceDetails function:--
export const getDeviceDetailsMobile = async (
  dispatch,
  user,
  deviceStatusData,
  isAlertVisible,
) => {
  try {
    const {latitude, longitude} = await getCurrentLocation();
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceModel = DeviceInfo.getModel();
    const deviceBrand = DeviceInfo.getBrand();
    const deviceSystemName = DeviceInfo.getSystemName();
    const deviceSystemVersion = DeviceInfo.getSystemVersion();
    const deviceBatteryLevel = await DeviceInfo.getBatteryLevel();
    const deviceGpsActive = await DeviceInfo.isLocationEnabled();

    console.log('deviceStatusData>>>>>', deviceStatusData);

    const batteryPercentage = () => {
      if (deviceBatteryLevel !== -1) {
        const batteryPercentage = deviceBatteryLevel * 100;
        if (batteryPercentage <= 20) {
          // const intervalId = setInterval(() => {
          //   Vibration.vibrate(500);
          // }, 30000); // 10 minutes in milliseconds
          if (deviceStatusData.batteryYes === true) {
            if (deviceStatusData.mergeInsightsYes === true) {
              Alert.alert(deviceStatusData.lowBatterAlertScreenMassage);
            }
            if (deviceStatusData.lowBatterAlertDeviceOn === true) {
              Tts.speak(deviceStatusData.lowBatterAlertDeviceAudioActivation);
            }
          }

          // Clean up function to clear the interval when component unmounts
          // return () => clearInterval(intervalId);
        }
        return batteryPercentage;
      } else {
        // Handle battery level not available
      }
    };

    const signalStrength = await NetInfo.fetch();
    console.log('signalStrength=====>>>>', signalStrength.isConnected);

    if (signalStrength.isConnected === false) {
      // const intervalId = setInterval(() => {
      //   Vibration.vibrate(500);
      // }, 30000); // 10 minutes in milliseconds
      if (deviceStatusData.mergeInsightsYes === true) {
        if (deviceStatusData.signalStrengthYes === true) {
          Alert.alert(deviceStatusData.signalStrengthScreenMassage);
        }
        if (deviceStatusData.signalStrengthAlertDeviceAudioOn) {
          // Tts.speak(deviceStatusData.signalStrengthDeviceAudioActivation);
        }
      }
      // Clean up function to clear the interval when component unmounts

      // return () => clearInterval(intervalId);
    } else {
      if (deviceStatusData.mergeInsightsYes === true) {
        if (deviceStatusData.signalStrengthYes === true) {
          Alert.alert(deviceStatusData.signalStrengthRegaindScreenMassage);
        }
        if (deviceStatusData.signalStrengthRegaindAlertDeviceAudioOn === true) {
          // Tts.speak(
          //   deviceStatusData.signalStrengthRegaindDeviceAudioActivation,
          // );
        }
      }
    }
    console.log('deviceStatusData=========>>>>>>>>', deviceStatusData);

    const deviceDetailsBody = {
      userId: user?.userId,
      emailAddress: user?.userDetails?.emailId,
      deviceId,
      model: deviceModel,
      brand: deviceBrand,
      systemName: deviceSystemName,
      systemVersion: deviceSystemVersion,
      batteryLevel:
        deviceStatusData?.batteryYes === true
          ? batteryPercentage(deviceBatteryLevel)
          : 0,
      gpsActive: deviceGpsActive,
      signalStrength:
        deviceStatusData?.signalStrengthYes === true
          ? {
              type: signalStrength?.type,
              isConnected: signalStrength?.isConnected,
              level: signalStrength?.details?.strength
                ? JSON.stringify(signalStrength?.details?.strength)
                : JSON.stringify(100),
            }
          : {
              type: '',
              isConnected: false,
              level: '',
            },

      gpsLocation:
        deviceStatusData?.locationYes === true
          ? {
              latitude,
              longitude,
            }
          : {
              latitude: 0,
              longitude: 0,
            },
      safteyCheckActive: isAlertVisible ? true : false,
      lastSaftyCheckDate:
        deviceStatusData?.lastSaftyCheckOutYes === true
          ? moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          : null,
      lastCommunicatedTime:
        deviceStatusData?.lastCommunicationYes === true
          ? moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          : null,
    };

    console.log('deviceDetailsBody>>>', deviceDetailsBody);
    dispatch(addDeviceDetails(deviceDetailsBody));

    //     console.log('deviceDetailsBody==========>>>>>>>', deviceDetailsBody);
    //     dispatch(addDeviceDetails(deviceDetailsBody));
  } catch (error) {
    // Handle errors
    console.error('Error fetching device details:', error);
  }
};
export const vibrateWithPattern = () => {
  // Define the vibration pattern
  const pattern = [0, 500, 100, 500, 100, 500, 100, 500, 100, 500];
  // Repeat the pattern 3 times
  const repetitions = 3;

  // Start vibrating
  function startVibration() {
    // Check if the Vibration API is supported
    if ('vibrate' in navigator) {
      // Vibrate with the defined pattern
      navigator.vibrate(pattern);

      // Schedule the next repetition
      setTimeout(
        stopVibration,
        pattern.reduce((acc, val) => acc + val, 0) * repetitions,
      );
    } else {
      console.log('Vibration API is not supported.');
    }
  }

  // Stop vibrating
  function stopVibration() {
    navigator.vibrate(0); // Stop the vibration
    // Schedule the next repetition after 10 seconds
    setTimeout(startVibration, 10000);
  }
};
