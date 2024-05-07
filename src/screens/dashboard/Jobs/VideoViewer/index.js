import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import CustomText from '@components/common/CustomText';
import CustomHeader from '@components/common/CustomHeader';
import Images from '@assets/images';
import RNFS from 'react-native-fs';
const VideoViewer = ({route, navigation}) => {
  const {base64Data} = route.params;
  var base64WithoutPrefix = base64Data.substring(
    'data:video/mp4;base64,'.length,
  );
  //   console.log('base64WithoutPrefix===>>>', base64WithoutPrefix);
  const [videoUri, setVideoUri] = useState('');

  useEffect(() => {
    const saveVideoToFile = async () => {
      try {
        const path = `${RNFS.DocumentDirectoryPath}/video.mp4`;
        await RNFS.writeFile(path, base64WithoutPrefix, 'base64');
        setVideoUri(`file://${path}`);
      } catch (error) {
        console.log('Error saving video to file: ', error);
      }
    };

    saveVideoToFile();

    return () => {
      // Clean up temporary files if needed
    };
  }, []);
  return (
    <View style={styles.container}>
      <CustomHeader
        leftImage={Images.back}
        leftButtonPress={() => navigation.goBack()}
        title={'Video'}
        containerFlex={0.1}
      />
      <View style={styles.headingContainer}>
        <Video
          source={{
            uri: videoUri,
          }}
          style={styles.videoStyle}
          controls={true}
          mute
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default VideoViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    flex: 1,
  },
  videoStyle: {
    // backgroundColor: 'yellow',
    width: '100%',
    height: '100%', // Set the width to 100% of the container
    aspectRatio: 16 / 9, // Set the aspect ratio for the video
    position: 'absolute',
  },
});
