import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import { HeartIcon, MinusIcon, PlusIcon, MapPinIcon, CalendarIcon } from 'react-native-heroicons/outline'
export default function SearchingTour() {
    const navigation = useNavigation();
    return (
        <View className="flex-1 bg-white relative">
            <View className="absolute z-10  flex-row px-4 py-4  items-center w-full">
                <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white rounded-2xl p-3 shadow">
                    <ChevronLeftIcon size="23" stroke={50} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold ml-[90px]">Tìm Kiếm</Text>

            </View>
            <View className="px-4 mt-[80px] space-y-4">
                <View className="flex-row px-3 items-center justify-between w-full h-[80px] rounded-2xl border-[0.5px]">
                    <View className="space-y-2">
                        <Text>Khởi hành:</Text>
                        <Text className="text-[16px] font-bold">TP Hồ Chí Minh</Text>
                    </View>
                    <MapPinIcon size="26" color="black" />
                </View>
                <View className="flex-row px-3 items-center justify-between w-full h-[80px] rounded-2xl border-[0.5px]">
                    <View className="space-y-2">
                        <Text>Điểm đến:</Text>
                        <Text className="text-[16px] font-bold">TP Hồ Chí Minh</Text>
                    </View>
                    <MapPinIcon size="26" color="black" />
                </View>
                <View className="flex-row px-3 items-center justify-between w-full h-[80px] rounded-2xl border-[0.5px]">
                    <View className="space-y-2">
                        <Text>Ngày khởi hành:</Text>
                        <Text className="text-[16px] font-bold">12/10/2023</Text>
                    </View>
                    <CalendarIcon size="26" color="black" />
                </View>
                <View className="flex-row px-3 items-center justify-between w-full h-[80px] rounded-2xl border-[0.5px]">
                    <View className="space-y-2">
                        <Text>Thời gian tour:</Text>
                        <Text className="text-[16px] font-bold">Từ 3 đến 5 ngày</Text>
                    </View>
                    <ChevronDownIcon size="26" color="black" />
                </View>
            </View>
            <View className="px-12 mt-[150px]">
                <TouchableOpacity 
                className="w-full h-12  rounded-2xl border-[1px]  flex-row justify-center items-center space-x-4"
                style={{
                    borderColor: '#42bcf5'
                }}
                >
                    <Text className="text-sky-400/100 font-bold text-[20px] text-center">+</Text>
                    <Text className="text-sky-400/100 font-bold text-[20px] text-center">Tạo tour của riêng bạn</Text>
                </TouchableOpacity>
            </View>

            <View className="px-4 py-2 w-full h-[100px] absolute items-center justify-center  bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">

                <View className="flex-row">
                    <TouchableOpacity className="w-full h-[50px] 
                     bg-[#FF5F73]
                        justify-center rounded-2xl
                        items-center">
                        <Text className="text-white font-bold text-[20px] text-center">
                            Tìm kiếm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}