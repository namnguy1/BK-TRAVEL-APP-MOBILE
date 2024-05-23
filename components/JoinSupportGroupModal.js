import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const JoinSupportGroupModal = ({ visible, onClose, onConfirm }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Tham gia vào nhóm hỗ trợ</Text>
                    <Text style={styles.modalText}>Bạn có muốn tham gia vào nhóm hỗ trợ của tour này không?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonConfirm} onPress={onConfirm}>
                            <Text style={styles.textStyle}>Xác nhận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
                            <Text style={styles.textStyle}>Huỷ</Text>
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
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',  
        width: '80%',
    },
    buttonCancel: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#d3d3d3',
        marginLeft: 10,
    },
    buttonConfirm: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#007BFF',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default JoinSupportGroupModal;
