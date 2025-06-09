import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function SwipeCard({ user, onSwipe }) {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        runOnJS(onSwipe)(direction);
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const likeStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? translateX.value / 100 : 0,
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? -translateX.value / 100 : 0,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image source={{ uri: user.photo }} style={styles.image} />
        <Animated.Text style={[styles.badge, styles.like, likeStyle]}>
          LIKE
        </Animated.Text>
        <Animated.Text style={[styles.badge, styles.nope, nopeStyle]}>
          NOPE
        </Animated.Text>
        <Text style={styles.name}>{user.name}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 400,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#eee',
    elevation: 4,
    alignSelf: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '85%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    color: '#4A3F35',
  },
  badge: {
    position: 'absolute',
    top: 20,
    fontSize: 32,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  like: {
    left: 20,
    borderColor: '#4CAF50',
    color: '#4CAF50',
    transform: [{ rotate: '-15deg' }],
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  nope: {
    right: 20,
    borderColor: '#F44336',
    color: '#F44336',
    transform: [{ rotate: '15deg' }],
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
});
