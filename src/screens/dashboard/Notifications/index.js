/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../../components/common/CustomHeader';
import Images from '../../../assets/images';
import COLOR from '../../../constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helpers/ResponsiveFonts';
import CommonList from '../../../components/common/CommonList';
import CustomText from '../../../components/common/CustomText';
import {useSelector} from 'react-redux';

const Notification = ({navigation, route}) => {
  const [notificationsData, setNotificationsData] = useState([]);
  const {source} = route?.params;
  const notificationsRedux = useSelector(state => state.common.notifications);

  const NotificationsList = ({data}) => {
    // const sortedData = data
    //   .slice()
    //   .sort((a, b) => new Date(b.date) - new Date(a.date));
    const sortedData = data
      .slice()
      .sort((a, b) => new Date(b.time) - new Date(a.time));
    return (
      <FlatList
        style={{marginTop: verticalScale(20)}}
        data={sortedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <CommonList
            image={Images.notificationBell}
            imageStyle={{
              tintColor: COLOR.PRIMARY_BLUE,
              height: moderateScale(40),
              width: moderateScale(40),
              marginTop: verticalScale(15),
            }}
            headTitle={item?.title}
            subTitle={item?.body}
            date={item.date}
          />
        )}
      />
    );
  };

  useEffect(() => {
    if (source === 'notification') {
      // If the source is 'notification', check for data in the route.params
      const {params} = route;
      if (params && params.item) {
        setNotificationsData(prevData => [...prevData, params.item]); // Add the latest notification
      } else {
        // No notification data
      }
    }
  }, [route]);

  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={() => navigation.goBack()}
        rightImage={Images.settings}
        title="Notifications"
        containerFlex={0.1}
      />
      {/* <View style={styles.content}>
        {(source === 'notificationRedux' && notificationsRedux.length > 0) ||
        (source === 'notification' && notificationsData.length > 0) ? (
          <NotificationsList
            data={
              source === 'notification' ? notificationsData : notificationsRedux
            }
          />
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <CustomText title={'No Notifications'} />
          </View>
        )}
      </View> */}
      <View style={styles.content}>
        {(source === 'notificationRedux' && notificationsRedux.length > 0) ||
        (source === 'notification' && notificationsData.length > 0) ? (
          <NotificationsList
            data={
              source === 'notification'
                ? [...notificationsData, ...notificationsRedux]
                : notificationsRedux
            }
          />
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <CustomText title={'No Notifications'} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.PRIMARY_BLUE},
  content: {
    flex: 0.9,
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
});
