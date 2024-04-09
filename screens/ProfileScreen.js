import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import TopBooking from '../components/TopBooking';
import TopInfo from '../components/TopInfo';
import { AntDesign } from '@expo/vector-icons';
import { ChevronLeftIcon, ChevronDownIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/solid'
const Tab = createMaterialTopTabNavigator();
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../slices/authSlice';
export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Show confirmation alert
    Alert.alert(
      'Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: () => {
            dispatch(logoutSuccess());
            // You can also add additional logic here, such as navigating to the login screen
            // navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View className='flex-1'>
      <View className="bg-white">
        <View className="absolute z-10 justify-between flex-row px-4 py-4  items-center w-full">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white rounded-full p-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          >
            <ChevronLeftIcon size="23" strokeWidth={4} color="black" />
          </TouchableOpacity>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="bg-white rounded-full p-2"
              style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
              onPress={handleLogout}
            >
              <AntDesign name="logout" size={23} color="black" />
            </TouchableOpacity>

          </View>
        </View>
        <View>
          <Image className="w-full h-[300px]" source={{ uri: 'https://st4.depositphotos.com/20547288/23159/i/450/depositphotos_231597986-stock-photo-abstract-purple-smoke-mist-fog.jpg' }} />
        </View>
        <View className="absolute left-0 right-0 top-[100px] items-center">
          <Image className="w-[100px] h-[100px] rounded-full" source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }} />
          <View className="p-2 bg-gray-400 rounded-full mt-4">
            <Text className="text-lg">Người dùng BK-TRAVEL</Text>
          </View>
        </View>

      </View>
      <Tab.Navigator>
        <Tab.Screen name='Đơn hàng của tôi' component={TopBooking} />
        <Tab.Screen name='Thông tin' component={TopInfo} />
      </Tab.Navigator>
    </View>
  )
}