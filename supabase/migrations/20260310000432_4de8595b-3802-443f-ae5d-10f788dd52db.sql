
-- Create enum types
CREATE TYPE public.noise_level AS ENUM ('quiet', 'moderate', 'lively');
CREATE TYPE public.price_range AS ENUM ('$', '$$', '$$$');
CREATE TYPE public.occupancy_level AS ENUM ('low', 'medium', 'high');

-- Create cafeterias table
CREATE TABLE public.cafeterias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  barrio TEXT NOT NULL,
  address TEXT NOT NULL,
  wifi_speed INTEGER NOT NULL DEFAULT 0,
  noise_level public.noise_level NOT NULL DEFAULT 'moderate',
  price_range public.price_range NOT NULL DEFAULT '$$',
  has_outlets BOOLEAN NOT NULL DEFAULT false,
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  occupancy public.occupancy_level NOT NULL DEFAULT 'medium',
  discount INTEGER,
  discount_description TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  hours JSONB NOT NULL DEFAULT '{}',
  occupation_by_hour JSONB NOT NULL DEFAULT '{"morning":50,"noon":50,"afternoon":50,"evening":50}',
  lat NUMERIC(10,6) NOT NULL DEFAULT 0,
  lng NUMERIC(10,6) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create menu_items table
CREATE TABLE public.menu_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cafeteria_id UUID NOT NULL REFERENCES public.cafeterias(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cafeterias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Cafeterias are publicly readable" ON public.cafeterias FOR SELECT USING (true);
CREATE POLICY "Menu items are publicly readable" ON public.menu_items FOR SELECT USING (true);

-- Create indexes
CREATE INDEX idx_cafeterias_barrio ON public.cafeterias(barrio);
CREATE INDEX idx_cafeterias_slug ON public.cafeterias(slug);
CREATE INDEX idx_menu_items_cafeteria ON public.menu_items(cafeteria_id);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_cafeterias_updated_at
  BEFORE UPDATE ON public.cafeterias
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
