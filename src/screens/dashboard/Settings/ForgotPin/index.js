import React, {useState} from 'react';
import GLOBALS from '../../../../constants/index';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import CustomTextInput from '../../../../components/common/CustomTextInput';
import CustomText from '../../../../components/common/CustomText';
import CustomButton from '@components/common/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import { validateEmail } from '../../../../utils/ValidationUtils';
import {horizontalScale, verticalScale} from '../../../../helpers/ResponsiveFonts';
const {COLOR, strings} = GLOBALS;
import Images from '../../../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeader from '../../../../components/common/CustomHeader';
import { selectCurrentUser } from '../../../../redux/slice/authSlice';
import {forgotPin, profileDetail} from '../../../../redux/slice/authSlice';
import CustomModal from '../../../../components/common/CustomModal';
import {check} from 'react-native-permissions';
import FONTSIZE from '../../../../constants/fontSize';
const ForgotPin = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const profileData = useSelector(profileDetail);
  //initialize state Variables
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [checkMail, setCheckMail] = useState(false);
  // onLogin Press Check Validations
  const resetPin = () => {
    if (email === '') {
      setIsEmailError(true);
      setEmailError(strings.pleaseEnterEmail);
    } else if (!validateEmail(email)) {
      setIsEmailError(true);
      setEmailError(strings.pleaseEnterValidEmail);
    } else {
      let body = {
        emailId: email,
        userId: user?.userId,
      };
      dispatch(forgotPin(body)).then(response => {
        if (response) {
          setCheckMail(!checkMail);
          // navigation.pop();
        }
      });
    }
  };
  const goBack = () => {
    navigation.goBack();
  };
  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };
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
      <KeyboardAwareScrollView
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps={'handled'}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.card}
        nestedScrollEnabled={true}>
        <View style={styles.content}>
          <CustomText
            title={strings.forgotPinEmailLinkText}
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
            onBtnPress={() => resetPin()}
            customBtnStyle={styles.customBtnStyle}
            title={strings.resetPin}
          />
        </View>
      </KeyboardAwareScrollView>
      {checkMail && (
        <CustomModal
          isVisible={checkMail}
          modalTitle={'Please Check Mail'}
          titleCustomStyle={{fontSize: FONTSIZE.LARGE}}
          modalDescription={'New Pin Sent Successfully'}
          customDescriptionStyle={{fontSize: FONTSIZE.SEMI_MEDIUM}}
          btn1Title={strings.ok}
          customBtn1Style={{width: '50%', alignSelf: 'center'}}
          onBtn1Press={() => {
            setCheckMail(!checkMail), navigation.pop();
          }}
          isBtn={true}
        />
      )}
    </View>
  );
};
export default ForgotPin;
