import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeColors } from '../theme';
import InformationUserBox from '../components/InformationUserBox';
export default function UserInformation() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        return navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(0) }}
                        className="rounded-full p-1 shadow"
                        onPress={() => { navigation.goBack() }}
                    >
                        <Entypo name="chevron-left" size={30} color="#737373" />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3 ml-3">
                        <Text className="text-neutral-700 font-medium text-2xl">
                            Thông tin cá nhân
                        </Text>
                    </View>
                </View>
            ),

        });
    }, []);
    return (

        <View className="flex-1  bg-white">
            <View className="space-y-6 p-4">

                <InformationUserBox
                    field="Họ của bạn"
                    data="Đỗ"
                />
                <InformationUserBox
                    field="Tên của bạn"
                    data="Long"
                />
                <InformationUserBox
                    field="Số điện thoại của bạn"
                    data="0337533067"
                />
                <InformationUserBox
                    field="Giới tính"
                    data="Nam"
                />
                <View className="flex-row items-center p-2 justify-between border-b-[1px] border-gray-200">
                    <View>
                        <Text className="text-lg text-gray-500">Email</Text>
                        <Text className="text-2xl font-bold">nam@gmail.com</Text>
                    </View>
                    
                </View>



            </View>
            <View className="p-4 py-2 w-full h-[100px] absolute items-center justify-center  bg-white bottom-0  space-y-1 border-t-[0.5px] border-t-indigo-500">

                <View className="flex-row">
                    <TouchableOpacity className="w-full h-[50px] 
     bg-[#FF5F73]
        justify-center rounded-2xl
        items-center">
                        <Text className="text-white font-bold text-[20px] text-center">
                            Cập nhập thông tin
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}