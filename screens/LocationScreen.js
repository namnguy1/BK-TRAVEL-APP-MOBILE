import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import FavoriteTourColumn from '../components/favoriteTourColumn'
import { featured } from '../constants'
import { ChevronDownIcon, HeartIcon, ShoppingCartIcon, ChevronLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/solid'
export default function LocationScreen() {
  const navigation = useNavigation();
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
          <TouchableOpacity className="bg-white rounded-full p-2"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          >
            <MagnifyingGlassIcon size="23" color="black" />
          </TouchableOpacity>
        </View>
      </View>

    
      <ScrollView >
        <View className="relative" >
          <Image className="w-full h-72" source={{ uri: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} />
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 p-6">
          <Text className="text-2xl font-semibold">TP. Hồ Chí Minh</Text>
          <Text className="text-[16px] mt-2 text-gray-600">
            Thành phố Hồ Chí Minh,
            với sự kết hợp độc đáo giữa nét cổ kính và sự hiện đại,
            là điểm đến không thể bỏ qua của du khách khi đặt chân đến Việt Nam.
            Tại đây, bạn có thể thưởng thức những món ngon đường phố đặc trưng,
            dạo chơi trong những con phố đông đúc, hay khám phá những di tích lịch sử và văn hóa đầy ấn tượng.
            Thành phố không chỉ là trung tâm kinh tế sôi động mà còn là nơi gặp gỡ, trao đổi văn hóa và kiến thức.
            Với cơ sở hạ tầng phát triển và không gian xanh mát của các công viên,
            Sài Gòn hứa hẹn mang lại những trải nghiệm đáng nhớ và thú vị cho mỗi du khách.
          </Text>
        </View>
        <View>
          <View className="px-6">
            <Text className="text-xl font-semibold">Hoạt động nổi bật tại TP. Hồ Chí Minh</Text>
          </View>
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








      </ScrollView >

    </View >
  )
}