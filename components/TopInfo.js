import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { UserIcon, ChevronRightIcon, ChevronDownIcon, HeartIcon, ShoppingCartIcon, Cog8ToothIcon, EnvelopeIcon,CloudIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
export default function TopInfo() {
  const navigation = useNavigation();
  return (
    <View className="p-10 space-y-6">
      <View className="p-2 w-full h-12 bg-white rounded-lg flex-row justify-between items-center">
        <View className="flex-row space-x-4 items-center">
          <UserIcon size="23" strokeWidth={1} color="black" />
          <Text className="text-gray-500 text-xl">Thông tin cá nhân</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('UserInfomation')}>
          <ChevronRightIcon size="22" strokeWidth={2} color="black" />
        </TouchableOpacity>
      </View>
      <View className="p-2 w-full h-12 bg-white rounded-lg flex-row justify-between items-center">
        <View className="flex-row space-x-4 items-center">
          <EnvelopeIcon size="23" strokeWidth={1} color="black" />
          <Text className="text-gray-500 text-xl">Thông báo</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Notification')}>
          <ChevronRightIcon size="22" strokeWidth={2} color="black" />
        </TouchableOpacity>

      </View>
      <View className="p-2 w-full h-12 bg-white rounded-lg flex-row justify-between items-center">
        <View className="flex-row space-x-4 items-center">
          <CloudIcon size="23" strokeWidth={1} color="black" />
          <Text className="text-gray-500 text-xl">Thời tiết</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Weather')}>
          <ChevronRightIcon size="22" strokeWidth={2} color="black" />
        </TouchableOpacity>

      </View>
    </View>
  )
}