import {
  StyleSheet,
  Animated,
  PanResponder,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import SwipeButton from 'rn-swipe-button';
import Images from '@assets/images';

const CustomSlider = props => {
  let {
    onSwipeSuccess = () => {},
    title = '',
    enableReverseSwipe = false,
    customSlideStyle,
  } = props;

  return (
    <View style={[styles.slideStyle, customSlideStyle]}>
      <SwipeButton
        title={title}
        titleStyles={{color: 'red', fontSize: 18}}
        swipeSuccessThreshold={100}
        enableReverseSwipe={enableReverseSwipe}
        onSwipeSuccess={onSwipeSuccess}
        railBackgroundColor="transparent"
        railBorderColor="red"
        thumbIconImageSource={Images.thumbIcon}
        thumbIconBorderColor="red"
        railFillBackgroundColor="transparent"
        railFillBorderColor="white"
        containerStyles={{
          flex: 1,
          borderRadius: 50,
          backgroundColor: 'white',
          borderColor: 'red',
        }}
      />
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
  },
});
