import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { themeColors } from '../theme'
import * as Icon from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { CalendarIcon } from 'react-native-heroicons/solid'
import { featured } from '../constants'
import FeatureRow from '../components/featuredRow'
import FavoriteTourColumn from '../components/favoriteTourColumn'
import axios from 'axios'
import { BASE_URL } from '../api'
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import "core-js/stable/atob";
import { selectUserToken } from '../slices/authSlice';
import FavoriteTourCard from '../components/favoriteTourCard'
import { selectReloadPageAfterClick } from '../slices/reloadSlice'
export default function FavoriteTour() {
  const navigation = useNavigation()
  const [wishListTours, setWishListTours] = useState([]);
  const userToken = useSelector(selectUserToken);
  const json = jwtDecode(userToken);
  const userId = json.user_id;
  const reloadPageAfterClick = useSelector(selectReloadPageAfterClick);
  console.log('reloadPage: ', reloadPageAfterClick);
  const handleGetWishlistTours = useCallback(async () => {
    try {
      if (userId === 0) {
        return;
      }
      const response = await axios.get(`${BASE_URL}/api/v1/users/${userId}/wishlist`, {
        headers: {
          Authorization: `${userToken}`,
        },
      });
      if (response?.status === 200) {
        setWishListTours(response.data.data[0].tours);
      }
      console.log('wishlist tours:', wishListTours);
    } catch (error) {
      console.error(error);
    }
  }, [userId]);
  useEffect(() => {
    handleGetWishlistTours();
  }, [handleGetWishlistTours, reloadPageAfterClick]);

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
            wishListTours &&
            wishListTours.length > 0 && wishListTours.map(tour => {
              return (
                <ScrollView key={tour.tour_id}>
                  <FavoriteTourCard item={tour} />
                </ScrollView>
              )
            })
          }
        </View>
      </View>



    </View>
  )
}