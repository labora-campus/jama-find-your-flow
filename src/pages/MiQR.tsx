import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getCafeteriaById } from '@/data/cafeterias';
import { QrCode, Clock, CheckCircle, RefreshCw, Coffee, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

const MiQR = () => {
  const [searchParams] = useSearchParams();
  const cafeId = searchParams.get('cafe');
  const cafe = cafeId ? getCafeteriaById(cafeId) : null;
  
  const [hasQR, setHasQR] = useState(!!cafe);
  const [qrCode, setQrCode] = useState(cafe ? `JAMA-${Math.random().toString(36).substring(2, 8).toUpperCase()}` : '');
  const [expiresIn, setExpiresIn] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    if (!hasQR) return;
    
    const timer = setInterval(() => {
      setExpiresIn((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [hasQR]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const generateNewQR = () => {
    setQrCode(`JAMA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    setExpiresIn(24 * 60 * 60);
    setHasQR(true);
  };

  // No QR state
  if (!hasQR) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <QrCode className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Aún no tenés un QR activo</h1>
            <p className="text-muted-foreground mb-8">
              Explorá cafeterías y generá tu código para obtener descuentos exclusivos
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link to="/buscar">
                  <Coffee className="h-4 w-4 mr-2" />
                  Explorar cafeterías
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/chat">
                  Buscar con IA
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link to={cafe ? `/cafeteria/${cafe.id}` : '/buscar'}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Link>
          </Button>

          <div className="text-center mb-8">
            {cafe && (
              <>
                <h1 className="text-xl font-bold mb-1">{cafe.name}</h1>
                <p className="text-muted-foreground text-sm">{cafe.barrio}</p>
              </>
            )}
          </div>

          {/* QR Card */}
          <Card className="bg-card border-border overflow-hidden">
            <div className="bg-gradient-to-br from-primary/20 via-card to-card p-6">
              {cafe?.discount && (
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-primary">{cafe.discount}%</span>
                  <span className="text-lg font-medium ml-1">de descuento</span>
                </div>
              )}

              {/* QR Code placeholder */}
              <div className="bg-foreground rounded-xl p-4 mx-auto w-fit">
                <div className="w-48 h-48 bg-background rounded-lg flex items-center justify-center relative">
                  {/* Simulated QR pattern */}
                  <div className="absolute inset-4 grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'}`}
                      />
                    ))}
                  </div>
                  {/* Center logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                      <Coffee className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              {/* Code */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Código</p>
                <p className="text-xl font-mono font-bold tracking-wider">{qrCode}</p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-center gap-2">
                <Badge variant="quiet" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Activo
                </Badge>
              </div>

              {/* Expiration */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Válido por {formatTime(expiresIn)}</span>
              </div>

              {/* Instructions */}
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Mostrá este código al mozo o cajero para obtener tu descuento
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={generateNewQR}
              disabled={hasQR && expiresIn > 0}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Generar nuevo QR
            </Button>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/buscar">
                Ver otras cafeterías
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MiQR;
