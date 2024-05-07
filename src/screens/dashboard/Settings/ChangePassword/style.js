import {StyleSheet} from 'react-native';
import COLOR from '../../../../constants/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../../helpers/ResponsiveFonts';

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
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(25),
  },
  titleText: {
    color: COLOR.PURPLE,
  },
  customHeaderImg: {height: moderateScale(50), width: moderateScale(50)},
});
export default styles;
