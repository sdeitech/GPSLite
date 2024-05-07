import {StyleSheet, Text, Linking, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import Images from '@assets/images';
import strings from '@constants/string';
import CustomHeader from '@components/common/CustomHeader';
import CustomText from '@components/common/CustomText';
import {getJobAttachments, jobAttachments} from 'src/redux/slice/jobSlice';
import {useDispatch, useSelector} from 'react-redux';
import CommonList from '@components/common/CommonList';
import {verticalScale} from '@helpers/ResponsiveFonts';

const JobAttachment = ({navigation, route}) => {
  const {jobID} = route.params;
  console.log('jobID', jobID);
  const dispatch = useDispatch();
  const attachments = useSelector(jobAttachments);
  const goBack = () => navigation.goBack();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    console.log('hello');
    getAttachments();
  }, []);
  const getAttachments = () => {
    const jobAttachmentBody = {
      pageNumber: 0,
      pageSize: 10,
      pageIndex: 0,
      jobId: jobID,
    };
    dispatch(getJobAttachments(jobAttachmentBody));
  };
  const getFileType = base64String => {
    if (!base64String) return 'unknown';
    const mimeType = base64String.substring(5, base64String.indexOf(';'));
    console.log('mimeType===>>>', mimeType);
    switch (mimeType) {
      case 'image/xlsx':
        return 'xlsx';
      case 'image/xls':
        return 'xls';
      case 'image/png':
        return 'png';
      case 'image/jpg':
        return 'jpg';
      case 'image/jpeg':
        return 'jpeg';
      case 'image/pdf':
        return 'pdf';
      case 'video/mp4':
        return 'mp4';
      default:
        return 'unknown';
    }
  };

  // Get the file type for each base64 string
  const handlePress = item => {
    console.log('handlePress');
    const fileType = getFileType(item?.filePath);
    console.log('fileType', fileType);
    switch (fileType) {
      case 'png':
      case 'jpg':
      case 'jpeg':
        openImage(item);
        break;
      case 'pdf':
        openPdf(item);
        break;
      case 'mp4':
        openVideo(item);
        break;
      default:
        // Handle unknown file types
        break;
    }
  };

  const openImage = item => {
    // Assuming you have a screen to display images and Excel files
    // You would navigate to that screen passing the base64 data
    // For simplicity, let's assume you have a Screen to display images and Excel files named ImageOrExcelScreen
    navigation.navigate('ImageViewer', {base64Data: item?.filePath});
  };
  const openVideo = item => {
    // Assuming you have a screen to display images and Excel files
    // You would navigate to that screen passing the base64 data
    // For simplicity, let's assume you have a Screen to display images and Excel files named ImageOrExcelScreen
    navigation.navigate('VideoViewer', {base64Data: item?.filePath});
  };
  const openPdf = item => {
    // For PDF files, you can use the Linking module to open them
    // Linking.openURL() method can be used to open URLs or files
    // Here, you need to handle the base64 data to open the PDF file
    navigation.navigate('PdfViewer', {base64Data: item?.filePath});
  };

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={goBack}
        title={strings.jobAttachment}
        containerFlex={0.1}
      />
      <View style={styles.innerContainer}>
        {attachments.length > 0 ? (
          <FlatList
            style={{marginTop: verticalScale(20)}}
            data={attachments}
            refreshing={refreshing}
            onRefresh={onRefresh}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CommonList
                image={
                  getFileType(item?.filePath) === 'png' ||
                  getFileType(item?.filePath) === 'jpg' ||
                  getFileType(item?.filePath) === 'jpeg'
                    ? Images.photoImg
                    : getFileType(item?.filePath) === 'pdf'
                    ? Images.pdfImg
                    : getFileType(item?.filePath === 'mp4')
                    ? Images.videoImg
                    : Images.unknownImg // Path to your unknown file type icon
                }
                headTitle={item?.name}
                subTitle={item?.description}
                date={item.date}
                onListPress={() => handlePress(item)}
              />
            )}
          />
        ) : (
          <CustomText
            title={'No Attachments'}
            customTextStyle={styles.noAttachmentText}
          />
        )}
      </View>
    </View>
  );
};

export default JobAttachment;
