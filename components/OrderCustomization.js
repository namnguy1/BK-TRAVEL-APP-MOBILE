import { View, Text, TouchableOpacity, TextInput, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme'
import * as Icon from 'react-native-feather'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CalendarIcon } from 'react-native-heroicons/solid'
import { Entypo } from '@expo/vector-icons'
import { BASE_URL, getUserById } from '../api'
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import "core-js/stable/atob";
import { selectUserToken } from '../slices/authSlice';
import axios from 'axios'
import { formatCurrency } from '../constants'
export default function OrderCustomization() {
    const navigation = useNavigation()
    const { params } = useRoute();
    let item = params;
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const incrementAdults = () => setAdults(adults + 1);
    const decrementAdults = () => adults > 1 && setAdults(adults - 1);

    const incrementChildren = () => setChildren(children + 1);
    const decrementChildren = () => children > 0 && setChildren(children - 1);

    const [user, setUser] = useState(null);
    const userToken = useSelector(selectUserToken);
    useEffect(() => {
        const fetchUser = async () => {
            const json = jwtDecode(userToken);
            const userData = await getUserById(json.user_id, userToken);
            setUser(userData.user_info);

        };
        fetchUser();
    }, [userToken]);


    const handleCreateOrder = async () => {
        try {
            const body = {
                user_id: user.user_id,
                adult_quantity: adults,
                children_quantity: children,
                tour_id: item.tour_id,
                name_customer: user?.firstname + ' ' + user?.lastname,
                phone_customer: user?.phone_number,
                address_customer: 'TP. Hồ Chí Minh',

            };
            console.log(body);
            if (body.phone_customer === null) {
                Alert.alert('Vui lòng cập nhật số điện thoại của bạn');
                return;
            }
            const response = await axios.post(`${BASE_URL}/api/v1/order`, body);
            console.log(response.data.order.order_id)
            const response2 = await axios.post(`${BASE_URL}/api/v1/order/payment`, {
                user_id: user.user_id,
                order_id: response.data.order.order_id,
            });
            console.log(response2.data.link_payment)
            navigation.navigate('Payment', { link_payment: response2.data.link_payment })
            // Linking.openURL(response2.data.link_payment);
            
        } catch (error) {
            console.error(error);
        }
    }
  
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
                        Điền thông tin
                    </Text>
                </View>
            </View>
            <View className="px-4 mt-2">
                <View className="flex-row w-full justify-between">
                    <Text className="text-center text-[16px] font-bold w-[50%]">{item.name}</Text>
                    <TouchableOpacity className="flex-row space-x-2">
                        <Text className="underline text-[16px]">Chi tiết</Text>
                        <Icon.ArrowRightCircle strokeWidth={1} stroke="black" />
                    </TouchableOpacity>
                </View>
                <View className="bg-gray-300 w-[190px] p-1 mt-2">
                    <Text className="text-gray-500">Hoàn hủy miễn phí trong 24h</Text>
                </View>
            </View>
            <View className="px-4 mt-4 space-y-2">
                <Text className="text-xl text-gray-700 font-semibold">Vui lòng nhập mã ưu đãi của bạn</Text>
                <View className="w-full h-12 flex-row px-4 " style={{ borderWidth: 1, borderColor: 'lightgray' }}>
                    <TextInput
                        className="w-[80%]  bg-white"
                        placeholder='Nhập mã ưu đãi của bạn'
                        placeholderTextColor='gray'

                    />
                    <TouchableOpacity className="w-[25%] items-center justify-center" style={{ backgroundColor: themeColors.bgColor(1) }}>
                        <Text className="text-white font-bold">Sử dụng</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="px-4 mt-4">
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccd9cf',
                    }}
                    className="p-3 w-full  rounded-2xl space-y-4"
                >
                    <View className="flex-row items-center justify-between">
                        <Text className="font-bold text-xl ">Người lớn</Text>
                        <View className="flex-row space-x-6">
                            <TouchableOpacity
                                className="rounded-full bg-gray-200 w-[30px] h-[30px] items-center justify-center"
                                onPress={decrementAdults}
                            >
                                <Text className="font-bold text-2xl ">-</Text>
                            </TouchableOpacity>
                            <Text className="text-gray-500 text-2xl ">{adults}</Text>
                            <TouchableOpacity
                                className="rounded-full bg-gray-200 w-[30px] h-[30px] items-center justify-center"
                                onPress={incrementAdults}
                            >
                                <Text className="font-bold text-2xl ">+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-bold text-xl ">Trẻ em (5-9)</Text>
                        <View className="flex-row space-x-6">
                            <TouchableOpacity
                                className="rounded-full bg-gray-200 w-[30px] h-[30px] items-center justify-center"
                                onPress={decrementChildren}
                            >
                                <Text className="font-bold text-2xl ">-</Text>
                            </TouchableOpacity>
                            <Text className="text-gray-500 text-2xl ">{children}</Text>
                            <TouchableOpacity
                                className="rounded-full bg-gray-200 w-[30px] h-[30px] items-center justify-center"
                                onPress={incrementChildren}
                            >
                                <Text className="font-bold text-2xl ">+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View className="px-4 py-2 w-full h-[100px] absolute  justify-center  bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">
                <Text className="font-bold text-2xl text-red-500">{formatCurrency(item.price)} VNĐ </Text>
                <View className="flex-row">

                    <TouchableOpacity className="w-full h-[50px] 
                    bg-[#FF5F73] justify-center rounded-2xl items-center"
                        onPress={handleCreateOrder}
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