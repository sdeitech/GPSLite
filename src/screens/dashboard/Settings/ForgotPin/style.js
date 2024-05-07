import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../../helpers/ResponsiveFonts';
// import FONTS from '@constants/fonts';
// import COLOR from '@constants/colors';
// import FONTSIZE from '@constants/fontSize';
import GLOBALS from '../../../../constants/index';
const {COLOR, FONTS, FONTSIZE} = GLOBALS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  containerHead: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '2%',
  },
  headingText: {
    marginTop: verticalScale(30),
    fontSize: FONTSIZE.SECONDARY_HEADING,
    fontFamily: FONTS.SEMIBOLD,
    color: COLOR.SECONDARY,
  },
  loginTitle: {
    marginTop: verticalScale(35),
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
    marginHorizontal: horizontalScale(20),
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
  customHeaderImg: {height: moderateScale(50), width: moderateScale(50)},
});
export default styles;
