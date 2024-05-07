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
    // marginTop: verticalScale(20),
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
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoUpperView: {
    marginHorizontal: horizontalScale(10),
    alignContent: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(20),
  },
  imgView: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
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
    width: '90%',
    marginHorizontal: horizontalScale(20),
    // marginTop: verticalScale(20),
  },
  distanceContainer: {
    flex: 0.4,
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(12),
  },
  distanceDescriptionText: {
    fontSize: moderateScale(14),
    color: COLOR.TEXT_GREY,
    marginVertical: verticalScale(10),
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
    flex: 0.4,
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

  // segmentable

  tabsContainerStyle: {
    borderRadius: 40,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    borderWidth: 8,
    // borderRadius: 80,
    borderColor: '#e8e8e8',
  },
  tabStyle: {
    borderColor: '#e8e8e8',
    height: 40,
    backgroundColor: '#e8e8e8',
    // borderWidth:15
    // borderRadius: 80,
  },
  activeTabStyle: {
    backgroundColor: '#343232',
    borderRadius: 40,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },
  tabTextStyle: {fontWeight: '500', fontSize: 16, color: '#313131'},
  activeTabTextStyle: {color: '#ffff'},
});
export default styles;
