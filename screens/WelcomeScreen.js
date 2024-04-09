import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: themeColors.bgColor(1) }}>
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">
          Khám phá cùng BK-TRAVEL
        </Text>
        <View className="flex-row justify-center">
          <Image source={require("../assets/images/welcome1.png")}
            style={{ width: 350, height: 350 }} />
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => { navigation.navigate('SignUp') }}
            className="py-3 bg-yellow-400 mx-7 rounded-xl">
            <Text
              className="text-xl font-bold text-center text-gray-700"
            >
              Đăng Ký
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center space-x-2">
            <Text className="text-white font-semibold">
              Đã có tài khoản ?
            </Text>
            <TouchableOpacity
              onPress={() => { navigation.navigate('Login') }}
            >
              <Text className="font-semibold text-gray-700">
                Đăng Nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}