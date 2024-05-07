import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import GLOBALS from '../../../../constants/index';
import CustomTextInput from '../../../../components/common/CustomTextInput';
import CustomButton from '../../../../components/common/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import {validatePassword} from '../../../../utils/ValidationUtils';
import Images from '../../../../assets/images';
// import {resetPassworddata} from 'src/redux/slice/authSlice';
import {resetPassworddata} from '../../../../redux/slice/authSlice';
import {useDispatch} from 'react-redux';
import {verticalScale} from '@helpers/ResponsiveFonts';
import CustomModal from '../../../../components/common/CustomModal';
const {strings} = GLOBALS;

const ResetPassword = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [passwordChange, setPasswordChange] = useState(false);
  const {emailId} = route.params;

  const [input, setInput] = useState({
    newPassword: '',
    confirmPassword: '',

    newPasswordError: '',
    confirmPasswordError: '',

    isNewPasswordError: false,
    isConfirmPasswordError: false,

    isNewPasswordSecure: true,
    isConfirmPasswordSecure: true,
  });

  // onLogin Press Check Validations
  const resetPassword = () => {
    if (input.newPassword === '') {
      setInput({
        ...input,
        isNewPasswordError: true,
        newPasswordError: strings.pleaseEnterNewPassword,
      });
    } else if (!validatePassword(input.newPassword)) {
      setInput({
        ...input,
        isNewPasswordError: true,
        newPasswordError: strings.pleaseEnterValidPassword,
      });
    } else if (input.confirmPassword === '') {
      setInput({
        ...input,
        isConfirmPasswordError: true,
        confirmPasswordError: strings.pleaseConfirmPassword,
      });
    } else if (input.confirmPassword !== input.newPassword) {
      setInput({
        ...input,
        isConfirmPasswordError: true,
        confirmPasswordError: strings.passwordDoNotMatch,
      });
    } else {
      let body = {
        emailId: emailId,
        password: input.confirmPassword,
      };

      dispatch(resetPassworddata(body)).then(response => {
        if (response) {
          console.log('response===>>>>', response);
          setPasswordChange(true);
        }
      });
    }
  };

  const NavigateLogin = () => {
    navigation.navigate('Login'); // Navigate to ReportJobs screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{paddingLeft: '2%'}}>
          <Image source={Images.back} />
        </TouchableOpacity>
        <View style={{justifyContent: 'center'}}>
          {/* <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: verticalScale(15),
            }}>
            <Image
              style={{width: '85%', height: verticalScale(25)}}
              source={Images.logoText}
            />
          </View> */}

          <View style={{alignItems: 'center'}}>
            <Text style={styles.loginTitle}>{strings.resetPassword}</Text>
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
          <CustomTextInput
            label={strings.newPassword}
            placeholder={strings.enterNewPassword}
            value={input.newPassword}
            secureTextEntry={input.isNewPasswordSecure}
            error={input.isNewPasswordError}
            errorMessage={input.newPasswordError}
            isRightIcon={
              input.isNewPasswordSecure ? Images.eyeClose : Images.eyeOpen
            }
            onRightIconClick={() =>
              setInput({
                ...input,
                isNewPasswordSecure: !input.isNewPasswordSecure,
              })
            }
            onChangeText={text =>
              setInput({
                ...input,
                newPassword: text,
                isNewPasswordError: false,
                newPasswordError: '',
              })
            }
          />
          <CustomTextInput
            label={strings.confirmPassword}
            placeholder={strings.confirmPassword}
            value={input.confirmPassword}
            secureTextEntry={input.isConfirmPasswordSecure}
            error={input.isConfirmPasswordError}
            errorMessage={input.confirmPasswordError}
            isRightIcon={
              input.isConfirmPasswordSecure ? Images.eyeClose : Images.eyeOpen
            }
            onRightIconClick={() =>
              setInput({
                ...input,
                isConfirmPasswordSecure: !input.isConfirmPasswordSecure,
              })
            }
            onChangeText={text =>
              setInput({
                ...input,
                confirmPassword: text,
                isConfirmPasswordError: false,
                confirmPasswordError: '',
              })
            }
          />
          <CustomButton
            onBtnPress={() => resetPassword()}
            customBtnStyle={styles.customBtnStyle}
            title={strings.resetPassword}
          />
        </View>
      </KeyboardAwareScrollView>
      {passwordChange && (
        <CustomModal
          isVisible={passwordChange}
          modalTitle={strings.passwordChange}
          onBtn1Press={() => {
            setPasswordChange(!passwordChange);
            NavigateLogin();
          }}
          btn1Title={strings.ok}
          customBtn1Style={styles.modalBtn}
          isBtn={true}
        />
      )}
    </View>
  );
};
export default ResetPassword;
