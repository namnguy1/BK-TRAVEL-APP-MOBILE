import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function InformationUserBox({ field, data }) {
    return (
        <View className="flex-row items-center p-2 justify-between border-b-[1px] border-gray-200">
            <View>
                <Text className="text-lg text-gray-500">{field}</Text>
                <Text className="text-2xl font-bold">{data}</Text>
            </View>
            <TouchableOpacity>
                <Text className="text-xl text-[#4a68ff]">Chỉnh sửa</Text>
            </TouchableOpacity>
        </View>
    )
}