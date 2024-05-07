// /* eslint-disable no-alert */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable react-native/no-inline-styles */
// import Images from '@assets/images';
// import AlertModal from '@components/common/AlertModal';
// import CustomHeader from '@components/common/CustomHeader';
// import CustomList from '@components/common/CustomList';
// import CustomModal from '@components/common/CustomModal';
// import CustomText from '@components/common/CustomText';
// import SwipeButton from '@components/common/SwipeButton';
// import COLOR from '@constants/colors';
// import FONTSIZE from '@constants/fontSize';
// import strings from '@constants/string';
// import {
//   foreGroundNotificationEventHandle,
//   getDeviceDetailsMobile,
//   navigateToNotification,
//   navigateToProfile,
//   navigatetoVerifyPin,
//   navigatetoVerifyPinAlert,
//   onDisplayNotification,
//   onRenderApiCalls,
//   openNotificationScreen,
//   raiseFallAlert,
//   raiseRedAlert,
//   raiseTeamAlert,
// } from '@helpers/HomeAlertFunctions';
// import {recordingPermission} from '@helpers/Permissions';
// import {
//   horizontalScale,
//   moderateScale,
//   verticalScale,
// } from '@helpers/ResponsiveFonts';
// import SignalR from '@helpers/SignalR';
// import notifee, {EventType} from '@notifee/react-native';
// import {addEventListener} from '@react-native-community/netinfo';
// import messaging from '@react-native-firebase/messaging';
// import {setRedAlertSwipe} from '@redux/commonStateSlice/commonStateSlice';
// import {selectCurrentUser} from '@redux/slice/authSlice';
// import moment from 'moment';
// import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
// import {
//   Alert,
//   Image,
//   Platform,
//   RefreshControl,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   Vibration,
//   View,
// } from 'react-native';
// import RNBeep from 'react-native-a-beep';
// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
// } from 'react-native-audio-recorder-player';
// import ReactNativeBlobUtil from 'react-native-blob-util';

// import Slider from 'react-native-custom-slider';
// import DeviceInfo from 'react-native-device-info';
// import RNFS from 'react-native-fs';
// import LinearGradient from 'react-native-linear-gradient';
// import {
//   SensorTypes,
//   accelerometer,
//   setUpdateIntervalForType,
// } from 'react-native-sensors';
// import {useDispatch, useSelector} from 'react-redux';
// import {filter, map} from 'rxjs/operators';
// import {
//   setRedAlertCanceled,
//   setYellowAlertSwipe,
// } from 'src/redux/commonStateSlice/commonStateSlice';
// import {
//   getCheckInandOut,
//   getProfileDetail,
//   profileDetail,
//   selectCheckInOutData,
//   selectedReduxLocation,
// } from 'src/redux/slice/authSlice';
// import {
//   checkMobileAction,
//   deviceStatusDetail,
//   getDeviceStatus,
//   getFallAlert,
//   getGeoFenceData,
//   getOverspeedData,
//   getSosAlert,
//   getWelfareAlertData,
//   welfareAlert,
//   welfareAlertCancel,
//   welfareSafetyId,
// } from 'src/redux/slice/homeSlice';
// import {
//   checkInOut,
//   getAllJobs,
//   getJobHours,
//   jobs,
//   jobsCount,
//   plannerJobHours,
//   selectCheckInStatus,
// } from 'src/redux/slice/jobSlice';
// import styles from './style';
// import {savedRecording, stopRecording} from 'src/redux/slice/audioSlice';
// // import SplashScreen from 'react-native-splash-screen';
// import Tts from 'react-native-tts';
// import SignalRPlatformSettings from '@helpers/SignalRPlatformSettings';

// const Home = ({navigation, route}) => {
//   const jobCount = useSelector(jobsCount);
//   const user = useSelector(selectCurrentUser);

//   const job = useSelector(jobs);
//   const checkInOutStatus = useSelector(selectCheckInStatus);
//   const jobHours = useSelector(plannerJobHours);
//   const dispatch = useDispatch();
//   const {
//     redAlertSwipeState,
//     redAlertSwipeText,
//     yellowAlertSwipeState,
//     yellowAlertSwipeText,
//     swiperValue,
//     watchConnectionState,
//   } = useSelector(state => state.common);
//   const reduxLocation = useSelector(selectedReduxLocation);
//   const profileData = useSelector(profileDetail);
//   // Welfare Safety Alert
//   const [isAlertVisible, setIsAlertVisible] = useState(false);
//   const [isWelfareAlert, setIsWelfareAlert] = useState(false);
//   const [isWelfareCancel, setIsWelfareCancel] = useState(false);
//   // Team Alert
//   const [isTeamAlert, setIsTeamAlert] = useState(false);
//   const [isFallAlert, setIsFallAlert] = useState(false);
//   const [isRedAlert, setIsRedAlert] = useState(false);
//   const [isArrived, setIsArrived] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [fallAlertCountdown, setFallAlertCountdown] = useState(15);
//   const [refreshing, setRefreshing] = React.useState(false);
//   const [isActive, setIsActive] = useState(false);
//   const [fallIntervalId, setFallIntervalId] = useState(null);
//   const [overSpeedShow, setOverSpeedShow] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const [sliderValue, setSliderValue] = useState(0);
//   const [countdownStart, setCountdownStart] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordingStarted, setRecordingStarted] = useState(false);
//   const [thirtySeconds, setThirtySeconds] = useState(30);
//   const [extended, setExtended] = useState(false);
//   const [recordingCompleted, setRecordingCompleted] = useState(false);
//   const [base64Audio, setBase64Audio] = useState('');
//   const [initialCountdown, setInitialCountdown] = useState(0);
//   const [sliderStops, setSliderStops] = useState(false);
//   const [soundbars, setSoundbars] = useState([]);
//   const [intervalId, setIntervalId] = useState(null);
//   const [endTimerCountdown, setEndTimerCountdown] = useState(60); // 1 minute timer
//   const [alertModal, setAlertModal] = useState({
//     isVisible: false,
//     message: '',
//     btn: false,
//   });
//   const sliderRef = useRef();
//   const countdownIntervalId = useRef(null);
//   const endTimerInterval = useRef(null);
//   const startTimeRef = useRef(Date.now());
//   const checkinoutData = useSelector(selectCheckInOutData);

//   const checkInstatus = useSelector(selectCheckInStatus);
//   const welfareSafetyAlertId = useSelector(welfareSafetyId);

//   const sosAlertData = useSelector(state => state.home.sosAlertData);

//   const fallAlertData = useSelector(state => state.home.fallAlertData);
//   const overSpeedAlertData = useSelector(
//     state => state.home.overSpeedAlertData,
//   );
//   const reduxRecording = useSelector(savedRecording);
//   const deviceStatusData = useSelector(deviceStatusDetail);
//   const welfareAlertData = useSelector(state => state.home.welfareAlertData);

