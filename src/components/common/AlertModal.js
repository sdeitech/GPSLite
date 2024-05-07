/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ImageBackground,
  Platform,
  Vibration,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from './CustomText';
import GLOBALS from '@constants';
import Images from '@assets/images';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '@helpers/ResponsiveFonts';
import Geolocation from '@react-native-community/geolocation';
import DeviceInfo from 'react-native-device-info';
const {COLOR, FONTS, FONTSIZE} = GLOBALS;
import NetInfo from '@react-native-community/netinfo';

const AlertModal = props => {
  let {isAlertvisible, transparent = true, animationType} = props;
  const [location, setLocation] = useState(null);
  const [batteryStatus, setBatteryStatus] = useState('Good');
  const [signalStrength, setSignalStrength] = useState(false);
  const [batteryPercentage, setBatteryPercentage] = useState();
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
      },
      error => {
        console.log(error);
      },
    );
  }, []);
  useEffect(() => {
    const unsubscribe =
      Platform.OS === 'android'
        ? NetInfo.fetch().then(state => {
            setSignalStrength(state);
          })
        : NetInfo.fetch().then(state => {
            console.log(state.isConnected, 'state>>> of signal ');
            setSignalStrength(state.isConnected);
          });
    return () => unsubscribe;
  }, []);
  useEffect(() => {
    const updateBatteryStatus = async () => {
      const deviceBatteryLevel = await DeviceInfo.getBatteryLevel();
      if (deviceBatteryLevel !== -1) {
        const batteryPercentage = deviceBatteryLevel * 100;
        const batteryPercent = parseInt(batteryPercentage, 10);
        if (batteryPercentage <= 20) {
          Vibration.vibrate(300);
          setTimeout(() => {
            Vibration.cancel();
          }, 30000);
          setBatteryStatus('Poor');
          setBatteryPercentage(batteryPercent);
        } else {
          setBatteryStatus('Good');
          setBatteryPercentage(batteryPercent);
        }
      } else {
        setBatteryStatus('Unknown');
      }
    };
    updateBatteryStatus();
  }, []);

  const safetyAlertData = [
    {
      id: 1,
      image: Images.battery,
      title: 'Battery Level',
      description: batteryStatus,
    },
    {
      id: 2,
      image: Images.signalStrength,
      title: 'Signal Strength',
      description:
        Platform.OS === 'android'
          ? signalStrength?.details?.strength
            ? 'Good'
            : 'Poor'
          : signalStrength
          ? 'Good'
          : 'Poor',
    },
    {
      id: 3,
      image: Images.location,
      title: 'Location',
      description: location ? 'Good' : 'Poor',
    },
  ];

  return (
    // <View>
    <Modal
      visible={isAlertvisible}
      transparent={transparent}
      animationType={animationType}>
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <CustomText
            title={'Safety Check was sent!'}
            customTextStyle={styles.headingTextStyle}
          />
          <View style={styles.safetyView}>
            {safetyAlertData.map((item, index) => {
              return (
                <View key={index} style={{flex: 1}}>
                  <View
                    style={[
                      {
                        backgroundColor:
                          item.description === 'Good'
                            ? COLOR.GREEN_OPACITY
                            : COLOR.RED_OPACITY,
                      },
                      styles.imageView,
                    ]}>
                    {item.title === 'Battery Level' ? (
                      <ImageBackground
                        source={item.image}
                        resizeMode="contain"
                        style={styles.imageStyle}
                        imageStyle={{
                          tintColor:
                            item.description === 'Good' ||
                            item.description === 'Available'
                              ? COLOR.GREEN
                              : COLOR.BTN_RED,
                        }}>
                        <Text style={styles.batteryText}>
                          {batteryPercentage ? batteryPercentage + '%' : ''}
                        </Text>
                      </ImageBackground>
                    ) : (
                      <Image
                        source={item.image}
                        resizeMode={'contain'}
                        style={{
                          alignSelf: 'center',
                          tintColor:
                            item.description === 'Good'
                              ? COLOR.GREEN
                              : COLOR.BTN_RED,
                        }}
                      />
                    )}
                  </View>
                  <CustomText
                    title={item.title}
                    customTextStyle={styles.titleTextStyle}
                  />
                  <CustomText
                    title={item.description}
                    customTextStyle={[
                      styles.descriptionTextStyle,
                      {
                        color:
                          item.description === 'Good'
                            ? COLOR.GREEN
                            : COLOR.BTN_RED,
                      },
                    ]}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
    // </View>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.TRANSPARENT_OPACITY,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: COLOR.SECONDARY,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
    shadowColor: COLOR.SHADOW_COLOR,
    shadowOffset: {width: -2, height: 4},
    shadowRadius: 3,
  },
  safetyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingTextStyle: {
    textAlign: 'center',
    fontSize: FONTSIZE.MEDIUM,
    marginVertical: verticalScale(20),
  },
  titleTextStyle: {
    marginTop: verticalScale(15),
    textAlign: 'center',
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    height: verticalScale(60),
  },
  descriptionTextStyle: {
    marginVertical: verticalScale(8),
    textAlign: 'center',
    fontSize: FONTSIZE.MEDIUM,
  },
  imageView: {
    borderRadius: moderateScale(50),
    height: moderateScale(50),
    width: moderateScale(50),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  batteryText: {
    color: COLOR.PRIMARY,
    alignSelf: 'center',
    fontSize: moderateScale(9),
    paddingHorizontal: moderateScale(5),
    fontFamily: FONTS.SEMIBOLD,
  },
});
