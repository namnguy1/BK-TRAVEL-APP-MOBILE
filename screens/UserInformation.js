import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeColors } from '../theme';
import { BASE_URL, getUserById } from '../api';
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import { selectUserToken } from '../slices/authSlice';
import axios from 'axios';
import Toast from 'react-native-toast-message';
export default function UserInformation() {
    const userToken = useSelector(selectUserToken);
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(0) }}
                        className="rounded-full p-1 shadow"
                        onPress={() => navigation.goBack()}
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
    }, [navigation]);

    const handleUpdateUserInfo = useCallback(async () => {
        try {
            const user_id = user.user_id;
            const requestBody = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                dob: user.dob,
                phone_number: user.phone_number,
                gender: user.gender,
            };
            const response= await axios.put(`${BASE_URL}/api/v1/users/${user_id}`, requestBody, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            if (response?.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Cập nhập thông tin thành công',
                    text2: 'Thông tin của bạn đã được cập nhập👋'
                  });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Cập nhập thông tin không thành công',
                    text2: 'Vui lòng thử lại sau👋'
                  });
            }
        } catch (err) {
            console.error(err);
        }
    }, [user, userToken]);
    useEffect(() => {
        const fetchUser = async () => {
            const json = jwtDecode(userToken);
            const userData = await getUserById(json.user_id, userToken);
            setUser(userData.user_info);
            
        };
        fetchUser();
    }, [userToken]);

    return (
        <View className="flex-1 bg-white">
            <View className="space-y-6 p-4">
                <UserInfoItem
                    label="Họ"
                    value={user?.firstname}
                    onChange={(value) => setUser({ ...user, firstname: value })}
                />
                <UserInfoItem
                    label="Tên"
                    value={user?.lastname}
                    onChange={(value) => setUser({ ...user, lastname: value })}
                />
                <UserInfoItem
                    label="Số điện thoại"
                    value={user?.phone_number}
                    onChange={(value) => setUser({ ...user, phone_number: value })}
                />
                <UserInfoItem
                    label="Giới tính"
                    value={user?.gender}
                    onChange={(value) => setUser({ ...user, gender: value })}
                />
                <UserInfoItem
                    label="Email"
                    value={user?.email}
                    editable={false}
                />
            </View>
            <View className="p-4 py-2 w-full h-[100px] absolute items-center justify-center bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">
                <View className="flex-row">
                    <TouchableOpacity
                        className="w-full h-[50px] bg-[#FF5F73] justify-center rounded-2xl items-center"
                        onPress={handleUpdateUserInfo}
                    >
                        <Text className="text-white font-bold text-[20px] text-center">
                            Cập nhập thông tin
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const UserInfoItem = ({ label, value, onChange, editable = true }) => (
    <View className="flex-row items-center p-2 justify-between border-b-[1px] border-gray-200">
        <View className="w-[70%]">
            <Text className="text-lg text-gray-500">{label}</Text>
            <TextInput
                className="text-2xl font-bold"
                value={value}
                onChangeText={onChange}
                editable={editable}
            />
        </View>
        {editable && (
            <TouchableOpacity>
                <Text className="text-xl text-[#4a68ff]">Chỉnh sửa</Text>
            </TouchableOpacity>
        )}
    </View>
);
