import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../helpers/ResponsiveFonts';
import COLOR from '../../constants/colors';
import FONTS from '../../constants/fonts';
import FONTSIZE from '../../constants/fontSize';

import {moderateScale} from '../../helpers/ResponsiveFonts';
const CustomSearch = props => {
  let {
    searchContainer = {},
    isLeftIcon,
    onChangeText = () => {},
    placeholder = '',
  } = props;
  return (
    <View style={[styles.container, searchContainer]}>
      <View style={styles.innerSearchView}>
        {isLeftIcon && (
          <TouchableOpacity style={styles.searchInput}>
            <Image source={isLeftIcon} style={styles.imgStyle} />
          </TouchableOpacity>
        )}
        <TextInput
          placeholder={placeholder}
          style={styles.inputText}
          onChangeText={onChangeText}
          placeholderTextColor={COLOR.LIGHT_GREY}
        />
      </View>
    </View>
  );
};

export default CustomSearch;

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: 'rgba(246, 246, 246, 1)',
  },
  imgStyle: {
    height: verticalScale(15),
    width: horizontalScale(15),
    resizeMode: 'contain',
  },
  searchInput: {
    paddingVertical: verticalScale(18),
    paddingHorizontal: horizontalScale(20),
  },
  inputText: {
    fontSize: FONTSIZE.SEMI_MEDIUM,
    fontFamily: FONTS.NORMAL,
    flex: 1,
  },
  innerSearchView: {
    flexDirection: 'row',
  },
});
