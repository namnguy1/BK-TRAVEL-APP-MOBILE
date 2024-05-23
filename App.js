import { LogBox, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { store } from './store'
import { Provider } from 'react-redux'
import Navigation from './navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from './slices/authSlice';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { toastConfig } from './constants';

export default function App() {
  LogBox.ignoreLogs(['Encountered an error loading page']);
  return (
    <Provider store={store}>
      <Navigation />
      <Toast config={toastConfig} />
    </Provider>

  );
};