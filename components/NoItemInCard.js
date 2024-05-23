import { View, Text, Image } from 'react-native'
import React from 'react'

export default function NoItemInCard() {
    return (
        <View className="flex-1 justify-center items-center">
            <Image source={require('../assets/images/empty-cart.png')}
                style={{ width: 100, height: 100, marginRight: 15 }} />
            <View className="mt-4 space-y-2">
                <Text className='font-bold text-2xl'>Giỏ hàng của bạn hiện đang trống!</Text>
                <Text className='text-center text-gray-500'>bạn có cần chút gợi ý?</Text>
            </View>
        </View>
    )
}