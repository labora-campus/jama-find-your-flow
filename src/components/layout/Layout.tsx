import { ReactNode } from 'react';
import { Navbar, MobileNav } from './Navbar';

interface LayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export const Layout = ({ children, hideNav = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {!hideNav && <Navbar />}
      <main className="pt-16 pb-20 md:pb-0">
        {children}
      </main>
      {!hideNav && <MobileNav />}
    </div>
  );
};
