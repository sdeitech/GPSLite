import Images from '@assets/images';
import CustomText from '@components/common/CustomText';
import COLOR from '@constants/colors';
import FONTSIZE from '@constants/fontSize';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
const CustomInputToolbar = props => {
  const {
    audioVariation = false,
    isRecording,
    stopRecording = () => {},
    startRecording = () => {},
    onSend,
    recordingTime,
  } = props;
  // console.log('isRecording-=====>>>>>', isRecording, recordingTime);
  const [inputText, setInputText] = useState('');
  const [inputHeight, setInputHeight] = React.useState(40);
  const handleSend = () => {
    if (inputText.trim().length > 0) {
      onSend([
        {
          text: audioVariation ? audioVariation : inputText,
          user: {_id: 1},
          createdAt: new Date(),
        },
      ]);
      setInputText('');
    }
  };
  const formatTime = milliseconds => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours > 0 ? hours + ':' : ''}${
      minutes < 10 ? '0' : ''
    }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleContentSizeChange = event => {
    // Update the input field height based on its content size
    setInputHeight(event.nativeEvent.contentSize.height);
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      // keyboardVerticalOffset={Platform.select({ios: 500, android: 500})}
      keyboardVerticalOffset={500}>
      <View style={styles.inputBox}>
        {audioVariation && (
          <View style={styles.recordingContainer}>
            <Image
              source={Images.recordingMic}
              resizeMode="contain"
              style={styles.micImage}
            />
            <CustomText title={'Recording...'} />
            <CustomText title={formatTime(recordingTime)} />
          </View>
        )}
        <TextInput
          style={styles.textInput}
          placeholder={isRecording ? '' : 'Message'}
          multiline={true}
          value={inputText}
          placeholderTextColor={COLOR.PRIMARY}
          onChangeText={setInputText}
          onContentSizeChange={handleContentSizeChange}
        />
        {inputText.trim().length > 0 && (
          <TouchableOpacity onPress={handleSend}>
            <Image source={Images.send} style={styles.sendButton} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => (isRecording ? stopRecording() : startRecording())}>
          <Image
            source={Images.mic}
            style={styles.recorderImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CustomInputToolbar;
const styles = StyleSheet.create({
  inputBox: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(40),
    backgroundColor: COLOR.BACKGROUND_GREY,
    marginHorizontal: horizontalScale(10),
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 10,
    flexDirection: 'row',
  },
  recordingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: horizontalScale(10),
  },
  cameraImage: {
    marginVertical: verticalScale(10),
    height: verticalScale(30),
    width: horizontalScale(30),
    tintColor: '#666',
  },
  recorderImage: {
    marginVertical: verticalScale(10),
    height: verticalScale(30),
    width: horizontalScale(30),
    tintColor: '#666',
  },
  textInput: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    paddingVertical: Platform.OS === 'ios' ? verticalScale(20) : null,
    marginLeft: horizontalScale(20),
  },
  sendButton: {
    height: verticalScale(25),
    width: horizontalScale(25),
    tintColor: '#666',
    marginRight: horizontalScale(10),
  },
});
