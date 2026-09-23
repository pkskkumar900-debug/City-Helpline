import React, { useState } from 'react';
import { 
  Building2, Search, Filter, CheckCircle2, XCircle, 
  Star, Edit, Trash2, Eye, ExternalLink, ArrowUpDown, 
  RefreshCw, CheckSquare, Square
} from 'lucide-react';
import { Listing } from '../../types';
import { CATEGORIES, STATE_CITIES } from '../../lib/constants';

interface AdminListingsTabProps {
  listings: Listing[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onToggleFeatured: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onInspect: (listing: Listing) => void;
  onCreateNew: () => void;
}

export const AdminListingsTab: React.FC<AdminListingsTabProps> = ({
  listings,
  onApprove,
  onReject,
  onToggleFeatured,
  onDelete,
  onEdit,
  onInspect,
  onCreateNew,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const cityOptions = Object.entries(STATE_CITIES).flatMap(([_, cities]) => cities);

  // Filter listings
  const filtered = listings.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCat = categoryFilter === '' || item.category === categoryFilter;
    const matchesCity = cityFilter === '' || item.city?.toLowerCase() === cityFilter.toLowerCase();
    const query = search.toLowerCase();
    const matchesSearch = search === '' || 
      item.title?.toLowerCase().includes(query) ||
      item.authorName?.toLowerCase().includes(query) ||
      item.contact?.includes(query) ||
      item.city?.toLowerCase().includes(query);

    return matchesStatus && matchesCat && matchesCity && matchesSearch;
  });

  const pendingCount = listings.filter(l => l.status === 'pending').length;
  const approvedCount = listings.filter(l => l.status === 'approved').length;
  const rejectedCount = listings.filter(l => l.status === 'rejected').length;

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(f => f.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkApprove = () => {
    selectedIds.forEach(id => onApprove(id));
    setSelectedIds([]);
  };

  const handleBulkReject = () => {
    selectedIds.forEach(id => onReject(id));
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-white/15 text-white shadow-sm border border-white/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Listings ({listings.length})
          </button>
          
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              statusFilter === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'text-gray-400 hover:text-amber-300'
            }`}
          >
            <span>Pending</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-500 text-black">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'approved'
                ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                : 'text-gray-400 hover:text-[#00E5FF]'
            }`}
          >
            Approved ({approvedCount})
          </button>

          <button
            onClick={() => setStatusFilter('rejected')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === 'rejected'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'text-gray-400 hover:text-rose-400'
            }`}
          >
            Rejected ({rejectedCount})
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={onCreateNew}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] hover:brightness-110 text-black font-black text-xs transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] active:scale-95 whitespace-nowrap self-end lg:self-auto"
        >
          + Add New Property / Service
        </button>

      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, owner, phone, city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/50"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]/50 [&>option]:bg-[#0B0E14]"
        >
          <option value="">All Categories ({CATEGORIES.length})</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* City Filter */}
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00E5FF]/50 [&>option]:bg-[#0B0E14]"
        >
          <option value="">All Educational Hubs</option>
          {cityOptions.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Bulk Action Bar (when selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-between gap-4">
          <span className="text-xs font-bold text-[#00E5FF]">
            {selectedIds.length} listings selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkApprove}
              className="px-3 py-1.5 rounded-lg bg-[#00E5FF] text-black text-xs font-bold hover:brightness-110 shadow-sm"
            >
              Approve Selected
            </button>
            <button
              onClick={handleBulkReject}
              className="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold hover:brightness-110 shadow-sm"
            >
              Reject Selected
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-gray-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Listings Table View */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/10 text-gray-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 w-10">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-white">
                    {selectedIds.length === filtered.length && filtered.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-[#00E5FF]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4">Property / Service</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Hub & Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-gray-300">
              {filtered.map((listing) => {
                const isSelected = selectedIds.includes(listing.id);

                return (
                  <tr 
                    key={listing.id} 
                    className={`hover:bg-white/[0.03] transition-colors group ${
                      isSelected ? 'bg-[#00E5FF]/5' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-4">
                      <button onClick={() => toggleSelectOne(listing.id)} className="text-gray-400 hover:text-white">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#00E5FF]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    {/* Listing Details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 overflow-hidden shrink-0 cursor-pointer"
                          onClick={() => onInspect(listing)}
                        >
                          {listing.images && listing.images.length > 0 ? (
                            <img src={listing.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                          ) : (
                            <Building2 className="w-6 h-6 m-3 text-gray-600" />
                          )}
                        </div>
                        <div className="min-w-0 max-w-xs sm:max-w-sm">
                          <p 
                            className="font-bold text-white truncate cursor-pointer hover:text-[#00E5FF] transition-colors text-sm"
                            onClick={() => onInspect(listing)}
                          >
                            {listing.title}
                          </p>
                          <p className="text-gray-400 text-[11px] truncate mt-0.5">
                            By {listing.authorName} • {listing.contact}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-semibold text-[11px]">
                        {listing.category}
                      </span>
                    </td>

                    {/* Hub & Price */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">₹{listing.price.toLocaleString('en-IN')}<span className="text-[10px] text-gray-400 font-normal">/mo</span></div>
                      <p className="text-[11px] text-gray-400">{listing.city}</p>
                    </td>

                    {/* Status Badges */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                          listing.status === 'approved' ? 'bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/30' :
                          listing.status === 'rejected' ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' :
                          'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}>
                          {listing.status}
                        </span>

                        {listing.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8A2BE2]">
                            <Star className="w-3 h-3 fill-current" /> Featured
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Quick Inspect */}
                        <button
                          onClick={() => onInspect(listing)}
                          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="Inspect Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Approve */}
                        {listing.status !== 'approved' && (
                          <button
                            onClick={() => onApprove(listing.id)}
                            className="p-2 rounded-xl text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-colors"
                            title="Approve Listing"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Reject */}
                        {listing.status !== 'rejected' && (
                          <button
                            onClick={() => onReject(listing.id)}
                            className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/20 transition-colors"
                            title="Reject Listing"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Toggle Featured */}
                        <button
                          onClick={() => onToggleFeatured(listing.id, listing.featured)}
                          className={`p-2 rounded-xl transition-colors ${
                            listing.featured ? 'text-[#00E5FF] bg-[#00E5FF]/10' : 'text-gray-500 hover:text-white'
                          }`}
                          title={listing.featured ? "Remove from Featured" : "Mark as Featured"}
                        >
                          <Star className={`w-4 h-4 ${listing.featured ? 'fill-current' : ''}`} />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => onEdit(listing.id)}
                          className="p-2 rounded-xl text-gray-400 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-colors"
                          title="Edit Listing"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => onDelete(listing.id)}
                          className="p-2 rounded-xl text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-500">
                    <Building2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="font-bold text-white text-sm">No listings found</p>
                    <p className="text-xs text-gray-500 mt-1">Try resetting the status, category, or search filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
