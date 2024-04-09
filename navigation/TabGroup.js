import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable';
import Icon, { Icons } from '../components/Icons';
import FavoriteTour from '../screens/FavoriteTour';
import { Ionicons, Entypo } from '@expo/vector-icons';  
import { themeColors } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Message from '../screens/Message';
const TabArr = [
    { route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'ios-home', inActiveIcon: 'ios-home-outline',component: HomeScreen }, 
    { route: 'Like', label: 'Like', type: Icons.MaterialCommunityIcons, activeIcon: 'heart-plus', inActiveIcon: 'heart-plus-outline',component: FavoriteTour },
    { route: 'Message', label: 'Message', type: Icons.MaterialCommunityIcons, activeIcon: 'message-alert', inActiveIcon: 'message-alert-outline',component: Message },
    { route: 'Account', label: 'Account', type: Icons.FontAwesome, activeIcon: 'user-circle', inActiveIcon: 'user-circle-o',component: ProfileScreen},
  ];
  
  const Tab = createBottomTabNavigator(); 

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: .5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' } });
    } else {
      viewRef.current.animate({ 0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' } });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { top: 0 }]}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
      >
        <Icon type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? themeColors.bgColor(1) : Colors.primaryLite} />
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function TabGroup() {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            margin: 16,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white'
  }
})