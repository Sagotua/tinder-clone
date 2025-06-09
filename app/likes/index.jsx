import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import useUserStore from '../../stores/userStore';

export default function LikesScreen() {
  const likedUsers = useUserStore((state) => state.likedUsers);

  if (likedUsers.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>У вас ще немає лайків 💔</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Мої лайки 💖</Text>
      <FlatList
        data={likedUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2ece6',
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
  },
  image: {
    width: 60,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    color: '#4A3F35',
  },
});
