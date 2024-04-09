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
import { ChevronLeftIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import { HeartIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'react-native-heroicons/outline'

export default function Accordion({

    day,
    start,
    end,
    numberOfMeals,
    description,
}) {
    const [opened, setOpened] = useState(false);

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
            <View className="flex-row space-x-4 space-y-2">
                <View className="flex-row items-center space-x-1">
                    <Text className="text-[16px] font-semibold">Ngày</Text>
                    <View className="rounded-full items-center justify-center bg-gray-400 w-[25] h-[25]">
                        <Text>{day}</Text>
                    </View>
                </View>
                <View>
                    <Text className="font-semibold">{start} - {end}</Text>
                    <Text className="font-semibold">Số bữa ăn: {numberOfMeals} bữa</Text>
                </View>
                <View className="flex-row items-center space-x-1">
                    <Text>18/02/2024</Text>
                    <TouchableOpacity
                        onPress={toggleAccordion}
                    >
                        <ChevronDownIcon size="23" stroke={50} color="black" />
                    </TouchableOpacity>
                </View>


            </View>
            {opened && (
                <View style={[styles.content]}>
                    <Text style={styles.details}>{description}</Text>
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