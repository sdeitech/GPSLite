/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  Linking,
  Modal,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import Images from '@assets/images';
import CustomButton from '@components/common/CustomButton';
import CustomModal from '@components/common/CustomModal';
import CustomTextInput from '@components/common/CustomTextInput';
import COLOR from '@constants/colors';
import FONTSIZE from '@constants/fontSize';
import FONTS from '@constants/fonts';
import strings from '@constants/string';
import {checkAndRequestPermissions} from '@helpers/Permissions';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import SpeechToTextService from '@helpers/SpeechToTextService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import CheckBox from 'react-native-check-box';
import DocumentPicker from 'react-native-document-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import AttachmentModal from './AttachmentModal';
import CommonSignature from './CommonSignature';
import CustomDropdown from './CustomDropdown';
import CustomHeader from './CustomHeader';
import CustomText from './CustomText';
import RiskModal from './RiskModal';
import {jobDetail} from 'src/redux/slice/jobSlice';
let isRead = false;
const WorkflowCommon = ({
  onCompletingSteps,
  goBack,
  isVisible,
  setIsvisible,
  numberOfSteps,
  stepNumber,
  stepData,
  setStepNumber,
  noWorkFlowSteps,
  filePath,
  workflowAttachments,
  riskInJob,
  jobId,
  subJobId,
  // stepNumberRef,
}) => {
  const navigation = useNavigation();
  const [upload, setUpload] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [riskOnJob, setRiskOnJob] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openDocs, setOpenDocs] = useState(false);
  const [report, setReport] = useState(false);
  const [previewVideoVisible, setPreviewVideoVisible] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [photos, setPhotos] = useState([1]);
  const [videos, setVideos] = useState([1]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [input, setInput] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [openAttachment, setOpenAttachment] = useState(false);
  const [signature, setSignature] = React.useState(null);
  const {workflowDetailStarted} = useSelector(state => state.jobs);

  // Create a context to manage the signature state
  let inputRef = useRef([]);
  const jobData = useSelector(jobDetail);
  const jobID = jobData?.jobId;
  const selectedIndex = useRef(0);
  const stepNumberRef = useRef(1);
  const handleValueChange = newValue => {
    // Perform your desired action when the value changes
    const valueIndex = selectedIndex.current;
    onChangeInput(newValue, valueIndex);
  };

  useEffect(() => {
    // Register the callback function when the component mounts
    // SpeechToTextService.registerCallback(handleValueChange);
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

  useEffect(() => {
    setInput(stepData);
    inputRef.current = stepData;
  }, [stepData]);

  const openCameraForPhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const newMediaItem = {
        type: 'photo',
        name: image?.mime ?? '',
        url: image.path,
        id: mediaItems.length + 1, // Generate a unique ID
      };
      setMediaItems([...mediaItems, newMediaItem]);
    });
  };
  const deleteMediaItem = id => {
    const updatedMediaItems = mediaItems.filter(item => item.id !== id);
    setMediaItems(updatedMediaItems);
    const updatedPhotos = photos.filter(item => item.id !== id);
    const updatedVideos = videos.filter(item => item.id !== id);

    setPhotos(updatedPhotos);
    setVideos(updatedVideos);
  };
  const openCameraForVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    })
      .then(image => {
        const newMediaItem = {
          type: 'video',
          name: image?.mime ?? '',
          url: image.path,
          id: mediaItems.length + 1, // Generate a unique ID
        };
        setMediaItems([...mediaItems, newMediaItem]);
        // saveVideoToStorage(image.path);
      })
      .catch(err => {});
  };
  // const saveVideoToStorage = videoPath => {
  //   try {
  //     // Fetch existing videos from localStorage
  //     const existingVideos = AsyncStorage.getItem('videos');

  //     const parsedVideos = existingVideos ? JSON.parse(existingVideos) : [];

  //     // Add the new video to the existing list
  //     const newVideo = {path: videoPath, timestamp: Date.now()};
  //     const updatedVideos = [...parsedVideos, newVideo];

  //     // Save the updated list back to localStorage
  //     AsyncStorage.setItem('videos', JSON.stringify(updatedVideos));
  //   } catch (error) {}
  // };
  const askforPermission = async type => {
    const isPermit = await checkAndRequestPermissions();
    if (isPermit) {
      if (type === 'camera') {
        openCameraForPhoto();
      } else if (type === 'video') {
        openCameraForVideo();
      }
    }
  };
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });

      const newMediaItem = {
        type: 'document',
        name: response[0]?.name ?? '',
        url: response[0].uri,
        id: Math.floor(Math.random() * 100000 + 1), // Generate a unique ID
      };
      setMediaItems(prevMediaItems => [...prevMediaItems, newMediaItem]);
    } catch (err) {}
  }, []);

  const onCapturePhoto = () => {
    setOpenPhoto(!openPhoto);
  };
  const onCaptureDocs = () => {
    setOpenDocs(!openDocs);
  };
  const openPreview = media => {
    if (media?.type === 'document') {
      Linking.openURL(media?.url);
    } else if (media?.type === 'video') {
      // Show the video preview modal
      setPreviewVideoVisible(true);
      setPreviewMedia(media);
    } else {
      setPreviewMedia(media);
      setPreviewVisible(!previewVisible);
    }
  };

  const closePreview = () => {
    setPreviewMedia(null);
    setPreviewVisible(false);
  };
  const renderMediaItems = type => {
    return mediaItems
      .filter(media => media.type === type)
      .map((media, index) => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            key={media.id}
            style={styles.imageIndexView}
            onPress={() => openPreview(media)}>
            <CustomText
              customTextStyle={styles.imageTxtStyle}
              title={`${type.charAt(0).toUpperCase() + type.slice(1)} ${
                index + 1
              }`}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteMediaItem(media.id)}>
            <Image source={Images.delete} style={styles.deleteImageStyle} />
          </TouchableOpacity>
        </View>
      ));
  };
  const VideoPreviewModal = ({isVisible, onClose, videoUrl}) => {
    return (
      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={onClose}
        style={{flex: 1}}>
        <View style={styles.modalPreview}>
          <CustomText
            title={'Video Preview'}
            customTextStyle={styles.headingText}
          />

          <Video
            source={{uri: videoUrl}}
            style={styles.videoStyle}
            controls={true}
            mute
            resizeMode="contain"
          />

          <View style={styles.btnModalView}>
            <CustomButton
              title={'Close'}
              customBtnStyle={styles.previewModalBtn}
              onBtnPress={onClose}
            />
          </View>
        </View>
      </Modal>
    );
  };
  const onChangeInput = (val, id, fieldDetails) => {
    let myData = inputRef.current;

    const newData = myData.map((obj, i) => {
      if (stepNumberRef.current - 1 === i) {
        const fieldsData = obj?.workflowFields?.map((item, index) => {
          if (id === index) {
            return {...item, value: val.toString()};
          }
          return item;
        });
        return {...obj, workflowFields: fieldsData};
      }
      return obj;
    });

    if (newData.length) {
      setInput([...newData]);
      inputRef.current = [...newData];
    }
  };

  const openReportModal = () => {
    setReport(true); // Set report state to true to open the modal
  };

  const navigateToReportJobs = () => {
    setReport(!report);
    navigation.navigate('ReportJobs', {jobId: jobId, subJobId}); // Navigate to ReportJobs screen
  };

  const validateFields = () => {
    const myData = input[stepNumber - 1]?.workflowFields;

    let shouldSubmit = false;
    let element;

    for (let index = 0; index < myData?.length; index++) {
      element = myData[index];

      if (!element.value && element.isMandetory) {
        shouldSubmit = false;
        break;
      } else {
        shouldSubmit = true;
      }
    }

    if (myData?.length === 0) {
      return true;
    } else if (!shouldSubmit) {
      return false;
    } else if (stepNumber === numberOfSteps) {
      return true;
    } else {
      return true;
    }
  };

  const stepComplete = () => {
    if (stepNumber === 1 && riskInJob ? !isRead : '') {
      alert('You have not read the risks yet.');
      return;
    }
    if (!validateFields()) {
      setIsvisible(!isVisible);
      return;
    } else if (stepNumber === numberOfSteps) {
      onCompletingSteps(input);
    } else {
      onCompletingSteps('');
      stepNumberRef.current = stepNumberRef.current + 1;
    }
  };

  const noWorkflow = () => {
    noWorkFlowSteps();
  };
  const stepBack = () => {
    setStepNumber(stepNumber - 1);
    stepNumberRef.current = stepNumberRef.current - 1;
  };

  const riskModal = () => {
    setRiskOnJob(!riskOnJob);
    isRead = true;
  };

  const onAgreeRisk = () => {
    if (isRead === true) {
      setIsChecked(!isChecked);
    } else {
      Alert.alert('Go to risk job profile');
    }
  };

  const renderItems = (data, i) => {
    if (i === 0 && data.type === 'Checkbox') {
      return (
        <>
          <View style={styles.headView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <CustomText title={data.name} />

              <TouchableOpacity
                onPress={() => setOpenAttachment(!openAttachment)}>
                <Image
                  source={Images.attachment}
                  style={{
                    height: verticalScale(24),
                    width: horizontalScale(24),
                    marginHorizontal: horizontalScale(4),
                  }}
                />
                {/* <CustomText title={data.attachment} /> */}
              </TouchableOpacity>
            </View>
            <Switch
              trackColor={{
                false: COLOR.SECONDARY,
                true: COLOR.SWITCH_GREEN,
              }}
              thumbColor={
                Boolean(data.value) ? COLOR.SECONDARY : COLOR.SECONDARY
              }
              ios_backgroundColor={COLOR.SECONDARY}
              onValueChange={() => {
                onChangeInput(
                  data.value === '-' ? true : !(data.value === 'true'),
                  i,
                  data,
                );
              }}
              value={data.isMandetory === true ? true : data.value === 'true'}
            />
          </View>
          <View style={styles.content} />
        </>
      );
    } else if (data.type === 'Lable') {
      return (
        <>
          <View style={styles.noteView}>
            <CustomText
              title={strings.note}
              customTextStyle={styles.tyreCheckNote}
            />
            <CustomText
              title={data.value}
              customTextStyle={styles.tyreCheckNoteText}
            />
          </View>
        </>
      );
    } else if (data.type === 'Text' || data.type === 'TextArea') {
      return (
        <>
          <CustomTextInput
            label={data.name}
            anySign={data.isMandetory ? '*' : ''}
            customSignStyle={styles.signStyle}
            placeholder={strings.enterText}
            value={data.value}
            onChangeText={(text, index) => onChangeInput(text, index)}
            isRecorder
            index={i}
            saveIndex={v => (selectedIndex.current = v)}
            isMultiline
          />
        </>
      );
    } else if (data.type === 'PickList') {
      let options = data.options.split(', ');
      options = options.map(v => {
        return {
          name: v,
          id: Date.now(),
        };
      });
      return (
        <>
          <CustomDropdown
            label={data.name}
            anySign={data.isMandetory ? '*' : ''}
            customSignStyle={styles.signStyle}
            value={data.value}
            renderRightIcon={Images.dropdownImg}
            labelField="name"
            valueField="name"
            placeholder={'Select'}
            search={true}
            dropDowndata={options}
            onChangeInput={(text, index) => onChangeInput(text, index)}
            index={i}
          />
        </>
      );
    } else if (data.type === 'Table') {
      return (
        <>
          <CustomTextInput
            label={data.name}
            anySign={data.isMandetory ? '*' : ''}
            customSignStyle={styles.signStyle}
            placeholder={strings.uploadPhotoAndVideo}
            isMultiline={true}
            value={upload}
            isImages={true}
            inputStyle={{width: '80%'}}
            isRightIcon={Images.camera}
            onRightIconClick={() => onCapturePhoto()}
            isSecondImage={Images.docCapture}
            onSecondImageClick={() => onCaptureDocs()}
            onChangeText={text => setUpload(upload)}
          />
          <View style={styles.mediaContainer}>
            <View>{renderMediaItems('photo')}</View>
            <View>{renderMediaItems('video')}</View>
            <View>{renderMediaItems('document')}</View>
            <VideoPreviewModal
              isVisible={previewVideoVisible}
              onClose={() => setPreviewVideoVisible(false)}
              videoUrl={previewMedia?.url}
            />

            {previewMedia?.type === 'document' && <Text>Hello</Text>}
            <View>
              {previewVisible && previewMedia?.type === 'photo' && (
                <Modal
                  visible={previewVisible}
                  transparent={true}
                  onRequestClose={closePreview}
                  style={{flex: 1}}>
                  <View style={styles.modalPreview}>
                    <CustomText
                      title={'Preview'}
                      customTextStyle={styles.headingText}
                    />

                    <Image
                      source={{uri: previewMedia?.url}}
                      style={styles.imageStyle}
                    />
                    <View style={styles.btnModalView}>
                      <CustomButton
                        title={strings.close}
                        customBtnStyle={styles.previewModalBtn}
                        onBtnPress={closePreview}
                      />
                    </View>
                  </View>
                </Modal>
              )}
            </View>
          </View>
        </>
      );
    } else if (data.type === 'Button') {
      return (
        <CustomButton
          title={data.name}
          customBtnStyle={{
            marginTop: verticalScale(30),
            marginHorizontal: horizontalScale(20),
          }}
          onBtnPress={() => {}}
        />
      );
    } else if (data.type === 'Time') {
      return (
        <>
          <CustomTextInput
            label={data.name}
            anySign={data.isMandetory ? '*' : ''}
            customSignStyle={styles.signStyle}
            placeholder={data.name}
            isMultiline={true}
            value={data.value}
            isImages={true}
            inputStyle={{width: '80%'}}
            isRightIcon={Images.clock}
            onRightIconClick={() => setOpenTimePicker(true)}
            onChangeText={(text, index) => onChangeInput(text, index)}
            index={i}
            editable={false}
            openPicker={openTimePicker}
            date={time}
            setOpenPicker={setOpenTimePicker}
            mode="time"
            setDateTime={setTime}
            isDatePicker
            format="hh:mm:ss a"
          />
        </>
      );
    } else if (data.type === 'Date') {
      return (
        <>
          <CustomTextInput
            label={data.name}
            anySign={data.isMandetory ? '*' : ''}
            customSignStyle={styles.signStyle}
            placeholder={data.name}
            isMultiline={true}
            value={data.value}
            isImages={true}
            inputStyle={{width: '80%'}}
            isRightIcon={Images.calendar}
            onRightIconClick={() => setOpenDatePicker(true)}
            onChangeText={(text, index) => onChangeInput(text, index)}
            index={i}
            editable={false}
            openPicker={openDatePicker}
            date={date}
            setOpenPicker={setOpenDatePicker}
            mode="date"
            setDateTime={setDate}
            isDatePicker
            format="DD/MM/YYYY"
          />
        </>
      );
    } else if (data.type === 'Signature') {
      return (
        <CommonSignature
          // onChangeText={(result, index) => onChangeInput(result, index)}
          index={i}
          label={data.name}
          anySign={data.isMandetory ? '*' : ''}
          customSignStyle={styles.signStyle}
          signature={signature}
          setSignature={setSignature}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={goBack}
        // rightButton={true}
        rightImage={Images.Report}
        title={strings.jobWorkFlow}
        containerFlex={0.1}
        rightButtonPress={openReportModal}
      />
      <View style={styles.headingContainer}>
        {stepNumber > 1 ? (
          <TouchableOpacity
            style={[styles.stepNavigationBtn]}
            onPress={stepBack}>
            <Text style={[styles.stepNavigationText]}>Previous</Text>
          </TouchableOpacity>
        ) : (
          <View style={{opacity: 0}}>
            <Text>Previous</Text>
          </View>
        )}

        <CustomText
          title={stepData[stepNumber - 1]?.name}
          customTextStyle={{
            textAlign: 'center',
            color: COLOR.SECONDARY,
            fontSize: FONTSIZE.SEMI_MEDIUM,
          }}
        />

        {stepNumber !== numberOfSteps ? (
          <TouchableOpacity
            style={styles.stepNavigationBtn}
            onPress={stepComplete}>
            <Text style={styles.stepNavigationText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <View style={{opacity: 0}}>
            <Text>Next</Text>
          </View>
        )}
      </View>

      <View style={styles.innerContainer}>
        {stepData?.length > 0 ? (
          <KeyboardAwareScrollView
            enableAutomaticScroll={true}
            keyboardShouldPersistTaps={'handled'}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.card}
            nestedScrollEnabled={true}>
            {riskInJob && stepNumber === 1 ? (
              <View style={styles.riskView}>
                <CustomText
                  title={strings.risk}
                  customTextStyle={styles.tyreCheckNote}
                />
                <View style={{flexDirection: 'row'}}>
                  <CheckBox
                    style={{
                      paddingHorizontal: horizontalScale(10),
                      paddingVertical: verticalScale(8),
                    }}
                    onClick={() => {
                      riskInJob ? onAgreeRisk() : {};
                    }}
                    isChecked={isChecked}
                    uncheckedCheckBoxColor={COLOR.PRIMARY_BLUE}
                    checkedCheckBoxColor={COLOR.PRIMARY_BLUE}
                  />
                  <CustomText
                    title={strings.riskInJob}
                    isTouchable={true}
                    onTextPress={() => setRiskOnJob(!riskOnJob)}
                    customTextStyle={styles.riskJobStyle}
                  />
                </View>
              </View>
            ) : null}
            {input[stepNumber - 1]?.workflowFields?.map((data, i) => {
              return (
                <View key={i} style={{flex: 1}}>
                  {renderItems(data, i)}
                </View>
              );
            })}

            <CustomButton
              title={
                stepNumber === numberOfSteps
                  ? strings.completeJob
                  : strings.completeSteps
              }
              customBtnStyle={{
                marginTop: verticalScale(30),
                marginHorizontal: horizontalScale(20),
              }}
              onBtnPress={stepComplete}
            />
          </KeyboardAwareScrollView>
        ) : workflowDetailStarted ? null : (
          <View style={{flex: 1}}>
            <>
              <CustomText
                title={'No Workflow'}
                customTextStyle={{
                  textAlign: 'center',
                  marginVertical: verticalScale(20),
                }}
              />
              <CustomButton
                title={strings.completeJob}
                customBtnStyle={{
                  marginTop: verticalScale(30),
                  marginHorizontal: horizontalScale(20),
                }}
                onBtnPress={noWorkflow}
              />
            </>
          </View>
        )}
      </View>

      {isVisible && (
        <CustomModal
          isVisible={isVisible}
          btn1Title={strings.ok}
          modalTitle={strings.pleaseCompleteFields}
          customBtn1Style={styles.modalBtn}
          isBtn={true}
          onBtn1Press={() => setIsvisible(!isVisible)}
        />
      )}
      {/* {riskOnJob && (
        <CustomModal
          isVisible={riskOnJob}
          btn1Title={strings.ok}
          modalTitle={riskInJob.riskDescription}
          titleCustomStyle={{
            fontSize: FONTSIZE.SMALL_MEDIUM,
          }}
          customBtn1Style={styles.modalBtn}
          isBtn={true}
          onBtn1Press={() => setRiskOnJob(!riskOnJob)}
        />
      )} */}
      {riskOnJob && (
        <RiskModal
          isVisible={riskOnJob}
          btnTitle={'Ok'}
          riskModalTitle={riskInJob.riskDescription}
          titleCustomStyle={{textAlign: 'center'}}
          onBtnPress={() => riskModal()}
          modalContext={riskInJob.usersManual}
          userManualTitle={'User Manual'}
          userManualtitleCustomStyle={{
            marginHorizontal: horizontalScale(20),
            fontFamily: FONTS.SEMIBOLD,
          }}
          customBtnStyle={styles.modalBtn}
        />
      )}
      {openPhoto && (
        <CustomModal
          customModalContainer={{width: '90%'}}
          isVisible={openPhoto}
          btn1Title={strings.ok}
          modalTitle={strings.capturePhotoAndVideo}
          isAnyImage={true}
          isSecondImage={true}
          imageA={Images.imageUpload}
          onImageAPress={() => askforPermission('camera')}
          imageB={Images.videoUpload}
          onImageBPress={() => askforPermission('video')}
          customBtn1Style={styles.modalBtn}
          isBtn={true}
          onBtn1Press={() => setOpenPhoto(!openPhoto)}
        />
      )}
      {openDocs && (
        <CustomModal
          isVisible={openDocs}
          btn1Title={strings.ok}
          modalTitle={strings.uploadDocs}
          isAnyImage={true}
          imageA={Images.documentUpload}
          onImageAPress={() => handleDocumentSelection()}
          customImgContainer={{alignSelf: 'center'}}
          customBtn1Style={styles.modalBtn}
          isBtn={true}
          onBtn1Press={() => setOpenDocs(!openDocs)}
        />
      )}

      {report && (
        <CustomModal
          isVisible={report}
          isImage={Images.reportmodel}
          modalTitle={strings.report}
          isTwoBtns={true}
          btn1Title={strings.cancel}
          onBtn1Press={() => {
            // onCancelGeoFenceAlert();
            setReport(!report);
          }}
          btn2Title={strings.Report}
          onBtn2Press={navigateToReportJobs}
        />
      )}
      {openAttachment && (
        <AttachmentModal
          isVisible={openAttachment}
          customModalContainer={{backgroundColor: 'red'}}
          modalHeader={'Work Flow Guide Tips'}
          modalContext={filePath}
          // attachmentDescription={work}
          image={Images.close}
          onImagePress={() => setOpenAttachment(!openAttachment)}
        />
      )}
    </View>
  );
};

export default WorkflowCommon;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.PRIMARY_BLUE},
  headingContainer: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingBottom: '3%',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  headView: {
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    borderWidth: 0.5,
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(10),
    borderColor: COLOR.SECONDARY_OPACITY,
  },
  noteView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR.RED_OPACITY,
    borderRadius: moderateScale(8),
    marginHorizontal: horizontalScale(20),
    flexWrap: 'wrap',
    marginTop: verticalScale(20),
  },
  tyreCheckNote: {
    color: COLOR.RED,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(7),
    fontSize: FONTSIZE.SEMI_MEDIUM,
  },
  tyreCheckNoteText: {
    // width: '50%',
    color: COLOR.RED,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(7),
    fontSize: FONTSIZE.SEMI_MEDIUM,
  },
  riskView: {
    borderWidth: 1,
    borderColor: COLOR.RED_OPACITY,
    borderRadius: moderateScale(8),
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
  },
  riskJobStyle: {
    color: COLOR.PRIMARY,
    paddingVertical: verticalScale(7),
    paddingHorizontal: horizontalScale(7),
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    textDecorationLine: 'underline',
  },
  photoContainer: {
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    marginTop: verticalScale(30),
    width: '40%',
    alignSelf: 'center',
  },
  imageIndexView: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    alignItems: 'center',
    // backgroundColor:'red'
  },
  imageTxtStyle: {
    color: COLOR.PRIMARY_BLUE,
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    textDecorationLine: 'underline',
  },
  deleteImageStyle: {
    resizeMode: 'contain',
    marginTop: verticalScale(18),
  },
  mediaContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  column: {},
  stepNavigationBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNavigationText: {
    color: '#fff9',
    fontFamily: FONTS.BLACK,
    fontSize: FONTSIZE.SEMI_MEDIUM,
  },
  modalPreview: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModalView: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    justifyContent: 'flex-end',
  },
  previewModalBtn: {
    marginTop: verticalScale(30),
    width: '40%',
    alignSelf: 'center',
    marginHorizontal: horizontalScale(20),
  },
  imageStyle: {
    width: '95%',
    height: '70%',
    borderRadius: moderateScale(20),
  },
  headingText: {
    fontSize: FONTSIZE.MEDIUM,
    fontFamily: FONTS.BOLD,
    color: COLOR.PRIMARY_BLUE,
    marginBottom: verticalScale(30),
  },
  videoStyle: {
    width: '100%',
    height: '80%', // Set the width to 100% of the container
    aspectRatio: 16 / 9, // Set the aspect ratio for the video
    // Add any other styles you want for the video component
  },
  signStyle: {
    position: 'absolute',
    bottom: verticalScale(5),
    color: COLOR.RED,
  },
});
