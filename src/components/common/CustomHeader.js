import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../helpers/ResponsiveFonts';
import FONTS from '../../constants/fonts';
import COLOR from '../../constants/colors';
import FONTSIZE from '../../constants/fontSize';
const CustomHeader = props => {
  let {
    leftImage = '',
    leftButtonPress = () => {},
    rightImage = '',
    rightButtonPress = () => {},
    title = '',
    subTitle = '',
    customImgStyle = '',
    customRightImgView = '',
    imgColor = '',
    containerFlex,
  } = props;

  return (
    <View
      style={[
        styles.container,
        {
          flex: containerFlex,
        },
      ]}>
      <View style={styles.leftImgView}>
        {leftImage && (
          <TouchableOpacity style={styles.btnStyle} onPress={leftButtonPress}>
            <Image source={leftImage} style={[styles.imageStyle]} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.textView}>
        <Text style={styles.title}>{title}</Text>
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      </View>
      <View style={styles.rightImgView}>
        {rightImage && (
          <TouchableOpacity onPress={rightButtonPress} style={styles.btnStyle}>
            <Image
              source={rightImage}
              style={[styles.imageStyle, customImgStyle]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  imageStyle: {
    marginVertical: verticalScale(12),
  },
  leftImgView: {width: '10%', marginLeft: horizontalScale(10)},
  textView: {width: '60%', marginTop: verticalScale(15)},
  rightImgView: {width: '10%', marginRight: horizontalScale(20)},
  customTitle: {
    fontSize: FONTSIZE.SEMI_MEIDUM2,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: COLOR.PRIMARY_BLUE,
  },

  subTitle: {
    color: '#fff',
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONTSIZE.MEDIUM,
    textAlign: 'center',
  },
  title: {
    color: COLOR.SECONDARY,
    fontFamily: FONTS.SEMIBOLD,
    fontSize: FONTSIZE.MEDIUM,
    textAlign: 'center',
  },
  btnStyle: {
    // paddingHorizontal: '2%',
    // flex: 0.1,
  },
});
