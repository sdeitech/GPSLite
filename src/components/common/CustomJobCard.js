import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import React from 'react';
import COLOR from '@constants/colors';
import CustomText from './CustomText';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import Images from '@assets/images';
import CustomButton from './CustomButton';
import FONTS from '@constants/fonts';
import FONTSIZE from '@constants/index';
import moment from 'moment';
const CustomJobCard = props => {
  let {
    customJobCardStyles = {},
    jobImage,
    jobTitle = '',
    jobLocation = '',
    jobTiming = '',
    jobStartTime = '',
    jobHours = '',
    firstBtnTitle = '',
    secondBtnTitle = '',
    priorityText = '',
    firstBtnCustomStyle = '',
    subJobText = '',
    subJobIconStyle = '',
    titleStyles = {},
    locationStyles = {},
    onFirstBtnPress = () => {},
    onSecondBtnPress = () => {},
    onJobPress = () => {},
    onPressSubJob = () => {},
  } = props;
  return (
    <TouchableOpacity
      style={[styles.jobCardContainer, customJobCardStyles]}
      onPress={onJobPress}>
      <View style={styles.content}>
        {/* {jobImage && ( */}
        <View style={styles.imagesView}>
          <Image source={jobImage} style={styles.jobImageStyle} />
          <View style={styles.priorityView}>
            <CustomText
              customTextStyle={styles.priorityText}
              title={priorityText}
            />
          </View>
        </View>
        {/* )} */}
        <View style={styles.jobInfoView}>
          {jobTitle && (
            <CustomText customTextStyle={titleStyles} title={jobTitle} />
          )}
          {jobLocation && (
            <View style={styles.jobLocationView}>
              <Image source={Images.locationIcon} style={styles.jobLocation} />
              <CustomText
                customTextStyle={[locationStyles, styles.locationText]}
                title={jobLocation}
              />
            </View>
          )}

          <View style={styles.jobTimeView}>
            {jobTiming && (
              <View style={styles.jobTiming}>
                <Image source={Images.calendarIcon} style={styles.jobTime} />
                <CustomText
                  customTextStyle={[locationStyles, styles.locationText]}
                  title={moment(jobTiming).format('DD MMM,')}
                />
                <CustomText
                  customTextStyle={[locationStyles, styles.locationText]}
                  title={moment(jobStartTime, 'hh:mm A').format('HH:mm')}
                />
              </View>
            )}
            {jobHours && (
              <View style={styles.jobHourView}>
                <Image source={Images.clockIcon} style={styles.jobTime} />
                <CustomText
                  customTextStyle={[locationStyles, styles.locationText]}
                  title={jobHours}
                />
              </View>
            )}
          </View>
          <View style={styles.btnContainer}>
            {firstBtnTitle && (
              <CustomButton
                customBtnStyle={[styles.firstBtnStyle, firstBtnCustomStyle]}
                onBtnPress={onFirstBtnPress}
                customBtnText={styles.btnText}
                title={firstBtnTitle}
              />
            )}
            {secondBtnTitle && (
              <CustomButton
                customBtnStyle={styles.secondBtnStyle}
                onBtnPress={onSecondBtnPress}
                customBtnText={styles.btnText}
                title={secondBtnTitle}
              />
            )}
          </View>
          {subJobText && (
            <View>
              <CustomButton
                customBtnStyle={styles.subJobBtnStyle}
                onBtnPress={onPressSubJob}
                customBtnText={styles.subJobTextStyle}
                title={subJobText}
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.hairLine} />
    </TouchableOpacity>
  );
};

export default CustomJobCard;

const styles = StyleSheet.create({
  jobCardContainer: {
    borderWidth: 1,
    borderColor: COLOR.SECONDARY,
    backgroundColor: COLOR.SECONDARY,
    width: '100%',
  },
  priorityView: {
    borderColor: COLOR.BORDER_GREEN,
    borderWidth: horizontalScale(1),
    borderRadius: moderateScale(3),
    position: 'absolute',
    bottom: moderateScale(10),
    alignSelf: 'center',
    backgroundColor: COLOR.SECONDARY,
  },
  content: {flexDirection: 'row', width: '100%'},
  jobImageStyle: {resizeMode: 'contain', width: '100%'},
  jobLocationView: {flexDirection: 'row', marginVertical: verticalScale(6)},
  locationText: {
    paddingLeft: horizontalScale(4),
    // textAlign: 'center',
    color: COLOR.TEXT_GREY,
  },
  imagesView: {
    width: '20%',
    height: moderateScale(80),
  },
  priorityText: {
    fontSize: FONTSIZE.SMALL_MEDIUM,
    fontFamily: FONTS.BLACK,
    color: COLOR.BORDER_GREEN,
    paddingHorizontal: horizontalScale(8),
  },
  jobTimeView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobLocation: {height: 15, width: 12, marginTop: 2},
  jobInfoView: {
    width: '65%',
    marginHorizontal: horizontalScale(15),
  },
  jobTiming: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobHourView: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    justifyContent: 'space-around',
  },
  firstBtnStyle: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: COLOR.SAFETY_GREEN,
  },
  secondBtnStyle: {
    width: '45%',
    backgroundColor: COLOR.BLOOD_RED,
  },
  btnText: {
    fontSize: FONTSIZE.SEMI_MEDIUM,
    fontFamily: FONTS.MEDIUM,
  },
  hairLine: {
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.13)',
    marginVertical: verticalScale(12),
    width: '100%',
  },
  jobTime: {height: 13, width: 13},
  subJobBtnStyle: {
    width: '60%',
    alignSelf: 'center',
    marginVertical: verticalScale(10),
    backgroundColor: COLOR.ORANGE,
  },
  subJobTextStyle: {
    fontSize: FONTSIZE.SEMI_MEDIUM,
    fontFamily: FONTS.MEDIUM,
  },
});
