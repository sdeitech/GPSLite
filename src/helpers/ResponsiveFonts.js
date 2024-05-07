import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const BUTTON_WIDTH = width - horizontalScale(40);
const BUTTON_PADDING = moderateScale(5);
const SWIPEABLE_DIMENSIONS = moderateScale(55);
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

export {
  horizontalScale,
  verticalScale,
  moderateScale,
  BUTTON_WIDTH,
  BUTTON_PADDING,
  SWIPEABLE_DIMENSIONS,
  H_SWIPE_RANGE,
};
