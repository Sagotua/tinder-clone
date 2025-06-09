import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwipeCard from '../../components/SwipeCard';
import useUserStore from '../../stores/userStore';

const users = [
  { id: 1, name: 'Аліна, 24', photo: 'https://placehold.co/300x400?text=Alina' },
  { id: 2, name: 'Марко, 28', photo: 'https://placehold.co/300x400?text=Marko' },
  { id: 3, name: 'Софія, 22', photo: 'https://placehold.co/300x400?text=Sofiya' },
];

export default function MatchScreen() {
  const [index, setIndex] = useState(0);
  const likeUser = useUserStore((state) => state.likeUser);

  const handleSwipe = (direction) => {
    const currentUser = users[index];

    if (direction === 'right') {
      likeUser(currentUser);
    }

    if (index < users.length - 1) {
      setIndex(index + 1);
    }
  };

  const current = users[index];

  return (
    <View style={styles.container}>
      {current ? (
        <SwipeCard user={current} onSwipe={handleSwipe} />
      ) : (
        <Text style={styles.end}>Більше анкет немає 😅</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf5',
    justifyContent: 'center',
    padding: 16,
  },
  end: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
  },
});
