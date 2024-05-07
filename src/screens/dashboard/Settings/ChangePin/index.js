import {View} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../../../components/common/CustomHeader';
import Images from '../../../../assets/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../../../components/common/CustomButton';
import CustomTextInput from '../../../../components/common/CustomTextInput';
import {horizontalScale, verticalScale} from '../../../../helpers/ResponsiveFonts';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {changePin, profileDetail, selectCurrentUser} from '../../../../redux/slice/authSlice';
import strings from '../../../../constants/string';
import CustomText from '../../../../components/common/CustomText';
// import {changePin} from 'src/redux/slice/authSlice';

// import strings from '@constants/string';
// import CustomText from '@components/common/CustomText';

const ChangePin = ({navigation}) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectCurrentUser);
  const profileData = useSelector(profileDetail);
  const goBack = () => {
    navigation.pop();
  };
  // initialize state by object:-
  const [input, setInput] = useState({
    currentPin: '',
    newPin: '',
    confrimPin: '',

    currentPinError: '',
    newPinError: '',
    confrimPinError: '',

    iscurrentPinError: false,
    isnewPinError: false,
    isconfrimPinError: false,

    iscurrentPinSecure: true,
    isnewPinSecure: true,
    isconfrimPinSecure: true,
  });

  // update Pin
  const updatePin = () => {
    if (input.currentPin === '') {
      setInput({
        ...input,
        iscurrentPinError: true,
        currentPinError: strings.pleaseEnterCurrentPin,
      });
    } else if (input.newPin === '') {
      setInput({
        ...input,
        isnewPinError: true,
        newPinError: strings.pleaseEnterNewPassword,
      });
    } else if (input.newPin === input.currentPin) {
      setInput({
        ...input,
        isnewPinError: true,
        newPinError: strings.pinAlreadyExists,
      });
    } else if (input.confrimPin === '') {
      setInput({
        ...input,
        isconfrimPinError: true,
        confrimPinError: strings.pleaseConfirmPin,
      });
    } else if (input.confrimPin !== input.newPin) {
      setInput({
        ...input,
        isconfrimPinError: true,
        confrimPinError: strings.pinDoNotMatch,
      });
    } else {
      // navigation.navigate('Tab', {screen: 'Profile'});
      let body = {
        emailId: loggedInUser?.userDetails?.emailId,
        oldPin: input.currentPin,
        newPin: input.newPin,
      };
      dispatch(changePin(body)).then(response => {
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
        title={strings.changePin}
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
            keyboardType="numeric"
            label={strings.currentPin}
            placeholder={strings.enterCurrentPin}
            value={input.currentPin}
            secureTextEntry={input.iscurrentPinSecure}
            error={input.iscurrentPinError}
            errorMessage={input.currentPinError}
            isRightIcon={
              input.iscurrentPinSecure ? Images.eyeClose : Images.eyeOpen
            }
            onRightIconClick={() =>
              setInput({
                ...input,
                iscurrentPinSecure: !input.iscurrentPinSecure,
              })
            }
            onChangeText={text =>
              setInput({
                ...input,
                currentPin: text,
                iscurrentPinError: false,
                currentPinError: '',
              })
            }
          />
          <CustomTextInput
            keyboardType="numeric"
            label={strings.newPin}
            placeholder={strings.enterNewPin}
            value={input.newPin}
            secureTextEntry={input.isnewPinSecure}
            error={input.isnewPinError}
            errorMessage={input.newPinError}
            isRightIcon={
              input.isnewPinSecure ? Images.eyeClose : Images.eyeOpen
            }
            onRightIconClick={() =>
              setInput({
                ...input,
                isnewPinSecure: !input.isnewPinSecure,
              })
            }
            onChangeText={text =>
              setInput({
                ...input,
                newPin: text,
                isnewPinError: false,
                newPinError: '',
              })
            }
          />
          <CustomTextInput
            keyboardType="numeric"
            label={strings.confirmPin}
            placeholder={strings.confirmPin}
            value={input.confrimPin}
            secureTextEntry={input.isconfrimPinSecure}
            error={input.isconfrimPinError}
            errorMessage={input.confrimPinError}
            isRightIcon={
              input.isconfrimPinSecure ? Images.eyeClose : Images.eyeOpen
            }
            onRightIconClick={() =>
              setInput({
                ...input,
                isconfrimPinSecure: !input.isconfrimPinSecure,
              })
            }
            onChangeText={text =>
              setInput({
                ...input,
                confrimPin: text,
                isconfrimPinError: false,
                confrimPinError: '',
              })
            }
          />
          <CustomText
            title={strings.forgotPin}
            textContainer={styles.textContainer}
            customTextStyle={styles.customTextStyle}
            isTouchable={true}
            onTextPress={() => navigation.navigate('ForgotPin')}
          />
          <CustomButton
            title={strings.resetPin}
            onBtnPress={updatePin}
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

export default ChangePin;
