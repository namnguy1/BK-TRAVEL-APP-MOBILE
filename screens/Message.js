import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme';

export default function Message() {
    const navigation = useNavigation()
    return (
        <View className="flex-1 bg-white">
            <View className="relative py-4 shadow-xm">
                <View>
                    <Text className="text-center font-bold text-2xl items-center">
                        Hộp thư hỗ trợ
                    </Text>
                </View>
                <TouchableOpacity
                    className="mt-10 px-4"
                    onPress={() => navigation.navigate('MessageDetail')}

                >
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Image
                                source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }}
                                style={{ width: 80, height: 80, borderRadius: 80 }}
                                resizeMode='contain'
                            />
                            <View className="ml-2 space-y-2">
                                <Text className="text-xl font-semibold">BeoBeo</Text>
                                <Text className="text-gray-400">Hướng dẫn viên của bạn</Text>
                            </View>
                        </View>
                        <TouchableOpacity className="bg-gray-100 rounded-2xl p-3 shadow">
                            <FontAwesome5 name="fist-raised" size={24} color={themeColors.bgColor(1)} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>



        </View>
    )
}