import React, {useState} from 'react';
// import GLOBALS from '@constants/index';
import GLOBALS from '../../../constants/index';
import {Text, View, TouchableOpacity, Image} from 'react-native';

import CustomTextInput from '../../../components/common/CustomTextInput';
import CustomText from '../../../components/common/CustomText';
import CustomButton from '../../../components/common/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import {validateEmail} from '../../../utils/ValidationUtils';
import {horizontalScale, verticalScale} from '../../../helpers/ResponsiveFonts';
const {COLOR, strings} = GLOBALS;
import Images from '../../../assets/images';
import {useDispatch} from 'react-redux';
// import {forgotPassword} from '@redux/slice/authSlice';
import {forgotPassword} from '../../../redux/slice/audioSlice';

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();

  //initialize state Variables
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailError, setEmailError] = useState('');
  // onLogin Press Check Validations
  const resetPassword = () => {
    if (!email) {
      setIsEmailError(true);
      setEmailError(strings.pleaseEnterEmail);
    } else if (!validateEmail(email)) {
      setIsEmailError(true);
      setEmailError(strings.pleaseEnterValidEmail);
    } else {
      let body = {
        emailId: email,
      };
      console.log('body', body);
      dispatch(forgotPassword(body)).then(response => {
        if (response) {
          console.log('response===>>>>', response);

          navigation.navigate('ResetPassword', {
            emailId: email,
          });
        }
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{paddingLeft: '2%'}}>
          <Image source={Images.back} />
        </TouchableOpacity>
        <View>
          {/* <View style={{alignItems: 'center', marginTop: 50}}>
            <Image
              style={{width: '83%', height: verticalScale(26)}}
              source={Images.logoText}
            />
          </View> */}

          <View style={{alignItems: 'center'}}>
            <Text style={styles.loginTitle}>
              {strings.forgotPasswordHeading}
            </Text>
          </View>
        </View>
      </View>

      <KeyboardAwareScrollView
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.card}
        nestedScrollEnabled={true}>
        <View style={styles.content}>
          <CustomText
            title={strings.forgotPasswordEmailLinkText}
            textContainer={{
              marginTop: verticalScale(42),
              marginHorizontal: horizontalScale(20),
            }}
            customTextStyle={{color: COLOR.BLACK_TEXT}}
          />
          <CustomTextInput
            label={strings.userId}
            placeholder={strings.enterEmail}
            value={email}
            error={isEmailError}
            errorMessage={emailError}
            onChangeText={text => {
              setEmail(text), setIsEmailError(false), setEmailError('');
            }}
          />
          <CustomButton
            onBtnPress={() => resetPassword()}
            customBtnStyle={styles.customBtnStyle}
            title={strings.resetPassword}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default ForgotPassword;
