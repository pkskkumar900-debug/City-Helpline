import React from 'react';
import { MapPin, ChevronDown, Navigation, Loader2 } from 'lucide-react';
import { useLocationContext } from '../../contexts/LocationContext';

export function NavbarLocationButton() {
  const { userLocation, isLoadingLocation, openLocationModal } = useLocationContext();

  return (
    <button
      type="button"
      onClick={openLocationModal}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#00E5FF]/40 transition-all duration-300 text-left cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
      title="Click to change service location"
    >
      <div className="relative w-7 h-7 rounded-lg bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0 group-hover:scale-105 transition-transform">
        {isLoadingLocation ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00E5FF]" />
        ) : userLocation?.isLiveDetected ? (
          <Navigation className="w-3.5 h-3.5 text-[#00E5FF]" />
        ) : (
          <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
        )}

        {/* Live GPS dot */}
        {userLocation?.isLiveDetected && !isLoadingLocation && (
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        )}
      </div>

      <div className="hidden lg:flex flex-col text-left leading-tight pr-1">
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 group-hover:text-cyan-300 transition-colors">
          {userLocation ? 'Services in' : 'Set Location'}
        </span>
        <div className="flex items-center gap-1 font-bold text-white text-xs">
          <span className="truncate max-w-[120px]">
            {userLocation ? userLocation.city : 'Choose City'}
          </span>
          <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[#00E5FF] transition-colors" />
        </div>
      </div>

      {/* Compact layout for tablet and smaller */}
      <div className="flex lg:hidden items-center gap-1 text-xs font-bold text-white">
        <span className="truncate max-w-[90px] sm:max-w-[120px]">
          {userLocation ? userLocation.city : 'Location'}
        </span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </div>
    </button>
  );
}
