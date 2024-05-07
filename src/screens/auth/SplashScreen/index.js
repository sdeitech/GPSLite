/* eslint-disable react-native/no-inline-styles */
import COLOR from '../../../constants/colors';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../../../redux/slice/authSlice';

const SplashScreen = ({navigation}) => {
  const user = useSelector(selectCurrentUser);
  console.log('user.companyIogo=====>>>>>', user?.userDetails?.companyIogo);
  const splashScreenImgbase64 = user?.userDetails?.companyIogo;
  // useEffect(() => {

  //   setTimeout(() => {
  //     navigation.navigate('ChangePassword');
  //   }, 3000);

  // }, [navigation]);
  useEffect(() => {
    if (user?.userDetails?.employeeId === 42) {
      setTimeout(() => {
        navigation.navigate('Tab'); // change 'ChangePassword to TabLite here then everything will be work accordingly
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.navigate('Tab');
      }, 3000);
    }
  });
  return (
    <View style={{flex: 1, backgroundColor: COLOR.PRIMARY_BLUE}}>
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Image
          source={{uri: `${splashScreenImgbase64}`}}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
