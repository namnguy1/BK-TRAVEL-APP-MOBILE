import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import { DEFAULT_DISPLAY_DATE_FORMAT, formatCurrency } from '../constants';
import dayjs from 'dayjs';
export default function FavoriteTourCard({ item }) {
    // console.log(urlFor(imgUrl).url());
    // console.log(item)
    const navigation = useNavigation();
    // console.log(item);
    return (
        <View style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }} className="flex-row items-center justify-center rounded-3xl shadow-lg space-y-2">
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.navigate('DetailTour2', { ...item })
                }}
            >
                <Image className="h-36 w-36 rounded-3xl " source={{ uri: item.cover_image }} />
            </TouchableWithoutFeedback>
            <View className="px-3 pb-4 space-y-2">

                <Text className="text-lg font-bold pt-2">{item.name.length > 30 ? `${item.name.substring(0, 20)}...` : item.name}</Text>
                <View className="flex-row items-center space-x-1">
                    <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
                    <Text className="text-xs">
                        <Text className="text-green-700">6</Text>
                        <Text className="text-gray-700"> (6 review)</Text> · <Text className="font-semibold text-gray-700">{item.type}</Text>
                    </Text>
                </View>
                <View className="flex-row items-center space-x-1">
                    <Icon.MapPin color="gray" width={15} height={15} />
                    <Text className="text-gray-700 text-xs"> Nơi khởi hành : {item.departure_place}</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                    <Icon.MapPin color="gray" width={15} height={15} />
                    <Text className="text-gray-700 text-xs"> Số chỗ trống : {item.max_customer - item.current_customers}</Text>
                </View>
                <View className="flex-row  items-center space-x-1">
                    <Icon.MapPin color="gray" width={15} height={15} />
                    <Text className="text-gray-700 text-xs"> Hạn đặt chỗ : {dayjs(item.deadline_book_time).format(DEFAULT_DISPLAY_DATE_FORMAT)}</Text>
                </View>
                <Text className="text-xl font-bold text-center text-red-500">{formatCurrency(item.price)} VNĐ</Text>
            </View>
        </View>





    )
}

