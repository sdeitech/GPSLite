import {View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomHeader from '@components/common/CustomHeader';
import Images from '@assets/images';
import strings from '@constants/string';
import CustomTextInput from '@components/common/CustomTextInput';
import CustomButton from '@components/common/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import SpeechToTextService from '@helpers/SpeechToTextService';
import {useDispatch, useSelector} from 'react-redux';
import {declineJob, declineSubJob} from 'src/redux/slice/jobSlice';
import {profileDetail} from 'src/redux/slice/authSlice';
const DeclineJob = ({navigation, route}) => {
  const {userId, jobId, subJobId, isSubJob} = route.params;
  console.log('route.params=====>>>>>', route.params);
  const goBack = () => navigation.goBack();
  const profileData = useSelector(profileDetail);
  const Data = [
    {
      label: strings.reason,
      placeholder: strings.addReason,
      value: '',
    },
    {
      label: strings.comment,
      placeholder: strings.addComment,
      value: '',
    },
  ];
  const dispatch = useDispatch();
  // on click of save button:---
  const onDeclineJob = () => {
    const body = {
      userId: userId,
      jobId: jobId,
      jobDeclinedId: 0,
      reason: formFieldsData[0].value,
      comment: formFieldsData[1].value,
    };
    dispatch(declineJob(body)).then(response => navigation.pop());
  };

  const onDeclineSubJob = () => {
    const body = {
      userId: userId,
      jobId: jobId,
      jobDeclinedId: 0,
      subJobId: subJobId,
      reason: formFieldsData[0].value,
      comment: formFieldsData[1].value,
    };
    dispatch(declineSubJob(body)).then(response => navigation.pop());
  };

  const [formFieldsData, setFormFieldsData] = useState(Data);
  const formFieldsDataRef = useRef(Data);
  const selectedIndex = useRef(0);

  const handleValueChange = newValue => {
    // Perform your desired action when the value changes
    changeInputValues(newValue, selectedIndex.current);
  };

  useEffect(() => {
    // Register the callback function when the component mounts
    SpeechToTextService.registerCallback(handleValueChange);

    // Unregister the callback when the component unmounts
    return () => {
      SpeechToTextService.registerCallback(null);
    };
  }, []);

  const changeInputValues = (val, index) => {
    const newData = formFieldsDataRef.current.map((obj, i) => {
      if (index === i) {
        return {...obj, value: val};
      }
      return obj;
    });

    if (newData.length) {
      setFormFieldsData([...newData]);
      formFieldsDataRef.current = [...newData];
    }
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={goBack}
        rightImage={{uri: profileData?.profilePhotoPath}}
        customImgStyle={styles.customHeaderImg}
        title={strings.declineJob}
        containerFlex={0.1}
        container={{backgroundColor: 'black'}}
      />
      <KeyboardAwareScrollView style={styles.content}>
        {formFieldsData.map((item, i) => (
          <CustomTextInput
            key={i}
            label={item.label}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={text => changeInputValues(text, i)}
            isRecorder
            saveIndex={v => (selectedIndex.current = v)}
            index={i}
          />
        ))}

        <CustomButton
          title={strings.save}
          customBtnStyle={styles.btnStyles}
          onBtnPress={() => {
            isSubJob ? onDeclineSubJob() : onDeclineJob();
          }}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default DeclineJob;
