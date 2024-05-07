import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {horizontalScale} from '@helpers/ResponsiveFonts';
import COLOR from '@constants/colors';

const YellowAlert = props => {
  const actionSheetRef = useRef(null);
  return (
    <ActionSheet
      id={props.sheetId}
      ref={actionSheetRef}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        flex: 1,
        backgroundColor: COLOR.SECONDARY,
      }}
      indicatorStyle={{
        width: horizontalScale(90),
      }}
      gestureEnabled={true}>
      <Text>HEllo</Text>
    </ActionSheet>
  );
};

export default YellowAlert;

const styles = StyleSheet.create({});
