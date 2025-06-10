import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function SwipeCard({ user, onSwipe }) {
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      const shouldSwipe = Math.abs(translateX.value) > SWIPE_THRESHOLD;

      if (shouldSwipe) {
        const direction = translateX.value > 0 ? 'right' : 'left';
        const endX = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

        translateX.value = withTiming(endX, { duration: 200 }, () => {
          runOnJS(onSwipe)(direction);
        });
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = `${(translateX.value / SCREEN_WIDTH) * 20}deg`;
    const opacity = 1 - Math.abs(translateX.value) / (SCREEN_WIDTH * 1.2);
    return {
      transform: [{ translateX: translateX.value }, { rotate }],
      opacity,
    };
  });

  const likeStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, SWIPE_THRESHOLD],
        [0, 1],
        Extrapolate.CLAMP
      ),
      transform: [{ rotate: '-15deg' }],
    };
  });

  const nopeStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [-SWIPE_THRESHOLD, 0],
        [1, 0],
        Extrapolate.CLAMP
      ),
      transform: [{ rotate: '15deg' }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, cardStyle]}>
        <Image source={{ uri: user.photo }} style={styles.image} />

        <Animated.View style={[styles.badge, styles.like, likeStyle]}>
          <Text style={styles.badgeText}>LIKE</Text>
        </Animated.View>

        <Animated.View style={[styles.badge, styles.nope, nopeStyle]}>
          <Text style={styles.badgeText}>NOPE</Text>
        </Animated.View>

        <Text style={styles.name}>{user.name}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 500,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#eee',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24,
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  badge: {
    position: 'absolute',
    top: 40,
    padding: 10,
    borderWidth: 4,
    borderRadius: 12,
  },
  like: {
    left: 20,
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  nope: {
    right: 20,
    borderColor: '#F44336',
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  badgeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});
