import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { themeColors } from '../theme';
export default function GroupMessage({group}) {
    return (
        <View className="flex-row items-center justify-between border-b border-gray-200">
            <View className="flex-row items-center">
                <Image
                    source={{ uri: 'https://c8.alamy.com/comp/T3W0AT/people-avatar-icons-with-dialog-speech-bubbles-male-and-female-faces-avatars-discussion-group-people-talking-communication-chat-assistance-vect-T3W0AT.jpg' }}
                    style={{ width: 80, height: 80, borderRadius: 80 }}
                    resizeMode='contain'
                />
                <View className="ml-2 space-y-2 w-[250px]">
                    <Text className="text-[16px] font-semibold">{group.name}</Text>
                    <Text className="text-gray-400">Nhóm hỗ trợ đến thông tin khách hàng</Text>
                </View>
               
            </View>
            <TouchableOpacity className="bg-gray-100 rounded-2xl p-3 shadow">
                <FontAwesome5 name="fist-raised" size={24} color={themeColors.bgColor(1)} />
            </TouchableOpacity>
        
        </View>
    )
}