// import {useAlert} from '@/constants';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
export default function useNotification(navigation) {
  // const {showAlert} = useAlert();

  // Get Notification when app is in Forground state
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage============>>>>>>>>>>>>>>>>', remoteMessage);
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        vibration: true,
        vibrationPattern: [300, 500],
        sound: 'hollow',
      });
      let id = new Date().getTime().toString();

      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        id: id,
        data: remoteMessage.data,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          vibrationPattern: [300, 500],
          sound: 'hollow',
        },
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);
  // handle the notification when user interaction is in Forground state
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          __DEV__ &&
            console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          __DEV__ &&
            console.log('User pressed notification', detail.notification);
          // _Handleroutes(detail.notification);

          break;
      }
    });
  }, []);

  // handle the notification when app open from kill state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      __DEV__ && console.log('kill state', remoteMessage);

      // _Handleroutes(remoteMessage);
    });

  // handle the notification when app is in background state
  messaging().onNotificationOpenedApp(remoteMessage => {
    __DEV__ && console.log('background state', remoteMessage);
    // _Handleroutes(remoteMessage?.notification);
  });

  // Manage your Route Here
  // const _Handleroutes = notification => {
  //   switch (notification?.data?.key) {
  //     case 'vital_reminder':
  //       Platform.OS === 'ios'
  //         ? Alert.alert(
  //             'Scan your vitals',
  //             'We can generate a report based on your facial or finger analysis.',
  //             [
  //               {
  //                 text: 'Finger',
  //                 onPress: () => {
  //                   if (Platform.OS === 'ios') {
  //                     navigation.navigate(NAVIGATION.IOSVeyetalsNative, {
  //                       payload: 'finger',
  //                     });
  //                   } else {
  //                     navigation.navigate(NAVIGATION.AndroidVeyetalsNative, {
  //                       payload: 'finger',
  //                     });
  //                   }
  //                 },
  //               },
  //               {
  //                 text: 'Face',
  //                 onPress: () => {
  //                   if (Platform.OS === 'ios') {
  //                     navigation.navigate(NAVIGATION.IOSVeyetalsNative, {
  //                       payload: 'face',
  //                       // data: payload,
  //                     });
  //                   } else {
  //                     navigation.navigate(NAVIGATION.AndroidVeyetalsNative, {
  //                       payload: 'face',
  //                     });
  //                   }
  //                 },
  //               },
  //               {text: 'Cancel', onPress: () => {}},
  //             ],
  //           )
  //         : showAlert({
  //             title: 'Scan your vitals',
  //             message:
  //               'We can generate a report based on your facial or finger analysis.',
  //             cancellable: true,
  //             buttonList: [
  //               {
  //                 buttonTitle: 'Finger',
  //                 onPress: () =>
  //                   Platform.OS === 'ios'
  //                     ? navigation.navigate(NAVIGATION.IOSVeyetalsNative, {
  //                         payload: 'finger',
  //                         data: payload,
  //                       })
  //                     : navigation.navigate(NAVIGATION.AndroidVeyetalsNative, {
  //                         payload: 'finger',
  //                         data: payload,
  //                       }),
  //               },
  //               {
  //                 buttonTitle: 'Face',
  //                 onPress: () =>
  //                   Platform.OS === 'ios'
  //                     ? navigation.navigate(NAVIGATION.IOSVeyetalsNative, {
  //                         payload: 'face',
  //                         data: payload,
  //                       })
  //                     : navigation.navigate(NAVIGATION.AndroidVeyetalsNative, {
  //                         payload: 'face',
  //                         data: payload,
  //                       }),
  //               },
  //             ],
  //           });
  //     default:
  //       // Default case or handle other values
  //       break;
  //   }
  // };
}
