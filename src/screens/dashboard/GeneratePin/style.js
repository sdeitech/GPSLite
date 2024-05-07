import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../../helpers/ResponsiveFonts';
import FONTS from '../../../constants/fonts';
import FONTSIZE from '../../../constants/fontSize';
import COLOR from '../../../constants/colors';

export const CELL_SIZE = 70;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: FONTSIZE.SECONDARY_HEADING,
    fontFamily: FONTS.SEMIBOLD,
    textAlign: 'center',
    padding: moderateScale(3),
    borderRadius: CELL_BORDER_RADIUS,
    backgroundColor: COLOR.SECONDARY,
    color: COLOR.PRIMARY_BLUE,
    borderWidth: 1.5,
    // IOS
    shadowColor: COLOR.SHADOW_COLOR,
    shadowOffset: {
      width: horizontalScale(-2),
      height: verticalScale(4),
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android
    shadowColor: COLOR.SHADOW_COLOR,
    elevation: 5,
    borderColor: COLOR.PRIMARY_BLUE,
  },
  root: {
    minHeight: 800,
    padding: 20,
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: FONTSIZE.LARGE,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 40,
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: FONTSIZE.MEDIUM,
    color: '#fff',
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  containerHead: {
    flex: 0.3,
    alignItems: 'center',
  },
  headingText: {
    marginTop: verticalScale(30),
    fontSize: FONTSIZE.SECONDARY_HEADING,
    fontFamily: FONTS.SEMIBOLD,
    color: COLOR.SECONDARY,
  },
  subHeadingText: {
    marginTop: verticalScale(35),
    fontSize: FONTSIZE.PRIMARY_HEADING,
    fontFamily: FONTS.SEMIBOLD,
    color: COLOR.SECONDARY,
  },
  card: {
    flex: 1,
    width: '100%',
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: horizontalScale(20),
    width: '100%',
  },
  customText: {
    textAlign: 'center',
    color: COLOR.BLACK_TEXT,
    marginHorizontal: horizontalScale(50),
  },
  customBtnStyle: {
    marginTop: verticalScale(30),
    marginHorizontal: horizontalScale(20),
  },
  textContainer: {
    marginTop: verticalScale(20),
    alignSelf: 'flex-end',

    marginRight: horizontalScale(20),
  },
  customTextStyle: {
    color: COLOR.PRIMARY_BLUE,
  },
  modalTitle: {
    textAlign: 'center',
    marginHorizontal: horizontalScale(30),
  },
  btnStyle: {width: '40%', alignSelf: 'center'},
});
export default styles;
