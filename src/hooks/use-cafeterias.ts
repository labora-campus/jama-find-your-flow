import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Cafeteria, MenuItem } from '@/data/cafeterias';

interface DbCafeteria {
  id: string;
  slug: string;
  name: string;
  barrio: string;
  address: string;
  wifi_speed: number;
  noise_level: 'quiet' | 'moderate' | 'lively';
  price_range: '$' | '$$' | '$$$';
  has_outlets: boolean;
  rating: number;
  review_count: number;
  occupancy: 'low' | 'medium' | 'high';
  discount: number | null;
  discount_description: string | null;
  images: string[];
  hours: Record<string, string>;
  occupation_by_hour: { morning: number; noon: number; afternoon: number; evening: number };
  lat: number;
  lng: number;
  menu_items: { name: string; price: number }[];
}

function mapDbToCafeteria(db: DbCafeteria): Cafeteria {
  return {
    id: db.slug,
    name: db.name,
    barrio: db.barrio,
    address: db.address,
    wifiSpeed: db.wifi_speed,
    noiseLevel: db.noise_level,
    priceRange: db.price_range,
    hasOutlets: db.has_outlets,
    rating: db.rating,
    reviewCount: db.review_count,
    occupancy: db.occupancy,
    discount: db.discount ?? undefined,
    discountDescription: db.discount_description ?? undefined,
    images: db.images,
    hours: db.hours as Record<string, string>,
    menu: db.menu_items.map((m) => ({ name: m.name, price: m.price })),
    occupationByHour: db.occupation_by_hour as Cafeteria['occupationByHour'],
    coordinates: { lat: db.lat, lng: db.lng },
  };
}

export function useCafeterias() {
  return useQuery({
    queryKey: ['cafeterias'],
    queryFn: async (): Promise<Cafeteria[]> => {
      const { data, error } = await supabase
        .from('cafeterias')
        .select('*, menu_items(name, price)');
      if (error) throw error;
      return (data as unknown as DbCafeteria[]).map(mapDbToCafeteria);
    },
  });
}

export function useCafeteriaBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['cafeteria', slug],
    queryFn: async (): Promise<Cafeteria | null> => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('cafeterias')
        .select('*, menu_items(name, price)')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapDbToCafeteria(data as unknown as DbCafeteria);
    },
    enabled: !!slug,
  });
}
