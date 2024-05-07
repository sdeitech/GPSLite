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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY_BLUE,
  },

  content: {
    flex: 8,
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    width: '100%',
  },
  searchView: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    width: '90%',
  },
  imgContainer: {},
  filterImgStyles: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(10),
  },
  dateText: {
    fontSize: FONTSIZE.MEDIUM,
    fontFamily: FONTS.MEDIUM,
    marginVertical: verticalScale(25),
  },
  customBtnStyle: {width: '60%'},
  customImgStyle: {
    marginRight: horizontalScale(10),
    alignSelf: 'center',
    height: verticalScale(30),
    width: horizontalScale(30),
    tintColor: COLOR.SECONDARY,
    resizeMode: 'contain',
    opacity: 1,
  },
});
export default styles;
