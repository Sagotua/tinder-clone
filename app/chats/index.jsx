import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import useUserStore from '../../stores/userStore';
import { useRouter } from 'expo-router';

export default function ChatsScreen() {
  const router = useRouter();
  const chats = useUserStore((state) => state.chats);

  if (chats.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>У вас ще немає чатів 😢</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Чати 💬</Text>
      <FlatList
        data={chats}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.chatCard}
            onPress={() => router.push(`/chats/${index}`)}
          >
            <Text style={styles.name}>{item.user2.name}</Text>
            <Text style={styles.preview}>
              {item.messages.length > 0
                ? item.messages[item.messages.length - 1].text
                : 'Нове знайомство ✨'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4A3F35',
    textAlign: 'center',
  },
  empty: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: '50%',
  },
  chatCard: {
    backgroundColor: '#f2ece6',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A3F35',
  },
  preview: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
