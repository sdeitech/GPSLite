import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
// import CustomHeader from '@components/common/CustomHeader';
import CustomHeader from '../../../../components/common/CustomHeader';
import Images from '../../../../assets/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../../../components/common/CustomButton';
// import CustomTextInput from '@components/common/CustomTextInput';
import CustomTextInput from '../../../../components/common/CustomTextInput';
import {horizontalScale, verticalScale} from '../../../../helpers/ResponsiveFonts';
// import {validatePassword} from '../../../../utils';
import styles from './style';
import {useDispatch} from 'react-redux';
// import {
//   changePassword,
//   profileDetail,
//   selectCurrentUser,
// } from 'src/redux/slice/authSlice';
import {useSelector} from 'react-redux';
import { changePassword, profileDetail, selectCurrentUser } from '../../../../redux/slice/authSlice';
import { validatePassword } from '../../../../utils/ValidationUtils';
// import strings from '@constants/string';

const ChangePassword = ({navigation}) => {
  const goBack = () => {
    navigation.pop();
  };
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectCurrentUser);
  const profileData = useSelector(profileDetail);
  // initialize state by object:-
  const [input, setInput] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',

    currentPasswordError: '',
    newPasswordError: '',
    confirmPasswordError: '',

    isCurrentPasswordError: false,
    isNewPasswordError: false,
    isConfirmPasswordError: false,

    isCurrentPasswordSecure: true,
    isNewPasswordSecure: true,
    isConfirmPasswordSecure: true,
  });

  // update Password
  const updatePassword = () => {
    if (input.currentPassword === '') {
      setInput({
        ...input,
        isCurrentPasswordError: true,
        currentPasswordError: strings.pleaseEnterCurrentPassword,
      });
    } else if (input.newPassword === '') {
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
    } else if (input.newPassword === input.currentPassword) {
      setInput({
        ...input,
        isNewPasswordError: true,
        newPasswordError: strings.passwordAlreadyExists,
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
        id: loggedInUser.userId,
        oldPassword: input.currentPassword,
        newPassword: input.newPassword,
      };
      dispatch(changePassword(body)).then(response => {
        if (response) {
          navigation.navigate('Tab', {screen: 'Profile'});
        }
      });
    }
  };
  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };
  //   return function
  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={goBack}
        rightImage={{uri: profileData?.profilePhotoPath}}
        customImgStyle={styles.customHeaderImg}
        rightButtonPress={navigateToProfile}
        title={strings.changePassword}
        containerFlex={0.1}
      />
      <View style={styles.profileContainer}>
        <KeyboardAwareScrollView
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.card}
          nestedScrollEnabled={true}>
          <CustomTextInput
            label={strings.currentPassword}
            placeholder={strings.enterCurrentPassword}
            value={input.currentPassword}
            secureTextEntry={input.isCurrentPasswordSecure}
            error={input.isCurrentPasswordError}
            errorMessage={input.currentPasswordError}
            isRightIcon={
              input.isCurrentPasswordSecure ? Images.eyeClose : Images.eyeOpen
            }
            onRightIconClick={() =>
              setInput({
                ...input,
                isCurrentPasswordSecure: !input.isCurrentPasswordSecure,
              })
            }
            onChangeText={text =>
              setInput({
                ...input,
                currentPassword: text,
                isCurrentPasswordError: false,
                currentPasswordError: '',
              })
            }
          />
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
            title={strings.resetPassword}
            onBtnPress={updatePassword}
            customBtnStyle={{
              marginHorizontal: horizontalScale(20),
              marginTop: verticalScale(30),
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ChangePassword;
