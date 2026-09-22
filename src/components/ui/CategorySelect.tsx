import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Bed, 
  Utensils, 
  UtensilsCrossed, 
  BookOpen, 
  BookMarked, 
  GraduationCap, 
  Briefcase, 
  Dumbbell, 
  Shirt, 
  PenTool, 
  Wifi, 
  Sparkles, 
  Search, 
  ChevronDown, 
  Check, 
  X,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../../lib/constants';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

interface CategoryMeta {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgGlow: string;
  badge?: string;
  description: string;
}

const CATEGORY_DETAILS: Record<string, Omit<CategoryMeta, 'name'>> = {
  'PG': {
    icon: Building2,
    color: '#00E5FF',
    bgGlow: 'rgba(0, 229, 255, 0.15)',
    badge: 'Popular',
    description: 'Single & sharing rooms with food, Wi-Fi & power backup'
  },
  'Hostel': {
    icon: Bed,
    color: '#8A2BE2',
    bgGlow: 'rgba(138, 43, 226, 0.15)',
    badge: 'Student Choice',
    description: 'Dedicated student hostels near major coaching hubs'
  },
  'Mess': {
    icon: Utensils,
    color: '#FF3B3B',
    bgGlow: 'rgba(255, 59, 59, 0.15)',
    badge: 'Hygienic',
    description: 'Nutritious daily meal thalis & pure veg kitchens'
  },
  'Tiffin Service': {
    icon: UtensilsCrossed,
    color: '#F59E0B',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
    description: 'Doorstep hot meal tiffin delivery for students'
  },
  'Library': {
    icon: BookOpen,
    color: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.15)',
    badge: '24/7 Silent',
    description: 'Air-conditioned silent reading halls with personal lockers'
  },
  'Study Room': {
    icon: BookMarked,
    color: '#10B981',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    description: 'Private quiet study cabins with high-speed internet'
  },
  'Coaching Institute': {
    icon: GraduationCap,
    color: '#EC4899',
    bgGlow: 'rgba(236, 72, 153, 0.15)',
    badge: 'Top Faculty',
    description: 'Premier faculty centers for NEET, JEE, UPSC & CA'
  },
  'Coworking Space': {
    icon: Briefcase,
    color: '#A855F7',
    bgGlow: 'rgba(168, 85, 247, 0.15)',
    description: 'Quiet collaborative desks, printing & fast broadband'
  },
  'Gym': {
    icon: Dumbbell,
    color: '#EF4444',
    bgGlow: 'rgba(239, 68, 68, 0.15)',
    description: 'Student fitness, strength weights & morning workout zones'
  },
  'Laundry': {
    icon: Shirt,
    color: '#06B6D4',
    bgGlow: 'rgba(6, 182, 212, 0.15)',
    description: 'Express wash, dry clean & iron service for students'
  },
  'Stationery Shop': {
    icon: PenTool,
    color: '#F97316',
    bgGlow: 'rgba(249, 115, 22, 0.15)',
    description: 'Competitive exam books, study notes, xerox & printout'
  },
  'Wifi Service': {
    icon: Wifi,
    color: '#14B8A6',
    bgGlow: 'rgba(20, 184, 166, 0.15)',
    description: 'High-speed student broadband & fiber connections'
  },
  'Others': {
    icon: Sparkles,
    color: '#C084FC',
    bgGlow: 'rgba(192, 132, 252, 0.15)',
    description: 'Student moving, medical, groceries & local assistance'
  }
};

