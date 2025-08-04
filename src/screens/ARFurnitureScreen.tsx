import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import FurnitureSelector from '../components/FurnitureSelector';
import ControlPanel from '../components/ControlPanel';
import ARRenderer from '../components/ARRenderer';
import {FurnitureItem} from '../models/FurnitureItem';
import {furnitureLibrary} from '../utils/FurnitureLibrary';

const {width, height} = Dimensions.get('window');

interface PlacedFurniture extends FurnitureItem {
  id: string;
  position: {x: number; y: number; z: number};
  rotation: {x: number; y: number; z: number};
  scale: {x: number; y: number; z: number};
}

const ARFurnitureScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isARActive, setIsARActive] = useState<boolean>(false);
  const [selectedFurniture, setSelectedFurniture] = useState<FurnitureItem | null>(null);
  const [placedFurniture, setPlacedFurniture] = useState<PlacedFurniture[]>([]);
  const [planeDetected, setPlaneDetected] = useState<boolean>(false);
  const [selectedPlacedItem, setSelectedPlacedItem] = useState<string | null>(null);
  
  const arViewRef = useRef<View>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs camera access to use AR features',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        // iOS permission handling - simplified for this demo
        setHasPermission(true);
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setHasPermission(false);
    }
  };

  const startARSession = () => {
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Camera permission is required for AR features');
      return;
    }
    setIsARActive(true);
  };

  const stopARSession = () => {
    setIsARActive(false);
    setPlacedFurniture([]);
    setSelectedPlacedItem(null);
  };

  const onFurnitureSelect = (furniture: FurnitureItem) => {
    setSelectedFurniture(furniture);
  };

  const placeFurniture = (screenPosition: {x: number; y: number}) => {
    if (!selectedFurniture || !planeDetected) {
      Alert.alert('Cannot Place', 'Please select furniture and ensure a plane is detected');
      return;
    }

    const newPlacedItem: PlacedFurniture = {
      ...selectedFurniture,
      id: Date.now().toString(),
      position: {
        x: (screenPosition.x - width / 2) / 100,
        y: 0,
        z: (screenPosition.y - height / 2) / 100,
      },
      rotation: {x: 0, y: 0, z: 0},
      scale: {x: 1, y: 1, z: 1},
    };

    setPlacedFurniture(prev => [...prev, newPlacedItem]);
    setSelectedFurniture(null);
  };

  const onScaleChange = (itemId: string, scale: number) => {
    setPlacedFurniture(prev =>
      prev.map(item =>
        item.id === itemId
          ? {...item, scale: {x: scale, y: scale, z: scale}}
          : item
      )
    );
  };

  const onRotationChange = (itemId: string, rotation: number) => {
    setPlacedFurniture(prev =>
      prev.map(item =>
        item.id === itemId
          ? {...item, rotation: {x: 0, y: rotation, z: 0}}
          : item
      )
    );
  };

  const deleteFurniture = (itemId: string) => {
    setPlacedFurniture(prev => prev.filter(item => item.id !== itemId));
    setSelectedPlacedItem(null);
  };

  const onPlaneDetected = () => {
    if (!planeDetected) {
      setPlaneDetected(true);
      Alert.alert('Surface Detected', 'You can now place furniture on the detected surface');
    }
  };

  const onARTap = (screenPosition: {x: number; y: number}) => {
    if (selectedFurniture) {
      placeFurniture(screenPosition);
    } else {
      // Check if tapped on placed furniture
      const tappedItem = placedFurniture.find(item => {
        // Simple hit test - in a real app, this would be more sophisticated
        const itemScreenX = (item.position.x * 100) + width / 2;
        const itemScreenY = (item.position.z * 100) + height / 2;
        const distance = Math.sqrt(
          Math.pow(screenPosition.x - itemScreenX, 2) + 
          Math.pow(screenPosition.y - itemScreenY, 2)
        );
        return distance < 50; // 50px tap tolerance
      });
      
      setSelectedPlacedItem(tappedItem ? tappedItem.id : null);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isARActive ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>AR Furniture App</Text>
          <Text style={styles.subtitle}>
            Place and scale 3D furniture models in your real environment
          </Text>
          
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>🏠 Real-time plane detection</Text>
            <Text style={styles.featureItem}>📐 Object scaling and rotation</Text>
            <Text style={styles.featureItem}>🪑 Custom 3D furniture library</Text>
            <Text style={styles.featureItem}>🔍 Object occlusion simulation</Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={startARSession}>
            <Text style={styles.buttonText}>Start AR Experience</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.arContainer}>
          <ARRenderer
            ref={arViewRef}
            placedFurniture={placedFurniture}
            onPlaneDetected={onPlaneDetected}
            onTap={onARTap}
            style={styles.arView}
          />
          
          {planeDetected && (
            <View style={styles.planeIndicator}>
              <Text style={styles.planeText}>Surface Detected</Text>
            </View>
          )}

          <FurnitureSelector
            furnitureLibrary={furnitureLibrary}
            selectedFurniture={selectedFurniture}
            onSelect={onFurnitureSelect}
          />

          {selectedPlacedItem && (
            <ControlPanel
              selectedItemId={selectedPlacedItem}
              onScaleChange={onScaleChange}
              onRotationChange={onRotationChange}
              onDelete={() => deleteFurniture(selectedPlacedItem)}
            />
          )}

          <View style={styles.topControls}>
            <TouchableOpacity style={styles.exitButton} onPress={stopARSession}>
              <Text style={styles.buttonText}>Exit AR</Text>
            </TouchableOpacity>
            
            <Text style={styles.instructionText}>
              {selectedFurniture 
                ? 'Tap on a surface to place furniture' 
                : planeDetected 
                ? 'Select furniture to place or tap placed items to edit'
                : 'Move your device to detect surfaces'
              }
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  featureList: {
    marginBottom: 50,
  },
  featureItem: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  arContainer: {
    flex: 1,
  },
  arView: {
    flex: 1,
  },
  topControls: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  instructionText: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    maxWidth: 200,
    textAlign: 'center',
  },
  planeIndicator: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: 'rgba(0, 255, 0, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  planeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ARFurnitureScreen;
