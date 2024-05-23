import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Pressable } from 'react-native';
import { themeColors } from '../theme';
import * as Icon from "react-native-feather";
import { mealData, moreTour } from '../constants'
import MasonryList from '@react-native-seoul/masonry-list';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function MoreTour() {
  const [selectedButton, setSelectedButton] = useState('Đề xuất');

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <View className="mb-2">
      <View className="flex-row justify-between items-center px-4">
        <Text className="font-bold text-lg">Khám phá thêm</Text>
        <TouchableOpacity>

        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2 px-4 space-x-7">
        <TouchableOpacity onPress={() => handleButtonPress('Đề xuất')}>
          <Text style={{ color: selectedButton === 'Đề xuất' ? '#fc3d03' : 'black', borderBottomWidth: selectedButton === 'Đề xuất' ? 2 : 0, borderColor: '#fc3d03', paddingBottom: 2 }}>Đề xuất</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonPress('Gần đây')}>
          <Text style={{ color: selectedButton === 'Gần đây' ? '#fc3d03' : 'black', borderBottomWidth: selectedButton === 'Gần đây' ? 2 : 0, borderColor: '#fc3d03', paddingBottom: 2 }}>Gần đây</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleButtonPress('Không nên bỏ lỡ')}>
          <Text style={{ color: selectedButton === 'Không nên bỏ lỡ' ? '#fc3d03' : 'black', borderBottomWidth: selectedButton === 'Không nên bỏ lỡ' ? 2 : 0, borderColor: '#fc3d03', paddingBottom: 2 }}>Không nên bỏ lỡ</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <View className="mx-4 mt-4"> */}
      <MasonryList
        data={mealData}
        contentContainerStyle={{ marginHorizontal: 10, marginTop:10 }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
      // refreshing={isLoadingNext}
      // onRefresh={() => refetch({first: ITEM_CNT})}
      // onEndReachedThreshold={0.1}
      // onEndReached={() => loadNext(ITEM_CNT)}
      />
      {/* </View> */}
    </View>
  );
}
const RecipeCard = ({ item, index }) => {
  let isEven = index % 2 === 0;


  return (
    <View className="">
      <Pressable
        style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        className="flex justify-center mb-4 space-y-1 "
        onPress={() => { }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: index % 3 === 0 ? hp(25) : hp(35), borderRadius: 20 }}
          className="bg-black/5"
        />

        <View style={{ bottom: 40 }} className="absolute left-3 flex-row items-center justify-center">
          <Icon.MapPin height="20" width="20" stroke="white" />
          <Text className="text-lg text-white font-bold ml-2">TP Hồ Chí Minh</Text>
        </View>

        <Text style={{ fontSize: hp(1.5) }} className="font-bold ml-2 text-lg-600">
          {
            item.name.length > 40 ? item.name.slice(0, 40) + '...' : item.name
          }
        </Text>
      </Pressable>
    </View>
  );
};
