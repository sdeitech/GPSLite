/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Slider from 'react-native-slider';
import LinearGradient from 'react-native-linear-gradient';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import Images from '@assets/images';
import COLOR from '@constants/colors';

const CustomSlider = props => {
  let {value, onValueChange, maximumTrackColor, onSlidingComplete} = props;
  return (
    <View style={{marginVertical: verticalScale(10)}}>
      {/* Maximum Track */}
      <Slider
        style={{width: '95%', alignSelf: 'center'}}
        value={value}
        minimumValue={0}
        maximumValue={1}
        maximumTrackTintColor={maximumTrackColor}
        minimumTrackTintColor={COLOR.SECONDARY}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
        trackStyle={styles.sliderTrackStyle}
      />
      {/* Minimum Track Gradient */}
      <LinearGradient
        colors={['#FBC045', '#CF1B3D']} // Replace with your gradient colors
        style={{
          position: 'absolute',
          width: '95%',
          marginHorizontal: horizontalScale(5),
          borderRadius: 20,
          height: moderateScale(40),
        }}
      />
      {/* Thumb */}
      <Slider
        style={{
          width: '95%',
          alignSelf: 'center',
          position: 'absolute',
        }}
        value={value}
        thumbImage={Images.welfareClock}
        minimumValue={0}
        maximumValue={1}
        maximumTrackColor={COLOR.SECONDARY}
        minimumTrackTintColor={COLOR.SECONDARY}
        thumbStyle={styles.sliderThumbStyle}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
        trackStyle={styles.sliderTrackStyle}
      />
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  sliderThumbStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.SAFETY_ORANGE,
  },
  sliderTrackStyle: {
    marginHorizontal: horizontalScale(5),
    backgroundColor: COLOR.SECONDARY,
  },
});
