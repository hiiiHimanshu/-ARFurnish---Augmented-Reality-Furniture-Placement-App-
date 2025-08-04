import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';

interface ControlPanelProps {
  selectedItemId: string;
  onScaleChange: (itemId: string, scale: number) => void;
  onRotationChange: (itemId: string, rotation: number) => void;
  onDelete: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedItemId,
  onScaleChange,
  onRotationChange,
  onDelete,
}) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
    onScaleChange(selectedItemId, newScale);
  };

  const handleRotationChange = (newRotation: number) => {
    setRotation(newRotation);
    onRotationChange(selectedItemId, newRotation);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Furniture',
      'Are you sure you want to delete this furniture item?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', style: 'destructive', onPress: onDelete},
      ]
    );
  };

  const resetTransforms = () => {
    setScale(1);
    setRotation(0);
    onScaleChange(selectedItemId, 1);
    onRotationChange(selectedItemId, 0);
  };

  if (!showControls) {
    return (
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setShowControls(true)}
      >
        <Text style={styles.toggleButtonText}>⚙️</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Furniture</Text>
        <TouchableOpacity
          style={styles.collapseButton}
          onPress={() => setShowControls(false)}
        >
          <Text style={styles.collapseButtonText}>−</Text>
        </TouchableOpacity>
      </View>

      {/* Scale Control */}
      <View style={styles.controlGroup}>
        <Text style={styles.controlLabel}>Scale: {scale.toFixed(1)}x</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>0.5x</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={3.0}
            value={scale}
            onValueChange={handleScaleChange}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ddd"
          />
          <Text style={styles.sliderLabel}>3.0x</Text>
        </View>
      </View>

      {/* Rotation Control */}
      <View style={styles.controlGroup}>
        <Text style={styles.controlLabel}>Rotation: {Math.round(rotation)}°</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>0°</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={360}
            value={rotation}
            onValueChange={handleRotationChange}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#ddd"
          />
          <Text style={styles.sliderLabel}>360°</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.resetButton]}
          onPress={resetTransforms}
        >
          <Text style={styles.actionButtonText}>Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Preset Scale Buttons */}
      <View style={styles.presetContainer}>
        <Text style={styles.presetLabel}>Quick Scale:</Text>
        <View style={styles.presetButtons}>
          {[0.5, 0.75, 1.0, 1.5, 2.0].map((presetScale) => (
            <TouchableOpacity
              key={presetScale}
              style={[
                styles.presetButton,
                scale === presetScale && styles.activePresetButton
              ]}
              onPress={() => handleScaleChange(presetScale)}
            >
              <Text style={[
                styles.presetButtonText,
                scale === presetScale && styles.activePresetButtonText
              ]}>
                {presetScale}x
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Preset Rotation Buttons */}
      <View style={styles.presetContainer}>
        <Text style={styles.presetLabel}>Quick Rotate:</Text>
        <View style={styles.presetButtons}>
          {[0, 45, 90, 180, 270].map((presetRotation) => (
            <TouchableOpacity
              key={presetRotation}
              style={[
                styles.presetButton,
                Math.round(rotation) === presetRotation && styles.activePresetButton
              ]}
              onPress={() => handleRotationChange(presetRotation)}
            >
              <Text style={[
                styles.presetButtonText,
                Math.round(rotation) === presetRotation && styles.activePresetButtonText
              ]}>
                {presetRotation}°
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  collapseButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapseButtonText: {
    fontSize: 16,
    color: '#666',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  toggleButtonText: {
    fontSize: 20,
  },
  controlGroup: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
  },
  sliderThumb: {
    backgroundColor: '#007AFF',
    width: 20,
    height: 20,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#666',
    minWidth: 30,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  resetButton: {
    backgroundColor: '#34C759',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
  presetContainer: {
    marginBottom: 12,
  },
  presetLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  presetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  presetButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activePresetButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  presetButtonText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
  },
  activePresetButtonText: {
    color: '#fff',
  },
});

export default ControlPanel;
