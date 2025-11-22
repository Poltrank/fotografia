import React, { useState } from 'react';
import { Logo } from './Logo';
import { EditModal } from './EditModal';

interface HeaderProps {
  logoUrl: string | null;
  isAdmin: boolean;
  onUpdateLogo: (url: string) => void;
  currentView: 'home' | 'gallery' | 'quote';
  onNavigate: (view: 'home' | 'gallery' | 'quote') => void;
}

export const Header: React.FC<HeaderProps> = ({ logoUrl, isAdmin, onUpdateLogo, currentView, onNavigate }) => {
  const [isEditingLogo, setIsEditingLogo] = useState(false);

  const handleSaveLogo = (_: string, url: string) => {
    onUpdateLogo(url);
    setIsEditingLogo(false);
  };

  const navLinkClass = (view: 'home' | 'gallery' | 'quote') => `
    text-sm md:text-base font-medium transition-colors duration-300 cursor-pointer
    ${currentView === view 
      ? 'text-[#CC0000] border-b-2 border-[#CC0000]' 
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-2 py-1 rounded'
    }
  `;

  return (
    <header className="w-full bg-white py-4 px-6 md:px-12 sticky top-0 z-50 shadow-sm">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        {/* Lado Esquerdo: Logo */}
        <div className="flex-shrink-0 self-start md:self-center">
          <Logo 
            customImageUrl={logoUrl}
            isAdmin={isAdmin}
            onEditClick={() => setIsEditingLogo(true)}
          />
        </div>

        {/* Lado Direito: Navegação */}
        <nav className="flex items-center gap-6 md:gap-10">
          <button 
            onClick={() => onNavigate('home')}
            className={navLinkClass('home')}
          >
            INÍCIO
          </button>
          <button 
            onClick={() => onNavigate('gallery')}
            className={navLinkClass('gallery')}
          >
            GALERIA
          </button>
          <button 
            onClick={() => onNavigate('quote')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              currentView === 'quote'
                ? 'bg-[#CC0000] text-white shadow-md'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } text-sm font-semibold`}
          >
            ORÇAMENTO
          </button>
        </nav>
      </div>

      {/* Modal de Edição do Logo */}
      <EditModal 
        isOpen={isEditingLogo}
        onClose={() => setIsEditingLogo(false)}
        onSave={handleSaveLogo}
        initialTitle=""
        initialUrl={logoUrl || ""}
        hideTitle={true}
        modalTitle="Editar Logotipo"
        helperText="Recomendado: 320px de largura x 160px de altura."
      />
    </header>
  );
};