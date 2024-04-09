import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'

import * as Icon from "react-native-feather";
import { themeColors } from '../theme'
import DetailTourCard from './resturantCard'
import FavoriteTourCard from './favoriteTourCard';

export default function FavoriteTourColumn({ title, description, locations }) {

  // const [resturants, setResturants] = useState([]);

  // useEffect(() => {
  // getFeaturedResturantById(id).then(data=>{
  //   // console.log('got data: ',data);
  //   setResturants(data?.resturants);
  // })
  // }, [id])
  // console.log(resturants);

  return (

      <ScrollView

        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{

        }}
        className="px-4"
      >
        {
          locations.map((location, index) => {
            return (
              <FavoriteTourCard
                item={location}
                key={index}
              />
            )
          })
        }
      </ScrollView>


  )
}