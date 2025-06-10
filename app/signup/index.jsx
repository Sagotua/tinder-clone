import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import useUserStore from '../../stores/userStore';

export default function SignUpScreen() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!name || !email || !password) return;

    setUser({ name, email });
    router.push('/match');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Створити акаунт</Text>

      <TextInput
        style={styles.input}
        placeholder="Ім’я"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>Назад</Text>
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
  back: {
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
  },
});
