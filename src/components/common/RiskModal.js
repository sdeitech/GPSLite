import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLOR from '@constants/colors';
import CustomText from './CustomText';
import {moderateScale, verticalScale} from '@helpers/ResponsiveFonts';
import CustomButton from './CustomButton';
import CommonList from './CommonList';
import {useNavigation} from '@react-navigation/native';
import Images from '@assets/images';
import GLOBALS from '@constants/index';
const {BASE_URL} = GLOBALS;
const RiskModal = props => {
  let {
    animationType = '',
    transparent = true,
    isVisible = '',
    btnTitle = '',
    riskModalTitle = '',
    titleCustomStyle = '',
    customBtnStyle = '',
    userManualTitle = '',
    userManualtitleCustomStyle = '',
    onBtnPress = () => {},
    modalContext = [],
  } = props;
  const navigation = useNavigation();

  const getFileType = urlString => {
    if (!urlString) return 'unknown';
    const mimeType = urlString.substring(urlString.lastIndexOf('.'));

    switch (mimeType) {
      case '.mp4':
        return 'mp4';
      case '.png':
        return 'png';
      case '.jpg':
        return 'jpg';
      case '.jpeg':
        return 'jpeg';
      case '.pdf':
        return 'pdf';
      default:
        return 'unknown';
    }
  };

  // Get the file type for each base64 string
  const handlePress = item => {
    const fileType = getFileType(item);

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
    navigation.navigate('ImageViewer', {base64Data: BASE_URL + '/' + item});
  };

  const openPdf = item => {
    // For PDF files, you can use the Linking module to open them
    // Linking.openURL() method can be used to open URLs or files
    // Here, you need to handle the base64 data to open the PDF file
    navigation.navigate('PdfViewer', {base64Data: item?.filePath}); //to be implemented
  };

  const openVideo = item => {
    // For PDF files, you can use the Linking module to open them
    // Linking.openURL() method can be used to open URLs or files
    // Here, you need to handle the base64 data to open the PDF file
    navigation.navigate('VideoViewer', {base64Data: item?.filePath}); //to be implemented
  };

  return (
    <View>
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.headerContent}>
            <CustomText
              title={riskModalTitle}
              customTextStyle={titleCustomStyle}
            />
            {userManualTitle && (
              <CustomText
                title={userManualTitle}
                customTextStyle={userManualtitleCustomStyle}
              />
            )}
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
                        onPress={() => handlePress(attachment)}>
                        {/* Adjust style as needed */}

                        <CommonList
                          image={
                            getFileType(attachment) === 'mp4'
                              ? Images.videoImg
                              : getFileType(attachment) === 'png' ||
                                getFileType(attachment) === 'jpg' ||
                                getFileType(attachment) === 'jpeg'
                              ? Images.photoImg
                              : getFileType(attachment) === 'pdf'
                              ? Images.pdfImg
                              : Images.unknownImg // Path to your unknown file type icon
                          }
                          customListStyle={{
                            width: '26%',
                          }}
                          contentCustomStyle={{flexDirection: 'row'}}
                          onListPress={() => handlePress(attachment)}
                        />
                      </TouchableOpacity>
                    ),
                  )}
                </View>
              )}
            {btnTitle && (
              <CustomButton
                title={btnTitle}
                onBtnPress={onBtnPress}
                customBtnStyle={customBtnStyle}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RiskModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.TRANSPARENT_OPACITY,
  },
  headerContent: {
    backgroundColor: COLOR.SECONDARY,
    paddingVertical: verticalScale(20),
    width: '80%',
    borderRadius: moderateScale(20),
    shadowColor: COLOR.SHADOW_COLOR,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
});
