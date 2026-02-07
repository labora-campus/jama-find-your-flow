import { Link, useLocation } from 'react-router-dom';
import { Search, MessageCircle, QrCode, User, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Coffee className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-gradient">Jama</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/buscar"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/buscar') ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Buscar
            </Link>
            <Link
              to="/chat"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/chat') ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Chat IA
            </Link>
            <Link
              to="/mi-qr"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/mi-qr') ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Mi QR
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/auth">Iniciar sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/auth">Registrarse</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export const MobileNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Coffee, label: 'Inicio' },
    { path: '/buscar', icon: Search, label: 'Buscar' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/mi-qr', icon: QrCode, label: 'QR' },
    { path: '/auth', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-colors",
              isActive(path)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
