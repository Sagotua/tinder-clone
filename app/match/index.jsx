import { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwipeCard from '../../components/SwipeCard';
import useUserStore from '../../stores/userStore';
import { useRouter } from 'expo-router';

const initialUsers = [
  {
    id: 2,
    name: 'Аліна, 24',
    photo: 'https://placehold.co/300x400?text=Alina',
    likedYou: [1],
  },
  {
    id: 3,
    name: 'Марко, 28',
    photo: 'https://placehold.co/300x400?text=Marko',
    likedYou: [],
  },
  {
    id: 4,
    name: 'Софія, 22',
    photo: 'https://placehold.co/300x400?text=Sofiya',
    likedYou: [1],
  },
];

export default function MatchScreen() {
  const [userList] = useState(initialUsers);
  const [index, setIndex] = useState(0);
  const likeUser = useUserStore((state) => state.likeUser);
  const router = useRouter();
  const hasNavigated = useRef(false); // ✅ БЕЗ rerender-ів

  const handleSwipe = (direction) => {
    if (hasNavigated.current) return; // 🛡️

    const currentUser = userList[index];
    console.log('SWIPED:', direction, '→', currentUser?.name);

    const isMatch = direction === 'right' && currentUser.likedYou.includes(1);

    if (direction === 'right') {
      likeUser(currentUser);
    }

    if (isMatch) {
      hasNavigated.current = true; // ⛔️ Блокуємо повтор
      setTimeout(() => {
        router.push(`/chats/${currentUser.id}`);
      }, 300);
      return;
    }

    // Плавний перехід до наступної картки
    setTimeout(() => {
      if (index < userList.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(userList.length);
      }
    }, 300);
  };

  const current = userList[index];

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
