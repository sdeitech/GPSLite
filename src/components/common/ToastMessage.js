import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';

const ToastMessage = body => {
  Toast.show({
    type: body.type,
    text1: body.text1,
    text2: body.text2,
    text1NumberOfLines: body.text1NumberOfLines,
    text2NumberOfLines: body.text2NumberOfLines,
    position: 'top',
    visibilityTime: 4000,
    // onShow: {onShow},
    // onHide: {onHide},
    // onPress: {onPress},
    autoHide: true,
  });
};

export default ToastMessage;
