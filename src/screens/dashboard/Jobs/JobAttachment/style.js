import {StyleSheet} from 'react-native';
import COLOR from '@constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  innerContainer: {
    flex: 0.9,
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  noAttachmentText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
});
export default styles;
