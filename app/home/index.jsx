import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import useUserStore from '../../stores/userStore';

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useUserStore();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Користувач не авторизований</Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>Перейти до входу</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Привіт, {user.name} 👋</Text>
      <Text style={styles.text}>Вітаємо у CatchYou :)</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A3F35',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#6E665E',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(120, 100, 90, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  link: {
    marginTop: 16,
    color: '#777',
    fontSize: 14,
  },
});
