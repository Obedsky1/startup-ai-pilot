
import React, { useState, useEffect } from 'react';
import { AlignJustify, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
          <a href="#" className="text-2xl font-bold text-gradient">
            StartupAI
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm text-foreground/80 hover:text-foreground transition">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-foreground/80 hover:text-foreground transition">
            How It Works
          </a>
          <a href="#testimonials" className="text-sm text-foreground/80 hover:text-foreground transition">
            Testimonials
          </a>
          <a href="#pricing" className="text-sm text-foreground/80 hover:text-foreground transition">
            Pricing
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="font-medium">
            Log in
          </Button>
          <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
            Sign up
          </Button>
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
          <a href="#" className="text-2xl font-bold text-gradient">
            StartupAI
          </a>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
          <a 
            href="#features" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#testimonials" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </a>
          <a 
            href="#pricing" 
            className="text-lg font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </a>
          <div className="flex flex-col space-y-4 pt-8">
            <Button variant="outline" className="w-full font-medium">
              Log in
            </Button>
            <Button className="w-full bg-neon-purple hover:bg-neon-purple/90 text-white font-medium">
              Sign up
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
