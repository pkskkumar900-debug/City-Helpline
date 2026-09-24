import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Listing } from '../types';
import { Building2, PlusCircle, MapPin, Trash2, Edit3, ArrowRight, Eye, CheckCircle2, Clock } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { PersonalPageHeader } from '../components/layout/PersonalPageHeader';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function MyListingsPage() {
  const { currentUser } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, 'listings'),
          where('authorId', '==', currentUser.uid)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Listing));
        data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setListings(data);
      } catch (err) {
        console.warn('Notice: Error fetching user listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentUser]);

  const deleteListing = async (listingId: string) => {
    if (!window.confirm('Are you sure you want to delete this accommodation listing?')) return;
    try {
      await deleteDoc(doc(db, 'listings', listingId));
      setListings((prev) => prev.filter((l) => l.id !== listingId));
      toast.success('Listing deleted successfully');
    } catch (err) {
      console.error('Failed to delete listing:', err);
      toast.error('Failed to delete listing');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-20 md:mb-12">
      <PersonalPageHeader
        title="My Hosted Accommodations"
        subtitle="Manage your listed student PGs, hostels, silent study libraries, and mess facilities"
        badge={`${listings.length} Listed`}
        badgeColor="bg-cyan-400/10 text-cyan-300 border-cyan-400/30"
        icon={Building2}
        iconColor="text-[#00E5FF]"
        exitUrl="/profile"
        backLabel="Profile"
        rightAction={
          <Link
            to="/add-listing"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] active:scale-95 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Listing</span>
          </Link>
        }
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card rounded-3xl h-64 animate-pulse bg-white/[0.05] border border-white/10"
            />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard
                className="overflow-hidden flex flex-col h-full hover:border-[#00E5FF]/40 transition-all group"
                intensity="low"
              >
                <div className="relative h-44 w-full bg-white/[0.04] overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <Building2 className="w-12 h-12" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-[#00E5FF] border border-[#00E5FF]/30">
                      {item.category}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        item.status === 'approved'
                          ? 'bg-emerald-500/80 text-white'
                          : 'bg-amber-500/80 text-white'
                      }`}
                    >
                      {item.status === 'approved' ? 'Live' : 'Under Review'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <Link
                      to={`/edit-listing/${item.id}`}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#00E5FF] text-white hover:text-black backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-md"
                      title="Edit listing"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteListing(item.id)}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-rose-500 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-md cursor-pointer"
                      title="Delete listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-[#00E5FF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                      <span className="truncate">{item.city} • {item.address}</span>
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Monthly Rent</p>
                      <p className="text-base font-black text-[#00E5FF]">
                        ₹{item.price.toLocaleString('en-IN')}
                        <span className="text-xs text-gray-400 font-normal">/mo</span>
                      </p>
                    </div>

                    <Link
                      to={`/listing/${item.id}`}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs transition-all border border-white/10"
                    >
                      <span>Preview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <GlassCard className="p-12 text-center max-w-lg mx-auto" intensity="low">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-[#00E5FF] flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Hosted Listings Yet</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Own or manage a student PG, hostel, silent library, or tiffin service? List it for free and reach thousands of verified students across Kota, Patna, Delhi and more.
          </p>
          <Link
            to="/add-listing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Accommodation</span>
          </Link>
        </GlassCard>
      )}
    </div>
  );
}
