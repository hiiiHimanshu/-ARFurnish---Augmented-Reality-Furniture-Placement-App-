export interface FurnitureItem {
  id: string;
  name: string;
  category: 'chair' | 'table' | 'sofa' | 'desk' | 'bed' | 'cabinet' | 'decoration';
  modelPath: string;
  thumbnailPath: string;
  dimensions: {
    width: number; // in meters
    height: number;
    depth: number;
  };
  price?: number;
  description?: string;
  materials?: string[];
  colors?: string[];
  brand?: string;
}

export interface PlacedFurnitureItem extends FurnitureItem {
  placedId: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
  timestamp: number;
}
