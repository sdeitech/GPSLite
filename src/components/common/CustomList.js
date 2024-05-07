import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLOR from '@constants/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '@helpers/ResponsiveFonts';
import FONTS from '@constants/fonts';
import CustomButton from './CustomButton';
import FONTSIZE from '@constants/fontSize';
import SwipeButton from './SwipeButton';
const CustomList = props => {
  let {
    isImage = false,
    cardImage = '',
    customCard = {},
    title = '',
    description = '',
    btnTitle = '',
    timer = () => {},
    isTimer = false,
    isBattery = false,
    batteryImg = '',
    charging = '',
    isImageWithoutBackground = '',
    isBtn = false,
    deviceDescription = '',
    deviceDescription2 = '',
    deviceNumber = '',
    onBtnPress = () => {},
    customButtonText = {},
    onListPress = () => {},
    customImageStyle = {},
    customTitleStyle = {},
    customDescriptionStyle = {},
    customCardInner = {},
    customButtonStyle = {},
    customBatteryText = {},
  } = props;
  return (
    <TouchableOpacity
      style={[styles.cardContainer, customCard]}
      onPress={onListPress}>
      <View style={[styles.innerContainer, customCardInner]}>
        {isImage && (
          <View style={styles.imgView}>
            <Image
              source={cardImage}
              resizeMode={'contain'}
              style={[styles.imageStyle, customImageStyle]}
            />
          </View>
        )}
        {isImageWithoutBackground && (
          <View>
            <Image
              source={cardImage}
              resizeMode={'contain'}
              style={[customImageStyle]}
            />
          </View>
        )}
        <View style={styles.content}>
          <View style={styles.rowView}>
            {title && (
              <Text style={[styles.titleStyle, customTitleStyle]}>{title}</Text>
            )}
            {isBattery && (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image source={batteryImg} />
                <Text style={[styles.batteryText, customBatteryText]}>
                  {charging}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.rowView}>
            {description && (
              <Text style={[styles.descriptionStyle, customDescriptionStyle]}>
                {description}
              </Text>
            )}
            {deviceDescription && (
              <Text style={[styles.descriptionStyle, customDescriptionStyle]}>
                {deviceDescription}
                <Text style={{color: COLOR.PRIMARY}}>{deviceNumber}</Text>
                <Text style={[styles.descriptionStyle, customDescriptionStyle]}>
                  {deviceDescription2}
                </Text>
              </Text>
            )}
            {isTimer && <Text style={styles.timerStyle}>{timer}</Text>}
          </View>
          {isBtn && (
            <View>
              <CustomButton
                title={btnTitle}
                customBtnText={customButtonText}
                customBtnStyle={customButtonStyle}
                onBtnPress={onBtnPress}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomList;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.PRIMARY_BORDER,
  },
  imageStyle: {
    flex: 1,
    alignSelf: 'center',
  },
  imgView: {
    borderRadius: moderateScale(50),
    height: moderateScale(50),
    width: moderateScale(50),
    marginLeft: horizontalScale(10),
    marginVertical: verticalScale(10),
    backgroundColor: COLOR.SECONDARY,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    marginLeft: horizontalScale(10),
    paddingTop: verticalScale(12),
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: FONTSIZE.MEDIUM,
    fontFamily: FONTS.SEMIBOLD,
  },
  descriptionStyle: {
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.MEDIUM,
  },
  timerStyle: {
    paddingRight: horizontalScale(10),
    paddingVertical: verticalScale(2),
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.BOLD,
    color: COLOR.PRIMARY,
  },
  batteryText: {
    paddingTop: verticalScale(3),
    paddingHorizontal: horizontalScale(5),
    fontSize: FONTSIZE.SEMI_MEDIUM,
    fontFamily: FONTS.SEMIBOLD,
    color: COLOR.GREY,
  },
});
