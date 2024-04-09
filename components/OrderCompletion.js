import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import * as Icon from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { CalendarIcon } from 'react-native-heroicons/solid'
import { Entypo } from '@expo/vector-icons'
export default function OrderCompletion() {
    const navigation = useNavigation();
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
                        Hoàn tất đơn hàng
                    </Text>
                </View>
            </View>
            <ScrollView className="">
                <View className="px-4 mt-4">
                    <Text className="mb-2">Thông tin liên lạc: </Text>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccd9cf'
                        }}
                        className="flex-row p-3 items-center justify-between w-full rounded-2xl">
                        <View className="form flex-1 space-y-2 mt-2">

                            <Text className="font-bold text-gray-700 ml-2">Họ tên</Text>
                            <TextInput
                                className="p-2  text-gray-700 rounded-xl"
                                placeholder="Họ tên đầy đủ (có dấu)"
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccd9cf'
                                }}
                            />
                            <Text className="font-bold text-gray-700 ml-2">Số điện thoại</Text>
                            <TextInput
                                className="p-2  text-gray-700 rounded-xl"
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccd9cf'
                                }}
                            />
                            <Text className="font-bold text-gray-700 ml-2">Email</Text>
                            <TextInput
                                className="p-2  text-gray-700 rounded-xl"
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccd9cf'
                                }}
                            />
                            <Text className="font-bold text-gray-700 ml-2">Địa chỉ</Text>
                            <TextInput
                                className="p-2  text-gray-700 rounded-xl"
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccd9cf'
                                }}
                            />
                            <Text className="font-bold text-gray-700 ml-2">Ghi chú thêm</Text>
                            <TextInput
                                className="p-2 flex-1 text-gray-700 rounded-xl h-auto min-h-[100px] max-h-[200px]"
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccd9cf',
                                    textAlignVertical: 'top',
                                }}
                                multiline={true}
                            />


                        </View>
                    </View>
                </View>


            </ScrollView>

            <View className="px-4 py-2 w-full h-[100px] absolute  justify-center  bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">
                <Text className="font-bold text-2xl">đ 1.369,000</Text>
                <View className="flex-row">

                    <TouchableOpacity className="w-full h-[50px] 
            bg-[#FF5F73] justify-center rounded-2xl items-center"
                        onPress={() => { navigation.navigate('MapScreen') }}
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