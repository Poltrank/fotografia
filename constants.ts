import { PortfolioItem, ContactInfo } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "Casamentos",
    category: "Wedding",
    // Black and white wedding couple
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000&sat=-100" 
  },
  {
    id: 2,
    title: "Ensaio Pre-wedding",
    category: "Pre-wedding",
    // Couple formal wear
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    title: "Debutantes",
    category: "Debutantes",
    // Glamorous dress with neon/flowers background
    imageUrl: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    title: "Ensaio debutante",
    category: "Photoshoot",
    // Girl with balloons outdoors
    imageUrl: "https://images.unsplash.com/photo-1532508505999-947c2d999406?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 5,
    title: "Parto",
    category: "Newborn",
    // Newborn baby
    imageUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 6,
    title: "Corporativo",
    category: "Corporate",
    // Professional speaking/corporate
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000"
  }
];

// Imagens para a Galeria Tecnológica (Mistura de alta qualidade)
// Usado apenas para inicializar o estado se o localStorage estiver vazio
export const GALLERY_IMAGES_SEED = [
  "https://images.unsplash.com/photo-1511285560982-1356c11d4606?auto=format&fit=crop&q=80&w=800", // Wedding party
  "https://images.unsplash.com/photo-1519225448526-0f09f87426fc?auto=format&fit=crop&q=80&w=800", // Nature wedding
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800", // DJ/Party
  "https://images.unsplash.com/photo-1542038784456-1ea0e935640e?auto=format&fit=crop&q=80&w=800", // Photography camera
  "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?auto=format&fit=crop&q=80&w=800", // Couple laughing
  "https://images.unsplash.com/photo-1604017011826-d3b4c23d891e?auto=format&fit=crop&q=80&w=800", // Dress detail
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", // Camera lens
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800", // Debutante style
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800", // Event crowd
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800", // Fashion
];

export const COMPANY_INFO: ContactInfo = {
  phone: "11 94471-7444",
  email: "contato@junfotos.com",
  instagram: "Instagram",
  youtube: "YouTube",
  threads: "https://www.threads.net/@junfotosoficial?xmt=AQF0-s0j4ePwcNHa3sEVw7rBwbW4HZgLVyR5_gHCgBOnnDI"
};