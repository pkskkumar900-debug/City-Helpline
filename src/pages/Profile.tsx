import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, orderBy, getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Listing, MarketplaceItem } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  User, LogOut, Settings, PlusCircle, Building2, MapPin, 
  Star, ShoppingBag, Calculator, ChevronRight, Sparkles, 
  ShieldCheck, ArrowRight, ExternalLink, RefreshCw, Heart, 
  Tag, Compass, CheckCircle2
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';
import { useLocationContext } from '../contexts/LocationContext';

export default function Profile() {
  const { currentUser, userProfile, logout } = useAuth();
  const { userLocation, openLocationModal } = useLocationContext();
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [myMarketplaceItems, setMyMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        // 1. Fetch My Listings (Safe fetch & client-side sort)
        try {
          const qMy = query(
            collection(db, 'listings'),
            where('authorId', '==', currentUser.uid)
          );
          const snapshotMy = await getDocs(qMy);
          const dataMy = snapshotMy.docs.map(doc => ({ id: doc.id, ...doc.data() } as Listing));
          dataMy.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setMyListings(dataMy);
        } catch (listingErr) {
          console.warn('Could not load user hosted listings:', listingErr);
        }

        // 2. Fetch My Marketplace Items
        try {
          const qMarket = query(
            collection(db, 'marketplace_items'),
            where('sellerId', '==', currentUser.uid)
          );
          const snapMarket = await getDocs(qMarket);
          const marketData = snapMarket.docs.map(doc => ({ id: doc.id, ...doc.data() } as MarketplaceItem));
          marketData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setMyMarketplaceItems(marketData);
        } catch (mErr) {
          console.warn('Could not load user marketplace items:', mErr);
        }

        // 3. Fetch Saved Listings
        if (userProfile?.savedListings && userProfile.savedListings.length > 0) {
          try {
            const savedDocs = await Promise.all(
              userProfile.savedListings.map(async (savedId) => {
                try {
                  const docSnap = await getDoc(doc(db, 'listings', savedId));
                  if (docSnap.exists()) {
                    const data = { id: docSnap.id, ...docSnap.data() } as Listing;
                    if (data.status === 'approved' || data.authorId === currentUser.uid) {
                      return data;
                    }
                  }
                } catch (e) {
                  // Ignore inaccessible or removed saved items
                }
                return null;
              })
            );
            setSavedListings(savedDocs.filter((l): l is Listing => l !== null));
          } catch (savedErr) {
            console.warn('Could not load saved bookmarks:', savedErr);
            setSavedListings([]);
          }
        } else {
          setSavedListings([]);
        }
      } catch (error) {
        console.warn('Notice: Non-critical profile data loading issue:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, userProfile?.savedListings]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] px-4">
        <GlassCard className="p-8 sm:p-10 text-center max-w-md w-full border border-white/10" intensity="low">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4 text-[#00E5FF]">
            <User className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Not Signed In</h2>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Sign in to access your personal dashboard, saved accommodations, marketplace ads, and account settings.
          </p>
          <Link 
            to="/login" 
            className="block w-full py-3.5 bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-95"
          >
            Sign In / Register
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-24 md:mb-16">
      {/* Top Profile Header Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <LiquidGlassCard className="p-6 sm:p-8 relative overflow-hidden" glowColor="rgba(0, 229, 255, 0.2)">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* User Identity Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5FF] via-cyan-400 to-indigo-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500" />
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 bg-slate-900 rounded-full flex items-center justify-center shadow-2xl overflow-hidden border-2 border-white/20">
                  {userProfile?.photoURL ? (
                    <img src={userProfile.photoURL} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#00E5FF] to-indigo-400">
                      {userProfile?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap mb-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight truncate">
                    {userProfile?.name || 'Student User'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.15)]">
                    {userProfile?.role === 'admin' ? 'Administrator' : userProfile?.role === 'contributor' ? 'Host / Contributor' : 'Verified Student'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 font-medium truncate mb-2">
                  {userProfile?.email || currentUser.email}
                </p>

                <div className="flex items-center gap-3 flex-wrap text-xs text-gray-400">
                  {/* Location badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span className="text-gray-200 font-medium">
                      {userLocation ? `${userLocation.city}${userLocation.state ? `, ${userLocation.state}` : ''}` : 'Kota'}
                    </span>
                    <button
                      type="button"
                      onClick={openLocationModal}
                      className="ml-1 text-[11px] font-bold text-[#00E5FF] hover:underline cursor-pointer"
                    >
                      Change
                    </button>
                  </div>

                  {userProfile?.phone && (
                    <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-gray-300">
                      📞 {userProfile.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Right */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
              <Link
                to="/settings"
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 font-bold text-xs transition-all active:scale-95 shadow-sm"
              >
                <Settings className="w-4 h-4 text-[#00E5FF]" />
                <span>Account Settings</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 font-bold text-xs transition-all active:scale-95 cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          </div>
        </LiquidGlassCard>
      </motion.div>

      {/* Quick Stats Grid: 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {/* Saved Listings */}
        <Link
          to="/saved-listings"
          className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:from-cyan-500/15 hover:to-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 fill-amber-400/30 text-amber-400" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {loading ? '...' : savedListings.length}
            </div>
            <p className="text-xs font-semibold text-gray-400 mt-0.5">Saved Bookmarks</p>
          </div>
        </Link>

        {/* Marketplace Ads */}
        <Link
          to="/my-marketplace"
          className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:from-cyan-500/15 hover:to-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-[#00E5FF] group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {loading ? '...' : myMarketplaceItems.length}
            </div>
            <p className="text-xs font-semibold text-gray-400 mt-0.5">Marketplace Ads</p>
          </div>
        </Link>

        {/* Hosted Properties */}
        <Link
          to="/my-listings"
          className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:from-cyan-500/15 hover:to-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-400/10 border border-indigo-400/20 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {loading ? '...' : myListings.length}
            </div>
            <p className="text-xs font-semibold text-gray-400 mt-0.5">Hosted Listings</p>
          </div>
        </Link>

        {/* Student Living Budget */}
        <Link
          to="/budget"
          className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:from-cyan-500/15 hover:to-white/[0.04] border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1">
              <span>Planner</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Live</span>
            </div>
            <p className="text-xs font-semibold text-gray-400 mt-0.5">Student Budget Tool</p>
          </div>
        </Link>
      </div>

      {/* Main Feature Sections: Clean, categorized cards leading to dedicated personal pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        
        {/* Category 1: Student Accommodations & Living */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Building2 className="w-4 h-4 text-[#00E5FF]" />
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
              Accommodations & Living
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Student Budget Planner Card */}
            <Link
              to="/budget"
              className="group p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-200 shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                      Student Living Budget Planner
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                      Monthly Tool
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    Calculate monthly room rent, mess food, AC library, and travel costs.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </Link>

            {/* Saved Bookmarks Card */}
            <Link
              to="/saved-listings"
              className="group p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-200 shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                  <Star className="w-5 h-5 fill-amber-400/30 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                      Saved & Bookmarked Places
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                      {savedListings.length} Saved
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    Quickly access shortlisted student PGs, hostels, flats, and libraries.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </Link>

            {/* My Hosted Listings Card */}
            <Link
              to="/my-listings"
              className="group p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-200 shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00E5FF] shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(0,229,255,0.2)]">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                      My Hosted Accommodations
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                      {myListings.length} Listed
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    Manage and update your listed PG, hostel, silent library, or mess.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </Link>

            {/* Post Accommodation Card */}
            <Link
              to="/add-listing"
              className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-200 shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#00E5FF] text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-black text-white group-hover:text-[#00E5FF] transition-colors truncate">
                    List New PG / Room / Mess
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5 line-clamp-1">
                    Reach thousands of students searching for rooms and study spaces.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>
        </div>

        {/* Category 2: Student Marketplace & Pre-owned Goods */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <ShoppingBag className="w-4 h-4 text-[#00E5FF]" />
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-400">
              Campus Marketplace & Second-hand Items
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* My Marketplace Ads Card */}
            <Link
              to="/my-marketplace"
              className="group p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-200 shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                      My Marketplace Ads
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      {myMarketplaceItems.length} Active Ads
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    Manage your books, cycles, study desks, and coolers listed for sale.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </Link>

            {/* Sell Student Item Card */}
            <Link
              to="/sell-item"
              className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 hover:from-purple-500/20 hover:to-cyan-500/20 border border-purple-400/30 hover:border-purple-400/60 transition-all duration-200 shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  <Tag className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-black text-white group-hover:text-[#00E5FF] transition-colors truncate">
                      Sell Student Item
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                      Zero Commission
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-0.5 line-clamp-1">
                    Post study notes, books, room cooler, mattress, or cycle.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </Link>

            {/* Browse Campus Marketplace Card */}
            <Link
              to="/marketplace"
              className="group p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-200 shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                    Browse All Campus Marketplace
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    Explore pre-owned study essentials sold by fellow students.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </Link>

            {/* Account Settings Card */}
            <Link
              to="/settings"
              className="group p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-200 shadow-md flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-slate-700/40 border border-white/10 flex items-center justify-center text-gray-200 shrink-0 group-hover:scale-105 transition-transform">
                  <Settings className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors truncate">
                    Account & Profile Settings
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                    Edit name, phone, email, theme mode, and security password.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* Safety & Help Footer Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Student Safety First Guarantee</h4>
            <p className="text-xs text-gray-400 mt-0.5">
              Always inspect rooms and items in person before transferring advance payments.
            </p>
          </div>
        </div>
        <Link
          to="/safety"
          className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-cyan-300 border border-white/10 transition-colors shrink-0"
        >
          View Safety Guidelines
        </Link>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-3xl bg-[#0F172A] border border-white/15 p-6 shadow-2xl text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center mx-auto mb-4 text-rose-400">
              <LogOut className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Log Out of Your Account?</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Are you sure you want to end your active session on this device?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-colors shadow-lg cursor-pointer"
              >
                Yes, Log Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
