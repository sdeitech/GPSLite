import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomHeader from '@components/common/CustomHeader';
import Images from '@assets/images';

const ImageViewer = ({route, navigation}) => {
  const {base64Data} = route.params;
  console.log('base64Data====>>>>', base64Data);
  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={() => navigation.goBack()}
        title={'Image'}
        containerFlex={0.1}
      />
      <View style={styles.headingContainer}>
        <Image source={{uri: `${base64Data}`}} style={styles.image} />
      </View>
    </View>
  );
};

export default ImageViewer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
