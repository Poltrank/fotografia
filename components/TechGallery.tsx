import React from 'react';
import { GALLERY_IMAGES } from '../constants';

export const TechGallery: React.FC = () => {
  // Duplicar as imagens para garantir o loop infinito sem "buracos"
  const row1Images = [...GALLERY_IMAGES, ...GALLERY_IMAGES];
  const row2Images = [...GALLERY_IMAGES.reverse(), ...GALLERY_IMAGES.reverse()]; // Inverter para variedade

  return (
    <div className="w-full bg-black py-12 overflow-hidden flex flex-col gap-8 min-h-[80vh] justify-center relative">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black z-0"></div>
      
      <div className="relative z-10 text-center mb-8">
        <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tighter mb-2">GALERIA</h2>
        <p className="text-red-500 text-sm uppercase tracking-[0.3em]">Tecnologia & Arte</p>
      </div>

      {/* Linha 1 - Movendo para a Esquerda */}
      <div className="relative w-full group">
        <div className="flex gap-4 w-[200%] animate-scroll-left hover:[animation-play-state:paused]">
          {row1Images.map((src, index) => (
            <div 
              key={`row1-${index}`} 
              className="relative w-[300px] h-[200px] md:w-[400px] md:h-[280px] flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-red-600 transition-colors duration-300 grayscale hover:grayscale-0"
            >
              <img 
                src={src} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Linha 2 - Movendo para a Direita */}
      <div className="relative w-full group">
        <div className="flex gap-4 w-[200%] animate-scroll-right hover:[animation-play-state:paused] -ml-[100%]">
          {row2Images.map((src, index) => (
            <div 
              key={`row2-${index}`} 
              className="relative w-[300px] h-[200px] md:w-[400px] md:h-[280px] flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent hover:border-red-600 transition-colors duration-300 grayscale hover:grayscale-0"
            >
              <img 
                src={src} 
                alt={`Gallery ${index}`} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8 relative z-10">
        <p className="text-gray-500 text-xs">Arraste ou passe o mouse para pausar</p>
      </div>
    </div>
  );
};