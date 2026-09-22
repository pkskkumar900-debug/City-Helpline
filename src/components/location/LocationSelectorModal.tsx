import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Search, 
  X, 
  Check, 
  AlertCircle, 
  Loader2, 
  Building, 
  Sparkles,
  Compass
} from 'lucide-react';
import { useLocationContext } from '../../contexts/LocationContext';
import { ALL_CITIES, STATE_CITIES } from '../../lib/constants';
import { LiquidButton } from '../ui/LiquidButton';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_HUBS = [
  { name: 'Kota', state: 'Rajasthan', tag: 'Coaching Hub' },
  { name: 'New Delhi', state: 'Delhi', tag: 'University & UPSC' },
  { name: 'Patna', state: 'Bihar', tag: 'Student Center' },
  { name: 'Bengaluru', state: 'Karnataka', tag: 'Tech Hub' },
  { name: 'Pune', state: 'Maharashtra', tag: 'Oxford of East' },
  { name: 'Lucknow', state: 'Uttar Pradesh', tag: 'Competitive Hub' },
  { name: 'Jaipur', state: 'Rajasthan', tag: 'Education Hub' },
  { name: 'Mumbai', state: 'Maharashtra', tag: 'Metro Services' },
  { name: 'Indore', state: 'Madhya Pradesh', tag: 'MP Hub' },
  { name: 'Ahmedabad', state: 'Gujarat', tag: 'Gujarat Hub' },
];

export function LocationSelectorModal({ isOpen, onClose }: LocationSelectorModalProps) {
  const { 
    userLocation, 
    isLoadingLocation, 
    locationError, 
    requestLiveLocation, 
    setManualLocation, 
    clearLocation 
  } = useLocationContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [customPincode, setCustomPincode] = useState('');

  if (!isOpen) return null;

  const handleDetectLive = async () => {
    const loc = await requestLiveLocation(false);
    if (loc) {
      onClose();
    }
  };

  const handleSelectCity = (cityName: string, stateName?: string) => {
    setManualLocation(cityName, stateName);
    onClose();
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPincode.trim()) return;
    // Set with pincode
    setManualLocation(userLocation?.city || 'Selected Area', userLocation?.state, undefined, customPincode.trim());
    onClose();
  };

  // Filter cities by search
  const filteredCities = searchQuery.trim() 
    ? ALL_CITIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase().trim())).slice(0, 15)
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-[28px] bg-slate-950/90 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1.5px_1px_rgba(255,255,255,0.3),0_0_30px_rgba(0,229,255,0.15)] backdrop-blur-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-[10px] font-bold tracking-wider uppercase mb-1.5">
                <Compass className="w-3 h-3" />
                Hyper-Local Filter
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Select Your Location
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Services, PGs, and study libraries will be customized to your area
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Selected Location Indicator (if any) */}
          {userLocation && (
            <div className="mt-5 p-3.5 rounded-2xl bg-white/[0.04] border border-[#00E5FF]/30 flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E5FF]">
                    {userLocation.isLiveDetected ? 'Current Live Location' : 'Selected Location'}
                  </span>
                  <p className="text-sm font-bold text-white truncate">
                    {userLocation.city} {userLocation.state ? `• ${userLocation.state}` : ''}
                  </p>
                  {userLocation.pincode && (
                    <p className="text-[11px] text-gray-400">PIN: {userLocation.pincode}</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={clearLocation}
                className="text-xs text-gray-400 hover:text-[#FF3B3B] underline shrink-0 transition-colors font-medium px-2 py-1"
              >
                Clear
              </button>
            </div>
          )}

          {/* 1. Primary Action: Auto-Detect Live Location via GPS */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleDetectLive}
              disabled={isLoadingLocation}
              className="w-full relative group overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-[#00E5FF]/15 via-blue-600/15 to-[#8A2BE2]/15 border border-[#00E5FF]/50 hover:border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    {isLoadingLocation ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Navigation className="w-5 h-5" />
                    )}
                  </div>
                  {/* Subtle live radar ping */}
                  {!isLoadingLocation && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E5FF]"></span>
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white group-hover:text-[#00E5FF] transition-colors">
                      {isLoadingLocation ? 'Detecting Live Location...' : 'Use Current Device Location'}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      GPS
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {isLoadingLocation 
                      ? 'Fetching GPS & reverse-geocoding nearest city...' 
                      : 'Automatically detect live area like Flipkart & Amazon'}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block text-xs font-bold text-[#00E5FF] group-hover:translate-x-1 transition-transform">
                Auto-Detect →
              </div>
            </button>

            {/* Error notice if location access fails */}
            {locationError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{locationError}</p>
              </motion.div>
            )}
          </div>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 text-[11px] font-semibold tracking-wider text-gray-400 bg-slate-950 uppercase">
              Or Choose Student Hub / City
            </span>
          </div>

          {/* City Search Bar */}
          <div className="relative mb-5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Indian city (e.g. Kota, Patna, Delhi, Pune)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filtered Search Results (if user typed) */}
          {searchQuery.trim() && (
            <div className="mb-6 max-h-48 overflow-y-auto space-y-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/10 custom-scrollbar">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#00E5FF]/15 text-sm text-gray-200 hover:text-white flex items-center justify-between group transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                      {city}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-cyan-300">Select →</span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-gray-400">
                  No predefined city found matching "{searchQuery}". 
                  <button
                    type="button"
                    onClick={() => handleSelectCity(searchQuery.trim())}
                    className="block mx-auto mt-1 text-[#00E5FF] font-semibold underline"
                  >
                    Use "{searchQuery.trim()}" as custom city
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Popular Student Hubs Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                Top Student Hubs
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {POPULAR_HUBS.map((hub) => {
                const isSelected = userLocation?.city?.toLowerCase() === hub.name.toLowerCase();
                return (
                  <button
                    key={hub.name}
                    type="button"
                    onClick={() => handleSelectCity(hub.name, hub.state)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#00E5FF]/15 border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isSelected ? 'text-[#00E5FF]' : 'text-white'}`}>
                        {hub.name}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#00E5FF]" />}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-gray-400">
                      <span>{hub.state}</span>
                      <span className="text-[10px] text-cyan-300/80 font-medium">{hub.tag}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-gray-400">
            🔒 Location is stored securely in your browser and used to tailor verified PGs, mess & libraries.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
