'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PortalExperience() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate portal particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Portal particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Portal center effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-96 h-96">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
          
          {/* Middle ring */}
          <div className="absolute inset-8 border-4 border-purple-400 rounded-full animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
          
          {/* Inner portal */}
          <div className="absolute inset-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full backdrop-blur-sm animate-portal-pulse"></div>
          
          {/* Center glow */}
          <div className="absolute inset-24 bg-blue-400 rounded-full opacity-50 animate-portal-glow"></div>
        </div>
      </div>

      {/* Portal text */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
          PORTAL OPENED
        </h2>
        <p className="text-2xl text-gray-300 animate-pulse mb-2">
          The Gateway to Bridgeworld Awaits
        </p>
        <p className="text-lg text-purple-300 animate-pulse">
          ⏰ Time Shift Activated - MAGIC Flows Through Sacred Coordinates
        </p>
      </div>

      {/* Pair image overlay when portal is active */}
      <div className="absolute bottom-10 right-10 w-48 h-48 opacity-80 animate-bounce">
        <Image
          src="/Pair.png"
          alt="Pair"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
