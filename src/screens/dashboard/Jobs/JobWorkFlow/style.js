import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '@helpers/ResponsiveFonts';
import COLOR from '@constants/colors';
import FONTSIZE from '@constants/fontSize';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.PRIMARY_BLUE},
  headingContainer: {
    flex: 0.05,
  },
  innerContainer: {
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
    marginHorizontal: horizontalScale(12),
    marginVertical: verticalScale(10),
    alignItems: 'center',
  },
  imageTxtStyle: {
    color: COLOR.PRIMARY_BLUE,
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    textDecorationLine: 'underline',
  },
  deleteImageStyle: {
    resizeMode: 'contain',
    // marginTop: verticalScale(5),
    marginHorizontal: horizontalScale(5),
  },
  mediaContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  column: {},
});
export default styles;
