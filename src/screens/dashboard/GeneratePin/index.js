import React, {useEffect, useState} from 'react';
import {Text, View, Animated, BackHandler, Alert} from 'react-native';
// import strings from '@constants/string';
// import CustomButton from '@components/common/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
// import CustomText from '@components/common/CustomText';
import styles, {CELL_BORDER_RADIUS, CELL_SIZE} from './style';
// import {horizontalScale, verticalScale} from '@helpers/ResponsiveFonts';
// import {hideGeneratePinScreen, selectCurrentUser} from '@redux/slice/authSlice';
// import {createPin, pin} from '@redux/slice/authSlice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import strings from '../../../constants/string';
import ToastMessage from '../../../components/common/ToastMessage';
import { verifyPin } from '../../../redux/slice/authSlice';
// import ToastMessage from '@components/common/ToastMessage';
// import {verifyPin} from 'src/redux/slice/authSlice';
// import CustomModal from '@components/common/CustomModal';
import CustomModal from '../../../components/common/CustomModal';
import Images from '../../../assets/images';
import { cancelAlert, deviceAlertId } from '../../../redux/slice/homeSlice';
import { setRedAlertCanceled } from '../../../redux/commonStateSlice/commonStateSlice';
// import Images from '@assets/images';
// import {cancelAlert, deviceAlertId} from 'src/redux/slice/homeSlice';
// import {setRedAlertCanceled} from 'src/redux/commonStateSlice/commonStateSlice';
// import FONTSIZE from '@constants/fontSize';
import FONTSIZE from '../../../constants/fontSize';

const {Value, Text: AnimatedText} = Animated;
const CELL_COUNT = 4;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

const GeneratePin = ({navigation, route}) => {
  // Retrieve the values of isCancelAlertScreen and isTeamAlertScreen from route.params
  const isCancelAlertScreen = route.params?.isCancelAlertScreen || false;
  const isTeamAlertScreen = route.params?.isTeamAlertScreen || false;
  const isFallAlertCreated = route.params?.isFallAlertCreated || false;
  console.log('isFallAlertCreated===>>>', isFallAlertCreated);
  const pinCreated = useSelector(pin);
  const user = useSelector(selectCurrentUser);
  const alertData = useSelector(deviceAlertId);

  const generatedPin = pinCreated?.data?.pin;
  const dispatch = useDispatch();

  const [alertCancel, setAlertCancel] = useState(false);
  const [teamAlertCancel, setTeamAlertCancel] = useState(false);
  const [value, setValue] = useState('');
  const [fallAlertCancel, setFallAlertCancel] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [showModel, setShowModel] = useState(false);

  const handleBackPress = () => {
    if (!value) {
      setShowModel(true);
      return true; // Indicate that the back press has been handled
    } else {
      return false;
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [value]);

  // generate pin to continue the app
  const onGeneratePinPress = () => {
    if (value.length !== 4) {
      ToastMessage({
        type: 'error',
        text1: 'All fields are required to be filled',
      });
    } else {
      let body = {
        emailId: user?.userDetails?.emailId,
        pin: value,
      };
      dispatch(createPin(body)).then(response => {
        if (response) {
          setValue('');
          navigation.setParams({pin: value});
          navigation.reset({
            index: 0,
            routes: [{name: 'Tab'}],
          });
          // navigation.navigate('Tab', {pin: value});
        }
      });
      dispatch(hideGeneratePinScreen());
    }
  };
  // for cancelling red alert
  const onVerifyPinPress = () => {
    if (value.length !== 4) {
      ToastMessage({
        type: 'error',
        text1: 'All fields are required to be filled',
      });
    } else {
      // PINs match, proceed with verification
      let body = {
        userid: user?.userId,
        pin: value,
      };
      let cancelAlertBody = {
        alertCancleLogId: 0,
        deviceAlertId: alertData.data.deviceAlertId,
        cancleReason: '',
        createdBy: alertData.data.createdBy,
        createdOn: alertData.data.createdOn,
        isActive: true,
        isDeleted: true,
        groupId: 0,
      };
      console.log('body=====>>>>>', body);
      dispatch(verifyPin(body)).then(r => {
        console.log('isFallAlertCancel', fallAlertCancel);
        if (r) {
          setValue('');
          dispatch(cancelAlert(cancelAlertBody));
          isTeamAlertScreen
            ? setTeamAlertCancel(true)
            : isFallAlertCreated
            ? setFallAlertCancel(true)
            : setAlertCancel(true);
          // Use setTimeout to close the modal after a certain delay
          setTimeout(() => {
            isTeamAlertScreen
              ? setAlertCancel(false)
              : setTeamAlertCancel(false);
            // Navigate after closing the modal
            navigation.navigate('Tab');
          }, 3000);
        } else {
          dispatch(setRedAlertCanceled(false));
        }
      });
    }
  };

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
    };
    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    // setTimeout(() => {
    //   animateCell({hasValue, index, isFocused});
    // }, 0);
    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };
  const alertText = isCancelAlertScreen
    ? 'Please enter your PIN to cancel Red Alert'
    : isTeamAlertScreen
    ? 'Please enter your PIN to cancel Team Alert'
    : isFallAlertCreated
    ? 'Please enter your PIN to cancel FallAlert'
    : 'Please generate a PIN to proceed';
  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <Text style={styles.headingText}>{strings.logoText}</Text>
        <Text style={styles.subHeadingText}>
          {isCancelAlertScreen || isTeamAlertScreen || isFallAlertCreated
            ? 'Cancel Alert'
            : 'Generate Pin'}
        </Text>
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
            title={alertText}
            textContainer={{
              marginTop: verticalScale(42),
            }}
            customTextStyle={styles.customText}
          />
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          {(isCancelAlertScreen && isTeamAlertScreen) || (
            <CustomText
              title={strings.forgotPin}
              textContainer={styles.textContainer}
              customTextStyle={styles.customTextStyle}
              isTouchable={true}
              onTextPress={() => navigation.navigate('ForgotPin')}
            />
          )}
          <CustomButton
            onBtnPress={
              isCancelAlertScreen || isTeamAlertScreen
                ? onVerifyPinPress
                : onGeneratePinPress
            }
            customBtnStyle={styles.customBtnStyle}
            title="Submit"
          />
        </View>
      </KeyboardAwareScrollView>
      {alertCancel && (
        <CustomModal
          isVisible={alertCancel}
          modalTitle={'Red Alert Cancelled'}
          titleCustomStyle={styles.modalTitle}
          customModalContainer={{width: '70%'}}
        />
      )}
      {fallAlertCancel && (
        <CustomModal
          isVisible={fallAlertCancel}
          modalTitle={'Fall Alert Cancelled'}
          titleCustomStyle={styles.modalTitle}
          customModalContainer={{width: '70%'}}
        />
      )}
      {teamAlertCancel && (
        <CustomModal
          isVisible={teamAlertCancel}
          isImage={Images.team}
          modalTitle={'Team Alert Cancelled'}
          titleCustomStyle={styles.modalTitle}
          customModalContainer={{width: '70%'}}
        />
      )}

      {showModel && (
        <CustomModal
          isVisible={showModel}
          customModalContainer={{}}
          modalTitle={strings.pleaseEnter}
          titleCustomStyle={{fontSize: FONTSIZE.MEDIUM}}
          onBtn1Press={() => {
            setShowModel(false);
          }}
          btn1Title={strings.ok}
          customBtn1Style={styles.btnStyle}
          isBtn={true}
        />
      )}
    </View>
  );
};
export default GeneratePin;
