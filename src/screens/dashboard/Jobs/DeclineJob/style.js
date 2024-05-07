import {StyleSheet} from 'react-native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '@helpers/ResponsiveFonts';
import GLOBALS from '@constants';
const {FONTS, COLOR} = GLOBALS;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.PRIMARY_BLUE},
  content: {
    flex: 0.9,
    backgroundColor: COLOR.SECONDARY,
    borderTopRightRadius: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
  },
  btnStyles: {
    marginTop: verticalScale(30),
    marginHorizontal: horizontalScale(20),
  },
  customHeaderImg: {height: moderateScale(50), width: moderateScale(50)},
});
export default styles;
