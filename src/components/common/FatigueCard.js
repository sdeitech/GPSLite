import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import CustomText from './CustomText';
import FONTS from '@constants/fonts';
import FONTSIZE from '@constants/fontSize';

import COLOR from '@constants/colors';
const FatigueCard = props => {
  let {
    isImage,
    title = '',
    description = '',
    lastImg,
    syncText = '',
    units = '',
    onSyncPress = () => {},
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isImage && (
          <Image
            source={isImage}
            resizeMode={'contain'}
            style={styles.imageContainer}
          />
        )}
        <View style={{}}>
          {title && (
            <CustomText title={title} customTextStyle={styles.titleTextStyle} />
          )}
          <View style={styles.descriptionView}>
            {description && (
              <CustomText
                title={description}
                customTextStyle={styles.descriptionText}
              />
            )}
            {units && (
              <CustomText title={units} customTextStyle={styles.unitText} />
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.lastImageContainer}>
        <TouchableOpacity onPress={onSyncPress}>
          <Image
            source={lastImg}
            resizeMode={'contain'}
            style={{marginHorizontal: horizontalScale(15)}}
          />
        </TouchableOpacity>
        <CustomText
          title={syncText}
          customTextStyle={styles.lastContainerText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FatigueCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: horizontalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: moderateScale(10),
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginVertical: verticalScale(30),
    marginHorizontal: horizontalScale(20),
  },
  titleTextStyle: {
    marginTop: verticalScale(20),
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.SEMIBOLD,
  },
  descriptionView: {
    flexDirection: 'row',
  },
  descriptionText: {
    fontSize: FONTSIZE.LARGE,
    color: COLOR.PRIMARY_BLUE,
    fontFamily: FONTS.BOLD,
    marginVertical: verticalScale(20),
  },
  unitText: {
    fontSize: FONTSIZE.SEMI_MEDIUM,
    color: COLOR.DARK_GREY,
    marginVertical: verticalScale(32),
    paddingLeft: horizontalScale(10),
  },
  lastImageContainer: {
    alignSelf: 'center',
  },
  lastContainerText: {
    fontSize: FONTSIZE.REGULAR,
    color: COLOR.LIGHT_GREY,
    textAlign: 'center',
  },
});
