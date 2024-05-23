import { View, Text } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';

export default function PaymentScreen({ props }) {
    const [currentUrl, setCurrentUrl] = useState('')
    const [resultPayment, setResultPayment] = useState('');
    const navigation = useNavigation()
    const { params } = useRoute();
    let item = params;
    console.log(item.link_payment);
    const getQueryParam = (url) => {
        const queryStringIndex = url.indexOf('?');
        if (queryStringIndex !== -1) {
            const queryString = url.substring(queryStringIndex + 1);
            return queryString;
        } else {
            // Nếu không có phần query, trả về null
            return '';
        }
    }
    // const hanldeGetPaymentResult = useCallback(async () => {
    //     try {
    //         const url = 'http://localhost:3000/payment/success';
    //         if (currentUrl.includes(url)) {
    //             console.log('currentUrl:' + currentUrl);
    //             const queryParam = getQueryParam(currentUrl);
    //             console.log('queryParam:' + queryParam);
    //             const response = await axios.get(`${BASE_URL}/api/v1/user/payment/vnpay_ipn${queryParam}`);
    //             if (response?.status === 200) {
    //                 setResultPayment(response.data.RspCode);
    //             }
    //             console.log('response: ' + response);
    //             console.log('resultPayment:' + resultPayment); 
    //             navigation.navigate('Success')
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, []);

    useEffect(() => {
        const url = 'http://localhost:3000/payment/success';

        if (currentUrl.includes(url)) {
            console.log('currentUrl:' + currentUrl);
            const queryParam = getQueryParam(currentUrl);
            console.log('queryParam:' + queryParam);
            
            navigation.navigate('Success',{queryParam})
        }
    }, [currentUrl])
    // useEffect(() => {
    //     hanldeGetPaymentResult();
    // }, [hanldeGetPaymentResult]);
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