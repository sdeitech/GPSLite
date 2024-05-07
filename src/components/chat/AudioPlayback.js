import Images from '@assets/images';
import COLOR from '@constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts'; // Assuming these helper functions are correctly implemented
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Slider from 'react-native-custom-slider';

const AudioPlayback = ({
  audioId,
  audioLength,
  currentPlayingPosition,
  leftIcon,
  onPressLeftButton,
  onSlidingStart = () => {},
  onValueChange = () => {},
  currentAndTotalTime,
  containerExtraStyles = {},
  isDisabled = false,
  onSlidingComplete,
  messageID = 0,
}) => {
  return (
    <View style={[styles.playerContainer, containerExtraStyles]}>
      <TouchableOpacity
        style={styles.playerButtonContainer}
        hitSlop={{
          bottom: moderateScale(10),
          top: moderateScale(10),
          left: moderateScale(10),
          right: moderateScale(10),
        }}
        onPress={onPressLeftButton}>
        <Image style={styles.playerButton} source={leftIcon} />
      </TouchableOpacity>
      <Slider
        style={styles.audioSeekBar}
        minimumValue={0}
        maximumValue={audioLength}
        disabled={isDisabled}
        invert={true}
        minimumTrackColor={COLOR.RED}
        value={currentPlayingPosition}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        onValueChange={onValueChange}
      />
      <Text style={styles.playerTime}>{currentAndTotalTime}</Text>
    </View>
  );
};

export default AudioPlayback;

const styles = StyleSheet.create({
  playerContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  playerButtonContainer: {
    width: '20%',
    paddingHorizontal: horizontalScale(8),
    paddingTop: verticalScale(12),
  },
  playerButton: {
    height: moderateScale(16),
    width: moderateScale(16),
    tintColor: COLOR.PRIMARY,
  },
  audioSeekBar: {
    flex: 1,
  },
  playerTime: {
    width: '50%',
    color: COLOR.PRIMARY,
    fontSize: moderateScale(12),
    paddingTop: verticalScale(10),
    paddingLeft: horizontalScale(10),
  },
});
