import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import GLOBALS from '../../constants/index';
import {useSelector} from 'react-redux';
import { ShowLoaderState } from '../../redux/commonStateSlice/commonStateSlice';
// import {ShowLoaderState} from '@redux/commonStateSlice/commonStateSlice';
const {COLOR} = GLOBALS;
const Loading = () => {
  const showLoader = useSelector(ShowLoaderState);
  return showLoader ? (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ActivityIndicator color={COLOR.PRIMARY} size="large" />
      </View>
    </View>
  ) : null;
};

export default Loading;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    zIndex: 110,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    elevation: 1,
  },
  innerContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