//   const {fs} = ReactNativeBlobUtil;
//   const audioRecorderPlayer = useMemo(() => new AudioRecorderPlayer(), []);
//   const path = Platform.select({
//     ios: 'recording.m4a',
//     android: `${fs.dirs.CacheDir}/recording.mp3`,
//   });
//   const colors = [
//     'rgba(219, 0, 0, 1)',
//     'rgba(255, 153, 0, 1)',
//     'rgba(242, 220, 23, 1)',
//     'rgba(234, 218, 77, 1)',
//     'rgba(130, 194, 79, 1)',
//     'rgba(50, 164, 49, 1)',
//   ];
//   /**to greet employee */
//   let myDate = new Date();
//   let hours = myDate.getHours();
//   let greet;
//   if (hours < 12) {
//     greet = 'Good Morning';
//   } else if (hours >= 12 && hours < 17) {
//     greet = 'Good Afternoon';
//   } else if (hours >= 17 && hours <= 24) {
//     greet = 'Good Evening';
//   } else {
//     greet = 'Good Night';
//   }

//   let recordingTimer;
//   if (welfareAlertData.timerAudioSettiong === 1) {
//     recordingTimer = 25;
//   } else if (welfareAlertData.timerAudioSettiong === 2) {
//     recordingTimer = 30;
//   } else if (welfareAlertData.timerAudioSettiong === 3) {
//     recordingTimer = 60;
//   }

//   let fallAlertStarted = useRef(false);
//   setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100s
//   let recordingInterval = useRef(null);
//   // useNotification(navigation);
//   // TTs integration
//   useEffect(() => {
//     // Initialize TTS
//     Tts.getInitStatus().then(
//       () => {
//         // TTS is ready
//       },
//       _err => {
//         // TTS initialization error
//       },
//     );
//   }, []);

//   useEffect(() => {
//     if (
//       watchConnectionState === JSON.stringify('Discontected') ||
//       watchConnectionState.state === 4
//     ) {
//       Alert.alert('Your Watch is disconnected');
//     }
//   }, [watchConnectionState]);

//   useEffect(() => {
//     const subscription = accelerometer
//       .pipe(
//         map(alertOnShake),
//         filter(speed => speed > 30),
//       )
//       .subscribe(callSOSAlert);

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   const alertOnShake = ({x, y, z}) => {
//     const redAlertAcceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

//     return redAlertAcceleration; // Returning the acceleration value
//   };

//   const speakText = () => {
//     return new Promise((resolve, reject) => {
//       if (welfareAlertData.timerAudioVoiceOn === true) {
//         Tts.speak(welfareAlertData.timerAudioActivation, {
//           onDone: () => resolve(), // Resolve the promise when speech is done
//           onError: error => reject(error), // Reject the promise if there's an error
//         });
//       }
//     });
//   };
//   const callSOSAlert = speed => {
//     if (Platform.OS === 'ios') {
//       if (speed > 1) {
//       }
//     } else {
//       if (speed > 30) {
//         onCreateRedAlert(true);
//         raiseRedAlert(
//           dispatch,
//           user,
//           reduxLocation,
//           setIsRedAlert,
//           sosAlertData,
//           true,
//         );
//         // Handle your red alert logic here
//       }
//     }
//   };
//   useEffect(() => {
//     // SplashScreen.hide();
//     dispatch(getCheckInandOut());
//     dispatch(getSosAlert());
//     dispatch(getFallAlert());
//     dispatch(getOverspeedData());
//     dispatch(getWelfareAlertData());
//     dispatch(getGeoFenceData());
//     dispatch(getDeviceStatus());
//     const jobHoursBody = {
//       id: 7,
//     };
//     dispatch(getJobHours(jobHoursBody));
//     const profileBody = {
//       username: user.userDetails.emailId,
//     };
//     dispatch(getProfileDetail(profileBody));
//   }, []);
//   useEffect(() => {
//     if (deviceStatusData.enable === true) {
//       getDeviceDetailsMobile(dispatch, user, deviceStatusData);
//       // Call getDeviceDetailsMobile every 10 minutes
//       const intervalId = setInterval(() => {
//         getDeviceDetailsMobile(dispatch, user, deviceStatusData);
//       }, 10 * 60 * 1000); // 10 minutes in milliseconds

//       // Clean up function to clear the interval when component unmounts
//       return () => clearInterval(intervalId);
//     }

//     // Dispatch action to set redAlertCanceled to false when navigating back to this screen
//     const unsubscribe = navigation.addListener('focus', () => {
//       dispatch(setRedAlertCanceled(false));
//     });
//     return () => {
//       unsubscribe;
//     };
//   }, [
//     deviceStatusData.enable,
//     dispatch,
//     user,
//     getDeviceDetailsMobile,
//     watchConnectionState,
//     navigation,
//   ]);
//   useEffect(() => {
//     // Start the interval when the component mounts
//     const id = setInterval(() => {
//       const endTime = moment(jobHours.businessHourEnd, 'hh:mm:ss A');
//       if (isArrived && moment().isAfter(endTime)) {
//         // if(checkinoutData?.)
//         if (checkinoutData?.deviceAudioVioceOn === true) {
//           Tts.speak(checkinoutData?.lateCheckOutOnAudio);
//         }
//         if (checkinoutData.popUpMWMOn === true) {
//           setAlertModal({
//             isVisible: true,
//             message: checkinoutData?.lateCheckOutOnScreenMassage,
//             btn: true,
//           });
//         }
//       }
//     }, 5 * 60 * 1000); // 5 minutes in milliseconds

//     // Save the interval ID to clear it later
//     setIntervalId(id);

//     // Clean up function to clear the interval when the component unmounts
//     return () => clearInterval(id);
//   }, [isArrived, jobHours.businessHourEnd, checkinoutData]);
//   useEffect(() => {
//     onRenderApiCalls(dispatch, user);
//     locationGps();
//     // Initialize SignalR connection when the component mounts
//     SignalR.signalRInit(dispatch, user);
//     SignalRPlatformSettings.signalRPlatformSettingsInit(dispatch, user);

//     // Subscribe to network state changes
//     const unsubscribe = addEventListener(state => {
//       setIsConnected(state.isConnected);
//       setTimeout(() => {
//         setIsConnected(true);
//       }, 2000);
//     });

//     const subscription = accelerometer
//       .pipe(
//         map(handleAcceleration),
//         filter(speed =>
//           speed > fallAlertData ? JSON.parse(fallAlertData.fallCm) : '',
//         ),
//       )
//       .subscribe(handleFallAlert);

//     return () => {
//       unsubscribe();
//       subscription.unsubscribe();
//       SignalR.onSend();
//       SignalR.logoutUser();
//       SignalRPlatformSettings.logoutUser();
//     };
//   }, [checkInstatus]);
//   // useEFfect for notifications and timer
//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       const {title, body} = remoteMessage.notification || {};

//       await onDisplayNotification(title, body);
//     });
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           openNotificationScreen(navigation, dispatch, remoteMessage);
//         }
//       });
//     messaging().onNotificationOpenedApp(remoteMessage => {
//       if (remoteMessage?.notification) {
//         openNotificationScreen(
//           navigation,
//           dispatch,
//           remoteMessage.notification,
//         );
//       }
//     });
//     foreGroundNotificationEventHandle(
//       notifee,
//       messaging,
//       EventType,
//       dispatch,
//       navigation,
//     );
//     return unsubscribe;
//   }, []);
//   useEffect(() => {
//     const updateTime = () => {
//       const elapsed = Date.now() - startTimeRef.current;
//       const remainingSeconds = Math.max(
//         initialCountdown - Math.floor(elapsed / 1000),
//         0,
//       );

//       setCountdown(remainingSeconds);
//       if (remainingSeconds === 0) {
//         setIsActive(false);
//         sliderRef.current._setCurrentValue(0);
//         clearInterval(countdownIntervalId.current);
//         setCountdown(0);
//         setIsWelfareAlert(true);
//         setCountdownStart(false);
//         setExtended(false);
//         setSliderStops(false);
//         startEndTimerInterval();
//         welfareAlertData.audioOn === true
//           ? Tts.speak(welfareAlertData.end_TimerAudio)
//           : '';
//       }
//       if (remainingSeconds === 5) {
//         Vibration.vibrate([
//           1000, 500, 1000, 500, 1000, 500, 1000, 500, 1000, 500,
//         ]);
//       }
//     };

//     if (isActive || (isActive && extended)) {
//       clearInterval(countdownIntervalId.current);
//       startTimeRef.current = Date.now();
//       countdownIntervalId.current = setInterval(updateTime, 1000);
//       return () => {
//         clearInterval(countdownIntervalId.current);
//       }; // Cleanup interval on component unmount
//     } else {
//       clearInterval(countdownIntervalId.current);
//     }
//   }, [isActive, extended, initialCountdown]);
//   const startEndTimerInterval = () => {
//     // Clear any existing interval before starting a new one
//     clearInterval(endTimerInterval.current);

//     // Start a new interval
//     endTimerInterval.current = setInterval(() => {
//       setEndTimerCountdown(prevCountdown => {
//         const newCountdown = prevCountdown - 1;
//         if (newCountdown === 0) {
//           clearInterval(endTimerInterval.current); // Clear the interval when countdown reaches 0
//           setIsWelfareAlert(false);
//           Vibration.vibrate(1000);
//         }
//         return Math.max(0, newCountdown);
//       });
//     }, 1000);
//   };
//   useEffect(() => {
//     let audioBase64Data = '';

//     const audioTobase64 = async () => {
//       if (reduxRecording) {
//         const fileBinaryData = await RNFS.readFile(reduxRecording, 'base64');
//         // Set the base64 data
//         audioBase64Data = fileBinaryData;
//         if (endTimerCountdown === 0) {
//           setEndTimerCountdown(60);
//           setIsWelfareAlert(false);
//           onCreateRedAlert(true);
//           raiseRedAlert(
//             dispatch,
//             user,
//             reduxLocation,
//             setIsRedAlert,
//             sosAlertData,
//             true,
//             audioBase64Data,
//           );
//           // welfareAlertData.audioOn === true?Tts.speak(welfareAlertdata.)
//         }
//       }
//     };

//     audioTobase64();
//   }, [reduxRecording, endTimerCountdown, extended]);
//   useEffect(() => {
//     if (isAlertVisible) {
//       getDeviceDetailsMobile(dispatch, user, isAlertVisible);

//       const actionBody = {
//         actionType: 6,
//         userId: user?.userId,
//         longitude: reduxLocation.longitude,
//         latitude: reduxLocation.latitude,
//         genertatedOn: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
//       };
//       dispatch(checkMobileAction(actionBody));
//     }
//     setTimeout(() => {
//       setIsAlertVisible(false);
//     }, 5000);
//   }, [isAlertVisible]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     const body = {
//       emailId: user?.userDetails?.emailId,
//     };
//     dispatch(getAllJobs(body));
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);

