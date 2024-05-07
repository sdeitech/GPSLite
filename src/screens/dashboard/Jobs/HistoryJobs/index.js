/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '@components/common/CustomHeader';
import strings from '@constants/string';
import COLOR from '@constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import {useSelector} from 'react-redux';
import CustomJobCard from '@components/common/CustomJobCard';
import Images from '@assets/images';
import FONTS from '@constants/fonts';
import CustomText from '@components/common/CustomText';
import FONTSIZE from '@constants/fontSize';

const HistoryJobs = ({navigation}) => {
  const {jobs} = useSelector(state => state.jobs);
  console.log('jobs of history screen===>>', jobs);
  const [completedJobs, setCompletedJobs] = useState([]);
  useEffect(() => {
    const filteredJobs = jobs.filter(item => item.statusId === 8);
    console.log('filteredJobs===>>>>', filteredJobs);
    setCompletedJobs(filteredJobs);
  }, []);
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        rightButton={true}
        title={strings.history}
        leftImage={Images.back}
        leftButtonPress={goBack}
        containerFlex={1}
      />
      <View style={styles.content}>
        <View style={styles.innerContainer}>
          <CustomText
            title={'Completed Jobs'}
            customTextStyle={styles.dateText}
          />

          <FlatList
            data={completedJobs}
            keyExtractor={(item, index) => index.toString()}
            style={{marginLeft: moderateScale(10)}}
            // refreshing={refreshing}
            // onRefresh={onRefresh}
            renderItem={({item, index}) => {
              const duration = item.durationHours + ':' + item.durationMinutes;
              return (
                <CustomJobCard
                  // customJobCardStyles={{opacity: 0.3}}
                  key={index}
                  jobImage={Images.jobWay}
                  priorityText={
                    (item.priority === 1 && 'High') ||
                    (item.priority === 2 && 'Normal') ||
                    (item.priority === 3 && 'Low')
                  }
                  jobTitle={item.jobName}
                  jobLocation={item.address}
                  jobTiming={item.dueStartDate}
                  jobStartTime={item.startTime}
                  jobHours={duration} //getting hours and minutes differently from backend so combined them in constant duration and put duration here
                  firstBtnTitle={'Job Completed'}
                  firstBtnCustomStyle={styles.customBtnStyle}
                  // onFirstBtnPress={() => {
                  //   item.statusId === 8 ? null : onStartJob(item);
                  // }}
                  // onSecondBtnPress={() => {
                  //   item.statusId === 8 ? null : onDeclineJob(item);
                  // }}
                  secondBtnTitle={
                    item.statusId === 8
                      ? ''
                      : item.statusId === 6
                      ? ''
                      : strings.declineJob
                  }
                  // onJobPress={() => {
                  //   navigation.navigate('DashboardStack', {
                  //     screen: 'JobInfo',
                  //     params: {
                  //       titleJob: item.jobName,
                  //       jobId: item.jobId,
                  //       isJobStarted: item.statusId,
                  //     },
                  //   });
                  // }}
                  titleStyles={{
                    fontFamily: FONTS.REGULAR,
                    color: COLOR.PRIMARY,
                  }}
                  locationStyles={{fontSize: moderateScale(14)}}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HistoryJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.PRIMARY_BLUE,
  },
  content: {
    flex: 8,
    backgroundColor: COLOR.SECONDARY,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(10),
  },
  customBtnStyle: {width: '60%'},
  dateText: {
    fontSize: FONTSIZE.MEDIUM,
    fontFamily: FONTS.MEDIUM,
    marginVertical: verticalScale(25),
  },
});
