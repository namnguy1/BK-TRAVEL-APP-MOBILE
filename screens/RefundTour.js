import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../api';
import { selectUserToken } from '../slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function RefundTour() {
    const token = useSelector(selectUserToken);
    const json = jwtDecode(token);
    const userId = json.user_id;
    const [canceledOrders, setCanceledOrders] = useState([]);

    const handleGetCanceledOrders = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/orders/${userId}/canceled`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (response?.status === 200) {
                setCanceledOrders(response.data.failed_orders);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    useEffect(() => {
        handleGetCanceledOrders();
    }, [handleGetCanceledOrders]);

    const renderTour = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.cover_image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.text}>Khởi hành từ: {item.departure_place}</Text>
                <Text style={styles.text}>Điểm đến: {item.destination_place}</Text>
                <Text style={styles.text}>Thời gian: {item.time}</Text>
                <Text style={styles.text}>Khởi hành: {item.departure_time} - {new Date(item.departure_date).toLocaleDateString()}</Text>
                <Text style={styles.price}>{parseFloat(item.price).toLocaleString()} VNĐ</Text>
                <Text style={styles.canceled}>ĐÃ HỦY</Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <View>
            <FlatList
                data={item.tours}
                renderItem={renderTour}
                keyExtractor={(tour) => `${item.order_id}-${tour.tour_id}`}
            />
        </View>
    );
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="times" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Đơn hàng đã hủy</Text>
            </View>
            <FlatList
                data={canceledOrders}
                renderItem={renderItem}
                keyExtractor={(item) => item.order_id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#e74c3c',
    },
    canceled: {
        marginTop: 5,
        fontSize: 14,
        color: '#e74c3c',
        fontWeight: 'bold',
    },
});
