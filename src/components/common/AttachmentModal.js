/* eslint-disable react-native/no-inline-styles */
import Images from '@assets/images';
import COLOR from '@constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import CommonList from './CommonList';
import CustomText from './CustomText';

const AttachmentModal = props => {
  let {
    animationType = '',
    transparent = true,
    isVisible = '',
    onImagePress = () => {},
    modalHeader = '',
    customModalContainer = '',
    modalContext = [],
    image = '',
    attachmentDescription = '',
  } = props;
  const navigation = useNavigation();

  console.log('modalContext:', modalContext);

  const getFileType = base64String => {
    if (!base64String) return 'unknown';
    const mimeType = base64String.substring(5, base64String.indexOf(';'));

    switch (mimeType) {
      case 'video/mp4':
        return 'mp4';
      case 'image/png':
        return 'png';
      case 'image/jpg':
        return 'jpg';
      case 'image/jpeg':
        return 'jpeg';
      case 'image/pdf':
        return 'pdf';
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

  const openPdf = item => {
    // For PDF files, you can use the Linking module to open them
    // Linking.openURL() method can be used to open URLs or files
    // Here, you need to handle the base64 data to open the PDF file
    navigation.navigate('PdfViewer', {base64Data: item?.filePath});
  };

  const openVideo = item => {
    // For PDF files, you can use the Linking module to open them
    // Linking.openURL() method can be used to open URLs or files
    // Here, you need to handle the base64 data to open the PDF file
    navigation.navigate('VideoViewer', {base64Data: item?.filePath});
  };

  return (
    <View>
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.headerContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: horizontalScale(20),
              }}>
              <CustomText title={modalHeader} />
              <TouchableOpacity onPress={onImagePress}>
                <Image source={image} />
              </TouchableOpacity>
            </View>
            {modalContext &&
              modalContext.length > 0 && ( // Check if modalContext is not empty
                <View style={styles.imagesContainer}>
                  {/* Adjust style as needed */}
                  {modalContext.map(
                    (
                      attachment,
                      index, // Iterate over the array
                    ) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.imageWrapper}
                        onPress={() => handlePress(attachment)}>
                        {/* Adjust style as needed */}
                        <CommonList
                          image={
                            getFileType(attachment?.filePath) === 'mp4'
                              ? Images.videoImg
                              : getFileType(attachment?.filePath) === 'png' ||
                                getFileType(attachment?.filePath) === 'jpg' ||
                                getFileType(attachment?.filePath) === 'jpeg'
                              ? Images.photoImg
                              : getFileType(attachment?.filePath) === 'pdf'
                              ? Images.pdfImg
                              : Images.unknownImg // Path to your unknown file type icon
                          }
                          contentCustomStyle={{width: '50%'}}
                          headTitle={attachment?.name}
                          subTitle={attachment?.description}
                          date={attachment.date}
                          onListPress={() => handlePress(attachment)}
                        />
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AttachmentModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.TRANSPARENT_OPACITY,
  },

  headerContent: {
    // flex: 1,
    backgroundColor: COLOR.SECONDARY,
    paddingVertical: verticalScale(20),
    width: '80%',
    borderRadius: moderateScale(20),
    // maxHeight: '50%',
    shadowColor: COLOR.SHADOW_COLOR,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  cardContainer: {
    // width: '30%',
    height: verticalScale(100),
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(16),
    marginVertical: verticalScale(8),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
