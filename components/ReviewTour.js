import { View, Text, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../api';

export default function ReviewTour({ tourId }) {
  // console.log('tourId', tourId);
  const [reviewsList, setReviewsList] = useState([]);
  const [reload, setReload] = useState(false);
  const handleGetReviews = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/tour/${tourId}/reviews`);
      if (response?.status === 200) {
        setReviewsList(response.data.all_reviews);
      }
    } catch (error) {
      console.error(error);
    }
  }, [tourId]);
  // useEffect(() => {
  //   handleGetReviews();
  // }, [handleGetReviews, reload]);
  console.log('reviewsList', reviewsList);
  return (

    <View className=" px-4">
      <View className="flex-row items-center space-x-2">
        <View className="w-2 h-6 bg-[#212460] rounded"></View>
        <Text className=" py-2 text-2xl font-bold">Ý kiến từ khách hàng</Text>

      </View>
      <View className="flex-row items-end mb-2">
        <Text className="font-bold text-[30px]">4.7</Text>
        <Text className="text-[15px] font-semibold mr-2">/5</Text>
        <View className="space-x-1 flex-row">
          <Image
            source={require('../assets/images/fullStar.png')}
            className="h-5 w-5" />
          <Image
            source={require('../assets/images/fullStar.png')}
            className="h-5 w-5" />
          <Image
            source={require('../assets/images/fullStar.png')}
            className="h-5 w-5" />
          <Image
            source={require('../assets/images/fullStar.png')}
            className="h-5 w-5" />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
      >
        {
          reviewsList.map((index,review)=>(
            <View
            key= {index}
            className="w-[250px] h-[120px] p-4  space-y-1"
            style={{
              borderColor: 'gray',
              borderWidth: 0.5,
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
                <Text style={{ fontSize: 16 }} className="font-bold ">Người dùng BKTravel</Text>
                <Text className="font-semibold text-neutral-600">2/9/2023</Text>
              </View>
            </View>
            <Text>10/10 Recommend</Text>
  
          </View>
          ))
        }
        {/* <View
          className="w-[250px] h-[120px] p-4  space-y-1"
          style={{
            borderColor: 'gray',
            borderWidth: 0.5,
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
            borderColor: 'gray',
            borderWidth: 0.5,
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

        </View> */}

      </ScrollView>
    </View>

  )
}