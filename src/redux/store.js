import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStateSlice from './commonStateSlice/commonStateSlice';
import homeSlice from './slice/homeSlice';

import audioSlice from './slice/audioSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth'],
};
const rootReducer = combineReducers({
  auth: authSlice,
  common: commonStateSlice,
  home: homeSlice,

  audio: audioSlice,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;
