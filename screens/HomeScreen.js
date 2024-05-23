import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs';
import FeatureRow from '../components/featuredRow'

import * as Icon from "react-native-feather";
import { themeColors } from '../theme'
import { DEFAULT_DISPLAY_DATE_FORMAT, featured } from '../constants'
import SliderHomePage from '../components/SliderHomePage'
import FamousLocation from '../components/FamousLocation'
import MoreTour from '../components/MoreTour'
import Greeting from '../components/Greeting'
import { TouchableOpacity } from 'react-native'
import TourItem from '../components/OutStandingTour';
import OutStandingTour from '../components/OutStandingTour';

export default function HomeScreen() {


    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])
  

    return (
        <SafeAreaView className="bg-white mb-[100px] flex-1" >
            <StatusBar
                barStyle="light-content"
            />
            {/* search bar */}
            <View className="flex-row mt-[10px] items-center space-x-2 px-4 pb-2 ">
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                    <Icon.Search height="25" width="25" stroke="gray" />
                    <TextInput placeholder='tp hcm' className="ml-2 flex-1" keyboardType='default' />
                    <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
                        <Icon.MapPin height="20" width="20" stroke="gray" />
                        <Text className="text-gray-600">Viet Nam</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="p-3 rounded-full"
                    onPress={() => navigation.navigate('SearchTour')}
                >
                    <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke="white" />
                </TouchableOpacity>
            </View>
            {/* main */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50
                }}
            >
                <SliderHomePage />
                {/* categories */}

                <Greeting />

                {/* featured */}
                {/* <View className="mt-5">
                    {
                        [featured].map((item, index) => {
                            return (
                                <FeatureRow
                                    key={index}
                                    title={item.title}
                                    locations={item?.locations}
                                    description={item.description}
                                />
                            )
                        })
                    }
                </View> */}
                <OutStandingTour/>
               
                <FamousLocation />
                <MoreTour/>
               
            </ScrollView>


        </SafeAreaView>
    )
}
