
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-bold flex items-center ${className}`}>
      <div className="relative">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink opacity-75 blur"></div>
        <div className="relative bg-background px-2 py-1 rounded-md">
          <span className="text-gradient">OBED</span>
          <span className="text-white">AI</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
