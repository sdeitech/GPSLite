import {StyleSheet} from 'react-native';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '@helpers/ResponsiveFonts';
import COLOR from '@constants/colors';
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLOR.PRIMARY_BLUE},
  content: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  emojiImage: {
    alignSelf: 'center',
    marginVertical: verticalScale(10),
  },
  askText: {
    marginTop: verticalScale(25),
    marginBottom: verticalScale(15),
    marginHorizontal: horizontalScale(20),
  },
  flatListView: {
    flex: 0.2,
  },
  flatListContainer: {
    alignSelf: 'center',
  },
  signView: {
    height: verticalScale(130),
    borderRadius: moderateScale(20),
  },
  customBtnStyle: {
    marginTop: verticalScale(30),
    marginHorizontal: horizontalScale(20),
  },
  signature: {
    borderColor: '#000033',
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
  signatureView: {
    padding: 15,
    backgroundColor: COLOR.TEXTINPUT,
    borderRadius: moderateScale(20),
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
  },
  customHeaderImg: {height: moderateScale(50), width: moderateScale(50)},
});
export default styles;
