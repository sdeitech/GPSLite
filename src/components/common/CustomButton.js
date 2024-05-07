import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import COLOR from '../../constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../helpers/ResponsiveFonts';
import FONTS from '../../constants/fonts';
import FONTSIZE from '../../constants/fontSize';
const CustomButton = props => {
  let {
    customBtnStyle = {},
    customBtnText = {},
    isImage,
    title = '',
    onBtnPress = () => {},
    btnImgStyle = {},
  } = props;
  return (
    <TouchableOpacity
      style={[styles.btnContainer, customBtnStyle]}
      onPress={() => onBtnPress()}>
      {isImage && <Image source={isImage} style={btnImgStyle} />}
      <Text style={[styles.btnText, customBtnText]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLOR.PRIMARY_BLUE,
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
  },
  btnText: {
    color: COLOR.SECONDARY,
    fontSize: FONTSIZE.MEDIUM,
    textAlign: 'center',
    fontFamily: FONTS.MEDIUM,
  },
});