//   const handleFallAlert = () => {
//     if (!fallAlertStarted.current) {
//       fallAlertData.popUpMWMOn === true && setIsFallAlert(true);
//       fallAlertData.fallDeviceAudioOnActivation === true &&
//         Tts.speak(fallAlertData.fallDeviceAudioOnActivation);
//       setFallAlertCountdown(JSON.parse(fallAlertData.fallSec));
//       const intervalId = setInterval(() => {
//         setFallAlertCountdown(prevSeconds => {
//           if (prevSeconds === 0) {
//             RNBeep.PlaySysSound(RNBeep.AndroidSoundIDs.TONE_CDMA_ABBR_ALERT);
//             Vibration.vibrate(1000);
//             clearInterval(intervalId);
//             raiseFallAlert(
//               dispatch,
//               user,
//               reduxLocation,
//               setFallAlertCountdown,
//               setIsFallAlert,
//             );
//             setFallIntervalId(null); // Reset interval ID when countdown reaches zero
//             fallAlertStarted.current = false;
//           }
//           return Math.max(prevSeconds - 1, 0); // Ensure the countdown doesn't go below zero
//         });
//       }, 1000);
//       setFallIntervalId(intervalId); // Set the interval ID to state
//       fallAlertStarted.current = true;
//     }
//   };

//   const handleAcceleration = ({x, y, z}) => {
//     const speed = x + y + z;
//     const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
//     if (overSpeedAlertData.isOverspeed) {
//       switch (overSpeedAlertData.speedAlert) {
//         case 1:
//           if (acceleration > 50) {
//             setOverSpeedShow(true);
//           }
//           break;
//         case 2:
//           if (acceleration > 60) {
//             setOverSpeedShow(true);
//           }
//           break;
//         case 3:
//           if (acceleration > 80) {
//             setOverSpeedShow(true);
//           }
//           break;
//         case 4:
//           if (acceleration > 90) {
//             setOverSpeedShow(true);
//           }
//           break;
//         case 5:
//           if (acceleration > 100) {
//             setOverSpeedShow(true);
//           }
//           break;
//         case 6:
//           if (acceleration > 110) {
//             setOverSpeedShow(true);
//           }
//           break;
//         case 7:
//           if (acceleration > 115) {
//             setOverSpeedShow(true);
//           }
//           break;
//         default:
//           setOverSpeedShow(false);
//       }
//     }
//     if (fallAlertData.isFallAlertEnabled) {
//       if (speed > JSON.parse(fallAlertData.fallCm)) {
//         handleFallAlert();
//       }
//     }
//   };

//   const handleFallIntervalCancel = () => {
//     // Clear the interval when the button is clicked
//     setIsFallAlert(false); // Set isFallAlert to false directly
//     setFallAlertCountdown(JSON.parse(fallAlertData.fallSec)); // Reset countdown to its initial value
//     if (fallIntervalId) {
//       clearInterval(fallIntervalId); // Clear the interval
//       setFallIntervalId(null); // Reset the interval ID
//     }
//     fallAlertStarted.current = false; // Reset the flag indicating the alert is started
//   };

//   const convertAudioToBase64 = async url => {
//     try {
//       let fileData = '';
//       if (url) {
//         const filePath = url;
//         // Read the audio file as binary data
//         const fileBinaryData = await RNFS.readFile(filePath, 'base64');
//         // Convert binary data to Base64
//         fileData = fileBinaryData;
//       } else {
//       }
//       callWelfareSafetyAlert(fileData);
//       setBase64Audio(fileData);
//     } catch (error) {}
//   };

