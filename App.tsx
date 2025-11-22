import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { Footer } from './components/Footer';
import { QuoteForm } from './components/QuoteForm';
import { TechGallery } from './components/TechGallery';

import { PORTFOLIO_ITEMS } from './constants';
import { PortfolioItem } from './types';

function App() {
  // Inicializa o estado com dados do localStorage ou usa os padrões do constants.ts
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_items');
      return saved ? JSON.parse(saved) : PORTFOLIO_ITEMS;
    } catch (e) {
      console.error("Erro ao carregar itens do portfólio:", e);
      return PORTFOLIO_ITEMS;
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

  const handleUpdateItem = (id: number, newUrl: string, newTitle: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, imageUrl: newUrl, title: newTitle } : item
    );
    setItems(newItems);
    localStorage.setItem('portfolio_items', JSON.stringify(newItems));
  };

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
          <TechGallery />
        )}

        {currentView === 'quote' && (
          <QuoteForm />
        )}
      </main>

      <Footer 
        isAdmin={isAdmin} 
        toggleAdmin={() => setIsAdmin(!isAdmin)} 
      />
    </div>
  );
}

export default App;