/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../helpers/ResponsiveFonts';
import GLOBALS from '../../constants/index';
import FONTS from '../../constants/fonts';
import CustomText from './CustomText';
import Images from '../../assets/images';
import SpeechToTextService from '../../helpers/SpeechToTextService';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
const {COLOR, FONTSIZE} = GLOBALS;

const CustomTextInput = (props, ref) => {
  let {
    label = '',
    placeholder = '',
    error = false,
    errorMessage = '',
    value = '',
    anySign = '',
    customSignStyle = '',
    keyboardType = 'default',
    isImages = false,
    image1 = '',
    image2 = '',
    labelView = '',
    isSecondImage,
    onSecondImageClick = () => {},
    onImage1Press = () => {},
    onImage2Press = () => {},
    onChangeText = () => {},
    inputStyle = {},
    inputContainer = {},
    isRightIcon,
    onRightIconClick = () => {},
    secureTextEntry = false,
    onKeyPress = () => {},
    editable = true,
    isMultiline = false,
    inputContainerStyle = {},
    isRecorder,
    index,
    saveIndex,
    setOpenPicker,
    mode,
    setDateTime,
    isDatePicker,
    openPicker,
    date,
    format,
  } = props;

  const startRecognition = i => {
    saveIndex(i);
    SpeechToTextService.startSpeechRecognition();
  };

  const stopRecognition = i => {
    SpeechToTextService.stopSpeechRecognition();
  };

  return (
    <>
      <View style={[styles.containerStyle, inputContainer]}>
        {label && (
          // <View style={styles.textInputStyle}>
          //   <View style={labelView}>
          //     <Text style={styles.inputLabel}>{label}</Text>
          //   </View>
          //   {isImages && image1 && (
          //     <View style={styles.imageViewStyle}>
          //       <TouchableOpacity onPress={onImage1Press}>
          //         <Image source={image1} />
          //       </TouchableOpacity>
          //       {image2 && (
          //         <TouchableOpacity onPress={onImage2Press}>
          //           <Image source={image2} />
          //         </TouchableOpacity>
          //       )}
          //     </View>
          //   )}
          // </View>
          <View style={{flexDirection: 'row'}}>
            <CustomText title={label} customTextStyle={{}} />
            {anySign && (
              <CustomText title={anySign} customTextStyle={customSignStyle} />
            )}
          </View>
        )}
        <View
          style={[
            styles.contentStyle,
            inputContainerStyle,
            {
              flexDirection: isRightIcon || isRecorder ? 'row' : '',
              justifyContent: isRightIcon || isRecorder ? 'space-between' : '',
            },
          ]}>
          <TextInput
            editable={editable}
            ref={ref}
            autoCapitalize="none"
            style={[styles.inputTextStyle, inputStyle]}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor={COLOR.DARK_GREY}
            selectionColor={COLOR.PRIMARY}
            onKeyPress={onKeyPress}
            onChangeText={txt => onChangeText(txt, index)}
            secureTextEntry={secureTextEntry}
            multiline={isMultiline}
          />

          {isDatePicker && (
            <DatePicker
              modal
              open={openPicker}
              date={date}
              onConfirm={date => {
                onChangeText(moment(date).format(format), index);
                setOpenPicker(false);
                setDateTime(date);
              }}
              onCancel={() => {
                setOpenPicker(false);
              }}
              mode={mode}
            />
          )}

          {isRecorder ? (
            <Pressable
              onPressIn={() => startRecognition(index)}
              onPressOut={stopRecognition}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={Images.mic} style={styles.imageStyle} />
            </Pressable>
          ) : null}
          {isRightIcon ? (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={onRightIconClick}
                style={{alignSelf: 'center'}}>
                <Image
                  source={isRightIcon}
                  style={styles.imageStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              {isSecondImage && (
                <TouchableOpacity
                  onPress={onSecondImageClick}
                  style={{alignSelf: 'center'}}>
                  <Image
                    source={isSecondImage}
                    style={styles.imageStyle}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : null}
        </View>
      </View>
      {error ? (
        <CustomText
          title={errorMessage}
          customTextStyle={{color: COLOR.BTN_RED, marginHorizontal: 20}}
        />
      ) : null}
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
    backgroundColorL: 'blue',
  },
  inputLabel: {
    fontSize: FONTSIZE.MEDIUM,
    fontFamily: FONTS.NORMAL,
    color: COLOR.PRIMARY,
    width: '100%',
  },
  textInputStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageViewStyle: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentStyle: {
    marginTop: verticalScale(10),
    backgroundColor: COLOR.TEXTINPUT,
    borderRadius: moderateScale(50),
  },
  inputTextStyle: {
    width: '90%',
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.MEDIUM,
    color: COLOR.BLACK_TEXT,
  },
  imageStyle: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginRight: horizontalScale(13),
  },
});