//   const handleValueChange = value => {
//     setSliderStops(false);
//     setSliderValue(value);
//     const countdownValues = [
//       60, 900, 1800, 2700, 3600, 4500, 5400, 6300, 7200, 10800,
//     ];
//     const step = Math.round(value * (countdownValues.length - 1));
//     const selectedCountdown = countdownValues[step]; // Get the selected countdown value
//     setCountdown(selectedCountdown); // Set the countdown value
//     setInitialCountdown(selectedCountdown);
//   };

//   const handleSlidingComplete = async () => {
//     if (welfareAlertData.enable === true) {
//       setSliderStops(true);
//       if (!extended) {
//         if (welfareAlertData.popUpMWMOn === true) {
//           setAlertModal({
//             isVisible: true,
//             message: welfareAlertData.timerScreenMassages1,
//             btn: false,
//           });
//           setTimeout(() => {
//             setAlertModal({
//               isVisible: false,
//               message: welfareAlertData.timerScreenMassages1,
//               btn: false,
//             });
//           }, 2000);
//         }
//         setIsRecording(true);
//         await speakText();
//       } else if (extended) {
//         setIsActive(true);
//         if (base64Audio) {
//           callWelfareSafetyAlert(base64Audio);
//         }
//       }
//     } else {
//       sliderRef.current._setCurrentValue(0);
//       setSliderStops(false);
//       setCountdown(0);
//     }
//   };

//   const handleStartRecordingPress = async (value, isStopRecording) => {
//     const permissionsGranted = await recordingPermission(); // Check permissions
//     if (!permissionsGranted) {
//       return;
//     }
//     try {
//       if (welfareAlertData.audioRecordingOn === true) {
//         startRecording();
//         setRecordingStarted(true);
//         setThirtySeconds(recordingTimer);
//         thirtySecondsTimer();
//       } else {
//         setAlertModal({
//           isVisible: true,
//           message: 'Audio Recording is not enabled by admin',
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error); // Log any errors that occur
//       // Handle errors here
//     }
//   };

//   const startRecording = useCallback(async () => {
//     Vibration.vibrate(500);
//     setIsRecording(true);
//     setSoundbars([]);
//     audioRecorderPlayer.setSubscriptionDuration(0.4);
//     await audioRecorderPlayer.startRecorder(
//       path,
//       {
//         AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.max,
//         AVNumberOfChannelsKeyIOS: 2,
//         AVFormatIDKeyIOS: AVEncodingOption.aac,
//       },
//       true,
//     );

//     audioRecorderPlayer.addRecordBackListener(e => {
//       setSoundbars(state => [...state, e.currentMetering]);
//     });
//   }, [audioRecorderPlayer]);

//   const stopRecorder = useCallback(async () => {
//     setRecordingStarted(false);
//     setIsRecording(false);
//     audioRecorderPlayer.removeRecordBackListener();
//     audioRecorderPlayer.removePlayBackListener();
//     audioRecorderPlayer.stopRecorder().then(res => {
//       Vibration.vibrate(500);
//       convertAudioToBase64(res);
//       dispatch(stopRecording(res));
//     });
//   }, [audioRecorderPlayer]);

//   const thirtySecondsTimer = async () => {
//     // Set the start time when starting the timer
//     startTimeRef.current = Date.now();
//     recordingInterval.current = setInterval(() => {
//       setThirtySeconds(prevSeconds => {
//         if (prevSeconds === 0) {
//           clearInterval(recordingInterval.current);
//           stopRecorder(); //
//           setThirtySeconds(recordingTimer);
//           setIsActive(true);
//           setRecordingCompleted(true);
//           setTimeout(() => {
//             setRecordingCompleted(false);
//           }, 2000);
//           welfareAlertData.popUpMWMOn === true
//             ? setAlertModal({
//                 isVisible: true,
//                 message: welfareAlertData.timerScreenMassages2,
//                 btn: false,
//               })
//             : '';
//           setTimeout(() => {
//             setAlertModal({
//               isVisible: false,
//               message: welfareAlertData.timerScreenMassages2,
//               btn: false,
//             });
//           }, 2000);
//         } else if (recordingCompleted || prevSeconds === 0) {
//           setRecordingCompleted(true);
//           setTimeout(() => {
//             setRecordingCompleted(false);
//           }, 2000);
//         } else if (prevSeconds < 0) {
//           setThirtySeconds(recordingTimer);
//           clearInterval(recordingInterval.current);
//           // Handle the case where countdown goes below zero
//         }
//         return Math.max(prevSeconds - 1, 0);
//       });
//     }, 1000);

//     return () => clearInterval(recordingInterval.current);
//   };

//   const onStopRecording = () => {
//     clearInterval(recordingInterval.current);
//     setIsActive(true);
//     stopRecorder();
//     setThirtySeconds(0);
//     welfareAlertData.popUpMWMOn === true
//       ? setAlertModal({
//           isVisible: true,
//           message: welfareAlertData.timerScreenMassages2,
//           btn: false,
//         })
//       : '';
//     setTimeout(() => {
//       setAlertModal({
//         isVisible: false,
//         message: welfareAlertData.timerScreenMassages2,
//         btn: false,
//       });
//     }, 2000);
//   };

//   const onClickDone = () => {
//     setIsRecording(false);
//     setSliderStops(false);
//     setCountdown(0);
//     sliderRef.current._setCurrentValue(0);
//   };

//   const callWelfareSafetyAlert = base64Url => {
//     const hours = Math.floor(countdown / 3600);
//     const remainingSeconds = countdown % 3600;
//     const minutes = Math.floor(remainingSeconds / 60);

//     // Format the hours and minutes into the desired string format
//     const formattedTime = `${hours} hr ${minutes} min`;

//     const body = {
//       id: 0,
//       welfareSafteyTimer: formattedTime,
//       voiceRecording: base64Url,
//       longitude: reduxLocation.longitude,
//       latitude: reduxLocation.latitude,
//       genertatedOn: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
//       createdBy: user?.userId,
//       isAlertActive: true,
//     };
//     const actiondata = {
//       actiontype: 7,
//       userId: user?.userId,
//       longitude: reduxLocation.longitude,
//       latitude: reduxLocation.latitude,
//       genertatedOn: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
//       audioFile: base64Url,
//     };

//     dispatch(checkMobileAction(actiondata));
//     dispatch(welfareAlert(body));
//   };
//   const formatTimer = seconds => {
//     const formattedDuration = moment
//       .utc(moment.duration(seconds, 'seconds').asMilliseconds())
//       .format('HH:mm:ss');
//     return formattedDuration;
//   };

//   const onCancelTimer = () => {
//     setIsWelfareAlert(true);
//     setSliderStops(false);
//   };
//   const onCancelWelfareAlert = value => {
//     welfareAlertData.audioOn === true
//       ? Tts.speak(welfareAlertData.timerCancelationAudio)
//       : '';
//     Vibration.vibrate(1000);
//     setSliderStops(false);
//     sliderRef.current._setCurrentValue(0);
//     setExtended(false);
//     setCountdown(0);
//     setIsActive(false);
//     setIsWelfareAlert(false);
//     setIsWelfareCancel(true);
//     setCountdownStart(false);
//     setTimeout(() => {
//       setIsWelfareCancel(false);
//     }, 2000);

