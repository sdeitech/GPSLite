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
    flex: 0.3,
    flexDirection: 'row',
    paddingTop: '2%',
    // justifyContent:"center"
    // left:10,
    marginHorizontal:verticalScale(20)
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
    // margin:10,
    flex: 1,
    width: '100%',
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    alignItems: 'center',
  },
  boxmain:{
    flex: 1,
    width: '100%',
    // backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    // alignItems: 'center',
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
  modalBtn: {
    marginTop: verticalScale(30),
    width: '40%',
    alignSelf: 'center',
  },
});
export default styles;
