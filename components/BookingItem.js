import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import TourItem from './TourItem'
import { useSelector } from 'react-redux';
import { selectUserToken } from '../slices/authSlice';
import axios from 'axios';
import { BASE_URL } from '../api';

export default function BookingItem({ order, navigation }) {
    console.log('order id:', order.order_id);
    console.log('payment id:', order.payment_id);
    const order_id = order.order_id;
    const paymentId = order.payment_id;
    const userToken = useSelector(selectUserToken);
    console.log('user token:', userToken);
    const handleCancelOrder = useCallback(async () => {
        try {
            const body = {
                order_id: order_id,
                payment_id: paymentId,
            };
            const response = await axios.post(`${BASE_URL}/api/v1/users/payment/refund`, body, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            if (response?.status === 200) {
                navigation.navigate('PaymentRefund', { link_payment: response.data.link_payment })
            }
        } catch (error) {
            console.error(error);
        }
    }, [order_id, paymentId, userToken]);
    return (
        <View className="w-full p-2 bg-gray-100 rounded-xl mt-4">
            <View className="flex-row justify-between items-center">
                <View className="flex-row space-x-1 items-center">
                    <Text className="font-semibold text-xl">Mã đơn hàng :</Text>
                    <Text className="font-semibold text-red-500 text-xl">{order.payment_id}</Text>
                </View>
                <View className="space-y-2">
                    <View className="w-full p-2 bg-[#9bebc4] items-center justify-center rounded-xl">
                        <Text>{order.status}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleCancelOrder}
                        className="p-2 bg-red-500 items-center justify-center rounded-xl">
                        <Text className="text-white">Hủy đơn hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {order.tours.map(tour => (
                <TourItem key={tour.tour_id} tour={tour} navigation={navigation} />
            ))}
            <View className="mt-2 flex-row justify-between">
                <View className="flex-row space-x-2">
                    <Text className="font-semibold text-[16px]">Ngày đặt tour:</Text>
                    <Text className="font-semibold text-[16px] text-red-500">{new Date(order.createdAt).toLocaleDateString()}</Text>
                </View>
                <Text className="font-semibold text-[20px]">{parseFloat(order.total).toLocaleString()} VNĐ</Text>
            </View>
        </View>
    )
}