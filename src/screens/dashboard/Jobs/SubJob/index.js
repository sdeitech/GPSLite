import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '@components/common/CustomHeader';
import Images from '@assets/images';
import strings from '@constants/string';
import COLOR from '@constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import FONTS from '@constants/fonts';
import CustomJobCard from '@components/common/CustomJobCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllJobs,
  jobSubJobs,
  startSubJob,
  subJobsStatus,
} from 'src/redux/slice/jobSlice';
import {selectCurrentUser} from 'src/redux/slice/authSlice';

const SubJobs = ({route, navigation}) => {
  const {jobName} = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const subJobStatus = useSelector(subJobsStatus);
  const subJobs = useSelector(jobSubJobs);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  const onStartSubJob = item => {
    const body = {
      subJobId: item?.subJobId,
      jobId: item?.jobId,
    };
    dispatch(startSubJob(body)).then(() =>
      navigation.navigate('DashboardStack', {
        screen: 'JobInfo',
        params: {
          titleJob: item.jobName,
          jobId: item.jobId,
          isJobStarted: subJobStatus,
          geoFencingPaths: item.geoFencingPaths,
          userId: user.userId,
          subJobId: item.subJobId,
          isSubJob: true,
          subJobWorkFlow: item.workflow,
        },
      }),
    );
  };

  const goToRunningJob = item => {
    navigation.navigate('DashboardStack', {
      screen: 'JobInfo',
      params: {
        titleJob: item.jobName,
        jobId: item.jobId,
        userId: user.userId,
        geofencingPaths: item.geoFencingPaths,
        subJobId: item.subJobId,
        isSubJob: true,
        subJobWorkFlow: item.workflow,
      },
    });
  };
  const onDeclineSubJob = item => {
    navigation.navigate('DashboardStack', {
      screen: 'DeclineJob',
      params: {
        userId: user?.userId,
        jobId: item?.jobId,
        subJobId: item?.subJobId,
        isSubJob: true,
      },
    });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        customImgStyle={styles.customImgStyle}
        leftImage={Images.back}
        leftButtonPress={() => navigation.goBack()}
        onRefresh={onRefresh}
        refreshing={refreshing}
        title={jobName}
        containerFlex={1}
      />
      <View style={styles.content}>
        <View
          style={{
            marginVertical: verticalScale(10),
            marginLeft: horizontalScale(20),
          }}>
          <View style={{marginTop: verticalScale(30)}}>
            <FlatList
              data={subJobs}
              keyExtractor={(item, index) => index.toString()}
              style={{marginLeft: moderateScale(10)}}
              refreshing={refreshing}
              renderItem={({item, index}) => {
                const duration =
                  item.durationHours + ':' + item.durationMinutes;
                return (
                  <CustomJobCard
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
                    firstBtnTitle={
                      item.statusId === 8
                        ? 'Job Completed'
                        : item.statusId === 6
                        ? 'Job is Running'
                        : 'Start Job'
                    }
                    onFirstBtnPress={() => {
                      item.statusId === 8
                        ? null
                        : item.statusId === 6
                        ? goToRunningJob(item)
                        : onStartSubJob(item);
                    }}
                    firstBtnCustomStyle={
                      item.statusId === 8
                        ? [
                            styles.customBtnStyle,
                            {backgroundColor: COLOR.SAFETY_GREEN},
                          ]
                        : item.statusId === 6
                        ? [
                            styles.customBtnStyle,
                            {backgroundColor: COLOR.SAFETY_ORANGE},
                          ]
                        : ''
                    }
                    secondBtnTitle={
                      item.statusId === 8
                        ? ''
                        : item.statusId === 6
                        ? ''
                        : strings.declineJob
                    }
                    onSecondBtnPress={() => onDeclineSubJob(item)}
                    onJobPress={() => {}}
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
    </View>
  );
};

export default SubJobs;

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
  customBtnStyle: {
    width: '60%',
  },
});
