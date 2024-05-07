import Images from '../../../assets/images';
import CustomHeader from '../../../components/common/CustomHeader';
import CustomText from '../../../components/common/CustomText';
import GLOBALS from '../../../constants/index';
import strings from '../../../constants/string';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helpers/ResponsiveFonts';
import React, {useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {profileDetail, selectCurrentUser} from '../../../redux/slice/authSlice';

import styles from './style';
const {APP_VERSION} = GLOBALS;

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const profileData = useSelector(profileDetail);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const screensData = [
    {
      id: 1,
      title: strings.profile,
      screenName: 'Profile',
    },
    {
      id: 2,
      title: strings.vitals,
      screenName: 'FatigueManage',
    },
    {
      id: 3,
      title: strings.connectedDevice,
      screenName: 'ConnectedDevice',
    },
    {
      id: 4,
      title: strings.changePin,
      screenName: 'ChangePin',
    },
    {
      id: 5,
      title: strings.changePassword,
      screenName: 'ChangePassword',
    },
  ];
  const user = useSelector(selectCurrentUser);
  const navigateToNotification = () => {
    navigation.navigate('Notifications', {source: 'notificationRedux'});
  };
  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.notifications}
        rightImage={{uri: profileData?.profilePhotoPath}}
        customImgStyle={styles.customHeaderImg}
        title={strings.settings}
        leftButtonPress={navigateToNotification}
        rightButtonPress={navigateToProfile}
        containerFlex={0.15}
      />
      <ScrollView style={styles.profileContainer}>
        <View
          style={{
            marginTop: verticalScale(25),
            marginHorizontal: horizontalScale(22),
          }}>
          <FlatList
            data={screensData}
            scrollEnabled={false}
            renderItem={({item}) => {
              return (
                <View>
                  <CustomText
                    title={item.title}
                    isTouchable={true}
                    customTextStyle={{fontSize: moderateScale(20)}}
                    onTextPress={() => navigation.navigate(item.screenName)}
                  />
                  <View style={styles.hairLineStyle} />
                </View>
              );
            }}
          />
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              title={strings.privacyMode}
              isTouchable={true}
              customTextStyle={styles.toggleText}
              onTextPress={() => navigation.navigate('ChangePassword')}
            />
            <Switch
              trackColor={{false: COLOR.SECONDARY, true: COLOR.SWITCH_GREEN}}
              thumbColor={isEnabled ? COLOR.SECONDARY : COLOR.SECONDARY}
              ios_backgroundColor={COLOR.SECONDARY}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.hairLineStyle} />
          <CustomText
            title={strings.victimAlert}
            isTouchable={true}
            customTextStyle={styles.toggleText}
            onTextPress={() => navigation.navigate('ChangePassword')}
          /> */}

          <CustomText
            title={strings.signOut}
            isTouchable={true}
            customTextStyle={styles.signoutText}
            
          />
        </View>
        <CustomText
          // textContainer={{margin: moderateScale(20)}}
          customTextStyle={styles.versionText}
          title={`v${APP_VERSION}`}
        />
      </ScrollView>
    </View>
  );
};

export default Setting;
