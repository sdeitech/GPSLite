import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/dashboard/Home';
import Images from '../assets/images';

import COLOR from '../constants/colors';
import FONTSIZE from '../constants/fontSize';
import {verticalScale} from '../helpers/ResponsiveFonts';
import Setting from '../screens/dashboard/Settings';
import FONTS from '../constants/fonts';

const Tab = createBottomTabNavigator();

// Set tab for each icon

const setTabIcon = (route, focused) => {
  let iconName;
  let label;
  let customStyle = {};
  let customTabLabelStyle = {};
  if (route.name === 'Home') {
    iconName = focused ? Images.homesTab : Images.homesTab;
    customStyle = [
      styles.customImg,
      {tintColor: focused ? COLOR.PRIMARY : COLOR.GREY},
    ];
    label = 'Home';
    customTabLabelStyle = [
      styles.customLabelStyle,
      {
        color: focused ? COLOR.PRIMARY : COLOR.LIGHT_GREY,
        fontFamily: FONTS.BLACK,
      },
    ];
  }  else if (route.name === 'Settings') {
    iconName = focused ? Images.settingsTab : Images.settingsTab;
    customStyle = [
      styles.customImg,
      {tintColor: focused ? COLOR.PRIMARY : COLOR.GREY},
    ];
    label = 'Settings';
    customTabLabelStyle = [
      styles.customLabelStyle,
      {
        color: focused ? COLOR.PRIMARY : COLOR.LIGHT_GREY,
        fontFamily: FONTS.BLACK,
      },
    ];
  }
  //   You can return any component that you like here!
  return (
    <View>
      <Image source={iconName} resizeMode="contain" style={customStyle} />
      <Text style={customTabLabelStyle}>{label}</Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused}) => {
          return setTabIcon(route, focused);
        },
        tabBarStyle: [styles.tabBarStyle],
        tabBarShowLabel: false,
        headerShown: false,
      })}>

      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
};
export default TabNavigator;
const styles = StyleSheet.create({
  customImg: {height: 20, width: 20, alignSelf: 'center'},
  customLabelStyle: {
    marginTop: verticalScale(5),
    fontSize: FONTSIZE.SMALL_MEDIUM,
  },
  tabBarStyle: {
    shadowColor: COLOR.SECONDARY,
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.02,
    shadowRadius: 13,
    elevation: 5,
    flex: 0.1,
    backgroundColor: COLOR.SECONDARY,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
