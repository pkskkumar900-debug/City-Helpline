import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MarketplaceItem } from '../../types';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { GlassCard } from '../ui/GlassCard';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Gift, Heart, ArrowRight, CheckCircle2, 
  ExternalLink, Sparkles, PlusCircle, Trash2, Check 
} from 'lucide-react';
import { toast } from 'sonner';

export function ProfileFreeNotesSection() {
  const { currentUser } = useAuth();
  const [myFreeItems, setMyFreeItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const fetchFree = async () => {
      try {
        const q = query(
          collection(db, 'marketplace_items'),
          where('sellerId', '==', currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const allItems = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as MarketplaceItem));
        // Filter free items (price === 0 or tagged giveaway)
        const freeItems = allItems.filter(item => item.price === 0 || item.title.toLowerCase().includes('free'));
        setMyFreeItems(freeItems);
      } catch (err) {
        console.warn('Could not fetch free items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFree();
  }, [currentUser]);

  const handleMarkClaimed = async (itemId: string) => {
    try {
      await updateDoc(doc(db, 'marketplace_items', itemId), {
        status: 'sold'
      });
      setMyFreeItems(prev => prev.map(item => item.id === itemId ? { ...item, status: 'sold' } : item));
      toast.success('Marked as Given / Handed over to student! Thank you for helping juniors ❤️');
    } catch (err) {
      toast.error('Could not update status');
    }
  };

  const handleDelete = async (itemId: string) => {
    if (confirm('Are you sure you want to remove this free study donation?')) {
      try {
        await deleteDoc(doc(db, 'marketplace_items', itemId));
        setMyFreeItems(prev => prev.filter(item => item.id !== itemId));
        toast.success('Donation listing removed.');
      } catch (err) {
        toast.error('Could not delete donation');
      }
    }
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-white">
              Free Books & Coaching Notes Exchange
            </h2>
            <p className="text-xs text-gray-400">
              Give extra modules to juniors for ₹0 or take study material from seniors.
            </p>
          </div>
        </div>

        <Link
          to="/marketplace?category=FreeStudy"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-purple-300 border border-white/10 transition-all shrink-0 active:scale-95"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Browse Free Material (₹0)</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Give or Take dual cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Give / Donate Free */}
        <GlassCard className="p-5 rounded-3xl border border-white/10 hover:border-purple-400/40 transition-all flex flex-col justify-between" intensity="low">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">🎁 Give (Donate for ₹0)</h3>
                <span className="text-[11px] text-gray-400">Support juniors in need</span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Pass on your completed Allen / PW / Resonance modules, handwritten formula sheets, NCERT fingertips, or DPPs. Zero listing fee, direct student-to-student handover.
            </p>
          </div>

          <Link
            to="/sell-item?type=free"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110 text-white font-bold text-xs transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-95 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Donate Free Study Material</span>
          </Link>
        </GlassCard>

        {/* Card 2: Take / Claim Free */}
        <GlassCard className="p-5 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between" intensity="low">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-[#00E5FF]">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">📖 Take (Claim Free Study Material)</h3>
                <span className="text-[11px] text-gray-400">100% Free • ₹0 Giveaway</span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              Short on budget for expensive coaching modules? Explore free revision notes, mindmaps, and question banks donated by ex-students and rankers.
            </p>
          </div>

          <Link
            to="/marketplace?category=FreeStudy"
            className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-cyan-300 border border-white/15 font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore ₹0 Notes in Marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </GlassCard>
      </div>

      {/* User's active donations list (if any) */}
      {myFreeItems.length > 0 && (
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Your Active Free Donations ({myFreeItems.length})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {myFreeItems.map(item => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <h4 className="font-bold text-white truncate">{item.title}</h4>
                  <span className="text-[11px] text-gray-400">
                    Status: {item.status === 'available' ? '🟢 Available' : '✅ Handed Over'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.status === 'available' && (
                    <button
                      type="button"
                      onClick={() => handleMarkClaimed(item.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold cursor-pointer hover:bg-emerald-500/30"
                      title="Mark as Handed Over"
                    >
                      <Check className="w-3 h-3 inline mr-1" />
                      Given
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
