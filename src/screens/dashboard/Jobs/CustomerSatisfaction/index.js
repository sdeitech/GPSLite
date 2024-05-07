import {View, FlatList, Image, Alert, TouchableOpacity} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import CustomHeader from '@components/common/CustomHeader';
import Images from '@assets/images';
import CustomText from '@components/common/CustomText';
import strings from '@constants/string';
import styles from './style';
import CustomTextInput from '@components/common/CustomTextInput';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '@helpers/ResponsiveFonts';
import CustomButton from '@components/common/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SignatureCapture from 'react-native-signature-capture';
import COLOR from '@constants/colors';
import {useSelector, useDispatch} from 'react-redux';
import {selectCurrentUser} from '@redux/slice/authSlice';
import {customerSatisfaction, jobDetail} from 'src/redux/slice/jobSlice';
import SpeechToTextService from '@helpers/SpeechToTextService';
import {useFocusEffect} from '@react-navigation/native';
import {profileDetail} from 'src/redux/slice/authSlice';
import CustomModal from '@components/common/CustomModal';
const ratingData = [
  {
    id: 1,
    image: Images.happy,
    starImage: Images.fiveStar,
    isHighlighted: false,
    value: 5,
  },
  {
    id: 2,
    image: Images.notHappy,
    starImage: Images.fourStar,
    isHighlighted: false,
    value: 4,
  },
  {
    id: 3,
    image: Images.satisfied,
    starImage: Images.threeStar,
    isHighlighted: false,
    value: 3,
  },
  {
    id: 4,
    image: Images.sad,
    starImage: Images.twoStar,
    isHighlighted: false,
    value: 2,
  },
  {
    id: 5,
    image: Images.disappointed,
    starImage: Images.oneStar,
    isHighlighted: false,
    value: 1,
  },
];
const CustomerSatisfaction = ({navigation, route}) => {
  const goBack = () => {
    navigation.pop();
  };
  const [comment, setComment] = useState('');
  const [signature, setSignature] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [alertModal, setAlertModal] = useState({
    isVisible: false,
    message: '',
    btn: false,
  });
  const {workflowId, subJobId} = route.params;
  const sign = useRef();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const selectedIndex = useRef(0);
  const handleValueChange = newValue => {
    setComment(newValue);
  };
  const jobData = useSelector(jobDetail);
  const profileData = useSelector(profileDetail);

  console.log('route.params==========>>>>>>', route.params);
  useEffect(() => {
    // Register the callback function when the component mounts
    SpeechToTextService.registerCallback(handleValueChange);
    // Unregister the callback when the component unmounts
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
    if (!comment.trim()) {
      // Alert.alert('Comment is required');
      setAlertModal({
        isVisible: true,
        message: 'Comment is required',
        btn: true,
      });
      return false;
    } else {
      return true;
    }
  };

  // const validateSign = result => {
  //   const base64Regex = /^data:image\/png;base64,/;

  //   if (base64Regex.test(result.encoded)) {
  //     // Signature format is valid

  //     return true;
  //   } else {
  //     // Signature format is not valid
  //     Alert.alert('A Valid Signature is required');
  //   }
  // };
  const saveCustomerSatisfaction = result => {
    if (!validateComment()) {
      return;
    }
    // if (!validateSign(result)) {
    //   return;
    // }
    if (!selectedRating) {
      // Alert.alert('Please provide a Rating');
      setAlertModal({
        isVisible: true,
        message: 'Please provide a Rating',
        btn: true,
      });
      return;
    }
    const body = {
      customerStaisfactionId: 0,
      userId: user?.userId,
      jobId: jobData?.jobId,
      workFlowId: workflowId,
      comment,
      signatureImage: signature,
      customerRating: selectedRating,
      subJobId: subJobId,
    };

    dispatch(customerSatisfaction(body)).then(
      response =>
        navigation.navigate('Feedback', {
          workflowId,
          subJobId,
        }),
      // sign.current.resetImage(),
    );
  };

  const saveSign = () => {
    sign.current.saveImage();
  };

  const onSaveEvent = result => {
    console.log('result=====>>>>>', result);
    setSignature(result.encoded);
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
  };
  const onDragEvent = () => {
    saveSign();
    // This callback will be called when the user enters signature
  };
  const onRating = val => {
    setSelectedRating(val);
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        // leftImage={Images.back}
        // leftButtonPress={goBack}
        rightButton={true}
        rightImage={{uri: profileData?.profilePhotoPath}}
        customImgStyle={styles.customHeaderImg}
        title={strings.customerSatisfaction}
        containerFlex={0.1}
      />
      <KeyboardAwareScrollView style={styles.content}>
        <View style={styles.askText}>
          <CustomText title={strings.tellYourExperience} />
        </View>
        <View style={styles.flatListView}>
          <FlatList
            data={ratingData}
            horizontal
            scrollEnabled={false}
            style={styles.flatListContainer}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => onRating(item.value)}>
                  <Image
                    source={item.image}
                    style={[
                      styles.emojiImage,
                      {opacity: selectedRating == item.value ? 1 : 0.6},
                    ]}
                  />
                  <Image
                    source={item.starImage}
                    style={{
                      alignContent: 'center',
                      opacity: selectedRating == item.value ? 1 : 0.6,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <CustomTextInput
            label={strings.comment}
            placeholder={strings.addComment}
            value={comment}
            isMultiline={true}
            onChangeText={text => {
              setComment(text);
            }}
            isRecorder={true}
            saveIndex={v => (selectedIndex.current = v)}
          />
          <View
            style={{
              marginHorizontal: horizontalScale(20),
              marginTop: verticalScale(20),
            }}>
            <CustomText title={strings.clientSignature} />
          </View>
          <View style={styles.signatureView}>
            <CustomText
              title={strings.addSignature}
              customTextStyle={{
                color: COLOR.GREY,
                paddingBottom: verticalScale(5),
              }}
            />
            <SignatureCapture
              ref={sign}
              onSaveEvent={onSaveEvent}
              onDragEvent={onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              strokeColor="#000000"
              minStrokeWidth={4}
              maxStrokeWidth={4}
              viewMode="portrait"
              height={200}
            />
          </View>
        </View>
        <CustomButton
          title={strings.save}
          customBtnStyle={styles.customBtnStyle}
          onBtnPress={saveCustomerSatisfaction}
        />
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
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CustomerSatisfaction;
