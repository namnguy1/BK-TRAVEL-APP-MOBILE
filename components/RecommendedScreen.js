import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { moreTour } from '../constants'

export default function RecommendedScreen() {
  return (
    <View className="p-5">
      <FlatList
        data={moreTour}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item, index}) =>{
          <Text>hello</Text>
        }}
      />
    </View>
  )
}