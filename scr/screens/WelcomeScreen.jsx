import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>CatchYou :)</Text>
        <Text style={styles.subtitle}>Знайомся. Спілкуйся. Закохуйся.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Почати</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#4A3F35',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#6E665E',
    marginBottom: 48,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(120, 100, 90, 0.7)',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 32,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});
