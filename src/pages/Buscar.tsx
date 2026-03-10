import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CafeCard } from '@/components/cafeteria/CafeCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X, Wifi, Volume2, Zap, DollarSign } from 'lucide-react';
import { cafeterias, barrios } from '@/data/cafeterias';
import { cn } from '@/lib/utils';

type NoiseFilter = 'quiet' | 'moderate' | 'lively' | null;
type WifiFilter = 'basic' | 'fast' | 'ultra' | null;
type PriceFilter = '$' | '$$' | '$$$' | null;

const Buscar = () => {
  const [barrio, setBarrio] = useState<string | null>(null);
  const [noiseLevel, setNoiseLevel] = useState<NoiseFilter>(null);
  const [wifiSpeed, setWifiSpeed] = useState<WifiFilter>(null);
  const [hasOutlets, setHasOutlets] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<PriceFilter>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredCafes = useMemo(() => {
    return cafeterias.filter((cafe) => {
      if (barrio && cafe.barrio !== barrio) return false;
      if (noiseLevel && cafe.noiseLevel !== noiseLevel) return false;
      if (priceRange && cafe.priceRange !== priceRange) return false;
      if (hasOutlets && !cafe.hasOutlets) return false;
      if (wifiSpeed) {
        if (wifiSpeed === 'basic' && cafe.wifiSpeed >= 10) return false;
        if (wifiSpeed === 'fast' && (cafe.wifiSpeed < 10 || cafe.wifiSpeed > 50)) return false;
        if (wifiSpeed === 'ultra' && cafe.wifiSpeed <= 50) return false;
      }
      return true;
    });
  }, [barrio, noiseLevel, wifiSpeed, hasOutlets, priceRange]);

  const clearFilters = () => {
    setBarrio(null);
    setNoiseLevel(null);
    setWifiSpeed(null);
    setHasOutlets(false);
    setPriceRange(null);
  };

  const hasActiveFilters = barrio || noiseLevel || wifiSpeed || hasOutlets || priceRange;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Barrio */}
      <div>
        <label className="text-sm font-medium mb-2 block">Barrio</label>
        <Select value={barrio || 'all'} onValueChange={(v) => setBarrio(v === 'all' ? null : v)}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los barrios" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los barrios</SelectItem>
            {barrios.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Noise Level */}
      <div>
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          Nivel de ruido
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'quiet' as const, label: 'Silencioso' },
            { value: 'moderate' as const, label: 'Moderado' },
            { value: 'lively' as const, label: 'Animado' },
          ].map((option) => (
            <Badge
              key={option.value}
              variant={noiseLevel === option.value ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer transition-all hover:scale-105',
                noiseLevel === option.value && 'bg-primary'
              )}
              onClick={() => setNoiseLevel(noiseLevel === option.value ? null : option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* WiFi Speed */}
      <div>
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <Wifi className="h-4 w-4 text-muted-foreground" />
          Velocidad de WiFi
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'basic' as const, label: '<10 Mbps' },
            { value: 'fast' as const, label: '10-50 Mbps' },
            { value: 'ultra' as const, label: '>50 Mbps' },
          ].map((option) => (
            <Badge
              key={option.value}
              variant={wifiSpeed === option.value ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer transition-all hover:scale-105',
                wifiSpeed === option.value && 'bg-primary'
              )}
              onClick={() => setWifiSpeed(wifiSpeed === option.value ? null : option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium mb-3 block flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          Rango de precios
        </label>
        <div className="flex flex-wrap gap-2">
          {(['$', '$$', '$$$'] as const).map((option) => (
            <Badge
              key={option}
              variant={priceRange === option ? 'default' : 'outline'}
              className={cn(
                'cursor-pointer transition-all hover:scale-105',
                priceRange === option && 'bg-primary'
              )}
              onClick={() => setPriceRange(priceRange === option ? null : option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>

      {/* Outlets */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium flex items-center gap-2">
          <Zap className="h-4 w-4 text-muted-foreground" />
          Con enchufes
        </label>
        <Switch checked={hasOutlets} onCheckedChange={setHasOutlets} />
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Explorar cafeterías</h1>
            <p className="text-sm text-muted-foreground">
              {filteredCafes.length} lugares encontrados
            </p>
          </div>

          {/* Mobile filter button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <span className="ml-2 w-5 h-5 rounded-full bg-primary text-xs flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 p-5 rounded-xl bg-card border border-border">
              <h2 className="font-semibold mb-4">Filtros</h2>
              <FilterContent />
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            {filteredCafes.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCafes.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No encontramos cafeterías con esos filtros</p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Buscar;