//     const hours = Math.floor(countdown / 3600);
//     const remainingSeconds = countdown % 3600;
//     const minutes = Math.floor(remainingSeconds / 60);

//     // Format the hours and minutes into the desired string format
//     const formattedTime = `${hours} hr ${minutes} min`;
//     const cancelWelfareAlertBody = {
//       walfareId: welfareSafetyAlertId,
//       welfareCancelationTimer: formattedTime,
//     };

//     dispatch(welfareAlertCancel(cancelWelfareAlertBody));

//     // Reset end timer countdown to 5
//     setEndTimerCountdown(60);

//     // Clear the end timer interval if it's running
//     clearInterval(endTimerInterval.current);
//   };

//   const onClickCheckIn = () => {
//     Alert.alert('Check in is not enable by Admin ');
//   };
//   /**api for check in and out */
//   const onCheckInOut = async () => {
//     try {
//       // Prepare the API request body
//       const body = {
//         checkInCheckoutId: 0,
//         userId: user?.userId,
//         isArrived: !isArrived, // Toggle the value
//         checkoutDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
//         checkInTime: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
//         businessHourStart: jobHours.businessHourStart,
//         businessHourEnd: jobHours.businessHourEnd,
//         staffName: user?.userDetails?.emplyeeName,
//       };
//       const actionbody = {
//         actionType: isArrived ? 2 : 1,
//         userId: user?.userId,
//         genertatedOn: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
//         longitude:
//           checkinoutData?.autoGeoLocationYes === true
//             ? reduxLocation.longitude
//             : 0,
//         latitude:
//           checkinoutData?.autoGeoLocationYes === true
//             ? reduxLocation.latitude
//             : 0,
//       };

//       // Dispatch the API call (uncomment this when ready to dispatch)
//       dispatch(checkInOut(body)).then(response =>
//         setIsArrived(prevState => !prevState),
//       );
//       dispatch(checkMobileAction(actionbody));
//       // Convert business hours to moment objects
//       const startTime = moment(jobHours.businessHourStart, 'hh:mm:ss A');
//       const endTime = moment(jobHours.businessHourEnd, 'hh:mm:ss A');

//       const checkInTime = moment(body.checkInTime);
//       const checkOutTime = moment(body.checkoutDate);
//       if (checkInTime.isSame(startTime)) {
//         Vibration.vibrate(500);
//         setAlertModal({
//           isVisible: true,
//           message: checkinoutData?.timeCheckInOnScreenMassage,
//         });
//       } else if (!isArrived && checkInTime.isBefore(startTime)) {
//         Vibration.vibrate(500);
//         setAlertModal({
//           isVisible: true,
//           message: checkinoutData?.timeCheckInOnScreenMassage,
//         });
//       } else if (checkInTime.isAfter(startTime) && !isArrived) {
//         Vibration.vibrate(500);
//         checkinoutData?.deviceAudioVioceOn === true
//           ? Tts.speak(checkinoutData?.lateCheckInAudio)
//           : '';
//         checkinoutData.popUpMWMOn === true
//           ? setAlertModal({
//               isVisible: true,
//               message: checkinoutData?.lateCheckInOnScreenMassage,
//             })
//           : '';
//       } else if (isArrived && checkOutTime.isAfter(endTime)) {
//         Vibration.vibrate([1000, 500, 1000, 500]);
//         // checkinoutData?.deviceAudioVioceOn === true
//         //   ? Tts.speak(checkinoutData?.lateCheckOutOnAudio)
//         //   : '',
//         checkinoutData.popUpMWMOn === true
//           ? setAlertModal({
//               isVisible: true,
//               message: checkinoutData?.onCheckOut,
//             })
//           : ';';
//       } else if (isArrived && checkOutTime.isSame(endTime)) {
//         Vibration.vibrate([1000, 500, 1000, 500]);
//         checkinoutData.popUpMWMOn === true
//           ? setAlertModal({
//               isVisible: true,
//               message: checkinoutData?.onCheckOut,
//             })
//           : '';
//       }
//     } catch (error) {}
//   };

//   const safetyAlert = () => {
//     setIsAlertVisible(true);
//   };

//   /**activate team alert */
//   const handleTeamAlert = value => {
//     dispatch(setYellowAlertSwipe(value));
//     // dispatch(setYellowAlertSwipe(0));
//   };
//   /**request to send safety check */
//   const onExtendTimer = () => {
//     welfareAlertData.audioOn === true
//       ? Tts.speak(welfareAlertData.timerExtensionAudio)
//       : '';
//     setSliderStops(false);
//     setCountdown(0);
//     setIsActive(false);
//     setIsWelfareAlert(false);
//     setCountdownStart(false);
//     setIsWelfareAlert(false);
//     setExtended(true);
//     handleValueChange();
//     const pattern = [500, 500, 500];
//     Vibration.vibrate(pattern, true);
//     setTimeout(() => {
//       return Vibration.cancel();
//     }, 3000);
//     // Reset end timer countdown to 5
//     setEndTimerCountdown(60);
//     // Clear the end timer interval if it's running
//     clearInterval(endTimerInterval.current);
//   };

//   /** phone will vibarate on activating red alert */
//   const onCreateRedAlert = val => {
//     if (sosAlertData.sosEnable) {
//       Vibration.vibrate(500);
//       dispatch(setRedAlertSwipe(val));
//     } else if (sosAlertData.autoGeoLocation === false) {
//       alert('Location gps can not be accepted');
//       dispatch(setRedAlertSwipe(val));
//       Vibration.vibrate(500);
//     } else if (sosAlertData.sosEnable === false) {
//       setAlertModal({
//         isVisible: true,
//         message: 'SOS is not enabled by admin',
//       });
//     }
//   };
//   const startToggleRedAlert = () => {
//     if (sosAlertData.sosEnable === false) {
//       setAlertModal({
//         isVisible: true,
//         message: 'SOS is not enabled by admin',
//       });
//     }
//   };
//   // To chek is location enabled or not
//   const locationGps = async () => {
//     const isLocationEnabled = await DeviceInfo.isLocationEnabled();
//     const actionBody = {
//       actionType: isLocationEnabled ? 4 : 3,
//       genertatedOn: moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
//       userId: user?.userId,
//       latitude: reduxLocation.latitude,
//       longitude: reduxLocation.longitude,
//     };

//     dispatch(checkMobileAction(actionBody));
//     // Handle the location change event here
//   };

//   const handleImgPress = () => {
//     // alert('Welfare Alert is not enabled by admin');
//     setAlertModal({
//       isVisible: true,
//       message: 'Welfare timer is not enabled',
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <CustomHeader
//         leftImage={Images.bell}
//         leftButtonPress={() => navigateToNotification(navigation)}
//         rightImage={{uri: profileData?.profilePhotoPath}}
//         customImgStyle={styles.customHeaderImg}
//         rightButtonPress={() => navigateToProfile(navigation)}
//         title={`Hi, ${user?.userDetails?.firstName}`}
//         subTitle={greet}
//         containerFlex={0.2}
//       />
//       <View style={styles.cardContainer}>
//         {checkinoutData?.enable === true ? (
//           <TouchableOpacity
//             style={[
//               styles.circle,
//               {
//                 backgroundColor: isArrived ? COLOR.ORANGE : COLOR.GREEN,
//                 borderColor: isArrived ? COLOR.ORANGE : COLOR.GREEN,
//               },
//             ]}
//             onPress={() =>
//               checkinoutData?.enable ? onCheckInOut() : onClickCheckIn()
//             }>
//             <Text style={styles.circleText}>Check</Text>
//             <Text style={styles.circleText}>{isArrived ? 'Out' : 'In'}</Text>
//           </TouchableOpacity>
//         ) : null}

