import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '../components/Loading'
import { login } from '../api'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { loginSuccess } from '../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LoginScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const handleLogin = async (values) => {
        const { email, password } = values;
        try {
            if (!email || !password) {
                Alert.alert("Log in", "Please fill all the fields below");
                return;
            }
            setLoading(true);
            const res = await login(email, password);
            console.log(res.data);
            const token = res.data.access_token;
            await AsyncStorage.setItem('token', token);
            dispatch(loginSuccess({ token }));
            navigation.navigate("HomeStack")
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Error', 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };
    
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
            <View
                style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                className="flex-1 bg-white px-8 pt-8">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email('Email không hợp lệ').required('Email is required'),
                        password: Yup.string()
                            .required('Password is required')
                            .min(6, 'Mật khẩu yếu'),
                    })}
                    onSubmit={handleLogin}
                >


                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        touched,
                        errors,
                    }) => (
                        <View className="form space-y-2">
                            <Text className="text-gray-700 ml-4">Email</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {touched.email && errors.email &&
                                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.email}</Text>}
                            <Text className="text-gray-700 ml-4">Password</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                                secureTextEntry
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            {touched.password && errors.password &&
                                <Text style={{ color: 'red', marginLeft: 10 }}>{errors.password}</Text>}
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
                                            onPress={handleSubmit}
                                        >
                                            <Text className="text-xl font-bold text-center text-gray-700">
                                                Đăng nhập
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </View>
                    )}
                </Formik>

                <Text className="text-xl text-gray-700 font-bold text-center py-5">Hoặc</Text>
                <View className="flex-row justify-center space-x-12">
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                        <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-gray-500 font-semibold">
                        Không có tài khoản?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-yellow-500"> Đăng ký</Text>
                    </TouchableOpacity>
                </View>

            </View >
        </View >

    )
}