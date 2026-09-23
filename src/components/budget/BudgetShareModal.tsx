import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { LiquidButton } from '../ui/LiquidButton';
import { 
  X, MessageCircle, Copy, Check, Printer, Share2, 
  IndianRupee, Sparkles, Building2, Utensils, BookOpen, Bike, Shirt
} from 'lucide-react';
import { BudgetCategoryItem } from './BudgetChart';

interface BudgetShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: string;
  totalMonthly: number;
  targetBudget?: number;
  items: BudgetCategoryItem[];
  roomType: string;
  foodPlan: string;
  libraryShift: string;
}

export const BudgetShareModal: React.FC<BudgetShareModalProps> = ({
  isOpen,
  onClose,
  city,
  totalMonthly,
  targetBudget,
  items,
  roomType,
  foodPlan,
  libraryShift
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const lines = items
    .filter(i => i.amount > 0)
    .map(i => `• ${i.name}: ₹${i.amount.toLocaleString('en-IN')} (${i.percentage}%)`)
    .join('\n');

  const shareText = `🎓 *Student Monthly Budget Plan for ${city}*
━━━━━━━━━━━━━━━━━━━━
💰 *Total Monthly Expense:* ₹${totalMonthly.toLocaleString('en-IN')}/month
📍 *Hub:* ${city}

📋 *Itemized Expense Breakdown:*
${lines}

💡 Estimated via City Helpline Student Budget Calculator
🔗 Find verified PGs, Mess & Libraries at: https://cityhelpline.com/search?city=${encodeURIComponent(city)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg">
        <GlassCard className="p-6 sm:p-8 rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(0,229,255,0.2)]" intensity="high">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-[#00E5FF] flex items-center justify-center border border-cyan-400/30">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Share Budget Plan
                </h3>
                <p className="text-xs text-gray-400">
                  Send to parents, roommates or save for records
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Preview Card */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 font-sans text-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-cyan-300 tracking-wider">
                Monthly Estimate • {city}
              </span>
              <span className="text-xs text-gray-400">City Helpline</span>
            </div>

            <div className="flex items-baseline gap-1 py-1">
              <span className="text-3xl font-black text-white">
                ₹{totalMonthly.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-400">/ month</span>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs max-h-48 overflow-y-auto pr-1">
              {items.filter(i => i.amount > 0).map(item => (
                <div key={item.id} className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-1.5 truncate pr-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}</span>
                  </span>
                  <span className="font-bold text-white shrink-0">₹{item.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Text Summary</span>
                </>
              )}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handlePrint}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print or Save as PDF</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
