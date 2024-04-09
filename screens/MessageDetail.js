import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
export default function MessageDetail() {
  const [messages, setMessages] = useState([
    { id: 1, senderId: 'user1', receiverId: 'user2', message: 'Hello', timestamp: new Date() },
    { id: 2, senderId: 'user2', receiverId: 'user1', message: 'Hi there!', timestamp: new Date() },
    // Add more mock messages here if needed
  ]);
  const formatTime = time => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(time).toLocaleString('en-US', options);
  };
  const navigation = useNavigation();
  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgColor(0) }}
            className="rounded-full p-1 shadow"
            onPress={() => { navigation.goBack() }}
          >
            <Entypo name="chevron-left" size={30} color="#737373" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-3 ml-3">
            <Image
              source={{ uri: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png' }}
              style={{ width: 40, height: 40, borderRadius: 80 }}
              resizeMode='contain'
            />
            <Text className="text-neutral-700 font-medium text-2xl">
              BeoBeo
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons name="videocam-outline" size={24} color="black" />
        </View>
      ),
    });
  }, []);
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {messages?.map((item, index) => (
          <Pressable
            key={index}
            style={[
              item?.senderId === 'user1'
                ? {
                  alignSelf: 'flex-end',
                  backgroundColor: themeColors.bgColor(1),
                  padding: 8,
                  maxWidth: '60%',
                  borderRadius: 7,
                  margin: 10,
                }
                : {
                  alignSelf: 'flex-start',
                  backgroundColor: themeColors.bgColor(0.6),
                  padding: 8,
                  margin: 10,
                  borderRadius: 7,
                  maxWidth: '60%',
                },
            ]}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'left',
                color: 'white',
                fontWeight: '500',
              }}>
              {item?.message}
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: 'right',
                color: 'black',
                marginTop: 5,
              }}>
              {formatTime(item?.timestamp)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#dddddd',
          // marginBottom: 30,
        }}>
        <Entypo
          style={{ marginRight: 7 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />
        <TextInput
          value={messages}
          // onChangeText={text => setMessage(text)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: '#dddddd',
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Nhập tin nhắn..."
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginHorizontal: 8,
          }}
          className="space-x-2"
        >
          <Entypo name="camera" size={24} color="gray" />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable
          // onPress={() =>
          //   sendMessage(route?.params?.senderId, route?.params?.receiverId)
          // }
          style={{
            backgroundColor: themeColors.bgColor(1),
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Gửi</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}