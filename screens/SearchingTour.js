import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import { HeartIcon, MinusIcon, PlusIcon, MapPinIcon, CalendarIcon } from 'react-native-heroicons/outline'
import { BASE_URL } from '../api'
import axios from 'axios'
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useSelector } from 'react-redux';
import { selectUserToken } from '../slices/authSlice';
export default function SearchingTour() {
    const navigation = useNavigation();
    const userToken = useSelector(selectUserToken);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };
    const handleDateBackward = () => {
        const newDate = new Date(date.getTime() - 86400000);
        setDate(newDate);
    };

    const handleDateForward = () => {
        const newDate = new Date(date.getTime() + 86400000);
        setDate(newDate);
    };
    const [startSelected, setStartSelected] = React.useState("");
    const [endSelected, setEndSelected] = React.useState("");
    const [timeOptionsSelected, setTimeOptionsSelected] = React.useState("");
    const data = [
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]
    const [timeOptions, setTimeOptions] = useState([]);
    const createTimeOptions = () => {
        const timeOpts = [];
        for (let i = 0; i < 10; i++) {
            let newOpt;
            if (i === 0) {
                newOpt = {
                    key: `${i + 1}`,
                    value: `${i + 1} ngày`,
                };
            } else {
                newOpt = {
                    key: `${i + 1}`,
                    value: `${i + 1} ngày, ${i} đêm`,
                };
            }
            timeOpts.push(newOpt);
        }
        setTimeOptions(timeOpts);
    }
    // console.log('time options: ', timeOptions);
    useEffect(() => {
        createTimeOptions();
    }, []);

    const [allDestinations, setAllDestinations] = useState([]);
    const getAllDestinations = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/destinations/all`, {
                headers: {
                    Authorization: `${userToken}`,
                },
            })
            if (response.status === 200) {
                const allDes = response.data.data;
                allDes.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
                setAllDestinations(allDes.map(destination => ({ key: destination.destination_id.toString(), value: destination.name })));
            }
        } catch (error) {
            console.error(error);
        }
    }, []);
    // console.log('destination: ', allDestinations);
    useEffect(() => {
        getAllDestinations();
    }, [getAllDestinations]);

    const handleSearch = useCallback(async () => {
        console.log("Khởi hành:", startSelected);
        console.log("Điểm đến:", endSelected);
        console.log("Thời gian tour:", timeOptionsSelected);
        console.log("Ngày khởi hành:", format(date, 'dd/MM/yyyy'));
        try {
            console.log(`${BASE_URL}/api/v1/tours/search?departure_place=${startSelected}&destination_place=${endSelected}&time=${timeOptionsSelected}&departure_date=${format(date, 'yyyy-MM-dd')}`);
            const params = {
                departure_place: startSelected,
                destination_place: endSelected,
                time: timeOptionsSelected,
                departure_date: format(date, 'yyyy-MM-dd')
            };
            const response = await axios.get(`${BASE_URL}/api/v1/tours/search`, { params });
            console.log('response: ', response);
            if (response.status === 200) {
                navigation.navigate('SearchTourResult', { results: response.data.data });
            }
        } catch (error) {
            console.error(error);
        }
    });
    return (
        <View className="flex-1 bg-white relative">
            <View className="absolute z-10  flex-row px-4 py-4  items-center w-full">
                <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white rounded-2xl p-3 shadow">
                    <ChevronLeftIcon size="23" stroke={50} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold ml-[90px]">Tìm Kiếm</Text>

            </View>

            <View className="px-4 mt-[80px] space-y-4">

                <View className="p-4 space-y-10 rounded-2xl border-[0.5px]">
                    <Text className="mb-2 font-semibold text-[16px]">Khởi hành:</Text>
                    <SelectList
                        setSelected={(val) => setStartSelected(val)}
                        data={allDestinations}
                        save="value"
                        placeholder="Chọn địa điểm khởi hành"
                        searchPlaceholder="Tìm kiếm địa điểm"
                    />
                </View>
                <View className="p-4 space-y-10 rounded-2xl border-[0.5px]">
                    <Text className="mb-2 font-semibold text-[16px]">Điểm đến:</Text>
                    <SelectList
                        setSelected={(val) => setEndSelected(val)}
                        data={allDestinations}
                        save="value"
                        placeholder="Chọn điểm đến"
                        searchPlaceholder="Tìm kiếm điểm đến"
                    />
                </View>
                <View className="p-4 space-y-10 rounded-2xl border-[0.5px]">
                    <Text className="mb-2 font-semibold text-[16px]">Thời gian tour:</Text>
                    <SelectList
                        setSelected={(val) => setTimeOptionsSelected(val)}
                        data={timeOptions}
                        save="value"
                        placeholder="Chọn thời gian tour"
                        searchPlaceholder="Tìm kiếm thời gian tour"
                    />
                </View>
                <View className="flex-row px-3 items-center justify-between w-full h-[80px] rounded-2xl border-[0.5px]">
                    <View className="space-y-2">
                        <Text>Ngày khởi hành:</Text>
                        <Text className="text-[16px] font-bold">{format(date, 'dd/MM/yyyy')}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                    >
                        <CalendarIcon size="26" color="black" />
                    </TouchableOpacity>
                </View>
                {/* <View className="flex-row px-3 items-center justify-between w-full h-[80px] rounded-2xl border-[0.5px]">
                    <View className="space-y-2">
                        <Text>Thời gian tour:</Text>
                        <Text className="text-[16px] font-bold">Từ 3 đến 5 ngày</Text>
                    </View>
                    <ChevronDownIcon size="26" color="black" />
                </View> */}
            </View>
            <View className="px-12 mt-[100px]">
                <TouchableOpacity
                    className="w-full h-12  rounded-2xl border-[1px]  flex-row justify-center items-center space-x-4"
                    style={{
                        borderColor: '#42bcf5'
                    }}
                >
                    <Text className="text-sky-400/100 font-bold text-[20px] text-center">+</Text>
                    <Text className="text-sky-400/100 font-bold text-[20px] text-center">Tạo tour của riêng bạn</Text>
                </TouchableOpacity>
            </View>

            <View className="px-4 py-2 w-full h-[100px] absolute items-center justify-center  bg-white bottom-0 space-y-1 border-t-[0.5px] border-t-indigo-500">

                <View className="flex-row">
                    <TouchableOpacity className="w-full h-[50px] 
                     bg-[#FF5F73]
                        justify-center rounded-2xl
                        items-center"
                        onPress={handleSearch}
                    >
                        <Text className="text-white font-bold text-[20px] text-center">
                            Tìm kiếm
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

        </View>
    )
}