import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helpers/ResponsiveFonts';

import GLOBALS from '../../../constants/index';
const {COLOR, FONTS, FONTSIZE} = GLOBALS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  cardContainer: {
    flex: 0.8,
    width: '100%',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    backgroundColor: COLOR.SECONDARY,
  },
  circle: {
    // backgroundColor: COLOR.GREEN,
    borderRadius: 100,
    height: moderateScale(130),
    width: moderateScale(130),
    borderWidth: 4,

    position: 'absolute',
    alignSelf: 'center',
    top: moderateScale(-60),
    marginBottom: verticalScale(10),
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    textAlign: 'center',
    fontSize: FONTSIZE.LARGE,
    fontFamily: FONTS.MEDIUM,
    color: COLOR.SECONDARY,
  },
  content: {
    marginTop: verticalScale(90),
    paddingHorizontal: horizontalScale(20),
  },
  jobCardStyle: {
    borderColor: COLOR.PRIMARY_BLUE,
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  jobTitleStyle: {
    color: COLOR.SECONDARY,
  },
  jobDescriptionStyle: {
    color: COLOR.SECONDARY,
  },
  alertCardStyle: {
    backgroundColor: COLOR.SAFETY_ORANGE,
    borderColor: COLOR.SAFETY_ORANGE,
  },
  alertTitleStyle: {
    flex: 1,
    marginLeft: horizontalScale(15),
    textAlign: 'center',
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONTSIZE.MEDIUM,
    color: COLOR.SECONDARY,
  },
  alertDescriptionStyle: {
    color: COLOR.SECONDARY,
    flex: 1,
    textAlign: 'center',
    fontFamily: FONTS.BOLD,
    fontSize: FONTSIZE.SEMI_MEDIUM,
  },
  safetyCardStyle: {
    backgroundColor: COLOR.SAFETY_GREEN,
    borderColor: COLOR.SAFETY_GREEN,
  },
  safetyTitleStyle: {
    color: COLOR.SECONDARY,
    marginVertical: verticalScale(10),
  },
  safetyDescriptionStyle: {
    color: COLOR.SECONDARY,
  },
  teamAlertSlide: {
    marginVertical: verticalScale(20),
    backgroundColor: COLOR.SAFETY_ORANGE,
    borderColor: COLOR.SAFETY_ORANGE,
  },
  teamAlertBtn: {
    borderColor: COLOR.SAFETY_ORANGE,
    backgroundColor: COLOR.SECONDARY,
  },
  redAlertSlide: {
    marginVertical: verticalScale(15),
    backgroundColor: COLOR.BLOOD_RED,
    borderColor: COLOR.BLOOD_RED,
  },
  redAlertBtn: {
    borderColor: COLOR.BLOOD_RED,
    backgroundColor: COLOR.SECONDARY,
  },
  slideContent: {
    marginTop: verticalScale(20),
  },
  modalBtn: {
    width: '40%',
    backgroundColor: COLOR.SAFETY_GREEN,
  },
  modalBtn2: {
    width: '40%',
    backgroundColor: COLOR.BTN_ORANGE,
  },
  bottomCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(16),
  },
  cardStyle: {
    width: '45%',
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(10),
  },
  cardDescriptionText: {
    color: COLOR.PURPLE,
    marginVertical: verticalScale(2),
  },
  teamModalBtn: {
    backgroundColor: COLOR.GREEN,
  },
  sosAlertBtn: {
    width: '50%',
    alignSelf: 'center',
  },
  safetyCheckBtn: {
    alignSelf: 'center',
    width: '40%',
  },
  recordButton: {
    borderColor: COLOR.SECONDARY,
    backgroundColor: COLOR.SAFETY_ORANGE,
    marginLeft: horizontalScale(10),
  },
  welfareSafetyView: {
    marginVertical: verticalScale(10),
    backgroundColor: COLOR.ORANGE_WELFARE,
    borderColor: COLOR.SAFETY_ORANGE,
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  welfareSafetyViewOuter: {
    marginVertical: verticalScale(10),
    // backgroundColor: COLOR.ORANGE_WELFARE,
    // borderColor: COLOR.SAFETY_ORANGE,
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(1),
  },
  swipeInnerButton: {
    height: verticalScale(30),
    width: verticalScale(30),
    backgroundColor: COLOR.SAFETY_ORANGE,
    borderRadius: moderateScale(20),
  },
  audioShow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
  },
  sentAlertBtn: {
    alignSelf: 'center',
    backgroundColor: COLOR.SAFETY_ORANGE,
    width: '50%',
  },
  startRecording: {
    color: COLOR.TEXT_GREY,
    fontSize: FONTSIZE.SEMI_MEDIUM,
    fontFamily: FONTS.BOLD,
    textAlign: 'center',
  },
  slider: {
    width: '95%',
    marginHorizontal: horizontalScale(10),
  },
  sliderTrackStyle: {
    height: verticalScale(40),
    width: '95%',
    borderRadius: moderateScale(20),
    marginHorizontal: horizontalScale(10),
    borderColor: COLOR.SECONDARY,
  },
  sliderThumbStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.SAFETY_ORANGE,
  },
  timeText: {
    fontFamily: FONTS.SEMIBOLD,
    textAlign: 'center',
  },
  timerText: {
    fontFamily: FONTS.SEMIBOLD,
  },
  anotherImgStyle: {
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    tintColor: 'red',
    borderRadius: moderateScale(25),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    height: verticalScale(40),
    width: '95%',
    borderRadius: moderateScale(20),
    borderColor: COLOR.SECONDARY, // Adjust as needed
  },
  customHeaderImg: {
    height: moderateScale(50),
    width: moderateScale(50),
    marginTop: verticalScale(10),
  },
  alertButton: {
    width: '50%',
    alignSelf: 'center',
  },
});
export default styles;
