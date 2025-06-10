import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useUserStore from '../../stores/userStore';

export default function ChatScreen() {
  const { id } = useLocalSearchParams(); // отримуємо id з URL
  const chatId = parseInt(id);

  const { user, chats, sendMessage } = useUserStore((state) => ({
    user: state.user,
    chats: state.chats,
    sendMessage: state.sendMessage,
  }));

  const chat = chats[chatId];
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(chatId, user.id, text.trim());
    setText('');
  };

  const renderItem = ({ item }) => {
    const isMe = item.senderId === user.id;
    return (
      <View style={[styles.message, isMe ? styles.mine : styles.theirs]}>
        <Text style={styles.msgText}>{item.text}</Text>
      </View>
    );
  };

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text>Чат не знайдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Чат з {chat.user2.name}</Text>

      <FlatList
        data={chat.messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 12 }}
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Повідомлення..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
          <Text style={{ color: 'white' }}>Надіслати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf5',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A3F35',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    padding: 10,
    marginVertical: 6,
    borderRadius: 12,
    maxWidth: '80%',
  },
  mine: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1fcd3',
  },
  theirs: {
    alignSelf: 'flex-start',
    backgroundColor: '#f2ece6',
  },
  msgText: {
    fontSize: 16,
    color: '#333',
  },
  inputBar: {
    flexDirection: 'row',
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#6b714e',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});
