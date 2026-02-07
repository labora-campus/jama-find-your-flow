import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { MessageCircle, Search, QrCode, Wifi, Users, CheckCircle, Coffee, MapPin, Zap } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{ background: 'var(--gradient-hero)' }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <Coffee className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Encontrá tu espacio ideal</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Tu espacio de trabajo ideal,{' '}
              <span className="text-gradient">siempre cerca</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Encontrá cafeterías con buen WiFi, enchufes y ambiente tranquilo para trabajar. 
              Recomendaciones personalizadas con IA.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/chat">
                  <MessageCircle className="h-5 w-5" />
                  Buscar con IA
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/buscar">
                  <Search className="h-5 w-5" />
                  Explorar cafeterías
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo funciona?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              En solo 3 pasos, encontrá el lugar perfecto para trabajar
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: MessageCircle,
                step: '1',
                title: 'Contale a Jama qué necesitás',
                description: 'Escribí tus preferencias: zona, WiFi rápido, lugar tranquilo, o lo que busques.',
              },
              {
                icon: Search,
                step: '2',
                title: 'Elegí tu cafetería ideal',
                description: 'Recibí recomendaciones personalizadas con info verificada de cada lugar.',
              },
              {
                icon: QrCode,
                step: '3',
                title: 'Mostrá tu QR y disfrutá',
                description: 'Obtené descuentos exclusivos para usuarios de Jama en las cafeterías.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-card border border-border text-center group hover:border-primary/50 transition-colors"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { value: '+50', label: 'Cafeterías', icon: MapPin },
              { value: '+1000', label: 'Workers', icon: Users },
              { value: '100%', label: 'WiFi verificado', icon: Wifi },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitás saber</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Información verificada para que trabajes cómodo
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Wifi, title: 'WiFi testeado', description: 'Velocidad real medida en cada café' },
              { icon: Zap, title: 'Enchufes', description: 'Sabé si hay donde cargar tu laptop' },
              { icon: Users, title: 'Ocupación', description: 'Estimación en tiempo real' },
              { icon: CheckCircle, title: 'Descuentos', description: 'Beneficios exclusivos Jama' },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-card to-card border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para encontrar tu lugar?
            </h2>
            <p className="text-muted-foreground mb-6">
              Unite a la comunidad de workers que trabajan mejor con Jama
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/chat">
                Empezar ahora
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-primary" />
              <span className="font-bold text-gradient">Jama</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Jama. Tu espacio de trabajo ideal en Buenos Aires.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
