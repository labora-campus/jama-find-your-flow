export interface MenuItem {
  name: string;
  price: number;
}

export interface Cafeteria {
  id: string;
  name: string;
  barrio: string;
  address: string;
  wifiSpeed: number;
  noiseLevel: 'quiet' | 'moderate' | 'lively';
  priceRange: '$' | '$$' | '$$$';
  hasOutlets: boolean;
  rating: number;
  reviewCount: number;
  occupancy: 'low' | 'medium' | 'high';
  discount?: number;
  discountDescription?: string;
  images: string[];
  hours: {
    [key: string]: string;
  };
  menu: MenuItem[];
  occupationByHour: {
    morning: number;
    noon: number;
    afternoon: number;
    evening: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const cafeterias: Cafeteria[] = [
  {
    id: 'cafe-palermo',
    name: 'Café Palermo',
    barrio: 'Palermo',
    address: 'Honduras 4805',
    wifiSpeed: 45,
    noiseLevel: 'quiet',
    priceRange: '$$',
    hasOutlets: true,
    rating: 4.7,
    reviewCount: 234,
    occupancy: 'medium',
    discount: 10,
    discountDescription: '10% en consumiciones mayores a $3000',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800',
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800',
    ],
    hours: {
      'Lunes a Viernes': '08:00 - 20:00',
      'Sábados': '09:00 - 18:00',
      'Domingos': 'Cerrado',
    },
    menu: [
      { name: 'Café con leche', price: 2500 },
      { name: 'Espresso doble', price: 2000 },
      { name: 'Medialunas (x3)', price: 2200 },
      { name: 'Tostado J&Q', price: 4500 },
      { name: 'Licuado de frutas', price: 3500 },
    ],
    occupationByHour: {
      morning: 40,
      noon: 80,
      afternoon: 60,
      evening: 30,
    },
    coordinates: { lat: -34.5875, lng: -58.4286 },
  },
  {
    id: 'coffee-store-recoleta',
    name: 'The Coffee Store Recoleta',
    barrio: 'Recoleta',
    address: 'Av. Callao 1595',
    wifiSpeed: 30,
    noiseLevel: 'moderate',
    priceRange: '$$$',
    hasOutlets: true,
    rating: 4.5,
    reviewCount: 189,
    occupancy: 'high',
    images: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800',
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800',
    ],
    hours: {
      'Lunes a Viernes': '07:30 - 21:00',
      'Sábados y Domingos': '09:00 - 20:00',
    },
    menu: [
      { name: 'Café con leche', price: 3200 },
      { name: 'Latte Art', price: 3800 },
      { name: 'Croissant relleno', price: 3500 },
      { name: 'Brunch completo', price: 8500 },
      { name: 'Cheesecake', price: 4200 },
    ],
    occupationByHour: {
      morning: 70,
      noon: 90,
      afternoon: 85,
      evening: 50,
    },
    coordinates: { lat: -34.5947, lng: -58.3938 },
  },
  {
    id: 'lattente',
    name: 'Lattente',
    barrio: 'Villa Crespo',
    address: 'Thames 1891',
    wifiSpeed: 60,
    noiseLevel: 'quiet',
    priceRange: '$$',
    hasOutlets: true,
    rating: 4.9,
    reviewCount: 312,
    occupancy: 'low',
    discount: 15,
    discountDescription: '15% en tu primera visita',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    ],
    hours: {
      'Lunes a Viernes': '08:00 - 19:00',
      'Sábados': '09:00 - 17:00',
      'Domingos': 'Cerrado',
    },
    menu: [
      { name: 'Flat White', price: 2800 },
      { name: 'Cold Brew', price: 3200 },
      { name: 'Avocado Toast', price: 5500 },
      { name: 'Brownie casero', price: 2500 },
      { name: 'Granola bowl', price: 4800 },
    ],
    occupationByHour: {
      morning: 30,
      noon: 50,
      afternoon: 40,
      evening: 20,
    },
    coordinates: { lat: -34.5983, lng: -58.4372 },
  },
  {
    id: 'birkin-coffee',
    name: 'Birkin Coffee',
    barrio: 'Belgrano',
    address: 'Av. Cabildo 2040',
    wifiSpeed: 25,
    noiseLevel: 'lively',
    priceRange: '$',
    hasOutlets: false,
    rating: 4.2,
    reviewCount: 156,
    occupancy: 'high',
    images: [
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
    ],
    hours: {
      'Todos los días': '07:00 - 22:00',
    },
    menu: [
      { name: 'Café cortado', price: 1800 },
      { name: 'Submarino', price: 2200 },
      { name: 'Medialunas (x6)', price: 3500 },
      { name: 'Sandwich de miga', price: 2800 },
      { name: 'Jugo exprimido', price: 2500 },
    ],
    occupationByHour: {
      morning: 80,
      noon: 95,
      afternoon: 70,
      evening: 60,
    },
    coordinates: { lat: -34.5614, lng: -58.4533 },
  },
  {
    id: 'cuervo-cafe',
    name: 'Cuervo Café',
    barrio: 'Colegiales',
    address: 'Federico Lacroze 3201',
    wifiSpeed: 50,
    noiseLevel: 'quiet',
    priceRange: '$$',
    hasOutlets: true,
    rating: 4.8,
    reviewCount: 267,
    occupancy: 'low',
    discount: 10,
    discountDescription: '10% todos los martes',
    images: [
      'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800',
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800',
    ],
    hours: {
      'Lunes a Viernes': '08:30 - 19:30',
      'Sábados': '10:00 - 18:00',
      'Domingos': 'Cerrado',
    },
    menu: [
      { name: 'Americano', price: 2200 },
      { name: 'Cappuccino', price: 2800 },
      { name: 'Tarta del día', price: 3800 },
      { name: 'Sandwich veggie', price: 4200 },
      { name: 'Muffin', price: 2000 },
    ],
    occupationByHour: {
      morning: 35,
      noon: 55,
      afternoon: 45,
      evening: 25,
    },
    coordinates: { lat: -34.5739, lng: -58.4481 },
  },
  {
    id: 'origenes',
    name: 'Orígenes',
    barrio: 'San Telmo',
    address: 'Defensa 1080',
    wifiSpeed: 35,
    noiseLevel: 'moderate',
    priceRange: '$',
    hasOutlets: true,
    rating: 4.4,
    reviewCount: 198,
    occupancy: 'medium',
    images: [
      'https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      'https://images.unsplash.com/photo-1511081692775-05d0f180a065?w=800',
    ],
    hours: {
      'Martes a Domingo': '10:00 - 20:00',
      'Lunes': 'Cerrado',
    },
    menu: [
      { name: 'Café de especialidad', price: 2400 },
      { name: 'Té en hebras', price: 2000 },
      { name: 'Budín casero', price: 2200 },
      { name: 'Empanadas (x3)', price: 3600 },
      { name: 'Limonada', price: 2500 },
    ],
    occupationByHour: {
      morning: 25,
      noon: 65,
      afternoon: 80,
      evening: 40,
    },
    coordinates: { lat: -34.6193, lng: -58.3718 },
  },
  {
    id: 'lab-coffee',
    name: 'LAB Coffee',
    barrio: 'Palermo',
    address: 'Humboldt 1542',
    wifiSpeed: 80,
    noiseLevel: 'quiet',
    priceRange: '$$$',
    hasOutlets: true,
    rating: 4.9,
    reviewCount: 421,
    occupancy: 'low',
    discount: 20,
    discountDescription: '20% en café de especialidad',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800',
    ],
    hours: {
      'Lunes a Viernes': '07:00 - 20:00',
      'Sábados': '08:00 - 19:00',
      'Domingos': '09:00 - 17:00',
    },
    menu: [
      { name: 'V60 Filter', price: 3500 },
      { name: 'Aeropress', price: 3200 },
      { name: 'Breakfast bowl', price: 6500 },
      { name: 'Sourdough toast', price: 4800 },
      { name: 'Matcha Latte', price: 4000 },
    ],
    occupationByHour: {
      morning: 40,
      noon: 60,
      afternoon: 50,
      evening: 30,
    },
    coordinates: { lat: -34.5872, lng: -58.4337 },
  },
  {
    id: 'full-city-coffee',
    name: 'Full City Coffee',
    barrio: 'Núñez',
    address: 'Av. Crisólogo Larralde 2901',
    wifiSpeed: 40,
    noiseLevel: 'moderate',
    priceRange: '$$',
    hasOutlets: true,
    rating: 4.6,
    reviewCount: 145,
    occupancy: 'medium',
    images: [
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    ],
    hours: {
      'Lunes a Viernes': '08:00 - 19:00',
      'Sábados': '09:00 - 16:00',
      'Domingos': 'Cerrado',
    },
    menu: [
      { name: 'Café con leche', price: 2600 },
      { name: 'Espresso', price: 1900 },
      { name: 'Croissant', price: 2400 },
      { name: 'Club sandwich', price: 5200 },
      { name: 'Smoothie', price: 3800 },
    ],
    occupationByHour: {
      morning: 50,
      noon: 75,
      afternoon: 55,
      evening: 35,
    },
    coordinates: { lat: -34.5452, lng: -58.4612 },
  },
];

