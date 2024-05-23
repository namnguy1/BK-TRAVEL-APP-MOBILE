import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { themeColors } from '../theme';
import { Entypo } from '@expo/vector-icons'
import FavoriteTourCard from '../components/favoriteTourCard';
import * as Icon from "react-native-feather";
export default function SearchingTourResult() {
  const { params } = useRoute();
  let item = params;
  console.log('item: ', item);
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
              Kết quả tìm kiếm
            </Text>
          </View>
        </View>
      ),

    });
  }, []);
  return (
    <View>
      <View className="p-4 flex-row items-center justify-between">
        <Text className="text-[16px] font-semibold text-gray-500">{item.results.length} kết quả</Text>
        <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke="gray" />
      </View>
      <View className="">

        {
          item &&
          item.results.length > 0 && item.results.map(tour => {
            return (
              <ScrollView key={tour.tour_id}>
                <FavoriteTourCard item={tour} />
              </ScrollView>
            )
          })
        }
      </View>
    </View>
  )
}