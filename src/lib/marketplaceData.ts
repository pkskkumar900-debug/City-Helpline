import { MarketplaceItem } from '../types';

export const INITIAL_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'm-free-chemistry-notes-kota',
    title: 'FREE: Complete Organic Chemistry Revision Short Notes & Mindmaps (AIR 148 Senior)',
    description: 'Passing on my handwritten reaction mechanism summary charts, named reactions handbook, and mindmaps for JEE/NEET. Free giveaway to help hardworking juniors who cannot afford expensive test series!',
    price: 0,
    originalPrice: 1500,
    category: 'Books & Notes',
    condition: 'Good Condition',
    city: 'Kota',
    area: 'Vigyan Nagar, Near Allen Sangyan',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'student-ex-allen-senior',
    sellerName: 'Kunal Choudhary (MBBS Govt)',
    sellerPhone: '9876541122',
    whatsappNumber: '9876541122',
    status: 'available',
    createdAt: Date.now() - 3600000 * 2,
    featured: true
  },
  {
    id: 'm-free-pw-physics-formula-patna',
    title: 'FREE: Physics Wallah Complete Formula Handbook + 15 Years PYQ Book (PCB & PCM)',
    description: '100% Free Donation! Formulas, derivation sheets, and error-less solved question bank for physics 11th & 12th. Collect in person from Boring Road.',
    price: 0,
    originalPrice: 1200,
    category: 'Books & Notes',
    condition: 'Like New',
    city: 'Patna',
    area: 'Boring Canal Road',
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'student-patna-notes',
    sellerName: 'Deepak Raj',
    sellerPhone: '9876543344',
    whatsappNumber: '9876543344',
    status: 'available',
    createdAt: Date.now() - 3600000 * 6,
    featured: true
  },
  {
    id: 'm-allen-neet-modules',
    title: 'Allen NEET Full Study Material (PCB 2024-25) + PYQ Bank',
    description: 'Complete 32 Modules of Physics, Chemistry & Biology with solved examples and chapter-wise 15 years solved question papers. Unmarked, crisp pages. Passing to juniors as I got selected!',
    price: 2400,
    originalPrice: 8500,
    category: 'Books & Notes',
    condition: 'Like New',
    city: 'Kota',
    area: 'Landmark City, Kunhari',
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'student-rohit-kota',
    sellerName: 'Rohit Verma (Ex-Allen)',
    sellerPhone: '9876543210',
    whatsappNumber: '9876543210',
    status: 'available',
    createdAt: Date.now() - 3600000 * 5,
    featured: true
  },
  {
    id: 'm-symphony-air-cooler',
    title: 'Symphony Diet 35T Personal Tower Air Cooler with Stand & Trolley',
    description: 'Purchased 4 months ago for summer prep. Extremely low noise, very powerful honey-comb cooling pad with ice chamber. Perfect for single room / PG. Works smoothly on inverter too.',
    price: 2900,
    originalPrice: 6500,
    category: 'Coolers & Fans',
    condition: 'Good Condition',
    city: 'Kota',
    area: 'Talwandi, Sector A',
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'student-ananya-kota',
    sellerName: 'Ananya S. (Resonance)',
    sellerPhone: '9876512345',
    whatsappNumber: '9876512345',
    status: 'available',
    createdAt: Date.now() - 3600000 * 12,
    featured: true
  },
  {
    id: 'm-hero-sprint-cycle',
    title: 'Hero Sprint 26T City Bicycle with Heavy Duty Lock & Front Basket',
    description: 'Single-hand used cycle for commuting between hostel and coaching center. Both tyres in prime condition, recently oiled and serviced. Includes number lock and bell.',
    price: 1800,
    originalPrice: 4200,
    category: 'Cycles & Bikes',
    condition: 'Good Condition',
    city: 'Patna',
    area: 'Boring Road, Near Panchmukhi Mandir',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'student-aman-patna',
    sellerName: 'Aman Kumar',
    sellerPhone: '9812345678',
    whatsappNumber: '9812345678',
    status: 'available',
    createdAt: Date.now() - 3600000 * 20,
    featured: true
  },
  {
    id: 'm-wooden-study-table',
    title: 'Foldable Engineered Wood Study Table + Cushioned Back Chair',
    description: 'Dimensions 36x24 inches. Has dedicated slot for mobile/tablet, pen stand and cup holder. Includes a comfortable ergonomic high-back study chair. Ideal for long study sessions.',
    price: 1400,
    originalPrice: 3200,
    category: 'Study Furniture',
    condition: 'Like New',
    city: 'Patna',
    area: 'Kankarbagh, Colony Rd',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'student-vikas-patna',
    sellerName: 'Vikas Ranjan',
    sellerPhone: '9823456789',
    whatsappNumber: '9823456789',
    status: 'available',
    createdAt: Date.now() - 3600000 * 30
  },
  {
    id: 'm-hc-verma-dc-pandey',
    title: 'Concepts of Physics (HC Verma Vol 1 & 2) + DC Pandey Mechanics',
    description: 'Standard reference books for JEE Advanced physics. Very clean, all formulas highlighted neatly, zero torn pages. Giving both HC Verma volumes together at 65% discount.',
    price: 650,
    originalPrice: 1850,
    category: 'Books & Notes',
    condition: 'Like New',
    city: 'New Delhi',
    area: 'Mukherjee Nagar',
    images: [
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'student-prashant-delhi',
    sellerName: 'Prashant Tiwari',
    sellerPhone: '9834567890',
    whatsappNumber: '9834567890',
    status: 'available',
    createdAt: Date.now() - 3600000 * 45
  },
  {
    id: 'm-rechargeable-study-lamp',
    title: 'Wipro 12W LED Rechargeable Study Lamp with 3 Dimming Modes & Eye Care',
    description: '3000mAh battery backup of 6 hours. Warm white & cool white light settings for eye-strain-free midnight study. Comes with original Type-C fast charging cable.',
    price: 499,
    originalPrice: 1299,
    category: 'Electronics & Gadgets',
    condition: 'Like New',
    city: 'Lucknow',
    area: 'Aliganj, Near Kapoorthala',
    images: [
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'student-neha-lucknow',
    sellerName: 'Neha Gupta',
    sellerPhone: '9845678901',
    whatsappNumber: '9845678901',
    status: 'available',
    createdAt: Date.now() - 3600000 * 50
  },
  {
    id: 'm-cotton-mattress-bedding',
    title: 'Single Bed Cotton Gadda (Mattress) + Bedspread + Waterproof Cover',
    description: 'Clean single bed gadda (3x6 feet) with high density cotton filling. Super comfortable for PG single bed cot. Dry-cleaned and packed hygienically.',
    price: 850,
    originalPrice: 2100,
    category: 'Mattress & Bedding',
    condition: 'Good Condition',
    city: 'Kota',
    area: 'Indra Vihar, Near Allen Safalyam',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'student-sumit-kota',
    sellerName: 'Sumit Meena',
    sellerPhone: '9856789012',
    whatsappNumber: '9856789012',
    status: 'available',
    createdAt: Date.now() - 3600000 * 60
  }
];
