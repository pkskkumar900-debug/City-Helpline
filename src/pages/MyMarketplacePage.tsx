import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MarketplaceItem } from '../types';
import { ShoppingBag, PlusCircle, MapPin, Trash2, CheckCircle, ArrowRight, Tag } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { PersonalPageHeader } from '../components/layout/PersonalPageHeader';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function MyMarketplacePage() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, 'marketplace_items'),
          where('sellerId', '==', currentUser.uid)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as MarketplaceItem));
        data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setItems(data);
      } catch (err) {
        console.error('Error fetching marketplace items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentUser]);

  const toggleStatus = async (item: MarketplaceItem) => {
    const newStatus = item.status === 'available' ? 'sold' : 'available';
    try {
      await updateDoc(doc(db, 'marketplace_items', item.id), { status: newStatus });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: newStatus } : i))
      );
      toast.success(newStatus === 'sold' ? 'Item marked as Sold!' : 'Item marked as Available!');
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error('Failed to update item status');
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!window.confirm('Are you sure you want to delete this listing from the marketplace?')) return;
    try {
      await deleteDoc(doc(db, 'marketplace_items', itemId));
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      toast.success('Listing deleted successfully');
    } catch (err) {
      console.error('Failed to delete item:', err);
      toast.error('Failed to delete item');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-20 md:mb-12">
      <PersonalPageHeader
        title="My Marketplace Ads"
        subtitle="Manage items you are selling to fellow students (books, cycle, cooler, notes)"
        badge={`${items.length} Active`}
        badgeColor="bg-cyan-400/10 text-cyan-300 border-cyan-400/30"
        icon={ShoppingBag}
        iconColor="text-[#00E5FF]"
        exitUrl="/profile"
        backLabel="Profile"
        rightAction={
          <Link
            to="/sell-item"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] active:scale-95 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Sell Item</span>
          </Link>
        }
      />

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card rounded-3xl h-32 animate-pulse bg-white/[0.05] border border-white/10"
            />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard
                className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between hover:border-white/20 transition-all"
                intensity="low"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/[0.06] border border-white/10 shrink-0">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/[0.06] text-gray-300 border border-white/10">
                        {item.category}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          item.status === 'available'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}
                      >
                        {item.status === 'available' ? 'Available' : 'Sold Out'}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-sm sm:max-w-md">
                      {item.title}
                    </h3>
                    <p className="text-base font-black text-[#00E5FF] mt-0.5">
                      ₹{item.price.toLocaleString('en-IN')}
                      {item.originalPrice && (
                        <span className="text-xs text-gray-500 line-through font-normal ml-2">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                      <span className="truncate">{item.city}{item.area ? ` • ${item.area}` : ''}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleStatus(item)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      item.status === 'available'
                        ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                        : 'bg-white/[0.08] text-gray-300 hover:bg-white/[0.15] border border-white/15'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{item.status === 'available' ? 'Mark as Sold' : 'Mark Available'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-all cursor-pointer"
                    title="Delete listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Link
                    to="/marketplace"
                    className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-gray-300 hover:text-white border border-white/10 transition-all"
                    title="View in Marketplace"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <GlassCard className="p-12 text-center max-w-lg mx-auto" intensity="low">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-[#00E5FF] flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Active Marketplace Ads</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Have study material, competitive exam modules, cooler, study table, or mattress? Sell them directly to juniors without any broker or commission.
          </p>
          <Link
            to="/sell-item"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Item for Free</span>
          </Link>
        </GlassCard>
      )}
    </div>
  );
}
