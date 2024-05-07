import Voice from '@react-native-voice/voice';

class SpeechToTextService {
  constructor() {
    this.isListening = false;
    this.recognizedText = '';
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;

    this.callback = null;
  }

  startSpeechRecognition = async () => {
    try {
      await Voice.start('en-US');
      this.isListening = true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };
  onSpeechVolumeChanged = e => {};
  stopSpeechRecognition = async () => {
    console.log('stopSpeechRecognition');
    try {
      await Voice.stop();
      this.isListening = false;
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };

  onSpeechResults = e => {
    this.recognizedText = e.value[0];
    console.log(e);
    if (this.callback) {
      this.callback(this.recognizedText);
    }
  };

  registerCallback(callback) {
    this.callback = callback;
  }

  getIsListening = () => this.isListening;

  getRecognizedText = () => this.recognizedText;
}

export default new SpeechToTextService();
