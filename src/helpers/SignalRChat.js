import GLOBALS from '@constants';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {getChatMessage, setChatMessage} from 'src/redux/slice/chatSlice';
const {BASE_URL} = GLOBALS;

class SignalRChat {
  static hubConnection = null;
  static isConnected = false;

  static signalRChatInit(dispatch, user) {
    if (!SignalRChat.hubConnection) {
      SignalRChat.hubConnection = new HubConnectionBuilder()
        .withUrl(`${BASE_URL}/NotifyHub`)
        .configureLogging({
          logLevel: LogLevel.Information, // or LogLevel.Debug, LogLevel.Warning, LogLevel.Error
          logger: (logLevel, message) => {
            // Custom logger function
            console.log(`[${logLevel}] ${message}`);
          },
        })
        .build();

      // Start the connection
      SignalRChat.hubConnection
        .start()
        .then(() => {
          console.log('Connection started chat!');
          SignalRChat.isConnected = true;
        })
        .catch(err =>
          console.error('Error while establishing connection:', err),
        );

      SignalRChat.hubConnection.onclose(res => {
        console.log('disconnect', res);
        SignalRChat.isConnected = false;
      });

      SignalRChat.hubConnection.onreconnected(e => {
        console.log('reconnect', SignalRChat.hubConnection, e);
        SignalRChat.isConnected = true;
      });

      SignalRChat.hubConnection.on('BroadCastMessage', data => {
        console.log(data, 'recieved data===>>>>');
        const requestBody = {
          senderName: user?.userDetails?.emplyeeName,
          recieverName: user?.userDetails?.clientName,
          senderid: user?.userDetails?.employeeId,
          receiverId: user?.userDetails?.clientId,
        };
        dispatch(getChatMessage(requestBody));
      });
    }
  }

  static onSend() {
    if (SignalRChat.hubConnection) {
      SignalRChat.hubConnection
        .invoke('methodName', 'hello')
        .catch(err => console.error('Error while invoking method:', err));
    } else {
      console.warn('SignalR connection not in Connected state');
    }
  }

  static logoutUser() {
    if (SignalRChat.hubConnection) {
      SignalRChat.hubConnection.stop();
      SignalRChat.hubConnection = null;
      SignalRChat.isConnected = false;
    }
  }
}

export default SignalRChat;
