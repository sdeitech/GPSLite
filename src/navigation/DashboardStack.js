import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useSelector } from 'react-redux';
import GeneratePin from '../screens/dashboard/GeneratePin';
import SplashScreen from '../screens/auth/SplashScreen';
import TabNavigator from './TabNavigator';
import { changePassword, changePin } from '../redux/slice/authSlice';
import Profile from '../screens/dashboard/Profile';
import Notification from '../screens/dashboard/Notifications';
import ChangePin from '../screens/dashboard/Settings/ChangePin';
import ChangePassword from '../screens/dashboard/Settings/ChangePassword';
// import SplashScreen from 'src/screens/auth/SplashScreen';
// import CustomerSatisfaction from 'src/screens/dashboard/Jobs/CustomerSatisfaction';
// import FeedBack from 'src/screens/dashboard/Jobs/FeedBack';
// import ImageViewer from 'src/screens/dashboard/Jobs/ImageViewer';
// import PdfViewer from 'src/screens/dashboard/Jobs/PdfViewer';
// import VideoViewer from 'src/screens/dashboard/Jobs/VideoViewer';
// import Notification from 'src/screens/dashboard/Notifications';
// import Profile from 'src/screens/dashboard/Profile';
// import FatigueManage from 'src/screens/dashboard/Settings/ConnectedDevice/FatigueManage';
// import ForgotPin from 'src/screens/dashboard/Settings/ForgotPin';
// import GeneratePin from '../screens/dashboard/GeneratePin';
// import ChangePassword from '../screens/dashboard/Settings/ChangePassword';
// import ChangePin from '../screens/dashboard/Settings/ChangePin';
// import TabLiteNavigator from './TabLiteNavigator';
// import TabNavigator from './TabNavigator';

const DashboardStack = createNativeStackNavigator();
const DashboardStackNavigator = () => {
  const {user} = useSelector(state => state.auth);
  return (
    // <DashboardStack.Navigator
    //   screenOptions={{headerShown: false, headerBackButtonMenuEnabled: true}}
    //   initialRouteName={!user.alreadyExistPin ? 'GeneratePin' : 'Tab'}>
    <DashboardStack.Navigator
      screenOptions={{headerShown: false, headerBackButtonMenuEnabled: true}}
      initialRouteName={!user.alreadyExistPin ? 'GeneratePin' : 'SplashScreen'}>
      <DashboardStack.Screen name="GeneratePin" component={GeneratePin} />
      <DashboardStack.Screen name="SplashScreen" component={SplashScreen} />
      <DashboardStack.Screen name="Tab" component={TabNavigator} />
      <DashboardStack.Screen name="ChangePassword" component={ChangePassword} />
      <DashboardStack.Screen name="ChangePin" component={ChangePin} />
      
      <DashboardStack.Screen name="Profile" component={Profile} />
      <DashboardStack.Screen name="Notifications" component={Notification} />
    </DashboardStack.Navigator>
  );
};
export default DashboardStackNavigator;
