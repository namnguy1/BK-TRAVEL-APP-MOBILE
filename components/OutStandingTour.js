import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { themeColors } from '../theme'
import { getOnlineTour } from '../api';
import * as Icon from "react-native-feather";
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { DEFAULT_DISPLAY_DATE_FORMAT, formatCurrency } from '../constants';
export default function OutStandingTour() {
    const navigation = useNavigation();
    const [onlineTours, setOnlineTours] = useState([]);
    const handleGetOnlineTours = useCallback(async () => {
        try {
            const response = await getOnlineTour();
            if (response) {
                setOnlineTours(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);
    useEffect(() => {

        handleGetOnlineTours();
    }, [handleGetOnlineTours]);
    return (
        <View className="mt-5">
            <View className="flex-row justify-between items-center px-4">
                <View>
                    <Text className="font-bold text-lg">Các tour nổi bật của BK Travel</Text>
                    <Text className="text-gray-500 text-xs">
                        các tour du lịch nổi tiếng trong nước
                    </Text>
                </View>

                <TouchableOpacity onPress={()=>{navigation.navigate('OrderUser')}}>
                    <Text style={{ color: themeColors.text }} className="font-semibold">Xem thêm</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                }}
                className="overflow-visible py-5"
            >
                {
                    onlineTours.length > 0 &&
                    onlineTours.map((tour, index) => (

                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => {
                                navigation.navigate('DetailTour2', { ...tour })
                            }}
                        >
                            <View style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }} className="mr-6 bg-white rounded-3xl shadow-lg">
                                <Image className="h-36 w-64 rounded-t-3xl"
                                    source={{ uri: tour.cover_image }}
                                />

                                <View className=" pb-4 space-y-2">

                                    <Text className="text-lg font-bold pt-2">
                                        {tour.name.length > 30 ? `${tour.name.substring(0, 28)}...` : tour.name}
                                    </Text>

                                    <View className="flex-row items-center space-x-1">
                                        <Icon.MapPin color="gray" width={15} height={15} />
                                        <Text className="text-gray-700 text-xs"> Nơi khởi hành : {tour.departure_place}</Text>
                                    </View>
                                    <View className="flex-row items-center space-x-1">
                                        <Icon.MapPin color="gray" width={15} height={15} />
                                        <Text className="text-gray-700 text-xs">
                                            Số chỗ trống : {tour.max_customer - tour.current_customers}
                                        </Text>
                                    </View>
                                    <View className="flex-row  items-center space-x-1">
                                        <Icon.MapPin color="gray" width={15} height={15} />
                                        <Text className="text-gray-700 text-xs">
                                            Hạn đặt chỗ : {dayjs(tour.deadline_book_time).format(DEFAULT_DISPLAY_DATE_FORMAT)}
                                        </Text>
                                    </View>
                                    <Text className="text-xl font-bold text-center text-red-500">{formatCurrency(tour.price)} VNĐ</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>


                    ))
                }

            </ScrollView>
        </View>
    )
}