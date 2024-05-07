import COLOR from '@constants/colors';
import {moderateScale, verticalScale} from '@helpers/ResponsiveFonts';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.PRIMARY_BLUE},
  keyboardView: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  innerContainer: {
    height: verticalScale(113),
    borderRadius: 20,
  },
  customHeaderImg: {height: moderateScale(50), width: moderateScale(50)},
});
export default styles;