export const barrios = [
  'Palermo',
  'Recoleta',
  'Belgrano',
  'San Telmo',
  'Colegiales',
  'Núñez',
  'Villa Crespo',
  'Caballito',
];

export const getCafeteriaById = (id: string): Cafeteria | undefined => {
  return cafeterias.find((c) => c.id === id);
};

export const filterCafeterias = (filters: {
  barrio?: string;
  noiseLevel?: string;
  wifiSpeed?: string;
  hasOutlets?: boolean;
  priceRange?: string;
}): Cafeteria[] => {
  return cafeterias.filter((cafe) => {
    if (filters.barrio && cafe.barrio !== filters.barrio) return false;
    if (filters.noiseLevel && cafe.noiseLevel !== filters.noiseLevel) return false;
    if (filters.priceRange && cafe.priceRange !== filters.priceRange) return false;
    if (filters.hasOutlets !== undefined && cafe.hasOutlets !== filters.hasOutlets) return false;
    if (filters.wifiSpeed) {
      if (filters.wifiSpeed === 'basic' && cafe.wifiSpeed >= 10) return false;
      if (filters.wifiSpeed === 'fast' && (cafe.wifiSpeed < 10 || cafe.wifiSpeed > 50)) return false;
      if (filters.wifiSpeed === 'ultra' && cafe.wifiSpeed <= 50) return false;
    }
    return true;
  });
};
