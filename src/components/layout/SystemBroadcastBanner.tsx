import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { SystemBroadcast, DEFAULT_BROADCAST } from '../admin/AdminBroadcastTab';

export const SystemBroadcastBanner: React.FC = () => {
  const [broadcast, setBroadcast] = useState<SystemBroadcast | null>(() => {
    try {
      const saved = localStorage.getItem('systemBroadcast');
      if (saved) return JSON.parse(saved);
      return DEFAULT_BROADCAST;
    } catch {
      return DEFAULT_BROADCAST;
    }
  });

  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('systemBroadcast');
        if (saved) setBroadcast(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (!broadcast || !broadcast.enabled || dismissed) return null;

  return (
    <div className={`w-full border-b transition-all text-xs font-semibold py-2 px-4 ${
      broadcast.type === 'warning'
        ? 'bg-amber-500/15 border-amber-500/30 text-amber-200'
        : broadcast.type === 'success'
        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
        : 'bg-[#00E5FF]/10 border-[#00E5FF]/25 text-[#00E5FF]'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {broadcast.type === 'warning' ? <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" /> :
           broadcast.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> :
           <Info className="w-4 h-4 shrink-0 text-[#00E5FF]" />}
          <span className="truncate">{broadcast.message}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {broadcast.actionText && broadcast.actionUrl && (
            <Link
              to={broadcast.actionUrl}
              className="px-2.5 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors"
            >
              {broadcast.actionText} &rarr;
            </Link>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-md text-gray-400 hover:text-white transition-colors"
            title="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
