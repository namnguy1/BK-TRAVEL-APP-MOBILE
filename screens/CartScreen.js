import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '../components/CheckBox';
import { ChevronLeftIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import { HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, PencilSquareIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native';
import { IntroduceImage, formatCurrency } from '../constants';
import { BASE_URL, getUserById } from '../api';
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import "core-js/stable/atob";
import { selectUserToken } from '../slices/authSlice';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import NoItemInCard from '../components/NoItemInCard';
export default function CartScreen() {

    // lấy dữ liệu người dùng
    const userToken = useSelector(selectUserToken);
    const json = jwtDecode(userToken);
    const userId = json.user_id;

    const [cartList, setCartList] = useState([]);
    const [selectedTour, setSelectedTour] = useState([]);
    const [reload, setReload] = useState(false);

    const [reloadList, setReloadList] = useState(false);
    const toggleReloadList = () => setReloadList(!reloadList);

    const navigation = useNavigation();
    const getCartList = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/users/${userId}/cart`, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            console.log('response; ',response);
            if (response?.status === 200) {
                setCartList(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching cartss:', error);
        }
    }, [userId])
    const totalPrice = () => {
        if (!cartList?.cart?.order_items) return 0;
        return cartList.cart.order_items.reduce((total, item) => {
            if (selectedTour.includes(item.tour_id)) {
                return total + parseInt(item.total_price);
            }
            return total;
        }, 0);
    };


    useEffect(() => {
        getCartList();

    }, [getCartList, reload]);




    return (
        <View className="flex-1 relative bg-white">
            <View
                className="absolute z-10 justify-between flex-row px-4 py-2  items-center w-full"
                style={{
                    borderWidth: 0.2,
                    borderColor: 'gray',
                }}
            >
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white rounded-2xl p-3 shadow">
                        <ChevronLeftIcon size="23" stroke={50} color="black" />
                    </TouchableOpacity>
                    <Text className="text-[16px] font-bold">Giỏ hàng</Text>
                </View>
                <TouchableOpacity onPress={toggleReloadList}>
                    <Text className="text-[16px] font-bold">Bỏ chọn tất cả</Text>
                </TouchableOpacity>
            </View>
            {cartList?.cart?.order_items.length === 0

                ? (
                    <NoItemInCard />
                ) : (
                    <View className="mt-[100px] space-y-8">
                        {cartList?.cart?.order_items.map(order => (

                            <View
                                key={order.id}
                            >

                                <ProductItem
                                    userId={userId}
                                    userToken={userToken}
                                    tourId={order.tour_id}
                                    cartId={order.cart_id}
                                    adultQuantity={
                                        order.adult_quantity
                                    }
                                    childQuantity={
                                        order.child_quantity
                                    }
                                    totalPrice={order.total_price}
                                    reload={reload}
                                    setReload={setReload}
                                    selectedTour={selectedTour}
                                    setSelectedTour={setSelectedTour}
                                    reloadList={reloadList}
                                    setReloadList={setReloadList}

                                />
                            </View>
                        ))}

                    </View>
                )
            }

            <View className="px-4 py-4 w-full h-[100px] absolute bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">

                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-gray-500 text-xl">
                            Tổng cộng ({selectedTour.length} đơn vị)
                        </Text>
                        <Text className="font-bold text-2xl text-red-500">{formatCurrency(totalPrice())} VNĐ</Text>
                    </View>

                    <TouchableOpacity className="w-[180px] h-[50px] 
                     bg-[#FF5F73]
                        justify-center rounded-2xl
                        items-center">
                        <Text className="text-white font-bold text-[20px] text-center">
                            Thanh toán
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
