import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  Check, 
  X, 
  Flame, 
  Compass, 
  Building,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STATE_CITIES } from '../../lib/constants';

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

// Curated academic hubs with local student context
const STUDENT_HUBS_INFO: Record<string, { state: string; tag: string; clusters: string; isTopHub?: boolean }> = {
  'Kota': {
    state: 'Rajasthan',
    tag: 'Coaching Capital',
    clusters: 'Landmark City, Rajiv Gandhi Nagar, Coral Park',
    isTopHub: true
  },
  'New Delhi': {
    state: 'Delhi',
    tag: 'DU & UPSC Hub',
    clusters: 'North Campus, Mukherjee Nagar, Karol Bagh, Laxmi Nagar',
    isTopHub: true
  },
  'Patna': {
    state: 'Bihar',
    tag: 'NEET & JEE Hub',
    clusters: 'Boring Road, Kankarbagh, Bazar Samiti, Musallahpur',
    isTopHub: true
  },
  'Prayagraj': {
    state: 'Uttar Pradesh',
    tag: 'Civil Services Hub',
    clusters: 'Civil Lines, Katra, Salori, Govindpur, Allahpur',
    isTopHub: true
  },
  'Bengaluru': {
    state: 'Karnataka',
    tag: 'Tech & Academy Hub',
    clusters: 'BTM Layout, Koramangala, HSR Layout, Electronic City',
    isTopHub: true
  },
  'Pune': {
    state: 'Maharashtra',
    tag: 'Oxford of the East',
    clusters: 'FC Road, Kothrud, Viman Nagar, Hinjewadi',
    isTopHub: true
  },
  'Jaipur': {
    state: 'Rajasthan',
    tag: 'State & Central Exams',
    clusters: 'Gopalpura Bypass, Tonk Phatak, Malviya Nagar',
    isTopHub: true
  },
  'Lucknow': {
    state: 'Uttar Pradesh',
    tag: 'State Exam Center',
    clusters: 'Hazratganj, Aliganj, Gomti Nagar, Kapoorthala',
    isTopHub: true
  },
  'Indore': {
    state: 'Madhya Pradesh',
    tag: 'MPPSC & Academies',
    clusters: 'Bhawarkua, Vijay Nagar, Geeta Bhawan, Navlakha',
    isTopHub: true
  },
  'Kolkata': {
    state: 'West Bengal',
    tag: 'College Street & Tech',
    clusters: 'College Street, Salt Lake, Jadavpur',
    isTopHub: true
  },
  'Ahmedabad': {
    state: 'Gujarat',
    tag: 'University Area',
    clusters: 'Navrangpura, Vastrapur, Satellite',
    isTopHub: true
  },
  'Varanasi': {
    state: 'Uttar Pradesh',
    tag: 'BHU & Central Academies',
    clusters: 'Lanka, Bhelupur, Sigra, Orderly Bazar'
  },
  'Gaya': {
    state: 'Bihar',
    tag: 'Magadh Education Hub',
    clusters: 'AP Colony, White House, Civil Lines'
  },
  'Muzaffarpur': {
    state: 'Bihar',
    tag: 'North Bihar Hub',
    clusters: 'Mithanpura, Kalambagh Road, Zero Mile'
  }
};

const TOP_FAST_HUBS = [
  'Kota',
  'New Delhi',
  'Patna',
  'Prayagraj',
  'Bengaluru',
  'Pune',
  'Jaipur',
  'Indore',
  'Lucknow'
];

