import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailTourScreen from '../screens/DetailTourScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SearchingTour from '../screens/SearchingTour';
import CartScreen from '../screens/CartScreen';
import OrderCustomization from '../components/OrderCustomization';
import OrderCompletion from '../components/OrderCompletion';
import MapScreen from '../screens/MapScreen';
import TabGroup from './TabGroup';
import MessageDetail from '../screens/MessageDetail';
import LocationScreen from '../screens/LocationScreen';
import UserInformation from '../screens/UserInformation';
import NotificationScreen from '../screens/NotificationScreen';
import WeatherScreen from '../screens/WeatherScreen';
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();
import { selectIsAuthenticated, selectUserToken } from '../slices/authSlice';
import DetailTourScreen2 from '../screens/DetailTourScreen2';
import PaymentScreen from '../screens/PaymentScreen';
import SuccessScreen from '../screens/SuccessScreen';
export default function Navigation() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userToken = useSelector(selectUserToken);
  // console.log('user token: ' + userToken);

  return (


    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomeScreen'>
        {!userToken ? (<Stack.Group>
          <Stack.Screen name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>) : (<Stack.Group>
          <Stack.Screen
            name="HomeStack"
            component={TabGroup}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="DetailTour"
            component={DetailTourScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="DetailTour2"
            component={DetailTourScreen2}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="CartScreen"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SearchTour"
            component={SearchingTour}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderCustomization"
            component={OrderCustomization}
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen
            name="OrderCompletion"
            component={OrderCompletion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapScreen"
            component={MapScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MessageDetail"
            component={MessageDetail}
          />
          <Stack.Screen
            name="LocationScreen"
            component={LocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserInfomation"
            component={UserInformation}

          />
          <Stack.Screen
            name="Notification"
            component={NotificationScreen}
          />
          <Stack.Screen
            name="Weather"
            component={WeatherScreen}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{ headerShown: false }}
          />
         
        </Stack.Group>)}


      </Stack.Navigator>
      {/* <TabGroup/> */}

    </NavigationContainer>
  );
}
