import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'

import * as Icon from "react-native-feather";
import { themeColors } from '../theme'
import DetailTourCard from './resturantCard'

export default function FeatureRow({ title, description, locations}) {

  // const [resturants, setResturants] = useState([]);

  // useEffect(() => {
    // getFeaturedResturantById(id).then(data=>{
    //   // console.log('got data: ',data);
    //   setResturants(data?.resturants);
    // })
  // }, [id])
  // console.log(resturants);
  
  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-500 text-xs">
            {description}
          </Text>
        </View>
        
        <TouchableOpacity>
          <Text style={{color: themeColors.text}} className="font-semibold">Xem thêm</Text>
        </TouchableOpacity>
      </View>

      

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal:15,
        }}
        className="overflow-visible py-5"
       >
        {
          locations.map((location,index)=>{
            return (
                <DetailTourCard
                  item = {location}
                  key={index}
              />    
            )
          })
        }           
       </ScrollView>
    
    </View>
  )
}