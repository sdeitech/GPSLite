import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';

import GLOBALS from '@constants/index';
const {COLOR, FONTS, FONTSIZE} = GLOBALS;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.PRIMARY_BLUE},
  headingContainer: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingBottom: '3%',
  },
  innerContainer: {
    marginTop: 30,
    flex: 1,
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  headView: {
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    borderWidth: 0.5,
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(20),
    borderColor: COLOR.SECONDARY_OPACITY,
  },
  noteView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR.RED_OPACITY,
    borderRadius: moderateScale(8),
    marginHorizontal: horizontalScale(20),
  },
  tyreCheckNote: {
    color: COLOR.RED,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(7),
    fontSize: FONTSIZE.SEMI_MEDIUM,
  },
  riskView: {
    borderWidth: 1,
    borderColor: COLOR.RED_OPACITY,
    borderRadius: moderateScale(8),
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
  },
  riskJobStyle: {
    color: COLOR.PRIMARY,
    paddingVertical: verticalScale(7),
    paddingHorizontal: horizontalScale(7),
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    textDecorationLine: 'underline',
  },
  photoContainer: {
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    marginTop: verticalScale(30),
    width: '40%',
    alignSelf: 'center',
  },
  imageIndexView: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    alignItems: 'center',
    // backgroundColor:'red'
  },
  imageTxtStyle: {
    color: COLOR.PRIMARY_BLUE,
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    textDecorationLine: 'underline',
  },
  deleteImageStyle: {
    resizeMode: 'contain',
    marginTop: verticalScale(18),
  },
  mediaContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  column: {},
  stepNavigationBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNavigationText: {
    color: '#fff9',
    fontFamily: FONTS.BLACK,
    fontSize: FONTSIZE.SEMI_MEDIUM,
  },
  modalPreview: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnModalView: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    justifyContent: 'flex-end',
  },
  previewModalBtn: {
    marginTop: verticalScale(30),
    width: '40%',
    alignSelf: 'center',
    marginHorizontal: horizontalScale(20),
  },
  imageStyle: {
    width: '95%',
    height: '70%',
    borderRadius: moderateScale(20),
  },
  headingText: {
    fontSize: FONTSIZE.MEDIUM,
    fontFamily: FONTS.BOLD,
    color: COLOR.PRIMARY_BLUE,
    marginBottom: verticalScale(30),
  },
  videoStyle: {
    width: '100%',
    height: '80%', // Set the width to 100% of the container
    aspectRatio: 16 / 9, // Set the aspect ratio for the video
    // Add any other styles you want for the video component
  },
});
export default styles;
