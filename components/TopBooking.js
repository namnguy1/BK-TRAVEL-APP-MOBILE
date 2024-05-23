import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { BASE_URL } from '../api'
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import "core-js/stable/atob";
import { selectUserToken } from '../slices/authSlice';
import dayjs from 'dayjs';

import { UserIcon, ChevronLeftIcon, ChevronDownIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/solid'
import { DEFAULT_DISPLAY_DATE_FORMAT, formatCurrency } from '../constants';
import { selectReloadPageAfterClick } from '../slices/reloadSlice'
export default function TopBooking() {
  const userToken = useSelector(selectUserToken);
  const json = jwtDecode(userToken);
  const userId = json.user_id;
  const [completedOrders, setCompletedOrders] = useState([]);
  const reloadPageAfterClick = useSelector(selectReloadPageAfterClick);
  const handleGetCompletedOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/users/${userId}/completed_order`, {
        headers: {
          Authorization: `${userToken}`,
        },
      });
      if (response?.status === 200) {
        setCompletedOrders(response.data.complete_orders);
      }

    } catch (error) {
      console.error(error);
    }
  }, [userId]);
  useEffect(() => {
    handleGetCompletedOrders();
  }, [handleGetCompletedOrders, reloadPageAfterClick]);

  return (
    <View className='flex-1 bg-white p-4'>

      {completedOrders.length === 0 && (
        <View className='items-center'>
          <Image source={require('../assets/images/empty-cart.png')}
            style={{ width: 100, height: 100, marginRight: 15 }} />
          <View className="mt-4 space-y-2">
            <Text className='font-bold text-2xl'>Chưa có đơn hàng nào !</Text>
            <Text className='text-center text-gray-500'>bạn có cần chút gợi ý ?</Text>
          </View>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        className="space-y-10"
      >
        {
          completedOrders.map(order => (
            <View key={order.order_id}>
              <View className="w-full  bg-[#f5f5f5] p-4 rounded-lg">
                <View className="flex-row justify-between">
                  <View>
                    <View>
                      <Text className="font-bold text-xl">Mã đơn hàng</Text>
                      <Text className="font-semibold text-red-500 text-xl">{order.payment_id}</Text>
                    </View>
                    <View className="">
                      <Text className="font-bold text-xl">Giá thanh toán</Text>
                      <Text className="font-semibold text-red-500 text-xl">{formatCurrency(parseInt(order.total_to_pay))} VNĐ</Text>
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text className="font-bold text-xl">Giá tiền</Text>
                      <Text className="font-semibold text-red-500 text-xl">{formatCurrency(parseInt(order.total))} VNĐ</Text>
                    </View>
                    <View>
                      <Text className="font-bold text-xl">Ngày thanh toán</Text>
                      <Text className="font-semibold text-red-500 text-xl">{dayjs(order.createdAt).format(
                        DEFAULT_DISPLAY_DATE_FORMAT
                      )}</Text>
                    </View>
                  </View>
                </View>
                <View className="px-4 py-1">
                  <View className="p-2 mt-2 bg-[#c8e8d8] rounded-xl items-center justify-center">
                    <Text className="text-xl text-[#34ab71]">Đã thanh toán</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        }


      </ScrollView>

    </View>
  )
}