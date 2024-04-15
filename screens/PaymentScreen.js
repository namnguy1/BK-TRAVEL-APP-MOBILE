import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
export default function PaymentScreen() {
    const navigation = useNavigation()
    const { params } = useRoute();
    let item = params;
    const link = item.link_payment;
    console.log(link);
    return (
        <WebView style={{ flex: 1 }}
            source={{ uri: link }}

        />
    )
}