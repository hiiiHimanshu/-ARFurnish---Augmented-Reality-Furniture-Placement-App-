import React, {useRef, useEffect, forwardRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import {FurnitureItem} from '../models/FurnitureItem';

const {width, height} = Dimensions.get('window');

interface PlacedFurnitureItem extends FurnitureItem {
  id: string;
  position: {x: number; y: number; z: number};
  rotation: {x: number; y: number; z: number};
  scale: {x: number; y: number; z: number};
}

interface ARRendererProps {
  placedFurniture: PlacedFurnitureItem[];
  onPlaneDetected: () => void;
  onTap: (screenPosition: {x: number; y: number}) => void;
  style?: any;
}

const ARRenderer = forwardRef<View, ARRendererProps>(({
  placedFurniture,
  onPlaneDetected,
  onTap,
  style,
}, ref) => {
  const [planeDetected, setPlaneDetected] = useState(false);
  const [backgroundPattern, setBackgroundPattern] = useState<any[]>([]);
  const animatedValues = useRef<{[key: string]: Animated.Value}>({});

  // Simulate camera background with animated dots
  useEffect(() => {
    const patterns: Array<{
      id: number;
      x: number;
      y: number;
      opacity: Animated.Value;
    }> = [];
    for (let i = 0; i < 50; i++) {
      patterns.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        opacity: new Animated.Value(Math.random() * 0.3),
      });
    }
    setBackgroundPattern(patterns);

    // Animate background pattern
    const animatePattern = () => {
      patterns.forEach(pattern => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pattern.opacity, {
              toValue: Math.random() * 0.5,
              duration: 2000 + Math.random() * 3000,
              useNativeDriver: true,
            }),
            Animated.timing(pattern.opacity, {
              toValue: Math.random() * 0.3,
              duration: 2000 + Math.random() * 3000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    };

    animatePattern();

    // Simulate plane detection after 2 seconds
    const planeDetectionTimer = setTimeout(() => {
      setPlaneDetected(true);
      onPlaneDetected();
    }, 2000);

    return () => clearTimeout(planeDetectionTimer);
  }, [onPlaneDetected]);

  // Animate furniture items
  useEffect(() => {
    placedFurniture.forEach(item => {
      if (!animatedValues.current[item.id]) {
        animatedValues.current[item.id] = new Animated.Value(0);
        Animated.spring(animatedValues.current[item.id], {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }).start();
      }
    });
  }, [placedFurniture]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderGrant: (evt) => {
      const {locationX, locationY} = evt.nativeEvent;
      onTap({x: locationX, y: locationY});
    },
  });

  const renderFurnitureItem = (item: PlacedFurnitureItem) => {
    const animatedValue = animatedValues.current[item.id] || new Animated.Value(1);
    
    // Convert 3D position to 2D screen coordinates
    const screenX = (item.position.x * 100) + width / 2;
    const screenY = (item.position.z * 100) + height / 2;
    
    const size = Math.max(item.dimensions.width, item.dimensions.depth) * 100 * item.scale.x;
    
    return (
      <Animated.View
        key={item.id}
        style={[
          styles.furnitureItem,
          {
            left: screenX - size / 2,
            top: screenY - size / 2,
            width: size,
            height: size,
            transform: [
              {scale: animatedValue},
              {rotate: `${item.rotation.y}deg`},
            ],
          },
        ]}
      >
        <View style={[styles.furnitureShape, {
          backgroundColor: getFurnitureColor(item.category),
          borderColor: getFurnitureBorderColor(item.category),
        }]}>
          <Text style={styles.furnitureIcon}>
            {getFurnitureIcon(item.category)}
          </Text>
          <Text style={styles.furnitureLabel} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        
        {/* Shadow effect */}
        <View style={[styles.furnitureShadow, {
          width: size * 0.8,
          height: size * 0.3,
          left: size * 0.1,
          top: size * 0.8,
        }]} />
      </Animated.View>
    );
  };

  const getFurnitureColor = (category: string): string => {
    const colors: {[key: string]: string} = {
      chair: '#FFE4B5',
      table: '#DEB887',
      sofa: '#F5DEB3',
      desk: '#D2B48C',
      bed: '#FAEBD7',
      cabinet: '#E6E6FA',
      decoration: '#FFF8DC',
    };
    return colors[category] || '#E0E0E0';
  };

  const getFurnitureBorderColor = (category: string): string => {
    const colors: {[key: string]: string} = {
      chair: '#DAA520',
      table: '#CD853F',
      sofa: '#DEB887',
      desk: '#A0522D',
      bed: '#D2B48C',
      cabinet: '#9370DB',
      decoration: '#F0E68C',
    };
    return colors[category] || '#B0B0B0';
  };

  const getFurnitureIcon = (category: string): string => {
    const icons: {[key: string]: string} = {
      chair: '🪑',
      table: '🪑',
      sofa: '🛋️',
      desk: '🪑',
      bed: '🛏️',
      cabinet: '🗄️',
      decoration: '🪴',
    };
    return icons[category] || '📦';
  };

  return (
    <View ref={ref} style={[styles.container, style]} {...panResponder.panHandlers}>
      {/* Simulated Camera Background */}
      <View style={styles.cameraBackground}>
        {backgroundPattern.map((pattern) => (
          <Animated.View
            key={pattern.id}
            style={[
              styles.backgroundDot,
              {
                left: pattern.x,
                top: pattern.y,
                opacity: pattern.opacity,
              },
            ]}
          />
        ))}
      </View>

      {/* Plane Detection Grid */}
      {planeDetected && (
        <View style={styles.planeGrid}>
          {Array.from({length: 10}).map((_, i) => (
            <View key={`h-${i}`} style={[styles.gridLine, styles.horizontalLine, {
              top: (height / 10) * i,
            }]} />
          ))}
          {Array.from({length: 10}).map((_, i) => (
            <View key={`v-${i}`} style={[styles.gridLine, styles.verticalLine, {
              left: (width / 10) * i,
            }]} />
          ))}
        </View>
      )}

      {/* Rendered Furniture */}
      {placedFurniture.map(renderFurnitureItem)}

      {/* Center Crosshair */}
      <View style={styles.crosshair}>
        <View style={styles.crosshairHorizontal} />
        <View style={styles.crosshairVertical} />
      </View>

      {/* Plane Detection Indicator */}
      {!planeDetected && (
        <View style={styles.scanningIndicator}>
          <Text style={styles.scanningText}>
            Scanning for surfaces...
          </Text>
          <View style={styles.scanningDots}>
            <Animated.View style={[styles.scanningDot, {opacity: 0.3}]} />
            <Animated.View style={[styles.scanningDot, {opacity: 0.6}]} />
            <Animated.View style={[styles.scanningDot, {opacity: 1}]} />
          </View>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  cameraBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2a2a2a',
  },
  backgroundDot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  planeGrid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#00ff00',
  },
  horizontalLine: {
    height: 1,
    width: '100%',
  },
  verticalLine: {
    width: 1,
    height: '100%',
  },
  furnitureItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  furnitureShape: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  furnitureIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  furnitureLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  furnitureShadow: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 100,
  },
  crosshair: {
    position: 'absolute',
    top: height / 2 - 10,
    left: width / 2 - 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crosshairHorizontal: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: '#fff',
  },
  crosshairVertical: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: '#fff',
  },
  scanningIndicator: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanningText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  scanningDots: {
    flexDirection: 'row',
  },
  scanningDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginHorizontal: 4,
  },
});

export default ARRenderer;
