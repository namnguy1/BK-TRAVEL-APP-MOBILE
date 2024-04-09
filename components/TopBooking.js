import { View, Text, Image } from 'react-native'
import React from 'react'
import { UserIcon, ChevronLeftIcon, ChevronDownIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/solid'
export default function TopBooking() {
  return (
    <View className='flex-1 p-4 bg-white items-center'>

      <Image source={require('../assets/images/empty-cart.png')}
        style={{ width: 100, height: 100, marginRight:15 }} />
      <View className="mt-4 space-y-2">
        <Text className='font-bold text-2xl'>Chưa có đơn hàng nào !</Text>
        <Text className='text-center text-gray-500'>bạn có cần chút gợi ý ?</Text>
      </View>
    </View>
  )
}