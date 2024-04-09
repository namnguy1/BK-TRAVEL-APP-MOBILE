import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'
import { themeColors } from '../theme';
export default function NotificationScreen() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        return navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(0) }}
                        className="rounded-full p-1 shadow"
                        onPress={() => { navigation.goBack() }}
                    >
                        <Entypo name="chevron-left" size={30} color="#737373" />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3 ml-3">
                        <Text className="text-neutral-700 font-medium text-2xl">
                            Thông báo
                        </Text>
                    </View>
                </View>
            ),

        });
    }, []);
    return (
        <View className="flex-1 bg-white p-4">
            <View 
            className="p-4"
            style={{borderColor:'gray',borderRadius:10,borderWidth:0.2}}
            >
                <Text className="text-[16px] font-bold">CÒN RẤT NHIỀU ƯU ĐÃI ĐANG CHỜ BẠN ĐÓ!</Text>
                <Text className="text-gray-500">Đến ngay gian hàng BKTRAVEL tại ngày hội du lich TP.HCM để nhận ưu đãi tour lên đến 49% bạn nhé! Cơ hội có 1-0-2 để sỡ hứu hành trình du lịch tuyệt vời trong hè này</Text>
                <View className="flex-row justify-end mt-2">
                    <Text >12/04/2024 12:00</Text>
                </View>
            </View>
        </View>
    )
}