import Images from '@assets/images';
import CustomButton from '@components/common/CustomButton';
import CustomHeader from '@components/common/CustomHeader';
import CustomModal from '@components/common/CustomModal';
import CustomTextInput from '@components/common/CustomTextInput';
import strings from '@constants/string';
import {horizontalScale, verticalScale} from '@helpers/ResponsiveFonts';
import SpeechToTextService from '@helpers/SpeechToTextService';
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {profileDetail} from 'src/redux/slice/authSlice';
import {jobDetail, saveFeedback} from 'src/redux/slice/jobSlice';
import {FONTSIZE} from '@constants/index';
import styles from './style';
const FeedBack = ({navigation, route}) => {
  const [appriciation, setAppriciation] = useState(false);
  const goBack = () => {
    navigation.pop();
  };
  const [feedBack, setFeedBack] = useState('');
  const [alertModal, setAlertModal] = useState({
    isVisible: false,
    message: '',
    btn: false,
  });
  const {workflowId, subJobId} = route.params;
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const jobData = useSelector(jobDetail);
  const profileData = useSelector(profileDetail);
  const selectedIndex = useRef(0);
  const handleValueChange = newValue => {
    // Perform your desired action when the value changes
    console.log(newValue, 'feedback');

    setFeedBack(newValue);
  };

  useEffect(() => {
    return () => {
      SpeechToTextService.registerCallback(null);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      SpeechToTextService.registerCallback(handleValueChange);
    }, []),
  );

  const validateComment = () => {
    if (feedBack.trim() === '') {
      // Alert.alert('Please add Feedback');
      setAlertModal({
        isVisible: true,
        message: 'Please add Feedback',
        btn: true,
      });
    } else {
      return true;
    }
  };
  const onClickSave = () => {
    if (!validateComment()) {
      return;
    }
    const data = {
      employeeFeedbackId: 0,
      howWasDay: feedBack,
      userId: user.userId,
      workFlowId: workflowId,
      jobId: jobData?.jobId,
      subJobId: subJobId,
    };
    console.log('data', data);
    dispatch(saveFeedback(data)).then(r => {
      setAppriciation(!appriciation);
      setTimeout(() => {
        setAppriciation(false);
        // setThanked(!thanked);
        // navigation.popToTop();
        navigation.navigate('Tab');
      }, 2000);
    });
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={goBack}
        rightImage={{uri: profileData?.profilePhotoPath}}
        customImgStyle={styles.customHeaderImg}
        title={strings.feedback}
        containerFlex={0.1}
      />
      <KeyboardAwareScrollView style={styles.keyboardView}>
        <CustomTextInput
          label={strings.howWasDay}
          value={feedBack}
          placeholder={'Tell us about your day...'}
          isMultiline={true}
          numberOfLines={10}
          inputContainerStyle={styles.innerContainer}
          onChangeText={text => setFeedBack(text)}
          saveIndex={v => (selectedIndex.current = v)}
          isRecorder
        />

        <CustomButton
          title={strings.save}
          customBtnStyle={{
            marginVertical: verticalScale(20),
            marginHorizontal: horizontalScale(20),
          }}
          onBtnPress={onClickSave}
        />
      </KeyboardAwareScrollView>
      {appriciation && (
        <CustomModal
          isVisible={appriciation}
          isImage={Images.appriciation}
          modalTitle={strings.greatJob}
        />
      )}
      <CustomModal
        isVisible={alertModal.isVisible}
        modalTitle={alertModal.message}
        titleCustomStyle={{fontSize: FONTSIZE.MEDIUM}}
        isBtn={alertModal.btn}
        btn1Title={strings.ok}
        customBtn1Style={styles.alertButton}
        onBtn1Press={() => {
          setAlertModal({
            isVisible: false,
            message: '',
          });
        }}
      />
    </View>
  );
};

export default FeedBack;
