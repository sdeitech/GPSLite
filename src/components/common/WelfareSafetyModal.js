import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Modal, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import CustomButton from './CustomButton';
import {startRecording, stopRecording} from '@redux/slice/audioSlice';
import Images from '@assets/images';
import FONTSIZE from '@constants/fontSize';
import COLOR from '@constants/colors';
import {horizontalScale, moderateScale} from '@helpers/ResponsiveFonts';
import {
  handleStartRecording,
  handleStopRecording,
  handleStartPlaying,
  handleStopPlaying,
} from '@helpers/AudioService';

const audioRecorderPlayer = new AudioRecorderPlayer();

const WelfareSafetyModal = props => {
  const {
    isVisible,
    transparent = true,
    animationType = '',
    isImage = false,
    timerBtnPress = () => {},
  } = props;

  const dispatch = useDispatch();
  const isRecordingRedux = useSelector(state => state.audio.isRecording);
  const [recording, setRecording] = useState('');

  const handleStartRecordingPress = async () => {
    const res = await handleStartRecording();
    dispatch(startRecording(res));
    setRecording(res);
  };

  const handleStopRecordingPress = async () => {
    await handleStopRecording();
    dispatch(stopRecording());
  };

  const handleStartPlayingPress = async () => {
    await handleStartPlaying(recording);
  };

  const handleStopPlayingPress = async () => {
    await handleStopPlaying();
  };

  return (
    <View>
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.imagesView}>
              {isImage && (
                <TouchableOpacity onPress={handleStartPlayingPress}>
                  <Image
                    source={Images.mic}
                    resizeMode="contain"
                    style={styles.imgStyle}
                  />
                </TouchableOpacity>
              )}
              {isImage && (
                <Image
                  source={Images.clock}
                  resizeMode="contain"
                  style={styles.imgStyle}
                />
              )}
            </View>
            <View style={styles.btnsView}>
              <CustomButton
                customBtnStyle={{width: '40%'}}
                customBtnText={{fontSize: FONTSIZE.SMALLER}}
                title={isRecordingRedux ? 'Stop Recording' : 'Start Recording'}
                onBtnPress={
                  isRecordingRedux
                    ? handleStopRecordingPress
                    : handleStartRecordingPress
                }
              />
              <CustomButton
                customBtnStyle={{width: '40%'}}
                customBtnText={{fontSize: FONTSIZE.SMALLER}}
                title={'Select Timer'}
                onBtnPress={timerBtnPress}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.TRANSPARENT_OPACITY,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: COLOR.SECONDARY,
    paddingHorizontal: horizontalScale(20),
    borderRadius: moderateScale(20),
    shadowColor: COLOR.SHADOW_COLOR,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    maxHeight: '90%',
  },
  imagesView: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imgStyle: {
    alignSelf: 'center',
    height: 68,
    width: 68,
    tintColor: 'black',
  },
  btnsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
});

export default WelfareSafetyModal;
