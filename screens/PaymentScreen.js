import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';

export default function PaymentScreen({ props }) {
    const [currentUrl,setCurrentUrl] = useState('')
    const navigation = useNavigation()
    const { params } = useRoute();
    let item = params;
    console.log(item.link_payment);
    useEffect(()=>{
        const url = 'http://localhost:3000/payment/success'
        if(currentUrl.includes(url)){
            navigation.navigate('Success')
        }
    },[currentUrl])
    return (
        <WebView style={{ flex: 1 }}
            source={{ uri: item.link_payment }}
            onNavigationStateChange={(state) => {
                const currentUrl = state.url;
                setCurrentUrl(currentUrl);
            }}

        />
    )
}