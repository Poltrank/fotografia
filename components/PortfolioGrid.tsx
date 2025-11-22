import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { PortfolioItem } from '../types';
import { EditModal } from './EditModal';

interface PortfolioGridProps {
  items: PortfolioItem[];
  isAdmin: boolean;
  onUpdateItem: (id: number, newUrl: string, newTitle: string) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items, isAdmin, onUpdateItem }) => {
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const handleEditClick = (e: React.MouseEvent, item: PortfolioItem) => {
    if (!isAdmin) return;
    e.preventDefault();
    setEditingItem(item);
  };

  const handleSaveModal = (title: string, url: string) => {
    if (editingItem && title && url) {
      onUpdateItem(editingItem.id, url, title);
    }
    setEditingItem(null);
  };

  return (
    <section className="w-full bg-white pb-24 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col group relative">
              <div 
                className={`overflow-hidden aspect-[4/3] w-full bg-gray-100 mb-6 relative rounded-sm ${isAdmin ? 'cursor-pointer ring-4 ring-transparent hover:ring-red-500/30' : ''}`}
                onClick={(e) => handleEditClick(e, item)}
                title={isAdmin ? "Clique para editar" : item.title}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Botão de edição visual */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white p-3 rounded-full shadow-lg z-50 pointer-events-none transform transition-transform hover:scale-110">
                    <Edit2 className="w-5 h-5" />
                  </div>
                )}
                
                {/* Overlay visual para indicar hover no modo admin */}
                {isAdmin && (
                  <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40 flex items-center justify-center">
                    <span className="bg-white/90 text-red-600 px-4 py-2 rounded-full font-medium shadow-md text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Editar Álbum
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <h3 className="text-gray-800 text-sm md:text-base font-normal tracking-wide">
                  {item.title}
                </h3>
                {isAdmin && (
                  <button 
                    onClick={(e) => handleEditClick(e, item)}
                    className="text-xs text-red-500 hover:text-red-700 underline md:hidden"
                  >
                    Editar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Edição */}
      <EditModal 
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveModal}
        initialTitle={editingItem?.title || ''}
        initialUrl={editingItem?.imageUrl || ''}
      />
    </section>
  );
};
