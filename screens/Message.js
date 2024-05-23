import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../slices/authSlice';
// Note: remove the curly braces if you are importing the default export
import axios from 'axios';
import { BASE_URL } from '../api';
import { jwtDecode } from 'jwt-decode';
import { selectReloadPageAfterClick } from '../slices/reloadSlice'
import GroupMessage from '../components/GroupMessage';
import io from 'socket.io-client';
let socket;
export default function Message() {
    const navigation = useNavigation();
    const userToken = useSelector(selectUserToken);
    const json = jwtDecode(userToken);
    const userId = json.user_id;
    const [allGroups, setAllGroups] = useState([]);
    const reloadPageAfterClick = useSelector(selectReloadPageAfterClick);
    const getAllGroupsOfUser = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/users/${userId}/groups`, {
                headers: {
                    Authorization: `${userToken}`,
                },
            });
            if (response?.status === 200) {
                setAllGroups(response.data.data[0].groups);
            }
        } catch (error) {
            console.error(error);
        }
    }, [userToken, userId]);

    useEffect(() => {
        getAllGroupsOfUser();
    }, [getAllGroupsOfUser, reloadPageAfterClick]);

    useEffect(() => {
        socket = io(BASE_URL, {
            query: { access_token: userToken },
        });

        socket.on('connect', () => {
            // eslint-disable-next-line no-console
            console.log('Connected to the server');
        });

        socket.emit('online', userId);


        socket.on('groupData', groups => {
            // eslint-disable-next-line no-console
            console.log('Received group data:', groups);
        });

        socket.on('disconnect', () => {
            // eslint-disable-next-line no-console
            console.log('Disconnected from the server');
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    

    return (
        <View className="flex-1 bg-white">
            <View className="relative py-4 shadow-xm">
                <View>
                    <Text className="text-center font-bold text-2xl items-center">
                        Hộp thư hỗ trợ
                    </Text>
                </View>
                <ScrollView className="mt-4">
                    {allGroups.map((group) => (
                        <TouchableOpacity
                            key={group.group_id}
                            className="mt-10 px-4"
                            onPress={() => navigation.navigate('MessageDetail', { groupId: group.group_id })}
                        >
                            <GroupMessage group={group} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}