//         <ScrollView
//           style={styles.content}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }>
//           <CustomList
//             customCard={styles.jobCardStyle}
//             isImage={true}
//             cardImage={Images.jobSchedule}
//             title={`You Have ${jobCount}${jobCount ? ' New' : ''} ${
//               jobCount === 1 ? 'Job' : 'Jobs'
//             }`}
//             description={strings.gotoJobs}
//             customTitleStyle={styles.jobTitleStyle}
//             customDescriptionStyle={styles.jobDescriptionStyle}
//             customImageStyle={{
//               height: verticalScale(30),
//             }}
//             onListPress={() =>
//               navigation.navigate('Jobs', {params: {showJobs: true}})
//             }
//           />
//           <View style={styles.welfareSafetyViewOuter}>
//             {welfareAlertData.enable === true ? (
//               <>
//                 <View style={styles.welfareSafetyView}>
//                   <CustomText
//                     title={
//                       countdown
//                         ? strings.cancelAlert
//                         : extended
//                         ? strings.extendWelfareSafety
//                         : strings.activateWelfareSafety
//                     }
//                     isTouchable={countdown ? true : extended ? false : false}
//                     onTextPress={countdown || extended ? onCancelTimer : ''}
//                     customTextStyle={[
//                       styles.alertTitleStyle,
//                       // {color: countdown ? COLOR.RED : COLOR.SECONDARY},
//                     ]}
//                   />
//                   <Slider
//                     ref={sliderRef}
//                     style={{
//                       marginVertical: verticalScale(10),
//                       marginHorizontal: horizontalScale(10),
//                     }}
//                     value={sliderValue}
//                     minimumValue={0}
//                     maximumValue={1}
//                     trackStyle={styles.sliderTrackStyle}
//                     maximumTrackTintColor={COLOR.SECONDARY}
//                     minimumTrackTintColor={COLOR.PRIMARY_BLUE}
//                     thumbImage={Images.welfareClock}
//                     thumbStyle={styles.sliderThumbStyle}
//                     thumbTintColor={COLOR.SECONDARY}
//                     onSlidingComplete={handleSlidingComplete}
//                     onSlidingStart={() =>
//                       welfareAlertData.enable === true ? {} : handleImgPress()
//                     }
//                     onValueChange={handleValueChange}
//                     customMinimumTrack={
//                       <LinearGradient
//                         colors={colors}
//                         start={{x: 0, y: 0}}
//                         end={{x: 1, y: 1}}
//                         style={styles.gradient}
//                       />
//                     }
//                     customThumb={<Image source={Images.welfareClock} />}
//                     disabled={sliderStops}
//                   />

//                   {countdown ? (
//                     <View
//                       style={{
//                         flex: 1,
//                         flexDirection: 'row',
//                         justifyContent: 'space-evenly',
//                       }}>
//                       <CustomText
//                         title={countdownStart ? 'Time Left...' : 'Time'}
//                         customTextStyle={styles.timeText}
//                       />
//                       <CustomText
//                         title={countdown ? formatTimer(countdown) : '00:00:00'}
//                         customTextStyle={styles.timerText}
//                       />
//                     </View>
//                   ) : null}
//                 </View>
//               </>
//             ) : null}
//           </View>

//           <CustomList
//             customCard={styles.safetyCardStyle}
//             isImage={true}
//             cardImage={Images.safetyCheck}
//             title={strings.safetyCheck}
//             customTitleStyle={styles.safetyTitleStyle}
//             customDescriptionStyle={styles.safetyDescriptionStyle}
//             onListPress={() => safetyAlert()}
//           />
//           <SwipeButton
//             customView={styles.teamAlertSlide}
//             gestureImg={Images.team}
//             customBtnStyle={styles.teamAlertBtn}
//             sosView={{backgroundColor: COLOR.SAFETY_ORANGE}}
//             openTeamAlertModal={() =>
//               raiseTeamAlert(
//                 dispatch,
//                 user,
//                 reduxLocation,
//                 job,
//                 setIsTeamAlert,
//                 isTeamAlert,
//               )
//             }
//             toggleText={yellowAlertSwipeText}
//             toggleState={yellowAlertSwipeState}
//             onToggle={handleTeamAlert}
//             navigateScreen={() => navigatetoVerifyPinAlert(navigation)}
//             swiperValue={0}
//             sosAlertData={true}
//           />
//           {sosAlertData.sosEnable === true ? (
//             <SwipeButton
//               customView={styles.redAlertSlide}
//               gestureImg={Images.sosImage}
//               customBtnStyle={styles.redAlertBtn}
//               openRedAlertModal={() =>
//                 sosAlertData.sosEnable
//                   ? raiseRedAlert(
//                       dispatch,
//                       user,
//                       sosAlertData.autoGeoLocation === true ? reduxLocation : 0,
//                       setIsRedAlert,
//                       sosAlertData,
//                     )
//                   : {}
//               }
//               navigateScreen={() => navigatetoVerifyPin(navigation)}
//               toggleText={redAlertSwipeText}
//               toggleState={
//                 sosAlertData.sosEnable === true ? redAlertSwipeState : 0
//               }
//               onToggle={onCreateRedAlert}
//               startToggle={startToggleRedAlert}
//               swiperValue={sosAlertData.sosEnable === true ? swiperValue : 0}
//               sosAlertData={sosAlertData.sosEnable}
//             />
//           ) : null}
//         </ScrollView>
//       </View>

//       {isAlertVisible && ( //alert which will show data of phone when safety check will be sent
//         <AlertModal
//           isAlertvisible={isAlertVisible}
//           transparent={true}
//           animationType={'fade'}
//         />
//       )}
//       {isWelfareAlert && ( //modal will open on click of onWelfareSAfety timer()
//         <CustomModal
//           isVisible={isWelfareAlert}
//           isImage={Images.eventTimer}
//           isanotherImage={Images}
//           btn1Title={strings.cancel}
//           btn2Title={strings.extend}
//           modalTitle={strings.areYouOk}
//           modalSubTitle={
//             countdown === 0 ? formatTimer(endTimerCountdown) : '00:00:00'
//           }
//           subTitleCustomStyle={{fontSize: FONTSIZE.SEMI_MEDIUM2}}
//           titleCustomStyle={{marginVertical: verticalScale(10)}}
//           isTwoBtns={true}
//           onBtn1Press={() => {
//             onCancelWelfareAlert();
//           }}
//           onBtn2Press={() => {
//             onExtendTimer();
//           }}
//         />
//       )}
//       {isConnected ? null : (
//         //modal will show not internet connection
//         <CustomModal
//           isVisible={!isConnected}
//           modalTitle={'Mobile Network disconnected'}
//         />
//       )}

