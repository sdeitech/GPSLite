import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import notifee from '@notifee/react-native';

const Notifications = props => {
  let {notificationTitle = '', notificationBody = ''} = props;
  const onDisplayNotification = async (notificationTitle, notificationBody) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification using the provided title and body
    await notifee.displayNotification({
      title: notificationTitle || 'Notification Title',
      body: notificationBody || 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  useEffect(() => {
    // Use the props passed to the component when displaying the notification
    onDisplayNotification();
  }, []);
  return null;
};

export default Notifications;

const styles = StyleSheet.create({});
