
import React, { useState, useEffect } from 'react';
import { AlignJustify, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300 py-4 px-6 lg:px-16',
        isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-sm text-foreground/80 hover:text-foreground transition">
            Features
          </Link>
          <Link to="/how-it-works" className="text-sm text-foreground/80 hover:text-foreground transition">
            How It Works
          </Link>
          <Link to="/testimonials" className="text-sm text-foreground/80 hover:text-foreground transition">
            Testimonials
          </Link>
          <Link to="/pricing" className="text-sm text-foreground/80 hover:text-foreground transition">
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="font-medium">
            Log in
          </Button>
          <Link to="/get-started">
            <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
              Sign up
            </Button>
          </Link>
        </div>

        <button 
          className="flex md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <AlignJustify size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-lg z-50 transition-transform duration-300 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-6">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <Logo />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
          <Link 
            to="/features" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="/how-it-works" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            to="/testimonials" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link 
            to="/pricing" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </Link>
          <div className="flex flex-col space-y-4 pt-8">
            <Button variant="outline" className="w-full font-medium">
              Log in
            </Button>
            <Link to="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
                Sign up
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
