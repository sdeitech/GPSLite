import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from  '../../helpers/ResponsiveFonts';
import FONTSIZE from '../../constants/fontSize';

import COLOR from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FONTS from '../../constants/fonts';

const CommonList = props => {
  let {
    headTitle = '',
    customListStyle = '',
    customListView = '',
    subTitle = '',
    date = '',
    image = '',
    imageStyle = '',
    onListPress = () => {},
    contentCustomStyle = '',
  } = props;
  return (
    <View style={[styles.listContainer, customListStyle]}>
      <TouchableOpacity
        style={[styles.listView, customListView]}
        onPress={onListPress}>
        <View style={styles.imgview}>
          {image && (
            <Image source={image} style={[styles.imgStyle, imageStyle]} />
          )}
          <View style={[styles.content, contentCustomStyle]}>
            {headTitle && (
              <CustomText
                title={headTitle}
                customTextStyle={{
                  fontSize: FONTSIZE.SEMI_MEDIUM2,
                  fontFamily: FONTS.REGULAR,
                }}
              />
            )}
            {subTitle && (
              <CustomText
                title={subTitle}
                customTextStyle={{
                  fontSize: FONTSIZE.SEMI_MEDIUM,
                }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CommonList;

const styles = StyleSheet.create({
  listView: {flexDirection: 'row'},
  imgview: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: horizontalScale(10),
    marginVerticalScale: verticalScale(15),
  },
  content: {
    flexDirection: 'column',
    marginHorizontal: horizontalScale(16),
    width: '70%',
    // height: '70%',
  },
  heading: {color: 'black', fontWeight: '900', left: 5},
  listContainer: {
    backgroundColor: COLOR.SECONDARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: moderateScale(20),
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(20),
    borderColor: COLOR.PRIMARY_BLUE,
    borderWidth: 0.5,
  },
  imgStyle: {height: moderateScale(70), width: moderateScale(60)},
  headingStyle: {
    paddingHorizontal: horizontalScale(15),
    // paddingTop: verticalScale(20),
    fontSize: FONTSIZE.MEDIUM,
  },
  subTitleStyle: {
    paddingHorizontal: horizontalScale(15),
    // paddingBottom: verticalScale(20),
    flexWrap: 'wrap',
  },
  date: {
    marginTop: 10,
    color: 'black',
    left: '90%',
  },
  scrollView: {
    // flex: 1.5,
    // paddingHorizontal: horizontalScale(20),
    // paddingBottom: verticalScale(10),
  },
});
