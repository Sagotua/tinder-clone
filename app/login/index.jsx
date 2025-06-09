import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LogInScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід у акаунт</Text>

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Пароль" placeholderTextColor="#999" secureTextEntry />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Увійти</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text style={styles.link}>Немає акаунта? Зареєструватися</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/forgot')}>
        <Text style={styles.link}>Забули пароль?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf5',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A3F35',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f2ece6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: 'rgba(120, 100, 90, 0.8)',
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
  },
});
