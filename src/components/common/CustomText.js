import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../helpers/ResponsiveFonts';
import FONTS from '../../constants/fonts';
import COLOR from '../../constants/colors';
import FONTSIZE from '../../constants/fontSize';

const CustomText = props => {
  let {
    textContainer = {},
    title = '',
    customTextStyle = {},
    isTouchable = false,
    onTextPress = () => {},
  } = props;
  return (
    <View style={[styles.container, textContainer]}>
      {isTouchable ? (
        <TouchableOpacity onPress={() => onTextPress()}>
          <Text style={[styles.textStyle, customTextStyle]}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.textStyle, customTextStyle]}>{title}</Text>
      )}
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  container: {},
  textStyle: {
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.NORMAL,
    color: COLOR.PRIMARY,
  },
});
