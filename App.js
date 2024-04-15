import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { store } from './store'
import { Provider } from 'react-redux'
import Navigation from './navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from './slices/authSlice';

export default function App() {
  return (
    <Provider store={store}>
     
      <Navigation />
    </Provider>

  );
};