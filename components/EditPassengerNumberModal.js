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



const EditPassengerNumberModal = (
    {
        tourId,
        setStatus
        , adults,
        children,
        incrementAdults,
        decrementAdults,
        incrementChildren,
        decrementChildren
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
            setStatus(false);
        }, 800)

    }
    const handleAddtoCart = async () => {
        try {
            const body = {
                user_id: user.user_id,
                tour: {
                    tour_id: tourId,
                    adult_quantity: adults,
                    child_quantity: children,
                },
            };
            const response = await axios.post(`${BASE_URL}/api/v1/user/cart`, body);
            if (response?.status === 200) {
              
                Toast.show({
                    type: 'success',
                    text1: 'Thêm vào giỏ hàng thành công',
                    text2: 'Tour đã được thêm vào giỏ hàng của bạn👋'
                  });
            } else {
                Alert.alert('Thêm vào giỏ hàng không thành công');
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
                            onPress={() => setStatus(false)}
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
                        style={{ backgroundColor: themeColors.bgColor(1) }}
                        className="w-full h-[50px] 
                        justify-center rounded-2xl
                        absolute bottom-2 right-5"
                        onPress={handleAddtoCart}

                    >
                        <Text className="text-white font-bold text-[20px] text-center">
                            Thêm vào giỏ hàng
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </Pressable>

        </Pressable>
    )
}


export default EditPassengerNumberModal;


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