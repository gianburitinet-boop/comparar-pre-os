
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  store: string;
  imageUrl: string;
  onSale: boolean;
  previousPrice?: number;
}

export interface Store {
  id: string;
  name: string;
  logo: string;
  distance: string;
  rating: number;
  open: boolean;
  address: string;
  website: string; // URL oficial para busca direta
}

export interface Leaflet {
  id: string;
  storeId: string;
  storeName: string;
  title: string;
  validUntil: string;
  thumbnail: string;
}

export interface AIAnalysisResult {
  score: number;
  summary: string;
  reasoning: string;
  recommendation: string;
  sources?: { uri: string; title: string }[];
}

// Fixed: Added missing ShoppingItem interface used in ShoppingListSidebar.tsx
export interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  store: string;
  quantity: number;
  checked: boolean;
}
