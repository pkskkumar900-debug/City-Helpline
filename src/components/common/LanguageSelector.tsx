import React from 'react';
import { Languages, Check } from 'lucide-react';
import { useLanguage, LANGUAGE_OPTIONS, AppLanguage } from '../../contexts/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'pills' | 'dropdown' | 'compact' | 'banner';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'pills',
  className = '' 
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-0.5 text-xs ${className}`}>
        <Languages className="w-3.5 h-3.5 text-gray-400 ml-1.5 shrink-0" />
        {LANGUAGE_OPTIONS.map((opt) => {
          const isActive = language === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setLanguage(opt.id)}
              className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-black shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
              title={`Switch to ${opt.label}`}
            >
              {opt.shortLabel}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-[#00E5FF]/10 via-[#8A2BE2]/10 to-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-2xl p-3 sm:p-4 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#00E5FF]/20 to-[#8A2BE2]/20 border border-[#00E5FF]/30 text-[#00E5FF]">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Read in your preferred language</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] font-semibold border border-[#00E5FF]/30">
                भाषा चुनें
              </span>
            </h4>
            <p className="text-xs text-gray-400">
              Hindi (हिंदी), Easy Hinglish, or English me policy & guidelines padhein
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 w-full sm:w-auto justify-center">
          {LANGUAGE_OPTIONS.map((opt) => {
            const isActive = language === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setLanguage(opt.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-black shadow-[0_0_12px_rgba(0,229,255,0.4)] scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                <span>{opt.nativeName}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Default 'pills'
  return (
    <div className={`inline-flex items-center gap-1 bg-black/40 border border-white/15 rounded-xl p-1 backdrop-blur-md ${className}`}>
      <span className="text-[11px] font-semibold text-gray-400 px-2 flex items-center gap-1 hidden sm:flex">
        <Languages className="w-3.5 h-3.5 text-[#00E5FF]" />
        <span>भाषा / Lang:</span>
      </span>
      {LANGUAGE_OPTIONS.map((opt) => {
        const isActive = language === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setLanguage(opt.id)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              isActive
                ? 'bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-black font-black shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {isActive && <Check className="w-3 h-3 stroke-[3]" />}
            {opt.nativeName}
          </button>
        );
      })}
    </div>
  );
};