//       {isFallAlert && ( //modal will open on activating team alert
//         <CustomModal
//           isVisible={isFallAlert}
//           isImage={Images.fallAlert}
//           modalTitle={strings.fallDetected}
//           modalDescription={`${fallAlertData.fallOnScreenMessage} ${formatTimer(
//             fallAlertCountdown,
//           )}`}
//           btn1Title={strings.imOk}
//           customBtn1Style={styles.teamModalBtn}
//           onBtn1Press={() => {
//             handleFallIntervalCancel();
//           }}
//           isBtn={true}
//         />
//       )}

//       {overSpeedShow && ( //modal will open on activating team alert
//         <CustomModal
//           isVisible={overSpeedShow}
//           isImage={Images.overSpeed}
//           modalTitle={overSpeedAlertData.overspeedMsg}
//           btn1Title={'Ok'}
//           customBtn1Style={styles.teamModalBtn}
//           onBtn1Press={() => setOverSpeedShow(false)}
//           isBtn={true}
//         />
//       )}

//       {isTeamAlert && ( //modal will open on activating team alert
//         <CustomModal
//           isVisible={isTeamAlert}
//           isImage={Images.team}
//           modalTitle={strings.teamAlerted}
//           modalDescription={strings.waitForResponse}
//           btn1Title={strings.cancel}
//           customBtn1Style={styles.teamModalBtn}
//           onBtn1Press={() => setIsTeamAlert(!isTeamAlert)}
//           isBtn={true}
//         />
//       )}
//       {isRedAlert && ( //need to customise this as per figma
//         <CustomModal
//           isVisible={isRedAlert}
//           modalTitle={strings.sos}
//           modalDescription={sosAlertData.sosOnScreenMessage}
//           // btn1Title={strings.ok}
//           // customBtn1Style={styles.sosAlertBtn}
//           // onBtn1Press={() => {
//           //   setIsRedAlert(false);
//           // }}
//           // isBtn={true}
//         />
//       )}
//       {isWelfareCancel && ( //need to customise this as per figma
//         <CustomModal
//           isVisible={isWelfareCancel}
//           modalTitle={strings.welfareCancelAlert}
//           titleCustomStyle={{fontSize: FONTSIZE.MEDIUM}}
//         />
//       )}
//       {/* {alertSent && (
//         <CustomModal
//           isVisible={alertSent}
//           isImage={Images.warning}
//           modalTitle={strings.welfareAlertSent}
//           isBtn={true}
//           btn1Title={strings.ok}
//           customBtn1Style={styles.sentAlertBtn}
//           // onBtn1Press={() => onAlertSent()}
//         />
//       )} */}
//       {isRecording && (
//         <CustomModal
//           isvisible={isRecording}
//           isImage={Images.warning}
//           recordingStarted={recordingStarted}
//           isAnotherImage={
//             recordingStarted ? Images.recordingMic : Images.recorderMic
//           }
//           bars={soundbars}
//           modalImageStyle={{
//             height: verticalScale(40),
//             width: horizontalScale(40),
//           }}
//           anotherImgStyle={[
//             styles.anotherImgStyle,
//             {
//               height: moderateScale(100),
//               width: moderateScale(100),
//               borderRadius: moderateScale(50),
//               backgroundColor: 'rgba(144, 238, 144, 0.5)',
//             },
//           ]}
//           hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
//           onAnotherImgPress={() =>
//             welfareAlertData.enable
//               ? handleStartRecordingPress()
//               : handleImgPress()
//           }
//           anotherDescription={
//             recordingStarted ? strings.timeLeft : strings.holdToRecord
//           }
//           descriptionTimer={recordingStarted ? formatTimer(thirtySeconds) : ''}
//           customModalContainer={{width: '90%'}}
//           // modalTitle={strings.welfareTimer}
//           modalDescription={strings.recordForJob}
//           isBtn={true}
//           btn1Title={recordingStarted ? 'Stop Recording' : 'Close'}
//           onBtn1Press={() => {
//             recordingStarted ? onStopRecording() : onClickDone();
//           }}
//         />
//       )}

//       {/* {recordingCompleted && (
//         <CustomModal
//           isVisible={recordingCompleted}
//           modalTitle={strings.recordingCompletedTimerCommence}
//           // modalTitle={welfareAlertData.timerScreenMassages1}
//           titleCustomStyle={{fontSize: FONTSIZE.SEMI_MEDIUM2}}
//         />
//       )} */}

//       <CustomModal
//         isVisible={alertModal.isVisible}
//         modalTitle={alertModal.message}
//         titleCustomStyle={{fontSize: FONTSIZE.MEDIUM}}
//         isBtn={alertModal.btn}
//         btn1Title={strings.ok}
//         customBtn1Style={styles.alertButton}
//         onBtn1Press={() => {
//           setAlertModal({
//             isVisible: false,
//             message: '',
//           });
//         }}
//       />
//     </View>
//   );
// };

