import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import {FurnitureItem} from '../models/FurnitureItem';
import {getFurnitureCategories} from '../utils/FurnitureLibrary';

const {width} = Dimensions.get('window');

interface FurnitureSelectorProps {
  furnitureLibrary: FurnitureItem[];
  selectedFurniture: FurnitureItem | null;
  onSelect: (furniture: FurnitureItem) => void;
}

const FurnitureSelector: React.FC<FurnitureSelectorProps> = ({
  furnitureLibrary,
  selectedFurniture,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  const categories = ['all', ...getFurnitureCategories()];

  const filteredFurniture = selectedCategory === 'all' 
    ? furnitureLibrary 
    : furnitureLibrary.filter(item => item.category === selectedCategory);

  const renderFurnitureItem = ({item}: {item: FurnitureItem}) => {
    const isSelected = selectedFurniture?.id === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.furnitureItem, isSelected && styles.selectedItem]}
        onPress={() => onSelect(item)}
      >
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>
            {item.name.substring(0, 2).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.furnitureName} numberOfLines={2}>
          {item.name}
        </Text>
        {item.price && (
          <Text style={styles.furniturePrice}>${item.price}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderCategoryButton = (category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategory
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === category && styles.selectedCategoryText
      ]}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.floatingButtonText}>🪑</Text>
      </TouchableOpacity>

      {/* Furniture Selection Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Furniture</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Category Selector */}
            <View style={styles.categoryContainer}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                renderItem={({item}) => renderCategoryButton(item)}
                keyExtractor={(item) => item}
                style={styles.categoryList}
              />
            </View>

            {/* Furniture Grid */}
            <FlatList
              data={filteredFurniture}
              renderItem={renderFurnitureItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              style={styles.furnitureGrid}
              contentContainerStyle={styles.furnitureGridContent}
              showsVerticalScrollIndicator={false}
            />

            {/* Selected Item Info */}
            {selectedFurniture && (
              <View style={styles.selectedInfo}>
                <Text style={styles.selectedInfoTitle}>Selected:</Text>
                <Text style={styles.selectedInfoText}>
                  {selectedFurniture.name}
                </Text>
                <Text style={styles.selectedInfoDimensions}>
                  {(selectedFurniture.dimensions.width * 100).toFixed(0)}cm × {' '}
                  {(selectedFurniture.dimensions.height * 100).toFixed(0)}cm × {' '}
                  {(selectedFurniture.dimensions.depth * 100).toFixed(0)}cm
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Compact Selector (Bottom Bar) */}
      {!showModal && isExpanded && (
        <View style={styles.compactSelector}>
          <FlatList
            horizontal
            data={filteredFurniture.slice(0, 5)}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.compactItem,
                  selectedFurniture?.id === item.id && styles.compactSelectedItem
                ]}
                onPress={() => onSelect(item)}
              >
                <View style={styles.compactPlaceholder}>
                  <Text style={styles.compactPlaceholderText}>
                    {item.name.substring(0, 2).toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  floatingButtonText: {
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryList: {
    flexGrow: 0,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  furnitureGrid: {
    flex: 1,
    paddingHorizontal: 20,
  },
  furnitureGridContent: {
    paddingBottom: 20,
  },
  furnitureItem: {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: '#007AFF',
    backgroundColor: '#e6f3ff',
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  furnitureName: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  furniturePrice: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  selectedInfo: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  selectedInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  selectedInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  selectedInfoDimensions: {
    fontSize: 12,
    color: '#666',
  },
  compactSelector: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 10,
  },
  compactItem: {
    marginRight: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  compactSelectedItem: {
    backgroundColor: '#007AFF',
  },
  compactPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactPlaceholderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default FurnitureSelector;
