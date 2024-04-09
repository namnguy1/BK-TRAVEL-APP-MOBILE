import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { IntroduceImage } from '../constants'
import { useNavigation } from '@react-navigation/native'
export default function FamousLocation() {
    const navigation = useNavigation();
    return (
        <View className="">
            <View className="flex-row justify-between items-center px-4">
                <Text className="font-bold text-lg">Các địa điểm nổi bật của BK Travel</Text>
                <TouchableOpacity>
                    <Text style={{ color: themeColors.text }} className="font-semibold">Xem thêm</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
                className="overflow-visible py-5"
            >
                {
                    IntroduceImage.map((item, index) => {
                        return (
                            <TouchableOpacity
                                className="mr-6 bg-white rounded-3xl shadow-lg relative"
                                key={index}
                                onPress={() => {
                                    navigation.navigate('LocationScreen')
                                }}
                            >
                                <Image className="h-36 w-64 rounded-3xl" source={item} />
                                <Text className="text-lg text-white font-bold absolute bottom-1 left-10">TP Hồ Chí Minh</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}