import { View, Text } from 'react-native'
import React from 'react'

export default function OrderUserScreen() {
    return (
        <View className="flex-1 bg-white px-4">
            <View className="flex-row items-center space-x-2">
                <View className="w-2 h-6 bg-[#212460] rounded"></View>
                <Text className=" py-2 text-2xl font-bold">Đơn hàng đã được thành toán</Text>
            </View>
        </View>
    )
}