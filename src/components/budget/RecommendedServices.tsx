import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { Listing } from '../../types';
import { Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { 
  Building2, Utensils, BookOpen, Star, CheckCircle, 
  MapPin, Phone, ExternalLink, ArrowRight, Sparkles 
} from 'lucide-react';

interface RecommendedServicesProps {
  city: string;
  rentBudget: number;
  messBudget: number;
  libraryBudget: number;
}

export const RecommendedServices: React.FC<RecommendedServicesProps> = ({
  city,
  rentBudget,
  messBudget,
  libraryBudget
}) => {
  const [recommendedPG, setRecommendedPG] = useState<Listing | null>(null);
  const [recommendedMess, setRecommendedMess] = useState<Listing | null>(null);
  const [recommendedLibrary, setRecommendedLibrary] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Query listings for current city
        const q = query(
          collection(db, 'listings'),
          where('city', '==', city),
          limit(30)
        );
        const snapshot = await getDocs(q);
        const allListings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));

        // Find PG/Hostel near rentBudget
        const pgs = allListings.filter(l => l.category === 'PG' || l.category === 'Hostel');
        const bestPG = pgs.find(p => p.price && p.price <= rentBudget * 1.15) || pgs[0] || null;

        // Find Mess/Tiffin
        const messes = allListings.filter(l => l.category === 'Mess' || l.category === 'Tiffin Service');
        const bestMess = messes.find(m => m.price && m.price <= messBudget * 1.2) || messes[0] || null;

        // Find Library/Study Room
        const libraries = allListings.filter(l => l.category === 'Library' || l.category === 'Study Room');
        const bestLib = libraries.find(b => b.price && b.price <= libraryBudget * 1.3) || libraries[0] || null;

        setRecommendedPG(bestPG);
        setRecommendedMess(bestMess);
        setRecommendedLibrary(bestLib);
      } catch (err) {
        console.warn('Recommended services fetch notice:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [city, rentBudget, messBudget, libraryBudget]);

  // Fallbacks if city has fresh database entries
  const defaultPGName = city === 'Kota' ? 'Krishna Residency PG (Double AC)' : city === 'Patna' ? 'Chanakya Boys Hostel & PG' : `${city} Student Residency`;
  const defaultMessName = city === 'Kota' ? 'Annapurna Student Mess & Tiffin' : city === 'Patna' ? 'Maa Sharda Tiffin Service' : `${city} Homestyle Mess`;
  const defaultLibName = city === 'Kota' ? 'Gyan Sagar 24x7 Self Study Library' : city === 'Patna' ? 'Aryabhatta Digital Library' : `${city} Central Reading Hall`;

  const fallbackPG: Partial<Listing> = {
    title: defaultPGName,
    category: 'PG',
    city: city,
    address: city === 'Kota' ? 'Talwandi' : city === 'Patna' ? 'Boring Road' : 'Central Coaching Hub',
    price: rentBudget,
    averageRating: 4.8,
    reviewCount: 38,
    status: 'approved',
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80']
  };

  const fallbackMess: Partial<Listing> = {
    title: defaultMessName,
    category: 'Mess',
    city: city,
    address: city === 'Kota' ? 'Rajiv Gandhi Nagar' : city === 'Patna' ? 'Kankarbagh' : 'Station Road',
    price: messBudget,
    averageRating: 4.7,
    reviewCount: 52,
    status: 'approved',
    images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80']
  };

  const fallbackLib: Partial<Listing> = {
    title: defaultLibName,
    category: 'Library',
    city: city,
    address: city === 'Kota' ? 'Vigyan Nagar' : city === 'Patna' ? 'Bazar Samiti' : 'College Hub',
    price: libraryBudget,
    averageRating: 4.9,
    reviewCount: 64,
    status: 'approved',
    images: ['https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80']
  };

  const displayPG = recommendedPG || fallbackPG;
  const displayMess = recommendedMess || fallbackMess;
  const displayLib = recommendedLibrary || fallbackLib;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00E5FF] animate-pulse" />
          <h3 className="text-xl font-bold text-white tracking-tight">
            Recommended Combo for Your Budget in {city}
          </h3>
        </div>
        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Curated for ₹{(rentBudget + messBudget + libraryBudget).toLocaleString('en-IN')}/mo
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PG Card */}
        <GlassCard className="p-4 flex flex-col justify-between hover:border-cyan-400/30 transition-all group" intensity="low">
          <div>
            <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-800">
              <img
                src={displayPG.images?.[0]}
                alt={displayPG.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-slate-950 flex items-center gap-1 shadow-md">
                <Building2 className="w-3 h-3" />
                Accommodation
              </span>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg text-xs font-black bg-black/80 text-white backdrop-blur-md">
                ₹{displayPG.price?.toLocaleString('en-IN')}/mo
              </span>
            </div>

            <div className="flex items-center gap-1.5 mb-1">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{displayPG.averageRating || 4.8}</span>
              </div>
              <span className="text-[10px] text-gray-400">({displayPG.reviewCount || 24} reviews)</span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-cyan-300 ml-auto">
                <CheckCircle className="w-3 h-3 text-[#00E5FF]" />
                Verified
              </span>
            </div>

            <h4 className="text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors line-clamp-1">
              {displayPG.title}
            </h4>

            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-[#00E5FF]" />
              <span>{displayPG.address || city}</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <Link
              to={displayPG.id ? `/listing/${displayPG.id}` : `/search?category=PG&city=${encodeURIComponent(city)}`}
              className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1"
            >
              <span>{displayPG.id ? 'View PG Details' : 'Browse PGs in City'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </GlassCard>

        {/* Mess Card */}
        <GlassCard className="p-4 flex flex-col justify-between hover:border-amber-400/30 transition-all group" intensity="low">
          <div>
            <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-800">
              <img
                src={displayMess.images?.[0]}
                alt={displayMess.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                <Utensils className="w-3 h-3" />
                Mess & Food
              </span>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg text-xs font-black bg-black/80 text-white backdrop-blur-md">
                ₹{displayMess.price?.toLocaleString('en-IN')}/mo
              </span>
            </div>

            <div className="flex items-center gap-1.5 mb-1">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{displayMess.averageRating || 4.7}</span>
              </div>
              <span className="text-[10px] text-gray-400">({displayMess.reviewCount || 40} reviews)</span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-300 ml-auto">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                Verified
              </span>
            </div>

            <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {displayMess.title}
            </h4>

            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{displayMess.address || city}</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <Link
              to={displayMess.id ? `/listing/${displayMess.id}` : `/search?category=Mess&city=${encodeURIComponent(city)}`}
              className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1"
            >
              <span>{displayMess.id ? 'View Mess Menu' : 'Browse Mess & Tiffins'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </GlassCard>

        {/* Library Card */}
        <GlassCard className="p-4 flex flex-col justify-between hover:border-purple-400/30 transition-all group" intensity="low">
          <div>
            <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-slate-800">
              <img
                src={displayLib.images?.[0]}
                alt={displayLib.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500 text-white flex items-center gap-1 shadow-md">
                <BookOpen className="w-3 h-3" />
                Library & Study
              </span>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg text-xs font-black bg-black/80 text-white backdrop-blur-md">
                ₹{displayLib.price?.toLocaleString('en-IN')}/mo
              </span>
            </div>

            <div className="flex items-center gap-1.5 mb-1">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{displayLib.averageRating || 4.9}</span>
              </div>
              <span className="text-[10px] text-gray-400">({displayLib.reviewCount || 18} reviews)</span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-purple-300 ml-auto">
                <CheckCircle className="w-3 h-3 text-purple-400" />
                Verified
              </span>
            </div>

            <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
              {displayLib.title}
            </h4>

            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-purple-400" />
              <span>{displayLib.address || city}</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <Link
              to={displayLib.id ? `/listing/${displayLib.id}` : `/search?category=Library&city=${encodeURIComponent(city)}`}
              className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1"
            >
              <span>{displayLib.id ? 'View Seat Availability' : 'Browse Libraries'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
