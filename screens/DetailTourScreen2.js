import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { ChevronDownIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/solid'
import * as Icon from "react-native-feather";
import DetailTour from '../components/detailTour';
import { DetailedTourSchedule, formatCurrency } from '../constants'
import Accordion from '../components/Accordion'
import EditPassengerNumberModal from '../components/EditPassengerNumberModal'
import axios from 'axios'
import { BASE_URL } from '../api'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import "core-js/stable/atob";
import { selectUserToken } from '../slices/authSlice';
import { selectReloadPageAfterClick, setReloadPageAfterClick } from '../slices/reloadSlice'
import ReviewTour from '../components/ReviewTour'
import EditPassengerNumberModal2 from '../components/EditPassengerNumberModal2'
import ContactUs from '../components/ContactUs'
import JoinSupportGroupModal from '../components/JoinSupportGroupModal'; // Import the JoinSupportGroupModal component
import { io } from 'socket.io-client';
import Toast from 'react-native-toast-message';
let socket;
export default function DetailTourScreen2() {
    const { params } = useRoute();
    let item = params;
    const dispatch = useDispatch();
    const tourId = item.tour_id
    const userToken = useSelector(selectUserToken);
    const json = jwtDecode(userToken);
    const userId = json.user_id;
    const [reload, setReload] = useState(false);
    const navigation = useNavigation();
    const [hasIncreased, setHasIncreased] = useState(false);
    const [isHeartActive, setHeartActive] = useState(false);
    const toggleHeart = () => {
        setHeartActive(!isHeartActive);
    };
    const [cartQuantity, setCartQuantity] = useState(0);
    const addToCart = () => {
        if (!hasIncreased) {
            setCartQuantity(cartQuantity + 1);
            setHasIncreased(true);
        }
    };
    const [scheduleData, setScheduleData] = useState([]);
    const handleGetScheduleData = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/tours/${tourId}/schedules`, {
                headers: {
                    Authorization: `${userToken}`,
                },
            })
            // console.log('response', response.data)  
            if (response?.status === 200) {
                setScheduleData(response.data.schedule_tour.schedule_detail);
            }

        } catch (error) {
            console.error(error);
        }
    }, [tourId]);
    useEffect(() => {
        handleGetScheduleData();
    }, [handleGetScheduleData]);


    const [status, setStatus] = useState(false);
    const [status2, setStatus2] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const incrementAdults = () => setAdults(adults + 1);
    const decrementAdults = () => adults > 1 && setAdults(adults - 1);

    const incrementChildren = () => setChildren(children + 1);
    const decrementChildren = () => children > 0 && setChildren(children - 1);


    const imageList = JSON.parse(item.list_image);
    // console.log('user token :', userToken);
    const [loveList, setLoveList] = useState([]);
    const handleGetWishListTours = useCallback(async () => {
        try {
            if (userId === 0) {
                return;
            }
            const response = await axios.get(`${BASE_URL}/api/v1/users/${userId}/wishlist`, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            // console.log('response11', response.data.data[0].tours);
            if (response?.status === 200) {
                const tempLoveList = response.data.data[0].tours.map(
                    (item) => item.tour_id
                );
                setLoveList(tempLoveList);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    const reloadPageAfterClick = useSelector(selectReloadPageAfterClick);
    const handleWishListTour = useCallback(async () => {

        const requestBody = {
            user_id: userId,
            tour_id: tourId,
        };
        if (!loveList.includes(tourId)) {
            const response = await axios.post(`${BASE_URL}/api/v1/users/wishlist`, requestBody, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            if (response?.status === 201) {
                setLoveList(prev => [...prev, tourId]);

            }
        } else {
            console.log('request body:', requestBody)
            const response = await axios.delete(`${BASE_URL}/api/v1/users/wishlist`, {
                headers: {
                    Authorization: `${userToken}`,
                },
                data: requestBody,
            });
            if (response?.status === 200) {
                setLoveList(prev => prev.filter(id => id !== tourId));
            }

        }
        dispatch(setReloadPageAfterClick(!reloadPageAfterClick));

    }, [loveList, userId]);



    const [cartNumber, setCartNumber] = useState(0);
    const handleGetCartCount = async () => {
        try {
            // console.log('user', userToken);
            const response = await axios.get(`${BASE_URL}/api/v1/users/${userId}/cart`, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            // console.log('response', response.data);
            if (response?.status === 200) {
                if (
                    response?.data.data !== null &&
                    response?.data.data.cart !== null
                ) {
                    const orderItems = response?.data.data.cart.order_items;
                    setCartNumber(orderItems?.length);
                    // console.log('cart number:', cartNumber);
                } else {
                    setCartNumber(0);
                }
            }

        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }
    useEffect(() => {
        handleGetCartCount();
    }, [handleGetCartCount, reload]);
    useEffect(() => {
        handleGetWishListTours();
    }, [handleGetWishListTours]);


    const [isSupportGroupModalVisible, setIsSupportGroupModalVisible] = useState(false);

    const handleOpenSupportGroupModal = () => {
        setIsSupportGroupModalVisible(true);
    };

    const handleCloseSupportGroupModal = () => {
        setIsSupportGroupModalVisible(false);
    };
    const [orderData, setOrderData] = useState([]);
    const [orderPaymentData, setOrderPaymentData] = useState([]);
    const handleGetCompletedTour = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/orders/${userId}/complete`, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            if (response?.status === 200) {
                const orderData = [];
                const paymentData = [];

                const orderCompleted = response.data.complete_orders;
                console.log('Response Data:', orderCompleted);
                orderCompleted.forEach(item => {
                    const tourIds = item.tours.map(tour => tour.tour_id);
                    orderData.push({ order_id: item.order_id, tour_ids: tourIds });
                    paymentData.push({ payment_id: item.payment_id, tour_ids: tourIds });
                });
                console.log('Order Data:', orderData);
                console.log('Payment Data:', paymentData);
                setOrderData(orderData);
                setOrderPaymentData(paymentData);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userToken, userId]);

    useEffect(() => {
        handleGetCompletedTour();
    }, [handleGetCompletedTour]);
    // useEffect(() => {
    //     socket = io(BASE_URL, {
    //         query: { access_token: userToken },
    //     });

    //     socket.emit('online', userId);

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    const [curOrder, setCurOrder] = useState(0);
    const isTourIdExists = useMemo(() => {
        if (tourId) {
            for (let index = 0; index < orderData.length; index++) {
                const item = orderData[index];
                console.log('Item:', item);
                if (
                    item !== undefined && item.tour_ids.includes(parseInt(tourId))
                ) {
                    console.log('order has complete: ',item.order_id);
                    setCurOrder(item.order_id);
                    return true;
                }
            }
        }
        return false;
    }, [orderData, tourId]);
    // const [groupID, setGroupID] = useState(0);
    // const handleGetGroupByTourId = async () => {
    //     try {
    //         console.log('tour id:', tourId);
    //         const response = await axios.get(`${BASE_URL}/api/v1/groups/tours/${tourId}`, {
    //             headers: {
    //                 Authorization: `${userToken}`,
    //             },
    //         });
    //         if (response?.status === 200) {
    //             console.log('group id :', response.data.group.group_id);
    //             setGroupID(response.data.group.group_id);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    // useEffect(() => {
    //     handleGetGroupByTourId();
    // }, [handleGetGroupByTourId]); 
    const [reloadPage, setReloadPage] = useState(false);
    const handleJoinGroup = useCallback(async () => {
        try {
            if (isTourIdExists && tourId) {
                const body = {
                    user_id: userId,
                    tour_id: parseInt(tourId),
                    order_id: curOrder,
                };
                console.log('body:', body);
                const res = await axios.get(`${BASE_URL}/api/v1/groups/tours/${tourId}`, {
                    headers: {
                        Authorization: `${userToken}`,
                    },
                });
                // console.log('body:', body);
                // console.log('take groupid:', groupID);
                const response = await axios.post(`${BASE_URL}/api/v1/groups/${res.data.group.group_id}/join`, body, {
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
                    dispatch(setReloadPageAfterClick(!reloadPageAfterClick));
                    setTimeout(() => {
                        navigation.navigate('Message');
                    }, 2000);
    
                    // socket.emit('join', {
                    //     room: parseInt(tourId),
                    // });

                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Cập nhập thông tin không thành công',
                    text2: 'Vui lòng thử lại sau👋'
                });
            }
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'BẠN ĐÃ THAM GIA RỒI',
                text2: 'Vui lòng thử lại sau👋'
            });
        }
    }, [
        curOrder,
        isTourIdExists,
        socket,
        userToken,
        tourId,
        userId,
    ]);
    const handleConfirmSupportGroup = () => {
        // Handle the confirmation action
        handleJoinGroup();
        setIsSupportGroupModalVisible(false);
    };
    return (
        <View className="flex-1 relative bg-white">
            <View className="absolute z-10 justify-between flex-row px-4 py-4  items-center w-full">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="bg-white rounded-full p-2"
                    style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                >
                    <ChevronLeftIcon size="23" strokeWidth={4} color="black" />
                </TouchableOpacity>
                <View className="flex-row space-x-2">
                    <View className="relative">
                        <TouchableOpacity
                            className="bg-white rounded-full p-2"
                            style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                            onPress={() => navigation.navigate('CartScreen')}
                        >
                            <ShoppingCartIcon size="23" color="black" />
                        </TouchableOpacity>

                        {cartNumber !== 0 && (
                            <View
                                className="absolute top-0 right-0 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 translate-y-[-1]"
                            >
                                <Text className="text-white text-xs">{cartNumber}</Text>
                            </View>
                        )}


                    </View>
                    <TouchableOpacity className="bg-white rounded-full p-2"
                        style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                        onPress={handleWishListTour}
                    >
                        <HeartIcon size="23" color={!loveList.includes(tourId) ? "black" : "red"} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView >
                <View className="relative" >
                    <Image className="w-full h-72" source={{ uri: item.cover_image }} />
                </View>

                <View
                    style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                    className="bg-white -mt-12 pt-6">
                    <View className="px-5">
                        <Text className="text-3xl font-bold">{item.name}</Text>

                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <Image
                                    source={require('../assets/images/fullStar.png')}
                                    className="h-4 w-4" />
                                <Text className="text-xs">
                                    <Text className="text-green-700">5</Text>
                                    <Text className="text-gray-700"> (4.6k review)</Text> · <Text className="font-semibold text-gray-700">{item.type}</Text>
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <Icon.MapPin color="gray" width={15} height={15} />
                                <Text className="text-gray-800 text-xs"> Tại · {item.departure_place}</Text>
                            </View>
                        </View>



                    </View>

                </View>
                <View className="px-4">
                    <View className="flex-row items-center space-x-2">
                        <View className="w-2 h-6 bg-[#212460] rounded"></View>
                        <Text className=" py-2 text-2xl font-bold">Điểm nhấn</Text>
                    </View>
                    <Text className="">
                        {item.highlight}
                    </Text>
                </View>
                <View className="px-4">
                    <View className="flex-row items-center space-x-2">
                        <View className="w-2 h-6 bg-[#212460] rounded"></View>
                        <Text className=" py-2 text-2xl font-bold">Chi tiết tour</Text>
                    </View>
                    <Text>
                        {item.description}
                    </Text>
                </View>
                <View className="px-4">
                    <View className="flex-row items-center space-x-2">
                        <View className="w-2 h-6 bg-[#212460] rounded"></View>
                        <Text className=" py-2 text-2xl font-bold">Những điều cần lưu ý</Text>
                    </View>
                    <Text>
                        {item.note}
                    </Text>
                </View>
                <View className="px-4">
                    <View className="flex-row items-center space-x-2">
                        <View className="w-2 h-6 bg-[#212460] rounded"></View>
                        <Text className=" py-2 text-2xl font-bold">Một số hình ảnh về tour</Text>
                    </View>
                    {imageList.map((image, index) => (

                        <Image key={index} source={{ uri: image }} style={{
                            width: '100%',
                            height: 400, // Thay đổi kích thước hình ảnh tùy ý
                            resizeMode: 'cover',
                            marginBottom: 10,
                            borderRadius: 10,
                        }} />

                    ))}
                </View>
                {/* đánh giá */}
                <ReviewTour tourId={tourId} />
                <View className=" px-4">
                    <View
                        style={{
                            borderRadius: 10, borderColor: 'black',
                            borderWidth: 1
                        }}
                        className="w-full p-1 mt-4 mb-2 justify-center items-center  border-black-500"
                    >
                        <Text className="font-bold">Đọc tất cả các đánh giá</Text>
                    </View>
                </View>
                {/* lịch trình  */}
                <View className="px-4 ">
                    <View className="flex-row items-center space-x-2">
                        <View className="w-2 h-6 bg-[#212460] rounded"></View>
                        <Text className=" py-2 text-2xl font-bold">Lịch trình tour</Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            borderRadius: 20,
                        }}
                        className="space-y-2"
                    >
                        {scheduleData.map((item, index) => (
                            <Accordion
                                key={index}
                                day={item.schedule_date}
                                name={item.detail[0].name}
                                date={item.date}
                                note={item.detail[0].note}
                                range_time={item.detail[0].range_time}
                                description={item.detail[0].description}
                            />
                        ))}





                    </View>
                </View>
                {/* hãy tạo ui đó tại vị trí này */}
                <ContactUs onOpenModal={handleOpenSupportGroupModal} />


            </ScrollView >
            <JoinSupportGroupModal
                visible={isSupportGroupModalVisible}
                onClose={handleCloseSupportGroupModal}
                onConfirm={handleConfirmSupportGroup}
            />
            <View className="px-4 py-2 w-full h-[100px] absolute bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">
                <Text className="font-bold text-2xl text-red-500">
                    {formatCurrency(item.price)} VNĐ
                </Text>
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity className="w-[180px] h-[50px] 
                    bg-orange-400 
                        justify-center rounded-2xl
                        items-center"

                        onPress={() => setStatus(true)}
                    >
                        <Text className="text-white font-bold text-[16px] text-center">
                            Thêm vào giỏ hảng
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[180px] h-[50px] 
                     bg-[#FF5F73]
                        justify-center rounded-2xl
                        items-center"
                        onPress={() => setStatus2(true)}
                    >
                        <Text className="text-white font-bold text-[20px] text-center">
                            Đặt ngay
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {status &&
                <EditPassengerNumberModal
                    tourId={item.tour_id}
                    setStatus={setStatus}
                    adults={adults}
                    children={children}
                    incrementAdults={incrementAdults}
                    decrementAdults={decrementAdults}
                    incrementChildren={incrementChildren}
                    decrementChildren={decrementChildren}
                    reload={reload}
                    setReload={setReload}
                />

            }
            {status2 &&
                <EditPassengerNumberModal2
                    tourId={item.tour_id}
                    name={item.name}
                    price={item.price}
                    setStatus2={setStatus2}
                    adults={adults}
                    children={children}
                    incrementAdults={incrementAdults}
                    decrementAdults={decrementAdults}
                    incrementChildren={incrementChildren}
                    decrementChildren={decrementChildren}
                    reload={reload}
                    setReload={setReload}
                />

            }
        </View>
    )
}