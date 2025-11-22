import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl mx-auto text-left md:pl-12">
        <h1 className="text-2xl md:text-3xl font-medium text-[#CC0000] mb-8">
          Jun Matsuoka & Co.
        </h1>
        
        <div className="space-y-6 text-gray-600 font-light text-base md:text-lg leading-relaxed">
          <p>
            Liderada por Jun e Paloma, nossa equipe é formada por especialistas multidisciplinares, combinando talento, técnica e visão artística.
          </p>
          
          <p>
            Cada membro está comprometido em capturar momentos únicos com precisão e sensibilidade, garantindo o melhor registro fotográfico.
          </p>
          
          <p>
            Mais do que uma equipe, somos parceiros dedicados a transformar cada evento em uma experiência visual inesquecível para você e seus convidados.
          </p>
        </div>
      </div>
    </section>
  );
};