import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    UIManager,
    Platform,
    LayoutAnimation,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ChevronLeftIcon, ChevronDownIcon, ClockIcon, ArrowRightCircleIcon } from 'react-native-heroicons/solid'
import { HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'react-native-heroicons/outline'

export default function Accordion({
    day,
    name,
    date,
    note,
    range_time,
    description,
}) {
    const [opened, setOpened] = useState(false);
    const extractDayNumber = (dayString) => {
        const match = dayString.match(/\d+/);
        return match ? parseInt(match[0]) : null;
    };
  

    // Convert 'day' prop to numeric format
    const dayNumber = extractDayNumber(day);
    if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
    ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    function toggleAccordion() {
        LayoutAnimation.configureNext({
            duration: 300,
            create: { type: 'easeIn', property: 'opacity' },
            update: { type: 'linear', springDamping: 0.3, duration: 250 },
        });
        setOpened(!opened);
    }

    return (
        // <View style={styles.container}>
        //     <TouchableWithoutFeedback onPress={toggleAccordion}>
        //         <View style={styles.header}>
        //             <Text style={styles.title}>{title}</Text>
        //             <AntDesign name={opened ? 'caretup' : 'caretdown'} size={16} />
        //         </View>
        //     </TouchableWithoutFeedback>

        //     {opened && (
        //         <View style={[styles.content]}>
        //             <Text style={styles.details}>{details}</Text>
        //         </View>
        //     )}
        // </View>


        <View>
            <View className="flex-row items-center justify-between space-y-2">
                <View className="flex-row items-center space-x-1">
                    <Text className="text-[16px] font-semibold">Ngày</Text>
                    <View className="rounded-full items-center justify-center bg-gray-400 w-[25] h-[25]">
                        <Text className="">{dayNumber}</Text>
                    </View>
                </View>
                <View>
                    <Text className="font-semibold text-xl"> {name.length > 15 ? `${name.substring(0, 15)}...` : name}</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                    <Text>{date}</Text>
                    <TouchableOpacity
                        onPress={toggleAccordion}
                    >
                        <ChevronDownIcon size="23" stroke={50} color="black" />
                    </TouchableOpacity>
                </View>


            </View>
            {opened && (
                <View className="mt-2 p-2 space-y-1 bg-gray-100 rounded-xl">
                    <View className="flex-row items-center space-x-4">
                        <ClockIcon size="30" stroke={50} color="#FFEA00" />
                        <Text className="flex-1 text-[16px] font-semibold">{range_time} :{name}</Text>
                    </View>
                    <View className="flex-row items-center space-x-4">
                        <ArrowRightCircleIcon size="30" stroke={50} color="red" />
                        <Text className="flex-1 text-[16px] font-semibold">{description}</Text>
                    </View>
                    <View className="flex-row  space-x-4">
                        <Text className="font-semibold text-lg ">*Lưu ý:</Text>
                        <Text className="flex-1 text-[16px]"> {note}</Text>
                    </View>
                </View>
            )}

        </View>

    );
}

const styles = StyleSheet.create({
    details: {
        fontWeight: 'regular',
        opacity: 0.65,
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    content: {
        marginTop: 8,
    },
    container: {
        margin: 10,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 6,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});