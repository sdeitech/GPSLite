import Slider from '@react-native-community/slider';
import React from 'react';
import {View, StyleSheet, LinearGradient} from 'react-native';

const colors = [
  'rgba(50, 164, 49, 1)',
  'rgba(130, 194, 79, 1)',
  'rgba(234, 218, 77, 1)',
  'rgba(242, 220, 23, 1)',
  'rgba(255, 153, 0, 1)',
  'rgba(219, 0, 0, 1)',
];

const LinearGradientExample = ({value, onValueChange}) => {
  return (
    <LinearGradient colors={colors} style={styles.gradient}>
      <Slider
        style={styles.slider}
        value={value}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor="transparent"
        thumbStyle={styles.thumbStyle}
        onValueChange={onValueChange}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: 300,
    height: 100,
    borderRadius: 10,
  },
});

export default LinearGradientExample;
