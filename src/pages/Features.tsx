
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturesComponent from '@/components/Features';

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
          <h1 className="text-4xl font-bold mb-8 text-center">
            Our <span className="text-gradient">Features</span>
          </h1>
          <FeaturesComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
