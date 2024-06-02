import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '../api';

const discountData = [
    {
        id: 1,
        img: 'https://play-lh.googleusercontent.com/jA5PwYqtmoFS7StajBe2EawN4C8WDdltO68JcsrvYKSuhjcTap5QMETkloXSq5soqRBqFjuTAhh28AYrA6A=w240-h480-rw', // replace with actual image URL
        startDate: '27/05/2024',
        endDate: '31/05/2024',
        discountCode: 'y4RWcxD',
        remainingQuantity: 15,
        discountType: 'Giảm giá cố định',
        minOrderValue: 1000000,
        discountValue: 100000
    },
    // Add more discount objects if needed
];

export default function EndowScreen() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(0) }}
                        className="rounded-full p-2 shadow"
                        onPress={() => navigation.goBack()}
                    >
                        <Entypo name="chevron-left" size={30} color="#737373" />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3 ml-3">
                        <Text className="text-neutral-700 font-medium text-2xl">
                            Danh sách ưu đãi
                        </Text>
                    </View>
                </View>
            ),
        });
    }, [navigation]);
    const [allVouchers, setAllVouchers] = useState([]);
    const handleGetAllVouchers = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/vouchers/all`);
            if (response?.status === 200) {
                setAllVouchers(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);
    useEffect(() => {
        handleGetAllVouchers();
    }, [handleGetAllVouchers]);
    return (
        <View className="flex-1 bg-white">
            <View className="px-4 ">
                <View className="flex-row items-center space-x-2">
                    <View className="w-2 h-6 bg-[#212460] rounded"></View>
                    <Text className=" py-2 text-2xl font-bold">Danh sách các mã giảm giá</Text>
                </View>
            </View>
            <ScrollView className="px-4">
                {allVouchers.map((item) => (
                    <View key={item.voucher_id} className="bg-gray-100 p-4 my-2 rounded-lg shadow">
                        <View className="flex-row items-center space-x-4">
                            <Image
                                source={{ uri: item.image }}
                                className="w-[140px] h-full rounded-xl"
                            />
                            <View>
                                <Text className="text-lg font-bold text-red-500">Khuyến mãi</Text>
                                <View className="flex-row">
                                    <Text className="text-sm font-semibold ">Ngày bắt đầu: </Text>
                                    <Text className="text-red-500 font-semibold">{new Date(item.start_date).toLocaleDateString()}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="text-sm font-semibold ">Ngày kết thúc: </Text>
                                    <Text className="text-red-500 font-semibold">{new Date(item.expired_date).toLocaleDateString()}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="text-sm font-semibold ">Mã giảm giá: </Text>
                                    <Text className="text-red-500 font-semibold">{item.code_voucher}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="text-sm font-semibold ">Số lượng còn lại: </Text>
                                    <Text className="text-red-500 font-semibold">{item.remain_number}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="text-sm font-semibold ">Loại giảm giá: </Text>
                                    <Text className="text-red-500 font-semibold">{item.type === 'fixed' ? 'Giảm giá cố định' : 'Giảm giá phần trăm'}</Text>
                                </View>
                                <View className="flex-row">
                                    <Text className="text-sm font-semibold ">Giá trị đơn tối thiểu: </Text>
                                    <Text className="text-red-500 font-semibold">{item.min_order_value.toLocaleString()}</Text>
                                </View>
                               
                                <Text className="text-lg text-green-600 font-bold">Giảm: {item.value_discount.toLocaleString()} VNĐ</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
