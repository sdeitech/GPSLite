import {
  startPlaying,
  startRecording,
  stopPlaying,
  stopRecording,
} from '@helpers/AudioService';
import React, {useState} from 'react';
import {View, Button} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const startRecording = async () => {
//   const result = await audioRecorderPlayer.startRecorder();
//   console.log(result);
// };

// const stopRecording = async () => {
//   const result = await audioRecorderPlayer.stopRecorder();
//   console.log(result, 'recording stopped');
// };

// const startPlaying = async () => {
//   const result = await audioRecorderPlayer.startPlayer();
//   console.log(result);
// };

// const stopPlaying = async () => {
//   const result = await audioRecorderPlayer.stopPlayer();
//   console.log(result);
// };

const AudioRecorder = () => {
  return (
    <View>
      <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} />
      <Button title="Start Playing" onPress={startPlaying} />
      <Button title="Stop Playing" onPress={stopPlaying} />
    </View>
  );
};
export default AudioRecorder;
