import React from 'react';
import { Edit2 } from 'lucide-react';

interface LogoProps {
  customImageUrl?: string | null;
  isAdmin?: boolean;
  onEditClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ customImageUrl, isAdmin, onEditClick }) => {
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne a navegação
    e.stopPropagation(); // Garante que o clique fique apenas no botão editar
    if (isAdmin && onEditClick) {
      onEditClick();
    }
  };

  return (
    <div className="flex items-center select-none relative group/logo">
      {/* Link para a Home */}
      <a 
        href="/" 
        className="block relative w-[180px] h-[90px] md:w-[320px] md:h-[160px] flex-shrink-0 transition-opacity hover:opacity-95"
        title="Voltar para o início"
      >
        {customImageUrl ? (
          <img 
            src={customImageUrl} 
            alt="Logo" 
            className="w-full h-full object-cover rounded-sm shadow-sm" 
          />
        ) : (
          <div className="w-full h-full bg-[#CC0000] flex items-end justify-center overflow-hidden shadow-sm relative rounded-sm">
             {/* Stylized Bonsai Silhouette */}
             <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] text-black fill-current absolute -bottom-2 -left-2 opacity-90">
               <path d="M20,100 L25,80 C25,80 10,75 10,60 C10,45 25,40 30,45 C30,35 45,30 50,35 C50,25 65,20 75,30 C85,25 95,35 90,50 C95,55 90,70 80,70 C80,80 60,80 55,85 L60,100 Z" />
             </svg>
          </div>
        )}
      </a>
      
      {/* Admin Edit Icon Overlay - Botão independente */}
      {isAdmin && (
        <div 
          onClick={handleEditClick}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md transform scale-100 transition-transform duration-200 z-50 cursor-pointer hover:bg-red-700 hover:scale-110"
          title="Editar Logotipo"
        >
          <Edit2 className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};