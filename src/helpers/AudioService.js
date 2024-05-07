import {Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
const audioRecorderPlayers = new AudioRecorderPlayer();
let isPlayerInitialized = false;

export const handleStartRecording = async () => {
  try {
    // Start recording and log the result

    const result = await audioRecorderPlayers.startRecorder();
    console.log('Recording started:', result);

    return result;
  } catch (error) {
    // console.error('Error starting recording:', error);
  }
};

export const handleStopRecording = async () => {
  try {
    // Stop recording and log the result
    const result = await audioRecorderPlayers.stopRecorder();
    console.log('Recording stopped:', result);
    return result;
  } catch (error) {
    // console.error('Error stopping recording:', error);
  }
};

export const handleStartPlaying = async recordingPath => {
  console.log(recordingPath, 'recordingPath>>>');
  try {
    // Initialize audioRecorderPlayer if not already initialized
    if (!isPlayerInitialized) {
      isPlayerInitialized = true;
    }
    // Start playing and log the result
    const result = await audioRecorderPlayers.startPlayer();
    console.log('Recording playback result:', result);
  } catch (error) {
    // console.error('Error starting playback:', error);
  }
};

export const onPausePlay = async () => {
  const result = await audioRecorderPlayers.pausePlayer();
  console.log('result ', result);
};
export const handleStopPlaying = async () => {
  try {
    // Stop playing and log the result
    const result = await audioRecorderPlayers.stopPlayer();
    // console.log('Playback stopped:', result);
  } catch (error) {
    // console.error('Error stopping playback:', error);
  }
};

export const handlePlayback = async (audioPath, setIsPlaying) => {
  try {
    if (!isPlayerInitialized) {
      isPlayerInitialized = true;
    }
    const result = await audioRecorderPlayers.startPlayer(audioPath);
    console.log('result', result, audioPath);
    if (result) {
      audioRecorderPlayers.addPlayBackListener(e => {
        if (e.current_position === e.duration) {
          // Audio playback has finished
          setIsPlaying(false); // Update isPlaying state in parent component
          audioRecorderPlayers.stopPlayer(); // Stop the player
          audioRecorderPlayers.removePlayBackListener(); // Remove the playback listener
        }
      });
      setIsPlaying(true); // Update isPlaying state in parent component
    }
  } catch (error) {
    console.error('Failed to handle playback', error);
  }
};
