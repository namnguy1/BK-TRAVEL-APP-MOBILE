import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';


const AlertScheduleState = ({ visible, onClose, status, note }) => {
    let buttonColor, imageSource, statusText;

    switch (status) {
        case 'checkin':
            buttonColor = 'bg-green-500';
            imageSource = require('../assets/images/checked.png');
            statusText = 'Thành công!';
            break;
        case 'skip':
            buttonColor = 'bg-red-500';
            imageSource = require('../assets/images/closed.png');
            statusText = 'Xin lỗi bạn!';
            break;
        case 'delay':
            buttonColor = 'bg-yellow-500';
            imageSource = require('../assets/images/warning.png');
            statusText = 'Đã bỏ qua!';
            break;

    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
                    <View className="bg-white w-[300px] h-[300px] rounded-xl p-4 flex-col justify-between items-center">
                        <View className="items-center">
                            <Image
                                source={imageSource}
                                className="w-24 h-24"
                            />
                            <Text className="font-bold text-2xl mt-2">
                                {statusText}
                            </Text>
                            <Text className="mt-2 text-center">{note}</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} className={`w-24 p-4 rounded-full ${buttonColor} items-center`}>
                            <Text className="text-white">Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
    );
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }
});
export default AlertScheduleState;
