/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View, StatusBar, Image} from 'react-native';
// import GLOBALS from '@constants/index';
import GLOBALS from '../../../constants/index';
// import CustomTextInput from '@components/common/CustomTextInput';
import CustomTextInput from '../../../components/common/CustomTextInput';
import Images from '../../../assets/images';
import CustomText from '../../../components/common/CustomText';
import CustomButton from '../../../components/common/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import {validateEmail} from '../../../utils/ValidationUtils';
import {useDispatch} from 'react-redux';
// import {loginAsync} from '@redux/slice/authSlice';
import {loginAsync} from '../../../redux/slice/authSlice';
// import messaging from '@react-native-firebase/messaging';
// import {verticalScale} from '@helpers/ResponsiveFonts';
import {verticalScale} from '../../../helpers/ResponsiveFonts';
// import {getCheckInandOut, getProfileDetail} from 'src/redux/slice/authSlice';
import {getCheckInandOut, getProfileDetail} from '../../../redux/slice/authSlice';
import SplashScreen from 'react-native-splash-screen';
// import {getDeviceStatus} from 'src/redux/slice/homeSlice';
import {getDeviceStatus} from '../../../redux/slice/homeSlice';
import COLOR from '../../../constants/colors';
const {strings} = GLOBALS;


const Login = ({navigation}) => {
  //initialize state Variables
  const [input, setInput] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    deviceToken: '',
    isPasswordSecure: true,
    isEmailError: false,
    isPasswordError: false,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  // const checkToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   console.log(fcmToken, 'fcmTokennnnnn');
  //   setInput({
  //     ...input,
  //     deviceToken: fcmToken,
  //   });
  // };
  // useEffect(() => {
  //   checkToken();
  // }, []);

  const onLoginPress = () => {
    if (!input.email) {
      setInput({
        ...input,
        isEmailError: true,
        emailError: strings.pleaseEnterEmail,
      });
    } else if (!validateEmail(input.email)) {
      setInput({
        ...input,
        isEmailError: true,
        emailError: strings.pleaseEnterValidEmail,
      });
    } else if (!input.password) {
      setInput({
        ...input,
        isPasswordError: true,
        passwordError: strings.pleaseEnterPassword,
      });
    } else {
      let body = {
        emailId: input.email,
        password: input.password,
        deviceToken: input.deviceToken,
      };
      console.log('body==========>>>>>>>>>', body);
      dispatch(loginAsync(body)).then(response => {
        if (response) {
          dispatch(getCheckInandOut());
          dispatch(getDeviceStatus());
          console.log('loggedIN===========>>>>>>>>>>>>>');
          // navigation.pop();
        }
        // navigation.navigate('SplashScreen');
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLOR.PRIMARY_BLUE}
        barStyle={'light-content'}
      />
      <View style={styles.containerHead}>
        {/* <Image
          style={{width: '68%', height: verticalScale(28)}}
          source={Images.logoText}
        /> */}
        <Text style={styles.loginTitle}>{strings.login}</Text>
      </View>
      <View style={styles.card}>
        <KeyboardAwareScrollView
          // enableAutomaticScroll={true}
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid={false}
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll={false}
          nestedScrollEnabled={true}
          contentContainerStyle={{flexGrow: 1}}>
          <CustomTextInput
            label={strings.userId}
            placeholder={strings.enterEmail}
            value={input.email}
            error={input.isEmailError}
            errorMessage={input.emailError}
            onChangeText={text =>
              setInput({
                ...input,
                email: text,
                isEmailError: false,
                emailError: '',
              })
            }
            editable={true}
          />
          <CustomTextInput
            label={strings.password}
            placeholder={strings.enterPassword}
            secureTextEntry={input.isPasswordSecure}
            value={input.password}
            error={input.isPasswordError}
            errorMessage={input.passwordError}
            isRightIcon={
              input.isPasswordSecure ? Images.eyeClose : Images.eyeOpen
            }
            onRightIconClick={() =>
              setInput({
                ...input,
                isPasswordSecure: !input.isPasswordSecure,
              })
            }
            onChangeText={text => {
              setInput({
                ...input,
                password: text,
                isPasswordError: false,
                passwordError: '',
              });
            }}
          />
          <CustomText
            title={strings.forgotPassword}
            textContainer={styles.textContainer}
            customTextStyle={styles.customTextStyle}
            isTouchable={true}
            onTextPress={() => navigation.navigate('ForgotPassword')}
          />
          <CustomButton
            onBtnPress={() => onLoginPress()}
            customBtnStyle={styles.customBtnStyle}
            title={strings.login}
          />
          {/* <Text style={styles.versionText}>Version {APP_VERSION}</Text> */}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};
export default Login;

