import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme';
import { UserIcon, ChevronLeftIcon, ChevronDownIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
export default function SuccessScreen() {
    const navigation = useNavigation();
  return (
    <View className='flex-1  bg-white items-center justify-center'>

      <Image source={require('../assets/images/checked.png')}
        style={{ width: 200, height: 200, marginRight:15 }} />
      <View className="mt-4 space-y-2 items-center justify-center">
        <Text className='font-bold text-2xl'>Thanh toán thành công !!</Text>
        <Text className='text-center text-gray-500'>Đơn hàng của bạn đã được thanh toán thành công</Text>
      </View>
      
        <TouchableOpacity
            style={{ backgroundColor: '#32BA7C',}}
          className="bg-blue-500 p-2 rounded-md mt-4"
          onPress={() => navigation.navigate('Home')}
        >
          <Text className="text-white">Quay lại trang chủ</Text>
        </TouchableOpacity>
      
    </View>
  )
}