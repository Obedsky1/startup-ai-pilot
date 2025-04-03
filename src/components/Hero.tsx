
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      containerRef.current.style.setProperty('--mouse-x', `${x}`);
      containerRef.current.style.setProperty('--mouse-y', `${y}`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen relative flex flex-col justify-center overflow-hidden bg-background bg-hero-pattern"
      style={{'--mouse-x': '0.5', '--mouse-y': '0.5'} as React.CSSProperties}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(139, 92, 246, 0.3), transparent 40%)',
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl animate-fade-in-up">
          <span className="text-gradient">Validate. Optimize. Scale.</span>
          <br />
          <span className="text-white">Your Startup, Backed by AI.</span>
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Get AI-driven insights, test your product, brainstorm business ideas, and build a solid startup foundation—all in one platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <Button className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium px-8 py-6 rounded-full animate-glow">
            Get Started for Free
          </Button>
          <Button variant="outline" className="gap-2 px-6 py-6 rounded-full">
            <PlayCircle size={18} />
            <span>See How It Works</span>
          </Button>
        </div>
        
        <div 
          className="mt-16 md:mt-24 relative w-full max-w-5xl mx-auto animate-fade-in-up"
          style={{animationDelay: '0.6s'}}
        >
          <div className="glass p-3 rounded-2xl shadow-xl animate-float">
            <div className="bg-[#121212] rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="AI Dashboard" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Glow effect under the dashboard */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-neon-purple/20 blur-2xl" />
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-[2px] h-8 bg-gradient-to-b from-transparent to-neon-purple/60" />
      </div>
    </section>
  );
};

export default Hero;
