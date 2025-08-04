import {FurnitureItem} from '../models/FurnitureItem';

export const furnitureLibrary: FurnitureItem[] = [
  {
    id: 'chair_modern_001',
    name: 'Modern Chair',
    category: 'chair',
    modelPath: './assets/models/chair_modern.glb',
    thumbnailPath: './assets/thumbnails/chair_modern.jpg',
    dimensions: {
      width: 0.6,
      height: 0.8,
      depth: 0.6,
    },
    price: 299,
    description: 'A sleek modern chair perfect for any contemporary space',
    materials: ['plastic', 'metal'],
    colors: ['black', 'white', 'red'],
    brand: 'ModernDesign',
  },
  {
    id: 'table_dining_001',
    name: 'Dining Table',
    category: 'table',
    modelPath: './assets/models/table_dining.glb',
    thumbnailPath: './assets/thumbnails/table_dining.jpg',
    dimensions: {
      width: 1.8,
      height: 0.75,
      depth: 0.9,
    },
    price: 899,
    description: 'Elegant dining table for family gatherings',
    materials: ['wood', 'metal'],
    colors: ['oak', 'walnut', 'white'],
    brand: 'ClassicFurniture',
  },
  {
    id: 'sofa_sectional_001',
    name: 'Sectional Sofa',
    category: 'sofa',
    modelPath: './assets/models/sofa_sectional.glb',
    thumbnailPath: './assets/thumbnails/sofa_sectional.jpg',
    dimensions: {
      width: 2.5,
      height: 0.85,
      depth: 1.6,
    },
    price: 1599,
    description: 'Comfortable sectional sofa perfect for living rooms',
    materials: ['fabric', 'foam', 'wood'],
    colors: ['gray', 'navy', 'beige'],
    brand: 'ComfortPlus',
  },
  {
    id: 'desk_office_001',
    name: 'Office Desk',
    category: 'desk',
    modelPath: './assets/models/desk_office.glb',
    thumbnailPath: './assets/thumbnails/desk_office.jpg',
    dimensions: {
      width: 1.4,
      height: 0.75,
      depth: 0.7,
    },
    price: 549,
    description: 'Professional office desk with ample workspace',
    materials: ['wood', 'metal'],
    colors: ['black', 'white', 'oak'],
    brand: 'OfficeMax',
  },
  {
    id: 'bed_queen_001',
    name: 'Queen Bed',
    category: 'bed',
    modelPath: './assets/models/bed_queen.glb',
    thumbnailPath: './assets/thumbnails/bed_queen.jpg',
    dimensions: {
      width: 1.53,
      height: 1.1,
      depth: 2.03,
    },
    price: 799,
    description: 'Comfortable queen size bed with upholstered headboard',
    materials: ['fabric', 'wood', 'metal'],
    colors: ['gray', 'beige', 'navy'],
    brand: 'SleepWell',
  },
  {
    id: 'cabinet_storage_001',
    name: 'Storage Cabinet',
    category: 'cabinet',
    modelPath: './assets/models/cabinet_storage.glb',
    thumbnailPath: './assets/thumbnails/cabinet_storage.jpg',
    dimensions: {
      width: 0.8,
      height: 1.8,
      depth: 0.4,
    },
    price: 449,
    description: 'Tall storage cabinet with multiple shelves',
    materials: ['wood'],
    colors: ['white', 'oak', 'walnut'],
    brand: 'StorageSolutions',
  },
  {
    id: 'lamp_floor_001',
    name: 'Floor Lamp',
    category: 'decoration',
    modelPath: './assets/models/lamp_floor.glb',
    thumbnailPath: './assets/thumbnails/lamp_floor.jpg',
    dimensions: {
      width: 0.4,
      height: 1.6,
      depth: 0.4,
    },
    price: 179,
    description: 'Modern floor lamp with adjustable brightness',
    materials: ['metal', 'fabric'],
    colors: ['black', 'white', 'brass'],
    brand: 'LightDesign',
  },
  {
    id: 'coffee_table_001',
    name: 'Coffee Table',
    category: 'table',
    modelPath: './assets/models/coffee_table.glb',
    thumbnailPath: './assets/thumbnails/coffee_table.jpg',
    dimensions: {
      width: 1.2,
      height: 0.45,
      depth: 0.6,
    },
    price: 329,
    description: 'Stylish coffee table with glass top',
    materials: ['glass', 'metal'],
    colors: ['clear', 'smoked', 'black'],
    brand: 'GlassWorks',
  },
];

export const getFurnitureByCategory = (category: string): FurnitureItem[] => {
  return furnitureLibrary.filter(item => item.category === category);
};

export const getFurnitureById = (id: string): FurnitureItem | undefined => {
  return furnitureLibrary.find(item => item.id === id);
};

export const getFurnitureCategories = (): string[] => {
  const categories = furnitureLibrary.map(item => item.category);
  return [...new Set(categories)];
};
