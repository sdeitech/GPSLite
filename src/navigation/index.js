import AuthStackNavigator from './AuthStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import COLOR from '../constants/colors';
import { isUserLoggedIn, selectCurrentUser } from '../redux/slice/authSlice';
import { useSelector } from 'react-redux';
import DashboardStackNavigator from './DashboardStack';


const Stack = createNativeStackNavigator();
const Root = () => {
  const userLoggedIn = useSelector(isUserLoggedIn);
  const user = useSelector(selectCurrentUser);
  console.log('userLoggedIn==========>>>>>>>>', user);
  return (
    <>
    <SafeAreaView style={{flex: 0, backgroundColor: COLOR.PRIMARY_BLUE}} />
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.SECONDARY}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={COLOR.PRIMARY_BLUE}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {userLoggedIn ? (
           
              <Stack.Screen
                name="DashboardStack"
                component={DashboardStackNavigator}
              />
         
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  </>
  );
};
export default Root;
