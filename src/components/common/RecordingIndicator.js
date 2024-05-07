import Images from '@assets/images';
import React, {useState, useEffect} from 'react';
import {View, Image, Animated} from 'react-native';

const RecordingAnimation = () => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  return (
    <View>
      <Animated.Image
        style={{transform: [{translateY}]}}
        source={Images.recordingMic}
      />
    </View>
  );
};

export default RecordingAnimation;
