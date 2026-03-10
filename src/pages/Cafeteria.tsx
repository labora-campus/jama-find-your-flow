import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCafeteriaBySlug } from '@/hooks/use-cafeterias';
import {
  Wifi, Volume2, VolumeX, Zap, MapPin, Clock, Star,
  ChevronLeft, ChevronRight, Percent, QrCode,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Cafeteria = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: cafe, isLoading } = useCafeteriaBySlug(id);
  const [currentImage, setCurrentImage] = useState(0);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </Layout>
    );
  }

  if (!cafe) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Cafetería no encontrada</h1>
          <Button asChild>
            <Link to="/buscar">Volver a buscar</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const NoiseIcon = cafe.noiseLevel === 'quiet' ? VolumeX : Volume2;
  const noiseLabels = { quiet: 'Silencioso', moderate: 'Moderado', lively: 'Animado' };
  const occupationLabels = ['Mañana', 'Mediodía', 'Tarde', 'Noche'];
  const occupationValues = [
    cafe.occupationByHour.morning,
    cafe.occupationByHour.noon,
    cafe.occupationByHour.afternoon,
    cafe.occupationByHour.evening,
  ];

  return (
    <Layout>
      {/* Image Carousel */}
      <div className="relative h-64 md:h-80 lg:h-96 bg-card">
        <img src={cafe.images[currentImage]} alt={cafe.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {cafe.images.length > 1 && (
          <>
            <button onClick={() => setCurrentImage((prev) => (prev === 0 ? cafe.images.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setCurrentImage((prev) => (prev === cafe.images.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {cafe.images.map((_, i) => (
            <button key={i} onClick={() => setCurrentImage(i)} className={cn('w-2 h-2 rounded-full transition-all', i === currentImage ? 'bg-primary w-4' : 'bg-foreground/50')} />
          ))}
        </div>
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        {cafe.discount && (
          <div className="absolute top-4 right-4">
            <Badge variant="discount" className="flex items-center gap-1 text-sm px-3 py-1">
              <Percent className="h-4 w-4" />
              {cafe.discount}% OFF
            </Badge>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-6 pb-32 md:pb-6">
        <div className="mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{cafe.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{cafe.address}, {cafe.barrio}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-status-warning text-status-warning" />
              <span className="font-semibold">{cafe.rating}</span>
              <span className="text-sm text-muted-foreground">({cafe.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <Card className="bg-card border-border"><CardContent className="p-4 text-center"><Wifi className="h-6 w-6 text-blue-400 mx-auto mb-2" /><p className="text-2xl font-bold">{cafe.wifiSpeed}</p><p className="text-xs text-muted-foreground">Mbps</p></CardContent></Card>
          <Card className="bg-card border-border"><CardContent className="p-4 text-center"><NoiseIcon className="h-6 w-6 text-primary mx-auto mb-2" /><p className="text-sm font-semibold">{noiseLabels[cafe.noiseLevel]}</p><p className="text-xs text-muted-foreground">Ruido</p></CardContent></Card>
          <Card className="bg-card border-border"><CardContent className="p-4 text-center"><Zap className="h-6 w-6 text-status-warning mx-auto mb-2" /><p className="text-sm font-semibold">{cafe.hasOutlets ? 'Disponibles' : 'No hay'}</p><p className="text-xs text-muted-foreground">Enchufes</p></CardContent></Card>
          <Card className="bg-card border-border"><CardContent className="p-4 text-center"><span className="text-2xl">{cafe.priceRange}</span><p className="text-xs text-muted-foreground mt-1">Precios</p></CardContent></Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Clock className="h-5 w-5 text-muted-foreground" />Horarios</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(cafe.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm"><span className="text-muted-foreground">{day}</span><span className="font-medium">{hours}</span></div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-lg">Menú destacado</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cafe.menu.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm"><span>{item.name}</span><span className="font-medium">${item.price.toLocaleString()}</span></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border mt-6">
          <CardHeader><CardTitle className="text-lg">Ocupación estimada</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-end justify-around h-32 gap-4">
              {occupationLabels.map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full max-w-12 relative">
                    <div className={cn('w-full rounded-t-lg transition-all', occupationValues[i] > 70 ? 'bg-destructive' : occupationValues[i] > 40 ? 'bg-status-warning' : 'bg-status-success')} style={{ height: `${occupationValues[i]}px` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {cafe.discount && (
          <Card className="bg-gradient-to-r from-primary/20 via-card to-card border-primary/30 mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2"><Percent className="h-5 w-5 text-primary" /><span className="font-bold text-lg">{cafe.discount}% de descuento</span></div>
                  <p className="text-sm text-muted-foreground">{cafe.discountDescription}</p>
                </div>
                <Button asChild><Link to={`/mi-qr?cafe=${cafe.id}`}><QrCode className="h-4 w-4 mr-2" />Generar QR</Link></Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-card border-border mt-6">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><MapPin className="h-5 w-5 text-muted-foreground" />Ubicación</CardTitle></CardHeader>
          <CardContent>
            <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground"><MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" /><p className="text-sm">{cafe.address}, {cafe.barrio}</p><p className="text-xs">Buenos Aires, Argentina</p></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border mt-6">
          <CardHeader><CardTitle className="text-lg">Reseñas de workers</CardTitle></CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground"><p className="text-sm">Próximamente...</p></div>
          </CardContent>
        </Card>
      </div>

      {cafe.discount && (
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent md:hidden">
          <Button variant="hero" size="lg" className="w-full" asChild>
            <Link to={`/mi-qr?cafe=${cafe.id}`}><QrCode className="h-5 w-5 mr-2" />Obtener {cafe.discount}% de descuento</Link>
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default Cafeteria;
