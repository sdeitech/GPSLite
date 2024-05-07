import {StyleSheet} from 'react-native';
import COLOR from '../../../constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helpers/ResponsiveFonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  innerContainer: {
    flex: 0.9,
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  scrollContainer: {
    marginHorizontal: horizontalScale(20),
  },
  profileImgView: {
    height: moderateScale(80),
    width: moderateScale(80),
    marginTop: verticalScale(25),
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(40),
  },
});
export default styles;
