import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import { themeColors } from '../theme'
import * as Icon from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
export default function MapScreen() {
    const navigation = useNavigation();
    return (
        <View className="flex-1">
            <MapView
                initialRegion={
                    {
                        latitude: 38.2145602,
                        longitude: -85.5324269,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }
                }
                className="flex-1"
                mapType='satellite'
            >
                <Marker
                    coordinate={{
                        latitude: 38.2145602,
                        longitude: -85.532269,

                    }}
                    title='Thành Nam'
                    description='Hướng dẫn viên của bạn'
                    pinColor={themeColors.bgColor(1)}
                />

            </MapView>
            <View className="rounded-t-3xl  bg-white ">
                
                <View
                    className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
                    style={{ backgroundColor: themeColors.bgColor(0.8) }}
                >
                    <View className="p-1 rounded-full"
                        style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
                    >
                        <Image
                            className="h-16 w-16 rounded-full"
                            source={require('../assets/images/deliveryGuy.png')}
                        />
                    </View>
                    <View className="ml-3 flex-1">
                        <Text className="text-lg font-bold text-white">
                            Thành Nam
                        </Text>
                        <Text className="font-semibold text-white">
                            Hướng dẫn viên du lịch của bạn
                        </Text>

                    </View>
                    <View className="flex-row items-center space-x-3 mr-3">
                        <TouchableOpacity className="bg-white p-2 rounded-full">
                            <Icon.Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="bg-white p-2 rounded-full">
                            <Icon.X stroke={'red'} strokeWidth={4} />
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </View>
    )
}