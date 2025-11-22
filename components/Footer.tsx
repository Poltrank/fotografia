import React from 'react';
import { Instagram, Youtube, Lock, Unlock } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

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
  // Prepara o link do WhatsApp
  // Remove tudo que não é número
  const cleanPhone = COMPANY_INFO.phone.replace(/\D/g, '');
  // Cria a URL com o código do Brasil (55)
  const whatsappUrl = `https://wa.me/55${cleanPhone}`;

  const handleAdminClick = () => {
    if (isAdmin) {
      // Se já é admin, clica para sair (sem senha)
      toggleAdmin();
    } else {
      // Se quer virar admin, pede senha
      // setTimeout garante que o prompt renderize corretamente após o clique
      setTimeout(() => {
        const password = window.prompt("Digite a senha de administrador:");
        if (password === "junmatsuoka") {
          toggleAdmin();
        } else if (password !== null) {
          alert("Senha incorreta.");
        }
      }, 100);
    }
  };

  return (
    <footer className="w-full bg-white py-16 px-6 md:px-12 mt-auto border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-0">
        
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
             <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-[#E1306C] transition-colors group">
                <Instagram className="w-5 h-5" />
                <span className="text-sm">{COMPANY_INFO.instagram}</span>
             </a>
             <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-[#FF0000] transition-colors group">
                <Youtube className="w-5 h-5" />
                <span className="text-sm">{COMPANY_INFO.youtube}</span>
             </a>
             <a href={COMPANY_INFO.threads} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group">
                <ThreadsIcon className="w-5 h-5" />
                <span className="text-sm">Threads</span>
             </a>
          </div>
        </div>

      </div>

      {/* Admin Toggle (Protected) */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 flex justify-end">
        <button 
          onClick={handleAdminClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium ${
            isAdmin 
              ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200" 
              : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"
          }`}
          title={isAdmin ? "Sair do modo edição" : "Entrar no modo edição"}
        >
          {isAdmin ? (
            <>
              <Unlock className="w-4 h-4" />
              <span>Modo Edição: LIGADO</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Modo Edição: DESLIGADO</span>
            </>
          )}
        </button>
      </div>
    </footer>
  );
};