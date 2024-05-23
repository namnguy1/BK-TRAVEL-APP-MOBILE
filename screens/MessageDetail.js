import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { themeColors } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../slices/authSlice';
import axios from 'axios';

import { BASE_URL } from '../api';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
let socket;
export default function Message() {
  const [groupInfo, setGroupInfo] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  const userToken = useSelector(selectUserToken);
  const json = jwtDecode(userToken);
  const userId = json.user_id;
  const { params } = useRoute();
  const item = params;
  const navigation = useNavigation();
  const group_id = item.groupId;
  const getActiveGroupInfo = useCallback(async () => {
    try {
      if (group_id) {
        const response = await axios.get(`${BASE_URL}/api/v1/groups/${group_id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response?.status === 200) {
          setGroupInfo(response.data.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [group_id, userToken]);

  useEffect(() => {
    getActiveGroupInfo();
  }, [getActiveGroupInfo]);

  const getAllMessages = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/groups/${group_id}/messages`, {
        headers: {
          Authorization: `${userToken}`,
        },
      });
      if (response?.status === 200) {
        setAllMessages(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [group_id, userToken]);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);
  useEffect(() => {
    socket = io(BASE_URL, {
      query: { access_token: userToken },
      reconnection: true, // Kết nối lại tự động
      reconnectionAttempts: Infinity, // Số lần thử kết nối lại
      reconnectionDelay: 1000, // Độ trễ giữa các lần thử kết nối lại
      reconnectionDelayMax: 5000, // Độ trễ tối đa giữa các lần thử kết nối lại
    });

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('join', group_id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('room message', (msg, user_id) => {
      const newMsg = {
        content: msg,
        group_id: parseInt(group_id),
        message_id: allMessages.length + 1,
        user_id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setAllMessages(prev => [...prev, newMsg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [group_id, userToken]);


  const [activeGrp, setActiveGrp] = useState(null);

  const handleSelectGroup = () => {
    setActiveGrp && setActiveGrp(group_id);
    socket.emit('join', group_id);
  };
  useEffect(() => { handleSelectGroup() }, [handleSelectGroup]);


  // const handleSendMessage = async () => {
  //   if (newMessage.trim()) {
  //     try {
  //       const response = await axios.post(
  //         `${BASE_URL}/api/v1/groups/${item.groupId}/messages`,
  //         { content: newMessage },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${userToken}`,
  //           },
  //         }
  //       );
  //       if (response?.status === 201) {
  //         setAllMessages((prevMessages) => [...prevMessages, response.data.data]);
  //         setNewMessage('');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  const handleSendMessage = useCallback(async () => {
    try {
      if (newMessage !== '') {
        socket.emit(
          'send message',
          newMessage,
          group_id,
          userId
        );
        const body = {
          group_id: group_id,
          user_id: userId,
          content: newMessage,
        };
        const response = await axios.post(`${BASE_URL}/api/v1/messages`, body, {
          headers: {
            Authorization: `${userToken}`,
          },
        });
        if (response?.status === 200) {
          setNewMessage('');
        }
      } else {
        Alert.alert('Vui lòng nhập nội dung tin nhắn');
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Đã có lỗi xãy ra vui lòng thử lại');
    }
  }, [group_id, newMessage, socket, userToken, userId]);

  const renderMessage = useCallback(({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user_id === userId ? styles.userMessageContainer : styles.otherMessageContainer,
      ]}
    >
      <Text style={styles.sender}>{item.user_id === userId ? 'Tôi' : 'Khách hàng'}</Text>
      <View
        style={[
          styles.messageBubble,
          item.user_id === userId ? styles.userMessageBubble : styles.otherMessageBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    </View>
  ));



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="times" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Hộp thư hỗ trợ</Text>
      </View>
      <TouchableOpacity style={styles.contactContainer} onPress={() => navigation.navigate('Message')}>
        <View style={styles.contactInfo}>
          <Image
            source={{
              uri: 'https://c8.alamy.com/comp/T3W0AT/people-avatar-icons-with-dialog-speech-bubbles-male-and-female-faces-avatars-discussion-group-people-talking-communication-chat-assistance-vect-T3W0AT.jpg',
            }}
            style={styles.avatar}
          />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactName}>{groupInfo.name}</Text>
            <Text style={styles.contactSubtitle}>Nhóm hỗ trợ đến thông tin khách hàng</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome5 name="fist-raised" size={24} color={themeColors.bgColor(1)} />
        </TouchableOpacity>
      </TouchableOpacity>
      <FlatList
        data={allMessages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => `${item.message_id}-${index}`}
        style={styles.messageList}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập tin nhắn của bạn tại đây"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 16,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactTextContainer: {
    marginLeft: 16,
    width: '70%',
    // backgroundColor:'red',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactSubtitle: {
    color: '#888',
  },
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 20,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginVertical: 8,
    maxWidth: '80%',
    overflow: 'hidden', // Thêm thuộc tính này
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  sender: {
    fontSize: 14,
    color: '#666',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginTop: 4,
    maxWidth: '100%', // Thêm thuộc tính này
  },
  otherMessageBubble: {
    backgroundColor: '#e1f5fe',
  },
  userMessageBubble: {
    backgroundColor: '#c8e6c9',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 8,
  },
  textInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: themeColors.bgColor(1),
    padding: 10,
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
