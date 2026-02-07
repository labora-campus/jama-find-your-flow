import { Link } from 'react-router-dom';
import { Wifi, Volume2, VolumeX, Zap, Star, Users, Percent } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Cafeteria } from '@/data/cafeterias';

interface CafeCardProps {
  cafe: Cafeteria;
  compact?: boolean;
}

const NoiseIcon = ({ level }: { level: 'quiet' | 'moderate' | 'lively' }) => {
  if (level === 'quiet') return <VolumeX className="h-3.5 w-3.5" />;
  return <Volume2 className="h-3.5 w-3.5" />;
};

const getNoiseLabel = (level: 'quiet' | 'moderate' | 'lively') => {
  const labels = { quiet: 'Silencioso', moderate: 'Moderado', lively: 'Animado' };
  return labels[level];
};

const getOccupancyColor = (occupancy: 'low' | 'medium' | 'high') => {
  const colors = {
    low: 'bg-status-success',
    medium: 'bg-status-warning',
    high: 'bg-status-error',
  };
  return colors[occupancy];
};

const getOccupancyLabel = (occupancy: 'low' | 'medium' | 'high') => {
  const labels = { low: 'Baja ocupación', medium: 'Ocupación media', high: 'Alta ocupación' };
  return labels[occupancy];
};

export const CafeCard = ({ cafe, compact = false }: CafeCardProps) => {
  return (
    <Link to={`/cafeteria/${cafe.id}`}>
      <Card className="overflow-hidden card-hover bg-card border-border group">
        <div className="relative">
          <img
            src={cafe.images[0]}
            alt={cafe.name}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {cafe.discount && (
            <div className="absolute top-3 right-3">
              <Badge variant="discount" className="flex items-center gap-1">
                <Percent className="h-3 w-3" />
                {cafe.discount}% OFF
              </Badge>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm", getOccupancyColor(cafe.occupancy))}>
              <Users className="h-3 w-3" />
              {getOccupancyLabel(cafe.occupancy)}
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {cafe.name}
              </h3>
              <p className="text-sm text-muted-foreground">{cafe.barrio}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-status-warning text-status-warning" />
              <span className="font-medium">{cafe.rating}</span>
              <span className="text-muted-foreground">({cafe.reviewCount})</span>
            </div>
          </div>

          {!compact && (
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="wifi" className="flex items-center gap-1">
                <Wifi className="h-3 w-3" />
                {cafe.wifiSpeed} Mbps
              </Badge>
              <Badge
                variant={cafe.noiseLevel === 'quiet' ? 'quiet' : cafe.noiseLevel === 'moderate' ? 'moderate' : 'lively'}
                className="flex items-center gap-1"
              >
                <NoiseIcon level={cafe.noiseLevel} />
                {getNoiseLabel(cafe.noiseLevel)}
              </Badge>
              {cafe.hasOutlets && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Enchufes
                </Badge>
              )}
              <Badge variant="outline">{cafe.priceRange}</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
