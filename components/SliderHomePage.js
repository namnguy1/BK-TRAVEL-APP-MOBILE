import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, FlatList, Text, Dimensions } from 'react-native';
import { IntroduceImage } from '../constants'; // Make sure the path to IntroduceImage is correct

const { width: screenWidth } = Dimensions.get('window');

export default function SliderHomePage() {
    const flatListRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextPage = (currentPage + 1) % IntroduceImage.length;
            flatListRef.current?.scrollToIndex({ index: nextPage, animated: true });
            setCurrentPage(nextPage);
        }, 2000);

        return () => clearInterval(interval);
    }, [currentPage]);

    const handleScroll = event => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / screenWidth);
        setCurrentPage(index);
    };

    const renderIndicator = () => {
        return (
            <View style={styles.indicatorContainer}>
                {IntroduceImage.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            index === currentPage ? styles.activeIndicator : null,
                        ]}
                    />
                ))}
            </View>
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.slideContainer}>
            <Image
                source={item}
                style={styles.image}
            />
            <View style={styles.textOverlay}>
                <Text style={styles.blueText}>BK</Text>
                <Text style={styles.redText}>-TRAVEL</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={IntroduceImage}
                horizontal
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                onScroll={handleScroll}
                onMomentumScrollEnd={handleScroll}
            />
            {renderIndicator()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // marginBottom: 10,
    },
    slideContainer: {
        width: screenWidth,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'grey',
        marginHorizontal: 5,
    },
    textOverlay: {
        position: 'absolute',
        top: 30,
        left: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Background color for text
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
    },
    blueText: {
        color: 'white', // Blue color for 'BK'
        fontWeight: 'bold',
        fontSize: 24,
    },
    redText: {
        color: 'red', // Red color for 'TRAVEL'
        fontWeight: 'bold',
        fontSize: 24,
    },
    activeIndicator: {
        backgroundColor: 'blue', // Change to desired active indicator color
    },
});
