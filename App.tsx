import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { Footer } from './components/Footer';
import { QuoteForm } from './components/QuoteForm';
import { TechGallery } from './components/TechGallery';
import { WhatsAppButton } from './components/WhatsAppButton';

import { PORTFOLIO_ITEMS, GALLERY_IMAGES_SEED } from './constants';
import { PortfolioItem, GalleryItem } from './types';

function App() {
  // Inicializa o estado do portfólio
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_items');
      return saved ? JSON.parse(saved) : PORTFOLIO_ITEMS;
    } catch (e) {
      console.error("Erro ao carregar itens do portfólio:", e);
      return PORTFOLIO_ITEMS;
    }
  });

  // Inicializa o estado da Galeria
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('gallery_items');
      if (saved) {
        return JSON.parse(saved);
      }
      // Se não tiver salvo, cria a partir da lista seed (convertendo string para objeto)
      return GALLERY_IMAGES_SEED.map((url, index) => ({
        id: `seed-${index}-${Date.now()}`,
        url: url
      }));
    } catch (e) {
      console.error("Erro ao carregar itens da galeria:", e);
      return [];
    }
  });

  // Estado para o Logotipo personalizado
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('logo_url');
  });

  // Estado de Navegação
  const [currentView, setCurrentView] = useState<'home' | 'gallery' | 'quote'>('home');

  // ATENÇÃO: Admin começa como FALSE por segurança (protegido por senha)
  const [isAdmin, setIsAdmin] = useState(false);

  // Scroll para o topo quando mudar a visualização
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Handlers para o Portfólio (Home)
  const handleUpdateItem = (id: number, newUrl: string, newTitle: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, imageUrl: newUrl, title: newTitle } : item
    );
    setItems(newItems);
    localStorage.setItem('portfolio_items', JSON.stringify(newItems));
  };

  // Handlers para a Galeria
  const handleAddGalleryItem = (url: string) => {
    const newItem: GalleryItem = {
      id: `img-${Date.now()}`,
      url: url
    };
    const newGallery = [newItem, ...galleryItems]; // Adiciona no começo
    setGalleryItems(newGallery);
    localStorage.setItem('gallery_items', JSON.stringify(newGallery));
  };

  const handleUpdateGalleryItem = (id: string, newUrl: string) => {
    const newGallery = galleryItems.map(item => 
      item.id === id ? { ...item, url: newUrl } : item
    );
    setGalleryItems(newGallery);
    localStorage.setItem('gallery_items', JSON.stringify(newGallery));
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta foto da galeria?")) {
      const newGallery = galleryItems.filter(item => item.id !== id);
      setGalleryItems(newGallery);
      localStorage.setItem('gallery_items', JSON.stringify(newGallery));
    }
  };

  // Handler para o Logo
  const handleUpdateLogo = (newUrl: string) => {
    const url = newUrl.trim();
    if (url) {
      setLogoUrl(url);
      localStorage.setItem('logo_url', url);
    } else {
      setLogoUrl(null); // Reseta para o padrão se estiver vazio
      localStorage.removeItem('logo_url');
    }
  };

  const handleNavigate = (view: 'home' | 'gallery' | 'quote') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-gray-900 relative">
      <Header 
        logoUrl={logoUrl}
        isAdmin={isAdmin}
        onUpdateLogo={handleUpdateLogo}
        currentView={currentView}
        onNavigate={handleNavigate}
      />
      
      <main className="flex-grow flex flex-col w-full">
        {currentView === 'home' && (
          <>
            <Hero />
            <PortfolioGrid 
              items={items} 
              isAdmin={isAdmin} 
              onUpdateItem={handleUpdateItem} 
            />
          </>
        )}

        {currentView === 'gallery' && (
          <TechGallery 
            items={galleryItems}
            isAdmin={isAdmin}
            onAdd={handleAddGalleryItem}
            onUpdate={handleUpdateGalleryItem}
            onDelete={handleDeleteGalleryItem}
          />
        )}

        {currentView === 'quote' && (
          <QuoteForm />
        )}
      </main>

      <Footer 
        isAdmin={isAdmin} 
        toggleAdmin={() => setIsAdmin(!isAdmin)} 
      />

      <WhatsAppButton />
    </div>
  );
}

export default App;