import 'react-native-gesture-handler';

// import './ignoreWarnings';
import React, {useEffect} from 'react';
import Root from './src/navigation';
// import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Loading from './src/components/common/Loader';
import Toast from 'react-native-toast-message';

let persistor = persistStore(store);

export default function App() {
  // LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <PersistGate loading={null} persistor={persistor}>
          <Loading />
          <Root />
          <Toast style={{backgroundColor: 'black'}} />
        </PersistGate>
      </GestureHandlerRootView>
    </Provider>
  );
}
