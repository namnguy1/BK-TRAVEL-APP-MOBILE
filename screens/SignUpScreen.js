import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import Loading from '../components/Loading'
import { register } from '../api'
export default function SignUpScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const firstNameRef = useRef("");
    const lastNameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");
    const handleSignUp = async () => {
        try {
            if (!emailRef.current ||
                !passwordRef.current || !firstNameRef.current
                || !lastNameRef.current || !confirmPasswordRef.current) {
                Alert.alert("Sign up", "Please fill all the fields below")
                return;
            }
            // Check if passwords match
            if (passwordRef.current !== confirmPasswordRef.current) {
                Alert.alert("Sign up", "Passwords do not match");
                return;
            }
            setLoading(true);
            const body = {
                firstname: firstNameRef.current.trim(),
                lastname: lastNameRef.current.trim(),
                email: emailRef.current.trim(),
                password: passwordRef.current,
                confirm_password: confirmPasswordRef.current,
            };
            const response = await register(body);

            // Handle successful sign-up
            console.log('Sign-up successful:', response);
            if (response.message === "Register successfully!") {
                Alert.alert('Tạo tài khoản thành công', 'Tài khoản đã được tạo!');
                navigation.navigate('Login');
            } else {
                if (response.message === 'Email is already existed!') {
                    Alert.alert('Email đã tồn tại trên hệ thống');
                } else {
                    Alert.alert('Đăng ký không thành công');
                }
            }

        } catch (error) {

            console.error('Sign Up error:', error);
            Alert.alert('Sign Up Error', 'Failed to sign up. Please check your information and try again.');
        }
        finally {
            setLoading(false);
        }

    }


    return (
        <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bgColor(1) }}>
            <SafeAreaView className="flex ">
                <View className="flex-row justify-start">
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/login.png')}
                        style={{ width: 200, height: 200 }} />
                </View>


            </SafeAreaView>
            <ScrollView
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                className="flex-1 bg-white px-8">
                <View className="form space-y-2 mt-2">

                    <Text className="font-bold text-gray-700 ml-2">Họ</Text>
                    <TextInput
                        className="p-2 bg-gray-100 text-gray-700 rounded-2xl"

                        placeholder="Họ"
                        onChangeText={value => firstNameRef.current = value}

                    />
                    <Text className="font-bold text-gray-700 ml-2">Tên</Text>
                    <TextInput
                        className="p-2 bg-gray-100 text-gray-700 rounded-2xl"

                        placeholder="Tên"
                        onChangeText={value => lastNameRef.current = value}

                    />
                    <Text className="text-gray-700 ml-2 font-bold">Email</Text>
                    <TextInput
                        className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                        placeholder="Email"
                        onChangeText={value => emailRef.current = value}
                    />
                    <Text className="text-gray-700 ml-2 font-bold">Mật khẩu</Text>
                    <TextInput
                        className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                        secureTextEntry
                        placeholder="Mật khẩu"
                        onChangeText={value => passwordRef.current = value}
                    />
                    <Text className="text-gray-700 ml-2 font-bold">Xác nhận mật khẩu</Text>
                    <TextInput
                        className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                        secureTextEntry
                        placeholder="Xác nhận mật khẩu"
                        onChangeText={value => confirmPasswordRef.current = value}
                    />


                    <TouchableOpacity className="flex items-end">
                        <Text className="text-gray-700 mb-5">Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <View>
                        {
                            loading ? (
                                <View className="flex-row justify-center">
                                    <Loading size={50} />
                                </View>
                            ) : (
                                <TouchableOpacity
                                    className="py-3 bg-yellow-400 rounded-xl"
                                    onPress={handleSignUp}

                                >

                                    <Text
                                        className="text-xl font-bold text-center text-gray-700"
                                    >
                                        Đăng ký
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>

                </View>
                <Text className="text-xl text-gray-700 font-bold text-center py-5">Hoặc</Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/icons/apple.png')} className="w-10 h-10" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/icons/facebook.png')} className="w-10 h-10" />
                    </TouchableOpacity> */}
                </View>
                <View className="flex-row justify-center mb-8">
                    <Text className="text-gray-500 font-semibold">
                        Đã có tài khoản?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-yellow-500"> Đăng Nhập</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>

    )
}