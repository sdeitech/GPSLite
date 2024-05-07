import React, {useState} from 'react';
import {TextInput, View, Animated} from 'react-native';

const AnimatedLinesInput = ({style, ...rest}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const borderBottomColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#A9A9A9', '#0000FF'], // Adjust colors as needed
  });

  return (
    <View>
      <TextInput
        style={[
          style,
          {
            borderBottomWidth: 2,
            borderColor: borderBottomColor,
            paddingBottom: 5,
          },
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: '#0000FF', // Adjust color as needed
          },
          {
            transform: [
              {
                scaleX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default AnimatedLinesInput;
