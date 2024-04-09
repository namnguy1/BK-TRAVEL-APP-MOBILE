import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronDownIcon, HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/solid'
import { MinusIcon, PlusIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity';
import DishRow from '../components/dishRow';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useDispatch, useSelector } from 'react-redux';
import { selectResturant, setResturant } from '../slices/resturantSlice';
import { emptyBasket } from '../slices/basketSlice';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import DetailTour from '../components/detailTour';
import { DetailedTourSchedule } from '../constants'
import Accordion from '../components/Accordion'
export default function DetailTourScreen() {
    const { params } = useRoute();
    let item = params;
    const navigation = useNavigation();
    const [opened, setOpened] = useState(false);
    function toggleAccordion() {
        LayoutAnimation.configureNext({
            duration: 300,
            create: { type: 'easeIn', property: 'opacity' },
            update: { type: 'linear', springDamping: 0.3, duration: 250 },
        });
        setOpened(!opened);
    }
    return (
        <View className="flex-1 relative bg-white">
            <View className="absolute z-10 justify-between flex-row px-4 py-4  items-center w-full">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="bg-white rounded-full p-2"
                    style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                >
                    <ChevronLeftIcon size="23" strokeWidth={4} color="black" />
                </TouchableOpacity>
                <View className="flex-row space-x-2">
                    <TouchableOpacity
                        className="bg-white rounded-full p-2"
                        style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                        onPress={() => navigation.navigate('CartScreen')}
                    >
                        <ShoppingCartIcon size="23" color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white rounded-full p-2"
                        style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                    >
                        <HeartIcon size="23" color="black" />
                    </TouchableOpacity>
                </View>
            </View>

         
            <ScrollView >
                <View className="relative" >
                    <Image className="w-full h-72" source={item.image} />
                </View>

                <View
                    style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                    className="bg-white -mt-12 pt-6">
                    <View className="px-5">
                        <Text className="text-3xl font-bold">{item.name}</Text>
                     
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <Image
                                    source={require('../assets/images/fullStar.png')}
                                    className="h-4 w-4" />
                                <Text className="text-xs">
                                    <Text className="text-green-700">{item.stars}</Text>
                                    <Text className="text-gray-700"> (4.6k review)</Text> · <Text className="font-semibold text-gray-700">{item.type}</Text>
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <Icon.MapPin color="gray" width={15} height={15} />
                                <Text className="text-gray-800 text-xs"> Nearby · {item.address}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2">{item.description}</Text>


                    </View>

                </View>
                <View className="">
                    <Text className="px-4 py-4 text-2xl font-bold">Chi tiết tour</Text>
                    {
                        item.stepDescription.map((i, index) => {
                            return (
                                <DetailTour
                                    item={{ ...i }}
                                    key={index}
                                />
                            )
                        })
                    }

                </View>
                {/* đánh giá */}
                <View className=" px-4">
                    <Text className=" py-4 text-2xl font-bold">Đánh giá tour</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="space-x-4"
                    >
                        <View

                            className="w-[250px] h-[120px] p-4  space-y-1"
                            style={{
                                backgroundColor: "#f5f0f0",
                                borderRadius: 10,
                            }}

                        >
                            <View className="flex-row space-x-2">
                                <Image
                                    source={{ uri: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-27.jpg' }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,

                                    }}
                                />
                                <View>
                                    <Text style={{ fontSize: 16 }} className="font-bold ">Người dùng Klook</Text>
                                    <Text className="font-semibold text-neutral-600">2/9/2023</Text>
                                </View>
                            </View>
                            <Text>10/10 Recommend</Text>

                        </View>
                        <View

                            className="w-[250px] h-[120px] p-4  space-y-1"
                            style={{
                                backgroundColor: "#f5f0f0",
                                borderRadius: 10,
                            }}

                        >
                            <View className="flex-row space-x-2">
                                <Image
                                    source={{ uri: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-27.jpg' }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 50,

                                    }}
                                />
                                <View>
                                    <Text style={{ fontSize: 16 }} className="font-bold ">Người dùng Klook</Text>
                                    <Text className="font-semibold text-neutral-600">2/9/2023</Text>
                                </View>
                            </View>
                            <Text>10/10 Recommend</Text>

                        </View>

                    </ScrollView>
                </View>
                <View className=" px-4">
                    <View
                        style={{
                            borderRadius: 10, borderColor: 'black',
                            borderWidth: 1
                        }}
                        className="w-full p-1 mt-4 mb-2 justify-center items-center  border-black-500"
                    >
                        <Text className="font-bold">Đọc tất cả các đánh giá</Text>
                    </View>
                </View>
                {/* lịch trình  */}
                <View className="px-4 mb-[150px]">
                    <Text className=" py-4 text-2xl font-bold">Lịch trình tour</Text>
                    <View
                        style={{
                            width: '100%',
                            borderRadius: 20,
                        }}
                        className="space-y-2"
                    >


                        {DetailedTourSchedule.map((faq, index) => (
                            <Accordion
                                key={index.toString()}
                                day={faq.day}
                                start={faq.start}
                                end={faq.end}
                                numberOfMeals={faq.NumberOfMeals}
                                description={faq.description}
                            />
                        ))}


                    </View>
                </View>


            </ScrollView >
            <View className="px-4 py-2 w-full h-[100px] absolute bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">
                <Text className="font-bold text-2xl">
                    đ 1,439,996
                </Text>
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity className="w-[180px] h-[50px] 
                    bg-orange-400 
                        justify-center rounded-2xl
                        items-center">
                        <Text className="text-white font-bold text-[16px] text-center">
                            Thêm vào giỏ hảng
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[180px] h-[50px] 
                     bg-[#FF5F73]
                        justify-center rounded-2xl
                        items-center"
                        onPress={() => navigation.navigate('OrderCustomization')}
                    >
                        <Text className="text-white font-bold text-[20px] text-center">
                            Đặt ngay
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >

    )
}
const styles = StyleSheet.create({
    details: {
        fontWeight: 'regular',
        opacity: 0.65,
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    content: {
        marginTop: 8,
    },
    container: {
        margin: 10,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 6,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});