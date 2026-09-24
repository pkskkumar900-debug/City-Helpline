import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Listing } from '../types';
import { Star, MapPin, Building2, Trash2, ArrowRight, Search, Phone } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { PersonalPageHeader } from '../components/layout/PersonalPageHeader';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function SavedListingsPage() {
  const { currentUser, userProfile } = useAuth();
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        if (userProfile?.savedListings && userProfile.savedListings.length > 0) {
          const docs = await Promise.all(
            userProfile.savedListings.map(async (savedId) => {
              try {
                const snap = await getDoc(doc(db, 'listings', savedId));
                if (snap.exists()) {
                  const data = { id: snap.id, ...snap.data() } as Listing;
                  if (data.status === 'approved' || data.authorId === currentUser.uid) {
                    return data;
                  }
                }
              } catch (e) {
                console.warn(`Could not load saved listing ${savedId}:`, e);
              }
              return null;
            })
          );
          setSavedListings(docs.filter((l): l is Listing => l !== null));
        } else {
          setSavedListings([]);
        }
      } catch (err) {
        console.error('Error fetching saved listings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, [currentUser, userProfile?.savedListings]);

  const removeSavedListing = async (listingId: string) => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        savedListings: arrayRemove(listingId),
      });
      setSavedListings((prev) => prev.filter((l) => l.id !== listingId));
      toast.success('Listing removed from bookmarks');
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
      toast.error('Failed to remove listing');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-20 md:mb-12">
      <PersonalPageHeader
        title="Saved Listings"
        subtitle="Your bookmarked student PGs, hostels, silent libraries & mess services"
        badge={`${savedListings.length} Saved`}
        badgeColor="bg-amber-400/10 text-amber-300 border-amber-400/30"
        icon={Star}
        iconColor="text-amber-400"
        exitUrl="/profile"
        backLabel="Profile"
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card rounded-3xl h-72 animate-pulse bg-white/[0.05] border border-white/10"
            />
          ))}
        </div>
      ) : savedListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedListings.map((listing) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <GlassCard
                className="overflow-hidden flex flex-col h-full hover:border-[#00E5FF]/40 transition-all group"
                intensity="low"
              >
                {/* Image */}
                <div className="relative h-48 w-full bg-white/[0.04] overflow-hidden">
                  {listing.images && listing.images.length > 0 ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <Building2 className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#00E5FF] border border-[#00E5FF]/30">
                      {listing.category}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeSavedListing(listing.id);
                    }}
                    title="Remove from saved"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-rose-500/80 backdrop-blur-md border border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-[#00E5FF] transition-colors">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                      <span className="truncate">{listing.city} • {listing.address}</span>
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Monthly Rent</p>
                      <p className="text-lg font-black text-[#00E5FF]">
                        ₹{listing.price.toLocaleString('en-IN')}
                        <span className="text-xs text-gray-400 font-normal">/mo</span>
                      </p>
                    </div>

                    <Link
                      to={`/listing/${listing.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] active:scale-95"
                    >
                      <span>View</span>
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
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Saved Properties Yet</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Whenever you browse verified student PGs, hostels, or libraries, tap the bookmark star icon to save them for quick reference here.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <Search className="w-4 h-4" />
            <span>Explore Verified Listings</span>
          </Link>
        </GlassCard>
      )}
    </div>
  );
}
