import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Edit2, X } from 'lucide-react';
import { GalleryItem } from '../types';
import { EditModal } from './EditModal';

interface TechGalleryProps {
  items: GalleryItem[];
  isAdmin?: boolean;
  onAdd?: (url: string) => void;
  onUpdate?: (id: string, newUrl: string) => void;
  onDelete?: (id: string) => void;
}

export const TechGallery: React.FC<TechGalleryProps> = ({ 
  items, 
  isAdmin = false,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isPaused, setIsPaused] = useState(false); // Controle de pausa para hover

  // Prevenir erro se a lista estiver vazia
  const hasItems = items.length > 0;
  const currentItem = hasItems ? items[currentIndex] : null;

  const goToPrevious = useCallback(() => {
    if (!hasItems) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, items.length, hasItems]);

  const goToNext = useCallback(() => {
    if (!hasItems) return;
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, items.length, hasItems]);

  // Auto-play Effect
  useEffect(() => {
    // Não roda se estiver pausado, adicionando, editando ou se não tiver itens
    if (isPaused || isAdding || editingItem || !hasItems) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [goToNext, isPaused, isAdding, editingItem, hasItems]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
        setIsPaused(true); // Pausa temporariamente ao interagir
      } 
      if (e.key === 'ArrowRight') {
        goToNext();
        setIsPaused(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Handlers de Admin
  const handleSaveAdd = (_: string, url: string) => {
    if (onAdd && url) onAdd(url);
    setIsAdding(false);
    setCurrentIndex(0);
  };

  const handleSaveEdit = (_: string, url: string) => {
    if (editingItem && onUpdate && url) {
      onUpdate(editingItem.id, url);
    }
    setEditingItem(null);
  };

  const handleDeleteId = (id: string) => {
    if (onDelete && window.confirm("Tem certeza que deseja excluir esta foto?")) {
      onDelete(id);
      // Se deletar a foto atual, ajusta o índice
      if (currentIndex >= items.length - 1) {
        setCurrentIndex(Math.max(0, items.length - 2));
      }
    }
  };

  const handleEditThumbnail = (e: React.MouseEvent, item: GalleryItem, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index); // Seleciona a foto
    setEditingItem(item); // Abre o modal
  };

  return (
    <div className="w-full bg-black min-h-[85vh] flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Blur Effect (Glassmorphism) */}
      {currentItem && (
        <div 
          className="absolute inset-0 bg-cover bg-center blur-3xl opacity-40 scale-110 transition-all duration-1000"
          style={{ backgroundImage: `url(${currentItem.url})` }}
        ></div>
      )}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Main Content */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col h-full py-8 md:py-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Header da Galeria */}
        <div className="flex justify-between items-end mb-6 border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight">GALERIA</h2>
            <p className="text-red-500 text-xs md:text-sm uppercase tracking-[0.3em] mt-1">Tecnologia & Arte</p>
          </div>
          
          {/* Botão Adicionar (Admin) */}
          {isAdmin && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all shadow-lg hover:scale-105 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Adicionar Foto
            </button>
          )}
        </div>

        {/* Área do Slider Principal */}
        <div className="flex-grow flex items-center justify-center relative group">
          
          {hasItems ? (
            <div className="relative w-full h-[50vh] md:h-[65vh] bg-black/50 rounded-lg shadow-2xl overflow-hidden border border-gray-800">
              <img 
                src={currentItem!.url} 
                alt="Gallery Slide" 
                className="w-full h-full object-contain animate-in fade-in duration-500"
                key={currentItem!.id} // Key force re-render for animation
              />

              {/* Controles de Admin na Foto Principal */}
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                  <button 
                    onClick={() => setEditingItem(currentItem)}
                    className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-2 rounded-full transition-colors shadow-md"
                    title="Trocar imagem atual"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteId(currentItem.id)}
                    className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-md"
                    title="Excluir imagem atual"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Setas de Navegação */}
              <div className="absolute inset-y-0 left-0 flex items-center px-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }} 
                  className="bg-black/30 hover:bg-red-600/80 text-white p-3 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 z-30"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center px-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); goToNext(); }} 
                  className="bg-black/30 hover:bg-red-600/80 text-white p-3 rounded-full backdrop-blur-sm transition-all transform hover:scale-110 z-30"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
              
              {/* Contador */}
              <div className="absolute bottom-4 right-6 text-white/60 text-xs font-mono bg-black/40 px-2 py-1 rounded z-30">
                {currentIndex + 1} / {items.length}
              </div>
            </div>
          ) : (
            <div className="w-full h-[50vh] flex items-center justify-center text-white/50 border border-dashed border-gray-700 rounded-lg">
              <p>Nenhuma foto na galeria.</p>
            </div>
          )}
        </div>

        {/* Thumbnails (Miniaturas) */}
        {hasItems && (
          <div className="mt-8 relative px-2">
            <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar justify-center">
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className="relative group/thumb"
                >
                  <div 
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      w-16 h-16 md:w-24 md:h-16 flex-shrink-0 cursor-pointer rounded overflow-hidden transition-all duration-300 border-2 bg-gray-900
                      ${index === currentIndex 
                        ? 'border-red-600 opacity-100 scale-110' 
                        : 'border-transparent opacity-40 hover:opacity-80 hover:scale-105'
                      }
                    `}
                  >
                    <img 
                      src={item.url} 
                      alt={`Thumbnail ${index}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {/* Botões Rápidos na Thumbnail (Admin) */}
                  {isAdmin && (
                    <div className="absolute -top-2 -right-2 flex gap-1 transform scale-0 group-hover/thumb:scale-100 transition-transform duration-200 z-50">
                       <button
                        onClick={(e) => handleEditThumbnail(e, item, index)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1 shadow-sm"
                        title="Editar esta foto"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteId(item.id); }}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-sm"
                        title="Excluir esta foto"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modais de Edição */}
      <EditModal 
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        onSave={handleSaveAdd}
        initialTitle=""
        initialUrl=""
        hideTitle={true}
        modalTitle="Adicionar Nova Foto"
      />

      <EditModal 
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveEdit}
        initialTitle=""
        initialUrl={editingItem?.url || ''}
        hideTitle={true}
        modalTitle="Editar Foto da Galeria"
      />
    </div>
  );
};