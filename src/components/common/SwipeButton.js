import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Image, View, Vibration} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  BUTTON_WIDTH,
  BUTTON_PADDING,
  SWIPEABLE_DIMENSIONS,
  H_SWIPE_RANGE,
} from '@helpers/ResponsiveFonts';
import FONTS from '@constants/fonts';
import FONTSIZE from '@constants/fontSize';
import COLOR from '@constants/colors';

const SwipeButton = ({
  onToggle,
  toggleText,
  toggleState,
  customView,
  customBtnStyle,
  sosView,
  gestureImg,
  openTeamAlertModal = () => {},
  openRedAlertModal = () => {},
  navigateScreen = () => {},
  slideButton = () => {},
  startToggle = () => {},
  swiperValue,
  swipeTextStyle,
  sosAlertData,
}) => {
  // const [isAlertActive,setIsAlertActive]=useState(false)
  // console.log('yellowAlertSwipeStat===>>>e', yellowAlertSwipeState)
  // Animated value for X translation
  let X = useSharedValue(sosAlertData ? swiperValue : 0);
  // useEffect(() => {
  //   if (swiperValue) {
  //     X.value = withSpring(swiperValue);
  //   }
  // }, [swiperValue]);
  useEffect(() => {
    if (sosAlertData) {
      X.value = withSpring(swiperValue);
    } else {
      X.value = withSpring(0);
    }
  }, [X, sosAlertData, swiperValue]);

  // Fires when animation ends
  const handleComplete = isToggled => {
    if (toggleState === isToggled) return;

    onToggle(isToggled);
    if (isToggled) {
      openTeamAlertModal();
      openRedAlertModal();
      slideButton();
      // setIsAlertActive(true);
    } else {
      navigateScreen();
      // setIsAlertActive(false);
    }
  };

  // Gesture Handler Events
  // const animatedGestureHandler = useAnimatedGestureHandler({
  //   onStart: (_, ctx) => {
  //     ctx.completed = toggleState;
  //   },
  //   onActive: (e, ctx) => {
  //     let newValue;
  //     if (ctx.completed) {
  //       newValue = H_SWIPE_RANGE + e.translationX;
  //     } else {
  //       newValue = e.translationX;
  //     }
  //     if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
  //       X.value = newValue;
  //     }
  //   },
  //   onEnd: () => {
  //     console.log(
  //       X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2,
  //       'on end',
  //     );

  //     if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
  //       X.value = withSpring(0);
  //       runOnJS(handleComplete)(false);
  //     } else {
  //       X.value = withSpring(H_SWIPE_RANGE);
  //       runOnJS(handleComplete)(true);
  //     }
  //   },
  // });
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggleState;
      // call the function
      runOnJS(startToggle)();
    },
    onActive: (e, ctx) => {
      if (sosAlertData) {
        let newValue;
        if (ctx.completed) {
          newValue = H_SWIPE_RANGE + e.translationX;
        } else {
          newValue = e.translationX;
        }
        if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
          X.value = newValue;
        }
      }
    },
    onEnd: () => {
      if (sosAlertData) {
        if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
          X.value = withSpring(0);
          runOnJS(handleComplete)(false);
        } else {
          X.value = withSpring(H_SWIPE_RANGE);
          runOnJS(handleComplete)(true);
        }
      }
    },
  });

  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{translateX: X.value}],
      };
    }),
  };

  return (
    <Animated.View style={[styles.swipeCont, customView]}>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View
          style={[styles.swipeable, AnimatedStyles.swipeable, customBtnStyle]}>
          <View style={[styles.swipeableInnerView, sosView]}>
            <Image source={gestureImg} />
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, swipeTextStyle]}>
        {toggleText}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  swipeCont: {
    height: verticalScale(40),
    width: BUTTON_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: BUTTON_PADDING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D92929',
  },
  swipeable: {
    position: 'absolute',
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
    borderColor: COLOR.RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(4),
  },
  swipeableInnerView: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(30),
    backgroundColor: COLOR.RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeableInnerText: {
    color: COLOR.SECONDARY,
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONTSIZE.REGULAR,
  },
  swipeText: {
    // alignSelf: 'center',
    // justifyContent: 'center',
    // textAlign: 'center',
    // paddingLeft: horizontalScale(20),
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.SEMIBOLD,
    color: COLOR.SECONDARY,
  },
});

export default SwipeButton;
