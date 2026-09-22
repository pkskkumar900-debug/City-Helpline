import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation, MapPin, X, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLocationContext } from '../../contexts/LocationContext';

export function LocationPromptBanner() {
  const { 
    userLocation, 
    isLoadingLocation, 
    requestLiveLocation, 
    openLocationModal 
  } = useLocationContext();

  const [dismissed, setDismissed] = useState(false);

  // If user dismissed it or location is already detected and active
  if (dismissed) return null;

  return (
    <AnimatePresence>
      {!userLocation ? (
        // Prompt banner when no location is chosen yet
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="relative bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-purple-950/60 border-b border-cyan-500/20 backdrop-blur-xl z-20 text-xs sm:text-sm text-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <div className="w-6 h-6 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shrink-0">
                <Navigation className="w-3.5 h-3.5" />
              </div>
              <p className="font-medium text-gray-300">
                <strong className="text-white font-bold">Personalize your student hub:</strong> Allow location permission to view PGs, mess & libraries closest to you.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => requestLiveLocation(false)}
                disabled={isLoadingLocation}
                className="px-3 py-1.5 rounded-xl bg-[#00E5FF] hover:bg-[#00cbe6] text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)]"
              >
                {isLoadingLocation ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Detecting...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Use Current Location</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={openLocationModal}
                className="px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-medium text-xs transition-all"
              >
                Select City
              </button>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-1"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        // Active location confirmation bar (Amazon/Flipkart style deliver-to indicator)
        <div className="bg-slate-950/60 border-b border-white/10 backdrop-blur-md text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-300 truncate">
              <span className="flex items-center gap-1 text-[#00E5FF] font-semibold shrink-0">
                <MapPin className="w-3.5 h-3.5" />
                Services near:
              </span>
              <span className="font-bold text-white truncate">
                {userLocation.city} {userLocation.state ? `(${userLocation.state})` : ''}
              </span>
              {userLocation.isLiveDetected && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Live GPS Detected
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={openLocationModal}
              className="text-[#00E5FF] hover:underline font-bold text-xs shrink-0 flex items-center gap-1"
            >
              Change Location
            </button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
