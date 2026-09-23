import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Tag, Trash2, CheckCircle2, 
  ExternalLink, Phone, MapPin, IndianRupee, Star
} from 'lucide-react';
import { MarketplaceItem } from '../../types';

interface AdminMarketplaceTabProps {
  items: MarketplaceItem[];
  onToggleStatus: (id: string, currentStatus: 'available' | 'sold') => void;
  onToggleFeatured: (id: string, currentFeatured: boolean) => void;
  onDeleteItem: (id: string) => void;
}

export const AdminMarketplaceTab: React.FC<AdminMarketplaceTabProps> = ({
  items,
  onToggleStatus,
  onToggleFeatured,
  onDeleteItem,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'sold'>('all');
  const [search, setSearch] = useState('');

  const filtered = items.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch = search === '' ||
      item.title?.toLowerCase().includes(q) ||
      item.sellerName?.toLowerCase().includes(q) ||
      item.city?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'all' ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            All Items ({items.length})
          </button>
          <button
            onClick={() => setStatusFilter('available')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'available' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-400 hover:text-emerald-400'
            }`}
          >
            Available ({items.filter(i => i.status === 'available').length})
          </button>
          <button
            onClick={() => setStatusFilter('sold')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'sold' ? 'bg-white/10 text-gray-300' : 'text-gray-400 hover:text-white'
            }`}
          >
            Marked Sold ({items.filter(i => i.status === 'sold').length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items, sellers, cities..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/50"
          />
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] overflow-hidden transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              {/* Image Preview */}
              <div className="relative aspect-[4/3] bg-black/40 overflow-hidden">
                {item.images && item.images.length > 0 ? (
                  <img 
                    src={item.images[0]} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                    No image
                  </div>
                )}

                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${
                    item.status === 'available'
                      ? 'bg-emerald-500/80 text-black font-bold'
                      : 'bg-black/70 text-gray-300 border border-white/20'
                  }`}>
                    {item.status}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-black/70 text-gray-200 border border-white/20 backdrop-blur-md">
                    {item.condition}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => onToggleFeatured(item.id, item.featured || false)}
                    className={`p-1.5 rounded-xl backdrop-blur-md transition-colors ${
                      item.featured ? 'bg-[#8A2BE2] text-white shadow-[0_0_10px_#8A2BE2]' : 'bg-black/60 text-gray-400 hover:text-white'
                    }`}
                    title={item.featured ? "Unfeature" : "Feature on Marketplace"}
                  >
                    <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#00E5FF]">{item.category}</span>
                  <span className="text-sm font-black text-white">₹{item.price.toLocaleString('en-IN')}</span>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#00E5FF] transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-white/5 text-[11px] text-gray-400 flex items-center justify-between">
                  <span>{item.city}</span>
                  <span>Seller: {item.sellerName}</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 border-t border-white/5 bg-black/20 flex items-center justify-between gap-2">
              <button
                onClick={() => onToggleStatus(item.id, item.status)}
                className="text-[11px] font-bold text-gray-300 hover:text-white px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                {item.status === 'available' ? 'Mark as Sold' : 'Mark Available'}
              </button>

              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${item.sellerPhone}`}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-[#00E5FF] hover:bg-white/5 transition-colors"
                  title={`Call seller ${item.sellerPhone}`}
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-1.5 rounded-xl text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Remove Item (Delete)"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500">
            <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="font-bold text-white text-sm">No marketplace items match filter</p>
          </div>
        )}
      </div>

    </div>
  );
};
