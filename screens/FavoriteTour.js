import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import * as Icon from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { CalendarIcon } from 'react-native-heroicons/solid'
import { featured } from '../constants'
import FeatureRow from '../components/featuredRow'
import FavoriteTourColumn from '../components/favoriteTourColumn'
export default function FavoriteTour() {
  const navigation = useNavigation()
  return (
    <View className="flex-1 bg-white">
      <View className="relative py-4 shadow-xm">
        <View>
          <Text className="text-center font-bold text-2xl items-center">
            Tour yêu thích
          </Text>
        </View>
        <View className="mt-5">
          {
            [featured].map((item, index) => {
              return (
                <FavoriteTourColumn
                  key={index}
                  title={item.title}
                  locations={item?.locations}
                  description={item.description}
                />
              )
            })
          }
        </View>
      </View>



    </View>
  )
}