// export default Home;
import React, { useCallback, useRef, useState } from 'react';
import { View, Text , TouchableOpacity, RefreshControl} from 'react-native';
import styles from './style';
import CustomHeader from '../../../components/common/CustomHeader';
import Images from '../../../assets/images';
// import { profileDetail, selectCurrentUser } from '../../../redux/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCheckInandOut,
  getProfileDetail,
  profileDetail,
  selectCheckInOutData,
  selectCurrentUser,
  selectedReduxLocation,
} from '../../../redux/slice/authSlice';
import { welfareSafetyId } from '../../../redux/slice/homeSlice';
import COLOR from '../../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {


 
  const user = useSelector(selectCurrentUser);



 
  const dispatch = useDispatch();
  const {
    redAlertSwipeState,
    redAlertSwipeText,
    yellowAlertSwipeState,
    yellowAlertSwipeText,
    swiperValue,
    watchConnectionState,
  } = useSelector(state => state.common);
  const reduxLocation = useSelector(selectedReduxLocation);
  // const profileData = useSelector(profileDetail);
  // Welfare Safety Alert
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isWelfareAlert, setIsWelfareAlert] = useState(false);
  const [isWelfareCancel, setIsWelfareCancel] = useState(false);
  // Team Alert
  const [isTeamAlert, setIsTeamAlert] = useState(false);
  const [isFallAlert, setIsFallAlert] = useState(false);
  const [isRedAlert, setIsRedAlert] = useState(false);
  const [isArrived, setIsArrived] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [fallAlertCountdown, setFallAlertCountdown] = useState(15);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isActive, setIsActive] = useState(false);
  const [fallIntervalId, setFallIntervalId] = useState(null);
  const [overSpeedShow, setOverSpeedShow] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [countdownStart, setCountdownStart] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [thirtySeconds, setThirtySeconds] = useState(30);
  const [extended, setExtended] = useState(false);
  const [recordingCompleted, setRecordingCompleted] = useState(false);
  const [base64Audio, setBase64Audio] = useState('');
  const [initialCountdown, setInitialCountdown] = useState(0);
  const [sliderStops, setSliderStops] = useState(false);
  const [soundbars, setSoundbars] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [endTimerCountdown, setEndTimerCountdown] = useState(60); // 1 minute timer
  const [alertModal, setAlertModal] = useState({
    isVisible: false,
    message: '',
    btn: false,
  });
  const sliderRef = useRef();
  const countdownIntervalId = useRef(null);
  const endTimerInterval = useRef(null);
  const startTimeRef = useRef(Date.now());
  const checkinoutData = useSelector(selectCheckInOutData);

 
  // const welfareSafetyAlertId = useSelector(welfareSafetyId)
  const welfareAlertData = useSelector(state => state.home.welfareAlertData);



  const profileData = useSelector(profileDetail);


  

    let myDate = new Date();
  let hours = myDate.getHours();
  let greet;
  if (hours < 12) {
    greet = 'Good Morning';
  } else if (hours >= 12 && hours < 17) {
    greet = 'Good Afternoon';
  } else if (hours >= 17 && hours <= 24) {
    greet = 'Good Evening';
  } else {
    greet = 'Good Night';
  }

    const onRefresh = useCallback(() => {
    setRefreshing(true);
    const body = {
      emailId: user?.userDetails?.emailId,
    };
    dispatch(getAllJobs(body));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


   /**request to send safety check */
  const onExtendTimer = () => {
    welfareAlertData.audioOn === true
      ? Tts.speak(welfareAlertData.timerExtensionAudio)
      : '';
    setSliderStops(false);
    setCountdown(0);
    setIsActive(false);
    setIsWelfareAlert(false);
    setCountdownStart(false);
    setIsWelfareAlert(false);
    setExtended(true);
    handleValueChange();
    const pattern = [500, 500, 500];
    Vibration.vibrate(pattern, true);
    setTimeout(() => {
      return Vibration.cancel();
    }, 3000);
    // Reset end timer countdown to 5
    setEndTimerCountdown(60);
    // Clear the end timer interval if it's running
    clearInterval(endTimerInterval.current);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.bell}
        leftButtonPress={() => navigateToNotification(navigation)}
        rightImage={{uri: profileData?.profilePhotoPath}}
        customImgStyle={styles.customHeaderImg}
        rightButtonPress={() => navigateToProfile(navigation)}
        title={`Hi, ${user?.userDetails?.firstName}`}
        subTitle={greet}
        containerFlex={0.2}
      />

<View style={styles.cardContainer}>
        {checkinoutData?.enable === true ? (
          <TouchableOpacity
            style={[
              styles.circle,
              {
                backgroundColor: isArrived ? COLOR.ORANGE : COLOR.GREEN,
                borderColor: isArrived ? COLOR.ORANGE : COLOR.GREEN,
              },
            ]}
            onPress={() =>
              checkinoutData?.enable ? onCheckInOut() : onClickCheckIn()
            }>
            <Text style={styles.circleText}>Check</Text>
            <Text style={styles.circleText}>{isArrived ? 'Out' : 'In'}</Text>
          </TouchableOpacity>
        ) : null}

        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
        
          <View style={styles.welfareSafetyViewOuter}>
            {welfareAlertData.enable === true ? (
              <>
                <View style={styles.welfareSafetyView}>
                  <CustomText
                    title={
                      countdown
                        ? strings.cancelAlert
                        : extended
                        ? strings.extendWelfareSafety
                        : strings.activateWelfareSafety
                    }
                    isTouchable={countdown ? true : extended ? false : false}
                    onTextPress={countdown || extended ? onCancelTimer : ''}
                    customTextStyle={[
                      styles.alertTitleStyle,
                      // {color: countdown ? COLOR.RED : COLOR.SECONDARY},
                    ]}
                  />
                  <Slider
                    ref={sliderRef}
                    style={{
                      marginVertical: verticalScale(10),
                      marginHorizontal: horizontalScale(10),
                    }}
                    value={sliderValue}
                    minimumValue={0}
                    maximumValue={1}
                    trackStyle={styles.sliderTrackStyle}
                    maximumTrackTintColor={COLOR.SECONDARY}
                    minimumTrackTintColor={COLOR.PRIMARY_BLUE}
                    thumbImage={Images.welfareClock}
                    thumbStyle={styles.sliderThumbStyle}
                    thumbTintColor={COLOR.SECONDARY}
                    onSlidingComplete={handleSlidingComplete}
                    onSlidingStart={() =>
                      welfareAlertData.enable === true ? {} : handleImgPress()
                    }
                    onValueChange={handleValueChange}
                    customMinimumTrack={
                      <LinearGradient
                        colors={colors}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.gradient}
                      />
                    }
                    customThumb={<Image source={Images.welfareClock} />}
                    disabled={sliderStops}
                  />

                  {countdown ? (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <CustomText
                        title={countdownStart ? 'Time Left...' : 'Time'}
                        customTextStyle={styles.timeText}
                      />
                      <CustomText
                        title={countdown ? formatTimer(countdown) : '00:00:00'}
                        customTextStyle={styles.timerText}
                      />
                    </View>
                  ) : null}
                </View>
              </>
            ) : null}
          </View>

          <CustomList
            customCard={styles.safetyCardStyle}
            isImage={true}
            cardImage={Images.safetyCheck}
            title={strings.safetyCheck}
            customTitleStyle={styles.safetyTitleStyle}
            customDescriptionStyle={styles.safetyDescriptionStyle}
            onListPress={() => safetyAlert()}
          />
          <SwipeButton
            customView={styles.teamAlertSlide}
            gestureImg={Images.team}
            customBtnStyle={styles.teamAlertBtn}
            sosView={{backgroundColor: COLOR.SAFETY_ORANGE}}
            openTeamAlertModal={() =>
              raiseTeamAlert(
                dispatch,
                user,
                reduxLocation,
                job,
                setIsTeamAlert,
                isTeamAlert,
              )
            }
            toggleText={yellowAlertSwipeText}
            toggleState={yellowAlertSwipeState}
            onToggle={handleTeamAlert}
            navigateScreen={() => navigatetoVerifyPinAlert(navigation)}
            swiperValue={0}
            sosAlertData={true}
          />
          {sosAlertData.sosEnable === true ? (
            <SwipeButton
              customView={styles.redAlertSlide}
              gestureImg={Images.sosImage}
              customBtnStyle={styles.redAlertBtn}
              openRedAlertModal={() =>
                sosAlertData.sosEnable
                  ? raiseRedAlert(
                      dispatch,
                      user,
                      sosAlertData.autoGeoLocation === true ? reduxLocation : 0,
                      setIsRedAlert,
                      sosAlertData,
                    )
                  : {}
              }
              navigateScreen={() => navigatetoVerifyPin(navigation)}
              toggleText={redAlertSwipeText}
              toggleState={
                sosAlertData.sosEnable === true ? redAlertSwipeState : 0
              }
              onToggle={onCreateRedAlert}
              startToggle={startToggleRedAlert}
              swiperValue={sosAlertData.sosEnable === true ? swiperValue : 0}
              sosAlertData={sosAlertData.sosEnable}
            />
          ) : null}
        </ScrollView>
      </View>



      <Text>Home</Text>
    </View>
  );
}

export default Home;

