import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { themeColors } from '../theme';
import { UserIcon, ChevronLeftIcon, ChevronDownIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { selectReloadPageAfterClick, setReloadPageAfterClick } from '../slices/reloadSlice'

import { selectUserToken } from '../slices/authSlice';
export default function SuccessScreen() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const [resultPayment, setResultPayment] = useState('');
  const navigation = useNavigation();
  const { params } = useRoute();
  let item = params;
  console.log('url: ', item.queryParam);
  const parseQueryString = queryString => {
    const params = {};
    const pairs = queryString.split('&');

    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[key] = decodeURIComponent(value.replace(/\+/g, ' '));
    });

    return params;
  };
  const reloadPageAfterClick = useSelector(selectReloadPageAfterClick);
  const handleGoback = () => {
    dispatch(setReloadPageAfterClick(!reloadPageAfterClick));
    navigation.navigate('Home');

  };


  const hanldeGetPaymentResult = useCallback(async () => {
    try {
      const queryString = params.queryParam;
      const searchParams = parseQueryString(queryString);
      console.log('search params: ', searchParams);
      const url = `${BASE_URL}/api/v1/users/payment/vnpay_ipn?${queryString}`;
      const urlRefund = `${BASE_URL}/api/v1/users/payment/refund?${queryString}`;
      let response;
      if (queryString.includes('Thanh+toan')) {
        const response = await axios.get(url, {
          headers: {
            Authorization: `${userToken}`,
          },
        });

    
      } else {
        const response = await axios.get(urlRefund, {
          headers: {
            Authorization: `${userToken}`,
          },
        });
      }
      if (response?.status === 200) {
        setResultPayment(response.data.RspCode);
      }

    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    hanldeGetPaymentResult();
  }, [hanldeGetPaymentResult]);

  return (
    <View className='flex-1  bg-white items-center justify-center'>

      <Image source={require('../assets/images/checked.png')}
        style={{ width: 200, height: 200, marginRight: 15 }} />
      <View className="mt-4 space-y-2 items-center justify-center">
        <Text className='font-bold text-2xl'>Thanh toán thành công !!</Text>
        <Text className='text-center text-gray-500'>Đơn hàng của bạn đã được thanh toán thành công</Text>
      </View>

      <TouchableOpacity
        style={{ backgroundColor: '#32BA7C', }}
        className="bg-blue-500 p-2 rounded-md mt-4"
        onPress={handleGoback}
      >
        <Text className="text-white">Quay lại trang chủ</Text>
      </TouchableOpacity>

    </View>
  )
}