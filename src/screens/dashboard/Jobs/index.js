/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import Images from '@assets/images';
import CustomHeader from '@components/common/CustomHeader';
import CustomJobCard from '@components/common/CustomJobCard';
import CustomSearch from '@components/common/CustomSearch';
import CustomText from '@components/common/CustomText';
import FilterModal from '@components/common/FilterModal';
import COLOR from '@constants/colors';
import FONTS from '@constants/fonts';
import strings from '@constants/string';
import {getAddressCoordinates, getCurrentLocation} from '@helpers/Permissions';
import {moderateScale} from '@helpers/ResponsiveFonts';
import {useFocusEffect} from '@react-navigation/native';
import {selectCurrentUser} from '@redux/slice/authSlice';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllJobs,
  getGroupList,
  getLocationsList,
  selectCheckInStatus,
  setSubJobs,
  startJob,
} from 'src/redux/slice/jobSlice';
import styles from './style';
import {sendChatMessage} from 'src/redux/slice/chatSlice';

const Jobs = ({navigation, props, route}) => {
  const [search, setSearch] = useState('');
  const date = moment().format('dddd DD MMMM');
  const [isVisible, setIsVisible] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLocation, setselectedLocation] = useState('');
  const [selectedGroup, setselectedGroup] = useState('');
  const [liveLocation, setLiveLocation] = useState();
  const [destinationCoords, setDestinationCoords] = useState();
  const user = useSelector(selectCurrentUser);

  const {jobs, locationLists, groupLists, startJobStatus} = useSelector(
    state => state.jobs,
  );
  const geofencingData = useSelector(state => state.home.geofencingData);
  console.log('goefencingData======>>>>>>>>>', geofencingData);
  const checkInOutStatus = useSelector(selectCheckInStatus);
  const dispatch = useDispatch();
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await locationCheck();
        const body = {
          emailId: user?.userDetails?.emailId,
        };
        await dispatch(getAllJobs(body));
        setFilteredDataSource(jobs);
      };

      fetchData();
      return () => {};
    }, [dispatch, locationCheck, user]),
  );
  useEffect(() => {
    locationCheck();
    const filteredJobs = jobs.filter(item => item.statusId !== 8);
    setFilteredDataSource(filteredJobs);
  }, [jobs]);
  const locationCheck = async () => {
    const currentLocation = await getCurrentLocation();
    setLiveLocation(currentLocation);
  };

  /** disptach api to start job */
  const onStartJob = item => {
    const isInProgress = jobs.some(statusItem => statusItem.statusId === 6);

    getAddressCoordinates(item?.address, dispatch, coordinates => {
      if (coordinates) {
        const destination = {
          latitude: coordinates?.lat,
          longitude: coordinates?.lng,
        };
        setDestinationCoords(destination);
      } else {
      }
    });
    const body = {
      userid: user?.userId,
      jobid: item.jobId,
    };

    // if (checkInOutStatus) {
    if (isInProgress) {
      Alert.alert('You are already working, Start once you complete it');
    } else {
      dispatch(startJob(body)).then(response => {
        const currentTime = moment().format('hh:mm A');
        const message = `I have reached ${item.address} at ${currentTime}`;
        const requestBody = {
          type: 'user',
          information: message,
          senderName: user?.userDetails?.emplyeeName,
          receiverName: user?.userDetails?.clientName,
          senderId: user?.userDetails?.employeeId,
          recieverId: user?.userDetails?.clientId,
          audiomassage: null,
          duration: '',
          sentOn: new Date(),
        };

        dispatch(sendChatMessage(requestBody));
        navigation.navigate('DashboardStack', {
          screen: 'JobInfo',
          params: {
            titleJob: item.jobName,
            jobId: item.jobId,
            isJobStarted: startJobStatus,
            geoFencingPaths: item.geoFencingPaths,
            userId: user.userId,
            isSubJob: false,
          },
        });
      });
    }
    // } else {
    //   Alert.alert('You have not checkedIn yet!');
    // }
  };

  const goToRunningJob = item => {
    navigation.navigate('DashboardStack', {
      screen: 'JobInfo',
      params: {
        titleJob: item.jobName,
        jobId: item.jobId,
        isJobStarted: true,
        userId: user.userId,
        geofencingPaths: item.geoFencingPaths,
        isSubJob: false,
      },
    });
  };
  /**ot decline job */
  const onDeclineJob = item => {
    navigation.navigate('DashboardStack', {
      screen: 'DeclineJob',
      params: {
        userId: user?.userId,
        jobId: item?.jobId,
        subJobId: 0,
        isSubJob: false,
      },
    });
  };

  const navigateToHistoryJobs = () => {
    navigation.navigate('HistoryJobs');
  };
  const searchFilterFunction = text => {
    if (text) {
      const newData = jobs.filter(function (item) {
        const itemData = item.jobName
          ? item.jobName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(jobs);
      setSearch(text);
    }
  };
  const openFilterModal = () => {
    dispatch(getGroupList(user.userId));
    dispatch(getLocationsList(user.userId));

    setIsVisible(!isVisible);
  };
  // const {stepNumber} = useSelector(state => state.common);

  return (
    <View style={styles.container}>
      <CustomHeader
        rightButton={true}
        rightImage={Images.historyJobs}
        customImgStyle={styles.customImgStyle}
        rightButtonPress={navigateToHistoryJobs}
        title={strings.jobs}
        containerFlex={1}
      />
      <View style={styles.content}>
        <View style={styles.searchView}>
          <CustomSearch
            isLeftIcon={Images.searchIcon}
            searchContainer={styles.searchInput}
            placeholder={strings.search}
            value={search}
            onChangeText={text => {
              searchFilterFunction(text);
            }}
          />
          <TouchableOpacity
            style={styles.imgContainer}
            onPress={openFilterModal}>
            <Image source={Images.filterIcon} style={styles.filterImgStyles} />
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <CustomText title={date} customTextStyle={styles.dateText} />
          {filteredDataSource.length > 0 ? (
            <FlatList
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              style={{marginLeft: moderateScale(10)}}
              refreshing={refreshing}
              onRefresh={onRefresh}
              renderItem={({item, index}) => {
                const duration =
                  item.durationHours + ':' + item.durationMinutes;
                return (
                  <CustomJobCard
                    customJobCardStyles={{
                      opacity: item.statusId === 8 ? 0.3 : 1,
                    }}
                    key={index}
                    jobImage={Images.jobWay}
                    subJobText={item.subJobs.length > 0 ? 'View SubJobs' : ''}
                    onPressSubJob={() => {
                      dispatch(setSubJobs(item.subJobs));
                      navigation.navigate('DashboardStack', {
                        screen: 'SubJobs',
                        params: {
                          jobName: item?.jobName,
                          userId: user?.userId,
                          jobId: item?.jobId,
                        },
                      });
                    }}
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
                      item.statusId === 6 ? 'Job is Running' : 'Start Job'
                    }
                    firstBtnCustomStyle={
                      item.statusId === 6
                        ? [
                            styles.customBtnStyle,
                            {backgroundColor: COLOR.SAFETY_ORANGE},
                          ]
                        : ''
                    }
                    onFirstBtnPress={() => {
                      item.statusId === 8
                        ? null
                        : item.statusId === 6
                        ? goToRunningJob(item)
                        : onStartJob(item);
                    }}
                    onSecondBtnPress={() => {
                      item.statusId === 8 ? null : onDeclineJob(item);
                    }}
                    secondBtnTitle={
                      item.statusId === 6 ? '' : strings.declineJob
                    }
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
          ) : (
            <CustomText
              title={'No Job Allocated'}
              customTextStyle={{textAlign: 'center'}}
            />
          )}
        </View>
      </View>
      {isVisible && (
        <FilterModal
          isVisible={isVisible}
          animationType={'fade'}
          transparent={true}
          filterTitle={strings.filter}
          rightText={Images.close}
          onRightClick={() => {
            setIsVisible(!isVisible);
          }}
          onChangeLocationText={item => {
            setselectedLocation(item.stateName);
          }}
          onChangeGroupText={item => {
            setselectedGroup(item.groupName);
          }}
          locationValueFieldData="stateName"
          locationLabelFieldData="stateName"
          groupValueFieldData="groupName"
          groupLabelFieldData="groupName"
          locationData={locationLists}
          groupData={groupLists}
          groupValue={selectedGroup}
          locationValue={selectedLocation}
          isBtn={true}
          btnTitle={strings.applyFilter}
          onRequestClose={() => {
            setIsVisible(!isVisible);
          }}
        />
      )}
    </View>
  );
};

export default Jobs;
