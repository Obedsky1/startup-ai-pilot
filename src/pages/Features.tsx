
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturesComponent from '@/components/Features';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

const Features = () => {
  // Set darker background for the entire app
  useEffect(() => {
    document.body.classList.add('bg-[#0a0a14]');

    return () => {
      document.body.classList.remove('bg-[#0a0a14]');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              Our <span className="text-gradient">Features</span>
            </h1>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <HomeIcon size={18} />
                Home
              </Button>
            </Link>
          </div>
          <FeaturesComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
