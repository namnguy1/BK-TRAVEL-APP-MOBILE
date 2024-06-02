import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { themeColors } from '../theme';
import { Entypo } from '@expo/vector-icons';
import { ChevronLeftIcon, SparklesIcon,TruckIcon,BuildingLibraryIcon } from 'react-native-heroicons/outline';
import { ArrowRightCircleIcon } from 'react-native-heroicons/solid';
import { BASE_URL } from '../api';
import axios from 'axios';
import AlertScheduleState from '../components/AlertScheduleState';

export default function ScheduleDetail() {
    const { params } = useRoute();
    const item = params;
    const [tourDetail, setTourDetail] = useState(null);
    const [scheduleDetail, setScheduleDetail] = useState([]);
    const [isSupportGroupModalVisible, setIsSupportGroupModalVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedNote, setSelectedNote] = useState('');

    const handleOpenSupportGroupModal = (status, note) => {
        setSelectedStatus(status);
        setSelectedNote(note);
        setIsSupportGroupModalVisible(true);
    };

    const handleCloseSupportGroupModal = () => {
        setIsSupportGroupModalVisible(false);
    };

    const handleConfirmSupportGroup = () => {
        // Handle the confirmation action
        setIsSupportGroupModalVisible(false);
    };

    const navigation = useNavigation();
    const tour_id = item.tourid;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(0) }}
                        className="rounded-full p-1 shadow"
                        onPress={() => navigation.goBack()}
                    >
                        <Entypo name="chevron-left" size={30} color="#737373" />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3 ml-3">
                        <Text className="text-neutral-700 font-medium text-2xl">
                            Lịch trình chi tiết
                        </Text>
                    </View>
                </View>
            ),
        });
    }, [navigation]);

    const handleGetDetailTour = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/tours/${tour_id}`);
            if (response?.status === 200) {
                setTourDetail(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    const handleGetSchedule = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/tours/${tour_id}/schedules`);
            if (response?.status === 200) {
                setScheduleDetail(response.data.schedule_tour.schedule_detail);
            }
        } catch (error) {
            console.error(error);
        }
    }, [tour_id]);

    useEffect(() => {
        handleGetDetailTour();
        handleGetSchedule();
    }, [handleGetDetailTour, handleGetSchedule]);

    const renderScheduleItem = (schedule) => (
        <View key={schedule.date}>
            <View className="mb-4">
                <View className="flex-row items-center space-x-2">
                    <ArrowRightCircleIcon size={23} stroke={1} color="orange" />
                    <Text className="font-bold text-lg">{schedule.schedule_date} ({schedule.date})</Text>
                </View>
                <View className="flex-row space-x-2">
                    <BuildingLibraryIcon size={23} strokeWidth={2} color="green" />
                    <Text className="font-semibold text-gray-500 text-base">Nơi ở:  {schedule.hotels}</Text>
                </View>
                <View className="flex-row space-x-2">
                    <TruckIcon size={23} strokeWidth={2} color="green" />
                    <Text className="font-semibold text-gray-500 text-base">Phương tiện di chuyển:  {schedule.transport}</Text>
                </View>
                {schedule.detail.map((activity, index) => (
                    <View key={index} >
                        <View className="flex-row justify-between items-center">
                            <View className="flex-row space-x-2">
                                <SparklesIcon size={23} strokeWidth={2} color="green" />
                                <Text className="font-semibold text-gray-500 text-base">{activity.range_time}: {activity.name}</Text>
                            </View>

                            {activity.status && activity.note &&
                                (<TouchableOpacity onPress={() => handleOpenSupportGroupModal(activity.status, activity.note)}>
                                    <Entypo name={activity.status === 'checkin' ? 'check' : 'warning'} size={24} color={activity.status === 'checkin' ? 'green' : 'red'} />
                                </TouchableOpacity>)
                            }

                        </View>

                    </View>

                ))}
               
             
                <Text className="text-gray-600 mt-2">{schedule.detail[0].description}</Text>
                <View className="border-b border-gray-300 mt-4" />
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-white p-4">
            <ScrollView>
                <View className="mb-4">
                    <Text className="text-xl font-bold text-gray-800">
                        {tourDetail?.name || 'Tour Details'}
                    </Text>
                    <Text>Khởi hành ngày {new Date(tourDetail?.departure_date).toLocaleDateString()} - {tourDetail?.time}</Text>
                </View>
                <View className="space-y-4">
                    {scheduleDetail.map((schedule) => renderScheduleItem(schedule))}
                </View>
            </ScrollView>
            {selectedStatus && selectedNote && (<AlertScheduleState
                visible={isSupportGroupModalVisible}
                onClose={handleCloseSupportGroupModal}
                status={selectedStatus}
                note={selectedNote}
            />)}

        </View>
    );
}
