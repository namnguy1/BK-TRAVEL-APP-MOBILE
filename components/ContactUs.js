import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ContactUs = ({ onOpenModal }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liên hệ với chúng tôi</Text>
            <Text style={styles.subtitle}>Bạn đang gặp vấn đề? Liên hệ ngay với chúng tôi!</Text>
            <TouchableOpacity style={styles.button} onPress={onOpenModal}>
                <Text style={styles.buttonText}>Liên hệ với chúng tôi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 0.5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 150,
        alignSelf: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        color: '#666',
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ContactUs;