export const LocationSelect: React.FC<LocationSelectProps> = ({
  value,
  onChange,
  placeholder = 'All Cities',
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
  const [selectedState, setSelectedState] = useState<string>('All');
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

  // Find state for current city
  const selectedStateName = useMemo(() => {
    if (!value) return null;
    for (const [state, cities] of Object.entries(STATE_CITIES)) {
      if (cities.includes(value)) return state;
    }
    return null;
  }, [value]);

  const allStates = useMemo(() => ['All', ...Object.keys(STATE_CITIES)], []);

  // Filtered cities list
  const filteredCityList = useMemo(() => {
    const list: Array<{ city: string; state: string; hubInfo?: typeof STUDENT_HUBS_INFO[string] }> = [];

    for (const [state, cities] of Object.entries(STATE_CITIES)) {
      if (selectedState !== 'All' && state !== selectedState) continue;

      for (const city of cities) {
        const hubInfo = STUDENT_HUBS_INFO[city];
        const matchSearch = 
          !search ||
          city.toLowerCase().includes(search.toLowerCase()) ||
          state.toLowerCase().includes(search.toLowerCase()) ||
          (hubInfo?.clusters && hubInfo.clusters.toLowerCase().includes(search.toLowerCase())) ||
          (hubInfo?.tag && hubInfo.tag.toLowerCase().includes(search.toLowerCase()));

        if (matchSearch) {
          list.push({ city, state, hubInfo });
        }
      }
    }

    // Sort: Hubs first, then alphabetical
    list.sort((a, b) => {
      const aHub = a.hubInfo?.isTopHub ? 1 : 0;
      const bHub = b.hubInfo?.isTopHub ? 1 : 0;
      if (aHub !== bHub) return bHub - aHub;
      return a.city.localeCompare(b.city);
    });

    return list;
  }, [search, selectedState]);

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
                ? 'bg-[#8A2BE2]/20 border-purple-400/40 text-purple-300 shadow-[0_0_12px_rgba(138,43,226,0.3)]' 
                : 'bg-white/[0.05] border-white/15 text-gray-400 group-hover:text-purple-300'
            }`}>
              <MapPin className="w-4 h-4" />
            </div>

            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                Location
              </span>
              <div className="flex items-center gap-1.5 truncate mt-0.5">
                <span className={`text-sm md:text-base font-semibold truncate ${value ? 'text-white' : 'text-gray-400'}`}>
                  {value || placeholder}
                </span>
                {selectedStateName && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-400/30 shrink-0">
                    {selectedStateName}
                  </span>
                )}
              </div>
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
                title="Clear Location"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : 'group-hover:text-white'}`} />
          </div>
        </div>

        {/* Expanded Location Dropdown Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 left-0 right-0 sm:left-auto sm:right-0 sm:w-[440px] md:w-[500px] max-w-[calc(100vw-32px)] mt-2 rounded-[28px] overflow-hidden backdrop-blur-3xl bg-slate-950/95 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(138,43,226,0.18),inset_0_1.5px_1px_rgba(255,255,255,0.3)]"
            >
            {/* Liquid Top Shimmer */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/80 to-transparent z-10" />

            {/* Dropdown Header & Search Bar */}
            <div className="p-4 border-b border-white/10 bg-white/[0.02]">
              <div className="relative flex items-center bg-white/[0.06] rounded-2xl border border-white/15 focus-within:border-purple-400/60 focus-within:bg-white/[0.09] transition-all">
                <Search className="w-4 h-4 text-gray-400 ml-3.5 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search city, state or area (e.g. Kota, Delhi, Boring Road)..."
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

              {/* Fast 1-Tap Premier Hubs Chips */}
              <div className="flex items-center gap-1.5 mt-3 pt-1 overflow-x-auto pb-1 custom-scrollbar">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 shrink-0 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400 animate-pulse" /> Popular:
                </span>
                {TOP_FAST_HUBS.map((hubCity) => {
                  const active = value === hubCity;
                  return (
                    <button
                      key={hubCity}
                      type="button"
                      onClick={() => {
                        onChange(active ? '' : hubCity);
                        handleToggle(false);
                      }}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 transition-all ${
                        active
                          ? 'bg-purple-500/30 border-purple-400 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                          : 'bg-white/[0.05] border-white/10 text-gray-300 hover:bg-white/[0.1] hover:text-white'
                      }`}
                    >
                      {hubCity}
                    </button>
                  );
                })}
              </div>

              {/* State Filter Tabs */}
              <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-white/5 overflow-x-auto pb-1 custom-scrollbar">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-[#00E5FF]" /> State:
                </span>
                {allStates.map((st) => {
                  const isStateActive = selectedState === st;
                  return (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedState(st)}
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg shrink-0 transition-all ${
                        isStateActive
                          ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.25)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cities Grid List */}
            <div className="p-3 max-h-[360px] overflow-y-auto space-y-1.5 custom-scrollbar">
              {/* Reset "All Cities / Pan-India" item */}
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  handleToggle(false);
                  setSearch('');
                  setSelectedState('All');
                }}
                className={`w-full p-3 rounded-2xl border transition-all text-left flex items-center justify-between ${
                  !value
                    ? 'bg-gradient-to-r from-purple-500/20 to-transparent border-purple-400/40 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]'
                    : 'bg-white/[0.03] border-white/5 text-gray-300 hover:bg-white/[0.07] hover:border-white/15 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">All Locations (Pan India)</p>
                    <p className="text-xs text-gray-400 font-normal">Explore student spaces across all cities</p>
                  </div>
                </div>
                {!value && <Check className="w-4 h-4 text-purple-400" />}
              </button>

              {/* Grid of Cities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {filteredCityList.map(({ city, state, hubInfo }) => {
                  const isSelected = value === city;
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        onChange(city);
                        handleToggle(false);
                        setSearch('');
                      }}
                      className={`p-3 rounded-2xl border transition-all text-left flex items-start justify-between group/city relative overflow-hidden ${
                        isSelected
                          ? 'bg-gradient-to-b from-purple-500/20 to-white/[0.03] border-purple-400/60 shadow-[0_0_20px_rgba(138,43,226,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]'
                          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 overflow-hidden">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border transition-transform group-hover/city:scale-105 ${
                          hubInfo?.isTopHub 
                            ? 'bg-amber-400/15 border-amber-400/30 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                            : 'bg-white/[0.05] border-white/10 text-gray-400'
                        }`}>
                          <Building className="w-3.5 h-3.5" />
                        </div>

                        <div className="overflow-hidden">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-sm font-bold tracking-tight ${isSelected ? 'text-purple-300' : 'text-white group-hover/city:text-purple-200'}`}>
                              {city}
                            </span>
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-white/[0.07] border border-white/10 text-gray-300">
                              {state}
                            </span>
                          </div>

                          {hubInfo?.tag && (
                            <p className="text-[10px] font-bold text-amber-300/90 mt-0.5 flex items-center gap-1 truncate">
                              ★ {hubInfo.tag}
                            </p>
                          )}

                          {hubInfo?.clusters && (
                            <p className="text-[10px] text-gray-400/80 mt-0.5 line-clamp-1 leading-tight">
                              {hubInfo.clusters}
                            </p>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center shrink-0 ml-2">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {filteredCityList.length === 0 && (
                <div className="py-8 text-center text-gray-400">
                  <p className="text-sm font-semibold">No city found for "{search}" in {selectedState}</p>
                  <p className="text-xs text-gray-500 mt-1">Try switching to "All States" or search another city</p>
                </div>
              )}
            </div>

            {/* Dropdown Footer */}
            <div className="p-3 border-t border-white/10 bg-slate-950/80 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                {filteredCityList.length} Cities in Directory
              </span>
              {value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    handleToggle(false);
                  }}
                  className="text-purple-300 hover:text-white font-semibold"
                >
                  Reset City
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
