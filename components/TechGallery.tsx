import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Edit2, X, Play, Pause } from 'lucide-react';
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
  const [isPaused, setIsPaused] = useState(false);

  // Prevenir erro se a lista estiver vazia
  const hasItems = items.length > 0;
  
  // Índices para o efeito 3D (Anterior e Próximo com loop infinito)
  const getIndex = (idx: number) => {
    if (!hasItems) return 0;
    const len = items.length;
    return (idx + len) % len;
  };

  const prevIndex = getIndex(currentIndex - 1);
  const nextIndex = getIndex(currentIndex + 1);
  const currentItem = hasItems ? items[currentIndex] : null;

  const goToPrevious = useCallback(() => {
    if (!hasItems) return;
    setCurrentIndex((prev) => getIndex(prev - 1));
  }, [hasItems, items.length]);

  const goToNext = useCallback(() => {
    if (!hasItems) return;
    setCurrentIndex((prev) => getIndex(prev + 1));
  }, [hasItems, items.length]);

  // Auto-play Effect
  useEffect(() => {
    if (isPaused || isAdding || editingItem || !hasItems) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [goToNext, isPaused, isAdding, editingItem, hasItems]);

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
        setIsPaused(true);
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
    if (onDelete && window.confirm("Tem certeza que deseja excluir esta foto da galeria?")) {
      onDelete(id);
      if (currentIndex >= items.length - 1) {
        setCurrentIndex(Math.max(0, items.length - 2));
      }
    }
  };

  const handleEditThumbnail = (e: React.MouseEvent, item: GalleryItem, index: number) => {
    e.stopPropagation();
    setCurrentIndex(index);
    setEditingItem(item);
  };

  return (
    <div className="w-full bg-black min-h-[85vh] flex flex-col justify-center relative overflow-hidden perspective-1000">
      
      {/* Dynamic Ambient Background (Ambilight) */}
      {currentItem && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center blur-[100px] opacity-50 scale-150 transition-all duration-[1500ms]"
            style={{ backgroundImage: `url(${currentItem.url})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-0"></div>
        </>
      )}

      {/* Main Content */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col h-full py-8 md:py-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Header da Galeria */}
        <div className="flex justify-between items-end mb-8 md:mb-12 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight drop-shadow-lg">GALERIA</h2>
            <p className="text-red-500 text-xs md:text-sm uppercase tracking-[0.3em] mt-1 font-semibold">Tecnologia & Arte</p>
          </div>
          
          {/* Controles Superiores */}
          <div className="flex items-center gap-4">
            {/* Indicador de Pause/Play */}
            <div className="text-white/30">
               {isPaused ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </div>

            {isAdmin && (
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:scale-105 text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Adicionar Foto
              </button>
            )}
          </div>
        </div>

        {/* 3D Stage Area */}
        <div className="flex-grow flex items-center justify-center relative h-[50vh] md:h-[60vh] preserve-3d">
          
          {hasItems ? (
            <>
              {/* Previous Image (Left, Angled, Blurred) */}
              <div 
                className="absolute left-[5%] md:left-[15%] w-[40%] md:w-[30%] h-[60%] opacity-40 blur-[2px] transform -rotate-y-12 scale-90 z-10 transition-all duration-700 ease-out cursor-pointer hidden md:block grayscale-[50%]"
                onClick={goToPrevious}
              >
                 <img src={items[prevIndex].url} alt="Previous" className="w-full h-full object-cover rounded-lg shadow-2xl" />
              </div>

              {/* Next Image (Right, Angled, Blurred) */}
              <div 
                className="absolute right-[5%] md:right-[15%] w-[40%] md:w-[30%] h-[60%] opacity-40 blur-[2px] transform rotate-y-12 scale-90 z-10 transition-all duration-700 ease-out cursor-pointer hidden md:block grayscale-[50%]"
                onClick={goToNext}
              >
                 <img src={items[nextIndex].url} alt="Next" className="w-full h-full object-cover rounded-lg shadow-2xl" />
              </div>

              {/* MAIN IMAGE (Center, Sharp, Floating, Reflective) */}
              <div className="relative w-[85%] md:w-[55%] h-full z-30 transform transition-all duration-700 ease-out animate-float group/main">
                <div className="w-full h-full rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black reflect-image">
                  <img 
                    src={currentItem!.url} 
                    alt="Gallery Main" 
                    className="w-full h-full object-cover"
                    key={currentItem!.id}
                  />
                  
                  {/* Admin Overlay on Main Image */}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/main:opacity-100 transition-opacity duration-300 z-50">
                      <button 
                        onClick={() => setEditingItem(currentItem)}
                        className="bg-black/50 backdrop-blur-md hover:bg-blue-600 text-white p-3 rounded-full transition-all shadow-lg border border-white/10"
                        title="Trocar imagem atual"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteId(currentItem!.id)}
                        className="bg-black/50 backdrop-blur-md hover:bg-red-600 text-white p-3 rounded-full transition-all shadow-lg border border-white/10"
                        title="Excluir imagem atual"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Buttons (Floating) */}
              <button 
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }} 
                className="absolute left-2 md:left-8 bg-black/20 hover:bg-red-600 text-white p-4 rounded-full backdrop-blur-md border border-white/10 transition-all transform hover:scale-110 z-40 group-hover/main:bg-black/60"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); goToNext(); }} 
                className="absolute right-2 md:right-8 bg-black/20 hover:bg-red-600 text-white p-4 rounded-full backdrop-blur-md border border-white/10 transition-all transform hover:scale-110 z-40 group-hover/main:bg-black/60"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </>
          ) : (
            <div className="w-full h-[50vh] flex items-center justify-center text-white/50 border border-dashed border-gray-700 rounded-lg bg-black/30 backdrop-blur-sm">
              <p>Nenhuma foto na galeria.</p>
            </div>
          )}
        </div>

        {/* Thumbnails Strip */}
        {hasItems && (
          <div className="mt-10 relative px-4 md:px-0 z-20">
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar justify-center items-center">
              {items.map((item, index) => (
                <div 
                  key={item.id}
                  className="relative group/thumb transition-all duration-300"
                >
                  <div 
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      w-12 h-12 md:w-20 md:h-14 flex-shrink-0 cursor-pointer rounded-md overflow-hidden transition-all duration-500 border-2 shadow-lg
                      ${index === currentIndex 
                        ? 'border-red-600 opacity-100 scale-125 z-10 ring-4 ring-red-600/20' 
                        : 'border-transparent opacity-40 hover:opacity-100 hover:scale-110 grayscale hover:grayscale-0'
                      }
                    `}
                  >
                    <img 
                      src={item.url} 
                      alt={`Thumbnail ${index}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  {/* Admin Quick Actions on Thumbnails */}
                  {isAdmin && (
                    <div className="absolute -top-4 -right-4 flex gap-1 transform scale-0 group-hover/thumb:scale-100 transition-transform duration-200 z-50 bg-black/80 rounded-full px-2 py-1">
                       <button
                        onClick={(e) => handleEditThumbnail(e, item, index)}
                        className="text-blue-400 hover:text-blue-300 p-1"
                        title="Editar"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteId(item.id); }}
                        className="text-red-500 hover:text-red-400 p-1"
                        title="Excluir"
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

      {/* Modais */}
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