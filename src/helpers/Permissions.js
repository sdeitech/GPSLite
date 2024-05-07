import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {firebase} from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Config from 'react-native-config';

const apiKey = Config.GOOGLE_MAPS_API_KEY;

export const getLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then(() => {})
            .catch(err => console.log(err, 'err'));
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.GRANTED:
          return true;
        case RESULTS.BLOCKED:
          break;
      }
    } catch (error) {}
  } else {
  }
};

const requestNotificationPermission = async () => {
  const result =
    Platform.OS == 'android'
      ? await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
      : await request(PERMISSIONS.IOS.POST_NOTIFICATIONS);
  return result;
};
export const getFcmToken = async (dispatch, isLogin, authToken) => {
  await firebase
    .messaging()
    .getToken()
    .then(token => {
      console.log(token, 'fcmtoken');
      return token;
    })
    .catch(error => {
      console.log('Error in getting FCM Token', error);
    });
};

export const checkPermission = async dispatch => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken(dispatch, true);
  } else {
    getPermission();
  }
};
export const getPermission = async () => {
  firebase
    .messaging()
    .requestPermission()
    .then(() => {
      checkPermission();
    })
    .catch(error => {
      console.log('user Rejected the permission', error);
    });
};

export const checkNotificationPermission = async () => {
  const result =
    Platform.OS === 'android'
      ? await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
      : await check(PERMISSIONS.IOS.POST_NOTIFICATIONS);

  if (result) {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.DENIED:
        request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
          .then(result => {})
          .catch(err => console.log(err, 'err'));
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.GRANTED:
        break;
      case RESULTS.BLOCKED:
        break;
    }
  }

  return result;
};
export const checkAndRequestPermissions = async () => {
  try {
    const permissionType =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    const result = await check(permissionType);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert('This feature is not available on this device');
        return false;

      case RESULTS.DENIED:
        const requestResult = await request(permissionType);
        switch (requestResult) {
          case RESULTS.GRANTED:
            return true;
          default:
            return false;
        }

      case RESULTS.GRANTED:
        return true;

      default:
        return false;
    }
  } catch (error) {
    __DEV__ && console.log(error);
    return false;
  }
};

export const requestPermissionNotification = async () => {
  const checkPermission = await checkNotificationPermission();
  if (checkPermission !== RESULTS.GRANTED) {
    const request = await requestNotificationPermission();
    if (request !== RESULTS.GRANTED) {
      // permission not granted
    }
  }
};

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position?.coords?.heading,
        };
        console.log(cords, 'cords of location');
        resolve(cords);
      },
      error => {
        console.log(error, 'getCurrentLocation');
        reject(error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  });
export const getAddressCoordinates = async (address, dispatch, callback) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address,
      )}&key=${apiKey}`,
    );

    if (response.data.results.length > 0) {
      const {lat, lng} = response.data.results[0].geometry.location;
      // Invoke the callback with the coordinates
      callback({lat, lng});
    } else {
      console.error('No results found for the given address');
      // Invoke the callback with null or an error flag
      callback(null);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    // Invoke the callback with null or an error flag

    callback(null);
  }
};
export const toCheckBluetooth = async () => {
  if (Platform.OS === 'android') {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
            .then(result => {})
            .catch(err => console.log(err, 'err'));
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.GRANTED:
          return true;
        case RESULTS.BLOCKED:
          break;
      }
    } catch (error) {}
  } else {
    // iOS does not require explicit permission for Bluetooth
    try {
      const result = await check(PERMISSIONS.IOS.BLUETOOTH_CONNECT);
      console.log(result, 'result bluetooth connect req for ios');
      switch (
        result
        // ... (your existing switch cases)
      ) {
      }
    } catch (error) {
      console.error('Error checking Bluetooth permission:', error);
    }
  }
};
export const toConnectBluetooth = async () => {
  if (Platform.OS === 'android') {
    try {
      const result = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
      console.log(result, 'result bluetooth connect req');
      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          // request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT)
          //   .then(result => {})
          //   .catch(err => console.log(err, 'err'));
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.GRANTED:
          return true;
        case RESULTS.BLOCKED:
          break;
      }
    } catch (error) {}
  } else {
    // iOS does not require explicit permission for Bluetooth
    const result = await check(PERMISSIONS.IOS.BLUETOOTH_CONNECT);
    console.log(result, 'result bluetooth connect req for ios');
    switch (result) {
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.DENIED:
        request(PERMISSIONS.IOS.BLUETOOTH_CONNECT)
          .then(result => console.log(result, 'result in ios'))
          .catch(err => console.log(err, 'err'));
        break;
      case RESULTS.LIMITED:
        break;
      case RESULTS.GRANTED:
        return true;
      case RESULTS.BLOCKED:
        break;
    }
  }
};
export const toScanBluetooth = async () => {
  if (Platform.OS === 'android') {
    try {
      const result = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          break;
        case RESULTS.DENIED:
          // request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN)
          //   .then(result => {})
          //   .catch(err => console.log(err, 'err'));
          break;
        case RESULTS.LIMITED:
          break;
        case RESULTS.GRANTED:
          return true;
        case RESULTS.BLOCKED:
          break;
      }
    } catch (error) {}
  } else {
    // iOS does not require explicit permission for Bluetooth
    return true;
  }
};
export const recordingPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      console.log('write external stroage', grants);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
        return true;
      } else {
        return true;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  } else {
    return true;
  }
};
