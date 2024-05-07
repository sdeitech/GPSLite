import GLOBALS from '@constants';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {setCheckInOutData} from 'src/redux/slice/authSlice';
import {
  setDeviceStatus,
  setFallAlertData,
  setGeoFencingData,
  setSosAlertData,
  setWelfareAlertData,
} from 'src/redux/slice/homeSlice';
import {getAllJobs} from 'src/redux/slice/jobSlice';
const {BASE_URL} = GLOBALS;

class SignalRPlatformSettings {
  static hubConnection = null;
  static isConnected = false;

  static signalRPlatformSettingsInit(dispatch, user) {
    console.log(dispatch, user, 'dispatched user====>>>');
    if (!SignalRPlatformSettings.hubConnection) {
      SignalRPlatformSettings.hubConnection = new HubConnectionBuilder()
        .withUrl(`${BASE_URL}/PlatformSetting`)
        .configureLogging({
          logLevel: LogLevel.Information, // or LogLevel.Debug, LogLevel.Warning, LogLevel.Error
          logger: (logLevel, message) => {
            // Custom logger function
            console.log(`[${logLevel}] ${message}`);
          },
        })
        .build();

      // Start the connection
      SignalRPlatformSettings.hubConnection
        .start()
        .then(() => {
          console.log(
            'Connection started for platform settingsssss=====>>>>>>!',
          );
          SignalRPlatformSettings.isConnected = true;
        })
        .catch(err =>
          console.error('Error while establishing connection:', err),
        );

      SignalRPlatformSettings.hubConnection.onclose(res => {
        console.log('disconnect', res);
        SignalRPlatformSettings.isConnected = false;
      });

      SignalRPlatformSettings.hubConnection.onreconnected(e => {
        console.log('reconnect', SignalRPlatformSettings.hubConnection, e);
        SignalRPlatformSettings.isConnected = true;
      });
      SignalRPlatformSettings.hubConnection.on(
        'sosAlert',
        (userId, sosAlert) => {
          dispatch(setSosAlertData(sosAlert));
          console.log(
            `Received data::::::::::::::::sos alert ${JSON.stringify(
              sosAlert,
            )}`,
          );
        },
      );
      SignalRPlatformSettings.hubConnection.on(
        'FallAlert',
        (userId, fallAlert) => {
          dispatch(setFallAlertData(fallAlert));
          console.log(
            `Received data::::::::::::::::fall alert ${JSON.stringify(
              fallAlert,
            )}`,
          );
        },
      );
      SignalRPlatformSettings.hubConnection.on(
        'CheckInCheckOut',
        (userId, CheckInandOut) => {
          dispatch(setCheckInOutData(CheckInandOut));
          console.log(
            `Received data::::::::::::::::checkin checkout  ${JSON.stringify(
              CheckInandOut,
            )}`,
          );
        },
      );
      SignalRPlatformSettings.hubConnection.on(
        'Welfare_SafteyTimer',
        (userId, Welfare_Timer) => {
          dispatch(setWelfareAlertData(Welfare_Timer));
          console.log(
            `Received data::::::::::::::::GeoFencing ${JSON.stringify(
              Welfare_Timer,
            )}`,
          );
        },
      );
      SignalRPlatformSettings.hubConnection.on(
        'GeoFencing',
        (userId, AdminGeoFencing) => {
          dispatch(setGeoFencingData(AdminGeoFencing));
          console.log(
            `Received data::::::::::::::::GeoFencing ${JSON.stringify(
              AdminGeoFencing,
            )}`,
          );
        },
      );
      SignalRPlatformSettings.hubConnection.on(
        'Device_Status',
        (userId, DeviceStatus) => {
          dispatch(setDeviceStatus(DeviceStatus));
          console.log(
            `Received data::::::::::::::::DeviceStatus ${JSON.stringify(
              DeviceStatus,
            )}`,
          );
        },
      );
    }
  }

  static onSend() {
    if (SignalRPlatformSettings.hubConnection) {
      SignalRPlatformSettings.hubConnection
        .invoke('methodName', 'hello')
        .catch(err => console.error('Error while invoking method:', err));
    } else {
      console.warn('SignalR connection not in Connected state');
    }
  }

  static logoutUser() {
    if (SignalRPlatformSettings.hubConnection) {
      SignalRPlatformSettings.hubConnection.stop();
      SignalRPlatformSettings.hubConnection = null;
      SignalRPlatformSettings.isConnected = false;
    }
  }
}

export default SignalRPlatformSettings;
