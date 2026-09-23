import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Users, ShoppingBag, Clock, CheckCircle2, 
  XCircle, Star, ArrowUpRight, TrendingUp, AlertTriangle,
  MapPin, Shield, Activity, PlusCircle, Megaphone
} from 'lucide-react';
import { Listing, UserProfile, MarketplaceItem } from '../../types';
import { AdminTab } from './AdminSidebar';

interface AdminOverviewTabProps {
  listings: Listing[];
  users: UserProfile[];
  marketplaceItems: MarketplaceItem[];
  onNavigateTab: (tab: AdminTab) => void;
  onInspectListing: (listing: Listing) => void;
  onApproveListing: (id: string) => void;
  onRejectListing: (id: string) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  listings,
  users,
  marketplaceItems,
  onNavigateTab,
  onInspectListing,
  onApproveListing,
  onRejectListing,
}) => {
  const pendingListings = listings.filter(l => l.status === 'pending');
  const approvedListings = listings.filter(l => l.status === 'approved');
  const contributors = users.filter(u => u.role === 'contributor');
  const admins = users.filter(u => u.role === 'admin');

  // Group by category
  const categoriesCount = listings.reduce((acc, l) => {
    acc[l.category] = (acc[l.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group by city
  const cityCount = listings.reduce((acc, l) => {
    if (l.city) {
      acc[l.city] = (acc[l.city] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      
      {/* Pending Attention Alert Banner (if any) */}
      {pendingListings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Moderation Queue Requires Action
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-amber-500 text-black">
                  {pendingListings.length}
                </span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                New PG, mess, and study library listings submitted by contributors awaiting admin verification.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('listings')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black tracking-wide transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            Review Pending Queue &rarr;
          </button>
        </motion.div>
      )}

      {/* KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Directory Listings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          onClick={() => onNavigateTab('listings')}
          className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-[#00E5FF]/40 transition-all cursor-pointer group relative overflow-hidden shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/10 rounded-full blur-2xl group-hover:bg-[#00E5FF]/20 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[#00E5FF]/15 border border-[#00E5FF]/30 text-[#00E5FF]">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
              {approvedListings.length} Verified
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Listings</p>
          <p className="text-3xl font-extrabold text-white mt-1 group-hover:text-[#00E5FF] transition-colors">
            {listings.length}
          </p>
        </motion.div>

        {/* Pending Queue */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => onNavigateTab('listings')}
          className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group relative overflow-hidden shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
              <Clock className="w-6 h-6" />
            </div>
            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
              pendingListings.length > 0 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 animate-pulse' 
                : 'bg-white/10 text-gray-400 border-white/10'
            }`}>
              {pendingListings.length > 0 ? 'Action Required' : 'All Clear'}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Approvals</p>
          <p className="text-3xl font-extrabold text-white mt-1 group-hover:text-amber-300 transition-colors">
            {pendingListings.length}
          </p>
        </motion.div>

        {/* Registered Users */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => onNavigateTab('users')}
          className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-[#8A2BE2]/40 transition-all cursor-pointer group relative overflow-hidden shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#8A2BE2]/10 rounded-full blur-2xl group-hover:bg-[#8A2BE2]/20 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-[#8A2BE2]/15 border border-[#8A2BE2]/30 text-[#8A2BE2]">
              <Users className="w-6 h-6" />
            </div>
            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[#8A2BE2]/10 text-[#8A2BE2] border border-[#8A2BE2]/20">
              {contributors.length} Providers
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Student & User Base</p>
          <p className="text-3xl font-extrabold text-white mt-1 group-hover:text-[#8A2BE2] transition-colors">
            {users.length}
          </p>
        </motion.div>

        {/* Marketplace Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => onNavigateTab('marketplace')}
          className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group relative overflow-hidden shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Store
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Marketplace Items</p>
          <p className="text-3xl font-extrabold text-white mt-1 group-hover:text-emerald-400 transition-colors">
            {marketplaceItems.length}
          </p>
        </motion.div>

      </div>

      {/* Two Column Grid: Pending Review High-Priority Queue + Educational Hub Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* High Priority Moderation Queue */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#00E5FF]" />
              <h3 className="text-base font-bold text-white">Pending Moderation Stream</h3>
            </div>
            <button
              onClick={() => onNavigateTab('listings')}
              className="text-xs text-[#00E5FF] hover:underline flex items-center gap-1 font-semibold"
            >
              View all ({listings.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {pendingListings.slice(0, 4).map((listing) => (
              <div
                key={listing.id}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div 
                  className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                  onClick={() => onInspectListing(listing)}
                >
                  <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 overflow-hidden shrink-0">
                    {listing.images && listing.images.length > 0 ? (
                      <img src={listing.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <Building2 className="w-6 h-6 m-3 text-gray-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate hover:text-[#00E5FF] transition-colors">
                      {listing.title}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {listing.category} • {listing.city} • ₹{listing.price.toLocaleString('en-IN')}/mo
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      By {listing.authorName} ({listing.contact})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onInspectListing(listing)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10 transition-colors"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={() => onApproveListing(listing.id)}
                    className="p-1.5 rounded-xl bg-[#00E5FF]/15 hover:bg-[#00E5FF]/25 text-[#00E5FF] border border-[#00E5FF]/30 transition-colors"
                    title="Approve Listing"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRejectListing(listing.id)}
                    className="p-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 transition-colors"
                    title="Reject Listing"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {pendingListings.length === 0 && (
              <div className="py-12 text-center rounded-2xl bg-white/[0.01] border border-dashed border-white/10">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
                <p className="text-sm font-bold text-white">Pending Moderation Queue Is Clear</p>
                <p className="text-xs text-gray-500 mt-1">All newly submitted listings have been reviewed and approved.</p>
              </div>
            )}
          </div>
        </div>

        {/* Operational Distribution by Hub & Category */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Hub breakdown */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#8A2BE2]" />
                <h3 className="text-base font-bold text-white">Hub Coverage Density</h3>
              </div>
              <button
                onClick={() => onNavigateTab('hubs')}
                className="text-xs text-[#8A2BE2] hover:underline font-semibold"
              >
                View Hubs
              </button>
            </div>

            <div className="space-y-2.5">
              {Object.entries(cityCount).slice(0, 5).map(([city, countVal]) => {
                const count = Number(countVal) || 0;
                const percent = Math.min(100, Math.round((count / (listings.length || 1)) * 100));
                return (
                  <div key={city} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-300">{city}</span>
                      <span className="text-gray-400">{count} places ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              {Object.keys(cityCount).length === 0 && (
                <p className="text-xs text-gray-500 py-4 text-center">No city data available yet</p>
              )}
            </div>
          </div>

          {/* Quick Ops Controls */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Quick Ops Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onNavigateTab('broadcast')}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors group"
              >
                <Megaphone className="w-4 h-4 text-[#8A2BE2] mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-white">Broadcast Alert</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Push message to students</p>
              </button>

              <button
                onClick={() => onNavigateTab('users')}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors group"
              >
                <Shield className="w-4 h-4 text-[#00E5FF] mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-white">RBAC Permissions</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Manage roles & bans</p>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
