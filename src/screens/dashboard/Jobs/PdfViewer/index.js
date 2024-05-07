import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import Pdf from 'react-native-pdf';
import {moderateScale} from '@helpers/ResponsiveFonts';
import Images from '@assets/images';
import CustomHeader from '@components/common/CustomHeader';

const PdfViewer = ({route, navigation}) => {
  const {base64Data} = route.params;
  var base64WithoutPrefix = base64Data.substring(
    'data:image/pdf;base64,'.length,
  );

  const pdfRef = useRef(null);

  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={() => navigation.goBack()}
        title={'Documents'}
        containerFlex={0.1}
      />
      <View style={styles.headingContainer}>
        <Pdf
          ref={pdfRef}
          source={{
            uri: `data:application/pdf;base64,${base64WithoutPrefix}`,
            cache: true,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          trustAllCerts={false}
          style={{
            flex: 1,
          }}
        />
      </View>
    </View>
  );
};
export default PdfViewer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  headingContainer: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingBottom: '3%',
  },
});
