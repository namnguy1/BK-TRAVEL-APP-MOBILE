import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Pressable, Alert } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline'
import { themeColors } from '../theme';
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import "core-js/stable/atob";
import { selectUserToken } from '../slices/authSlice';
import { BASE_URL, getUserById } from '../api';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';



const EditPassengerNumberModal2 = (
    {
        tourId,
        setStatus2
        , adults,
        children,
        incrementAdults,
        decrementAdults,
        incrementChildren,
        decrementChildren,
        reload,
        setReload,
        name,
        price
    }) => {
    // lấy dữ liệu người dùng 
    const userToken = useSelector(selectUserToken);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const json = jwtDecode(userToken);
            const userData = await getUserById(json.user_id, userToken);
            setUser(userData.user_info);
        };
        fetchUser();
    }, [userToken]);
    const navigation = useNavigation();
    const slide = React.useRef(new Animated.Value(300)).current;


    const slideUp = () => {
        // Will change slide up the bottom sheet
        Animated.timing(slide, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        // Will slide down the bottom sheet
        Animated.timing(slide, {
            toValue: 300,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };


    React.useEffect(() => {
        slideUp()
    })


    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            setStatus2(false);
        }, 800)

    }
    const handleCreateOrder = async () => {
        try {
            const body = {
                user_id: user.user_id,
                adult_quantity: adults,
                child_quantity: children,
                tour_id: tourId,
                name_customer: user?.firstname + ' ' + user?.lastname,
                phone_customer: user?.phone_number,
                address_customer: 'TP. Hồ Chí Minh',
            };
            console.log('body:', body);
            if (body.phone_customer === null) {
                Alert.alert('Vui lòng cập nhật số điện thoại của bạn');
                return;
            }
            const response = await axios.post(`${BASE_URL}/api/v1/orders`, body, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            // console.log('the loai cua order:',typeof response.data.order.order_id);
            if (response.status === 200) {
                navigation.navigate('OrderCustomization',
                    {
                        orderId: response.data.order.order_id,
                        tourId: tourId,
                        name: name,
                        price: price,
                    }
                );
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
            <Pressable style={{ width: '100%', height: '40%', }}>
                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <View className="flex-row justify-between items-center">
                        <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Số lượng hành khách</Text>
                        <TouchableOpacity
                            onPress={() => setStatus2(false)}
                        >
                            <XMarkIcon size="25" strokeWidth={3} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginTop: 20,
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
                    <TouchableOpacity

                        className="w-full h-[50px] bg-red-500
                        justify-center rounded-2xl
                        absolute bottom-2 right-5"
                        onPress={handleCreateOrder}

                    >
                        <Text className="text-white font-bold text-[20px] text-center">
                            Đặt ngay
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </Pressable>

        </Pressable>
    )
}


export default EditPassengerNumberModal2;


const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    bottomSheet: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bcbcbc',
        paddingHorizontal: 15,
        marginBottom: 10
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#40A2E3',
        alignItems: 'center',
        marginTop: 15
    }
})