import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '@helpers/ResponsiveFonts';
import COLOR from '@constants/colors';
import CustomText from './CustomText';
import strings from '@constants/string';

const CommonSignature = ({onChangeText, index, signature, setSignature}) => {
  const sign = useRef();

  const saveSign = () => {
    sign.current.saveImage();
  };

  const onSaveEvent = result => {
    console.log(result.encoded, 'result.encoded====>>>>');
    // onChangeText(result.encoded, index);
    setSignature(result.encoded);
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
  };

  // const onDragEvent = () => {
  //   console.log('on drag ');
  //   saveSign();
  // };

  return (
    <>
      <View
        style={{
          marginHorizontal: horizontalScale(20),
          marginTop: verticalScale(20),
        }}>
        <CustomText title={strings.clientSignature} />
      </View>
      <View style={styles.content}>
        <CustomText
          title={strings.addSignature}
          customTextStyle={{
            color: COLOR.GREY,
            paddingBottom: verticalScale(5),
          }}
        />
        <SignatureCapture
          style={{}}
          ref={sign}
          onSaveEvent={onSaveEvent}
          // onDragEvent={() => onDragEvent()}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          strokeColor="#000000"
          minStrokeWidth={4}
          maxStrokeWidth={4}
          viewMode={'portrait'}
          height={200}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  signature: {
    borderWidth: 1,
  },
  content: {
    padding: 15,
    backgroundColor: COLOR.TEXTINPUT,
    borderRadius: moderateScale(20),
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
  },
  //   buttonStyle: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     height: 50,
  //     backgroundColor: '#eeeeee',
  //     margin: 10,
  //   },
});

export default CommonSignature;
