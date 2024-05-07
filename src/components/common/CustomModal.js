/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import GLOBALS from '../../constants/index';
import CustomText from './CustomText';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../helpers/ResponsiveFonts';
import CustomButton from './CustomButton';
import {ScrollView} from 'react-native-gesture-handler';
import CustomTextInput from './CustomTextInput';
// import Images from '@assets/images';
const {COLOR, FONTS, FONTSIZE} = GLOBALS;

const CustomModal = props => {
  let {
    isVisible,
    isImage,
    customModalContainer = '',
    animationType = '',
    transparent = true,
    modalTitle = '',
    bars = [],
    subTitleImage,
    modalSubTitle = '',
    customDescriptionStyle = '',
    modalImageStyle = '',
    placeholderValue = '',
    isTextInput = false,
    modalLabel = '',
    modalValue = '',
    onChangeValue = () => {},
    titleCustomStyle = '',
    modalDescription = '',
    descriptionImage = '',
    subTitleCustomStyle = '',
    btn1Title = '',
    btn2Title = '',
    isBtn = false,
    isAnyImage = false,
    isSecondImage = false,
    imageA = '',
    isFromServer = false,
    isSecondFromServer = false,
    onImageAPress = () => {},
    serverImageCustomStyle = '',
    imageCustomStyle = '',
    imageB = '',
    isAnotherImage = '',
    onImageBPress = () => {},
    customImgContainer = '',
    onBtn1Press = () => {},
    onBtn2Press = () => {},
    customBtn1Style = {},
    customBtn2Style = {},
    isTwoBtns = false,
    anotherImgStyle = '',
    anotherDescription = '',
    onAnotherImgPress = () => {},
    disabled,
    descriptionTimer = '',
    hitSlop = '',
    recordingStarted = false,
  } = props;

  const [animatedValue] = useState(new Animated.Value(0));
  const translateY = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  const Bar = ({bar}) => {
    return (
      <View
        style={[
          styles.bar,
          {
            height: `${(bar * 100) / 30 + 100}%`, //dividing by 30 because range is staying between 0 and -30
          },
        ]}
      />
    );
  };

  return (
    <View>
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={isVisible}>
        <View style={styles.modal}>
          <View style={[styles.modalContainer, customModalContainer]}>
            <ScrollView style={{marginVertical: verticalScale(20)}}>
              {isTextInput && (
                <CustomTextInput
                  label={modalLabel}
                  value={modalValue}
                  placeholder={placeholderValue}
                  isMultiline={true}
                  onChangeText={onChangeValue}
                  inputContainer={{
                    marginHorizontal: 10,
                    marginTop: verticalScale(0),
                  }}
                  inputContainerStyle={{
                    height: verticalScale(100),
                    borderRadius: moderateScale(10),
                  }}
                />
              )}
              {isImage && (
                <TouchableOpacity>
                  <Image
                    source={isImage}
                    resizeMode={'contain'}
                    style={[
                      {
                        alignSelf: 'center',
                        height: verticalScale(68),
                        width: horizontalScale(68),
                      },
                      modalImageStyle,
                    ]}
                  />
                </TouchableOpacity>
              )}
              {modalTitle && (
                <CustomText
                  title={modalTitle}
                  customTextStyle={[styles.titleStyle, titleCustomStyle]}
                />
              )}
              {modalSubTitle && (
                <CustomText
                  title={modalSubTitle}
                  customTextStyle={[styles.subTitleStyle, subTitleCustomStyle]}
                />
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: verticalScale(5),
                }}>
                {modalDescription && (
                  <CustomText
                    title={modalDescription}
                    customTextStyle={[
                      styles.descriptionStyle,
                      customDescriptionStyle,
                    ]}
                  />
                )}
                {descriptionImage && <Image source={descriptionImage} />}
              </View>
              {isAnyImage && (
                <View style={[styles.imagesContainer, customImgContainer]}>
                  <TouchableOpacity
                    style={styles.uploadContainer}
                    onPress={onImageAPress}>
                    {isFromServer ? (
                      <Image
                        source={{uri: imageA}}
                        style={[
                          styles.serverImageStyle,
                          serverImageCustomStyle,
                        ]}
                      />
                    ) : (
                      <Image
                        source={imageA}
                        style={[styles.imageStyle, imageCustomStyle]}
                      />
                    )}
                  </TouchableOpacity>
                  {isSecondImage && (
                    <TouchableOpacity
                      style={styles.uploadContainer}
                      onPress={onImageBPress}>
                      {isSecondFromServer ? (
                        <Image
                          source={{uri: imageB}}
                          style={[
                            styles.serverImageStyle,
                            serverImageCustomStyle,
                          ]}
                        />
                      ) : (
                        <Image
                          source={imageB}
                          style={[styles.imageStyle, imageCustomStyle]}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {/* {isAnotherImage && (
                <TouchableOpacity
                  style={anotherImgStyle}
                  hitSlop={hitSlop}
                  onLongPress={onAnotherImgPress}
                  disabled={disabled}>
                  <Animated.Image
                    style={{transform: [{translateY}], alignSelf: 'center'}}
                    source={isAnotherImage}
                  />
                </TouchableOpacity>
              )} */}
              {isAnotherImage &&
                (recordingStarted ? (
                  <View style={styles.barsContainer}>
                    {bars.map((bar, index) => (
                      <Bar key={index} bar={bar} />
                    ))}
                  </View>
                ) : (
                  <TouchableOpacity
                    style={anotherImgStyle}
                    hitSlop={hitSlop}
                    onPress={onAnotherImgPress}
                    disabled={disabled}>
                    <Animated.Image
                      style={{
                        transform: [{translateY}],
                        alignSelf: 'center',
                        tintColor: '#00AB66',
                      }}
                      source={isAnotherImage}
                    />
                  </TouchableOpacity>
                ))}

              {anotherDescription && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <CustomText
                    title={anotherDescription}
                    customTextStyle={{
                      color: COLOR.TEXT_GREY,
                      fontSize: FONTSIZE.SEMI_MEDIUM,
                      fontFamily: FONTS.LIGHT,
                      marginRight: horizontalScale(10),
                    }}
                  />
                  <CustomText
                    title={descriptionTimer}
                    customTextStyle={{
                      color: COLOR.ORANGE_WELFARE,
                      fontSize: FONTSIZE.SEMI_MEDIUM,
                      fontFamily: FONTS.LIGHT,
                    }}
                  />
                </View>
              )}

              {isTwoBtns && (
                <View style={styles.btnModalView}>
                  <CustomButton
                    title={btn1Title}
                    customBtnStyle={[styles.modalBtnStyle, customBtn1Style]}
                    onBtnPress={onBtn1Press}
                  />
                  <CustomButton
                    title={btn2Title}
                    customBtnStyle={[styles.modalBtn2Style, customBtn2Style]}
                    onBtnPress={onBtn2Press}
                  />
                </View>
              )}

              {isBtn && (
                <CustomButton
                  title={btn1Title}
                  customBtnStyle={[styles.singleBtnStyle, customBtn1Style]}
                  onBtnPress={onBtn1Press}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.TRANSPARENT_OPACITY,
  },
  modalContainer: {
    width: '80%',
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
  btnModalView: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    justifyContent: 'space-around',
  },
  singleBtnStyle: {
    marginTop: verticalScale(20),
  },
  titleStyle: {
    fontSize: FONTSIZE.SECONDARY_HEADING,
    textAlign: 'center',
    fontFamily: FONTS.MEDIUM,
    paddingTop: verticalScale(15),
  },
  subTitleStyle: {
    fontSize: FONTSIZE.LARGE,
    textAlign: 'center',
    fontFamily: FONTS.MEDIUM,
    paddingVertical: verticalScale(10),
  },
  descriptionStyle: {
    color: COLOR.LIGHT_GREY,
    textAlign: 'center',
    fontSize: FONTSIZE.MEDIUM,
    // marginVertical: verticalScale(8),
  },
  imagesContainer: {
    marginTop: verticalScale(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: COLOR.PURPLE_OPACITY,
    borderRadius: moderateScale(10),
    marginHorizontal: horizontalScale(10),
    borderStyle: 'dashed',
  },
  imageStyle: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    marginHorizontal: horizontalScale(40),
    marginVertical: verticalScale(40),
    resizeMode: 'contain',
  },
  serverImageStyle: {
    borderRadius: moderateScale(10),
    height: 110,
    width: 120,
  },
  timerInput: {
    borderRadius: 10,
    width: 60,
  },
  modalBtnStyle: {
    width: '40%',
    backgroundColor: COLOR.SAFETY_GREEN,
  },
  modalBtn2Style: {
    width: '40%',
    backgroundColor: COLOR.ORANGE,
  },
  bar: {
    backgroundColor: COLOR.PRIMARY_BLUE,
    width: horizontalScale(5),
    borderRadius: moderateScale(12),
    minHeight: verticalScale(15),
    marginLeft: verticalScale(5),
  },
  barsContainer: {
    height: verticalScale(65),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginVertical: verticalScale(5),
  },
});