export const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onChange,
  placeholder = 'All Categories',
  className = '',
  isOpen: controlledIsOpen,
  onToggle
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = (nextOpen: boolean) => {
    if (onToggle) {
      onToggle(nextOpen);
    }
    if (!isControlled) {
      setInternalIsOpen(nextOpen);
    }
  };

  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleToggle(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const selectedDetails = value ? CATEGORY_DETAILS[value] : null;
  const SelectedIcon = selectedDetails?.icon || Layers;

  const filteredCategories = CATEGORIES.filter(cat => {
    const details = CATEGORY_DETAILS[cat];
    const matchName = cat.toLowerCase().includes(search.toLowerCase());
    const matchDesc = details?.description.toLowerCase().includes(search.toLowerCase()) || false;
    return matchName || matchDesc;
  });

  const popularShortcuts = ['PG', 'Hostel', 'Library', 'Mess', 'Coaching Institute', 'Study Room'];

  return (
    <>
      {/* Click-outside Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]" 
          onClick={(e) => {
            e.stopPropagation();
            handleToggle(false);
          }} 
        />
      )}

      <div className={`relative ${className}`} ref={containerRef}>
        {/* Trigger Button */}
        <div
          onClick={() => handleToggle(!isOpen)}
          className="w-full h-full min-h-[56px] px-4 py-3 bg-transparent text-white cursor-pointer flex items-center justify-between gap-3 group transition-all select-none"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              value 
                ? 'bg-[#00E5FF]/15 border-[#00E5FF]/40 text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.25)]' 
                : 'bg-white/[0.05] border-white/15 text-gray-400 group-hover:text-cyan-300'
            }`}>
              <SelectedIcon className="w-4 h-4" />
            </div>

            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                Category
              </span>
              <span className={`text-sm md:text-base font-semibold truncate mt-0.5 ${value ? 'text-white' : 'text-gray-400'}`}>
                {value || placeholder}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {value && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                  setSearch('');
                }}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear Category"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00E5FF]' : 'group-hover:text-white'}`} />
          </div>
        </div>

        {/* Expanded Liquid Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 left-0 right-0 sm:left-0 sm:right-auto sm:w-[400px] md:w-[460px] max-w-[calc(100vw-32px)] mt-2 rounded-[28px] overflow-hidden backdrop-blur-3xl bg-slate-950/95 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(0,229,255,0.18),inset_0_1.5px_1px_rgba(255,255,255,0.3)]"
            >
            {/* Liquid Top Shimmer */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E5FF]/80 to-transparent z-10" />

            {/* Dropdown Header & Search Input */}
            <div className="p-4 border-b border-white/10 bg-white/[0.02]">
              <div className="relative flex items-center bg-white/[0.06] rounded-2xl border border-white/15 focus-within:border-[#00E5FF]/60 focus-within:bg-white/[0.09] transition-all">
                <Search className="w-4 h-4 text-gray-400 ml-3.5 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search category (e.g. PG, Library, Mess)..."
                  className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder-gray-400 focus:outline-none font-medium"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="mr-3 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Popular Categories Shortcut Chips */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#00E5FF]" /> Top:
                </span>
                {popularShortcuts.map((catName) => {
                  const active = value === catName;
                  return (
                    <button
                      key={catName}
                      type="button"
                      onClick={() => {
                        onChange(active ? '' : catName);
                        handleToggle(false);
                      }}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                        active
                          ? 'bg-[#00E5FF]/20 border-[#00E5FF]/60 text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                          : 'bg-white/[0.05] border-white/10 text-gray-300 hover:bg-white/[0.1] hover:text-white'
                      }`}
                    >
                      {catName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categories Grid List */}
            <div className="p-3 max-h-[360px] overflow-y-auto space-y-1.5 custom-scrollbar">
              {/* Reset to "All Categories" item */}
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  handleToggle(false);
                  setSearch('');
                }}
                className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between ${
                  !value
                    ? 'bg-gradient-to-r from-[#00E5FF]/15 to-transparent border-[#00E5FF]/40 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
                    : 'bg-white/[0.03] border-white/5 text-gray-300 hover:bg-white/[0.07] hover:border-white/15 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center text-cyan-300">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">All Categories</p>
                    <p className="text-xs text-gray-400 font-normal">Show all student accommodations & services</p>
                  </div>
                </div>
                {!value && <Check className="w-4 h-4 text-[#00E5FF]" />}
              </button>

              {/* Categorical Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {filteredCategories.map((cat) => {
                  const details = CATEGORY_DETAILS[cat];
                  const Icon = details?.icon || Sparkles;
                  const isSelected = value === cat;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onChange(cat);
                        handleToggle(false);
                        setSearch('');
                      }}
                      className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between group/tile relative overflow-hidden ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#00E5FF]/15 to-white/[0.03] border-[#00E5FF]/50 shadow-[0_0_20px_rgba(0,229,255,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)]'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div 
                          className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover/tile:scale-110"
                          style={{ 
                            backgroundColor: details?.bgGlow || 'rgba(255,255,255,0.08)',
                            borderColor: isSelected ? details?.color : 'rgba(255,255,255,0.15)',
                            color: details?.color || '#00E5FF'
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        {details?.badge && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/15 text-gray-300 uppercase tracking-wider">
                            {details.badge}
                          </span>
                        )}
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#00E5FF] text-slate-950 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div>
                        <p className={`text-sm font-bold tracking-tight transition-colors ${isSelected ? 'text-[#00E5FF]' : 'text-white group-hover/tile:text-cyan-300'}`}>
                          {cat}
                        </p>
                        <p className="text-[11px] text-gray-400/90 leading-tight mt-0.5 line-clamp-2">
                          {details?.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredCategories.length === 0 && (
                <div className="py-8 text-center text-gray-400">
                  <p className="text-sm font-semibold">No category matches "{search}"</p>
                  <p className="text-xs text-gray-500 mt-1">Try searching PG, Library, Mess, Hostel or Coaching</p>
                </div>
              )}
            </div>

            {/* Dropdown Footer */}
            <div className="p-3 border-t border-white/10 bg-slate-950/80 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                {CATEGORIES.length} Categories Available
              </span>
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    handleToggle(false);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};
