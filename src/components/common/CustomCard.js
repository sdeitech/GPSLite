import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '@helpers/ResponsiveFonts';
import COLOR from '@constants/colors';
import FONTSIZE from '@constants/index';
import FONTS from '@constants/fonts';

const CustomCard = props => {
  let {
    customCard = {},
    isImage = false,
    cardImage = '',
    customImageStyle = {},
    title = '',
    description = '',
    customTitle = {},
    customDescription = {},
    onCardPress = () => {},
  } = props;
  return (
    <TouchableOpacity
      style={[styles.cardStyle, customCard]}
      onPress={onCardPress}>
      {isImage && (
        <Image
          source={cardImage}
          style={[styles.imageStyle, customImageStyle]}
        />
      )}
      {title && <Text style={[styles.customTitle, customTitle]}>{title}</Text>}
      {description && (
        <Text style={[styles.customDescription, customDescription]}>
          {description}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.PRIMARY_BORDER,
  },
  imageStyle: {
    marginVertical: verticalScale(12),
  },
  customTitle: {
    fontSize: FONTSIZE.SEMI_MEDIUM2,
    fontFamily: FONTS.MEDIUM,
    textAlign: 'center',
  },
  customDescription: {
    fontSize: FONTSIZE.SEMI_MEDIUM,
    fontFamily: FONTS.NORMAL,
    textAlign: 'center',
  },
});
