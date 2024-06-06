import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function TourItem({ tour, navigation }) {
    return (
        <TouchableOpacity
            className="w-full bg-white mt-2 p-4 flex-row space-x-2"
            onPress={() => {
                navigation.navigate('ScheduleDetail', { tourid: tour.tour_id })
            }}
        >
            <Image
                source={{ uri: tour.cover_image }}
                style={{ width: 120, height: 140 }}
                className="rounded-xl"
            />
            <View className="flex-1 space-y-2">
                <Text className="font-semibold text-[14px]">{tour.name}</Text>
                <View className="flex-row space-x-2">
                    <Text>Khởi hành từ:</Text>
                    <Text className="text-red-500">{tour.departure_place}</Text>
                </View>
                <View className="flex-row space-x-2">
                    <Text>Điểm đến:</Text>
                    <Text className="text-red-500">{tour.destination_place}</Text>
                </View>
                <View className="flex-row space-x-2">
                    <Text>Thời gian:</Text>
                    <Text className="text-red-500">{tour.time}</Text>
                </View>
                <View className="flex-row space-x-2">
                    <Text>Khởi hành:</Text>
                    <Text className="text-red-500">{`${tour.departure_time} - Ngày ${new Date(tour.departure_date).toLocaleDateString()}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}