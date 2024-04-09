import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import * as Icon from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { CalendarIcon } from 'react-native-heroicons/solid'
import { Entypo } from '@expo/vector-icons'
export default function OrderCustomization() {
    const navigation = useNavigation()
    return (
        <View className="flex-1 bg-white">
            <View className="relative py-4 shadow-xm">
                <TouchableOpacity
                    style={{ backgroundColor: themeColors.bgColor(0) }}
                    className="absolute z-10 rounded-full p-1 shadow top-4 left-2"
                    onPress={() => { navigation.goBack() }}
                >
                     <Entypo name="chevron-left" size={30} color="#737373" />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-2xl items-center">
                        Tùy chọn đơn hàng
                    </Text>
                </View>
            </View>
            <View className="px-4 mt-2">
                <View className="flex-row w-full justify-between">
                    <Text className="text-center text-[16px] font-bold w-[50%]">Tour VIP Trong Ngày Củ Chi - Đồng Bằng Sông Cửu Long</Text>
                    <TouchableOpacity className="flex-row space-x-2">
                        <Text className="underline text-[16px]">Chi tiết</Text>
                        <Icon.ArrowRightCircle strokeWidth={1} stroke="black" />
                    </TouchableOpacity>
                </View>
                <View className="bg-gray-300 w-[190px] p-1 mt-2">
                    <Text className="text-gray-500">Hoàn hủy miễn phí trong 24h</Text>
                </View>
            </View>
            <View className="px-4 mt-4">
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccd9cf'
                    }}
                    className="flex-row px-3 items-center justify-between w-full h-[80px] rounded-2xl">
                    <View className="space-y-2">
                        <Text>Chọn ngày đi tour:</Text>
                        <Text className="text-[16px] font-bold">12/10/2023</Text>
                    </View>
                    <CalendarIcon size="26" color="black" />
                </View>
            </View>
            <View className="px-4 mt-4">
                <View style={{
                    borderWidth: 1,
                    borderColor: '#ccd9cf'
                }}
                    className="p-3 w-full  rounded-2xl space-y-4">
                    <View className="flex-row items-center justify-between">
                        <Text className="font-bold text-xl ">Người lớn</Text>
                        <View className="flex-row space-x-6">
                            <TouchableOpacity className="rounded-full bg-gray-200 w-[30px] h-[30px] items-center justify-center">
                                <Text className="font-bold text-2xl ">-</Text>
                            </TouchableOpacity>
                            <Text className="text-gray-500 text-2xl ">0</Text>
                            <TouchableOpacity className="rounded-full bg-gray-200 w-[30px] h-[30px] items-center justify-center">
                                <Text className="font-bold text-2xl ">+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-bold text-xl ">Trẻ em (5-9)</Text>
                        <View className="flex-row space-x-6">
                            <TouchableOpacity className="rounded-full bg-gray-200 w-[30px] h-[30px] items-center justify-center">
                                <Text className="font-bold text-2xl ">-</Text>
                            </TouchableOpacity>
                            <Text className="text-gray-500 text-2xl ">0</Text>
                            <TouchableOpacity className="rounded-full bg-gray-200 w-[30px] h-[30px] items-center justify-center">
                                <Text className="font-bold text-2xl ">+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View className="px-4 py-2 w-full h-[100px] absolute  justify-center  bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">
                <Text className="font-bold text-2xl">đ 1.369,000</Text>
                <View className="flex-row">

                    <TouchableOpacity className="w-full h-[50px] 
                    bg-[#FF5F73] justify-center rounded-2xl items-center"
                        onPress={() =>{navigation.navigate('OrderCompletion')}}
                    >
                        <Text className="text-white font-bold text-[20px] text-center">
                            Đặt ngay
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}