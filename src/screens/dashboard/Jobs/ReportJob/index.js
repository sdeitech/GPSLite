/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {Text, View, Image, Modal, Linking} from 'react-native';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {horizontalScale, verticalScale} from '@helpers/ResponsiveFonts';

import FONTSIZE from '@constants/fontSize';
import {useFocusEffect} from '@react-navigation/native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpeechToTextService from '@helpers/SpeechToTextService';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {checkAndRequestPermissions} from '@helpers/Permissions';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import CustomTextInput from '@components/common/CustomTextInput';
import CustomButton from '@components/common/CustomButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomModal from '@components/common/CustomModal';
import Images from '@assets/images';
import strings from '@constants/string';
import styles from './style';
import CustomHeader from '@components/common/CustomHeader';
import CustomText from '@components/common/CustomText';
import {jobDetail, jobSubJobs, reportJob} from 'src/redux/slice/jobSlice';
import {useDispatch, useSelector} from 'react-redux';
import RNFS from 'react-native-fs';
import {getCurrentLocation} from '@helpers/Permissions';
const ReportJobs = ({route, navigation, isVisible, setIsvisible}) => {
  const goBack = () => {
    navigation.goBack();
  };
  const [reportNote, setReportNote] = useState('');
  const [upload, setUpload] = useState();
  const [riskOnJob, setRiskOnJob] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openDocs, setOpenDocs] = useState(false);
  const [previewVideoVisible, setPreviewVideoVisible] = useState(false);
  const [mediaItems, setMediaItems] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [currLocation, setCurrLocation] = useState();
  const subJobs = useSelector(jobSubJobs);
  const dispatch = useDispatch();
  const {jobId, subJobId} = route.params;
  const jobData = useSelector(jobDetail);
  const selectedIndex = useRef(0);
  const handleValueChange = newValue => {
    // Perform your desired action when the value changes
    setReportNote(newValue);
  };

  useEffect(() => {
    locationCheck();
    return () => {
      SpeechToTextService.registerCallback(null);
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      SpeechToTextService.registerCallback(handleValueChange);
    }, []),
  );
  const locationCheck = async () => {
    const currentLocation = await getCurrentLocation();
    setCurrLocation(currentLocation);
  };
  console.log('currLocation=======>>>>>>>..', currLocation);
  const openCameraForPhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      try {
        const newMediaItem = {
          type: 'photo',
          name: 'image',
          path: image.path,
        };
        setMediaItems(newMediaItem);
      } catch (error) {}
    });
  };

  const deleteMediaItem = () => {
    setMediaItems(null); // or set to any other default value, e.g., setMediaItems('')
    // You can also reset any other related state if needed
  };
  const openCameraForVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    })
      .then(image => {
        if (!image) {
          return;
        }
        const newMediaItem = {
          type: 'video',
          name: 'video',
          path: image.path,
        };

        setMediaItems(newMediaItem);
        // saveVideoToStorage(image.path);
      })
      .catch(err => console.log(err, 'error in video capture'));
  };

  const saveVideoToStorage = videoPath => {
    try {
      // Fetch existing videos from localStorage
      const existingVideos = AsyncStorage.getItem('videos');

      const parsedVideos = existingVideos ? JSON.parse(existingVideos) : [];

      // Add the new video to the existing list
      const newVideo = {path: videoPath, timestamp: Date.now()};
      const updatedVideos = [...parsedVideos, newVideo];

      // Save the updated list back to localStorage
      AsyncStorage.setItem('videos', JSON.stringify(updatedVideos));
    } catch (error) {}
  };
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
        path: response[0].uri,
        id: Math.floor(Math.random() * 100000 + 1), // Generate a unique ID
      };

      setMediaItems(newMediaItem);
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

  const renderMediaItem = (media, type) => {
    if (!media || media.type !== type) {
      return null; // Return null if media is not of the specified type
    }

    return (
      <View style={{flexDirection: 'row'}} key={media.id}>
        <TouchableOpacity
          style={styles.imageIndexView}
          onPress={() => openPreview(media)}>
          <CustomText
            customTextStyle={styles.imageTxtStyle}
            title={`${type.charAt(0).toUpperCase() + type.slice(1)}`}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteMediaItem(media.id)}>
          <Image source={Images.delete} style={styles.deleteImageStyle} />
        </TouchableOpacity>
      </View>
    );
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
  const handleButtonPress = async () => {
    setReportNote('');
    setMediaItems([]);
    const base64Image = await RNFS.readFile(mediaItems.path, 'base64');
    const base64DataWithPrefix =
      mediaItems.type === 'photo'
        ? `data:${mediaItems.name};base64,${base64Image}`
        : mediaItems.type === 'video'
        ? `data:video/mp4;base64,${base64Image}`
        : `data:application/pdf;base64,${base64Image}`;
    const reportJobBody = {
      reportNote: reportNote,
      jobId: jobId,
      documentName: mediaItems.name,
      documentPath: base64DataWithPrefix,
      subJobId: subJobId,
      latitude: currLocation?.latitude,
      longitude: currLocation?.longitude,
    };
    console.log('reportJobBody=========>>>>>>>>', reportJobBody);
    dispatch(reportJob(reportJobBody))
      .then(res =>
        navigation.navigate('JobWorkFlow', {
          didJobStarted: true,
          workflowId: jobData?.workflow,
          jobID: jobId,
          subJobId: subJobId,
        }),
      )
      .catch(err => console.log('err', err));

    // navigation.navigate('Home'); // Replace 'OtherScreen' with the name of the screen you want to navigate to
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={goBack}
        title={strings.Reportjob}
      />

      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView
          enableAutomaticScroll={true}
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.card}
          nestedScrollEnabled={true}>
          <View style={{marginBottom: 10}}>
            <View style={{margin: 20, marginBottom: 5}}>
              <Text style={{fontSize: 20, color: 'black'}}>
                {strings.Reportjob}
              </Text>
            </View>
            <View
              style={{
                borderTopWidth: 0.5,
                borderColor: 'black',
                margin: 20,
                marginBottom: 5,
              }}
            />
            <>
              <CustomTextInput
                label={'Note'}
                placeholder={strings.enterText}
                value={reportNote}
                onChangeText={text => setReportNote(text)}
                isRecorder
                saveIndex={v => (selectedIndex.current = v)}
                isMultiline
              />
              <CustomTextInput
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
                <View>
                  {renderMediaItem(mediaItems, 'photo')}
                  {renderMediaItem(mediaItems, 'video')}
                  {renderMediaItem(mediaItems, 'document')}
                </View>

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
                          source={{uri: previewMedia?.path}}
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
            <CustomButton
              title={strings.Reportjob}
              customBtnStyle={{
                marginTop: verticalScale(30),
                marginHorizontal: horizontalScale(20),
              }}
              onBtnPress={handleButtonPress}
            />
          </View>
        </KeyboardAwareScrollView>
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
      {riskOnJob && (
        <CustomModal
          isVisible={riskOnJob}
          btn1Title={strings.ok}
          modalTitle={strings.riskDescription}
          titleCustomStyle={{
            fontSize: FONTSIZE.SMALL_MEDIUM,
          }}
          customBtn1Style={styles.modalBtn}
          isBtn={true}
          onBtn1Press={() => setRiskOnJob(!riskOnJob)}
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
    </View>
  );
};

export default ReportJobs;
