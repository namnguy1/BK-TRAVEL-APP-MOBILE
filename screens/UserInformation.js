import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeColors } from '../theme';
import InformationUserBox from '../components/InformationUserBox';
import { getUserById } from '../api';
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import "core-js/stable/atob";
import { selectUserToken } from '../slices/authSlice';

export default function UserInformation() {
    const userToken = useSelector(selectUserToken);
    const [user, setUser] = useState(null);
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
    useEffect(() => {
        const fetchUser = async () => {
            const json = jwtDecode(userToken);
            const userData = await getUserById(json.user_id, userToken);
            setUser(userData.user_info);

        };
        fetchUser();
    }, [userToken]);
    return (

        <View className="flex-1  bg-white">
            <View className="space-y-6 p-4">

                <View className="flex-row items-center p-2 justify-between border-b-[1px] border-gray-200">
                    <View className="w-[70%] ">
                        <Text className="text-lg text-gray-500">Họ</Text>
                        <TextInput className="text-2xl font-bold">{user?.firstname}</TextInput>
                    </View>
                    <TouchableOpacity>
                        <Text className="text-xl text-[#4a68ff]">Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center p-2 justify-between border-b-[1px] border-gray-200">
                    <View className="w-[70%] ">
                        <Text className="text-lg text-gray-500">Tên</Text>
                        <TextInput className="text-2xl font-bold">{user?.lastname}</TextInput>
                    </View>
                    <TouchableOpacity>
                        <Text className="text-xl text-[#4a68ff]">Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center p-2 justify-between border-b-[1px] border-gray-200">
                    <View className="w-[70%] ">
                        <Text className="text-lg text-gray-500">Số điện thoại</Text>
                        <TextInput className="text-2xl font-bold">{user?.phone_number}</TextInput>
                    </View>
                    <TouchableOpacity>
                        <Text className="text-xl text-[#4a68ff]">Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center p-2 justify-between border-b-[1px] border-gray-200">
                    <View>
                        <Text className="text-lg text-gray-500">Giới tính</Text>
                        <Text className="text-2xl font-bold">{user?.gender}</Text>
                    </View>
                    <TouchableOpacity>
                        <Text className="text-xl text-[#4a68ff]">Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>



                <View className="flex-row items-center p-2 justify-between border-b-[1px] border-gray-200">
                    <View>
                        <Text className="text-lg text-gray-500">Email</Text>
                        <Text className="text-2xl font-bold">{user?.email}</Text>
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