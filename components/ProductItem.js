import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { DEFAULT_DISPLAY_DATE_FORMAT, IntroduceImage, formatCurrency } from '../constants'
import CheckBox from './CheckBox'
import { ChevronLeftIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import { HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, PencilSquareIcon } from 'react-native-heroicons/outline'
import axios from 'axios'
import { BASE_URL } from '../api'
import dayjs from 'dayjs';
import Toast from 'react-native-toast-message';
export default function ProductItem(
    {
        userId,
        userToken,
        tourId,
        cartId,
        adultQuantity,
        childQuantity,
        totalPrice,
        reload,
        setReload,
        selectedTour,
        setSelectedTour,
        reloadList,
        setReloadList
    }) {
    console.log('tourId: ', tourId);
    console.log('userID', userId);
    console.log('cartId', cartId);
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };



    const [tourInformation, setTourInformation] = useState(null);

    const fetchTourInformation = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/tours/${tourId}`, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            // console.log('response', response.data);
            if (response?.status === 200) {
                setTourInformation(response.data.data);

            }

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {

        fetchTourInformation();
    }, [tourId]);
    const handleDeleteTour = () => {
        Alert.alert(
            "Xóa tour khỏi giỏ hàng",
            "Bạn có chắc chắn muốn xóa tour này ra khỏi giỏ hàng hay không?",
            [
                {
                    text: "Hủy",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: () => {
                        // Thực hiện xóa tour khỏi giỏ hàng ở đây
                        handleDeleteTourFromCart();
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const handleDeleteTourFromCart = useCallback(async () => {
        try {
            
            const response = await axios.delete(`${BASE_URL}/api/v1/users/carts/${cartId}`, {
                data: { tour_id:tourId },
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            console.log('response', response.data.message);
            if (response?.status === 200) {
                setReload(!reload);
                Toast.show({
                    type: 'success',
                    text1: 'Tour đã được xóa khỏi giỏ hàng của bạn',
                    text2: 'Thành công👋'
                });
                const updatedSelectedTour = selectedTour.filter(
                    item => item !== tourId
                );
                setSelectedTour(updatedSelectedTour);

                console.log('tour info: ', tourInformation);
            }

        } catch (error) {
            console.error(error);
        }
    }, [reload, setReload, selectedTour, setSelectedTour, tourId, userId])

    return (


        <View className="px-8 flex-row space-x-3">
            <CheckBox
                tourId={tourId}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                selectedTour={selectedTour}
                setSelectedTour={setSelectedTour}
                reloadList={reloadList}
                setReloadList={setReloadList}

            />
            <Image
                source={{ uri: tourInformation?.cover_image }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 20,
                }}
            />
            <View className="flex-1 ">
                <Text className="font-bold text-lg">
                    {tourInformation?.name}
                </Text>
                {/* <Text> {dayjs(tourInformation?.departure_date).format(
                    DEFAULT_DISPLAY_DATE_FORMAT
                )}</Text> */}
                <Text className="text-gray-500">Ngày {dayjs(tourInformation?.departure_date).format(DEFAULT_DISPLAY_DATE_FORMAT)}</Text>
                <Text className="text-gray-500">{tourInformation?.time}</Text>
                <Text className="text-gray-500"> Khởi hành {tourInformation?.departure_place}</Text>
                <View className="flex-row items-center justify-between mt-2">
                    <Text className="font-bold text-lg text-red-600">{formatCurrency(totalPrice)} VNĐ</Text>
                    <View className="flex-row items-center justify-center space-x-2">
                        <TouchableOpacity onPress={handleDeleteTour}>
                            <TrashIcon size="23" color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <PencilSquareIcon size="23" color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    )
}