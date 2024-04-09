import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '../components/CheckBox';
import { ChevronLeftIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import { HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, PencilSquareIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import { IntroduceImage } from '../constants';
export default function CartScreen() {

    const navigation = useNavigation()
    const [isActive, setIsActive] = useState(true);

    const handleCheckboxToggle = (newState) => {
        setIsActive(newState);
    };

    return (
        <View className="flex-1 relative bg-white">
            <View
                className="absolute z-10 justify-between flex-row px-4 py-2  items-center w-full"
                style={{
                    borderWidth: 0.2,
                    borderColor: 'gray',
                }}
            >
                <View className="flex-row justify-center items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white rounded-2xl p-3 shadow">
                        <ChevronLeftIcon size="23" stroke={50} color="black" />
                    </TouchableOpacity>
                    <Text className="text-[16px] font-bold">Giỏ hàng</Text>
                </View>
                <TouchableOpacity>
                    <Text className="text-[16px] font-bold">Bỏ chọn tất cả</Text>
                </TouchableOpacity>
            </View>
            <View className="px-8 mt-[100px] flex-row space-x-3">
                <CheckBox />
                <Image
                    source={IntroduceImage[0]}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 20,
                    }}
                />
                <View className="flex-1 ">
                    <Text className="font-bold text-lg">
                        2N1D Mui Ne - Phan thiet Tour from Ho Chi Minh with Day tour option
                    </Text>
                    <View className="flex-row items-center justify-between mt-2">
                        <Text className="font-bold text-lg text-red-600">đ 3,777,000</Text>
                        <View className="flex-row items-center justify-center space-x-2">
                            <TouchableOpacity>
                                <TrashIcon size="23" color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <PencilSquareIcon size="23" color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
            <View className="px-4 py-4 w-full h-[100px] absolute bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">

                <View className="flex-row items-center justify-between">
                    <View>
                        <Text className="text-gray-500 text-xl">
                            Tổng cộng (0 đơn vị)
                        </Text>
                        <Text className="font-bold text-2xl">đ 0</Text>
                    </View>

                    <TouchableOpacity className="w-[180px] h-[50px] 
                     bg-[#FF5F73]
                        justify-center rounded-2xl
                        items-center">
                        <Text className="text-white font-bold text-[20px] text-center">
                            Thanh toán
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
