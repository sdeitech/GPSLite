import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from '../../helpers/ResponsiveFonts';
import CustomText from './CustomText';
import GLOBALS from '../../constants/index';
const {COLOR, FONTS, FONTSIZE} = GLOBALS;

const CommonProfile = ({title, description}) => {
  return (
    <View style={{marginVertical: verticalScale(5)}}>
      <CustomText
        title={title}
        customTextStyle={{
          fontSize: FONTSIZE.SEMI_MEDIUM2,
          color: COLOR.TRANSPARENT_OPACITY,
        }}
      />
      <CustomText
        title={description}
        customTextStyle={{
          width: '60%',
          fontSize: FONTSIZE.MEDIUM,
          marginVertical: verticalScale(5),
        }}
      />
    </View>
  );
};

export default CommonProfile;

const styles = StyleSheet.create({});
