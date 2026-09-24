import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, Smartphone, Check } from 'lucide-react';
import { CityHelplineLogo } from '../brand/CityHelplineLogo';

export const InstallAppPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    const isDismissed = sessionStorage.getItem('pwa_install_dismissed');
    if (isDismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setShowPrompt(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To add shortcut: Tap your browser menu (⋮ or Share icon) and select 'Add to Home Screen' / 'Install App'.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_install_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-96 rounded-2xl bg-[#0B0F19]/95 backdrop-blur-xl border border-white/15 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(0,229,255,0.25)] animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <CityHelplineLogo size="md" glow={true} />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-extrabold text-white">Install City Helpline</h4>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] font-bold">
                App
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Add 3D shortcut icon to your home screen for 1-tap zero-brokerage access!
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 pt-2 border-t border-white/10">
        <button
          onClick={handleInstallClick}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] via-[#6B11FF] to-[#8A2BE2] text-white font-extrabold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md"
        >
          <Download className="w-3.5 h-3.5 text-black" />
          <span className="text-black">Install Shortcut</span>
        </button>
        <button
          onClick={handleDismiss}
          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
};
