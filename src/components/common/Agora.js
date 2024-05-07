import React, {useEffect, useState} from 'react';
import {RtcEngine} from 'react-native-agora';
import Config from 'path-to-your-config-file'; // Make sure to import your config file

const AgoraComponent = ({channelName}) => {
  const agoraId = Config.AGORA_KEY;
  const [remoteUser, setRemoteUser] = useState(null);
  const CHANNEL_NAME = 'ABC_NAME';
  useEffect(() => {
    const initAgora = async () => {
      console.log(agoraId, 'agoraaaaa');
      // Initialize Agora
      await RtcEngine.init({appId: agoraId});
      await RtcEngine.enableAudio(); // Enable audio only

      // Set up event listeners
      const userJoinedListener = RtcEngine.addListener(
        'UserJoined',
        (uid, elapsed) => {
          console.log(`User joined: ${uid}`);
          setRemoteUser(uid);
          // Handle the remote user ID (uid) here
        },
      );

      const userOfflineListener = RtcEngine.addListener(
        'UserOffline',
        (uid, reason) => {
          console.log(`User offline: ${uid}`);
          setRemoteUser(null); // Clear remote user when they go offline
          // Handle the remote user ID (uid) here
        },
      );

      // Join a channel
      await RtcEngine.joinChannel(null, channelName, null, 0);

      return () => {
        // Clean up event listeners and leave channel when component unmounts
        userJoinedListener.remove();
        userOfflineListener.remove();
        RtcEngine.leaveChannel();
      };
    };

    initAgora();

    // Ensure cleanup when unmounting
    return () => {
      RtcEngine.destroy();
    };
  }, [channelName, agoraId]);

  return (
    <React.Fragment>
      {/* You can render your local and remote views here if needed */}
    </React.Fragment>
  );
};

export default AgoraComponent;
