import {StyleSheet} from 'react-native';
import GLOBALS from '../../../constants/index';
const {COLOR, FONTS, FONTSIZE} = GLOBALS;
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../helpers/ResponsiveFonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY,
    width: '100%',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  hairLineStyle: {
    borderWidth: 1,
    borderColor: COLOR.BACKGROUND_GREY,
    marginVertical: verticalScale(20),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(25),
  },
  toggleText: {
    fontSize: moderateScale(20),
    color: COLOR.LIGHT_GREY,
  },
  signoutText: {
    fontSize: moderateScale(20),
    color: COLOR.BTN_RED,
  },
  titleText: {
    color: COLOR.PURPLE,
  },
  versionText: {
    margin: moderateScale(22),
    fontSize: FONTSIZE.SEMI_MEDIUM,
    color: COLOR.PRIMARY_BLUE,
  },
  customHeaderImg: {height: moderateScale(50), width: moderateScale(50)},
});
export default styles;
