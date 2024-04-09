import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function Greeting() {
  return (
    <View className="px-4">
       <Text style={{fontSize: 24}} className="text-neutral-600 ">Chào Bạn!</Text>
          <View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Tìm kiếm địa điểm du lịch</Text>
          </View>
          <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
            tại <Text className="text-amber-400">BK-TRAVEL</Text>
          </Text>
    </View>
  )
}