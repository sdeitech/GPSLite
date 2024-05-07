import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '@helpers/ResponsiveFonts';
import GLOBALS from '@constants/index';
const {COLOR, FONTS, FONTSIZE} = GLOBALS;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  jobStartedView: {
    marginHorizontal: horizontalScale(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobStartedText: {
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    color: COLOR.SECONDARY,
    textAlign: 'center',
    marginTop: verticalScale(15),
  },
  bodyContainer: {
    flex: 1,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    backgroundColor: COLOR.SECONDARY,
    marginTop: verticalScale(20),
  },
  introView: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contactTextContainer: {
    borderWidth: 1,
    borderRadius: moderateScale(3),
    borderColor: COLOR.LIGHT_GREY,
    marginHorizontal: horizontalScale(10),
  },
  contactText: {
    fontSize: FONTSIZE.SMALL_MEDIUM,
    fontFamily: FONTS.NORMAL,
    color: COLOR.TEXT_GREY,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(2),
  },
  jobInfo: {
    flex: 0.45,
    justifyContent: 'space-around',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoUpperView: {
    marginLeft: horizontalScale(15),
    justifyContent: 'space-between',
  },
  imgView: {
    height: verticalScale(50),
    width: horizontalScale(50),
    borderRadius: moderateScale(50),
    alignSelf: 'center',
    backgroundColor: COLOR.BACKGROUND_GREY,
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(20),
  },
  imgStyle: {
    alignSelf: 'center',
    marginVertical: verticalScale(15),
  },
  titleTextStyle: {
    fontSize: FONTSIZE.SEMI_MEDIUM,
    textAlign: 'center',
  },
  descriptionTextStyle: {
    fontSize: FONTSIZE.SEMI_MEDIUM,
    textAlign: 'center',
    color: COLOR.TEXT_GREY,
  },
  horizontalLine: {
    borderWidth: 0.2,
    borderColor: COLOR.SECONDARY_OPACITY,
    // borderColor: COLOR.PRIMARY,
    width: '90%',
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
  },
  distanceContainer: {
    flex: 0.4,
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(16),
  },
  distanceDescriptionText: {
    fontSize: moderateScale(14),
    color: COLOR.TEXT_GREY,
    marginVertical: verticalScale(12),
  },
  routeText: {
    paddingVertical: verticalScale(10),
    color: COLOR.PRIMARY,
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.MEDIUM,
  },
  mapContainer: {flex: 1, alignItems: 'center'},
  slideContent: {
    flex: 1,
    marginVertical: verticalScale(16),
    marginHorizontal: horizontalScale(10),
  },
  btnView: {
    bottom: verticalScale(22),
    width: '100%',
    position: 'absolute',
  },
  btnContainer: {
    borderRadius: moderateScale(20),
    width: '35%',
    alignSelf: 'center',
  },
  btnImg: {alignSelf: 'center', height: 36, width: 36},

  bottomView: {
    flex: 0.1,
    flexDirection: 'row',
    marginTop: verticalScale(9),
    marginHorizontal: horizontalScale(20),
    justifyContent: 'space-between',
  },
  redAlertView: {
    flex: 0.3,
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
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
  jobStartedInnerView: {flex: 1, flexDirection: 'row'},
  // segmentable
  segmentView: {
    backgroundColor: COLOR.SEGMENTCOLOR,
    borderRadius: moderateScale(50),
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(20),
  },
  tabsContainerStyle: {
    borderRadius: moderateScale(40),
    borderWidth: moderateScale(8),
    borderColor: COLOR.SEGMENTCOLOR,
  },
  tabStyle: {
    borderColor: COLOR.SEGMENTCOLOR,
    height: verticalScale(40),
    backgroundColor: COLOR.SEGMENTCOLOR,
  },
  activeTabStyle: {
    backgroundColor: COLOR.PRIMARY_BLUE,
    borderTopStartRadius: moderateScale(40),
    borderTopEndRadius: moderateScale(40),
    borderBottomStartRadius: moderateScale(40),
    borderBottomEndRadius: moderateScale(40),
  },
  tabTextStyle: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONTSIZE.SEMI_MEDIUM,
    color: COLOR.PRIMARY,
  },
  activeTabTextStyle: {color: COLOR.SECONDARY},
});
export default styles;
