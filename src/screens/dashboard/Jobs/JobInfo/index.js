/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Images from '@assets/images';
import CustomHeader from '@components/common/CustomHeader';
import CustomText from '@components/common/CustomText';
import GLOBALS from '@constants';
import {verticalScale} from '@helpers/ResponsiveFonts';
import FONTS from '@constants/fonts';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {
  jobDetail,
  jobSubJobs,
  subJobInformation,
} from 'src/redux/slice/jobSlice';
import ChatScreen from './ChatScreen';
import InfoScreen from './InfoScreen';
import styles from './styles';
const {COLOR, strings} = GLOBALS;
const JobInfo = ({props, navigation, route}) => {
  const {
    titleJob,
    jobId,
    isJobStarted,
    geofencingPaths,
    autoMessage,
    subJobId,
    isSubJob,
  } = route.params;
  console.log('route.params====>>>>>>>', route.params, autoMessage);
  const jobData = useSelector(jobDetail);
  const subJobs = useSelector(jobSubJobs);
  console.log('jobData=====>>>>>', jobData, subJobs);
  const [customStyleIndex, setCustomStyleIndex] = useState(0);
  const handleIndexSelect = index => {
    setCustomStyleIndex(index);
  };
  const goBack = () => {
    isSubJob ? navigation.popToTop() : navigation.goBack();
  };
  const navigatetoVerifyPin = () => {
    navigation.navigate('GeneratePin', {isCancelAlertScreen: true});
  };
  const subJobInfo = useSelector(subJobInformation);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={goBack}
        rightImage={Images.attachmentPin}
        rightButtonPress={() =>
          navigation.navigate('JobAttachment', {jobID: jobId})
        }
        title={titleJob}
        // containerFlex={0.1}
      />
      <View style={styles.jobStartedView}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <CustomText
            isTouchable={true}
            title={strings.jobStarted}
            customTextStyle={styles.jobStartedText}
          />
        </View>
        {(jobData || subJobs) && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('JobWorkFlow', {
                didJobStarted: true,
                workflowId: isSubJob ? subJobInfo?.workflow : jobData?.workflow,
                jobID: isSubJob ? jobId : jobData?.jobId,
                subJobId: isSubJob ? subJobId : 0,
                isSubJobStarted: isSubJob ? true : false,
              })
            }>
            <CustomText
              title={'Next'}
              customTextStyle={{
                marginTop: verticalScale(15),
                color: COLOR.SECONDARY,
                fontFamily: FONTS.BOLD,
              }}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.segmentView}>
          <SegmentedControlTab
            values={['Job Details', 'Chat']}
            selectedIndex={customStyleIndex}
            onTabPress={handleIndexSelect}
            tabsContainerStyle={[styles.tabsContainerStyle]}
            tabStyle={[styles.tabStyle]}
            firstTabStyle={styles.firstTabStyle}
            lastTabStyle={styles.lastTabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabStyle={[
              styles.activeTabStyle,
              {backgroundColor: COLOR.PRIMARY_BLUE},
            ]}
            activeTabTextStyle={styles.activeTabTextStyle}
            allowFontScaling={false}
          />
        </View>

        {customStyleIndex === 0 && (
          <InfoScreen
            route={{
              params: {
                titleJob: titleJob,
                jobId: jobId,
                geofencingPaths: geofencingPaths,
                subJobId: subJobId,
                isSubJob: isSubJob,
              },
            }}
            navigatetoVerifyPin={navigatetoVerifyPin}
          />
        )}
        {customStyleIndex === 1 && (
          <ChatScreen
            isJobStarted={isJobStarted}
            autoMessage={autoMessage} // Pass the autoMessage prop to the ChatScreen component
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default JobInfo;
