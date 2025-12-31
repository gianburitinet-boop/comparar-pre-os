
import { Product, Store, Leaflet } from './types';

export const STORES: Store[] = [
  { id: '1', name: 'Carrefour', logo: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=100&h=100&fit=crop&q=80', distance: '1.2 km', rating: 4.5, open: true, address: 'Av. Alberto Augusto Alves, 50', website: 'https://mercado.carrefour.com.br/' },
  { id: '2', name: 'Pão de Açúcar', logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop&q=80', distance: '0.8 km', rating: 4.8, open: true, address: 'R. Abílio Soares, 400', website: 'https://www.paodeacucar.com/' },
  { id: '3', name: 'Extra', logo: 'https://images.unsplash.com/photo-1534723452862-4c874e70d6f3?w=100&h=100&fit=crop&q=80', distance: '2.5 km', rating: 4.2, open: true, address: 'Av. Brig. Luís Antônio, 2013', website: 'https://www.extramercado.com.br/' },
  { id: '4', name: 'Assaí Atacadista', logo: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&h=100&fit=crop&q=80', distance: '4.1 km', rating: 4.0, open: true, address: 'Av. Aricanduva, 5555', website: 'https://www.assai.com.br' },
  { id: '5', name: 'Bergamini', logo: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=100&h=100&fit=crop&q=80', distance: '3.0 km', rating: 4.3, open: true, address: 'Av. Luis Stamatis, 431', website: 'https://www.bergamini.comercial.ws/' },
  { id: '6', name: 'Trimais', logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=100&h=100&fit=crop&q=80', distance: '2.1 km', rating: 4.6, open: true, address: 'Av. Dr. Antônio Maria Laet, 566', website: 'https://www.trimais.com.br/' },
  { id: '7', name: 'Andorinha', logo: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=100&h=100&fit=crop&q=80', distance: '5.5 km', rating: 4.7, open: true, address: 'Av. Parada Pinto, 2262', website: 'https://andorinhaonline.com.br/' },
  { id: '8', name: 'Sonda', logo: 'https://images.unsplash.com/photo-1580913209249-41873f4df442?w=100&h=100&fit=crop&q=80', distance: '1.9 km', rating: 4.4, open: true, address: 'R. Maria Cândida, 1511', website: 'https://www.sondadelivery.com.br/' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Arroz Agulhinha Premium 5kg', category: 'Despensa', price: 28.90, unit: 'pacote', store: 'Assaí Atacadista', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', onSale: true, previousPrice: 34.90 },
  { id: 'p2', name: 'Café Torrado e Moído 500g', category: 'Despensa', price: 17.50, unit: 'un', store: 'Sonda', imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop', onSale: false },
  { id: 'p3', name: 'Leite Integral 1L', category: 'Laticínios', price: 4.19, unit: 'un', store: 'Andorinha', imageUrl: 'https://images.unsplash.com/photo-1563636619-e9107daaf43a?w=400&h=400&fit=crop', onSale: true, previousPrice: 4.99 },
  { id: 'p4', name: 'Azeite Extra Virgem 500ml', category: 'Despensa', price: 32.90, unit: 'un', store: 'Trimais', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop', onSale: false },
  { id: 'p5', name: 'Feijão Carioca Tipo 1 1kg', category: 'Despensa', price: 6.85, unit: 'kg', store: 'Bergamini', imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc3c41?w=400&h=400&fit=crop', onSale: true, previousPrice: 8.20 },
  { id: 'p6', name: 'Detergente Líquido 500ml', category: 'Limpeza', price: 2.15, unit: 'un', store: 'Extra', imageUrl: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?w=400&h=400&fit=crop', onSale: false },
  { id: 'p7', name: 'Papel Higiênico 12 Rolos', category: 'Limpeza', price: 14.90, unit: 'pacote', store: 'Carrefour', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop', onSale: true, previousPrice: 19.90 },
  { id: 'p8', name: 'Iogurte Natural 170g', category: 'Laticínios', price: 2.89, unit: 'un', store: 'Pão de Açúcar', imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop', onSale: false },
];

export const CATEGORIES = ['Tudo', 'Hortifruti', 'Laticínios', 'Carnes', 'Despensa', 'Limpeza', 'Bebidas', 'Padaria'];
