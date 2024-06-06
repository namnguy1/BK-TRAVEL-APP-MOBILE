import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Image } from 'react-native'
import { useSelector } from 'react-redux';
import { selectUserToken } from '../slices/authSlice';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { BASE_URL } from '../api';
import { useNavigation } from '@react-navigation/native';
import { selectReloadPageAfterClick } from '../slices/reloadSlice'
import TourItem from './TourItem';
import BookingItem from './BookingItem';
// const BookingItem = ({ order, navigation }) => (
    
//     <View className="w-full p-2 bg-gray-100 rounded-xl mt-4">
//         <View className="flex-row justify-between items-center">
//             <View className="flex-row space-x-1 items-center">
//                 <Text className="font-semibold text-xl">Mã đơn hàng :</Text>
//                 <Text className="font-semibold text-red-500 text-xl">{order.payment_id}</Text>
//             </View>
//             <View className="space-y-2">
//                 <View className="w-full p-2 bg-[#9bebc4] items-center justify-center rounded-xl">
//                     <Text>{order.status}</Text>
//                 </View>
//                 <TouchableOpacity className=" p-2 bg-red-500 items-center justify-center rounded-xl">
//                     <Text className="text-white">Hủy đơn hàng</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>

//         {order.tours.map(tour => (
//             <TourItem key={tour.tour_id} tour={tour} navigation={navigation} />
//         ))}
//         <View className="mt-2 flex-row justify-between">
//             <View className="flex-row space-x-2">
//                 <Text className="font-semibold text-[16px]">Ngày đặt tour:</Text>
//                 <Text className="font-semibold text-[16px] text-red-500">{new Date(order.createdAt).toLocaleDateString()}</Text>
//             </View>
//             <Text className="font-semibold text-[20px]">{parseFloat(order.total).toLocaleString()} VNĐ</Text>
//         </View>
//     </View>
// );
// const TourItem = ({ tour, navigation }) => (

//     <TouchableOpacity
//         className="w-full bg-white mt-2 p-4 flex-row space-x-2"
//         onPress={() => {
//             navigation.navigate('ScheduleDetail', { tourid: tour.tour_id })
//         }}
//     >
//         <Image
//             source={{ uri: tour.cover_image }}
//             style={{ width: 120, height: 140 }}
//             className="rounded-xl"
//         />
//         <View className="flex-1 space-y-2">
//             <Text className="font-semibold text-[14px]">{tour.name}</Text>
//             <View className="flex-row space-x-2">
//                 <Text>Khởi hành từ:</Text>
//                 <Text className="text-red-500">{tour.departure_place}</Text>
//             </View>
//             <View className="flex-row space-x-2">
//                 <Text>Điểm đến:</Text>
//                 <Text className="text-red-500">{tour.destination_place}</Text>
//             </View>
//             <View className="flex-row space-x-2">
//                 <Text>Thời gian:</Text>
//                 <Text className="text-red-500">{tour.time}</Text>
//             </View>
//             <View className="flex-row space-x-2">
//                 <Text>Khởi hành:</Text>
//                 <Text className="text-red-500">{`${tour.departure_time} - Ngày ${new Date(tour.departure_date).toLocaleDateString()}`}</Text>
//             </View>
//         </View>
//     </TouchableOpacity>
// );
export default function TopBooking2() {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const userToken = useSelector(selectUserToken);
    // console.log('userToken:', userToken)
    const json = jwtDecode(userToken);
    // console.log('json:', json);
    const userId = json.user_id;
    // console.log('userId:', userId);
    const [completedOrders, setCompletedOrders] = useState([]);
    const reloadPageAfterClick = useSelector(selectReloadPageAfterClick);
    const handleGetCompletedOrders = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/orders/${userId}/complete`, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            console.log('response:', response.data.complete_orders);
            if (response?.status === 200) {
                setCompletedOrders(response.data.complete_orders);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userToken, userId]);
    useEffect(() => {
        handleGetCompletedOrders();
    }, [handleGetCompletedOrders, reloadPageAfterClick]);
    return (
        <SafeAreaView className="flex-1 p-4 bg-white mb-[100px]">
            <ScrollView className="">
                {completedOrders.length > 0 ? (
                    completedOrders.map(order => <BookingItem navigation={navigation} key={order.order_id} order={order} />)
                ) : (
                    <View className="flex-1 items-center justify-center">
                        <Text className="text-lg">No completed orders found.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>

    )
}