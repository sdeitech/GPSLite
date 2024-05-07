import GLOBALS from '@constants';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {getAllJobs} from 'src/redux/slice/jobSlice';
const {BASE_URL} = GLOBALS;

class SignalR {
  static hubConnection = null;
  static isConnected = false;

  static signalRInit(dispatch, user) {
    console.log(dispatch, user, 'dispatched user====>>>');
    if (!SignalR.hubConnection) {
      SignalR.hubConnection = new HubConnectionBuilder()
        .withUrl(`${BASE_URL}/SignalHub`)
        .configureLogging({
          logLevel: LogLevel.Information, // or LogLevel.Debug, LogLevel.Warning, LogLevel.Error
          logger: (logLevel, message) => {
            // Custom logger function
            console.log(`[${logLevel}] ${message}`);
          },
        })
        .build();

      // Start the connection
      SignalR.hubConnection
        .start()
        .then(() => {
          console.log('Connection started!');
          SignalR.isConnected = true;
        })
        .catch(err =>
          console.error('Error while establishing connection:', err),
        );

      SignalR.hubConnection.onclose(res => {
        console.log('disconnect', res);
        SignalR.isConnected = false;
      });

      SignalR.hubConnection.onreconnected(e => {
        console.log('reconnect', SignalR.hubConnection, e);
        SignalR.isConnected = true;
      });

      SignalR.hubConnection.on('ReceiveJobUpdate', data => {
        console.log(`Received data: ${data}`);
        const body = {
          emailId: user?.userDetails?.emailId,
        };
        dispatch(getAllJobs(body));
      });
    }
  }

  static onSend() {
    if (SignalR.hubConnection) {
      SignalR.hubConnection
        .invoke('methodName', 'hello')
        .catch(err => console.error('Error while invoking method:', err));
    } else {
      console.warn('SignalR connection not in Connected state');
    }
  }

  static logoutUser() {
    if (SignalR.hubConnection) {
      SignalR.hubConnection.stop();
      SignalR.hubConnection = null;
      SignalR.isConnected = false;
    }
  }
}

export default SignalR;
