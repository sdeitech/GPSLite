/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import Images from '@assets/images';
import AudioPlayback from '@components/chat/AudioPlayback';
import CustomInputToolbar from '@components/chat/CustomInputToolBar';
import Globals from '@constants';
import COLOR from '@constants/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@helpers/ResponsiveFonts';
import SignalRChat from '@helpers/SignalRChat';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  AppState,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AVModeIOSOption,
} from 'react-native-audio-recorder-player';
import ReactNativeBlobUtil from 'react-native-blob-util';
import RNFS from 'react-native-fs';
import {Bubble, GiftedChat, InputToolbar} from 'react-native-gifted-chat';

import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser} from 'src/redux/slice/authSlice';
import {
  chatMessages,
  getChatMessage,
  sendChatMessage,
} from 'src/redux/slice/chatSlice';
import styles from './styles';
import TrackPlayer, {Event, State} from 'react-native-track-player';
const {BASE_URL} = Globals;
let playId = 0;
let audio = '';
const ChatScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioVariation, setAudioVariation] = useState(0);
  const [messageID, setMessageID] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingIntervalId, setRecordingIntervalId] = useState();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0);
  const [playState, setPlayState] = useState();
  const [progress, setProgress] = useState(0);
  const [playbackData, setPlaybackData] = useState();
  const dispatch = useDispatch();
  const {fs} = ReactNativeBlobUtil;
  const audioRecorderPlayer = useMemo(() => new AudioRecorderPlayer(), []);
  // const audioRecorderPlayer = new AudioRecorderPlayer();
  const path = Platform.select({
    ios: 'recording.m4a',
    android: `${fs.dirs.CacheDir}/recording.mp3`,
  });
  const user = useSelector(selectCurrentUser);
  const chatMessage = useSelector(chatMessages);
  const setUpPlayer = async () => {
    await TrackPlayer.setupPlayer();
  };
  useEffect(() => {
    SignalRChat.signalRChatInit(dispatch, user);
    const requestBody = {
      senderName: user?.userDetails?.emplyeeName,
      recieverName: user?.userDetails?.clientName,
      senderid: user?.userDetails?.employeeId,
      receiverId: user?.userDetails?.clientId,
    };
    dispatch(getChatMessage(requestBody));
  }, []);

  useEffect(() => {
    const listener = AppState.addEventListener('change', state => {
      if (state === 'background') {
        pausePlayer();
      }
    });
    return () => {
      listener.remove();
    };
  }, [pausePlayer]);

  const [messages, setMessages] = useState(chatMessage);
  useEffect(() => {
    if (chatMessage && chatMessage.length > 0) {
      setMessages(
        chatMessage.map(message => ({
          ...message,
          _id: message.chatMessageId,
          text: message.audiomassage ? '' : message.messageText,
          audio: message.audiomassage,
          currentPlayingPosition: 0,
          audioLength: 0,
          duration: message.duration,
          createdAt: message.sentOn,
          user: {
            _id: message.senderId,
            name: message.senderName,
          },
        })),
      );
    }
  }, [chatMessage, onSend]);

  const onSend = useCallback((newMessages = []) => {
    console.log('welcome to chat=========>>>>>>');
    // dispatch(setShowLoader(true));
    handleNewMessages();
    const requestBody = {
      type: 'user',
      information: newMessages[0].audio ? '' : newMessages[0].text,
      senderName: user?.userDetails?.emplyeeName,
      receiverName: user?.userDetails?.clientName,
      senderId: user?.userDetails?.employeeId,
      recieverId: user?.userDetails?.clientId,
      audiomassage: newMessages[0].audio,
      duration: moment(newMessages[0].duration, 'mm:ss').format('HH:mm:ss'),
      sentOn: new Date(),
    };

    var formData = new FormData();
    if (newMessages[0].audio) {
      formData.append('audioFile', newMessages[0].audio, 'AudioRecording.mp3');
    }
    formData.append('profilePathRequestDto', JSON.stringify(requestBody));

    console.log('formData======>>>>>>>>', formData._parts);

    // dispatch(sendChatMessage(formData)).then(message => {
    //   const latestmsg = [
    //     {
    //       _id: message?.chatMessageId,
    //       text: message?.messageText,
    //       createdAt: message?.sentOn,
    //       user: {
    //         _id: message?.senderId,
    //         name: message?.senderName,
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //     },
    //   ];
    //   setMessages(previousMessages =>
    //     GiftedChat.append(newMessages, previousMessages),
    //   );
    // });
    dispatch(sendChatMessage(requestBody)).then(message => {
      const latestmsg = [
        {
          _id: message?.chatMessageId,
          text: message?.messageText,
          createdAt: message?.sentOn,
          user: {
            _id: message?.senderId,
            name: message?.senderName,
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ];
      setMessages(previousMessages =>
        GiftedChat.append(newMessages, previousMessages),
      );
    });
  }, []);
  const handleNewMessages = newMessages => {
    // Check if the user is currently at the bottom of the chat
    const atBottom = isUserAtBottom();

    // Add new messages to your state or data source

    // If the user was at the bottom, scroll to the bottom after adding new messages
    if (atBottom) {
      scrollToBottom();
    }
  };
  // Function to check if the user is currently at the bottom of the chat
  const isUserAtBottom = () => {
    const {current: chatContainer} = chatRef;
    if (!chatContainer) return false;

    const scrollHeight = chatContainer.scrollHeight;
    const scrollTop = chatContainer.scrollTop;
    const clientHeight = chatContainer.clientHeight;

    // Determine if the user is at the bottom based on the scroll position
    return scrollHeight - scrollTop === clientHeight;
  };

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    const {current: chatContainer} = chatRef;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };
  const renderBubble = props => {
    const {currentMessage} = props;
    const isRightBubble =
      currentMessage?.user?.name === user?.userDetails?.emplyeeName;

    return (
      <>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              // Styles for messages sent by the current user
              paddingVertical: verticalScale(10),
              backgroundColor: COLOR.PRIMARY_BLUE,
              borderRadius: moderateScale(20),
              borderTopRightRadius: moderateScale(20),
              marginBottom: verticalScale(8),
            },
            left: {
              // Styles for messages sent by other users
              paddingVertical: verticalScale(10),
              backgroundColor: COLOR.CHAT_GREY,
              borderRadius: moderateScale(20),
              borderTopLeftRadius: moderateScale(20),
              marginLeft: horizontalScale(20),
              marginBottom: verticalScale(8),
              // margin: verticalScale(8),
            },
          }}
          position={isRightBubble ? 'right' : 'left'}
        />

        {isRightBubble ? (
          <Image source={Images.blueTail} style={styles.blueTail} />
        ) : (
          <Image source={Images.greyTail} style={styles.greyTail} />
        )}
      </>
    );
  };

  useEffect(() => {
    let intervalId;
    if (isRecording) {
      intervalId = setInterval(() => {
        setAudioVariation(prev => !prev); // Toggle the state to show/hide the recording icon
      }, 500); // Adjust the interval duration as needed
    } else {
      clearInterval(intervalId);
      setAudioVariation(false); // Ensure the icon is hidden when recording stops
    }

    return () => clearInterval(intervalId);
  }, [isRecording]);

  const startRecording = useCallback(async () => {
    console.log('start recording========>>>>>');
    // Reset recording time to 0
    setRecordingTime(0);
    setIsRecording(true);
    audioRecorderPlayer.startRecorder();

    audioRecorderPlayer.setSubscriptionDuration(0.101);
    await audioRecorderPlayer.startRecorder(
      path,
      {
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      },
      true,
    );
    const intervalId = setInterval(() => {
      setRecordingTime(prevTime => prevTime + 1000);
    }, 1000);
    setRecordingIntervalId(intervalId);
  }, [audioRecorderPlayer, path]);
  const stopRecording = useCallback(async () => {
    console.log('stopRecording=======>>>>>');
    setIsRecording(false);
    clearInterval(recordingIntervalId);
    audioRecorderPlayer.removeRecordBackListener();
    audioRecorderPlayer.removePlayBackListener();
    audioRecorderPlayer.stopRecorder().then(async res => {
      console.log('res=====>>>>>>', res);
      audio = res;
      if (res) {
        // Convert audio file to Base64
        try {
          const audioBase64 = await convertAudioToBase64(res);
          console.log('audioBase64=====>>>>', audioBase64);
          // Send audio message with Base64 data
          onSend([
            {
              // audio: audio,
              audio: audioBase64,
              _id: getRandomInt(1, 1000000),
              duration: `${moment.utc(recordingTime).format('mm:ss')}`,

              user: {
                _id: user?.userDetails?.employeeId,
                name: user?.userDetails?.emplyeeName,
              },
              createdAt: new Date(),
            },
          ]);
        } catch (error) {}
      }
    });
  }, [audioRecorderPlayer, recordingIntervalId, recordingTime]);

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const convertAudioToBase64 = async audioPath => {
    console.log('audioPath========>>>>>>>>>>>>', audioPath);
    try {
      const audioData = await RNFS.readFile(audioPath, 'base64');
      console.log('audioData=============>>>>>>>>>>>>>>', audioData);
      return `${audioData}`;
    } catch (error) {
      throw new Error('Error reading audio file:', error);
    }
  };

  useEffect(() => {
    setUpPlayer();

    const updateProgress = async () => {
      const newProgress = await TrackPlayer.getProgress();
      setProgress(newProgress);
    };

    const playbackListener = TrackPlayer.addEventListener(
      Event.PlaybackActiveTrackChanged,
      async data => {
        updateProgress();
        setPlaybackData(data.track);
      },
    );

    const interval = setInterval(updateProgress, 1000);

    return () => {
      clearInterval(interval);
      playbackListener.remove();
    };
  }, []);

  const startPlayer = async message => {
    setIsAudioPlaying(true);
    playId = message._id;
    setMessageID(message._id);
    let audioFile = BASE_URL + '/' + message.audio;
    console.log('audioFile=========>>>>>>', audioFile);

    const track = {
      id: message._id,
      url: audioFile, // Load media from the app bundle
      // url: audio,
      // url: 'https://file-examples.com/storage/fef545ae0b661d470abe676/2017/11/file_example_MP3_700KB.mp3',
      title: 'Audio',
      artist: 'client and user',
      duration: progress.duration,
    };
    const updateProgress = async () => {
      const newProgress = await TrackPlayer.getProgress();
      setProgress(newProgress);
    };

    if (playbackData?.id !== message._id) {
      await TrackPlayer.reset();
      await TrackPlayer.add([track]);
      await TrackPlayer.play();
    } else {
      await TrackPlayer.play(); // Resume playback if same track is already playing
    }
    handleChange(progress.position);
    const playbackStateListener = TrackPlayer.addEventListener(
      Event.PlaybackState,
      async data => {
        setPlayState(data);
        if (data.state === State.Ended) {
          await TrackPlayer.reset();
          await TrackPlayer.stop();
          setIsAudioPlaying(false);
          setIsSeeking(false);
          playId = 0;
          setMessageID(0);
        }
      },
    );
    updateProgress();

    return () => {
      playbackStateListener.remove();
    };
  };

  const resumePlayer = useCallback(async message => {
    try {
      setIsAudioPlaying(true);
      playId = message._id;
      setMessageID(message._id);
      await TrackPlayer.play();
      setIsSeeking(true);
    } catch (error) {
      console.error('Error resuming player:', error);
    }
  }, []);

  const pausePlayer = useCallback(async message => {
    setIsAudioPlaying(false);
    setIsSeeking(false);
    // Reset playId and messageID
    playId = message._id;
    setMessageID(0);
    TrackPlayer.pause();
  }, []);
  const handleChange = val => {
    TrackPlayer.seekTo(val);
    setIsSeeking(true);
    setSeek(val); // Ensure setIsSeeking is properly set
  };

  const onPlayPausePress = currentMessage => {
    if (isAudioPlaying) {
      pausePlayer(currentMessage);
    } else if (
      playState?.state === State.Paused &&
      playbackData?.id === currentMessage._id
    ) {
      resumePlayer(currentMessage);
    } else {
      startPlayer(currentMessage);
    }
  };

  const formatTime = seconds => {
    let hours = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);

    let formattedTime = `${hours.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    return formattedTime;
  };
  const renderMessageVideo = ({currentMessage}) => {
    return (
      <View style={{padding: 10}}>
        <Video
          source={{uri: currentMessage.video}}
          style={styles.VideoBox}
          controls={true}
        />
      </View>
    );
  };

  const renderMessageAudio = ({currentMessage}) => {
    return (
      <AudioPlayback
        audioLength={
          messageID === currentMessage._id || playId === currentMessage._id
            ? progress.duration
            : 0
        }
        currentPlayingPosition={
          messageID === currentMessage._id ? progress.position : 0
        }
        leftIcon={messageID === currentMessage._id ? Images.pause : Images.play}
        onPressLeftButton={() => onPlayPausePress(currentMessage)}
        onSlidingStart={handleChange} // Ensure handleChange is correctly bound
        onValueChange={value => {
          setIsSeeking(true); // Ensure setIsSeeking is called properly
          setSeek(value);
        }}
        currentAndTotalTime={
          messageID === currentMessage._id || playId === currentMessage._id
            ? `${formatTime(progress.position)}/${currentMessage.duration}`
            : `00:00:00/${currentMessage.duration}`
        }
        containerExtraStyles={styles.playerContainer}
      />
    );
  };
  // First, create a ref to your chat container
  const chatRef = useRef(null);
  // chatRef.current?.scrollToEnd();
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      // behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
      <View style={styles.GiftedChatCantiner}>
        <GiftedChat
          extraData={{messageID: messageID}}
          messageContainerRef={chatRef}
          messages={messages}
          onSend={messages => {
            onSend(messages);
          }}
          user={{
            _id: user?.userDetails?.employeeId, // Use employeeId from Redux
            name: user?.userDetails?.emplyeeName, // Use employeeName from Redux
          }}
          inverted={false}
          renderBubble={renderBubble}
          bottomOffset={Platform.OS === 'ios' ? 40 : 0}
          // alignTop={true}
          multiline={true}
          renderInputToolbar={props => (
            <InputToolbar
              {...props}
              containerStyle={{
                borderTopWidth: 0,
              }}
            />
          )}
          // scrollToBottom={true}
          renderComposer={props => (
            <CustomInputToolbar
              onSend={props.onSend}
              audioVariation={audioVariation}
              isRecording={isRecording}
              startRecording={startRecording}
              stopRecording={stopRecording}
              recordingTime={recordingTime}
            />
          )}
          renderMessageVideo={renderMessageVideo}
          renderMessageAudio={renderMessageAudio}
          shouldUpdateMessage={(props, nextProps) =>
            props.extraData !== nextProps.extraData
          }
          keyboardShouldPersistTaps={'never'}
          // loadEarlier={true}
          // onLoadEarlier={true}
          // isLoadingEarlier={true}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
