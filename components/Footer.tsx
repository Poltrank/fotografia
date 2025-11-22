import React, { useState } from 'react';
import { Instagram, Youtube, Lock, Unlock, Copy } from 'lucide-react';
import { COMPANY_INFO, PORTFOLIO_ITEMS, GALLERY_IMAGES_SEED } from '../constants';
import { AdminLoginModal } from './AdminLoginModal';
import { ExportModal } from './ExportModal';

interface FooterProps {
  isAdmin: boolean;
  toggleAdmin: () => void;
}

// Componente SVG personalizado para o ícone do Threads
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 192 192" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path d="M141.54 88.99C140.71 88.59 139.87 88.21 139.02 87.85C137.51 65.41 126.8 44.75 112.9 32.25C109.79 29.45 106.35 27.05 102.65 25.09C97.14 22.18 90.96 20.64 84.76 20.64C72.14 20.64 60.51 25.3 51.36 32.87C38.78 43.28 30.82 61.48 30.82 82.19C30.82 118.97 53.51 146.76 86.71 146.76C95.7 146.76 104.28 144.55 112.03 140.3L116.09 152.96C106.96 157.89 96.94 160.45 86.71 160.45C45.74 160.45 17.14 126 17.14 82.19C17.14 57.66 26.43 35.43 41.56 22.9C53.29 13.19 68.54 7.85 84.76 7.85C98.34 7.85 111.38 11.57 122.67 18.36C140.34 28.99 153.85 54.06 155.79 86.48C156.51 98.63 154.81 113.2 148.52 123.63C143.09 132.62 133.83 136.77 124.54 136.77C112.83 136.77 105.16 127.82 105.16 115.05V78.59C105.16 70.57 99.25 64.39 90.77 64.39C81.73 64.39 75.31 71.45 75.31 80.93C75.31 90.41 81.46 97.24 90.13 97.24C94.76 97.24 98.89 95.07 101.63 91.71V115.05C101.63 122.9 106.1 127.02 113.48 127.02C125.07 127.02 133.43 114.87 133.43 97.24C133.43 94.18 133.26 91.42 132.95 88.99H141.54ZM91.02 73.4C87.33 73.4 84.88 76.29 84.88 80.81C84.88 85.33 87.33 88.23 91.02 88.23C94.71 88.23 97.16 85.33 97.16 80.81C97.16 76.29 94.71 73.4 91.02 73.4Z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ isAdmin, toggleAdmin }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportCode, setExportCode] = useState('');

  // Prepara o link do WhatsApp
  const cleanPhone = COMPANY_INFO.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/55${cleanPhone}`;

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdmin) {
      toggleAdmin(); // Sai do modo admin imediatamente
    } else {
      setShowLoginModal(true); // Abre o modal para entrar
    }
  };

  const handleExportData = () => {
    const portfolio = localStorage.getItem('portfolio_items');
    const gallery = localStorage.getItem('gallery_items');
    
    // Usa os dados do localStorage se existirem, senão usa os defaults importados
    const portfolioData = portfolio ? JSON.parse(portfolio) : PORTFOLIO_ITEMS;
    
    let galleryUrls;
    if (gallery) {
      try {
        const parsedGallery = JSON.parse(gallery);
        if (Array.isArray(parsedGallery)) {
          // Extrai apenas as URLs para salvar limpo no constants
          galleryUrls = parsedGallery.map((g: any) => g.url);
        } else {
          galleryUrls = GALLERY_IMAGES_SEED;
        }
      } catch (e) {
        galleryUrls = GALLERY_IMAGES_SEED;
      }
    } else {
      galleryUrls = GALLERY_IMAGES_SEED;
    }

    const code = `import { PortfolioItem, ContactInfo } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = ${JSON.stringify(portfolioData, null, 2)};

export const GALLERY_IMAGES_SEED = ${JSON.stringify(galleryUrls, null, 2)};

export const COMPANY_INFO: ContactInfo = ${JSON.stringify(COMPANY_INFO, null, 2)};
`;

    setExportCode(code);
    setShowExportModal(true);
  };

  return (
    <footer className="w-full bg-white py-8 px-6 md:px-12 mt-auto border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
        
        {/* Contact Section */}
        <div className="flex flex-col items-start space-y-2">
          <a 
            href={whatsappUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-600 transition-colors text-sm md:text-base border-b border-transparent hover:border-green-200"
            title="Conversar no WhatsApp"
          >
            {COMPANY_INFO.phone}
          </a>
          <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-500 hover:text-gray-800 transition-colors text-sm md:text-base border-b border-transparent hover:border-gray-300">
            {COMPANY_INFO.email}
          </a>
        </div>

        {/* Social Section */}
        <div className="flex flex-col items-start md:items-start space-y-3">
          <h4 className="text-gray-800 font-medium text-lg">Siga-nos</h4>
          <div className="flex flex-col space-y-2">
             <a href={COMPANY_INFO.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-[#E1306C] transition-colors group">
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@junfotosoficial</span>
             </a>
             <a href={COMPANY_INFO.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-[#FF0000] transition-colors group">
                <Youtube className="w-5 h-5" />
                <span className="text-sm">@junfotos</span>
             </a>
             <a href={COMPANY_INFO.threads} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group">
                <ThreadsIcon className="w-5 h-5" />
                <span className="text-sm">@junfotosoficial</span>
             </a>
          </div>
        </div>

      </div>

      {/* Copyright & Admin Section */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Jun Matsuoka & Co - direitos autorais
        </p>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <button
              onClick={handleExportData}
              className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-700 transition-colors shadow-sm"
              title="Gerar código para atualizar no GitHub"
            >
              <Copy className="w-3 h-3" /> Gerar Código para o Site
            </button>
          )}
          
          <button 
            type="button"
            onClick={handleAdminClick}
            className={`p-1.5 rounded transition-colors ${
              isAdmin 
                ? "text-red-500 bg-red-50 hover:bg-red-100" 
                : "text-gray-300 hover:text-gray-500"
            }`}
            title={isAdmin ? "Sair do modo edição" : "Área Restrita"}
          >
            {isAdmin ? (
              <Unlock className="w-3 h-3" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Modais */}
      <AdminLoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={toggleAdmin}
      />
      
      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        code={exportCode}
      />
    </footer>
  );
};