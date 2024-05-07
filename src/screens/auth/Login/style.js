import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../helpers/ResponsiveFonts';
// import COLOR from '@constants/colors';
// import FONTS from '@constants/fonts';
// import FONTSIZE from '@constants/fontSize';
import GLOBALS from '../../../constants/index';
const {COLOR, FONTS, FONTSIZE} = GLOBALS;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  containerHead: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    marginTop: verticalScale(30),
    fontSize: FONTSIZE.SECONDARY_HEADING,
    fontFamily: FONTS.BOLD,
    color: COLOR.SECONDARY,
  },
  loginTitle: {
    marginTop: verticalScale(25),
    fontSize: FONTSIZE.PRIMARY_HEADING,
    fontFamily: FONTS.SEMIBOLD,
    color: COLOR.SECONDARY,
  },
  card: {
    flex: 1,
    width: '100%',
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  textContainer: {
    marginTop: verticalScale(20),
    alignSelf: 'flex-start',
    marginLeft: horizontalScale(20),
  },
  customTextStyle: {
    color: COLOR.BLUE,
  },
  customBtnStyle: {
    marginTop: verticalScale(30),
    marginHorizontal: horizontalScale(20),
  },
  questionView: {
    flexDirection: 'row',
  },
  signupView: {
    marginBottom: verticalScale(20),
  },
  questionSignupText: {
    color: COLOR.GREY,
  },
  questionSignup: {
    color: COLOR.PRIMARY,
  },
  versionText: {
    top: '2.5%',
    fontSize: moderateScale(14),
    color: COLOR.PRIMARY_BLUE,
    textAlign: 'center',
  },
});
export default styles;
